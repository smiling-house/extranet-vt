import React, { useEffect, useMemo, useState, useRef } from "react";
import PhotoManager from "../../components/PhotoManager";
import { PropertyHeader, PropertyHero, TabBar, FlagsCard, CalendarTab, ReviewsTab, RawDataTab, SyncDataTab, isAdminUser, canSeeTab } from "./PropertyTabs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import picLeft from "../../assets/property/pic-left-dark.png";
import picLeftOn from "../../assets/property/pic-left-on-dark.png";
import picRight from "../../assets/property/pic-right-dark.png";
import picRightOn from "../../assets/property/pic-right-on-dark.png";
import saveIcon from "../../assets/property/pic-icons/save.png";
import favoriteIcon from "../.././assets/icons/favorite.png";
import likeFull from "../.././assets/icons/like-full.png";
import bathIcon from "../../assets/property/baths.png";
import bedsIcon from "../../assets/property/beds.png";
import peopleIcon from "../../assets/property/people.png";
import { isOnDemandListing } from "../../Util/onDemand";
import { OnDemandBadge, PriceOnRequest } from "../../components/OnDemand";
import eventsIcon from "../../assets/collections/icons/events.png";
import familyIcon from "../../assets/collections/icons/family.png";
import petsIcon from "../../assets/collections/icons/pets.png";
import sustainIcon from "../../assets/collections/icons/sustainable.png";
import PageHeader from "../../components/PageHeader";
import ImageWithHover from "../../components/ImageWithHover";
import { PATH_SEARCH, PATH_RESERVE } from "../../Util/constants";
import constants from "../../Util/constants";
import "./Property.scss";
import "./property-redesign.css";
import Button from "../../components/Buttons/Button/Button";
import Row from "../../components/Row";
import { UseCreateObject } from "../../Hooks/UseCreateObject.jsx";
import getHouseRules from "../../Hooks/getHouseRules.jsx";
import { baseURL } from "../../core";
import axios from "axios";
import LinesEllipsis from "react-lines-ellipsis";
import numeral from "numeral";
import DatePickerComponent from "../../components/Forms/Fields/DatePickerComponent/DatePickerComponent.jsx";
import countryList from "../../Util/data/countries.json";
import { userRequest } from "../../api/requestMethods.js";
import SaveSearchPopup from "../../components/SelectedProperties/SaveSearchPopup/index.js";
import shareSelection from '../../assets/icons/share-selection-on.svg';
import ShareSelectionPopup from '../../components/SelectedProperties/ShareSelectionPopup';
import shareSelectionOn from '../../assets/icons/share-selection.png';
import {
  calculateTotalNights,
  getStorageValue,
  isNullOrEmptyArray,
} from "../../Util/general";
import dayjs from "dayjs";
import goBack from "../../assets/go-back.svg";
import makeCalculations from "../../Hooks/makeCalculations.jsx";
import { formatBookingTerms, smilingHouseCancellationCopy, cancellationForDates } from "../../Util/bookingTerms.js";
import { instantBookState } from "../../Util/instantBook";
import { UPSALE, AGENCY_COMMISION } from "../../Util/constants";
import LoadingBox from '../../components/LoadingBox';
import swal from "sweetalert";
import AuthService from "../../services/auth.service.js";
import Modal from "../../components/Modal/Modal.js";
import * as propertyActions from "../../store/redux/Property/actions";
import Layout from "../../components/Layout";

