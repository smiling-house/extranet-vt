import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { userRequest } from "../../api/requestMethods";
import { calculateTotalNights, detectCurrency } from "../../Util/general";
import NameSelect from "../../components/Forms/Fields/NameAutoComplete/NameSelect";
import { toast } from "react-toastify";

const CheckoutForm = ({
  amount,
  minStay,
  currency,
  onSubmit,
  client,
  property,
  getAllClients,
}) => {
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const HelpIcon = () => {
    return (
      <svg
        className="Union_82"
        viewBox="-3085 4096 18.001 18"
        width={20}
        height={20}
      >
        <path
          id="Union_82"
          d="M -3085.000244140625 4105 C -3085.000244140625 4100.029296875 -3080.97021484375 4096.00048828125 -3076 4096.00048828125 C -3071.029541015625 4096.00048828125 -3066.99951171875 4100.029296875 -3066.99951171875 4105 C -3067.005126953125 4109.9677734375 -3071.03173828125 4113.994140625 -3076 4114 C -3080.97021484375 4114 -3085.000244140625 4109.970703125 -3085.000244140625 4105 Z M -3083.614990234375 4105 C -3083.614990234375 4109.2060546875 -3080.2060546875 4112.61572265625 -3076 4112.61572265625 C -3071.793701171875 4112.61572265625 -3068.384521484375 4109.2060546875 -3068.384521484375 4105 C -3068.3896484375 4100.796875 -3071.7958984375 4097.3896484375 -3076 4097.384765625 C -3080.2060546875 4097.384765625 -3083.614990234375 4100.794921875 -3083.614990234375 4105 Z M -3076.6923828125 4109.1533203125 C -3076.6923828125 4108.77197265625 -3076.38232421875 4108.4619140625 -3076 4108.4619140625 C -3075.617431640625 4108.4619140625 -3075.307373046875 4108.77197265625 -3075.307373046875 4109.1533203125 C -3075.307373046875 4109.5361328125 -3075.617431640625 4109.84619140625 -3076 4109.84619140625 C -3076.38232421875 4109.84619140625 -3076.6923828125 4109.5361328125 -3076.6923828125 4109.1533203125 Z M -3076.6923828125 4107.07666015625 C -3076.60205078125 4106.197265625 -3076.1533203125 4105.3935546875 -3075.451171875 4104.8564453125 C -3075.020751953125 4104.4267578125 -3074.615478515625 4104.0205078125 -3074.615478515625 4103.615234375 C -3074.615478515625 4102.8505859375 -3075.23486328125 4102.2314453125 -3076 4102.2314453125 C -3076.7646484375 4102.2314453125 -3077.38427734375 4102.8505859375 -3077.38427734375 4103.615234375 C -3077.38427734375 4103.998046875 -3077.6943359375 4104.30810546875 -3078.076904296875 4104.30810546875 C -3078.459228515625 4104.30810546875 -3078.769287109375 4103.998046875 -3078.769287109375 4103.615234375 C -3078.769287109375 4102.0869140625 -3077.52978515625 4100.845703125 -3076 4100.845703125 C -3074.47021484375 4100.845703125 -3073.230224609375 4102.0869140625 -3073.230224609375 4103.615234375 C -3073.320556640625 4104.4951171875 -3073.769775390625 4105.298828125 -3074.472412109375 4105.8359375 C -3074.90185546875 4106.26611328125 -3075.307373046875 4106.67138671875 -3075.307373046875 4107.07666015625 C -3075.307373046875 4107.45947265625 -3075.617431640625 4107.76953125 -3076 4107.76953125 C -3076.38232421875 4107.76953125 -3076.6923828125 4107.45947265625 -3076.6923828125 4107.07666015625 Z"
        ></path>
      </svg>
    );
  };

  const makeGuestyReservation = async () => {
    try {
      const payload = {
        POS: {
          Source: [
            {
              RequestorID: {
                Type: 0,
                ID: "SHO",
              },
              BookingChannel: {
                CompanyName: {
                  Text: "SmilingHouse",
                },
              },
            },
          ],
        },
        HotelReservations: {
          HotelReservation: {
            UniqueID: {
              Type: 14,
            },
            RoomStays: {
              RoomStay: [
                {
                  RoomTypes: {
                    RoomType: {
                      RoomDescription: {
                        Name: "Gstaad apartment",
                      },
                      RoomTypeCode: "637e057f932637002e059708",
                    },
                  },
                  RatePlans: {
                    RatePlan: [
                      {
                        RatePlanCode: "63d011c328fd3ba68a5ca477",
                        MealsIncluded: {
                          Breakfast: false,
                          Lunch: false,
                          Dinner: false,
                        },
                      },
                    ],
                  },
                  RoomRates: {
                    RoomRate: [
                      {
                        Rates: {
                          Rate: [
                            {
                              Base: {
                                AmountAfterTax: 183,
                                CurrencyCode: "USD",
                              },
                              UnitMultiplier: 0,
                              EffectiveDate: "2023-05-17",
                              ExpireDate: "2023-05-18",
                            },
                            {
                              Base: {
                                AmountAfterTax: 227,
                                CurrencyCode: "USD",
                              },
                              UnitMultiplier: 0,
                              EffectiveDate: "2023-05-18",
                              ExpireDate: "2023-05-19",
                            },
                          ],
                        },
                        RoomTypeCode: "637e057f932637002e059708",
                        RatePlanCode: "63d011c328fd3ba68a5ca477",
                        NumberOfUnits: 1,
                      },
                    ],
                  },
                  GuestCounts: {
                    GuestCount: [
                      {
                        AgeQualifyingCode: 10,
                        Count: 2,
                      },
                      {
                        AgeQualifyingCode: 8,
                        Count: 0,
                      },
                    ],
                  },
                  TimeSpan: {
                    Start: "2023-05-17",
                    End: "2023-05-19",
                  },
                  BasicPropertyInfo: {
                    HotelCode: "640625ea0620e40031b8597d",
                    HotelName: "Gstaad House",
                  },
                  tpa_Extensions: {
                    FinCollection: [
                      {
                        NormalType: "AF",
                        Amount: 410,
                        Description: "Accommodation Fare",
                        CreatedBy: "SmilingHouse",
                      },
                      {
                        NormalType: "AFE",
                        SecondaryType: "RESORT",
                        Amount: 38,
                        Description: "Resort Fee",
                        CreatedBy: "SmilingHouse",
                      },
                      {
                        NormalType: "CT",
                        Amount: 53.3,
                        Description: "City Tax",
                        CreatedBy: "SmilingHouse",
                      },
                    ],
                  },
                },
              ],
            },
            ResGuests: {
              ResGuest: [
                {
                  Profiles: {
                    ProfileInfo: [
                      {
                        Profile: {
                          Customer: {
                            PersonName: {
                              GivenName: "Yair",
                              Surname: "Yair",
                            },
                            Telephone: {
                              PhoneNumber: "+145345345",
                            },
                          },
                          ProfileType: 1,
                        },
                      },
                    ],
                  },
                },
              ],
            },
            ResGlobalInfo: {
              HotelReservationIDs: {
                HotelReservationID: [
                  {
                    ResID_Type: 14,
                    ResID_Value: "WS3453454533",
                    ResID_Source: "SmilingHouse",
                  },
                ],
              },
              Total: {
                Taxes: {
                  Tax: [
                    {
                      Amount: 53.3,
                      Code: 3,
                    },
                  ],
                },
                AmountBeforeTax: 448,
                AmountAfterTax: 501.3,
                CurrencyCode: "USD",
              },
              Profiles: {
                ProfileInfo: [
                  {
                    Profile: {
                      Customer: {
                        PersonName: {
                          GivenName: "Yair",
                          Surname: "Yair",
                        },
                        Email: "yair@yair.com",
                      },
                      ProfileType: 21,
                    },
                  },
                ],
              },
              TimeSpan: {
                Start: "2023-05-17",
                End: "2023-05-19",
              },
            },
            CreateDateTime: "2023-02-08T20:00:18.062388+00:00",
          },
        },
        EchoToken: "0521dbd7-5f15-4163-bfc9-18a12b699d07",
        ResStatus: "Commit",
        TimeStamp: "2023-02-08T20:00:18.062245+00:00",
      };
      const response = await userRequest.put("/shub/new-reservation",payload);
      toast.success("Guesty Reservation completed!", {
        position: "top-right",
        toastClassName: "custom-toast",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const makeReservation = async () => {
    //  const data = onSubmit(event);
    const payload = {
      agencyName: JSON.parse(localStorage.getItem("travelAgency")).agencyName,
      agency_id: JSON.parse(localStorage.getItem("travelAgency")).agency_id,
      agent_id: 1,
      bookedAt: new Date(),
      bookingId: 1,
      cancellationFee: 0,
      cancellationPolicyCategory: "string",
      client_id: 1,
      confirmationCode: "string",
      currency: property?.prices?.currency,
      endDate: localStorage.getItem("dateTo"),
      fees: "string",
      guestBookingStatus: 0,
      guestEmail: client?.email,
      guestFirstName: client?.firstName,
      guestLastName: client?.lastName,
      guestPhonenCode: 0,
      guestPhoneNumbers: client?.phone,
      guestId: client?.id,
      guestPreferredLocale: "string",
      nightlyBasePrice: property?.prices?.basePrice,
      nights: calculateTotalNights(),
      numberOfGuests: property?.accommodates,
      payment_type: "hold",
      propertyId: property?._id,
      reservationID: "123",
      startDate: localStorage.getItem("dateFrom"),
      status: "string",
      taxAmount: 0,
      total: amount,
    };
    const response = await userRequest.post(
      "/reservation/add-reservation",
      payload
    );

    // alert("Reservation Completed");
    toast.success("Reservation Completed!", {
      position: "top-right",
      toastClassName: "custom-toast",
    });
    makeGuestyReservation()
    getAllClients();
    console.log("Reservation Completed", response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: event.target.name.value,
      },
    });
    if (error) {
      console.log(error);
      setProcessing(false);
    } else {
      const { data } = await userRequest.post("/stripe/create-payment-intent", {
        amount: Math.trunc(amount),
        currency: currency?.toLowerCase(),
      });

      const { error } = await stripe.confirmCardPayment(data?.clientSecret, {
        payment_method: paymentMethod.id,
      });
      console.log(error);
      if (error) {
        console.log(error);
        setProcessing(false);
      } else {
        console.log("Payment successful!");
        toast.success("Payment Successful!", {
          position: "top-right",
          toastClassName: "custom-toast",
        });
        // alert("Payment successful!");
        makeReservation();
      }
    }
  };
  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#ced4da",
        },
        height: "200px",
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const countries = [
    {
      _id: "64503228a1763a286c3ec9e9",
      firstName: "Switzerland",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 16,
      createdAt: "2023-05-01T21:42:01.922Z",
      updatedAt: "2023-05-01T21:42:01.922Z",
      __v: 0,
    },
    {
      _id: "645030dda1763a286c3ec9dc",
      firstName: "Canada",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 15,
      createdAt: "2023-05-01T21:36:29.760Z",
      updatedAt: "2023-05-01T21:36:29.760Z",
      __v: 0,
    },
    {
      _id: "645030b1a1763a286c3ec9d2",
      firstName: "United State",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 14,
      createdAt: "2023-05-01T21:35:46.362Z",
      updatedAt: "2023-05-01T21:35:46.362Z",
      __v: 0,
    },
  ];

  const currencies = [
    {
      _id: "64503228a1763a286c3ec9e9",
      firstName: "United State Dollars",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 16,
      createdAt: "2023-05-01T21:42:01.922Z",
      updatedAt: "2023-05-01T21:42:01.922Z",
      __v: 0,
    },
    {
      _id: "645030dda1763a286c3ec9dc",
      firstName: "Pound",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 15,
      createdAt: "2023-05-01T21:36:29.760Z",
      updatedAt: "2023-05-01T21:36:29.760Z",
      __v: 0,
    },
    {
      _id: "645030b1a1763a286c3ec9d2",
      firstName: "Euro",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 14,
      createdAt: "2023-05-01T21:35:46.362Z",
      updatedAt: "2023-05-01T21:35:46.362Z",
      __v: 0,
    },
  ];

  return (
    <form
      className="row g-3 d-flex flex-column align-items-start mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="row py-2">
        <div className="col-md-6 px-4">
          <label className="form-label">Card Holder First Name</label>
          <input
            type="text"
            className="form-control border"
            style={{ padding: "10px" }}
            name="firstName"
          />
        </div>
        <div className="col-md-6 px-4">
          <label className="form-label">Card Holder Last Name</label>
          <input
            type="text"
            className="form-control border"
            style={{ padding: "10px" }}
            name="lastName"
          />
        </div>
      </div>
      <div className="row gap-3 py-2 px-4">
        <div className="col-md-4">
          <label className="form-label">Address</label>
          <div className="input-group has-validation">
            <input
              type="address"
              className="form-control border"
              style={{ padding: "10px" }}
              name="address"
            />
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control border"
            style={{ padding: "10px" }}
            name="city"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Country</label>
          <NameSelect
            clients={"clients"}
            client={countries}
            setClient={"setClient"}
            setClients={"setClient"}
            onClientChange={() => {}}
            padding={"2px !important"}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control border"
            style={{ padding: "10px" }}
            name="postalCode"
          />
        </div>
      </div>
      <div className="row w-100 py-2 px-4 d-flex ">
        <div className="w-75 pe-2">
          <label className="form-label">Card details</label>
          <div className="card-input">
            <CardElement options={cardStyle} id="card-element" />
          </div>
        </div>
        <div className="w-25 ps-2">
          <label className="form-label">Currency</label>
          {/* <select className="form-select pt-3 pb-4">
            <option selected disabled value>
              United States dollar
            </option>
          </select> */}
          <NameSelect
            clients={"clients"}
            client={currencies}
            setClient={"setClient"}
            setClients={"setClient"}
            onClientChange={() => {}}
            padding={"2px !important"}
          />
        </div>
      </div>
      <div className="w-100 pt-3 m-0">
        <div className="form-check p-0 ps-4 h4 d-flex align-items-start mx-auto">
          <input
            className="form-check-input h4 mt-1 ms-1 border"
            type="checkbox"
            // defaultValue={true}
            id="invalidCheck"
            required
          />
          <label className="form-check-label px-2" htmlFor="invalidCheck">
            I have read and agree with the <a href="#">Privacy Policy</a> and{" "}
            <a href="#">Terms & Conditions</a> <br />
            of the site Certain policy restrictions may apply.
          </label>
        </div>
      </div>

      <div className="container-fluid w-100 px-3">
        <hr style={{ color: "#E7E7E7" }} />
        <div className="d-flex justify-content-center w-100">
          <div className="p-4 text-head-color booking-amount">
            <div className="h1 py-3">
              <h2>Total Booking Amount</h2>
            </div>
            <div className="d-flex justify-content-start gap-3 align-items-center">
              <div className="py-3 fw-bold">
                <h1>
                  {detectCurrency(currency)}
                  {amount}
                </h1>
              </div>
              <h3 className="h1 fw-bold">
                For {calculateTotalNights()} Nights
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid w-100 px-3">
        <hr style={{ color: "#E7E7E7" }} />
        <div className="d-flex flex-column justify-content-end gap-5 py-3 w-100">
          {/* <button
              className="btn btn-success "
              style={{ padding: "15px 36px 15px 36px", fontSize: "18px" }}
              >
              Hold Property For 48 Hours
            </button> */}
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-success"
            style={{ padding: "15px 36px 15px 36px", fontSize: "18px" }}
          >
            {/* {processing ? "Processing..." : `Pay $${amount / 100}`} */}
            <h1>
              {processing ? "Processing..." : `Hold Property For 48 Hours`}
            </h1>
          </button>
          <button className="btn bg-light w-50 mx-auto p-2">
            <h3>Cancel</h3>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
