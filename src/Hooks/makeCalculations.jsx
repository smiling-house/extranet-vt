import { useEffect, useState } from 'react';
import { calculateTotalNights, isPercentage } from '../Util/general';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

import taxesNames from "../Util/data/taxesNames.json";
//import moment from "moment/moment";

function makeCalculations  (props) {
  const { property, activeRatePlan, fullCalendar, unifiedQuote, dateFrom, dateTo, adults = 1, children = 0, currency = 'USD', reservation_id = 'xxxx' } = props
  const client = localStorage.getItem("selectedClient") ? JSON.parse(localStorage.getItem("selectedClient")) : {}
  let calculated =false;
  let totalAF = 0;
  let totalAFRES =0;
  let totalAmount= 0
  let security = 0
  let totalAmountRES= 0
  let totalTaxes= 0
  let totalTaxesRES = 0
  let exchangeRate = 1
  let externalPrice = null
  let propertyExchangeRate = 1
  let agencyCommission= 0
  let agencyCommissionRES = 0
  let taxesArray = [];
  let resPayload = {}
  let dailyRatesRES = [];
  let taxesArrayRES = [];
  let exchangeRates = JSON.parse(localStorage.getItem("exchange") || "[]")
  let accommodates = adults + children || 1;
  let accountId = property?.accountId;
  let RatePlanCode = activeRatePlan
  let propertyId = property?._id
  let isSH = propertyId ? propertyId.substring(0, 2) === 'sh' : false
  let propertyTitle = property?.title
  let todayDate = new Date()
  let propertyCurrency = property?.prices?.currency
  let divider = (accountId === '585a39dbe43900100017e9e8') ? 0.86 : 0.78;
  let nights = calculateTotalNights(dateFrom, dateTo);
  let error = []
  //console.log('propertyId.slice(2)',propertyId?.substring(0, 2),isSH)
  function getExchangeRate(cur) {
    return exchangeRates.find(
      (rate) => rate.currency_code === cur
    )?.conversion_rates || 1;
  }

  function getTaxPerType(taxType) {
    return taxesNames.find(
      (tax) => tax.type === taxType
    ) || {};
  }

  function getEXprice() {
    console.log('getting prices for ID:', propertyId)
    let data = JSON.stringify({
      "dateFrom": "2024-10-24",
      "dateTo": "2024-10-29",
      "currency": "EUR",
      "adults": 2,
      "children": 0
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.villatracker.com/qoute/sh5734',
      headers: {
        'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c',
        'Account-Id': '640625ea0620e40031b8597d',
        'Content-Type': 'application/json'
      },
      data: data
    };
    console.log('con:',config)
    axios.request(config)
      .then((response) => {
        console.log('respond of PRICE GET SHUB:',response.data,JSON.stringify(response.data));
        externalPrice=response.data
        return (response.data)
      })
      .catch((error) => {
        console.log(error);
        return (error)
      });
return ('some error fetching')

  }

  function buildRESPayload() {
    // if (!property&&activeRatePlan&&fullCalendar&&dateFrom&& dateTo && adults) {
    //   return }
    const RatePlanCode = activeRatePlan
    const propertyId = property?._id
    const propertyTitle = property?.title
    const todayDate = new Date()
    const propertyCurrency = property?.prices?.currency
    if (!client) {

    }
    // console.log('propertyCurrency:', propertyCurrency)
    // console.log('ratePlanCode:', RatePlanCode)
    // console.log('propertyId:', propertyId)
    // console.log('propertyTitle:', propertyTitle)
    // console.log('todayDate:', dayjs(todayDate).format('YYYY-MM-DD'))
    // console.log('client:', client)
    // console.log('dailyRatesRES:', dailyRatesRES)
    // console.log('taxesArrayRES:', taxesArrayRES)

    // const finCollection=taxesArray.map((tax)=>
    //finCollection
    // const finCollection =
    //   [
    //     {
    //       "NormalType": "AF",
    //       "Amount": 3,
    //       "Description": "Accommodation Fare",
    //       "CreatedBy": "SmilingHouse"
    //     },
    //     {
    //       "NormalType": "PCM", // 10 % in Minus 
    //       "Amount": -0.28,
    //       "Description": "Prededucted Host Channel Fee",
    //       "CreatedBy": "SmilingHouse"
    //     },

    //     {
    //       "NormalType": "CF",
    //       "Amount": 25,
    //       "Description": "Cleaning Fee",
    //       "CreatedBy": "SmilingHouse"
    //     }
    //   ]
    const finCollection = Object.keys(taxesArrayRES).length > 0 ? Object.keys(taxesArrayRES)
      .map((key) => (
        (
          {
            "NormalType": taxesArrayRES[key].initial,
            "Amount": taxesArrayRES[key].amount,
            "Description": taxesArrayRES[key].description,
            "CreatedBy": "VillaTracker"
          }
        )
      )
      ) : {};
    //console.log('finCollection2:', finCollection)
    //rates
    const rates = Object.keys(dailyRatesRES).length > 0 ? Object.keys(dailyRatesRES)
      .map((key) => (
        (
          {
            Base: {
              AmountAfterTax: dailyRatesRES[key].price,
              CurrencyCode: propertyCurrency,
            },
            UnitMultiplier: 0,
            EffectiveDate: dailyRatesRES[key].EffectiveDate,
            ExpireDate: dailyRatesRES[key].ExpireDate,
          }
        )
      )
      ) : {};
    //console.log('rates:', rates)

    // const rates = [
    //   {
    //     "Base": {
    //       "AmountAfterTax": 1,
    //       "CurrencyCode": "EUR"
    //     },
    //     "UnitMultiplier": 0,
    //     "EffectiveDate": "2024-11-14",
    //     "ExpireDate": "2024-11-15"
    //   },
    //   {
    //     "Base": {
    //       "AmountAfterTax": 1,
    //       "CurrencyCode": "EUR"
    //     },
    //     "UnitMultiplier": 0,
    //     "EffectiveDate": "2024-11-15",
    //     "ExpireDate": "2024-11-16"
    //   },
    //   {
    //     "Base": {
    //       "AmountAfterTax": 1,
    //       "CurrencyCode": "EUR"
    //     },
    //     "UnitMultiplier": 0,
    //     "EffectiveDate": "2024-11-16",
    //     "ExpireDate": "2024-11-17"
    //   }
    // ]
    const reservation = {
      "POS": {
        "Source": [
          {
            "RequestorID": {
              "Type": 0,
              "ID": "VTR"
            },
            "BookingChannel": {
              "CompanyName": {
                "Text": "VillaTracker"
              }
            }
          }
        ]
      },
      "HotelReservations": {
        "HotelReservation": {
          "UniqueID": {
            "Type": 14,
            "ID": `VT_${reservation_id}`
          },
          "RoomStays": {
            "RoomStay": [
              {
                "RoomTypes": {
                  "RoomType": {
                    "RoomTypeCode": propertyId,
                    "RoomDescription": {
                      "Name": propertyTitle
                    }
                  }
                },
                "RatePlans": {

                  "RatePlan": [
                    {
                      "RatePlanCode": RatePlanCode,
                      "MealsIncluded": {
                        "Breakfast": false,
                        "Lunch": false,
                        "Dinner": false
                      }
                    }
                  ]
                },
                "RoomRates": {
                  "RoomRate": [
                    {
                      "Rates": {
                        "Rate": rates
                      },
                      "RoomTypeCode": propertyId,
                      "NumberOfUnits": 1
                    }
                  ]
                },
                "GuestCounts": {
                  "GuestCount": [
                    {
                      "AgeQualifyingCode": 10,
                      "Count": adults
                    },
                    {
                      "AgeQualifyingCode": 8,
                      "Count": children
                    }
                  ]
                },
                "TimeSpan": {
                  "Start": dayjs(dateFrom).format('YYYY-MM-DD'),
                  "End": dayjs(dateTo).format('YYYY-MM-DD')
                },
                "BasicPropertyInfo": {
                  "HotelCode": accountId,
                  "HotelName": propertyTitle
                },
                "tpa_Extensions": {
                  "FinCollection": finCollection
                }
              }
            ]
          },
          "ResGuests": {
            "ResGuest": [
              {
                "Profiles": {
                  "ProfileInfo": [
                    {
                      "Profile": {
                        "Customer": {
                          "PersonName": {
                            "GivenName": client?.firstName,
                            "Surname": client?.lastName
                          },
                          "Telephone": {
                            "PhoneNumber": client?.phone
                          }
                        },
                        "ProfileType": 1
                      }
                    }
                  ]
                }
              }
            ]
          },
          "ResGlobalInfo": {
            "HotelReservationIDs": {
              "HotelReservationID": [
                {
                  "ResID_Type": 14,
                  "ResID_Value": `VT_${reservation_id}`,
                  "ResID_Source": "VillaTracker"
                }
              ]
            },
            "Total": {
              "Taxes": {
                "Tax": []
              },
              "AmountBeforeTax": totalAmountRES - totalTaxesRES, //AF
              "AmountAfterTax": totalAmountRES,
              "CurrencyCode": propertyCurrency
            },
            //"depositPayments": {
            // "AcceptedPayments": {
            //   "AcceptedPayment": {
            //     "PaymentCard": {
            //       "CardHolderName": "undefined undefined",
            //       "CardNumber": "",
            //       "ExpireDate": "",
            //       "SeriesCode": "",
            //       "CardCode": ""
            //     }
            //   }
            // },
            //   "AmountPercent": {
            //     "Amount": totalAmountRES,
            //     "CurrencyCode": propertyCurrency
            //   }
            // },
            "Profiles": {
              "ProfileInfo": [
                {
                  "Profile": {
                    "Customer": {
                      "PersonName": {
                        "GivenName": client?.firstName,
                        "Surname": client?.lastName
                      },
                      "Email": client?.email
                    },
                    "ProfileType": 21
                  }
                }
              ]
            },
            "TimeSpan": {
              "Start": dayjs(dateFrom).format('YYYY-MM-DD'),
              "End": dayjs(dateTo).format('YYYY-MM-DD')
            }
          },
          "CreateDateTime": todayDate
        }
      },
      "EchoToken": uuidv4(),
      "ResStatus": "Commit",
      "TimeStamp": todayDate
    }
    return reservation
  }
  const addToDailyRates = (day) => {
    //console.log(tax,taxesArray)
    dailyRatesRES.push(day)
  }
  const addToTaxes = (tax) => {
    //console.log(tax,taxesArray)
    taxesArray.push(tax)
  }
  const addToTaxesRES = (taxRES) => {
    //console.log(taxRES,taxesArrayRES)
    taxesArrayRES.push(taxRES)
    //setTaxesArrayRES([...taxesArrayRES,taxRES])
  }
  

  // start calculation

    exchangeRate = getExchangeRate(currency);
    
    propertyExchangeRate=getExchangeRate(property?.prices?.currency); //set property exchange rate

    const multiplier = (exchangeRate / propertyExchangeRate) / divider; //main multiplier = for selected currency
    // console.log('currency:', currency, selectedCurrencyRate, divider)
    if (property && (!dateFrom || !dateTo)) { // means return PRICE PER NIGHT only from base price.
      totalAmount=property?.prices?.basePrice * multiplier;
      localStorage.removeItem('SH_PROP') //remove from local.
    } else if (property && dateFrom && dateTo && unifiedQuote && unifiedQuote.ok && unifiedQuote.available) {
      // ── Unified live quote ────────────────────────────────────────────────
      // The NET now comes from GET /api/booking/quote (ONE endpoint, every PM)
      // instead of a local calendar sum. We ONLY apply the extranet's own markup
      // (divider) + FX + the PCM host-channel line here; the endpoint already
      // returns rent + fees + taxes as NET line items in unifiedQuote.currency.
      const netCurrency = unifiedQuote.currency || propertyCurrency;
      const netExchangeRate = getExchangeRate(netCurrency);
      // NET(netCurrency) → display currency, WITH the extranet markup divider.
      const uMultiplier = (exchangeRate / netExchangeRate) / divider;
      // FX-only (never marked up) — for the refundable security deposit.
      const fxOnly = exchangeRate / netExchangeRate;

      const netTotal = Number(unifiedQuote.netTotal) || 0;
      const feesTotalNet = Number(unifiedQuote.feesTotal) || 0;
      const taxesTotalNet = Number(unifiedQuote.taxesTotal) || 0;
      const taxPriceNet = feesTotalNet + taxesTotalNet;   // == old totalTaxPrice (cleaning + taxes)
      const rentNet = netTotal - taxPriceNet;             // == old AF sum (net grand total is authoritative)

      const liList = Array.isArray(unifiedQuote.lineItems) ? unifiedQuote.lineItems : [];
      taxesArray.length = 0;
      taxesArrayRES.length = 0;

      // Guest-facing itemization (marked up): map the endpoint line items 1:1.
      liList.forEach((li) => {
        addToTaxes({
          amount: (Number(li.amount) || 0) * uMultiplier,
          description: li.description || li.name || li.initial,
          initial: li.initial,
        });
      });

      // Channel breakdown (NET, native): fees + taxes, then the extranet PCM line.
      liList
        .filter((li) => li.initial === 'CF' || li.initial === 'FE' || li.initial === 'TX')
        .forEach((li) => {
          addToTaxesRES({
            amount: Number(li.amount) || 0,
            description: li.description || li.name || li.initial,
            initial: li.initial,
          });
        });
      addToTaxesRES({
        amount: -(netTotal) / 10,
        description: "Prededucted Host Channel Fee",
        initial: "PCM",
      });

      // Security deposit: FX only, NEVER marked up (same rule as before).
      if (unifiedQuote.securityDeposit) {
        const deposit = Number(unifiedQuote.securityDeposit) || 0;
        security = deposit * fxOnly;
        localStorage.setItem('security', security);
      }

      totalAFRES = rentNet;
      totalAF = rentNet * uMultiplier;
      totalAmountRES = netTotal;
      totalTaxesRES = taxPriceNet;
      totalAmount = netTotal * uMultiplier;
      totalTaxes = taxPriceNet * uMultiplier;
      calculated = true;
    } else if (property && dateFrom && dateTo && (!unifiedQuote || unifiedQuote.available === false || unifiedQuote.ok === false)) {
      // Dates chosen but the live quote is unavailable (blocked / min-stay / error)
      // or still loading — surface the reason and leave totals at 0. Never fall
      // back to a stale local price path (no leftovers).
      if (unifiedQuote && (unifiedQuote.available === false || unifiedQuote.ok === false)) {
        error.push({ error: unifiedQuote.error || 'Not available for the selected dates. Please choose different dates.' })
      }
    }

    agencyCommission=totalAmount / 10;
    agencyCommissionRES=totalAmountRES / 10;
    //resPayload=buildRESPayload()

  if (isSH) {
    // Live prices for SH-native (sh…) listings now come from the unified
    // /api/booking/quote endpoint like every other channel; the old getEXprice()
    // self-call (expired JWT, result never used) is gone.
    const SH_ID = propertyId.substring(2, 20)
    localStorage.setItem('SH_PROP', SH_ID) //setting the SH ID for top level dispatch on effect
  }
  const price = {
    reservation_id,
    totalAmount,
    totalTaxes,
    taxesArray,
    agencyCommission,
    totalAmountRES,
    totalTaxesRES,
    taxesArrayRES,
    agencyCommissionRES,
    exchangeRate,
    propertyExchangeRate,
    //resPayload
  }

  const success = (!error)
  //console.log('price return:',price)
  return {
    error,
    calculated,
    success,
    reservation_id,
    totalAmount,
    security,
    totalTaxes,
    taxesArray,
    agencyCommission,
    totalAmountRES,
    totalTaxesRES,
    taxesArrayRES,
    agencyCommissionRES,
    exchangeRate,
    propertyExchangeRate,
    //resPayload
  };
};

export default makeCalculations;