const Property = (props) => {

  const loggedRef = useRef(false);

  const propertyId = localStorage.getItem("propertyId")
  const jToken = localStorage.getItem("jToken");
  const links = localStorage.getItem("noMenu") === 'true';
  const { agent, agency, noMenu } = props;
  const [showAll, setShowAll] = useState(false);
  // Curated photo set pushed by the Photos tab so the hero/count update live
  const [curatedPics, setCuratedPics] = useState(null);
  // CloudStay-style tabs; ?tab= deep-links (emails point at ?tab=photos)
  const [tab, setTabState] = useState(() => { try { return new URLSearchParams(window.location.search).get("tab") || "details"; } catch (e) { return "details"; } });
  const setTab = (t) => { setTabState(t); try { const u = new URL(window.location.href); u.searchParams.set("tab", t); window.history.replaceState(null, "", u.toString()); } catch (e) {} };
  const [showAllSummary, setShowAllSummary] = useState(false);
  const [showShareAsPdf, setShowShareAsPdf] = useState(false);
  const [picIndex, setPicIndex] = useState(0);
  const [rulesArray, setRulesArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  /*
property,
    xdata,
    fullCalendar,
    agency,
    agent,
    totalPrice,
    agencyCommision: totalPrice / 10,
    currency:selectedCurrency,
    exchangeRate
*/

  const property = location?.state?.property;
  const xdata = location?.state?.xdata;
  const [fetchedFullCalendar, setFetchedFullCalendar] = useState(null);
  const fullCalendar = fetchedFullCalendar ?? location?.state?.fullCalendar;
  const activeRatePlan = location?.state?.activeRatePlan;
  const channelSource = location?.state?.channelSource;
  const selectedNights = location?.state?.nights;
  const [errors, setErrors] = useState([]);

  // Cold-load: when /property?id=XXX is opened directly or refreshed (no in-app
  // navigation state), fetch the listing by id so shared links work.
  useEffect(() => {
    if (location?.state?.property) return;
    const coldParams = new URLSearchParams(location.search || "");
    const coldId = coldParams.get("id");
    if (!coldId) return;
    const COLD_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g";
    const req = axios.create({ baseURL: constants.SHUB_URL, headers: { Authorization: `Bearer ${COLD_TOKEN}` } });
    // /local/listings?id= returns the full hub doc (curated pictures applied);
    // the list shape {listings:[{listing,xdata,…}]} only comes back for searches.
    req.get(`/local/listings?id=${encodeURIComponent(coldId)}`)
      .then((res) => {
        const d = res && res.data
        const doc = d && d.data ? d : (((d && d.listings) || [])[0] || null)
        const item = doc && doc.data
          ? { listing: { ...doc.data, _id: doc.data._id || doc.id }, xdata: doc.xdata, fullCalendar: doc.fullCalendar, channelSource: doc.channelSource, source: doc.source, ratePlans: doc.ratePlans, isListed: doc.isListed, lastUpdated: doc.lastUpdated }
          : doc
        if (item && item.listing) {
          history.replace(
            { pathname: location.pathname, search: location.search },
            { property: item.listing, xdata: item.xdata, fullCalendar: item.fullCalendar, source: item.source || item.channelSource, channelSource: item.channelSource, ratePlans: item.ratePlans, isListed: item.isListed, lastUpdated: item.lastUpdated }
          );
        }
      })
      .catch((e) => console.error("Cold-load property by id failed:", e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch the FULL calendar (real per-night price + allotment). The listing's
  // own calendar from /local/listings is stripped by the slim pipeline, which
  // left prices at $0 for any selected date. Runs for both in-app nav and
  // cold-load, keyed on the resolved listing id.
  useEffect(() => {
    const id =
      property?._id || new URLSearchParams(location.search || "").get("id");
    if (!id) return;
    const req = axios.create({
      baseURL: constants.SHUB_URL,
      headers: { Authorization: constants.SHUB_TOKEN },
    });
    req
      .get(`/local/load-fullcalendar/${id}`)
      .then((res) => {
        if (res?.data?.status && Array.isArray(res.data.fullCalendar) && res.data.fullCalendar.length) {
          setFetchedFullCalendar(res.data.fullCalendar);
        }
      })
      .catch((e) => console.error("load-fullcalendar failed:", e?.message || e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property?._id]);

  // ── shareable URL state ───────────────────────────────────────────────────
  // Dates/guests/currency lived ONLY in localStorage, so a copied property link
  // carried none of it: the recipient opened the page on whatever their own
  // browser last held. Hydrate from the query string BEFORE the localStorage
  // reads below (useMemo runs during the first render, so there is no flash of
  // the wrong dates), then mirror changes back into the URL.
  //   ?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&adults=N&children=N&currency=EUR
  // dateFrom/dateTo are accepted as aliases for checkIn/checkOut.
  useMemo(() => {
    const q = new URLSearchParams(location.search || "");
    const isYmd = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || "");
    const num = (v) => (/^\d{1,2}$/.test(v || "") ? String(parseInt(v, 10)) : null);
    const checkIn = q.get("checkIn") || q.get("dateFrom");
    const checkOut = q.get("checkOut") || q.get("dateTo");
    // Both dates or neither — a lone date would half-apply and read as a bug.
    if (isYmd(checkIn) && isYmd(checkOut) && checkIn < checkOut) {
      localStorage.setItem("dateFrom", checkIn);
      localStorage.setItem("dateTo", checkOut);
    }
    const a = num(q.get("adults"));
    if (a && Number(a) > 0) localStorage.setItem("adults", a);
    const c = num(q.get("children"));
    if (c !== null) localStorage.setItem("children", c);
    const cur = (q.get("currency") || "").toUpperCase();
    if (/^[A-Z]{3}$/.test(cur)) localStorage.setItem("currency", cur);
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [startDate, setStartDate] = useState(
    dayjs(getStorageValue("dateFrom")) || null
  );
  const [endDate, setEndDate] = useState(getStorageValue("dateTo") || null);
  const SH_PROP = useState(getStorageValue("SH_PROP") || null);
  const [minStay, setMinStay] = useState(null);
  const [maxStay, setMaxStay] = useState(null);
  const [currencies, setCurrencies] = useState(localStorage.getItem("exchange") ? JSON.parse(localStorage.getItem("exchange")) : []);
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("currency"));
  const [onDemand, setonDemand] = useState(isOnDemandListing(property));
  const dateFrom = getStorageValue("dateFrom");
  const dateTo = getStorageValue("dateTo");
  const adults = Number(localStorage.getItem('adults') || '1');
  const children = Number(localStorage.getItem('children'))
  const ref = React.createRef();
  const [showSaveSearch, setShowSaveSearch] = useState(false);

  const [defaultPrice, setDefaultPrice] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const isBookConfirmed = searchParams.get("confirmed") ? true : false;
  const isLoading = useSelector((state) => state.property.isLoading);
  const properties = useSelector((state) => state.property.properties);
  const isSH = property ? property._id.substring(0, 2) === 'sh' : false
  const [loadingPrice, setLoadingPrice] = useState(false)
  const [unifiedQuote, setUnifiedQuote] = useState(null);

  // Live price for the selected dates comes from the unified /api/booking/quote
  // endpoint (ONE endpoint, every PM). load-fullcalendar above still drives the
  // date-picker availability + min/max-stay UI; this drives the PRICE.
  useEffect(() => {
    const id = property?._id;
    if (!id || !startDate || !endDate) { setUnifiedQuote(null); return; }
    const checkIn = dayjs(startDate).format("YYYY-MM-DD");
    const checkOut = dayjs(endDate).format("YYYY-MM-DD");
    if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid() || checkOut <= checkIn) {
      setUnifiedQuote(null); return;
    }
    let cancelled = false;
    setLoadingPrice(true);
    AuthService.getUnifiedQuote({
      listingId: id,
      checkIn,
      checkOut,
      guests: (parseInt(localStorage.getItem("adults") || "1") + parseInt(localStorage.getItem("children") || "0")) || 1,
      currency: selectedCurrency || "USD",
    })
      .then((res) => { if (!cancelled) setUnifiedQuote(res?.data || null); })
      .catch((e) => {
        if (!cancelled) setUnifiedQuote({ ok: false, available: false, error: "Live price unavailable for these dates." });
        console.error("unified quote failed:", e?.message || e);
      })
      .finally(() => { if (!cancelled) setLoadingPrice(false); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property?._id, startDate, endDate, selectedCurrency]);

  // Surface an unavailable live quote through the existing red-error list;
  // clear it once a valid quote comes back.
  useEffect(() => {
    if (!unifiedQuote) return;
    if (unifiedQuote.available === false || unifiedQuote.ok === false) {
      setErrors([unifiedQuote.error || "Not available for the selected dates. Please choose different dates."]);
    } else if (unifiedQuote.ok && unifiedQuote.available) {
      setErrors([]);
    }
  }, [unifiedQuote]);

  const price = makeCalculations({
    property,
    fullCalendar,
    unifiedQuote,
    activeRatePlan,
    dateFrom: startDate,
    dateTo: endDate,
    adults: parseInt(localStorage.getItem("adults") || "1"),
    children: parseInt(localStorage.getItem("children") || "0"),
    currency: selectedCurrency || "USD"
  });

  const [exchangeRate, setExchangeRate] = useState(1);
  const [refreshPrice, setRefreshPrice] = useState((price?.totalAmount + price?.totalTaxes) * exchangeRate);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Instant Book: detail-page popup (free-text guest details) → reserve page → auto-open Flywire.
  const emptyInstant = { firstName: "", lastName: "", middleName: "", email: "", phone: "", address: "", city: "", state: "", postalCode: "", country: "" };
  const [instantOpen, setInstantOpen] = useState(false);
  const [instantForm, setInstantForm] = useState(emptyInstant);
  const [instantErr, setInstantErr] = useState("");
  const formatDates = (date) => {
    return dayjs(date).format('DD-MM-YYYY')
  };

  const [form, setForm] = useState({
    clientFullName: "please choose client",
    extraDetails: "",
    destination: property?.address?.country,
    arrive: dayjs(localStorage.getItem('dateFrom')).format('DD-MM-YYYY'),
    depart: dayjs(localStorage.getItem('dateTo')).format('DD-MM-YYYY'),
    collections: "",
    amenities: "",
    guests: Number(localStorage.getItem('adults')) + Number(localStorage.getItem('children')),
    bedroom: localStorage.getItem('bedrooms'),
    priceRange: "",
    propertyType: "",
    mustHave: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {

    // const fetchCurrencies = async () => {
    //   try {
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${jToken}`;
    //     const response = await axios.get("https://api.triangle.luxury/xchange");
    //     const data = response.data;
    //     localStorage.setItem("exchange", JSON.stringify(data));
    //     setCurrencies(data);
    //   }
    //   catch (error) {
    //     console.error("Error fetching currencies:", error);
    //   }
    // }

    const agentInfo = JSON.parse(localStorage.getItem("agent") || "{}");
    const agentCurrency = agentInfo.currency || "USD";
    console.log('selected currency:', selectedCurrency || agentCurrency)
    if (!currencies) { console.log('fetchCurrencies()') }
  }, [])


  useEffect(() => {
    const storedArrivalDate = localStorage.getItem("dateFrom");
    const storedDepartDate = localStorage.getItem("dateTo");

    if (storedArrivalDate && storedDepartDate) {
      const newRefreshPrice = (price.totalAmount + price.totalTaxes) / exchangeRate;
      setRefreshPrice(newRefreshPrice);
    } else {
      setRefreshPrice(0);
    }
  }, [price?.totalAmount, price?.totalTaxes, defaultPrice, exchangeRate, selectedCurrency]);



  // useEffect(() => {

  //   const fetchListingDetails = async () => {
  //     const pathSegments = location.pathname.split("/");
  //     const listingId = pathSegments[pathSegments.length - 1];

  //     let propertyId = localStorage.getItem("propertyId");
  //     if (!propertyId) {
  //       console.log("No propertyId found in localStorage, setting it now.");
  //       localStorage.setItem("propertyId", listingId);
  //       propertyId = listingId;
  //     } else {
  //       console.log("Retrieved propertyId from localStorage:", propertyId);
  //     }
  //   };

  //   fetchListingDetails();
  // }, [location]);

  useEffect(() => {
    localStorage.removeItem('calculated')
  }, [isLoading]);

  useEffect(() => {
    const storedRules = JSON.parse(localStorage.getItem("rulesArray"));
    if (storedRules) {
      setRulesArray(storedRules);
    }
  }, []);

  useEffect(() => {
    const storedErrors = localStorage.getItem("bookingErrors");
    if (storedErrors) {
      setErrors(JSON.parse(storedErrors));
    }
  }, []);


  const doBack = (params) => {
    // Back → the listings page for the same partner/account the user was on.
    const acc = new URLSearchParams(location.search || "").get("acc")
      || location?.state?.property?.accountId
      || localStorage.getItem("accountId")
      || "";
    history.push(acc ? `/listings?accountId=${acc}` : "/listings");
  };

  function formattedDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const selectedClient = JSON.parse(localStorage.getItem("selectedClient")) || {};
    const clientName = `${selectedClient.firstName || ''} ${selectedClient.lastName || ''}`.trim();
    const clientId = selectedClient.client_id || 0;

    const submitPayload = {
      client_id: clientId,
      agent_id: props.agent?.agent_id,
      agency_id: props.agent?.agency_id,
      requestDate: formatDates(new Date()),
      destination: property?.address?.country,
      clientName: clientName || 'test',
      arrive: formatDates(localStorage.getItem('dateFrom')),
      depart: formatDates(localStorage.getItem('dateTo')),
      guests: ((localStorage.getItem("children")) + (localStorage.getItem("adults"))) || 1,
      bedroom: localStorage.getItem("bedrooms") || 0,
      propertyType: form.propertyType,
      collections: form.collections,
      priceRange: form.priceRange,
      offer: "",
    };

    AuthService.addWishListAPi(submitPayload)
      .then((response) => {
        closeModal();
        if (response) {
          swal({
            title: "Success",
            text: response.message,
            icon: "success",
          }).then(() => {
            history.push('/wishlist');
          });
        }
      })
      .catch((e) => {
        swal({
          title: "Error",
          text: e.response.data.message,
          icon: "error",
        });
      });
  };



  const handleCurrencyChange = (event) => {
    const selectedCurrencyCode = event.target.value;
    const selectedCurrency = currencies.find(
      (currency) => currency.currency_code === selectedCurrencyCode
    );
    console.log('changed cur:', selectedCurrencyCode, selectedCurrency)
    if (selectedCurrency) {
      setSelectedCurrency(selectedCurrency.currency_code);
      localStorage.setItem("currency", selectedCurrencyCode);
    }
  };


  const getCurrencyDisplayName = (currencyCode) => {
    const country = countryList.find(
      (country) => country.currency.code === currencyCode
    );
    if (country) {
      const { code, symbol, name } = country.currency;
      return `${code} ${symbol} (${name})`;
    }
    return currencyCode;
  };


  const getCurrencyDisplaySymbol = (currencyCode) => {
    const country = countryList.find(
      (country) => country.currency.code === currencyCode
    );
    if (country) {
      const { code, symbol } = country.currency;
      return `${code} ${symbol} `;
    }
    return currencyCode;
  };

  useEffect(() => {
    console.log(
      "dates have changed!",
      getStorageValue("dateFrom"),
      getStorageValue("dateTo")
    );
    const getMinStay = (day) => {
      let result = 0;
      const dayIs = dayjs(day).format("YYYY-MM-DD");
      if (fullCalendar) {
        fullCalendar
          .filter((date) => date.date.substring(0, 10) === dayIs)
          .forEach((element) => {
            result = element.minStay;
          });
      }
      if (result) {
        console.log("MinStay PER DAY:", dayIs, result);
      }
      return result;
    };

    const getMaxStay = (day) => {
      let result = 0;
      const dayIs = dayjs(day).format("YYYY-MM-DD");
      if (fullCalendar) {
        fullCalendar
          .filter((date) => date.date.substring(0, 10) === dayIs)
          .forEach((element) => {
            result = element.maxStay;
          });
      }
      result = result === 0 ? 365 : result;
      if (result) {
        console.log("MaxStay PER DAY:", dayIs, result);
      }
      return result;
    };
    const storedErrors = localStorage.getItem("bookingErrors");
    if (storedErrors) {
      setErrors(JSON.parse(storedErrors));
    }

    setDefaultPrice(false);
    if (startDate && !endDate) {
      setMinStay(getMinStay(startDate));
      setMaxStay(getMaxStay(startDate));

    } else if (!startDate && !endDate) {
      setMinStay(null);
      setMaxStay(null);
    }
  }, [startDate, endDate, fullCalendar, selectedCurrency]);

  const handleOpenSaveSearch = () => {
    setShowSaveSearch(true);
    document.body.style.overflow = "hidden";
  };

  const handleOpenShareAsPDF = () => {
    setShowShareAsPdf(true);
    document.body.style.overflow = "hidden";
  };

  const onChange = (arrivalDate, departDate) => {
    console.log("dates have changed!", arrivalDate, departDate);
    setStartDate(arrivalDate);
    setEndDate(departDate);
  };

  // Mirror the current selection into the address bar so the link is shareable.
  // replaceState, not navigate(): this must not push history entries or
  // re-render the page on every date tweak.
  useEffect(() => {
    const ymd = (d) => {
      if (!d) return "";
      const m = dayjs(d);
      return m.isValid() ? m.format("YYYY-MM-DD") : "";
    };
    const q = new URLSearchParams(window.location.search || "");
    const set = (k, v) => { if (v) q.set(k, v); else q.delete(k); };
    set("checkIn", ymd(startDate));
    set("checkOut", ymd(endDate));
    // Drop the aliases so we never emit both spellings of the same thing.
    q.delete("dateFrom"); q.delete("dateTo");
    set("adults", localStorage.getItem("adults") || "");
    const kids = localStorage.getItem("children");
    set("children", kids && kids !== "0" ? kids : "");
    set("currency", selectedCurrency || "");
    const search = q.toString();
    const next = window.location.pathname + (search ? `?${search}` : "");
    if (next !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, "", next);
    }
  }, [startDate, endDate, selectedCurrency]);

  const handleCloseSaveSearch = () => {
    setShowSaveSearch(false);
    document.body.style.overflow = "auto";
  };

  const favoriteIdsArray = JSON.parse(localStorage.getItem("favoriteIds"));
  const agentID = localStorage.getItem("agent_id");

  const [isPropertyInFavorites, setIsPropertyInFavorites] = useState(
    favoriteIdsArray ? favoriteIdsArray.includes(property?._id) : false
  );

  const favoriteAdd = async (propertyId) => {
    const favoritesResponse = await userRequest.post(
      `/favorite/add-favorite?agent_id=${agentID}&property_id=${propertyId}`
    );
  };

  const favoriteRemove = async (propertyId) => {
    const favoritesResponse = await userRequest.post(
      `/favorite/remove-favorite?agent_id=${agentID}&property_id=${propertyId}`
    );
  };

  const handleFavoriteToggle = async () => {
    try {
      setLoading(true);

      if (property) {
        const propertyId = property._id;
        if (isPropertyInFavorites) {
          await favoriteRemove(propertyId);
        } else {
          await favoriteAdd(propertyId);
        }
        setIsPropertyInFavorites(!isPropertyInFavorites);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  const setNextPic = () => {
    setPicIndex(picIndex + 1);
  };

  const setPrevPic = () => {
    let p = picIndex - 1;
    if (p < 0) {
      p += xdata?.pictures?.length||property?.pictures?.length;
    }
    setPicIndex(p);
  };

  const doSearch = (params) => {
    history.push(PATH_SEARCH);
  };


  const doBook = (params) => {
    history.push(PATH_RESERVE,
      {
        property,
        fullCalendar,
        agency,
        agent,
        totalPrice: price?.totalAmount,
        security: price?.security,
        selectedCurrency: selectedCurrency,
        activeRatePlan
      });
  };

  // Instant Book flow — same nav-state as doBook, plus the free-text guest
  // details + autoInstant so the reserve page opens Flywire automatically.
  const onInstantField = (name) => (e) => setInstantForm((p) => ({ ...p, [name]: e.target.value }));
  const closeInstant = () => { setInstantOpen(false); setInstantForm(emptyInstant); setInstantErr(""); };
  const openInstant = () => { setInstantForm(emptyInstant); setInstantErr(""); setInstantOpen(true); };
  const submitInstant = () => {
    const f = instantForm;
    const required = ["firstName", "lastName", "email", "phone", "address", "city", "country"];
    if (required.some((k) => !String(f[k] || "").trim())) { setInstantErr("Please fill in all required (*) fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) { setInstantErr("Enter a valid email address."); return; }
    setInstantErr("");
    setInstantOpen(false);
    history.push(PATH_RESERVE, {
      property, xdata, agency, agent,
      totalPrice: price?.totalAmount, security: price?.security,
      selectedCurrency, activeRatePlan,
      autoInstant: true,
      client: { ...f },
    });
  };
  // Show the Instant Book button for BookingPal listings unless instant book is
  // explicitly turned OFF (mirrors the hub instant-book logic).
  const _instantState = instantBookState({ xdata, hubId: property?._id });
  const showInstant = String(property?._id || "").startsWith("BP-") && _instantState.override !== false;

  if (property && property !== undefined) {
    let searchPropertiesArray = [];
    let prop = UseCreateObject(property, xdata);
    let pic = null;
    let picPosition = 0;

    if (!isNullOrEmptyArray(prop?.photos) && picIndex != null) {
      pic = prop?.photos[picIndex % prop.photos.length].original;
      picPosition = picIndex % prop?.photos?.length;
    }

    const bullet = (index) => {
      return (
        <span
          key={index}
          style={{
            fontSize: "26px",
            color: index === picPosition ? "#44C8F5" : "#D1D1D1",
            padding: "0 3px",
          }}
        >
          &bull;
        </span>
      );
    };
    const renderAmount = (title, pic, amount) => {
      return (
        <div className="property-page-body-top-left-info-amount pr-stat">
          <span className="pr-stat-ic"><img src={pic} alt="" /></span>
          <span className="pr-stat-text">
            {(amount || amount === 0) ? <b className="pr-stat-v">{amount}</b> : null}
            <span className="pr-stat-l">{title}</span>
          </span>
        </div>
      );
    };

    const toggleShowAllSummary = () => {
      setShowAllSummary(!showAllSummary);
    };

    const renderSentences = () => {
      const sentences = summary
        .split(".")
        .filter((sentence) => sentence.trim() !== "");

      return showAllSummary ? sentences : sentences.slice(0, 3);
    };
    const amenities = property?.amenities;
    const summary = xdata?.desc || property?.publicDescription?.summary || property?.publicDescription?.space
    // Backfilled per-listing booking terms (data.bookingTerms); falls back to the
    // generic copy below when a listing has no policy.
    const bookingTermsView = formatBookingTerms(property?.bookingTerms);
    const shCancel = smilingHouseCancellationCopy(property?.bookingTerms);
    const shCancelForDates = startDate ? cancellationForDates(property?.bookingTerms, startDate) : null;

    const toggleShowAll = () => {
      setShowAll(!showAll);
    };

    const renderAmenitiesss = (amenitiesToShow) => {
      return amenitiesToShow.map((amenity, idx) => (
        <li key={idx}>{amenity}</li>
      ));
    };

    const columnsArray = showAll
      ? Array.from({ length: Math.ceil(amenities.length / 6) }, (_, index) =>
        amenities.slice(index * 6, index * 6 + 6)
      )
      : Array.from({ length: 3 }, (_, index) =>
        amenities.slice(index * 6, index * 6 + 6)
      );

    prop = UseCreateObject(property);
    const mapContainerStyle = {
      width: "100%",
      height: "500px",
    };

    const center = {
      lat: prop.lat,
      lng: prop.lng,
    };

    const position = {
      lat: prop.lat,
      lng: prop.lng,
    };

    const onLoad = (marker) => { };

    const calculateSummaryLines = () => {
      const sentences = summary
        .split(".")
        .filter((sentence) => sentence.trim() !== "");
      const approximateLineHeight = 20;
      const totalLines = sentences.length;
      return totalLines > 8
        ? Math.ceil((totalLines * approximateLineHeight) / 20)
        : null;
    };

    const moreThanEightLines = calculateSummaryLines();
    const arrivalDate = getStorageValue("dateFrom") || "";
    const departDate = getStorageValue("dateTo") || "";
    //console.log("property price", property?.prices?.basePrice,property?.prices?.currency, '*', exchangeRate,'(',selectedCurrency?.currency_code,')' );
    localStorage.setItem("SelectedPropertiesItem", JSON.stringify(property));
    localStorage.setItem("totalSelectedPropertiesItem", 1);
    //console.log("onDemand", onDemand)
    const __inner = (
      <>

        {!noMenu && showSaveSearch && (
          <SaveSearchPopup onClose={handleCloseSaveSearch} />
        )}
        {showShareAsPdf && (
          <ShareSelectionPopup
            title="Share selection as PDFs for the client"
            icon={shareSelection}
            agent={agent}
            agency={agency}
            selectedProperties={[{ ...property, selected: true }]}
            showShareAsPdf={showShareAsPdf}
            onClose={() => setShowShareAsPdf(false)}
          />
        )}
        <LoadingBox visible={isLoading} />
        <div className="property-page-wrapper fluid-container">
          <div ref={ref} className="property-page-container">
            <div className="pr-topbar">
              {!links && (
                <button type="button" className="pr-back" onClick={doBack}>
                  <span className="pr-back-ic">‹</span> Back to listings
                </button>
              )}
              <nav className="pr-crumbs">
                <span>Listings</span>
                {prop?.countryName && <><span className="pr-crumb-sep">›</span><span>{prop.countryName}</span></>}
                {(xdata?.title || property?.title) && <><span className="pr-crumb-sep">›</span><span className="pr-crumb-cur">{xdata?.title || property?.title}</span></>}
              </nav>
            </div>
            <PropertyHeader
              title={xdata?.title || property?.title}
              subtitle={[prop?.city, prop?.state, prop?.countryName].filter(Boolean).join(", ")}
              status={xdata?.status}
              source={xdata?.source || location?.state?.source || location?.state?.channelSource || (String(property?._id || "").split("-")[0].length <= 3 ? String(property?._id || "").split("-")[0] : undefined)}
              id={property?._id || property?.id}
              photos={(curatedPics || (property?.pictures?.length ? property.pictures : prop?.photos) || []).length}
              instantBook={_instantState}
            />
            {/* property.pictures = hub-curated (hidden/branded stripped); xdata.pictures is a legacy copy */}
            <PropertyHero photos={curatedPics || (property?.pictures?.length ? property.pictures : prop?.photos) || []} onOpen={() => setTab("photos")} />
            <div className="pt-tabs-wrap"><TabBar tab={tab} onChange={setTab} admin={isAdminUser()} counts={{ photos: (curatedPics || (property?.pictures?.length ? property.pictures : prop?.photos) || []).length, calendar: Array.isArray(fullCalendar) ? fullCalendar.length : null }} /></div>

            {tab === "photos" && (
              <div className="pt-panel">
                <PhotoManager
                  inline
                  showHero={false}
                  onChanged={(d) => { const vis = (d?.images || []).filter((i) => !i.hidden).map((i) => ({ original: i.url, thumbnail: i.thumbnail || i.url })); if (vis.length) setCuratedPics(vis); }}
                  listingId={property?._id || property?.id}
                  title={xdata?.title || property?.title}
                  bedrooms={property?.bedrooms}
                  bathrooms={property?.bathrooms}
                  isAdmin={(() => { try { return ["extranet-vt-logged-in-role", "extranet-sh-logged-in-role"].some((k) => localStorage.getItem(k) === "admin") && !localStorage.getItem("partnerLogin"); } catch (e) { return false; } })()}
                  actor={(() => { try { const a = JSON.parse(localStorage.getItem("agent") || "{}"); return a.email || a.firstName || "extranet"; } catch (e) { return "extranet"; } })()}
                />
              </div>
            )}
            {tab === "calendar" && <div className="pt-panel"><CalendarTab fullCalendar={fullCalendar} currency={property?.prices?.currency} /></div>}
            {tab === "reviews" && <div className="pt-panel"><ReviewsTab property={property} xdata={xdata} /></div>}
            {tab === "raw" && canSeeTab("raw", isAdminUser()) && <div className="pt-panel"><RawDataTab property={property} xdata={xdata} fullCalendar={fullCalendar} ratePlans={location?.state?.ratePlans} /></div>}
            {tab === "sync" && canSeeTab("sync", isAdminUser()) && <div className="pt-panel"><SyncDataTab listing={location?.state || {}} xdata={xdata} property={property} /></div>}

            {tab === "details" && (<>
            <div className="container pt-panel" style={{ paddingBottom: 0 }}>
              <FlagsCard xdata={xdata} property={property} source={location?.state?.source || xdata?.source} instantBook={_instantState} tags={prop?.tags || []} />
            </div>
            <div className="container">
              <div className="row m-5">
                <div className="col-12 col-md-8 pr-details-col order-md-first order-last ">
                  <div className="row">
                    <div className="col">
                      <div className="property-page-body-top-subtitle text-start">
                        {property?.propertyType}{prop?.accommodates ? ` · up to ${prop.accommodates} guests` : ""}
                      </div>
                    </div>
                    <div className="col-2">
                      <span>
                        <img
                          className="property-main-picture-icon"
                          style={{ height: "35px", cursor: "pointer" }}
                          src={shareSelection}
                          alt="save searched"
                          disabled={loading}
                          onClick={handleOpenShareAsPDF}
                        />
                      </span>
                      <span>
                        <img
                          className="property-main-picture-icon"
                          style={{ height: "35px", cursor: "pointer" }}
                          src={saveIcon}
                          alt="save searched"
                          disabled={loading}
                          onClick={handleOpenSaveSearch}
                        />
                      </span>
                      <span style={{ padding: "15px" }}>
                        <img
                          className="property-main-picture-icon"
                          style={{ cursor: "pointer" }}
                          src={
                            isPropertyInFavorites ? likeFull : favoriteIcon
                          }
                          onClick={handleFavoriteToggle}
                          alt="favorite"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="border mt-4 mb-3" />
                  <div className="property-page-body-feature-row">
                    <Row mobileClass="mobile-class">
                      {renderAmount("Guests", peopleIcon, prop.accommodates)}
                      {renderAmount("Bedrooms", bedsIcon, prop.bedrooms)}
                      {renderAmount("Bathrooms", bathIcon, prop.bathrooms)}
                      {prop.tags.indexOf("eventCollection") > -1
                        ? renderAmount("Event Places", eventsIcon)
                        : ""}
                      {prop.tags.indexOf("familyCollection") > -1
                        ? renderAmount("For Families", familyIcon)
                        : ""}
                      {prop.tags.indexOf("petsCollection") > -1
                        ? renderAmount("Pets Welcome", petsIcon)
                        : ""}
                      {prop.tags.indexOf("sustainCollection") > -1
                        ? renderAmount("Sustainable", sustainIcon)
                        : ""}
                    </Row>
                  </div>
                  <div className="border mt-4 mb-3" />
                  <div>
                    <div
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        paddingBottom: "8px",
                      }}
                    >
                      Overview
                    </div>
                    <ul>
                      {renderSentences().map((sentence, index) => (
                        <li style={{ paddingTop: "10px" }} key={index}>
                          {sentence}
                        </li>
                      ))}
                    </ul>
                    {moreThanEightLines && (
                      <div className="text-right d-flex justify-content-end">
                        <span
                          style={{
                            borderBottom: "1px solid blue",
                            color: "blue",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={toggleShowAllSummary}
                        >
                          {!showAllSummary ? "Read More" : "Read Less"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border mt-4 mb-3" />
                  <div>
                    <div
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        paddingBottom: "8px",
                      }}
                    >
                      Amenities
                    </div>
                    <div className="row pr-amenities">
                      {columnsArray.map((column, columnIndex) => (
                        <div key={columnIndex} className="col-md-4">
                          <ul>{renderAmenitiesss(column)}</ul>
                        </div>
                      ))}
                    </div>
                    {amenities.length > 18 && (
                      <div className="text-right d-flex justify-content-end">
                        <span
                          style={{
                            borderBottom: "1px solid blue",
                            color: "blue",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={toggleShowAll}
                        >
                          {!showAll ? "All Amenities" : "Less Amenities"}
                        </span>
                      </div>
                    )}
                  </div>

                  {dateTo && dateFrom &&
                    <>
                      <div className="border mt-4 mb-3" />
                      <div className="py-2">
                        <div
                          style={{
                            fontSize: "25px",
                            fontWeight: "bold",
                            paddingBottom: "8px",
                          }}
                        >
                          Check-in and Check-out
                        </div>
                        <div>
                          Check-in time is <b>{formattedDate(dateFrom)}, {property?.defaultCheckInTime}</b>
                        </div>
                        <div>
                          Check-out time is <b>{formattedDate(dateTo)}, {property?.defaultCheckOutTime}</b>
                        </div>
                      </div>
                    </>}

                  <div className="border mt-4 mb-3" />
                  <div className="py-2">
                    <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                      House rules and a cancellation policy
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <ul className="px-4">
                            {rulesArray.map((rule, index) => (
                              <li key={index}>{rule}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {bookingTermsView.houseRulesText && (
                        <div style={{ fontSize: "18px", color: "#333", marginTop: "8px" }}><b>House rules:</b> {bookingTermsView.houseRulesText}</div>
                      )}
                      {bookingTermsView.depositText && (
                        <div style={{ fontSize: "18px", color: "#333", marginTop: "8px" }}><b>Deposit:</b> {bookingTermsView.depositText}</div>
                      )}
                      {(bookingTermsView.checkIn || bookingTermsView.checkOut) && (
                        <div style={{ fontSize: "18px", color: "#333", marginTop: "8px" }}>
                          <b>Check-in / Check-out:</b> {bookingTermsView.checkIn || property?.defaultCheckInTime || "—"} / {bookingTermsView.checkOut || property?.defaultCheckOutTime || "—"}
                          {bookingTermsView.checkInEnd ? ` (latest check-in ${bookingTermsView.checkInEnd})` : ""}
                        </div>
                      )}
                      {bookingTermsView.paymentSchedule && (
                        <div style={{ fontSize: "18px", color: "#333", marginTop: "8px" }}>
                          <b>Payment schedule:</b>
                          <ul className="px-4">
                            {bookingTermsView.paymentSchedule.map((p, i) => (
                              <li key={i}>{p.label}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div style={{ fontSize: "20px", color: "#707070" }}>
                        <br />
                        <b>Cancellation policy:</b>
                        {shCancel.nonRefundable && (
                          <span style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 4, background: "#fde8e8", color: "#b91c1c", fontWeight: 700, fontSize: 14 }}>
                            Non-refundable
                          </span>
                        )}
                        {shCancel.lines.map((line, i) => (
                          <div key={i} style={{ marginTop: 6, fontSize: 16 }}>{line}</div>
                        ))}
                        {shCancelForDates && (
                          <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 4, background: "#eef6ff", color: "#0b5cad", fontWeight: 600, fontSize: 16 }}>
                            {shCancelForDates.message}
                          </div>
                        )}
                        {shCancel.windows && (
                          <ul className="px-4" style={{ fontSize: 16 }}>
                            {shCancel.windows.map((w, i) => (
                              <li key={i}>{w.label}</li>
                            ))}
                          </ul>
                        )}
                        <br />
                        <a className="link18-bold" href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                          Click here to view complete property terms &
                          conditions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking / pricing widget — not for the extranet (decision 2026-08-21); kept for the embedded/PDF (noMenu) render only */}
                {noMenu && (
                <div className="col-12 col-md-4 p-3 pt-0 order-md-last order-first">
                  <div className="property-page-body-top-right">
                    {((!dateFrom || !dateTo) && !onDemand) && (
                      <div className="pr-price">
                        <div className="pr-price-label">Starting from</div>
                        <div className="pr-price-main">
                          <span className="pr-price-cur">{getCurrencyDisplaySymbol(selectedCurrency)}</span>
                          <span className="pr-price-num">{numeral(price?.totalAmount).format("0,0")}</span>
                          <span className="pr-price-per">/ night</span>
                        </div>
                        <div className="pr-price-comm">
                          + {getCurrencyDisplaySymbol(selectedCurrency)} {numeral((price?.totalAmount) / 10).format("0,0.0")} agency commission
                        </div>
                        {maxStay ? <span className="pr-price-pill">Up to {maxStay} nights</span> : null}
                      </div>
                    )}

                    {(dateFrom && dateTo && !onDemand) && (
                      <div className="pr-price">
                        <div className="pr-price-label">Total booking amount</div>
                        <div className="pr-price-main">
                          <span className="pr-price-cur">{getCurrencyDisplaySymbol(selectedCurrency)}</span>
                          <span className="pr-price-num">{price?.totalAmount.toFixed(0)}</span>
                          <span className="pr-price-per">for {selectedNights ? selectedNights : calculateTotalNights()} nights</span>
                        </div>
                        <div className="pr-price-comm">
                          + {getCurrencyDisplaySymbol(selectedCurrency)} {(price?.totalAmount / 10).toFixed(1)} agency commission
                        </div>
                      </div>
                    )}

                    {onDemand && (
                      <div className="d-flex align-items-center flex-wrap" style={{ gap: "10px", margin: "8px 0 16px" }}>
                        <OnDemandBadge />
                        <PriceOnRequest />
                      </div>
                    )}

                    <div>
                      <ul
                        style={{
                          listStyleType: "none",
                          padding: 0,
                          textAlign: "center",
                        }}
                      >

                        <li style={{ color: "green" }}>
                          {(minStay > 1) && (<>
                            min:{minStay} nights <br />
                          </>)}
                          {maxStay && (<>
                            max:{maxStay} nights <br />
                          </>)}
                        </li>
                        {errors.map((error, index) => {
                          return (
                            <li style={{ color: "red" }} key={index}>
                              {error}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="container">
                      <div className="row gap-3">
                        <div className="col">Arrive</div>
                        <div className="col">Departure</div>
                      </div>
                    </div>

                    <div className="container">
                      <div className="col-lg-12 col-12 mx-1 row gap-3 datepicker">
                        <DatePickerComponent
                          arrivalDate={arrivalDate}
                          departDate={departDate}
                          fullCalendar={fullCalendar}
                          onChange={onChange}
                        //disabled={noMenu}
                        />
                      </div>
                    </div>

                    {!onDemand && <div className="col-12 curr-dropdown">
                      <select
                        className="form-select"
                        aria-label="Currency select"
                        onChange={handleCurrencyChange}
                        value={selectedCurrency || ""}
                      >
                        <option value="">Select Currency</option>
                        {currencies.map((currency, index) => (
                          <option key={index} value={currency.currency_code}>
                            {getCurrencyDisplayName(currency.currency_code)}
                          </option>
                        ))}
                      </select>
                    </div>
                    }

                    {onDemand && (
                      <div className="mt-3 d-flex justify-content-center">
                        This property is &nbsp;<b>"On Demand"</b>
                      </div>
                    )}
                    {agent?.role === 'admin' && property && isSH && (
                      <div className="mt-3 d-flex justify-content-center">
                        This property is &nbsp;<b>"External RU/BP"</b>
                      </div>
                    )}
                    <div className="container mt-3">
                      {dateFrom !== null &&
                        dateTo !== null &&
                        dateFrom !== "null" &&
                        dateTo !== "null" &&
                        prop?.tags.indexOf("onDemand") === -1 && (
                          <Button
                            onClick={doBook}
                            style={{ width: "100%", margin: "10px 0" }}
                            variant="primary"
                            text="Book this Property Now"
                          />
                        )}
                      {showInstant &&
                        dateFrom !== null &&
                        dateTo !== null &&
                        dateFrom !== "null" &&
                        dateTo !== "null" &&
                        prop?.tags.indexOf("onDemand") === -1 && (
                          <Button
                            onClick={openInstant}
                            style={{ width: "100%", margin: "0 0 10px" }}
                            variant="green"
                            text="⚡ Instant Book"
                          />
                        )}
                      {dateFrom !== null &&
                        dateTo !== null &&
                        dateFrom !== "null" &&
                        dateTo !== "null" &&
                        prop.tags.indexOf("onDemand") > -1 && (
                          <>
                            <Button
                              onClick={openModal}
                              style={{ width: "100%" }}
                              variant="green"
                              text="Request a Hold"
                            />

                            {modalIsOpen && (
                              <Modal
                                title="Request a hold on demand property"
                                form={form}
                                onchangeHandler={handleInputChange}
                                submitHandler={submitHandler}
                                cancleClickButton={closeModal}
                                property={property}
                              />
                            )}

                          </>
                        )}
                    </div>
                    {instantOpen && (
                      <div onClick={closeInstant} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1060, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "60px 12px" }}>
                        <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 10, width: "100%", maxWidth: 640, padding: 20, boxShadow: "0 10px 40px rgba(0,0,0,0.25)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <h4 style={{ margin: 0 }}>Instant Book — guest details</h4>
                            <button onClick={closeInstant} style={{ border: "none", background: "none", fontSize: 26, cursor: "pointer", lineHeight: 1 }}>&times;</button>
                          </div>
                          <p style={{ color: "#666", marginTop: 0 }}>Enter the guest's details — you'll be taken to secure payment to confirm the booking instantly.</p>
                          <div className="row">
                            <div className="col-md-4 mb-2"><label>First name *</label><input className="form-control" value={instantForm.firstName} onChange={onInstantField("firstName")} maxLength={60} /></div>
                            <div className="col-md-4 mb-2"><label>Last name *</label><input className="form-control" value={instantForm.lastName} onChange={onInstantField("lastName")} maxLength={60} /></div>
                            <div className="col-md-4 mb-2"><label>Middle name</label><input className="form-control" value={instantForm.middleName} onChange={onInstantField("middleName")} maxLength={60} /></div>
                            <div className="col-md-4 mb-2"><label>E-mail *</label><input type="email" className="form-control" value={instantForm.email} onChange={onInstantField("email")} maxLength={120} /></div>
                            <div className="col-md-4 mb-2"><label>Phone *</label><input type="tel" className="form-control" value={instantForm.phone} onChange={onInstantField("phone")} maxLength={18} placeholder="+41 79 123 45 67" /></div>
                            <div className="col-md-4 mb-2"><label>Country *</label><input className="form-control" value={instantForm.country} onChange={onInstantField("country")} maxLength={60} /></div>
                            <div className="col-md-6 mb-2"><label>Address *</label><input className="form-control" value={instantForm.address} onChange={onInstantField("address")} maxLength={120} /></div>
                            <div className="col-md-2 mb-2"><label>City *</label><input className="form-control" value={instantForm.city} onChange={onInstantField("city")} maxLength={60} /></div>
                            <div className="col-md-2 mb-2"><label>State</label><input className="form-control" value={instantForm.state} onChange={onInstantField("state")} maxLength={60} /></div>
                            <div className="col-md-2 mb-2"><label>Zip</label><input className="form-control" value={instantForm.postalCode} onChange={onInstantField("postalCode")} maxLength={20} /></div>
                          </div>
                          {instantErr && <div style={{ color: "#b91c1c", margin: "6px 0" }}>{instantErr}</div>}
                          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
                            <button className="btn btn-outline-secondary" onClick={closeInstant}>Cancel</button>
                            <button className="btn btn-success" onClick={submitInstant}>Continue to payment</button>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* <div className="d-flex justify-content-center mt-1">
                      <button onClick={openModal}>RESERVATION</button>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="GS Price and Reservation"
                        style={{
                          content: {
                            top: "50%",
                            left: "50%",
                            right: "auto",
                            bottom: "auto",
                            marginRight: "-50%",
                            transform: "translate(-50%, -50%)",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            width: "60vw",
                          },
                        }}
                      >
                        <h2>GS Price and Reservation</h2>
                        <pre>{JSON.stringify(GSPriceAndRes, null, 2)}</pre>
                        <button onClick={closeModal}>Close</button>
                      </Modal>
                    </div> */}
                  </div>
                </div>
                )}
              </div>
            </div>

            <div className="property-location" style={{ width: "100%" }}>
              <div style={{ padding: "0 40px" }}>
                <h1>Location</h1>
                <div>
                  <LoadScript googleMapsApiKey="AIzaSyDJZiBl3NStDg82QA7I1t4La0Dqnwj7cb0">
                    <GoogleMap
                      id="marker-example"
                      mapContainerStyle={{ width: "100%", height: "500px" }}
                      zoom={14}
                      center={center}
                      options={{
                        mapTypeId: "terrain",
                        mapTypeControl: false,
                        zoomControl: true,
                        fullscreenControl: false,
                        rotateControl: false,
                        streetViewControl: false,
                      }}
                    >
                      <Marker onLoad={onLoad} position={position} />
                    </GoogleMap>
                  </LoadScript>
                </div>
              </div>
            </div>
            </>)}
          </div>
        </div>
      </>
    );

    // Embedded / PDF render (noMenu) stays chrome-less; otherwise show the
    // platform shell (top bar + left nav) like the rest of the site.
    return (links || noMenu) ? __inner : (
      <Layout agency={agency} agent={agent} token={jToken}>
        {__inner}
      </Layout>
    );
  }
};

export default Property;