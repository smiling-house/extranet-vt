export const guestyToken = [
  {
    token_type: "Bearer",
    expires_in: 86400,
    access_token: "eyJraWQiOiJVLW5UOUlvSS1FMlZkMmRQR1hZa1NvYVlpWEJzbzMxSXFsNHptVUJZTkUwIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULi1kTlpFTTliaU90NTVtaHB4Sklld2pKNFVmenBocDFWbTdCZ3BqcUprSDgiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1czFwOHFyaDUzQ2NRVEk5NWQ3IiwiYXVkIjoiaHR0cHM6Ly9vcGVuLWFwaS5ndWVzdHkuY29tIiwiaWF0IjoxNjc0MTEyNjU4LCJleHAiOjE2NzQxOTkwNTgsImNpZCI6IjBvYTZ3Zm03a3dkVVNZN1V6NWQ3Iiwic2NwIjpbIm9wZW4tYXBpIl0sInJlcXVlc3RlciI6IkVYVEVSTkFMIiwiYWNjb3VudElkIjoiNTg1YTM5ZGJlNDM5MDAxMDAwMTdlOWU4Iiwic3ViIjoiMG9hNndmbTdrd2RVU1k3VXo1ZDciLCJ1c2VyUm9sZXMiOlt7InJvbGVJZCI6eyJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdfX1dLCJyb2xlIjoidXNlciIsImlhbSI6InYzIiwiYWNjb3VudE5hbWUiOiJTbWlsaW5nIEhvdXNlIiwibmFtZSI6IlRyaWFuZ2xlICJ9.VGTa8MbFA0aTjAtcT8CSMjSDQ4YsI2DkK9ptLzKN-cHZ1DyobZA15WSG9w0bywACxyJoam5goBAmFbgrdCDi89sLWjmcYl9L3Disx_e7d5btaVf9UILFM4UwmEEHsbd22rNHM2E6euaPfk0Vh1x2FqbnSj0RANEFq7cuZ7OA_w6koNRUe1WJsp3msIFjWE1jifIS4RmxNtTi6Kvb73BH99SmgknXJo4JwfUvaWqun0USgGYu0rvVi09SBgo344mlwpzdYOfEDtM-oKxMQZLJ6dPYqpzFJY0Vjahpz4DmfIn9XICsYFHWkFVXrCsUG4WduS9yzIitZvrpsFjLpcbvIA",
    scope: "open-api"
}
];

export const guestySearchResults = [
{
    "results": [
        {
            "_id": "5911bf6428731a0400cc1d57",
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": [
                            "590076a14d50250400224508",
                            "5911bf6428731a0400cc1d0e"
                        ],
                        "active": true
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "pictures": [
                {
                    "_id": "5d09e35d70d4f6003caa4043",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306200211.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306200211.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306200211.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306200211.jpg",
                    "id": "18629769_1563149138",
                    "sort": 1,
                    "caption": "Super spacious downstairs living room"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4042",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306200030.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306200030.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306200030.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306200030.jpg",
                    "id": "18629769_1563149200",
                    "sort": 2,
                    "caption": "Your villa with a garden in Jerusalem"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4041",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306200491.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306200491.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306200491.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306200491.jpg",
                    "id": "18629769_1563149242",
                    "sort": 3,
                    "caption": "cozy living room"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4040",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306200589.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306200589.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306200589.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306200589.jpg",
                    "id": "18629769_1563149280",
                    "sort": 4,
                    "caption": "relax"
                },
                {
                    "_id": "5d09e35d70d4f6003caa403f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306200661.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306200661.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306200661.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306200661.jpg",
                    "id": "18629769_1563149323",
                    "sort": 5,
                    "caption": "living area"
                },
                {
                    "_id": "5d09e35d70d4f6003caa403e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306200941.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306200941.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306200941.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306200941.jpg",
                    "id": "18629769_1563149375",
                    "sort": 6,
                    "caption": "Outdoor Jacuzzi"
                },
                {
                    "_id": "5d09e35d70d4f6003caa403d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306201058.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306201058.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306201058.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306201058.jpg",
                    "id": "18629769_1563149424",
                    "sort": 7,
                    "caption": "Downstairs dining area"
                },
                {
                    "_id": "5d09e35d70d4f6003caa403c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306201140.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306201140.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306201140.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306201140.jpg",
                    "id": "18629769_1563149478",
                    "sort": 8,
                    "caption": "Sit back and relax"
                },
                {
                    "_id": "5d09e35d70d4f6003caa403b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202195.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202195.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202195.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202195.jpg",
                    "id": "18629769_1563149531",
                    "sort": 9,
                    "caption": "your garden"
                },
                {
                    "_id": "5d09e35d70d4f6003caa403a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202219.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202219.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202219.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202219.jpg",
                    "id": "18629769_1563149575",
                    "sort": 10,
                    "caption": "Jacuzzi by night"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4039",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202295.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202295.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202295.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202295.jpg",
                    "id": "18629769_1563149618",
                    "sort": 11,
                    "caption": "Outside at night"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4038",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202479.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202479.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202479.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202479.jpg",
                    "id": "18629769_1563149656",
                    "sort": 12,
                    "caption": "Dining table for 8"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4037",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202543.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202543.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202543.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202543.jpg",
                    "id": "18629769_1563149695",
                    "sort": 13,
                    "caption": "Garden"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4036",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202707.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202707.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202707.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202707.jpg",
                    "id": "18629769_1563149744",
                    "sort": 14,
                    "caption": "Stairs up to the first floor"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4035",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202775.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202775.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202775.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202775.jpg",
                    "id": "18629769_1563149787",
                    "sort": 15,
                    "caption": "Dinner is ready !"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4034",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202810.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202810.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202810.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202810.jpg",
                    "id": "18629769_1563149854",
                    "sort": 16,
                    "caption": "Downstairs kitchen"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4033",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306202914.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306202914.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306202914.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306202914.jpg",
                    "id": "18629769_1563149897",
                    "sort": 17,
                    "caption": "Jacuzzi by night"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4032",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306203207.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306203207.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306203207.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306203207.jpg",
                    "id": "18629769_1563149945",
                    "sort": 18,
                    "caption": "Your Villa on 4 levels"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4031",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306204287.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306204287.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306204287.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306204287.jpg",
                    "id": "18629769_1563149983",
                    "sort": 19,
                    "caption": "Downstairs kitchen"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4030",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306204756.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306204756.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306204756.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306204756.jpg",
                    "id": "18629769_1563150025",
                    "sort": 20,
                    "caption": "living room"
                },
                {
                    "_id": "5d09e35d70d4f6003caa402f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306204846.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306204846.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306204846.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306204846.jpg",
                    "id": "18629769_1563150064",
                    "sort": 21,
                    "caption": "Night atmosphere"
                },
                {
                    "_id": "5d09e35d70d4f6003caa402e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306206151.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306206151.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306206151.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306206151.jpg",
                    "id": "18629769_1563150103",
                    "sort": 22,
                    "caption": "This in the center of Jerusalem !"
                },
                {
                    "_id": "5d09e35d70d4f6003caa402d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306206250.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306206250.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306206250.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306206250.jpg",
                    "id": "18629769_1563150155",
                    "sort": 23,
                    "caption": "Your villa by night"
                },
                {
                    "_id": "5d09e35d70d4f6003caa402c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306207069.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306207069.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306207069.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306207069.jpg",
                    "id": "18629769_1563150197",
                    "sort": 24,
                    "caption": "Upstairs dining area and fully equipped kitchen"
                },
                {
                    "_id": "5d09e35d70d4f6003caa402b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306207724.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306207724.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306207724.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306207724.jpg",
                    "id": "18629769_1563150244",
                    "sort": 25,
                    "caption": "Fully equipped kosher kitchen"
                },
                {
                    "_id": "5d09e35d70d4f6003caa402a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306208219.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306208219.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306208219.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306208219.jpg",
                    "id": "18629769_1563150289",
                    "sort": 26,
                    "caption": "Cozy upstairs living room"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4029",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306208696.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306208696.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306208696.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306208696.jpg",
                    "id": "18629769_1563150336",
                    "sort": 27,
                    "caption": "Terrace with great views on the top floor"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4028",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306209067.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306209067.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306209067.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306209067.jpg",
                    "id": "18629769_1563150390",
                    "sort": 28,
                    "caption": "Top floor super cozy living room"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4027",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306209289.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306209289.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306209289.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306209289.jpg",
                    "id": "18629769_1563150434",
                    "sort": 29,
                    "caption": "Penthouse terrace with great views"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4026",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306209935.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306209935.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306209935.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306209935.jpg",
                    "id": "18629769_1563150484",
                    "sort": 30,
                    "caption": "Top floor terrace with great views"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4025",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306210418.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306210418.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306210418.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306210418.jpg",
                    "id": "18629769_1563150534",
                    "sort": 31,
                    "caption": "Bedroom 1"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4024",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306210672.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306210672.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306210672.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306210672.jpg",
                    "id": "18629769_1563150585",
                    "sort": 32,
                    "caption": "Bedroom 2"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4023",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306212109.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306212109.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306212109.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306212109.jpg",
                    "id": "18629769_1563150637",
                    "sort": 33,
                    "caption": "Bedroom 3"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4022",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306212326.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306212326.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306212326.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306212326.jpg",
                    "id": "18629769_1563150685",
                    "sort": 34,
                    "caption": "Bedroom 4"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4021",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306213003.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306213003.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306213003.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306213003.jpg",
                    "id": "18629769_1563150744",
                    "sort": 35,
                    "caption": "Bathroom 1"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4020",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306223459.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306223459.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306223459.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306223459.jpg",
                    "id": "18629769_1563150787",
                    "sort": 36,
                    "caption": "Bathroom 2"
                },
                {
                    "_id": "5d09e35d70d4f6003caa401f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306213246.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306213246.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306213246.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306213246.jpg",
                    "id": "18629769_1563150834",
                    "sort": 37,
                    "caption": "Bathroom 2 shower"
                },
                {
                    "_id": "5d09e35d70d4f6003caa401e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306224822.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306224822.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306224822.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306224822.jpg",
                    "id": "18629769_1563150879",
                    "sort": 38,
                    "caption": "Bathroom 3"
                },
                {
                    "_id": "5d09e35d70d4f6003caa401d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306213736.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306213736.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306213736.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306213736.jpg",
                    "id": "18629769_1563150949",
                    "sort": 39,
                    "caption": "Bedroom 5"
                },
                {
                    "_id": "5d09e35d70d4f6003caa401c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306213884.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306213884.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306213884.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306213884.jpg",
                    "id": "18629769_1563151007",
                    "sort": 40,
                    "caption": "Bedroom 6"
                },
                {
                    "_id": "5d09e35d70d4f6003caa401b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306214220.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306214220.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306214220.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306214220.jpg",
                    "id": "18629769_1563151068",
                    "sort": 41,
                    "caption": "Bedroom 7"
                },
                {
                    "_id": "5d09e35d70d4f6003caa401a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306215247.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306215247.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306215247.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306215247.jpg",
                    "id": "18629769_1563151112",
                    "sort": 42,
                    "caption": "Bedroom 8"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4019",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306216789.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306216789.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306216789.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306216789.jpg",
                    "id": "18629769_1563151151",
                    "sort": 43,
                    "caption": "bathroom 4"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4018",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306217050.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306217050.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306217050.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306217050.jpg",
                    "id": "18629769_1563151186",
                    "sort": 44,
                    "caption": "Bathroom 6"
                },
                {
                    "_id": "5d09e35d70d4f6003caa4017",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306217162.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306217162.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_306217162.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_306217162.jpg",
                    "id": "18629769_1563151228",
                    "sort": 45,
                    "caption": "Outside shower, perfect after the Jacuzzi"
                }
            ],
            "integrations": [
                {
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "initialComplexListing": false,
                        "publishCompanyLogo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "isPublishedCompanyInfo": false,
                        "taxInfo": []
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/18629769",
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "id": "18629769",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 0,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "603c9d58b1c122002ec5a546",
                            "guestsIncludedInRegularFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "extraPersonFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            }
                        },
                        "syncCategoryUpdatedAt": "2022-04-28T11:07:09.323Z",
                        "promotions": []
                    }
                }
            ],
            "customFields": [],
            "title": "2 Units in The Same Villa with Garden & Roof Terrace",
            "defaultCheckOutTime": "11:00",
            "offeredServices": [],
            "instantBookable": {
                "visibility": "off",
                "leadTime": 24,
                "enabled": false
            },
            "tags": [
                "Israel"
            ],
            "bathrooms": 7.5,
            "bedType": "Real Bed",
            "isListed": true,
            "nickname": "JER007James Whole V",
            "publicDescription": {
                "guestControls": {
                    "allowsSmoking": false,
                    "allowsPets": false,
                    "allowsInfants": true,
                    "allowsEvents": true,
                    "allowsChildren": true
                },
                "space": "The villa is made out of 2 seperate parts that can be rented together or seperately.\nThe top 2 floors belong to the Penthouse and the 2 first floors belong the the charming Duplex with garden and Jacuzzi.\n\nYou have 2 huge terraces on each side of the living area of the Penthouse allowing you to relax in different places according to your mood and the weather.\n\nThe living room of the Duplex is bathed in natural light entering through the many doors and windows. It is also on this floor that you will find the lush garden, the private terrace and the Jacuzzi.\n\nThe fully equipped Kosher kitchens with a central islands combine quality and design.\n\nThe fineness of materials such as stone and woodwork shows the perfection and concern for detail sought in this property.\n\nThe first and second floor of the villa, in a haven of peace, you will appreciate the comfort and convenience of 8 bedrooms with 7 bathrooms.\n\nYou will have the privilege of spending unforgettable moments in the eternal city.",
                "neighborhood": "Located in one of the most select and exclusive neighborhoods in Jerusalem, close to the main attractions of the city.",
                "transit": "In Jerusalem you don't really need a car, everything is so close to this part of town.\nAnd there are buses and Taxis if you wish of course.",
                "interactionWithGuests": "We are available at all times to make sure our guests have a memorable stay !",
                "summary": "Situated in one of the most select and exclusive neighborhoods in Jerusalem, close to the main attractions of the city, you will enter an amazing Villa for 20 on 4 levels where quality and design become one.\n\nParticular attention was given to details. The living rooms of the villa are bathed in natural light entering through the many doors and windows.\n\nEnjoy Jerusalem while staying in a luxurious villa ideally situated in the lovely German Colony right next to where it's all happening.",
                "houseRules": "• No smoking\r\n• No pets\r\n• Check-in is anytime after 4:00 PM",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "accommodates": 16,
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [
                {
                    "month": "2016-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5cf"
                },
                {
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d0",
                    "month": "2016-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2016-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d1"
                },
                {
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d2",
                    "month": "2016-08"
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d3",
                    "month": "2016-09",
                    "available": 30
                },
                {
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d4",
                    "month": "2016-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2016-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d5"
                },
                {
                    "month": "2016-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d6"
                },
                {
                    "month": "2017-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d7"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d8",
                    "month": "2017-02",
                    "available": 28,
                    "unavailable": 0
                },
                {
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5d9",
                    "month": "2017-03"
                },
                {
                    "_id": "5912e06ca738da0400d3a5da",
                    "month": "2017-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "5912e06ca738da0400d3a5db",
                    "month": "2017-05",
                    "available": 12,
                    "unavailable": 19,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "unavailable": 29,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5dc",
                    "month": "2017-06",
                    "available": 1
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5dd",
                    "month": "2017-07",
                    "available": 13,
                    "unavailable": 18
                },
                {
                    "available": 15,
                    "unavailable": 16,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5de",
                    "month": "2017-08"
                },
                {
                    "unavailable": 9,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5df",
                    "month": "2017-09",
                    "available": 21
                },
                {
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5e0",
                    "month": "2017-10",
                    "available": 14,
                    "unavailable": 17,
                    "booked": 0
                },
                {
                    "month": "2017-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5e1"
                },
                {
                    "available": 26,
                    "unavailable": 5,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5e2",
                    "month": "2017-12"
                },
                {
                    "_id": "5912e06ca738da0400d3a5e3",
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "5912e06ca738da0400d3a5e4",
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5e5",
                    "month": "2018-03",
                    "available": 31
                },
                {
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5e6",
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5912e06ca738da0400d3a5e7"
                },
                {
                    "month": "2018-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "592fe1d8ba936c04005d0d7c"
                },
                {
                    "month": "2018-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59c77d61365767040042ddd7"
                },
                {
                    "month": "2018-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59c77d61365767040042ddd8"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59c77d61365767040042ddd9"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5aab8f6b6244e2000b310122"
                },
                {
                    "month": "2018-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5aab8f6b6244e2000b310123"
                },
                {
                    "month": "2018-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5aab8f6b6244e2000b310124"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5aab8f6b6244e2000b310125"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5aab8f6b6244e2000b310126"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5aab8f6b6244e2000b310127"
                }
            ],
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "roomType": "Entire home/apt",
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Free parking on premises",
                "Elevator",
                "Hot tub",
                "Heating",
                "Family/kid friendly",
                "Suitable for events",
                "Washer",
                "Dryer",
                "Smoke alarm",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Hot water",
                "Bed linens",
                "Extra pillows and blankets",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_306200211.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_306200211.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_306200211.jpg",
                "caption": "Super spacious downstairs living room"
            },
            "preBooking": [],
            "bedrooms": 8,
            "importedAt": "2017-05-09T13:08:52.455Z",
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:36:43.347Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:36:43.343Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:36:43.343Z"
                },
                "weekendMinNights": 3,
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:36:43.348Z"
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "pendingTasks": [
                {
                    "_id": "5f43ba4d0574cb0028264304",
                    "mqId": "b9e69d6b-035c-4858-97bd-4c5206fe5071",
                    "platform": "rentalsUnited",
                    "description": "Update listing",
                    "createdAt": "2020-08-24T13:02:05.733Z",
                    "error": "Smaller in LongStay element cannot be greater than 180."
                }
            ],
            "createdAt": "2017-05-09T13:08:52.451Z",
            "lastSyncedAt": "2020-06-13T14:04:02.937Z",
            "beds": 12,
            "address": {
                "state": "Jerusalem District",
                "country": "Israel",
                "street": "Derech Beit Lehem 40",
                "lat": 31.762236,
                "lng": 35.2229,
                "searchable": "Derech Beit Lehem 40, Jerusalem, Jerusalem District, Israel",
                "full": "Derech Beit Lehem 40, Jerusalem, Jerusalem District, Israel",
                "city": "Jerusalem"
            },
            "propertyType": "House",
            "timezone": "Asia/Jerusalem",
            "defaultCheckInTime": "16:00",
            "importingPlatform": "airbnb",
            "active": true,
            "SaaS": {
                "autoRenew": true
            },
            "__v": 765,
            "listingRooms": [
                {
                    "id": 7000679,
                    "roomNumber": 1,
                    "_id": "5b0968e97f0a743c4dec2124",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968e97f0a743c4dec2125"
                        }
                    ]
                },
                {
                    "id": 7000680,
                    "roomNumber": 4,
                    "_id": "5b0968e97f0a743c4dec2126",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e97f0a743c4dec2128"
                        },
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b0968e97f0a743c4dec2127"
                        }
                    ]
                },
                {
                    "id": 7000681,
                    "roomNumber": 5,
                    "_id": "5b0968e97f0a743c4dec2129",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e97f0a743c4dec212a"
                        }
                    ]
                },
                {
                    "id": 7000682,
                    "roomNumber": 8,
                    "_id": "5b0968e97f0a743c4dec212b",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e97f0a743c4dec212d"
                        },
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b0968e97f0a743c4dec212c"
                        }
                    ]
                },
                {
                    "id": 7000683,
                    "roomNumber": 7,
                    "_id": "5b0968e97f0a743c4dec212e",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e97f0a743c4dec212f"
                        }
                    ]
                },
                {
                    "id": 7000684,
                    "roomNumber": 0,
                    "_id": "5b0968e97f0a743c4dec2130",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "COUCH",
                            "_id": "5b0968e97f0a743c4dec2131"
                        }
                    ]
                },
                {
                    "id": 7000685,
                    "roomNumber": 2,
                    "_id": "5b0968e97f0a743c4dec2132",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e97f0a743c4dec2133"
                        }
                    ]
                },
                {
                    "id": 7000686,
                    "roomNumber": 3,
                    "_id": "5b0968e97f0a743c4dec2134",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e97f0a743c4dec2135"
                        }
                    ]
                },
                {
                    "id": 7000687,
                    "roomNumber": 6,
                    "_id": "5b0968e97f0a743c4dec2136",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e97f0a743c4dec2137"
                        }
                    ]
                }
            ],
            "lastUpdatedAt": "2023-01-11T05:36:43.471Z",
            "owners": [],
            "taxes": [],
            "useAccountTaxes": true,
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f43ba4d0574cb00282642f3",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 800
                    }
                }
            },
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c52252129400485d152c"
            },
            "prices": {
                "monthlyPriceFactor": 0.75,
                "weeklyPriceFactor": 0.95,
                "basePrice": 5900,
                "basePriceUSD": 1701,
                "cleaningFee": 800,
                "currency": "ILS",
                "extraPersonFee": 83,
                "guestsIncludedInRegularFee": 2
            },
            "terms": {
                "minNights": 3,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "lastActivityAt": "2021-03-21T08:32:09.797Z",
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T12:24:55.888Z"
            },
            "yieldManagement": {
                "rateStrategy": {
                    "_id": "62cd148bb8187d0035271783",
                    "name": "Sukkot 2022 | Jerusalem"
                }
            },
            "accountTaxes": []
        },
        {
            "_id": "5e70e9618d4b1e00471cb875",
            "SaaS": {
                "autoRenew": true
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f2aa9bfe2df4f0028f6464e",
                        "formula": 0,
                        "valueType": "FIXED",
                        "multiplier": "PER_STAY"
                    }
                }
            },
            "address": {
                "full": "Rothschild Boulevard, Tel Aviv-Yafo, Tel Aviv District, Israel",
                "city": "Tel Aviv-Yafo",
                "state": "Tel Aviv District",
                "country": "Israel",
                "street": "Rothschild Boulevard",
                "lat": 32.065434,
                "lng": 34.776642,
                "searchable": "Rothschild Boulevard, Tel Aviv-Yafo, Tel Aviv District, Israel",
                "neighborhood": "Lev HaIr"
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 2
            },
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888316.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888316.jpg",
                "large": "//guestybookings.s3.amazonaws.com/images/large_986888316.jpg",
                "caption": ""
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125,
                "cancellation": "flexible"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 9000,
                "basePriceUSD": 9000,
                "currency": "USD",
                "guestsIncludedInRegularFee": 1
            },
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": true,
                    "allowsInfants": true,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "space": "The apartment comes with WiFi, cable TV, Nespresso machine, dishwasher & laundry machine. The neighbourhood features trendy local bars, chef restaurants, clubs, coffeeshops, shopping opportunities & much more!\n\nThe apartment is 2 minutes away from the Habima Square and Theatre, making it truly the most amazing, central location.\nThere is a paid parking lot nearby for your convenience, if you are renting or have a car. That being said, this location is very central. You can practically walk everywhere, hire a scooter or a bike for the day, or take the bus to get to wherever needed. Of course there are also taxis available all the time.\n\nThis apartment could not be in a more perfect location - book it for your holiday and see for yourself!",
                "transit": "Coordinates: 32.069154, 34.778527\nAddress: Rothschild Boulevard 116, Tel Aviv",
                "summary": "This beautifully designed and fully furnished apartment is located in the heart of Tel Aviv on Rothschild Avenue! It has two stunning bedrooms and one sofa bed in the living room and is perfect for a family, couples or a group of friends wanting to stay in the TOP location of Tel Aviv.",
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:45:30.299Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:45:30.298Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:45:30.298Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:45:30.303Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel",
                "PM-Unknown",
                "PMC-Unknown"
            ],
            "owners": [],
            "amenities": [
                "TV",
                "Wireless Internet",
                "Air conditioning",
                "Heating",
                "Washer",
                "Essentials",
                "Hangers",
                "Laptop-friendly workspace",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Accessible-height toilet",
                "Accessible-height bed",
                "Cleaning Disinfection",
                "Family/kid friendly",
                "Fire extinguisher",
                "Hot water",
                "Internet",
                "Towels provided",
                "Refrigerator",
                "Oven",
                "Microwave",
                "Bed linens",
                "Shampoo",
                "Room-darkening shades",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Cable TV",
                "Crib",
                "Dishwasher",
                "Dryer",
                "Elevator",
                "Free parking on premises",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "Hair dryer",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Iron",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Disabled parking spot",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Fireplace guards",
                "First aid kit",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private entrance",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "createdAt": "2020-03-17T15:14:41.089Z",
            "lastUpdatedAt": "2023-01-11T05:45:30.383Z",
            "integrations": [
                {
                    "airbnb2": {
                        "id": "42932388",
                        "cancellationPolicy": "flexible",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": true
                        },
                        "daysOfWeekCheckIn": [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6
                        ],
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {},
                        "daysOfWeekMinimumNights": [],
                        "promotions": []
                    },
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/42932388"
                }
            ],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "5e70e9618d4b1e00471cb893",
                    "id": 90315670,
                    "roomNumber": 2,
                    "beds": [
                        {
                            "_id": "5e70e9618d4b1e00471cb894",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5e70e9618d4b1e00471cb895",
                    "id": 90315671,
                    "roomNumber": 0,
                    "beds": [
                        {
                            "_id": "5e70e9618d4b1e00471cb896",
                            "quantity": 1,
                            "type": "SOFA_BED"
                        }
                    ]
                },
                {
                    "_id": "5e70e9618d4b1e00471cb897",
                    "id": 90315672,
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "5e70e9618d4b1e00471cb898",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                }
            ],
            "pictures": [
                {
                    "_id": "5e70e9618d4b1e00471cb891",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888316.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888316.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888316.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888316.jpg",
                    "id": "42932388_1563162888",
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb890",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888261.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888261.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888261.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888261.jpg",
                    "id": "42932388_1563162911",
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb88f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888262.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888262.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888262.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888262.jpg",
                    "id": "42932388_1563162929",
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb88e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888263.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888263.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888263.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888263.jpg",
                    "id": "42932388_1563162962",
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb88d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888267.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888267.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888267.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888267.jpg",
                    "id": "42932388_1563162986",
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb88c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888273.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888273.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888273.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888273.jpg",
                    "id": "42932388_1563163011",
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb88b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888274.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888274.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888274.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888274.jpg",
                    "id": "42932388_1563163056",
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb88a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888275.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888275.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888275.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888275.jpg",
                    "id": "42932388_1563163082",
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb889",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888277.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888277.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888277.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888277.jpg",
                    "id": "42932388_1563163112",
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb888",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888280.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888280.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888280.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888280.jpg",
                    "id": "42932388_1563163137",
                    "sort": 10,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb887",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888281.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888281.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888281.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888281.jpg",
                    "id": "42932388_1563163174",
                    "sort": 11,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb886",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888282.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888282.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888282.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888282.jpg",
                    "id": "42932388_1563163203",
                    "sort": 12,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb885",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888283.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888283.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888283.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888283.jpg",
                    "id": "42932388_1563163233",
                    "sort": 13,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb884",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888284.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888284.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888284.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888284.jpg",
                    "id": "42932388_1563163265",
                    "sort": 14,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb883",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888285.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888285.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888285.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888285.jpg",
                    "id": "42932388_1563163291",
                    "sort": 15,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb882",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888301.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888301.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888301.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888301.jpg",
                    "id": "42932388_1563163321",
                    "sort": 16,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb881",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888302.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888302.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888302.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888302.jpg",
                    "id": "42932388_1563163362",
                    "sort": 17,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb880",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888303.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888303.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888303.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888303.jpg",
                    "id": "42932388_1563163387",
                    "sort": 18,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb87f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888304.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888304.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888304.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888304.jpg",
                    "id": "42932388_1563163416",
                    "sort": 19,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb87e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888309.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888309.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888309.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888309.jpg",
                    "id": "42932388_1563163466",
                    "sort": 20,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb87d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888313.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888313.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888313.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888313.jpg",
                    "id": "42932388_1563163503",
                    "sort": 21,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb87c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888318.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888318.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888318.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888318.jpg",
                    "id": "42932388_1563163527",
                    "sort": 22,
                    "caption": ""
                },
                {
                    "_id": "5e70e9618d4b1e00471cb87b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_986888328.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_986888328.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_986888328.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_986888328.jpg",
                    "id": "42932388_1563163550",
                    "sort": 23,
                    "caption": ""
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-03-17T15:14:41.090Z",
            "occupancyStats": [],
            "accountId": "585a39dbe43900100017e9e8",
            "importingPlatform": "airbnb",
            "nickname": "TLV011Korin Rothschi",
            "isListed": false,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5e70e9618d4b1e00471cb87a"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "12:00",
            "title": "2BR - Beautiful Luxury Apartment on Rothschild",
            "timezone": "Asia/Jerusalem",
            "bedrooms": 2,
            "beds": 2,
            "propertyType": "Apartment",
            "roomType": "Entire home/apt",
            "bedType": "Real Bed",
            "accommodates": 6,
            "bathrooms": 2,
            "lastSyncedAt": "2020-06-15T09:26:45.068Z",
            "__v": 20,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:52:28.478Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "6282833913bc760032ecca1d",
            "SaaS": {
                "autoRenew": true
            },
            "cleaningStatus": {
                "value": null
            },
            "picture": {
                "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1653461182/production/585a39dbe43900100017e9e8/czhvvsjimjrizeeqst0m.jpg"
            },
            "terms": {
                "minNights": 5,
                "maxNights": 365
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "currency": "ILS",
                "basePrice": 6000,
                "weekendBasePrice": 6000,
                "weekendDays": [
                    5,
                    6
                ],
                "cleaningFee": 550
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 55
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        }
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": []
                },
                "active": true,
                "cleaningStatus": {
                    "active": true
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-10-20T08:15:34.154Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-10-20T08:15:34.153Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-10-20T08:15:34.153Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-10-20T08:15:34.162Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel"
            ],
            "owners": [],
            "amenities": [
                "Air conditioning",
                "Cable TV",
                "Dishwasher",
                "Free parking on premises",
                "Heating",
                "Iron",
                "Refrigerator",
                "TV",
                "Bed linens",
                "Cleaning Disinfection",
                "Desk",
                "Enhanced cleaning practices",
                "Family/kid friendly",
                "Essentials",
                "Garden or backyard",
                "Hangers",
                "Hair dryer",
                "Hot water",
                "Internet",
                "Laptop friendly workspace",
                "Microwave",
                "Oven",
                "Patio or balcony",
                "Private entrance",
                "Shampoo",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Toaster",
                "Towels provided",
                "Wireless Internet",
                "Washer",
                "Dryer",
                "Near Ocean",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {},
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "accommodates": 6,
            "bathrooms": 2,
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "11:00",
            "propertyType": "Villa",
            "roomType": "Entire home/apt",
            "address": {
                "full": "Harduf St 2, Beit Yanai, Israel",
                "lng": 34.8642057,
                "lat": 32.3812096,
                "county": "Israel",
                "street": "Harduf Street 2",
                "city": "Beit Yanai",
                "country": "Israel",
                "state": "Center District"
            },
            "pictures": [
                {
                    "_id": "628dd11b35224200330f2653",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1653461182/production/585a39dbe43900100017e9e8/czhvvsjimjrizeeqst0m.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1653461182/production/585a39dbe43900100017e9e8/czhvvsjimjrizeeqst0m.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 239181,
                    "id": "628615256708523169_1407954629"
                },
                {
                    "_id": "628dd11b35224200330f2652",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1653461182/production/585a39dbe43900100017e9e8/o6wayfya13wibi26uylj.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1653461182/production/585a39dbe43900100017e9e8/o6wayfya13wibi26uylj.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 224307,
                    "id": "628615256708523169_1407954633"
                },
                {
                    "_id": "6282833913bc760032ecca27",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719907/production/585a39dbe43900100017e9e8/a2dyoi2yu3sba4pdvj3c.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719907/production/585a39dbe43900100017e9e8/a2dyoi2yu3sba4pdvj3c.jpg",
                    "height": 2000,
                    "width": 1500,
                    "size": 170808,
                    "id": "628615256708523169_1402232803"
                },
                {
                    "_id": "6282833913bc760032ecca26",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719913/production/585a39dbe43900100017e9e8/dl0z8q3e7nihvylpy5fy.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719913/production/585a39dbe43900100017e9e8/dl0z8q3e7nihvylpy5fy.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 173844,
                    "id": "628615256708523169_1402232817"
                },
                {
                    "_id": "6282833913bc760032ecca25",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719916/production/585a39dbe43900100017e9e8/c3d6edxrmdozacczpgh6.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719916/production/585a39dbe43900100017e9e8/c3d6edxrmdozacczpgh6.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 133263,
                    "id": "628615256708523169_1402232826"
                },
                {
                    "_id": "6282833913bc760032ecca24",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719915/production/585a39dbe43900100017e9e8/h8h9raxe7hvzf9ntymem.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719915/production/585a39dbe43900100017e9e8/h8h9raxe7hvzf9ntymem.jpg",
                    "height": 2666,
                    "width": 2000,
                    "size": 290415,
                    "id": "628615256708523169_1402232838"
                },
                {
                    "_id": "6282833913bc760032ecca28",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719905/production/585a39dbe43900100017e9e8/wf7rbnocgn5zgghspaiq.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719905/production/585a39dbe43900100017e9e8/wf7rbnocgn5zgghspaiq.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 222097,
                    "id": "628615256708523169_1402232788"
                },
                {
                    "_id": "6282833913bc760032ecca23",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719909/production/585a39dbe43900100017e9e8/xwliavkbjhjhactkqd4r.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719909/production/585a39dbe43900100017e9e8/xwliavkbjhjhactkqd4r.jpg",
                    "height": 2000,
                    "width": 1500,
                    "size": 190108,
                    "id": "628615256708523169_1402232858"
                },
                {
                    "_id": "6282833913bc760032ecca22",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719905/production/585a39dbe43900100017e9e8/kgf56nrpqzzptgcmadki.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719905/production/585a39dbe43900100017e9e8/kgf56nrpqzzptgcmadki.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 133297,
                    "id": "628615256708523169_1402232892"
                },
                {
                    "_id": "6282833913bc760032ecca21",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719905/production/585a39dbe43900100017e9e8/t4hzf4knitdcar8aj3rr.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719905/production/585a39dbe43900100017e9e8/t4hzf4knitdcar8aj3rr.jpg",
                    "height": 2000,
                    "width": 1500,
                    "size": 131646,
                    "id": "628615256708523169_1402232940"
                },
                {
                    "_id": "6282833913bc760032ecca20",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719905/production/585a39dbe43900100017e9e8/bux77ha4mfu493n2j2a0.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719905/production/585a39dbe43900100017e9e8/bux77ha4mfu493n2j2a0.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 119633,
                    "id": "628615256708523169_1402232955"
                },
                {
                    "_id": "6282833913bc760032ecca1f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719905/production/585a39dbe43900100017e9e8/fzjwa0uaxu196nhduqbw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719905/production/585a39dbe43900100017e9e8/fzjwa0uaxu196nhduqbw.jpg",
                    "height": 1125,
                    "width": 2000,
                    "size": 94095,
                    "id": "628615256708523169_1402232964"
                },
                {
                    "_id": "6282833913bc760032ecca1e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1652719905/production/585a39dbe43900100017e9e8/e11tqfbhvfdrhvgsfyik.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1652719905/production/585a39dbe43900100017e9e8/e11tqfbhvfdrhvgsfyik.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 109737,
                    "id": "628615256708523169_1402232973"
                },
                {
                    "_id": "628c998c67a7b6003431e1a8",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1653381509/production/585a39dbe43900100017e9e8/tmenhcgzqpxokd8lzglm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1653381509/production/585a39dbe43900100017e9e8/tmenhcgzqpxokd8lzglm.jpg",
                    "height": 979,
                    "width": 1600,
                    "size": 73918,
                    "id": "628615256708523169_1407229004"
                },
                {
                    "_id": "628c998c67a7b6003431e1a7",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1653381509/production/585a39dbe43900100017e9e8/rqmyhmbehxkvdxxrrq2t.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1653381509/production/585a39dbe43900100017e9e8/rqmyhmbehxkvdxxrrq2t.jpg",
                    "height": 1125,
                    "width": 2000,
                    "size": 202836,
                    "id": "628615256708523169_1407229012"
                },
                {
                    "_id": "628c998c67a7b6003431e1a6",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1653381509/production/585a39dbe43900100017e9e8/f5mwit1dhwqlb7qiw8b8.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1653381509/production/585a39dbe43900100017e9e8/f5mwit1dhwqlb7qiw8b8.jpg",
                    "height": 1127,
                    "width": 1500,
                    "size": 64263,
                    "id": "628615256708523169_1407229022"
                },
                {
                    "_id": "628dd11b35224200330f2643",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1653461182/production/585a39dbe43900100017e9e8/hwzlilucvqq3r34xstvt.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1653461182/production/585a39dbe43900100017e9e8/hwzlilucvqq3r34xstvt.jpg",
                    "height": 1500,
                    "width": 2000,
                    "size": 187342,
                    "id": "628615256708523169_1407954648"
                }
            ],
            "bedrooms": 4,
            "beds": 4,
            "timezone": "Asia/Jerusalem",
            "nickname": "CAE086 Beit Yanai",
            "title": "3  Minutes Walk From Beit Yanai Beach Amazing Villa",
            "accountId": "585a39dbe43900100017e9e8",
            "isListed": true,
            "createdAt": "2022-05-16T17:00:41.820Z",
            "lastUpdatedAt": "2022-12-21T18:49:01.148Z",
            "integrations": [],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "628352c62e558a0034877724",
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "628352c62e558a0034877725",
                            "type": "DOUBLE_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "628352c62e558a0034877722",
                    "roomNumber": 2,
                    "beds": [
                        {
                            "_id": "628352c62e558a0034877723",
                            "type": "DOUBLE_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "628352c62e558a0034877720",
                    "roomNumber": 3,
                    "beds": [
                        {
                            "_id": "628352c62e558a0034877721",
                            "type": "SINGLE_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "628352c62e558a003487771e",
                    "roomNumber": 4,
                    "beds": [
                        {
                            "_id": "628352c62e558a003487771f",
                            "type": "SINGLE_BED",
                            "quantity": 1
                        }
                    ]
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2022-05-16T17:00:41.821Z",
            "occupancyStats": [],
            "__v": 56,
            "publicDescription": {
                "summary": "Beit Yanai Beach is one of the most beautiful beaches in Israel. At this beach you can swim, hike, see birds, kite surfers, and other things. Stay in and enjoy your private villa that offers the perfect location. It has a large yard where you can walk and stretch your body. Then 5 minutes away, you will see the amazing beach of Beit Yanai.",
                "space": "Master bedroom + toilet and shower\nThree bedrooms have a shared shower and toilet.\nLiving room\nDining Room\nkitchen\nLarge yard\nGarden furniture + dining table and chairs",
                "transit": "",
                "neighborhood": "Beit Yanai beach is 5 km north of Netanya and only 20 minutes from Tel Aviv. As a long and wide white beach strip, it is considered one of the most beautiful, quiet and well-maintained beaches in Israel.\nA quarter of an hour's walk from the center of Beit Yanai beach there is the Nahal Alexander river, which flows from the mountains of Samaria into the Mediterranean Sea. It is a home area for soft-shelled turtles, which can reach a length of 1.20 m and weigh up to 50 kg. Another natural interest is the Beit Yanai pond with rich flora and fauna. A wooden path leads to it."
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "63510403945a60003350ed0c",
                        "multiplier": "PER_STAY",
                        "formula": 550,
                        "valueType": "FIXED"
                    },
                    "lastUpdated": "2022-10-20T08:17:07.367Z"
                }
            },
            "accountTaxes": []
        },
        {
            "_id": "5fd480c5509f4e002d531174",
            "SaaS": {
                "autoRenew": true
            },
            "picture": {
                "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810038.jpg",
                "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810038.jpg",
                "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810038.jpg",
                "caption": ""
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "currency": "ILS",
                "basePrice": 3125,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ],
                "securityDepositFee": null,
                "guestsIncludedInRegularFee": 1,
                "extraPersonFee": 0,
                "cleaningFee": null
            },
            "publicDescription": {
                "summary": "The villa features:\n- 4 bedrooms with toilet and shower for every room\n- kitchen and living room designed and equipped\n- heated and indoor pool\n- whirlpool spa\n- snooker table, ping pong table, cable channel package, Sony PlayStation 4\n- private parking",
                "space": "Yard specification:\n- Indoor heated swimming pool, sunbeds, hammocks, BBQ, private parking, sitting area facing the view, sitting area, garden furniture, pampering hot tub.\n\nView:\nSpectacular views of the Sea of ​​Galilee.\n\nFor the religious public:\nPlate of Shabbat, Mayhem for Shabbat, synagogue nearby.\n\nRemarks: \n- Early morning breakfast treatments and massages in coordination with the hosts. \n\nAdditional notes: \n- Guests can receive advice on hiking trails or area attractions. \n- Nearby: Horseback riding, hiking trails, restaurants, ATVs, jeeps.",
                "access": null,
                "interactionWithGuests": null,
                "neighborhood": null,
                "transit": null,
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\n \n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking.",
                "houseRules": null
            },
            "privateDescription": {
                "directions": ""
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": []
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "defaultSettings": {
                        "hours": 2,
                        "allowRequestToBook": true
                    },
                    "updatedAt": "2023-01-11T05:50:01.817Z"
                },
                "bookingWindow": {
                    "defaultSettings": {
                        "days": -1
                    },
                    "updatedAt": "2023-01-11T05:50:01.817Z"
                },
                "preparationTime": {
                    "defaultSettings": {
                        "days": 0
                    },
                    "updatedAt": "2023-01-11T05:50:01.817Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:50:01.821Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel"
            ],
            "owners": [],
            "amenities": [
                "Shampoo",
                "TV",
                "Garden or backyard",
                "Free parking on premises",
                "BBQ grill",
                "Hair dryer",
                "Washer",
                "Laptop friendly workspace",
                "Essentials",
                "Heating",
                "Cable TV",
                "Microwave",
                "Patio or balcony",
                "Beach essentials",
                "Air conditioning",
                "Hot tub",
                "Oven",
                "Swimming pool",
                "Dryer",
                "Extra pillows and blankets",
                "Hangers",
                "Iron",
                "Children’s books and toys",
                "Hot water",
                "Refrigerator",
                "Bed linens",
                "Wireless Internet",
                "Private entrance",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "nickname": "KIN016 Nethan LndGal",
            "title": "4BR Villa with Wonderful Views of Sea of ​​Galilee",
            "propertyType": "Villa",
            "roomType": "Entire home/apt",
            "bedrooms": 4,
            "bathrooms": 4,
            "beds": 4,
            "isListed": true,
            "address": {
                "street": "Ha-Galil Street",
                "city": "Safed",
                "state": "North District",
                "zipcode": null,
                "country": "Israel",
                "lat": 32.9734509,
                "lng": 35.5041649,
                "apt": "",
                "full": "Ha-Galil St, Safed, Israel"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckInEndTime": null,
            "defaultCheckOutTime": "11:00",
            "integrations": [
                {
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "initialComplexListing": false,
                        "publishCompanyLogo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "isPublishedCompanyInfo": false,
                        "taxInfo": []
                    },
                    "platform": "airbnb2",
                    "externalUrl": "https://www.airbnb.com/rooms/43922366",
                    "airbnb2": {
                        "id": "43922366",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "tier": "marketplace",
                        "syncCategory": "sync_all",
                        "syncCategoryUpdatedAt": "2020-12-12T08:37:16.253Z",
                        "daysOfWeekMinimumNights": [],
                        "status": "COMPLETED",
                        "promotions": []
                    },
                    "_id": "585a39dbe43900100017e9ed"
                }
            ],
            "accommodates": 12,
            "timezone": "Asia/Jerusalem",
            "listingRooms": [
                {
                    "_id": "5fd480c5509f4e002d53117b",
                    "id": 97571820,
                    "roomNumber": 3,
                    "beds": [
                        {
                            "_id": "5fd480c5509f4e002d53117c",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5fd480c5509f4e002d531179",
                    "id": 97571823,
                    "roomNumber": 2,
                    "beds": [
                        {
                            "_id": "5fd480c5509f4e002d53117a",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5fd480c5509f4e002d531177",
                    "id": 97571822,
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "5fd480c5509f4e002d531178",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5fd480c5509f4e002d531175",
                    "id": 97571821,
                    "roomNumber": 4,
                    "beds": [
                        {
                            "_id": "5fd480c5509f4e002d531176",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                }
            ],
            "pictures": [
                {
                    "_id": "5fd480c5509f4e002d5311a4",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810038.jpg",
                    "id": "43922366_1024810038",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810038.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810038.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810038.jpg",
                    "caption": "",
                    "sort": 1
                },
                {
                    "_id": "5fd480c5509f4e002d5311a3",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810044.jpg",
                    "id": "43922366_1024810044",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810044.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810044.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810044.jpg",
                    "caption": "",
                    "sort": 2
                },
                {
                    "_id": "5fd480c5509f4e002d5311a2",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810083.jpg",
                    "id": "43922366_1024810083",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810083.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810083.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810083.jpg",
                    "caption": "",
                    "sort": 3
                },
                {
                    "_id": "5fd480c5509f4e002d5311a1",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810068.jpg",
                    "id": "43922366_1024810068",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810068.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810068.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810068.jpg",
                    "caption": "",
                    "sort": 4
                },
                {
                    "_id": "5fd480c5509f4e002d5311a0",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810041.jpg",
                    "id": "43922366_1024810041",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810041.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810041.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810041.jpg",
                    "caption": "",
                    "sort": 5
                },
                {
                    "_id": "5fd480c5509f4e002d53119f",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810040.jpg",
                    "id": "43922366_1024810040",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810040.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810040.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810040.jpg",
                    "caption": "",
                    "sort": 6
                },
                {
                    "_id": "5fd480c5509f4e002d53119e",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810064.jpg",
                    "id": "43922366_1024810064",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810064.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810064.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810064.jpg",
                    "caption": "",
                    "sort": 7
                },
                {
                    "_id": "5fd480c5509f4e002d53119d",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810065.jpg",
                    "id": "43922366_1024810065",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810065.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810065.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810065.jpg",
                    "caption": "",
                    "sort": 8
                },
                {
                    "_id": "5fd480c5509f4e002d53119c",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810045.jpg",
                    "id": "43922366_1024810045",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810045.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810045.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810045.jpg",
                    "caption": "",
                    "sort": 9
                },
                {
                    "_id": "5fd480c5509f4e002d53119b",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810082.jpg",
                    "id": "43922366_1024810082",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810082.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810082.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810082.jpg",
                    "caption": "",
                    "sort": 10
                },
                {
                    "_id": "5fd480c5509f4e002d53119a",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810055.jpg",
                    "id": "43922366_1024810055",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810055.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810055.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810055.jpg",
                    "caption": "",
                    "sort": 11
                },
                {
                    "_id": "5fd480c5509f4e002d531199",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810104.jpg",
                    "id": "43922366_1024810104",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810104.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810104.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810104.jpg",
                    "caption": "",
                    "sort": 12
                },
                {
                    "_id": "5fd480c5509f4e002d531198",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810075.jpg",
                    "id": "43922366_1024810075",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810075.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810075.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810075.jpg",
                    "caption": "",
                    "sort": 13
                },
                {
                    "_id": "5fd480c5509f4e002d531197",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810047.jpg",
                    "id": "43922366_1024810047",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810047.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810047.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810047.jpg",
                    "caption": "",
                    "sort": 14
                },
                {
                    "_id": "5fd480c5509f4e002d531196",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810071.jpg",
                    "id": "43922366_1024810071",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810071.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810071.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810071.jpg",
                    "caption": "",
                    "sort": 15
                },
                {
                    "_id": "5fd480c5509f4e002d531195",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810074.jpg",
                    "id": "43922366_1024810074",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810074.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810074.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810074.jpg",
                    "caption": "",
                    "sort": 16
                },
                {
                    "_id": "5fd480c5509f4e002d531194",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810048.jpg",
                    "id": "43922366_1024810048",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810048.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810048.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810048.jpg",
                    "caption": "",
                    "sort": 17
                },
                {
                    "_id": "5fd480c5509f4e002d531193",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810042.jpg",
                    "id": "43922366_1024810042",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810042.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810042.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810042.jpg",
                    "caption": "",
                    "sort": 18
                },
                {
                    "_id": "5fd480c5509f4e002d531192",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810052.jpg",
                    "id": "43922366_1024810052",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810052.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810052.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810052.jpg",
                    "caption": "",
                    "sort": 19
                },
                {
                    "_id": "5fd480c5509f4e002d531191",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810078.jpg",
                    "id": "43922366_1024810078",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810078.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810078.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810078.jpg",
                    "caption": "",
                    "sort": 20
                },
                {
                    "_id": "5fd480c5509f4e002d531190",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810072.jpg",
                    "id": "43922366_1024810072",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810072.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810072.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810072.jpg",
                    "caption": "",
                    "sort": 21
                },
                {
                    "_id": "5fd480c5509f4e002d53118f",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810076.jpg",
                    "id": "43922366_1024810076",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810076.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810076.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810076.jpg",
                    "caption": "",
                    "sort": 22
                },
                {
                    "_id": "5fd480c5509f4e002d53118e",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810102.jpg",
                    "id": "43922366_1024810102",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810102.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810102.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810102.jpg",
                    "caption": "",
                    "sort": 23
                },
                {
                    "_id": "5fd480c5509f4e002d53118d",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810096.jpg",
                    "id": "43922366_1024810096",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810096.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810096.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810096.jpg",
                    "caption": "",
                    "sort": 24
                },
                {
                    "_id": "5fd480c5509f4e002d53118c",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810070.jpg",
                    "id": "43922366_1024810070",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810070.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810070.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810070.jpg",
                    "caption": "",
                    "sort": 25
                },
                {
                    "_id": "5fd480c5509f4e002d53118b",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810087.jpg",
                    "id": "43922366_1024810087",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810087.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810087.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810087.jpg",
                    "caption": "",
                    "sort": 26
                },
                {
                    "_id": "5fd480c5509f4e002d53118a",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810090.jpg",
                    "id": "43922366_1024810090",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810090.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810090.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810090.jpg",
                    "caption": "",
                    "sort": 27
                },
                {
                    "_id": "5fd480c5509f4e002d531189",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810084.jpg",
                    "id": "43922366_1024810084",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810084.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810084.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810084.jpg",
                    "caption": "",
                    "sort": 28
                },
                {
                    "_id": "5fd480c5509f4e002d531188",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810069.jpg",
                    "id": "43922366_1024810069",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810069.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810069.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810069.jpg",
                    "caption": "",
                    "sort": 29
                },
                {
                    "_id": "5fd480c5509f4e002d531187",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810081.jpg",
                    "id": "43922366_1024810081",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810081.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810081.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810081.jpg",
                    "caption": "",
                    "sort": 30
                },
                {
                    "_id": "5fd480c5509f4e002d531186",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810098.jpg",
                    "id": "43922366_1024810098",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810098.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810098.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810098.jpg",
                    "caption": "",
                    "sort": 31
                },
                {
                    "_id": "5fd480c5509f4e002d531185",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810039.jpg",
                    "id": "43922366_1024810039",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810039.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810039.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810039.jpg",
                    "caption": "",
                    "sort": 32
                },
                {
                    "_id": "5fd480c5509f4e002d531184",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810097.jpg",
                    "id": "43922366_1024810097",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810097.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810097.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810097.jpg",
                    "caption": "",
                    "sort": 33
                },
                {
                    "_id": "5fd480c5509f4e002d531183",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810080.jpg",
                    "id": "43922366_1024810080",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810080.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810080.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810080.jpg",
                    "caption": "",
                    "sort": 34
                },
                {
                    "_id": "5fd480c5509f4e002d531182",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810099.jpg",
                    "id": "43922366_1024810099",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810099.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810099.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810099.jpg",
                    "caption": "",
                    "sort": 35
                },
                {
                    "_id": "5fd480c5509f4e002d531181",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810085.jpg",
                    "id": "43922366_1024810085",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810085.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810085.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810085.jpg",
                    "caption": "",
                    "sort": 36
                },
                {
                    "_id": "5fd480c5509f4e002d531180",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810095.jpg",
                    "id": "43922366_1024810095",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810095.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810095.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810095.jpg",
                    "caption": "",
                    "sort": 37
                },
                {
                    "_id": "5fd480c5509f4e002d53117f",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810067.jpg",
                    "id": "43922366_1024810067",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810067.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810067.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810067.jpg",
                    "caption": "",
                    "sort": 38
                },
                {
                    "_id": "5fd480c5509f4e002d53117e",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810105.jpg",
                    "id": "43922366_1024810105",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810105.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810105.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810105.jpg",
                    "caption": "",
                    "sort": 39
                },
                {
                    "_id": "5fd480c5509f4e002d53117d",
                    "thumbnail": "https://guesty-listing-images.s3.amazonaws.com/production/thumbnail_43922366_1024810073.jpg",
                    "id": "43922366_1024810073",
                    "regular": "https://guesty-listing-images.s3.amazonaws.com/production/regular_43922366_1024810073.jpg",
                    "large": "https://guesty-listing-images.s3.amazonaws.com/production/large_43922366_1024810073.jpg",
                    "original": "https://guesty-listing-images.s3.amazonaws.com/production/original_43922366_1024810073.jpg",
                    "caption": "",
                    "sort": 40
                }
            ],
            "accountId": "585a39dbe43900100017e9e8",
            "createdAt": "2020-12-12T08:35:17.932Z",
            "lastUpdatedAt": "2023-01-11T05:50:01.993Z",
            "pendingTasks": [],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-12-12T08:35:17.933Z",
            "occupancyStats": [],
            "__v": 22,
            "lastActivityAt": "2021-01-27T21:27:24.618Z",
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:53:03.342Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "602168be0c129d002e9f67d2",
            "SaaS": {
                "autoRenew": true
            },
            "picture": {
                "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802095/production/585a39dbe43900100017e9e8/yazlmlzn83ha62x71fwk.jpg"
            },
            "terms": {
                "minNights": 3,
                "maxNights": 45
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "currency": "ILS",
                "basePrice": 8000,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": []
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    }
                },
                "rentalPeriods": []
            },
            "type": "SINGLE",
            "tags": [
                "Israel",
                "PM-Unknown",
                "PMC-Unknown",
                "Pool",
                "Fitness-Center",
                "Steam-room"
            ],
            "owners": [],
            "amenities": [
                "Air conditioning",
                "BBQ grill",
                "Cable TV",
                "Dishwasher",
                "Dryer",
                "Free parking on premises",
                "Heating",
                "Iron",
                "Refrigerator",
                "TV",
                "Washer",
                "Accessible-height bed",
                "Bed linens",
                "Changing table",
                "Essentials",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Hangers",
                "Hair dryer",
                "Hot water",
                "Internet",
                "Enhanced cleaning practices",
                "High touch surfaces disinfected",
                "Cleaning Disinfection",
                "Wireless Internet",
                "Swimming pool",
                "Towels provided",
                "Toaster",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Private pool",
                "Private entrance",
                "Patio or balcony",
                "Outdoor pool",
                "Oven",
                "Microwave",
                "Luggage dropoff allowed",
                "Laptop friendly workspace",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 15,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "accommodates": 12,
            "bedrooms": 6,
            "beds": 6,
            "bathrooms": 6,
            "defaultCheckInTime": "16:00",
            "defaultCheckOutTime": "11:00",
            "propertyType": "Villa",
            "roomType": "Entire home/apt",
            "address": {
                "full": "HaAgas St 2, Eilat, Israel",
                "lng": 34.9409298,
                "lat": 29.5453179,
                "street": "HaAgas Street 2",
                "city": "Eilat",
                "country": "Israel",
                "state": "South District",
                "county": "Israel"
            },
            "pictures": [
                {
                    "_id": "602168be0c129d002e9f67e3",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802095/production/585a39dbe43900100017e9e8/yazlmlzn83ha62x71fwk.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802095/production/585a39dbe43900100017e9e8/yazlmlzn83ha62x71fwk.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67e2",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802095/production/585a39dbe43900100017e9e8/s2vexkmelfoistmidsbj.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802095/production/585a39dbe43900100017e9e8/s2vexkmelfoistmidsbj.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67e1",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802095/production/585a39dbe43900100017e9e8/srcqml6pb4n6cwici25a.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802095/production/585a39dbe43900100017e9e8/srcqml6pb4n6cwici25a.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67e0",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802098/production/585a39dbe43900100017e9e8/rrzfqrolt5eetu6s26b5.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802098/production/585a39dbe43900100017e9e8/rrzfqrolt5eetu6s26b5.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67df",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802097/production/585a39dbe43900100017e9e8/rvgjbaqaf8mssk8uj53l.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802097/production/585a39dbe43900100017e9e8/rvgjbaqaf8mssk8uj53l.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67de",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802096/production/585a39dbe43900100017e9e8/yeztx5xunnrnq7e64fef.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802096/production/585a39dbe43900100017e9e8/yeztx5xunnrnq7e64fef.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67dd",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802095/production/585a39dbe43900100017e9e8/d8xymtqitgtvc8fb52g3.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802095/production/585a39dbe43900100017e9e8/d8xymtqitgtvc8fb52g3.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67dc",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802096/production/585a39dbe43900100017e9e8/iyubsiwntc35q2imfwaw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802096/production/585a39dbe43900100017e9e8/iyubsiwntc35q2imfwaw.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67db",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802098/production/585a39dbe43900100017e9e8/iayynlrzmz70j5i9qg0p.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802098/production/585a39dbe43900100017e9e8/iayynlrzmz70j5i9qg0p.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67da",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802096/production/585a39dbe43900100017e9e8/nkitqukteuicrloo9noj.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802096/production/585a39dbe43900100017e9e8/nkitqukteuicrloo9noj.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67d9",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802097/production/585a39dbe43900100017e9e8/q6cs8z7sky1p95rvkp0m.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802097/production/585a39dbe43900100017e9e8/q6cs8z7sky1p95rvkp0m.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67d8",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802097/production/585a39dbe43900100017e9e8/tbkgmn0ptufgdsowiocl.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802097/production/585a39dbe43900100017e9e8/tbkgmn0ptufgdsowiocl.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67d7",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802097/production/585a39dbe43900100017e9e8/lpdvipc5i2ikevqpjvoq.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802097/production/585a39dbe43900100017e9e8/lpdvipc5i2ikevqpjvoq.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67d6",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802098/production/585a39dbe43900100017e9e8/ym7lwffbnw1gweaga7mv.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802098/production/585a39dbe43900100017e9e8/ym7lwffbnw1gweaga7mv.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67d5",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802098/production/585a39dbe43900100017e9e8/zosgum4x7m6bejn15gmq.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802098/production/585a39dbe43900100017e9e8/zosgum4x7m6bejn15gmq.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67d4",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802095/production/585a39dbe43900100017e9e8/xglko9a60kjkjd2wwrix.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802095/production/585a39dbe43900100017e9e8/xglko9a60kjkjd2wwrix.jpg"
                },
                {
                    "_id": "602168be0c129d002e9f67d3",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1612802098/production/585a39dbe43900100017e9e8/nc6stup3prmlszmtdtee.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1612802098/production/585a39dbe43900100017e9e8/nc6stup3prmlszmtdtee.jpg"
                }
            ],
            "timezone": "Europe/Zurich",
            "nickname": "EIL010 V5",
            "title": "6BR Contemporary Villa with Nice Interiors",
            "accountId": "585a39dbe43900100017e9e8",
            "createdAt": "2021-02-08T16:37:18.275Z",
            "lastUpdatedAt": "2022-09-19T09:17:12.282Z",
            "integrations": [],
            "pendingTasks": [],
            "listingRooms": [],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2021-02-08T16:37:18.276Z",
            "occupancyStats": [],
            "__v": 16,
            "publicDescription": {
                "space": "Main entrance\n1 living room and dining area with direct access to the terrace\nGuest kitchen\n6 bedrooms\nBilliards table\nEquipped with air conditioning, Wifi and satellite television\nSwimming pool with summer lounge/dining area",
                "summary": "Beautifully styled and furnished with top of the range homeware and accessories.",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:53:14.793Z"
            },
            "isListed": false,
            "accountTaxes": []
        },
        {
            "_id": "5ecd032dead3c80039b48035",
            "SaaS": {
                "autoRenew": true
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f43b94a79f02f002d2cc005",
                        "formula": 0,
                        "valueType": "FIXED",
                        "multiplier": "PER_STAY"
                    }
                }
            },
            "address": {
                "full": "Caesarea, Haifa District, Israel",
                "city": "Caesarea",
                "state": "Haifa District",
                "country": "Israel",
                "lat": 32.519016,
                "lng": 34.904545,
                "searchable": "Caesarea, Haifa District, Israel"
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 2
            },
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009063897.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009063897.jpg",
                "large": "//guestybookings.s3.amazonaws.com/images/large_1009063897.jpg",
                "caption": ""
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125,
                "cancellation": "strict_14_with_grace_period"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "securityDepositFee": 2500,
                "basePrice": 8000,
                "basePriceUSD": 2014,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 1,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": false,
                    "allowsInfants": false,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "space": "The villa which can accommodate up to 20 guests, is composed as follows:\n\nESSENTIAL DETAILS:\n- Main entrance\n- 1 spacious living room and dining area with direct access to the terrace\n- Fully equipped guest kitchen\n- 8 bedrooms \n- Equipped with air conditioning, Wifi and satellite television\n\nOutdoor:\n- Swimming pool \n- Lounge/dining area \n- Beautiful terrace overlooking the sea",
                "summary": "Beautiful kosher villa located in Caesarea, with panoramic sea views. The swimming pool and the terrace allow you to enjoy the sun during the day and the sunsets at the end of the afternoon.",
                "houseRules": "• Not suitable for children and infants\r\n• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\n \n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:46:27.632Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:46:27.631Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:46:27.631Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:46:27.635Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel"
            ],
            "owners": [],
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Heating",
                "Washer",
                "Dryer",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Laptop-friendly workspace",
                "Private living room",
                "Private entrance",
                "Children’s books and toys",
                "Crib",
                "Hot water",
                "Bed linens",
                "Extra pillows and blankets",
                "Microwave",
                "Refrigerator",
                "Dishwasher",
                "Oven",
                "BBQ grill",
                "Patio or balcony",
                "Garden or backyard",
                "Shower gel",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [
                "Bathtub",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Iron",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Disabled parking spot",
                "Doorman",
                "EV charger",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "First aid kit",
                "Flat smooth pathway to front door",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "createdAt": "2020-05-26T11:53:17.755Z",
            "lastUpdatedAt": "2023-01-11T05:46:27.757Z",
            "integrations": [
                {
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "promotions": [],
                        "id": "43540025",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "6114118690b7cd002d56b7e9",
                            "basePrice": {
                                "channelSyncStatus": "IN_PROGRESS"
                            }
                        }
                    },
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/43540025"
                }
            ],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "5ecd032dead3c80039b4805c",
                    "id": 94711481,
                    "roomNumber": 6,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b4805d",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5ecd032dead3c80039b4805e",
                    "id": 94711482,
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b48060",
                            "quantity": 1,
                            "type": "CRIB"
                        },
                        {
                            "_id": "5ecd032dead3c80039b4805f",
                            "quantity": 3,
                            "type": "SINGLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5ecd032dead3c80039b48061",
                    "id": 94711483,
                    "roomNumber": 5,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b48062",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5ecd032dead3c80039b48063",
                    "id": 94711484,
                    "roomNumber": 8,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b48064",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5ecd032dead3c80039b48065",
                    "id": 94711485,
                    "roomNumber": 4,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b48066",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5ecd032dead3c80039b48067",
                    "id": 94711486,
                    "roomNumber": 3,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b48068",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5ecd032dead3c80039b48069",
                    "id": 94711487,
                    "roomNumber": 2,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b4806b",
                            "quantity": 1,
                            "type": "CRIB"
                        },
                        {
                            "_id": "5ecd032dead3c80039b4806a",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5ecd032dead3c80039b4806c",
                    "id": 94711488,
                    "roomNumber": 7,
                    "beds": [
                        {
                            "_id": "5ecd032dead3c80039b4806d",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                }
            ],
            "pictures": [
                {
                    "_id": "5ecd032dead3c80039b4805a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009063897.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009063897.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009063897.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009063897.jpg",
                    "id": "43540025_1563163606",
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48059",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081295.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081295.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081295.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081295.jpg",
                    "id": "43540025_1563163631",
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48058",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080996.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080996.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080996.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080996.jpg",
                    "id": "43540025_1563163660",
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48057",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080879.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080879.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080879.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080879.jpg",
                    "id": "43540025_1563163709",
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48056",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081621.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081621.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081621.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081621.jpg",
                    "id": "43540025_1563163736",
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48055",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080950.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080950.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080950.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080950.jpg",
                    "id": "43540025_1563163763",
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48054",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009063325.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009063325.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009063325.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009063325.jpg",
                    "id": "43540025_1563163790",
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48053",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080754.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080754.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080754.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080754.jpg",
                    "id": "43540025_1563163818",
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48052",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080847.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080847.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080847.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080847.jpg",
                    "id": "43540025_1563163856",
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48051",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081115.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081115.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081115.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081115.jpg",
                    "id": "43540025_1563163901",
                    "sort": 10,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48050",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009075813.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009075813.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009075813.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009075813.jpg",
                    "id": "43540025_1563163930",
                    "sort": 11,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4804f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080804.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080804.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080804.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080804.jpg",
                    "id": "43540025_1563163960",
                    "sort": 12,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4804e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081228.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081228.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081228.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081228.jpg",
                    "id": "43540025_1563163993",
                    "sort": 13,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4804d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081008.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081008.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081008.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081008.jpg",
                    "id": "43540025_1563164021",
                    "sort": 14,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4804c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009075834.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009075834.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009075834.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009075834.jpg",
                    "id": "43540025_1563164050",
                    "sort": 15,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4804b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009075713.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009075713.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009075713.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009075713.jpg",
                    "id": "43540025_1563164082",
                    "sort": 16,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4804a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009063211.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009063211.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009063211.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009063211.jpg",
                    "id": "43540025_1563164109",
                    "sort": 17,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48049",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080695.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080695.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080695.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080695.jpg",
                    "id": "43540025_1563164143",
                    "sort": 18,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48048",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009063407.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009063407.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009063407.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009063407.jpg",
                    "id": "43540025_1563164170",
                    "sort": 19,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48047",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080944.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080944.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080944.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080944.jpg",
                    "id": "43540025_1563164196",
                    "sort": 20,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48046",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080817.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080817.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080817.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080817.jpg",
                    "id": "43540025_1563164225",
                    "sort": 21,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48045",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081066.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081066.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081066.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081066.jpg",
                    "id": "43540025_1563164253",
                    "sort": 22,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48044",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081293.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081293.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081293.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081293.jpg",
                    "id": "43540025_1563164287",
                    "sort": 23,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48043",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080962.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080962.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080962.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080962.jpg",
                    "id": "43540025_1563164322",
                    "sort": 24,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48042",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081058.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081058.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081058.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081058.jpg",
                    "id": "43540025_1563164350",
                    "sort": 25,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48041",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009080943.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009080943.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009080943.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009080943.jpg",
                    "id": "43540025_1563164379",
                    "sort": 26,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b48040",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081386.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081386.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081386.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081386.jpg",
                    "id": "43540025_1563164417",
                    "sort": 27,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4803f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081225.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081225.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081225.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081225.jpg",
                    "id": "43540025_1563164447",
                    "sort": 28,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4803e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081556.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081556.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081556.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081556.jpg",
                    "id": "43540025_1563164476",
                    "sort": 29,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4803d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081434.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081434.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081434.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081434.jpg",
                    "id": "43540025_1563164520",
                    "sort": 30,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4803c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081608.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081608.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081608.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081608.jpg",
                    "id": "43540025_1563164561",
                    "sort": 31,
                    "caption": ""
                },
                {
                    "_id": "5ecd032dead3c80039b4803b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_1009081631.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_1009081631.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_1009081631.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_1009081631.jpg",
                    "id": "43540025_1563164607",
                    "sort": 32,
                    "caption": ""
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-05-26T11:53:17.757Z",
            "occupancyStats": [],
            "accountId": "585a39dbe43900100017e9e8",
            "importingPlatform": "airbnb",
            "nickname": "CAE037 Hanna 8BR",
            "isListed": true,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5ecd032dead3c80039b4803a"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "11:00",
            "title": "8 Br Kosher Villa with Panoramic Sea Views",
            "timezone": "Asia/Jerusalem",
            "bedrooms": 8,
            "beds": 10,
            "propertyType": "Villa",
            "roomType": "Entire home/apt",
            "bedType": "Real Bed",
            "accommodates": 16,
            "bathrooms": 5,
            "lastSyncedAt": "2020-06-15T09:25:34.065Z",
            "__v": 19,
            "defaultCheckInEndTime": null,
            "lastActivityAt": "2021-03-15T18:24:38.682Z",
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:53:20.142Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "60462d109a7edb002f446030",
            "SaaS": {
                "autoRenew": true
            },
            "picture": {
                "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206233/production/585a39dbe43900100017e9e8/dflep0vkawceere1itng.jpg"
            },
            "terms": {
                "minNights": 30,
                "maxNights": 45
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "currency": "ILS",
                "basePrice": 7500,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ],
                "guestsIncludedInRegularFee": 18,
                "cleaningFee": 1500
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CONFIRMATION"
                            },
                            "_id": "604631e494a182003091d8bb",
                            "chargeType": "PERCENTAGE",
                            "amount": 100,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-12-21T18:48:03.265Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-12-21T18:48:03.264Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-12-21T18:48:03.265Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-12-21T18:48:03.269Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel",
                "PM-Arthur Fogel",
                "PMC-Through Ira",
                "Pool",
                "Free-parking"
            ],
            "owners": [],
            "amenities": [
                "Hot water",
                "Internet",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Essentials",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Shampoo",
                "Cleaning before checkout",
                "Bed linens",
                "Wireless Internet",
                "Bathtub",
                "TV",
                "Swimming pool",
                "Garden or backyard",
                "Patio or balcony",
                "Towels provided",
                "Air conditioning",
                "BBQ grill",
                "Cable TV",
                "Dishwasher",
                "Dryer",
                "Free parking on premises",
                "Iron",
                "Refrigerator",
                "Washer",
                "Indoor fireplace",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Cleaning Disinfection",
                "Crib",
                "Fire extinguisher",
                "First aid kit",
                "Hangers",
                "Hair dryer",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Microwave",
                "Outdoor pool",
                "Private entrance",
                "Private pool",
                "Smoke detector",
                "Stereo system",
                "Toaster",
                "Near Ocean",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "accommodates": 18,
            "bedrooms": 9,
            "beds": 13,
            "bathrooms": 5,
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "10:00",
            "propertyType": "Villa",
            "roomType": "Entire home/apt",
            "address": {
                "full": "HaEgoz St 4, Caesarea, Israel",
                "lng": 34.905347,
                "lat": 32.505046,
                "county": "Israel",
                "neighborhood": "Caesarea",
                "street": "HaEgoz Street 4",
                "city": "Caesarea",
                "country": "Israel",
                "state": "Haifa District"
            },
            "pictures": [
                {
                    "_id": "6168039873b953002e3c896b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206233/production/585a39dbe43900100017e9e8/dflep0vkawceere1itng.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206233/production/585a39dbe43900100017e9e8/dflep0vkawceere1itng.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 214320
                },
                {
                    "_id": "6168039873b953002e3c896a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206147/production/585a39dbe43900100017e9e8/g0pggdo1yd6u4plddrq5.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206147/production/585a39dbe43900100017e9e8/g0pggdo1yd6u4plddrq5.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 374953
                },
                {
                    "_id": "6168039873b953002e3c8969",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206130/production/585a39dbe43900100017e9e8/ghg3nhyzfccklbdric3p.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206130/production/585a39dbe43900100017e9e8/ghg3nhyzfccklbdric3p.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 196068
                },
                {
                    "_id": "6168039873b953002e3c8968",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206108/production/585a39dbe43900100017e9e8/hs4asqcsw5j8gcmxjry8.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206108/production/585a39dbe43900100017e9e8/hs4asqcsw5j8gcmxjry8.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 151139
                },
                {
                    "_id": "6168039873b953002e3c8967",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206122/production/585a39dbe43900100017e9e8/vuehhjhk8yzwmcuckiat.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206122/production/585a39dbe43900100017e9e8/vuehhjhk8yzwmcuckiat.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 287292
                },
                {
                    "_id": "6168039873b953002e3c8966",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206109/production/585a39dbe43900100017e9e8/nawjcygzpavuulqjwv1p.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206109/production/585a39dbe43900100017e9e8/nawjcygzpavuulqjwv1p.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 179467
                },
                {
                    "_id": "6168039873b953002e3c8965",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206127/production/585a39dbe43900100017e9e8/awymxp4wkzyfpokhuwwx.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206127/production/585a39dbe43900100017e9e8/awymxp4wkzyfpokhuwwx.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 271343
                },
                {
                    "_id": "6168039873b953002e3c8964",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206143/production/585a39dbe43900100017e9e8/wwjcyp4w3mylyekk7szs.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206143/production/585a39dbe43900100017e9e8/wwjcyp4w3mylyekk7szs.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 211201
                },
                {
                    "_id": "6168039873b953002e3c8963",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206117/production/585a39dbe43900100017e9e8/xangsv9qu2wy7ayonfhc.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206117/production/585a39dbe43900100017e9e8/xangsv9qu2wy7ayonfhc.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 125468
                },
                {
                    "_id": "6168039873b953002e3c8962",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206152/production/585a39dbe43900100017e9e8/gmuptb3kk1gsdj2gwobj.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206152/production/585a39dbe43900100017e9e8/gmuptb3kk1gsdj2gwobj.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 234034
                },
                {
                    "_id": "6168039873b953002e3c8961",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206129/production/585a39dbe43900100017e9e8/hmdyhtek65afsbcg6nhn.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206129/production/585a39dbe43900100017e9e8/hmdyhtek65afsbcg6nhn.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 163034
                },
                {
                    "_id": "6168039873b953002e3c8960",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206141/production/585a39dbe43900100017e9e8/aevxqrztm2uetbocof8y.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206141/production/585a39dbe43900100017e9e8/aevxqrztm2uetbocof8y.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 226919
                },
                {
                    "_id": "6168039873b953002e3c895f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206147/production/585a39dbe43900100017e9e8/tnz6ibxctp6btx1bl7h7.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206147/production/585a39dbe43900100017e9e8/tnz6ibxctp6btx1bl7h7.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 204775
                },
                {
                    "_id": "6168039873b953002e3c895e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206146/production/585a39dbe43900100017e9e8/udeoxpm6yafzh9buhkxv.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206146/production/585a39dbe43900100017e9e8/udeoxpm6yafzh9buhkxv.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 135233
                },
                {
                    "_id": "6168039873b953002e3c895d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206159/production/585a39dbe43900100017e9e8/minx4h2jhnmsct65te4x.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206159/production/585a39dbe43900100017e9e8/minx4h2jhnmsct65te4x.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 133040
                },
                {
                    "_id": "6168039873b953002e3c895c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206169/production/585a39dbe43900100017e9e8/dikcp0zzlwlafahsspmv.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206169/production/585a39dbe43900100017e9e8/dikcp0zzlwlafahsspmv.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 252589
                },
                {
                    "_id": "6168039873b953002e3c895b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206175/production/585a39dbe43900100017e9e8/uyjsjifn7x2rgvvnbyyw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206175/production/585a39dbe43900100017e9e8/uyjsjifn7x2rgvvnbyyw.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 343342
                },
                {
                    "_id": "6168039873b953002e3c895a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206173/production/585a39dbe43900100017e9e8/dpgkk8sehobtyygdqzmr.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206173/production/585a39dbe43900100017e9e8/dpgkk8sehobtyygdqzmr.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 245694
                },
                {
                    "_id": "6168039873b953002e3c8959",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206179/production/585a39dbe43900100017e9e8/o3zesd5msuswj1sgkxm5.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206179/production/585a39dbe43900100017e9e8/o3zesd5msuswj1sgkxm5.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 467440
                },
                {
                    "_id": "6168039873b953002e3c8958",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206169/production/585a39dbe43900100017e9e8/fygoio0czs4lgi9lo60m.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206169/production/585a39dbe43900100017e9e8/fygoio0czs4lgi9lo60m.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 156818
                },
                {
                    "_id": "6168039873b953002e3c8957",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206185/production/585a39dbe43900100017e9e8/pjpyin9xeenwnzzatk43.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206185/production/585a39dbe43900100017e9e8/pjpyin9xeenwnzzatk43.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 437936
                },
                {
                    "_id": "6168039873b953002e3c8956",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206188/production/585a39dbe43900100017e9e8/guj6thyrbncbqpd5quq2.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206188/production/585a39dbe43900100017e9e8/guj6thyrbncbqpd5quq2.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 185485
                },
                {
                    "_id": "6168039873b953002e3c8955",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206191/production/585a39dbe43900100017e9e8/uqpa7lfjw4gsgjdmfzeh.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206191/production/585a39dbe43900100017e9e8/uqpa7lfjw4gsgjdmfzeh.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 201548
                },
                {
                    "_id": "6168039873b953002e3c8954",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206204/production/585a39dbe43900100017e9e8/czvim63tc154r2yovufa.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206204/production/585a39dbe43900100017e9e8/czvim63tc154r2yovufa.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 434661
                },
                {
                    "_id": "6168039873b953002e3c8953",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206197/production/585a39dbe43900100017e9e8/zfq6z7uu56ofowez29c2.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206197/production/585a39dbe43900100017e9e8/zfq6z7uu56ofowez29c2.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 181164
                },
                {
                    "_id": "6168039873b953002e3c8952",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206215/production/585a39dbe43900100017e9e8/qklt1kpov2rq38lxpy7w.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206215/production/585a39dbe43900100017e9e8/qklt1kpov2rq38lxpy7w.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 445841
                },
                {
                    "_id": "6168039873b953002e3c8951",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206207/production/585a39dbe43900100017e9e8/uzkudqwdkl13tarv8jaz.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206207/production/585a39dbe43900100017e9e8/uzkudqwdkl13tarv8jaz.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 201775
                },
                {
                    "_id": "6168039873b953002e3c8950",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206218/production/585a39dbe43900100017e9e8/ixd5omxxhswqg45ts9zg.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206218/production/585a39dbe43900100017e9e8/ixd5omxxhswqg45ts9zg.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 437556
                },
                {
                    "_id": "6168039873b953002e3c894f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206215/production/585a39dbe43900100017e9e8/qhfyf5hphwks6l71ca1l.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206215/production/585a39dbe43900100017e9e8/qhfyf5hphwks6l71ca1l.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 229980
                },
                {
                    "_id": "6168039873b953002e3c894e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206219/production/585a39dbe43900100017e9e8/c1kpyqerlorupxkkkdbq.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206219/production/585a39dbe43900100017e9e8/c1kpyqerlorupxkkkdbq.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 214777
                },
                {
                    "_id": "6168039873b953002e3c894d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206224/production/585a39dbe43900100017e9e8/iia9gnbeb1o9xt4lsati.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206224/production/585a39dbe43900100017e9e8/iia9gnbeb1o9xt4lsati.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 204775
                },
                {
                    "_id": "6168039873b953002e3c894c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206225/production/585a39dbe43900100017e9e8/q6nkj230jkqzb52tn8mq.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206225/production/585a39dbe43900100017e9e8/q6nkj230jkqzb52tn8mq.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 203542
                },
                {
                    "_id": "6168039873b953002e3c894b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206237/production/585a39dbe43900100017e9e8/jhjdt3amuqarbzlaeosm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206237/production/585a39dbe43900100017e9e8/jhjdt3amuqarbzlaeosm.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 244338
                },
                {
                    "_id": "6168039873b953002e3c894a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206239/production/585a39dbe43900100017e9e8/eut5zkiczff4ly1jkeyd.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206239/production/585a39dbe43900100017e9e8/eut5zkiczff4ly1jkeyd.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 241425
                },
                {
                    "_id": "6168039873b953002e3c8949",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206239/production/585a39dbe43900100017e9e8/e5don2oxhhvgxx1ojj9j.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206239/production/585a39dbe43900100017e9e8/e5don2oxhhvgxx1ojj9j.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 158359
                },
                {
                    "_id": "6168039873b953002e3c8948",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206239/production/585a39dbe43900100017e9e8/fmwzx8esduem0o6wzyps.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206239/production/585a39dbe43900100017e9e8/fmwzx8esduem0o6wzyps.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 131472
                },
                {
                    "_id": "6168039873b953002e3c8947",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206245/production/585a39dbe43900100017e9e8/uzklplyarcuijjlwfeuh.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206245/production/585a39dbe43900100017e9e8/uzklplyarcuijjlwfeuh.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 196177
                },
                {
                    "_id": "6168039873b953002e3c8946",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206243/production/585a39dbe43900100017e9e8/jialf0byzrivojhbmhgf.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206243/production/585a39dbe43900100017e9e8/jialf0byzrivojhbmhgf.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 114557
                },
                {
                    "_id": "6168039873b953002e3c8945",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206258/production/585a39dbe43900100017e9e8/fq0qiiiwcwz3vgg78kuq.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206258/production/585a39dbe43900100017e9e8/fq0qiiiwcwz3vgg78kuq.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 152143
                },
                {
                    "_id": "6168039873b953002e3c8944",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206256/production/585a39dbe43900100017e9e8/wxmdnqhz9xtilfgocnz3.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206256/production/585a39dbe43900100017e9e8/wxmdnqhz9xtilfgocnz3.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 177616
                },
                {
                    "_id": "6168039873b953002e3c8943",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206259/production/585a39dbe43900100017e9e8/nptzygcuulchqqlrgkht.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206259/production/585a39dbe43900100017e9e8/nptzygcuulchqqlrgkht.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 164732
                },
                {
                    "_id": "6168039873b953002e3c8942",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206252/production/585a39dbe43900100017e9e8/ju3zapd2av1hbwvkhalx.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206252/production/585a39dbe43900100017e9e8/ju3zapd2av1hbwvkhalx.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 177076
                },
                {
                    "_id": "6168039873b953002e3c8941",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206258/production/585a39dbe43900100017e9e8/ithri085kx4cq8tx4mfr.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206258/production/585a39dbe43900100017e9e8/ithri085kx4cq8tx4mfr.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 128081
                },
                {
                    "_id": "6168039873b953002e3c8940",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206267/production/585a39dbe43900100017e9e8/hxmzeosrdgu2g3vp2rmw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206267/production/585a39dbe43900100017e9e8/hxmzeosrdgu2g3vp2rmw.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 168237
                },
                {
                    "_id": "6168039873b953002e3c893f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206268/production/585a39dbe43900100017e9e8/l4h89xb18ad0nxisry9c.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206268/production/585a39dbe43900100017e9e8/l4h89xb18ad0nxisry9c.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 118138
                },
                {
                    "_id": "6168039873b953002e3c893e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206270/production/585a39dbe43900100017e9e8/om9ajpyfd50okbcm3eej.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206270/production/585a39dbe43900100017e9e8/om9ajpyfd50okbcm3eej.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 116588
                },
                {
                    "_id": "6168039873b953002e3c893d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206271/production/585a39dbe43900100017e9e8/i0moqvavrakrx3ak2wmj.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206271/production/585a39dbe43900100017e9e8/i0moqvavrakrx3ak2wmj.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 111874
                },
                {
                    "_id": "6168039873b953002e3c893c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206282/production/585a39dbe43900100017e9e8/nr740qvjrjsw8swfbdgd.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206282/production/585a39dbe43900100017e9e8/nr740qvjrjsw8swfbdgd.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 247681
                },
                {
                    "_id": "6168039873b953002e3c893b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206285/production/585a39dbe43900100017e9e8/fm2yk9ziriam2azzrzwd.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206285/production/585a39dbe43900100017e9e8/fm2yk9ziriam2azzrzwd.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 179816
                },
                {
                    "_id": "6168039873b953002e3c893a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206286/production/585a39dbe43900100017e9e8/fbkf7rjrwcoxddju1lue.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206286/production/585a39dbe43900100017e9e8/fbkf7rjrwcoxddju1lue.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 188079
                },
                {
                    "_id": "6168039873b953002e3c8939",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206288/production/585a39dbe43900100017e9e8/tnma17goo8xener2bieh.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206288/production/585a39dbe43900100017e9e8/tnma17goo8xener2bieh.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 160312
                },
                {
                    "_id": "6168039873b953002e3c8938",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206285/production/585a39dbe43900100017e9e8/frva4j21csb3tbuzhdrz.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206285/production/585a39dbe43900100017e9e8/frva4j21csb3tbuzhdrz.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 128634
                },
                {
                    "_id": "6168039873b953002e3c8937",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206287/production/585a39dbe43900100017e9e8/hmqyjekpffkgw67fetcm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206287/production/585a39dbe43900100017e9e8/hmqyjekpffkgw67fetcm.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 184898
                },
                {
                    "_id": "6168039873b953002e3c8936",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206120/production/585a39dbe43900100017e9e8/e4pflzofvfpygqccsw2v.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206120/production/585a39dbe43900100017e9e8/e4pflzofvfpygqccsw2v.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 193430
                },
                {
                    "_id": "6168039873b953002e3c8935",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206110/production/585a39dbe43900100017e9e8/sjuooqmrf4wv9wrffuwa.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206110/production/585a39dbe43900100017e9e8/sjuooqmrf4wv9wrffuwa.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 157343
                },
                {
                    "_id": "6168039873b953002e3c8934",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1634206265/production/585a39dbe43900100017e9e8/pnsox2ykycdujnalc4px.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1634206265/production/585a39dbe43900100017e9e8/pnsox2ykycdujnalc4px.jpg",
                    "height": 1080,
                    "width": 1920,
                    "size": 134470
                }
            ],
            "timezone": "Europe/Zurich",
            "nickname": "CAE072 Arthur Egoz 4",
            "title": "9 BR Kosher Villa with Private Sauna",
            "accountId": "585a39dbe43900100017e9e8",
            "createdAt": "2021-03-08T13:56:32.348Z",
            "lastUpdatedAt": "2022-12-21T18:48:03.420Z",
            "integrations": [],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "604632db048ed100315d1399",
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "604632db048ed100315d139a",
                            "type": "KING_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "604632db048ed100315d1397",
                    "roomNumber": 2,
                    "beds": [
                        {
                            "_id": "604632db048ed100315d1398",
                            "type": "KING_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "604632db048ed100315d1395",
                    "roomNumber": 3,
                    "beds": [
                        {
                            "_id": "604632db048ed100315d1396",
                            "type": "KING_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "604632db048ed100315d1393",
                    "roomNumber": 4,
                    "beds": [
                        {
                            "_id": "604632db048ed100315d1394",
                            "type": "KING_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "604632db048ed100315d1391",
                    "roomNumber": 5,
                    "beds": [
                        {
                            "_id": "604632db048ed100315d1392",
                            "type": "KING_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "604632db048ed100315d138f",
                    "roomNumber": 6,
                    "beds": [
                        {
                            "_id": "604632db048ed100315d1390",
                            "type": "KING_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "604632db048ed100315d138d",
                    "roomNumber": 7,
                    "beds": [
                        {
                            "_id": "604632db048ed100315d138e",
                            "type": "KING_BED",
                            "quantity": 1
                        }
                    ]
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2021-03-08T13:56:32.348Z",
            "occupancyStats": [],
            "__v": 62,
            "publicDescription": {
                "summary": "Welcome to the kosher villa in Israel.\nSet in the most beautiful part of Israel's Mediterranean coastline, against a backdrop of the ancient cultures, this is a modern community with spacious homes, verdant gardens, magnificent beaches, and the ever-present whisper of the waves. Living in Caesarea means that your children receive the finest education, and the whole family enjoys thriving, premium- quality cultural and community activities.\n\nWhile Caesarea is close to the national highways and Israel's business centers, they are far enough away not to intrude. It is the only locality in Israel managed by a private company - the Caesarea Edmond Benjamin de Rothschild Foundation.\n\nThe company provides residents with impeccably high levels of services. Spoiled for choice, residents have no need to seek cultural events far from home. Everything is in easy reach - concerts, music festivals, a taverna specializing in boutique wines, variety of restaurants and of course the framed Roman amphitheatre that attracts Israel's top entertainers year-round. And Caesarea's ancients port is the venue for the annual Caesarea Jazz Festival, three evenings of outstanding jazz performed by top international artists.",
                "space": "Basement floor:\n- Wine cellar\n- Sauna with bathroom\n- 2 Bedrooms with 2 ensuite bathrooms\n- Living room\n\nNezzanine floor:\n- 2 Bedrooms with bathroom\n\nFirst floor:\n- Master bedroom with ensuite bathroom\n- 3 Bedrooms with 2 bathrooms\n\nEntrance floor:\n- Salon\n- Kitchen\n- Dining room\n- Television/working place\n- Swimming pool\n- Garden",
                "neighborhood": "Caesarea is a beautiful place with a national park where amazing ancient harbor ruins and beautiful beaches. Caesarea is originally an ancient Herodian port city located on Israel’s Mediterranean Coast about halfway between Tel Aviv and Haifa. The site has recently been restored to create one of Israel’s most attractive and fascinating archaeological sites. The new town of Caesarea is a luxurious neighborhood of villas, whose beach, the Caesarea Aqueduct Beach is one of the best beaches in Israel."
            },
            "isListed": false,
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "604a1008be35270031668a92",
                        "formula": 1500,
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED"
                    },
                    "lastUpdated": "2021-03-11T12:41:44.578Z"
                }
            },
            "lastActivityAt": "2021-03-14T17:15:34.691Z",
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:53:24.683Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5e8299456ab2930066d1f284",
            "SaaS": {
                "autoRenew": true
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f196ee86706b7002c990adf",
                        "formula": 0,
                        "valueType": "FIXED",
                        "multiplier": "PER_STAY"
                    }
                }
            },
            "address": {
                "full": "Gan ha-Shikmim Street 315, Had Nes, 1295000, Israel",
                "city": "Had Nes",
                "country": "Israel",
                "zipcode": "1295000",
                "street": "Gan ha-Shikmim Street 315",
                "lat": 32.936787,
                "lng": 35.636974,
                "searchable": "Gan ha-Shikmim Street 315, Had Nes, 1295000, Israel",
                "county": "Israel"
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 2
            },
            "picture": {
                "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/nDP9T62OQUdYGuQt4VhD"
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125,
                "cancellation": "strict_14_with_grace_period"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 6875,
                "basePriceUSD": 719,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 28,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": false,
                    "allowsInfants": false,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "space": "The Villa is a modern country estate designed in a rural, upscale style which is a masterpiece in architecture and interior design.\n\nThe complex is located in the Golan Heights in front of a breathtaking natural view of the Sea of Galilee. The estate has 3 upscale bedrooms and 3 luxurious suites facing the Sea of Galilee and are located in an exceptionally tall building.\nThe mansion complex covers an area of 1,300 square meters where you will find 2 swimming pools, a hot tub, huge lawns, sitting areas, game tables, views of the caravan and plenty of space to lie under the sun and disconnect from everything.\n\nThe estate has a culinary experience with professional chefs and food workshops for the whole family.\n\nThe Villa is regularly included in lists and articles about recommended holiday villas and boutique hotels in Israel, where you will find the vacation you have always dreamed of.\n\nHow many rooms in the villa?\n3 luxurious spacious bedrooms plus 3 luxurious suites that include a toilet and shower facing the Sea of Galilee located in an impressive high rise building.\n\nNumber of showers and toilets in the villa:\n4 fully equipped bathrooms and 5 toilets.\n\nWhat does the kitchen and dining area offer?\nLarge refrigerator, microwave, baking oven, electric kettle, gas hob, dishwasher, water bar, espresso machine, serving and cutlery, glasses, baking and cooking utensils.\nThere is a dining area for about 10 diners.",
                "neighborhood": "Nearby attractions:\nGourmet restaurants, nature walks, Sea of Galilee attractions, jeep tours, horse riding.",
                "summary": "This Villa has high standards of prestige and service, yet with the intimacy and charm of a private estate, as if taken straight from the provinces of Provence! If that's what you wish for - this Villa is the ideal vacation for you.",
                "houseRules": "• Not suitable for children and infants\r\n• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\n \n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-12-21T18:47:20.370Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-12-21T18:47:20.369Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-12-21T18:47:20.369Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-12-21T18:47:20.373Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel"
            ],
            "owners": [],
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Hot tub",
                "Indoor fireplace",
                "Heating",
                "Washer",
                "Dryer",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Private living room",
                "Hot water",
                "Bed linens",
                "Microwave",
                "Refrigerator",
                "Dishwasher",
                "Oven",
                "BBQ grill",
                "Patio or balcony",
                "Garden or backyard",
                "Bread maker",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Cleaning Disinfection",
                "Cleaning before checkout",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [
                "Bathtub",
                "Crib",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Iron",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Disabled parking spot",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "First aid kit",
                "Flat smooth pathway to front door",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pets allowed",
                "Pocket wifi",
                "Private entrance",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "createdAt": "2020-03-31T01:13:41.653Z",
            "lastUpdatedAt": "2022-12-21T18:47:20.481Z",
            "integrations": [],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "5e8299456ab2930066d1f2a5",
                    "id": 91218500,
                    "roomNumber": 3,
                    "beds": [
                        {
                            "_id": "5e8299456ab2930066d1f2a6",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5e8299456ab2930066d1f2a7",
                    "id": 91218501,
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "5e8299456ab2930066d1f2a8",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5e8299456ab2930066d1f2a9",
                    "id": 91218502,
                    "roomNumber": 5,
                    "beds": [
                        {
                            "_id": "5e8299456ab2930066d1f2aa",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5e8299456ab2930066d1f2ab",
                    "id": 91218503,
                    "roomNumber": 6,
                    "beds": [
                        {
                            "_id": "5e8299456ab2930066d1f2ac",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5e8299456ab2930066d1f2ad",
                    "id": 91218504,
                    "roomNumber": 2,
                    "beds": [
                        {
                            "_id": "5e8299456ab2930066d1f2ae",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5e8299456ab2930066d1f2af",
                    "id": 91218505,
                    "roomNumber": 4,
                    "beds": [
                        {
                            "_id": "5e8299456ab2930066d1f2b0",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        }
                    ]
                },
                {
                    "_id": "5e8299456ab2930066d1f2b1",
                    "id": 91220104,
                    "roomNumber": 0,
                    "beds": []
                }
            ],
            "pictures": [
                {
                    "_id": "5f1990da6bacc4002b140f6b",
                    "original": "https://cdn.filepicker.io/api/file/nDP9T62OQUdYGuQt4VhD",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/nDP9T62OQUdYGuQt4VhD"
                },
                {
                    "_id": "5f198ab969fb99002cb8e16a",
                    "original": "https://cdn.filepicker.io/api/file/1nL5gX32QtHhOk0LRMiF",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/1nL5gX32QtHhOk0LRMiF"
                },
                {
                    "_id": "5f198ab969fb99002cb8e16b",
                    "original": "https://cdn.filepicker.io/api/file/tYTsBhs1TNmcKHLO6gVh",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/tYTsBhs1TNmcKHLO6gVh"
                },
                {
                    "_id": "5f198ab969fb99002cb8e162",
                    "original": "https://cdn.filepicker.io/api/file/HW2YaGPSOjjJgEHV6TSw",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/HW2YaGPSOjjJgEHV6TSw"
                },
                {
                    "_id": "5f198ab969fb99002cb8e16c",
                    "original": "https://cdn.filepicker.io/api/file/4s9UQW3kT2O2VNppAtg7",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/4s9UQW3kT2O2VNppAtg7"
                },
                {
                    "_id": "5f198ab969fb99002cb8e168",
                    "original": "https://cdn.filepicker.io/api/file/wF4YC5AjTvGt6J1RAITZ",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/wF4YC5AjTvGt6J1RAITZ"
                },
                {
                    "_id": "5f198ab969fb99002cb8e167",
                    "original": "https://cdn.filepicker.io/api/file/nJeHn6ryQoC1J7q6LLup",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/nJeHn6ryQoC1J7q6LLup"
                },
                {
                    "_id": "5f198ab969fb99002cb8e166",
                    "original": "https://cdn.filepicker.io/api/file/bQ1TS6IRiiL3IIapx4Ew",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/bQ1TS6IRiiL3IIapx4Ew"
                },
                {
                    "_id": "5f198ab969fb99002cb8e165",
                    "original": "https://cdn.filepicker.io/api/file/MceuEeCSMgXRohccVdyw",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/MceuEeCSMgXRohccVdyw"
                },
                {
                    "_id": "5f198ab969fb99002cb8e164",
                    "original": "https://cdn.filepicker.io/api/file/VFnSp5SESLCmplhMzbBI",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/VFnSp5SESLCmplhMzbBI"
                },
                {
                    "_id": "5f198ab969fb99002cb8e163",
                    "original": "https://cdn.filepicker.io/api/file/bzOGMc0DRQO4lTsmHFDh",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/bzOGMc0DRQO4lTsmHFDh"
                },
                {
                    "_id": "5f198ab969fb99002cb8e161",
                    "original": "https://cdn.filepicker.io/api/file/GbiKeSaNQyvDrab139Le",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/GbiKeSaNQyvDrab139Le"
                },
                {
                    "_id": "5f198ab969fb99002cb8e160",
                    "original": "https://cdn.filepicker.io/api/file/qbj4sp8Rm25EG8mhNinQ",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/qbj4sp8Rm25EG8mhNinQ"
                },
                {
                    "_id": "5f198ab969fb99002cb8e15f",
                    "original": "https://cdn.filepicker.io/api/file/1x3ceiQeSBSZXnGsBoII",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/1x3ceiQeSBSZXnGsBoII"
                },
                {
                    "_id": "5f198ab969fb99002cb8e15e",
                    "original": "https://cdn.filepicker.io/api/file/zxPrME9Qpm3J3WDFZ7Y6",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/zxPrME9Qpm3J3WDFZ7Y6"
                },
                {
                    "_id": "5f198ab969fb99002cb8e15d",
                    "original": "https://cdn.filepicker.io/api/file/pEkcok5SXWAczq7P5Bxi",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/pEkcok5SXWAczq7P5Bxi"
                },
                {
                    "_id": "5f198ab969fb99002cb8e15c",
                    "original": "https://cdn.filepicker.io/api/file/43tqqB0uQ0mJ8T0WFsqs",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/43tqqB0uQ0mJ8T0WFsqs"
                },
                {
                    "_id": "5f198ab969fb99002cb8e15b",
                    "original": "https://cdn.filepicker.io/api/file/sJJrcyBRNOjJoq6Ckulg",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/sJJrcyBRNOjJoq6Ckulg"
                },
                {
                    "_id": "5f198ab969fb99002cb8e15a",
                    "original": "https://cdn.filepicker.io/api/file/zJZ3ITvySsucndvOEldi",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/zJZ3ITvySsucndvOEldi"
                },
                {
                    "_id": "5f198ab969fb99002cb8e159",
                    "original": "https://cdn.filepicker.io/api/file/WFCa8VmFRVSYNAnmnx5R",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/WFCa8VmFRVSYNAnmnx5R"
                },
                {
                    "_id": "5f198ab969fb99002cb8e156",
                    "original": "https://cdn.filepicker.io/api/file/xTThJGd8RbyHI83D7zqh",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/xTThJGd8RbyHI83D7zqh"
                },
                {
                    "_id": "5f198ab969fb99002cb8e155",
                    "original": "https://cdn.filepicker.io/api/file/r6963r3dTTGmXqns2DSz",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/r6963r3dTTGmXqns2DSz"
                },
                {
                    "_id": "5f198ab969fb99002cb8e154",
                    "original": "https://cdn.filepicker.io/api/file/gLCXCmaS8mC5CIdSxcgF",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/gLCXCmaS8mC5CIdSxcgF"
                },
                {
                    "_id": "5f198ab969fb99002cb8e158",
                    "original": "https://cdn.filepicker.io/api/file/9p6QePnwTRGVdzVeYxXK",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/9p6QePnwTRGVdzVeYxXK"
                },
                {
                    "_id": "5f198ab969fb99002cb8e157",
                    "original": "https://cdn.filepicker.io/api/file/k9prY2jT3u95OpAzURCY",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/k9prY2jT3u95OpAzURCY"
                },
                {
                    "_id": "5f198ab969fb99002cb8e153",
                    "original": "https://cdn.filepicker.io/api/file/cks9NqUASLOU0ZoqeLbO",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/cks9NqUASLOU0ZoqeLbO"
                },
                {
                    "_id": "5f198ab969fb99002cb8e14e",
                    "original": "https://cdn.filepicker.io/api/file/MuLdTAdDRXewMdt9oELy",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/MuLdTAdDRXewMdt9oELy"
                },
                {
                    "_id": "5f198ab969fb99002cb8e152",
                    "original": "https://cdn.filepicker.io/api/file/RIkZmJ71QaKlwka62Ydn",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/RIkZmJ71QaKlwka62Ydn"
                },
                {
                    "_id": "5f198ab969fb99002cb8e151",
                    "original": "https://cdn.filepicker.io/api/file/dJ52MgaeSaK4RX4db7bA",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/dJ52MgaeSaK4RX4db7bA"
                },
                {
                    "_id": "5f198ab969fb99002cb8e150",
                    "original": "https://cdn.filepicker.io/api/file/hBrbFWVJTD60eGqImSo9",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/hBrbFWVJTD60eGqImSo9"
                },
                {
                    "_id": "5f198ab969fb99002cb8e14f",
                    "original": "https://cdn.filepicker.io/api/file/s4b15zAzQCqWkVw3k7yI",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/s4b15zAzQCqWkVw3k7yI"
                },
                {
                    "_id": "5f198ab969fb99002cb8e169",
                    "original": "https://cdn.filepicker.io/api/file/5EuhoJcmSE2isKSPNQvl",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/5EuhoJcmSE2isKSPNQvl"
                },
                {
                    "_id": "5f198ab969fb99002cb8e14d",
                    "original": "https://cdn.filepicker.io/api/file/Y71XxXQvRhaK9yd9bzQC",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/Y71XxXQvRhaK9yd9bzQC"
                },
                {
                    "_id": "5f198ab969fb99002cb8e14c",
                    "original": "https://cdn.filepicker.io/api/file/92wlMfAARLqoxvf5yA7S",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/92wlMfAARLqoxvf5yA7S"
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-03-31T01:13:41.654Z",
            "occupancyStats": [],
            "accountId": "585a39dbe43900100017e9e8",
            "importingPlatform": "airbnb",
            "nickname": "KIN009 Ben EmekHahu",
            "isListed": true,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5e8299456ab2930066d1f289"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "11:00",
            "title": "Amazing 6BR Villa in the Golan",
            "timezone": "Asia/Jerusalem",
            "bedrooms": 6,
            "beds": 18,
            "propertyType": "Villa",
            "roomType": "Entire home/apt",
            "bedType": "Real Bed",
            "accommodates": 28,
            "bathrooms": 4,
            "lastSyncedAt": "2020-06-15T09:26:28.328Z",
            "__v": 57,
            "lastActivityAt": "2021-03-17T15:58:03.603Z",
            "defaultCheckInEndTime": null,
            "otaRoomType": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2022-02-17T11:12:16.980Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "6061ab7e19c97500306bad56",
            "SaaS": {
                "autoRenew": true
            },
            "picture": {
                "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011372/production/585a39dbe43900100017e9e8/ekjsaactows5viumvspj.jpg"
            },
            "terms": {
                "minNights": 3,
                "maxNights": 45
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "currency": "USD",
                "basePrice": 440,
                "guestsIncludedInRegularFee": 6,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CONFIRMATION"
                            },
                            "_id": "6061abc2c65514002f6b393b",
                            "chargeType": "PERCENTAGE",
                            "amount": 100,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    }
                },
                "rentalPeriods": []
            },
            "type": "SINGLE",
            "tags": [
                "Israel",
                "PM-Unknown",
                "PMC-Unknown",
                "Pool",
                "Free-parking"
            ],
            "owners": [],
            "amenities": [
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Shampoo",
                "Essentials",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Wireless Internet",
                "Hot water",
                "Internet",
                "Bed linens",
                "Cleaning before checkout",
                "Cleaning Disinfection",
                "TV",
                "Microwave",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Sea view",
                "Hair dryer",
                "Dishwasher",
                "Ocean Front",
                "Elevator",
                "Air conditioning",
                "Dryer",
                "Crib",
                "Oven",
                "Iron",
                "Refrigerator",
                "Free parking on premises",
                "Cable TV",
                "Beach",
                "Washer",
                "Toaster",
                "Water View",
                "Bathtub",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "accommodates": 6,
            "bedrooms": 3,
            "beds": 4,
            "bathrooms": 2,
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "10:00",
            "propertyType": "Apartment",
            "roomType": "Entire home/apt",
            "address": {
                "full": "Herbert Samuel St 32, Hadera, Israel",
                "lng": 34.915267,
                "lat": 32.437564,
                "county": "Israel",
                "neighborhood": "Herbert Samuel 32",
                "street": "Herbert Samuel Street 32",
                "city": "Hadera",
                "country": "Israel",
                "state": "Haifa District"
            },
            "pictures": [
                {
                    "_id": "6061ab7e19c97500306bad6e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011372/production/585a39dbe43900100017e9e8/ekjsaactows5viumvspj.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011372/production/585a39dbe43900100017e9e8/ekjsaactows5viumvspj.jpg",
                    "id": "48927871_1154123351"
                },
                {
                    "_id": "6061ab7e19c97500306bad6d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011374/production/585a39dbe43900100017e9e8/lx7gkl2twoxzj0erlywl.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011374/production/585a39dbe43900100017e9e8/lx7gkl2twoxzj0erlywl.jpg",
                    "id": "48927871_1154123358"
                },
                {
                    "_id": "6061ab7e19c97500306bad6c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011381/production/585a39dbe43900100017e9e8/yjdrvtvii2az8x5zdju7.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011381/production/585a39dbe43900100017e9e8/yjdrvtvii2az8x5zdju7.jpg",
                    "id": "48927871_1154123370"
                },
                {
                    "_id": "6061ab7e19c97500306bad6b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011373/production/585a39dbe43900100017e9e8/bursgxhsd0tocs4xztax.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011373/production/585a39dbe43900100017e9e8/bursgxhsd0tocs4xztax.jpg",
                    "id": "48927871_1154123377"
                },
                {
                    "_id": "6061ab7e19c97500306bad6a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011371/production/585a39dbe43900100017e9e8/icywi9zlpo1ywqk9l2zm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011371/production/585a39dbe43900100017e9e8/icywi9zlpo1ywqk9l2zm.jpg",
                    "id": "48927871_1154123381"
                },
                {
                    "_id": "6061ab7e19c97500306bad69",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011363/production/585a39dbe43900100017e9e8/z1m56nkuusldkmw54raq.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011363/production/585a39dbe43900100017e9e8/z1m56nkuusldkmw54raq.jpg",
                    "id": "48927871_1154123389"
                },
                {
                    "_id": "6061ab7e19c97500306bad68",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011366/production/585a39dbe43900100017e9e8/fp2q02fv1joab719gpfm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011366/production/585a39dbe43900100017e9e8/fp2q02fv1joab719gpfm.jpg",
                    "id": "48927871_1154123395"
                },
                {
                    "_id": "6061ab7e19c97500306bad67",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011363/production/585a39dbe43900100017e9e8/bph9ieuuack0mbrdgw7t.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011363/production/585a39dbe43900100017e9e8/bph9ieuuack0mbrdgw7t.jpg",
                    "id": "48927871_1154123407"
                },
                {
                    "_id": "6061ab7e19c97500306bad66",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011363/production/585a39dbe43900100017e9e8/w1jtau1ixzr786vl6vqe.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011363/production/585a39dbe43900100017e9e8/w1jtau1ixzr786vl6vqe.jpg",
                    "id": "48927871_1154123413"
                },
                {
                    "_id": "6061ab7e19c97500306bad65",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011364/production/585a39dbe43900100017e9e8/xrmimutbpi0pkuxji9e7.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011364/production/585a39dbe43900100017e9e8/xrmimutbpi0pkuxji9e7.jpg",
                    "id": "48927871_1154123422"
                },
                {
                    "_id": "6061ab7e19c97500306bad64",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011367/production/585a39dbe43900100017e9e8/hli0buub5eeywg7r2k2l.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011367/production/585a39dbe43900100017e9e8/hli0buub5eeywg7r2k2l.jpg",
                    "id": "48927871_1154123437"
                },
                {
                    "_id": "6061ab7e19c97500306bad63",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011369/production/585a39dbe43900100017e9e8/z9laxhme3q1hononb3gi.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011369/production/585a39dbe43900100017e9e8/z9laxhme3q1hononb3gi.jpg",
                    "id": "48927871_1154123448"
                },
                {
                    "_id": "6061ab7e19c97500306bad62",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011363/production/585a39dbe43900100017e9e8/wslw2bnja8qnn2dhoxxo.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011363/production/585a39dbe43900100017e9e8/wslw2bnja8qnn2dhoxxo.jpg",
                    "id": "48927871_1154123453"
                },
                {
                    "_id": "6061ab7e19c97500306bad61",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011375/production/585a39dbe43900100017e9e8/ywq5gzip2vngt1xtcgry.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011375/production/585a39dbe43900100017e9e8/ywq5gzip2vngt1xtcgry.jpg",
                    "id": "48927871_1154123462"
                },
                {
                    "_id": "6061ab7e19c97500306bad60",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011376/production/585a39dbe43900100017e9e8/amkk5osdhbf620x8kgfb.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011376/production/585a39dbe43900100017e9e8/amkk5osdhbf620x8kgfb.jpg",
                    "id": "48927871_1154123483"
                },
                {
                    "_id": "6061ab7e19c97500306bad5f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011378/production/585a39dbe43900100017e9e8/v28und7d5o18vmtrhhog.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011378/production/585a39dbe43900100017e9e8/v28und7d5o18vmtrhhog.jpg",
                    "id": "48927871_1154123494"
                },
                {
                    "_id": "6061ab7e19c97500306bad5e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011380/production/585a39dbe43900100017e9e8/vznnmj1fwew2xmrzxmqn.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011380/production/585a39dbe43900100017e9e8/vznnmj1fwew2xmrzxmqn.jpg",
                    "id": "48927871_1154123502"
                },
                {
                    "_id": "6061ab7e19c97500306bad5d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011382/production/585a39dbe43900100017e9e8/vawzcrcfdqfht6xusolb.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011382/production/585a39dbe43900100017e9e8/vawzcrcfdqfht6xusolb.jpg",
                    "id": "48927871_1154123513"
                },
                {
                    "_id": "6061ab7e19c97500306bad5c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011381/production/585a39dbe43900100017e9e8/qw9jqibsu8qsrb2fykzw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011381/production/585a39dbe43900100017e9e8/qw9jqibsu8qsrb2fykzw.jpg",
                    "id": "48927871_1154123528"
                },
                {
                    "_id": "6061ab7e19c97500306bad5b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011383/production/585a39dbe43900100017e9e8/wmdkwylbjliqwj7p4ccm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011383/production/585a39dbe43900100017e9e8/wmdkwylbjliqwj7p4ccm.jpg",
                    "id": "48927871_1154123537"
                },
                {
                    "_id": "6061ab7e19c97500306bad5a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011383/production/585a39dbe43900100017e9e8/xs4pupf1rq95q2xafzqm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011383/production/585a39dbe43900100017e9e8/xs4pupf1rq95q2xafzqm.jpg",
                    "id": "48927871_1154123547"
                },
                {
                    "_id": "6061ab7e19c97500306bad59",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011380/production/585a39dbe43900100017e9e8/j05rghq0befqgpa1jxqf.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011380/production/585a39dbe43900100017e9e8/j05rghq0befqgpa1jxqf.jpg",
                    "id": "48927871_1154123553"
                },
                {
                    "_id": "6061ab7e19c97500306bad58",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011376/production/585a39dbe43900100017e9e8/rqvumhnrjylpkbygdsjl.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011376/production/585a39dbe43900100017e9e8/rqvumhnrjylpkbygdsjl.jpg",
                    "id": "48927871_1154123572"
                },
                {
                    "_id": "6061ab7e19c97500306bad57",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1617011385/production/585a39dbe43900100017e9e8/kuwex2bttydlw1quttwc.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1617011385/production/585a39dbe43900100017e9e8/kuwex2bttydlw1quttwc.jpg",
                    "id": "48927871_1154123584"
                }
            ],
            "timezone": "Europe/Zurich",
            "nickname": "TLV023 SNR Herbert",
            "title": "Amazing Beachfront Apartment With Breathtaking Views",
            "accountId": "585a39dbe43900100017e9e8",
            "createdAt": "2021-03-29T10:27:10.733Z",
            "lastUpdatedAt": "2022-09-19T09:21:20.334Z",
            "integrations": [
                {
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "initialComplexListing": false,
                        "publishCompanyLogo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "isPublishedCompanyInfo": false,
                        "taxInfo": []
                    },
                    "platform": "airbnb2",
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "status": "NOT_STARTED",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "syncCategory": "sync_all",
                        "syncCategoryUpdatedAt": "2021-03-29T10:49:55.851Z",
                        "id": "48927871",
                        "financials": {
                            "_id": "6061b1354d6c03002f2d9cb0",
                            "basePrice": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "guestsIncludedInRegularFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            }
                        },
                        "promotions": []
                    },
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/48927871"
                }
            ],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "6061b0d27fd3870031fd0407",
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "6061b0d27fd3870031fd0408",
                            "type": "QUEEN_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "6061b0d27fd3870031fd0405",
                    "roomNumber": 2,
                    "beds": [
                        {
                            "_id": "6061b0d27fd3870031fd0406",
                            "type": "QUEEN_BED",
                            "quantity": 1
                        }
                    ]
                },
                {
                    "_id": "6061b0d27fd3870031fd0403",
                    "roomNumber": 3,
                    "beds": [
                        {
                            "_id": "6061b0d27fd3870031fd0404",
                            "type": "SINGLE_BED",
                            "quantity": 2
                        }
                    ]
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2021-03-29T10:27:10.733Z",
            "occupancyStats": [],
            "__v": 27,
            "publicDescription": {
                "summary": "If a picture is worth a 1,000 words a view is worth a million and this apartment gives you a view worth writing home about. Overlooking the beachfront with a sea view, you'll know you made the right choice when you look out from this vacation rental in Tel Aviv. You just need to cross the street and your feet are in the sand !\n\nThe apartment comes with parking space making it great if you're planning on driving around the area on your trip to Tel Aviv. This is the ultimate space for a family or group that wants to take in the highlights of Tel Aviv while also enjoying the benefits of a brand new well-equipped apartment.",
                "space": "This holiday apartment is beautifully decorated and fully equipped to the last detail. It offers you all you that need for a comfortable and pleasant stay, including 2 bathrooms, full AC and a private parking!\n\nIt has a bright living room with big windows facing the Promenade and the sea, comfortable sofas and a large comfortable dining area for 6 people. Two bedrooms have queen size beds, and the third bedroom has 2 twin beds. All beds come complete with high-quality orthopedic mattresses.\n\nThis beachfront apartment comes with an LCD TV with 160 channels in almost every room, WIFI, and an air conditioning in every room."
            },
            "isListed": false,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:54:40.448Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5b1e980a169ef90093e88baf",
            "lastSyncedAt": "2020-06-15T09:30:55.578Z",
            "bathrooms": 2.5,
            "accommodates": 8,
            "bedType": "Real Bed",
            "roomType": "Entire home/apt",
            "propertyType": "Villa",
            "beds": 6,
            "bedrooms": 4,
            "timezone": "Asia/Jerusalem",
            "title": "Amazing Designed Villa near nature woods and beach",
            "defaultCheckOutTime": "11:00",
            "defaultCheckInTime": "15:00",
            "isListed": true,
            "nickname": "CAE007 Alon Kerem Maharal",
            "importingPlatform": "airbnb",
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [
                {
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd565f"
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5660"
                },
                {
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5661"
                },
                {
                    "month": "2018-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5662"
                },
                {
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5663"
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5664"
                },
                {
                    "month": "2018-06",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5665"
                },
                {
                    "month": "2018-07",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5666"
                },
                {
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5667"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5668"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5669"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd566a"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd566b"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd566c"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd566d"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd566e"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd566f"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5670"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5671"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5672"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5673"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5674"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5675"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5676"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f8e5a194d8001cbd5677"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b34520b0206001d17a953"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c541306ec9de5002381b3bc"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fc587665250022a45832"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1db1a8e7d2400221dd50f"
                }
            ],
            "preBooking": [],
            "importedAt": "2018-06-11T15:40:58.059Z",
            "offeredServices": [],
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:36:42.861Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:36:42.859Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:36:42.859Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:36:42.866Z"
            },
            "customFields": [],
            "active": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "useAccountTaxes": true,
            "taxes": [],
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": true,
                    "allowsInfants": true,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "summary": "Amazing vacation house in natural gate-away resort of Israel . 5 min from the most beautiful beaches of Habonim & Dor (Tantura) Top designed and fully equipped. We are welcoming you to meet our neighbor the nature!",
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "space": "Our Villa the best place to go for hikes hors ridings and visit the close by winery siting on the wooden porch on the rocking chair watching the field in front is real retreat."
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Cable TV",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "amenities": [
                "TV",
                "Wireless Internet",
                "Air conditioning",
                "Free parking on premises",
                "Heating",
                "Washer",
                "Dryer",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "pictures": [
                {
                    "_id": "5d09e2e170d4f6003caa0b38",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637637.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637637.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_515637637.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_515637637.jpg",
                    "id": "25923403_1563152494",
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5d09e2e170d4f6003caa0b37",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637536.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637536.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_515637536.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_515637536.jpg",
                    "id": "25923403_1563152526",
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5d09e2e170d4f6003caa0b36",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637546.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637546.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_515637546.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_515637546.jpg",
                    "id": "25923403_1563152559",
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5d09e2e170d4f6003caa0b35",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637555.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637555.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_515637555.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_515637555.jpg",
                    "id": "25923403_1563152594",
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5d09e2e170d4f6003caa0b34",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637569.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637569.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_515637569.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_515637569.jpg",
                    "id": "25923403_1563152626",
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5d09e2e170d4f6003caa0b33",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637609.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637609.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_515637609.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_515637609.jpg",
                    "id": "25923403_1563152657",
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5d09e2e170d4f6003caa0b32",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637621.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637621.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_515637621.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_515637621.jpg",
                    "id": "25923403_1563152714",
                    "sort": 7,
                    "caption": ""
                }
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_515637637.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_515637637.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_515637637.jpg",
                "caption": ""
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 24
            },
            "address": {
                "full": "HaShmura Street, Kerem Maharal, Haifa District, Israel",
                "city": "Kerem Maharal",
                "state": "Haifa District",
                "country": "Israel",
                "street": "HaShmura Street",
                "lat": 32.645153,
                "lng": 34.984516,
                "searchable": "HaShmura Street, Kerem Maharal, Haifa District, Israel"
            },
            "listingRooms": [
                {
                    "id": 21283257,
                    "roomNumber": 3,
                    "_id": "5b1e980a169ef90093e88bb1",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b1e980a169ef90093e88bb2"
                        }
                    ]
                },
                {
                    "id": 21283258,
                    "roomNumber": 4,
                    "_id": "5b1e980a169ef90093e88bb3",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b1e980a169ef90093e88bb4"
                        }
                    ]
                },
                {
                    "id": 21283259,
                    "roomNumber": 0,
                    "_id": "5b1e980a169ef90093e88bb5",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b1e980a169ef90093e88bb6"
                        }
                    ]
                },
                {
                    "id": 21283260,
                    "roomNumber": 2,
                    "_id": "5b1e980a169ef90093e88bb7",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b1e980a169ef90093e88bb8"
                        }
                    ]
                },
                {
                    "id": 21283261,
                    "roomNumber": 1,
                    "_id": "5b1e980a169ef90093e88bb9",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b1e980a169ef90093e88bba"
                        }
                    ]
                }
            ],
            "owners": [],
            "tags": [
                "Israel"
            ],
            "pendingTasks": [
                {
                    "_id": "5f43b934f3659e002c2e3892",
                    "mqId": "befd7849-f325-4d48-946c-4ddaac66281d",
                    "platform": "rentalsUnited",
                    "description": "Update listing",
                    "createdAt": "2020-08-24T12:57:24.720Z",
                    "error": "Smaller in LongStay element cannot be greater than 180."
                }
            ],
            "integrations": [
                {
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/25923403",
                    "bookingCom": {
                        "errors": [],
                        "acceptedCreditCards": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "airbnb2": {
                        "daysOfWeekCheckIn": [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6
                        ],
                        "daysOfWeekMinimumNights": [],
                        "id": "25923403",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": false
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "5f15746f8a374d002953a19d",
                            "basePrice": {
                                "channelSyncStatus": "IN_PROGRESS"
                            }
                        },
                        "promotions": []
                    }
                }
            ],
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f43b933f3659e002c2e3881",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 350
                    }
                }
            },
            "SaaS": {
                "autoRenew": true
            },
            "lastUpdatedAt": "2023-01-11T05:36:43.093Z",
            "createdAt": "2018-06-11T15:40:58.058Z",
            "__v": 378,
            "lastActivityAt": "2021-02-07T20:17:18.303Z",
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c51152129400485ce000"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 5000,
                "basePriceUSD": 432,
                "cleaningFee": 350,
                "currency": "ILS",
                "extraPersonFee": 250,
                "guestsIncludedInRegularFee": 6,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "terms": {
                "minNights": 30,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:54:46.337Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5fe1d3ee87adc3002f71f263",
            "SaaS": {
                "autoRenew": true
            },
            "picture": {
                "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1608635365/production/585a39dbe43900100017e9e8/asrjkonams88gsdgbpd6.jpg"
            },
            "terms": {
                "minNights": 3,
                "maxNights": 45
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "currency": "ILS",
                "basePrice": 9000
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": []
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    }
                },
                "rentalPeriods": []
            },
            "type": "SINGLE",
            "tags": [
                "Israel",
                "PM-Lior Levit / Sivan",
                "PMC-| +972 50-734-3484 |",
                "Pool",
                "Free-parking"
            ],
            "owners": [],
            "amenities": [
                "Air conditioning",
                "BBQ grill",
                "Cable TV",
                "Dishwasher",
                "Dryer",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Bathtub",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 15,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "accommodates": 10,
            "bedrooms": 5,
            "beds": 10,
            "bathrooms": 4,
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "10:00",
            "propertyType": "Villa",
            "roomType": "Entire home/apt",
            "address": {
                "full": "Giv'at HaBazelet St, Kinneret, Israel",
                "lng": 35.564202,
                "lat": 32.721754,
                "street": "Giv'at HaBazelet Street",
                "city": "Kinneret",
                "country": "Israel",
                "state": "North District"
            },
            "pictures": [
                {
                    "_id": "5fe1d3ee87adc3002f71f264",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1608635365/production/585a39dbe43900100017e9e8/asrjkonams88gsdgbpd6.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1608635365/production/585a39dbe43900100017e9e8/asrjkonams88gsdgbpd6.jpg"
                }
            ],
            "timezone": "Europe/Zurich",
            "nickname": "KIN004 Didi Classic",
            "title": "Amazing Luxury House right on the Sea of Galilee",
            "accountId": "585a39dbe43900100017e9e8",
            "createdAt": "2020-12-22T11:09:34.434Z",
            "lastUpdatedAt": "2022-09-19T09:13:58.999Z",
            "integrations": [],
            "pendingTasks": [],
            "listingRooms": [],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-12-22T11:09:34.435Z",
            "occupancyStats": [],
            "__v": 13,
            "isListed": false,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:00.896Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "587f5b208659480400827411",
            "title": "Amazing Luxury House right on the Sea of Galilee",
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "SaaS": {
                "autoRenew": true
            },
            "bedType": "Real Bed",
            "roomType": "Entire home/apt",
            "propertyType": "House",
            "preBooking": [],
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "integrations": [
                {
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/16834367",
                    "bookingCom": {
                        "errors": [],
                        "acceptedCreditCards": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "airbnb2": {
                        "id": "16834367",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 0,
                            "allowRequestToBook": true
                        },
                        "daysOfWeekCheckIn": [
                            4,
                            2,
                            0,
                            5,
                            3,
                            1,
                            6
                        ],
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {},
                        "daysOfWeekMinimumNights": [],
                        "promotions": []
                    }
                }
            ],
            "commission": {
                "minimum": 3,
                "percentage": 3
            },
            "__v": 904,
            "accommodates": 12,
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "cleaningStatus": {
                "value": "unknown",
                "updatedAt": "2022-03-01T07:51:38.527Z"
            },
            "beds": 6,
            "occupancyStats": [
                {
                    "_id": "588087fa6213a004007f930d",
                    "month": "2016-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "588087fa6213a004007f930e",
                    "month": "2016-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "588087fa6213a004007f930f",
                    "month": "2016-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9310",
                    "month": "2016-04",
                    "available": 30
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9311",
                    "month": "2016-05",
                    "available": 31,
                    "unavailable": 0
                },
                {
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9312",
                    "month": "2016-06"
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9313",
                    "month": "2016-07",
                    "available": 31
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9314",
                    "month": "2016-08",
                    "available": 31,
                    "unavailable": 0
                },
                {
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9315",
                    "month": "2016-09"
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9316",
                    "month": "2016-10",
                    "available": 31
                },
                {
                    "rate": 0,
                    "_id": "588087fa6213a004007f9317",
                    "month": "2016-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2016-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9318"
                },
                {
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9319",
                    "month": "2017-01"
                },
                {
                    "_id": "588087fa6213a004007f931a",
                    "month": "2017-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "unavailable": 2,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f931b",
                    "month": "2017-03",
                    "available": 29
                },
                {
                    "rate": 0,
                    "_id": "588087fa6213a004007f931c",
                    "month": "2017-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2017-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f931d"
                },
                {
                    "month": "2017-06",
                    "available": 28,
                    "unavailable": 2,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f931e"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f931f",
                    "month": "2017-07",
                    "available": 31,
                    "unavailable": 0
                },
                {
                    "month": "2017-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9320"
                },
                {
                    "rate": 0,
                    "_id": "588087fa6213a004007f9321",
                    "month": "2017-09",
                    "available": 22,
                    "unavailable": 8,
                    "booked": 0
                },
                {
                    "month": "2017-10",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9322"
                },
                {
                    "month": "2017-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9323"
                },
                {
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9324"
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "588087fa6213a004007f9325"
                },
                {
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5891ab3ae7cf0c0400cc425a"
                },
                {
                    "rate": 0,
                    "_id": "58b6952fa8c96a04003b4c46",
                    "month": "2018-03",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0
                },
                {
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58df740ac938f504006dd3e3"
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "590700e32430e10400db4686"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "592fdfc0ba936c04005cea3f",
                    "month": "2018-06",
                    "available": 29,
                    "unavailable": 1
                },
                {
                    "month": "2018-07",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59576c25d2e6760400998bc0"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "59804be251e79f04005b9056",
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59a9297466e4270400783b6f"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59d0b676d38aac0400a75814"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59f994cab2c6dd0400a2d503"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a2121fde533eb0400957c49"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a55de52f5111f0b00f89095"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a72de6f30c693000b5e46a3"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a97c8a903a091000b675b8a"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ac0a738ff771d000b611dac"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf049771bf9000b140e7f"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf049771bf9000b140e80"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b389f747ed65e000be2a4a9"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b617eb52614d20025b5fe36"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b8a5cd246763d00254fac7a"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bb1e9eb6ac6a10025b1c481"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bdac81eb01fe10025b66796"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c0254f4f54c71001c278ffb"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b335d0b0206001d17844c"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c5411e1ec9de50023819156"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fbc77665250022a4385a"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1da658e7d2400221db699"
                }
            ],
            "importedAt": "2017-01-18T12:10:08.834Z",
            "tags": [
                "Israel"
            ],
            "defaultCheckOutTime": "11:00",
            "defaultCheckInTime": "15:00",
            "isListed": true,
            "customFields": [],
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": true,
                    "allowsEvents": false,
                    "allowsInfants": true,
                    "allowsPets": false,
                    "allowsSmoking": false
                },
                "space": "Very spacious and generous living area with fully equipped kitchen.\n\n5 Large and Luxurious En-Suite Bedrooms with plenty of closet space and a private bathroom each.\nPrivate Parking.\nEverything you will need!",
                "transit": "Ideally you need a car to enjoy the Sea of Galilee and the amazing places around it.",
                "summary": "In the lovely Moshava of Kinneret, right on the Sea of Galilee, this stunning property with 5 En-Suite Bedrooms and an amazing pool with stunning views is ready to make your stay memorable and unforgetable.\nAll rooms decorated with high-end luxury materials and all have a great view.\nThe living area is modern and will make you feel like a king and queen.",
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "access": "Private pool\nAmazing terrace with stunning views.",
                "interactionWithGuests": "We are available at all times to make sure our guests have a memorable stay !",
                "notes": ""
            },
            "amenities": [
                "TV",
                "Cable TV",
                "Internet",
                "Wireless Internet",
                "Air conditioning",
                "Wheelchair accessible",
                "Swimming pool",
                "Free parking on premises",
                "Buzzer/wireless intercom",
                "Heating",
                "Family/kid friendly",
                "Washer",
                "Dryer",
                "Smoke alarm",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "24-hour check-in",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Pool",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "createdAt": "2017-01-18T12:10:08.831Z",
            "importingPlatform": "airbnb",
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:35:54.097Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:35:54.095Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:35:54.095Z"
                },
                "weekendMinNights": 2,
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:35:54.101Z"
            },
            "active": true,
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": [],
                        "active": true
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": [
                            "{{guest_first}} was a great guest and is recommended to all hosts!\nThanks {{guest_first}}, hope to see you soon again.\nMoriya"
                        ],
                        "starRating": 5,
                        "daysBeforeSending": 5,
                        "active": true
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "pictures": [
                {
                    "_id": "5d09e25570d4f6003ca9df2a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256413682.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256413682.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256413682.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256413682.jpg",
                    "id": "16834367_1563148854",
                    "sort": 1,
                    "caption": "Your amazing house"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df29",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424503.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424503.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424503.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424503.jpg",
                    "id": "16834367_1563148871",
                    "sort": 2,
                    "caption": "Amazing living area"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df28",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256413540.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256413540.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256413540.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256413540.jpg",
                    "id": "16834367_1563148892",
                    "sort": 3,
                    "caption": "Pooll with amazing Lake views"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df27",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424660.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424660.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424660.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424660.jpg",
                    "id": "16834367_1563148914",
                    "sort": 4,
                    "caption": "Fully equipped modern kitchen"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df26",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256413642.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256413642.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256413642.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256413642.jpg",
                    "id": "16834367_1563148928",
                    "sort": 5,
                    "caption": "Sea of Gallilee"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df25",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414001.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414001.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414001.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414001.jpg",
                    "id": "16834367_1563148943",
                    "sort": 6,
                    "caption": "Relax and enjoy the sun"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df24",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414061.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414061.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414061.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414061.jpg",
                    "id": "16834367_1563148961",
                    "sort": 7,
                    "caption": "Pool and house view"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df23",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256415137.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256415137.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256415137.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256415137.jpg",
                    "id": "16834367_1563148969",
                    "sort": 8,
                    "caption": "BBQ time ? "
                },
                {
                    "_id": "5d09e25570d4f6003ca9df22",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424905.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424905.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424905.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424905.jpg",
                    "id": "16834367_1563148986",
                    "sort": 9,
                    "caption": "Kitchen bar 1"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df21",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414100.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414100.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414100.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414100.jpg",
                    "id": "16834367_1563148999",
                    "sort": 10,
                    "caption": "Almost infinity pool"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df20",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414146.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414146.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414146.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414146.jpg",
                    "id": "16834367_1563149014",
                    "sort": 11,
                    "caption": "Ready for Breakfast ?"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df1f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414124.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414124.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414124.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414124.jpg",
                    "id": "16834367_1563149031",
                    "sort": 12,
                    "caption": "What a view"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df1e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414237.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414237.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414237.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414237.jpg",
                    "id": "16834367_1563149054",
                    "sort": 13,
                    "caption": "Sun, sun and relax"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df1d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414332.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414332.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414332.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414332.jpg",
                    "id": "16834367_1563149074",
                    "sort": 14,
                    "caption": "Apero time ? "
                },
                {
                    "_id": "5d09e25570d4f6003ca9df1c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414299.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414299.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414299.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414299.jpg",
                    "id": "16834367_1563149095",
                    "sort": 15,
                    "caption": "your own private pool"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df1b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414271.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414271.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414271.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414271.jpg",
                    "id": "16834367_1563149112",
                    "sort": 16,
                    "caption": "Breakfast is served"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df1a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414369.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414369.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414369.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414369.jpg",
                    "id": "16834367_1563149141",
                    "sort": 17,
                    "caption": "What else do you need ?"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df19",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414479.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414479.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414479.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414479.jpg",
                    "id": "16834367_1563149161",
                    "sort": 18,
                    "caption": "Bedroom 1"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df18",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414433.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414433.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414433.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414433.jpg",
                    "id": "16834367_1563149194",
                    "sort": 19,
                    "caption": "What a great life"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df17",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414552.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414552.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414552.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414552.jpg",
                    "id": "16834367_1563149219",
                    "sort": 20,
                    "caption": ""
                },
                {
                    "_id": "5d09e25570d4f6003ca9df16",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414503.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414503.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414503.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414503.jpg",
                    "id": "16834367_1563149262",
                    "sort": 21,
                    "caption": "Enjoy"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df15",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414579.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414579.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414579.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414579.jpg",
                    "id": "16834367_1563149307",
                    "sort": 22,
                    "caption": ""
                },
                {
                    "_id": "5d09e25570d4f6003ca9df14",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414671.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414671.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414671.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414671.jpg",
                    "id": "16834367_1563149332",
                    "sort": 23,
                    "caption": "Bedroom 2"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df13",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414631.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414631.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414631.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414631.jpg",
                    "id": "16834367_1563149362",
                    "sort": 24,
                    "caption": ""
                },
                {
                    "_id": "5d09e25570d4f6003ca9df12",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414727.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414727.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414727.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414727.jpg",
                    "id": "16834367_1563149394",
                    "sort": 25,
                    "caption": "Bedroom 3"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df11",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414747.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414747.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414747.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414747.jpg",
                    "id": "16834367_1563149426",
                    "sort": 26,
                    "caption": "Bedroom with working space"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df10",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414768.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414768.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414768.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414768.jpg",
                    "id": "16834367_1563149454",
                    "sort": 27,
                    "caption": "Look at the view from bed"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df0f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414789.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414789.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414789.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414789.jpg",
                    "id": "16834367_1563149485",
                    "sort": 28,
                    "caption": "Bedroom 4"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df0e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414909.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414909.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414909.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414909.jpg",
                    "id": "16834367_1563149510",
                    "sort": 29,
                    "caption": "Pool view from each room"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df0d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414950.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414950.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414950.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414950.jpg",
                    "id": "16834367_1563149541",
                    "sort": 30,
                    "caption": "Make your own Expresso !"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df0c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256414975.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256414975.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256414975.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256414975.jpg",
                    "id": "16834367_1563149568",
                    "sort": 31,
                    "caption": "Enjoy a drink in bed ? "
                },
                {
                    "_id": "5d09e25570d4f6003ca9df0b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256415017.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256415017.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256415017.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256415017.jpg",
                    "id": "16834367_1563149592",
                    "sort": 32,
                    "caption": "Bedroom 5"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df0a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256415039.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256415039.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256415039.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256415039.jpg",
                    "id": "16834367_1563149620",
                    "sort": 33,
                    "caption": "pool view from bedroom"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df09",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256415061.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256415061.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256415061.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256415061.jpg",
                    "id": "16834367_1563149650",
                    "sort": 34,
                    "caption": "Bathroom 1"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df08",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256415074.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256415074.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256415074.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256415074.jpg",
                    "id": "16834367_1563149674",
                    "sort": 35,
                    "caption": "Bathroom 2"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df07",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256415107.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256415107.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256415107.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256415107.jpg",
                    "id": "16834367_1563149706",
                    "sort": 36,
                    "caption": "Bathroom 3"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df06",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424398.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424398.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424398.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424398.jpg",
                    "id": "16834367_1563149739",
                    "sort": 37,
                    "caption": "Bathroom 4"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df05",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424605.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424605.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424605.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424605.jpg",
                    "id": "16834367_1563149762",
                    "sort": 38,
                    "caption": "Kitchen with pool views"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df04",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424637.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424637.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424637.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424637.jpg",
                    "id": "16834367_1563149788",
                    "sort": 39,
                    "caption": "Breakfast inside or outside"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df03",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424687.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424687.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424687.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424687.jpg",
                    "id": "16834367_1563149845",
                    "sort": 40,
                    "caption": "What a space"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df02",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424726.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424726.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424726.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424726.jpg",
                    "id": "16834367_1563149875",
                    "sort": 41,
                    "caption": "How do you want to cook ? "
                },
                {
                    "_id": "5d09e25570d4f6003ca9df01",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424763.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424763.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424763.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424763.jpg",
                    "id": "16834367_1563149895",
                    "sort": 42,
                    "caption": "Kitchen to living area"
                },
                {
                    "_id": "5d09e25570d4f6003ca9df00",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424783.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424783.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424783.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424783.jpg",
                    "id": "16834367_1563149923",
                    "sort": 43,
                    "caption": "Look at the view darling"
                },
                {
                    "_id": "5d09e25570d4f6003ca9deff",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424815.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424815.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424815.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424815.jpg",
                    "id": "16834367_1563149952",
                    "sort": 44,
                    "caption": "relax and enjoy"
                },
                {
                    "_id": "5d09e25570d4f6003ca9defe",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424851.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424851.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424851.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424851.jpg",
                    "id": "16834367_1563149975",
                    "sort": 45,
                    "caption": "cozy corner"
                },
                {
                    "_id": "5d09e25570d4f6003ca9defd",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424877.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424877.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424877.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424877.jpg",
                    "id": "16834367_1563150012",
                    "sort": 46,
                    "caption": "sit back and watch your favourite movie"
                },
                {
                    "_id": "5d09e25570d4f6003ca9defc",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256424944.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256424944.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256424944.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256424944.jpg",
                    "id": "16834367_1563150037",
                    "sort": 47,
                    "caption": "Kitchen bar 2"
                },
                {
                    "_id": "5d09e25570d4f6003ca9defb",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256425035.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256425035.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256425035.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256425035.jpg",
                    "id": "16834367_1563150066",
                    "sort": 48,
                    "caption": "Living area"
                },
                {
                    "_id": "5d09e25570d4f6003ca9defa",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256425072.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256425072.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256425072.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256425072.jpg",
                    "id": "16834367_1563150091",
                    "sort": 49,
                    "caption": "Main entrance"
                },
                {
                    "_id": "5d09e25570d4f6003ca9def9",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256425101.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256425101.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_256425101.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_256425101.jpg",
                    "id": "16834367_1563150124",
                    "sort": 50,
                    "caption": "Entrance to pool"
                }
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_256413682.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_256413682.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_256413682.jpg",
                "caption": "Your amazing house"
            },
            "instantBookable": {
                "visibility": "off",
                "enabled": false
            },
            "timezone": "Asia/Jerusalem",
            "accountId": "585a39dbe43900100017e9e8",
            "address": {
                "state": "North District",
                "city": "Kinneret",
                "full": "Giv'at HaBazelet St, Kinneret, Israel",
                "searchable": "Giv'at HaBazelet St, Kinneret, Israel",
                "lng": 35.564202,
                "lat": 32.721754,
                "street": "Giv'at HaBazelet Street",
                "country": "Israel"
            },
            "lastActivityAt": "2021-03-09T09:23:09.119Z",
            "nickname": "KIN004 Lior Levit",
            "offeredServices": [],
            "lastSyncedAt": "2020-06-15T09:24:25.039Z",
            "bathrooms": 6,
            "bedrooms": 6,
            "pendingTasks": [
                {
                    "_id": "5f43b93879f02f002d2cbefb",
                    "mqId": "610baae6-05b0-4619-aff1-678a7cdcac2b",
                    "platform": "rentalsUnited",
                    "description": "Update listing",
                    "createdAt": "2020-08-24T12:57:28.320Z",
                    "error": "Smaller in LongStay element cannot be greater than 180."
                }
            ],
            "listingRooms": [
                {
                    "id": 4665168,
                    "roomNumber": 1,
                    "_id": "5b0968e17f0a743c4dec0b2e",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e17f0a743c4dec0b2f"
                        }
                    ]
                },
                {
                    "id": 4665169,
                    "roomNumber": 2,
                    "_id": "5b0968e17f0a743c4dec0b30",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e17f0a743c4dec0b31"
                        }
                    ]
                },
                {
                    "id": 4665170,
                    "roomNumber": 3,
                    "_id": "5b0968e17f0a743c4dec0b32",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e17f0a743c4dec0b33"
                        }
                    ]
                },
                {
                    "id": 4665171,
                    "roomNumber": 4,
                    "_id": "5b0968e17f0a743c4dec0b34",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e17f0a743c4dec0b35"
                        }
                    ]
                },
                {
                    "id": 4665172,
                    "roomNumber": 5,
                    "_id": "5b0968e17f0a743c4dec0b36",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e17f0a743c4dec0b37"
                        }
                    ]
                },
                {
                    "id": 4665173,
                    "roomNumber": 6,
                    "_id": "5b0968e17f0a743c4dec0b38",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e17f0a743c4dec0b39"
                        }
                    ]
                },
                {
                    "id": 4665174,
                    "roomNumber": 7,
                    "_id": "5b0968e17f0a743c4dec0b3a",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968e17f0a743c4dec0b3b"
                        }
                    ]
                }
            ],
            "lastUpdatedAt": "2023-01-11T05:35:54.358Z",
            "owners": [],
            "taxes": [],
            "useAccountTaxes": true,
            "rentalUnitedHostPhone": "41794897021",
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f43b93779f02f002d2cbee9",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 500
                    }
                }
            },
            "publishedAddress": {
                "state": "North District",
                "lng": 35.562675,
                "lat": 32.721676,
                "country": "Israel",
                "city": "Kinneret",
                "street": "Giv'at HaBazelet Street",
                "full": "Giv'at HaBazelet Street, Kinneret, North District, Israel"
            },
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c4fd52129400485ca515"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 9500,
                "basePriceUSD": 2733,
                "cleaningFee": 500,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 2
            },
            "terms": {
                "minNights": 2,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "accountTaxes": []
        },
        {
            "_id": "58cab7acd3d0d00400a9c29e",
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "amenities": [
                "TV",
                "Cable TV",
                "Internet",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Breakfast",
                "Hot tub",
                "Buzzer/wireless intercom",
                "Heating",
                "Family/kid friendly",
                "Suitable for events",
                "Washer",
                "Dryer",
                "Smoke alarm",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Pool",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "accommodates": 16,
            "bedType": "Real Bed",
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:34:25.900Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:34:25.899Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:34:25.899Z"
                },
                "weekendMinNights": 2,
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:34:25.907Z"
            },
            "active": true,
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "bathrooms": 4,
            "defaultCheckInTime": "16:00",
            "accountId": "585a39dbe43900100017e9e8",
            "publicDescription": {
                "guestControls": {
                    "allowsSmoking": false,
                    "allowsPets": false,
                    "allowsInfants": true,
                    "allowsEvents": true,
                    "allowsChildren": true
                },
                "transit": "Ideally you need a car to enjoy the Sea of Galilee and the amazing places around it.",
                "notes": "Cleaning and Housekeeping services are available on request.\n\nIsraeli breakfast is served each morning at a local restaurant 2.5 km from the Villa.\n\nAll Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\n \n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking.",
                "houseRules": "• No smoking\r\n• No pets\r\n• Check-in is anytime after 4:00 PM",
                "interactionWithGuests": "We are available at all times to make sure our guests have a memorable stay !",
                "summary": "In the lovely Moshava of Kinneret, right on the Sea of Galilee, this stunning property with 4 En-Suite Bedrooms and an amazing heated pool with stunning views is ready to make your stay memorable and unforgetable.\nAll rooms decorated with high-end luxury materials and all have a great view.\nThe living area is modern and will make you feel like a king and queen.\nEnjoy the Jacuzzi and heated pool any time of the year.",
                "space": "This amazing villa has 4 En-Suite Bedrooms.\n\nAll top stylish suites are equipped with a jacuzzi, private bathroom, smart T.V, kingsize bed, free Wi-Fi, air-conditioner, Dead Sea mineral salts & bath products, a Nespresso machine, electric water bar, mini bar and more.\n\nEverything you will need for an amazing stay !",
                "access": "There is a big swimming pool with a amazing views to the Sea of Galilee.\n\nAlso one private pool for one of the bedrooms.\n\nPools are heated when requested.\n\nJacuzzi.\n\nAmazing terrace with stunning views.",
                "neighborhood": "A private beach on the Sea of Galilee is just 10 minutes walk away.\n\nThe nearest grocery store is 5 minutea walk away.\n\nA bus stop with lines to Tiberias is 10 minutes walk away."
            },
            "pictures": [
                {
                    "_id": "621fa616eea6f90036ec4a18",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240927/production/585a39dbe43900100017e9e8/seclnripe64gmjj0sxii.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240927/production/585a39dbe43900100017e9e8/seclnripe64gmjj0sxii.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 243567,
                    "id": "17742818_1351913285"
                },
                {
                    "_id": "621fa616eea6f90036ec4a17",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240927/production/585a39dbe43900100017e9e8/xmqhn5kbcwfdzabulnrw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240927/production/585a39dbe43900100017e9e8/xmqhn5kbcwfdzabulnrw.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 201753,
                    "id": "17742818_1351913302"
                },
                {
                    "_id": "621fa616eea6f90036ec4a16",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240932/production/585a39dbe43900100017e9e8/o786biwn3rcluad4ooaa.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240932/production/585a39dbe43900100017e9e8/o786biwn3rcluad4ooaa.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 224278,
                    "id": "17742818_1351913315"
                },
                {
                    "_id": "621fa616eea6f90036ec4a15",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240927/production/585a39dbe43900100017e9e8/wbdvqzcok3l1bekhz7rn.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240927/production/585a39dbe43900100017e9e8/wbdvqzcok3l1bekhz7rn.jpg",
                    "height": 1139,
                    "width": 1600,
                    "size": 190730,
                    "id": "17742818_1351913341"
                },
                {
                    "_id": "5d09e2f970d4f6003caa158f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281374708.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281374708.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281374708.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281374708.jpg",
                    "id": "17742818_1351913355",
                    "sort": 9,
                    "caption": "Enjoy the Sun !"
                },
                {
                    "_id": "621fa616eea6f90036ec4a13",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240929/production/585a39dbe43900100017e9e8/or3s0a9otmslvcz4tvif.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240929/production/585a39dbe43900100017e9e8/or3s0a9otmslvcz4tvif.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 132080,
                    "id": "17742818_1351913377"
                },
                {
                    "_id": "621fa616eea6f90036ec4a12",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240927/production/585a39dbe43900100017e9e8/heftnbqpnqqeu6rq5zbm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240927/production/585a39dbe43900100017e9e8/heftnbqpnqqeu6rq5zbm.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 107966,
                    "id": "17742818_1351913401"
                },
                {
                    "_id": "621fa616eea6f90036ec4a11",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240929/production/585a39dbe43900100017e9e8/bnkcvzzun0ds9qy2jgmd.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240929/production/585a39dbe43900100017e9e8/bnkcvzzun0ds9qy2jgmd.jpg",
                    "height": 1600,
                    "width": 1064,
                    "size": 191165,
                    "id": "17742818_1351913423"
                },
                {
                    "_id": "621fa616eea6f90036ec4a10",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240927/production/585a39dbe43900100017e9e8/il5zins29ltjs60vui77.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240927/production/585a39dbe43900100017e9e8/il5zins29ltjs60vui77.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 159810,
                    "id": "17742818_1351913443"
                },
                {
                    "_id": "621fa616eea6f90036ec4a0f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240927/production/585a39dbe43900100017e9e8/mtycvzxpeyfdutcli0il.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240927/production/585a39dbe43900100017e9e8/mtycvzxpeyfdutcli0il.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 255858,
                    "id": "17742818_1351913461"
                },
                {
                    "_id": "621fa616eea6f90036ec4a0e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240929/production/585a39dbe43900100017e9e8/q5ljg4or5cukgzb0aiul.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240929/production/585a39dbe43900100017e9e8/q5ljg4or5cukgzb0aiul.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 191943,
                    "id": "17742818_1351913481"
                },
                {
                    "_id": "621fa616eea6f90036ec4a0d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240929/production/585a39dbe43900100017e9e8/wnenpgce9i6ywd4xvizr.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240929/production/585a39dbe43900100017e9e8/wnenpgce9i6ywd4xvizr.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 144064,
                    "id": "17742818_1351913503"
                },
                {
                    "_id": "621fa616eea6f90036ec4a0c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240931/production/585a39dbe43900100017e9e8/pwzn34ulthjswmdek5rz.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240931/production/585a39dbe43900100017e9e8/pwzn34ulthjswmdek5rz.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 193773,
                    "id": "17742818_1351913523"
                },
                {
                    "_id": "621fa616eea6f90036ec4a0b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240931/production/585a39dbe43900100017e9e8/sipkmb9zmk55ak7gatqf.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240931/production/585a39dbe43900100017e9e8/sipkmb9zmk55ak7gatqf.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 231533,
                    "id": "17742818_1351913538"
                },
                {
                    "_id": "621fa616eea6f90036ec4a0a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240932/production/585a39dbe43900100017e9e8/rtuohqjmulvlhalpjxmc.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240932/production/585a39dbe43900100017e9e8/rtuohqjmulvlhalpjxmc.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 152022,
                    "id": "17742818_1351913560"
                },
                {
                    "_id": "621fa616eea6f90036ec4a09",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240932/production/585a39dbe43900100017e9e8/irvq53qcsepg1l5zgxim.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240932/production/585a39dbe43900100017e9e8/irvq53qcsepg1l5zgxim.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 164463,
                    "id": "17742818_1351913574"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1582",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281384599.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281384599.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281384599.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281384599.jpg",
                    "id": "17742818_1351913586",
                    "sort": 22,
                    "caption": "Bathroom of bedroom 4"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1588",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281383651.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281383651.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281383651.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281383651.jpg",
                    "id": "17742818_1351913597",
                    "sort": 16,
                    "caption": "Bathroom of bedroom 2"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1581",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281442770.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281442770.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281442770.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281442770.jpg",
                    "id": "17742818_1351913609",
                    "sort": 23,
                    "caption": "Fully equipped kitchen"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1590",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281370028.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281370028.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281370028.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281370028.jpg",
                    "id": "17742818_1351913647",
                    "sort": 8,
                    "caption": "Private terrace of one bedroom"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1594",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281364318.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281364318.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281364318.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281364318.jpg",
                    "id": "17742818_1351913667",
                    "sort": 4,
                    "caption": "Amazing views on the Sea of Galilee"
                },
                {
                    "_id": "5d09e2f970d4f6003caa158e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281376856.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281376856.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281376856.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281376856.jpg",
                    "id": "17742818_1351913685",
                    "sort": 10,
                    "caption": "What views !"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1587",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281384008.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281384008.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281384008.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281384008.jpg",
                    "id": "17742818_1351913698",
                    "sort": 17,
                    "caption": "Private terrace of bedroom 2"
                },
                {
                    "_id": "621fa616eea6f90036ec4a01",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240929/production/585a39dbe43900100017e9e8/a9oap0fdwnefewpd2szm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240929/production/585a39dbe43900100017e9e8/a9oap0fdwnefewpd2szm.jpg",
                    "height": 1064,
                    "width": 1600,
                    "size": 302202,
                    "id": "17742818_1351913731"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1593",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281373693.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281373693.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281373693.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281373693.jpg",
                    "id": "17742818_1351913750",
                    "sort": 5,
                    "caption": "Sit back and relax !"
                },
                {
                    "_id": "5d09e2f970d4f6003caa157d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281401539.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281401539.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281401539.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281401539.jpg",
                    "id": "17742818_1351913764",
                    "sort": 27,
                    "caption": "Ready for some Champagne ? "
                },
                {
                    "_id": "5d09e2f970d4f6003caa157f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281400125.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281400125.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281400125.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281400125.jpg",
                    "id": "17742818_1351913780",
                    "sort": 25,
                    "caption": "Private pool of Bedroom 4"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1595",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281367825.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281367825.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281367825.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281367825.jpg",
                    "id": "17742818_1351913790",
                    "sort": 3,
                    "caption": "Private Jacuzzi"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1591",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281367061.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281367061.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281367061.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281367061.jpg",
                    "id": "17742818_1351913796",
                    "sort": 7,
                    "caption": "Enjoy the pool with great views"
                },
                {
                    "_id": "5d09e2f970d4f6003caa158d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281377708.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281377708.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281377708.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281377708.jpg",
                    "id": "17742818_1351913807",
                    "sort": 11,
                    "caption": "The pool, terrace and Sea of Galilee"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1597",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281365567.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281365567.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281365567.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281365567.jpg",
                    "id": "17742818_1351913823",
                    "sort": 1,
                    "caption": "Pool with stunning views"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1580",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281442851.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281442851.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281442851.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281442851.jpg",
                    "id": "17742818_1351913835",
                    "sort": 24,
                    "caption": "Look at your great pool...."
                },
                {
                    "_id": "621fa616eea6f90036ec49f8",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1646240932/production/585a39dbe43900100017e9e8/hl4aky2lh9awuktybu0j.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240932/production/585a39dbe43900100017e9e8/hl4aky2lh9awuktybu0j.jpg",
                    "height": 399,
                    "width": 600,
                    "size": 61891,
                    "id": "17742818_1351913859"
                },
                {
                    "_id": "5d09e2f970d4f6003caa1592",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_281373437.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_281373437.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_281373437.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_281373437.jpg",
                    "id": "17742818_1351913876",
                    "sort": 6,
                    "caption": "Pool by night... it can be heating for the midnight swims"
                }
            ],
            "address": {
                "country": "Israel",
                "street": "Giv'at HaKalaniyot Street",
                "lat": 32.722518,
                "lng": 35.56190170000001,
                "searchable": "Giv'at HaKalaniyot Street, Kinneret, North District, Israel",
                "full": "Giv'at HaKalaniyot St, Kinneret, Israel",
                "city": "Kinneret",
                "state": "North District"
            },
            "lastActivityAt": "2021-03-16T08:56:25.248Z",
            "lastSyncedAt": "2020-06-15T09:24:02.875Z",
            "beds": 8,
            "defaultCheckOutTime": "11:00",
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "offeredServices": [],
            "createdAt": "2017-03-16T16:05:00.647Z",
            "isListed": true,
            "occupancyStats": [
                {
                    "month": "2016-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b13fe"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b13ff",
                    "month": "2016-04",
                    "available": 30,
                    "unavailable": 0
                },
                {
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1400",
                    "month": "2016-05"
                },
                {
                    "_id": "58ccffbb9393bc04004b1401",
                    "month": "2016-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "58ccffbb9393bc04004b1402",
                    "month": "2016-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1403",
                    "month": "2016-08",
                    "available": 31
                },
                {
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1404",
                    "month": "2016-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2016-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1405"
                },
                {
                    "month": "2016-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1406"
                },
                {
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1407",
                    "month": "2016-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2017-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1408"
                },
                {
                    "month": "2017-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1409"
                },
                {
                    "month": "2017-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b140a"
                },
                {
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b140b",
                    "month": "2017-04"
                },
                {
                    "_id": "58ccffbb9393bc04004b140c",
                    "month": "2017-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "58ccffbb9393bc04004b140d",
                    "month": "2017-06",
                    "available": 28,
                    "unavailable": 2,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "58ccffbb9393bc04004b140e",
                    "month": "2017-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "58ccffbb9393bc04004b140f",
                    "month": "2017-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "_id": "58ccffbb9393bc04004b1410",
                    "month": "2017-09",
                    "available": 22,
                    "unavailable": 8,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1411",
                    "month": "2017-10",
                    "available": 30
                },
                {
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1412",
                    "month": "2017-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1413"
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1414"
                },
                {
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1415",
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2018-03",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ccffbb9393bc04004b1416"
                },
                {
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58df7521c938f504006def62"
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "590701bf2430e10400db5f76"
                },
                {
                    "month": "2018-06",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "592fe153ba936c04005d04cf"
                },
                {
                    "month": "2018-07",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59576cd6d2e676040099a551"
                },
                {
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59804dc951e79f04005ba8f2"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59a92a7c66e4270400784fd9"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59d0b751d38aac0400a76775"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59f99595b2c6dd0400a2e716"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a212223e533eb0400957f39"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a55de8cf5111f0b00f890a5"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a72de7830c693000b5e485d"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a97c8b203a091000b675d14"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ac0a740ff771d000b611ea8"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf05f771bf9000b14123f"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf05f771bf9000b141240"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b389f7f7ed65e000be2a627"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b617ed62614d20025b60075"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b8a5ced46763d00254fae4c"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bb1ea016ac6a10025b1c5fb"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bdac82db01fe10025b668ca"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c025500f54c71001c27916c"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b335f0b0206001d1785b5"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c5411e2ec9de500238191d9"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fbc87665250022a43995"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1da708e7d2400221db875"
                }
            ],
            "picture": {
                "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1646240927/production/585a39dbe43900100017e9e8/seclnripe64gmjj0sxii.jpg"
            },
            "timezone": "Asia/Jerusalem",
            "title": "Amazing Luxury House with Jacuzzi and heated pool",
            "__v": 820,
            "propertyType": "House",
            "bedrooms": 4,
            "customFields": [],
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": [],
                        "active": true
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "pendingTasks": [
                {
                    "_id": "5f43b9380574cb002826231a",
                    "mqId": "53dc6838-e1eb-4562-813f-9e036d9e4b9a",
                    "platform": "rentalsUnited",
                    "description": "Update listing",
                    "createdAt": "2020-08-24T12:57:28.979Z",
                    "error": "Smaller in LongStay element cannot be greater than 180."
                }
            ],
            "roomType": "Entire home/apt",
            "importingPlatform": "airbnb",
            "importedAt": "2017-03-16T16:05:00.650Z",
            "SaaS": {
                "autoRenew": true
            },
            "nickname": "KIN005 Camilia",
            "preBooking": [],
            "instantBookable": {
                "visibility": "off",
                "enabled": false
            },
            "tags": [
                "Israel"
            ],
            "integrations": [
                {
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/17742818",
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "airbnb2": {
                        "id": "17742818",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 0,
                            "allowRequestToBook": true
                        },
                        "daysOfWeekCheckIn": [
                            4,
                            2,
                            0,
                            5,
                            3,
                            1,
                            6
                        ],
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {},
                        "daysOfWeekMinimumNights": [],
                        "promotions": []
                    }
                }
            ],
            "listingRooms": [
                {
                    "id": 5793334,
                    "roomNumber": 1,
                    "_id": "5b0968e17f0a743c4dec0bd4",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "COUCH",
                            "_id": "5b0968e17f0a743c4dec0bd6"
                        },
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968e17f0a743c4dec0bd5"
                        }
                    ]
                },
                {
                    "id": 5793335,
                    "roomNumber": 2,
                    "_id": "5b0968e17f0a743c4dec0bd7",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "COUCH",
                            "_id": "5b0968e17f0a743c4dec0bd9"
                        },
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968e17f0a743c4dec0bd8"
                        }
                    ]
                },
                {
                    "id": 5793336,
                    "roomNumber": 3,
                    "_id": "5b0968e17f0a743c4dec0bda",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "COUCH",
                            "_id": "5b0968e17f0a743c4dec0bdc"
                        },
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968e17f0a743c4dec0bdb"
                        }
                    ]
                },
                {
                    "id": 5793337,
                    "roomNumber": 4,
                    "_id": "5b0968e17f0a743c4dec0bdd",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "COUCH",
                            "_id": "5b0968e17f0a743c4dec0bdf"
                        },
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968e17f0a743c4dec0bde"
                        }
                    ]
                }
            ],
            "lastUpdatedAt": "2023-01-11T05:34:26.086Z",
            "owners": [],
            "taxes": [],
            "useAccountTaxes": true,
            "rentalUnitedHostPhone": "41794897021",
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f43b9380574cb0028262309",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 800
                    }
                }
            },
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c51552129400485ced6f"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 8750,
                "basePriceUSD": 1295,
                "cleaningFee": 800,
                "currency": "ILS",
                "extraPersonFee": 400,
                "guestsIncludedInRegularFee": 8,
                "weekendBasePrice": null
            },
            "terms": {
                "minNights": 2,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "publishedAddress": {
                "full": ""
            },
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2022-03-03T11:12:36.821Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5b63581b6351eb0039f5e88d",
            "lastSyncedAt": "2020-06-15T09:30:56.985Z",
            "bathrooms": 3.5,
            "accommodates": 14,
            "bedType": "Real Bed",
            "roomType": "Entire home/apt",
            "propertyType": "Villa",
            "beds": 7,
            "bedrooms": 6,
            "timezone": "Asia/Jerusalem",
            "title": "Amazing Luxury Villa with Private Cinema and Pool",
            "defaultCheckOutTime": "15:00",
            "defaultCheckInTime": "15:00",
            "isListed": false,
            "nickname": "CAE004 Rita",
            "importingPlatform": "airbnb",
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [
                {
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5731"
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5732"
                },
                {
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5733"
                },
                {
                    "month": "2018-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5734"
                },
                {
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5735"
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5736"
                },
                {
                    "month": "2018-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5737"
                },
                {
                    "month": "2018-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5738"
                },
                {
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5739"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd573a"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd573b"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd573c"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd573d"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd573e"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd573f"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5740"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5741"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5742"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5743"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5744"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5745"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5746"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5747"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5748"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f915a194d8001cbd5749"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b34890b0206001d17b2d9"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c541347ec9de5002381be12"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fc737665250022a46013"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1db3a8e7d2400221ddcb1"
                }
            ],
            "preBooking": [],
            "importedAt": "2018-08-02T19:14:35.593Z",
            "offeredServices": [],
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-12-21T18:46:38.424Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-12-21T18:46:38.423Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-12-21T18:46:38.423Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-12-21T18:46:38.427Z"
            },
            "customFields": [],
            "active": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "useAccountMarkups": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountTaxes": true,
            "taxes": [],
            "ownerRevenueFormula": "net_income - pm_commission",
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "useAccountRevenueShare": true,
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": true,
                    "allowsInfants": true,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "summary": "Amazing Luxury Villa with Private Cinema and Pool",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\n \n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "Crib",
                "Elevator",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Disabled parking spot",
                "Doorman",
                "EV charger",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Free parking on street",
                "Heating",
                "Washer",
                "Dryer",
                "Smoke alarm",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private living room",
                "Private entrance",
                "Bed linens",
                "Extra pillows and blankets",
                "Microwave",
                "Refrigerator",
                "Dishwasher",
                "Oven",
                "BBQ grill",
                "Patio or balcony",
                "Garden or backyard",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Pool",
                "Free street parking",
                "Cooking basics",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "pictures": [
                {
                    "_id": "5d09e2a370d4f6003ca9f195",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780272.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780272.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780272.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780272.jpg",
                    "id": 551780272,
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5d09e2a370d4f6003ca9f194",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780186.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780186.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780186.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780186.jpg",
                    "id": 551780186,
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5d09e2a370d4f6003ca9f193",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780222.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780222.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780222.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780222.jpg",
                    "id": 551780222,
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5d09e2a370d4f6003ca9f192",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780251.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780251.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780251.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780251.jpg",
                    "id": 551780251,
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5d09e2a370d4f6003ca9f191",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780452.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780452.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780452.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780452.jpg",
                    "id": 551780452,
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5d09e2a370d4f6003ca9f190",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780321.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780321.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780321.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780321.jpg",
                    "id": 551780321,
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5d09e2a370d4f6003ca9f18f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780394.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780394.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780394.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780394.jpg",
                    "id": 551780394,
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5d09e2a370d4f6003ca9f18e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780402.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780402.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_551780402.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_551780402.jpg",
                    "id": 551780402,
                    "sort": 8,
                    "caption": ""
                }
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_551780272.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_551780272.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_551780272.jpg",
                "caption": ""
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 24
            },
            "address": {
                "full": "HaKohavim Street 1, Caesarea, Haifa District, Israel",
                "city": "Caesarea",
                "state": "Haifa District",
                "country": "Israel",
                "street": "HaKohavim Street 1",
                "lat": 32.487904,
                "lng": 34.910461,
                "searchable": "HaKohavim Street 1, Caesarea, Haifa District, Israel"
            },
            "listingRooms": [
                {
                    "id": 24215633,
                    "roomNumber": 0,
                    "_id": "5b63581b6351eb0039f5e897",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b63581b6351eb0039f5e898"
                        }
                    ]
                },
                {
                    "id": 24215634,
                    "roomNumber": 2,
                    "_id": "5b63581b6351eb0039f5e899",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b63581b6351eb0039f5e89a"
                        }
                    ]
                },
                {
                    "id": 24215635,
                    "roomNumber": 4,
                    "_id": "5b63581b6351eb0039f5e89b",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b63581b6351eb0039f5e89c"
                        }
                    ]
                },
                {
                    "id": 24215636,
                    "roomNumber": 1,
                    "_id": "5b63581b6351eb0039f5e89d",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b63581b6351eb0039f5e89e"
                        }
                    ]
                },
                {
                    "id": 24215637,
                    "roomNumber": 5,
                    "_id": "5b63581b6351eb0039f5e89f",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b63581b6351eb0039f5e8a0"
                        }
                    ]
                },
                {
                    "id": 24215638,
                    "roomNumber": 3,
                    "_id": "5b63581b6351eb0039f5e8a1",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b63581b6351eb0039f5e8a2"
                        }
                    ]
                },
                {
                    "id": 24215639,
                    "roomNumber": 6,
                    "_id": "5b63581b6351eb0039f5e8a3",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b63581b6351eb0039f5e8a4"
                        }
                    ]
                }
            ],
            "owners": [],
            "tags": [
                "Israel",
                "PM-Unknown",
                "PMC-Unknown"
            ],
            "pendingTasks": [
                {
                    "_id": "5f43b939e87a4e002d751c1a",
                    "mqId": "0c3870d8-90d0-4562-b21b-a87c63767c84",
                    "platform": "rentalsUnited",
                    "description": "Update listing",
                    "createdAt": "2020-08-24T12:57:29.468Z",
                    "error": "Smaller in LongStay element cannot be greater than 180."
                }
            ],
            "integrations": [],
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f43b939e87a4e002d751c09",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 800
                    }
                }
            },
            "SaaS": {
                "autoRenew": true
            },
            "lastUpdatedAt": "2022-12-21T18:46:38.576Z",
            "createdAt": "2018-08-02T19:14:35.591Z",
            "__v": 340,
            "lastActivityAt": "2021-01-27T21:48:15.751Z",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c50852129400485cc5ca"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 12000,
                "basePriceUSD": 3452,
                "cleaningFee": 800,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 1,
                "securityDepositFee": 5000,
                "weekendBasePrice": 14000,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "terms": {
                "minNights": 29,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 30
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "otaRoomType": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:02.881Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "590076a14d50250400224508",
            "integrations": [
                {
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "initialComplexListing": false,
                        "publishCompanyLogo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "isPublishedCompanyInfo": false,
                        "taxInfo": []
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/18403900",
                    "airbnb2": {
                        "id": "18403900",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 0,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "6363834d42e0a6007355fb03"
                        },
                        "daysOfWeekMinimumNights": [],
                        "promotions": [],
                        "syncCategoryUpdatedAt": "2022-11-03T09:01:47.141Z"
                    }
                }
            ],
            "lastActivityAt": "2021-01-27T21:53:14.997Z",
            "lastSyncedAt": "2020-06-15T09:23:58.537Z",
            "defaultCheckInTime": "16:00",
            "importingPlatform": "airbnb",
            "active": true,
            "offeredServices": [],
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": [],
                        "active": true
                    },
                    "calendarSmartRules": {
                        "blockListings": [
                            "5911bf6428731a0400cc1d57"
                        ],
                        "active": true
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "amenities": [
                "TV",
                "Cable TV",
                "Internet",
                "Wireless Internet",
                "Air conditioning",
                "Wheelchair accessible",
                "Free parking on premises",
                "Elevator",
                "Buzzer/wireless intercom",
                "Heating",
                "Family/kid friendly",
                "Suitable for events",
                "Washer",
                "Dryer",
                "Smoke alarm",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "High chair",
                "Crib",
                "Hot water",
                "Bed linens",
                "Extra pillows and blankets",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "createdAt": "2017-04-26T10:29:53.096Z",
            "bathrooms": 3.5,
            "beds": 7,
            "title": "Amazing Penthouse ideally located in German Colony",
            "nickname": "JER020 James Penth",
            "pictures": [
                {
                    "_id": "6298860e09e1fa0032f9786d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162751/production/585a39dbe43900100017e9e8/ayeu1w3ff0kh6otmephk.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162751/production/585a39dbe43900100017e9e8/ayeu1w3ff0kh6otmephk.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 127111,
                    "id": "18403900_1413871780"
                },
                {
                    "_id": "6298860e09e1fa0032f9786c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162750/production/585a39dbe43900100017e9e8/krj4343tywlaeync4fjv.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162750/production/585a39dbe43900100017e9e8/krj4343tywlaeync4fjv.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 150240,
                    "id": "18403900_1413871803"
                },
                {
                    "_id": "6298860e09e1fa0032f9786b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/tv51xjcn9ljk8aki60op.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/tv51xjcn9ljk8aki60op.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 115001,
                    "id": "18403900_1413871869"
                },
                {
                    "_id": "6298860e09e1fa0032f9786a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162750/production/585a39dbe43900100017e9e8/rqzz4ogdozmzv9nmrlvb.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162750/production/585a39dbe43900100017e9e8/rqzz4ogdozmzv9nmrlvb.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 167464,
                    "id": "18403900_1413871883"
                },
                {
                    "_id": "6298860e09e1fa0032f97869",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162748/production/585a39dbe43900100017e9e8/xziwshzemqsd6vn7ez18.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162748/production/585a39dbe43900100017e9e8/xziwshzemqsd6vn7ez18.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 167417,
                    "id": "18403900_1413871900"
                },
                {
                    "_id": "6298860e09e1fa0032f97868",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162750/production/585a39dbe43900100017e9e8/n46p6losq6aho4teausl.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162750/production/585a39dbe43900100017e9e8/n46p6losq6aho4teausl.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 149403,
                    "id": "18403900_1413871924"
                },
                {
                    "_id": "6298860e09e1fa0032f97867",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162750/production/585a39dbe43900100017e9e8/agj1ifondlbqhq6r0odh.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162750/production/585a39dbe43900100017e9e8/agj1ifondlbqhq6r0odh.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 106155,
                    "id": "18403900_1413871941"
                },
                {
                    "_id": "6298860e09e1fa0032f97866",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162748/production/585a39dbe43900100017e9e8/rocx2bukr8yrcj5zktvl.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162748/production/585a39dbe43900100017e9e8/rocx2bukr8yrcj5zktvl.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 110664,
                    "id": "18403900_1413871966"
                },
                {
                    "_id": "6298860e09e1fa0032f97865",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/ph3ket7b7gonhma3rtzw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/ph3ket7b7gonhma3rtzw.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 109261,
                    "id": "18403900_1413871977"
                },
                {
                    "_id": "6298860e09e1fa0032f97864",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162748/production/585a39dbe43900100017e9e8/tkccrehnase4boip5nei.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162748/production/585a39dbe43900100017e9e8/tkccrehnase4boip5nei.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 136450,
                    "id": "18403900_1413872000"
                },
                {
                    "_id": "6298860e09e1fa0032f97863",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/stho9o5iogfxn1p9hxgv.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/stho9o5iogfxn1p9hxgv.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 105898,
                    "id": "18403900_1413872018"
                },
                {
                    "_id": "6298860e09e1fa0032f97862",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/chm2a2ywjrbupkyvexuu.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/chm2a2ywjrbupkyvexuu.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 116471,
                    "id": "18403900_1413872038"
                },
                {
                    "_id": "6298860e09e1fa0032f97861",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/wzr2zaun8sa11lzvnfyi.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/wzr2zaun8sa11lzvnfyi.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 95481,
                    "id": "18403900_1413872071"
                },
                {
                    "_id": "6298860e09e1fa0032f97860",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/jnvdhc58d80ljyo6dvka.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/jnvdhc58d80ljyo6dvka.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 126538,
                    "id": "18403900_1413872082"
                },
                {
                    "_id": "6298860e09e1fa0032f9785f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162754/production/585a39dbe43900100017e9e8/mujcbhmnsx4vksfrdl9e.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162754/production/585a39dbe43900100017e9e8/mujcbhmnsx4vksfrdl9e.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 170850,
                    "id": "18403900_1413872099"
                },
                {
                    "_id": "6298860e09e1fa0032f9785e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162754/production/585a39dbe43900100017e9e8/opziwt44jfld9cvxctkf.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162754/production/585a39dbe43900100017e9e8/opziwt44jfld9cvxctkf.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 160362,
                    "id": "18403900_1413872109"
                },
                {
                    "_id": "6298860e09e1fa0032f9785d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162754/production/585a39dbe43900100017e9e8/iarm3rz2xftzbejlvykl.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162754/production/585a39dbe43900100017e9e8/iarm3rz2xftzbejlvykl.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 193598,
                    "id": "18403900_1413872122"
                },
                {
                    "_id": "6298860e09e1fa0032f9785c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162751/production/585a39dbe43900100017e9e8/cgwtkrrcvgbwjp0vgcka.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162751/production/585a39dbe43900100017e9e8/cgwtkrrcvgbwjp0vgcka.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 165707,
                    "id": "18403900_1413872142"
                },
                {
                    "_id": "6298860e09e1fa0032f9785b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162751/production/585a39dbe43900100017e9e8/ua0snxkzfqoeltdj2crh.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162751/production/585a39dbe43900100017e9e8/ua0snxkzfqoeltdj2crh.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 160333,
                    "id": "18403900_1413872155"
                },
                {
                    "_id": "6298860e09e1fa0032f9785a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162751/production/585a39dbe43900100017e9e8/tbn6uwqpw91oq8lxbwib.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162751/production/585a39dbe43900100017e9e8/tbn6uwqpw91oq8lxbwib.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 153205,
                    "id": "18403900_1413872176"
                },
                {
                    "_id": "6298860e09e1fa0032f97859",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162752/production/585a39dbe43900100017e9e8/hkjfssxqt3hlw6folipd.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162752/production/585a39dbe43900100017e9e8/hkjfssxqt3hlw6folipd.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 141466,
                    "id": "18403900_1413872190"
                },
                {
                    "_id": "6298860e09e1fa0032f97858",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162752/production/585a39dbe43900100017e9e8/xyxaixxhp36dsrob3lja.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162752/production/585a39dbe43900100017e9e8/xyxaixxhp36dsrob3lja.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 135942,
                    "id": "18403900_1413872207"
                },
                {
                    "_id": "6298860e09e1fa0032f97857",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162752/production/585a39dbe43900100017e9e8/kscq59tv4kopun0qolyu.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162752/production/585a39dbe43900100017e9e8/kscq59tv4kopun0qolyu.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 130556,
                    "id": "18403900_1413872221"
                },
                {
                    "_id": "6298860e09e1fa0032f97856",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162752/production/585a39dbe43900100017e9e8/j8qlajcva7fyidihzghm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162752/production/585a39dbe43900100017e9e8/j8qlajcva7fyidihzghm.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 140202,
                    "id": "18403900_1413872233"
                },
                {
                    "_id": "6298860e09e1fa0032f97855",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162753/production/585a39dbe43900100017e9e8/w59htbvxplxqo14zhifp.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162753/production/585a39dbe43900100017e9e8/w59htbvxplxqo14zhifp.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 125518,
                    "id": "18403900_1413872255"
                },
                {
                    "_id": "6298860e09e1fa0032f97854",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162753/production/585a39dbe43900100017e9e8/ml17sogochbjhfni9gjk.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162753/production/585a39dbe43900100017e9e8/ml17sogochbjhfni9gjk.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 144449,
                    "id": "18403900_1413872270"
                },
                {
                    "_id": "6298860e09e1fa0032f97853",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162753/production/585a39dbe43900100017e9e8/fedqg2ne96f8pkycnjj9.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162753/production/585a39dbe43900100017e9e8/fedqg2ne96f8pkycnjj9.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 85621,
                    "id": "18403900_1413872283"
                },
                {
                    "_id": "6298860e09e1fa0032f97852",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162753/production/585a39dbe43900100017e9e8/bsb6ozfe1vjvyosbdlpc.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162753/production/585a39dbe43900100017e9e8/bsb6ozfe1vjvyosbdlpc.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 144148,
                    "id": "18403900_1413872305"
                },
                {
                    "_id": "6298860e09e1fa0032f97851",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162753/production/585a39dbe43900100017e9e8/dpctxjbwwuxrccuhcdqw.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162753/production/585a39dbe43900100017e9e8/dpctxjbwwuxrccuhcdqw.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 142230,
                    "id": "18403900_1413872315"
                },
                {
                    "_id": "6298860e09e1fa0032f97850",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162754/production/585a39dbe43900100017e9e8/ihuaidyv48smdplvhiix.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162754/production/585a39dbe43900100017e9e8/ihuaidyv48smdplvhiix.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 135278,
                    "id": "18403900_1413872329"
                },
                {
                    "_id": "6298860e09e1fa0032f9784f",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162753/production/585a39dbe43900100017e9e8/uabib01u8nly5kvp3j0w.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162753/production/585a39dbe43900100017e9e8/uabib01u8nly5kvp3j0w.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 94551,
                    "id": "18403900_1413872348"
                },
                {
                    "_id": "6298860e09e1fa0032f9784e",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162754/production/585a39dbe43900100017e9e8/zqgwcrud4vt2pkrinazg.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162754/production/585a39dbe43900100017e9e8/zqgwcrud4vt2pkrinazg.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 123857,
                    "id": "18403900_1413872360"
                },
                {
                    "_id": "6298860e09e1fa0032f9784d",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162754/production/585a39dbe43900100017e9e8/j0vcavkxtl51jub8yv6m.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162754/production/585a39dbe43900100017e9e8/j0vcavkxtl51jub8yv6m.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 138561,
                    "id": "18403900_1413872371"
                },
                {
                    "_id": "6298860e09e1fa0032f9784c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162751/production/585a39dbe43900100017e9e8/lim71mapxdncadglbxkf.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162751/production/585a39dbe43900100017e9e8/lim71mapxdncadglbxkf.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 142846,
                    "id": "18403900_1413872384"
                },
                {
                    "_id": "6298860e09e1fa0032f9784b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162752/production/585a39dbe43900100017e9e8/bycbl9pznufhut5nuc8h.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162752/production/585a39dbe43900100017e9e8/bycbl9pznufhut5nuc8h.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 171387,
                    "id": "18403900_1413872396"
                },
                {
                    "_id": "6298860e09e1fa0032f9784a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162752/production/585a39dbe43900100017e9e8/mn1cmewatmqpsdxp0fjz.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162752/production/585a39dbe43900100017e9e8/mn1cmewatmqpsdxp0fjz.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 225382,
                    "id": "18403900_1413872408"
                },
                {
                    "_id": "6298860e09e1fa0032f97849",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162750/production/585a39dbe43900100017e9e8/k6nrvdst8eg6w931mmon.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162750/production/585a39dbe43900100017e9e8/k6nrvdst8eg6w931mmon.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 153959,
                    "id": "18403900_1413872423"
                },
                {
                    "_id": "6298860e09e1fa0032f97848",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162755/production/585a39dbe43900100017e9e8/tdaglaarryl455xmkfve.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162755/production/585a39dbe43900100017e9e8/tdaglaarryl455xmkfve.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 189928,
                    "id": "18403900_1413872467"
                },
                {
                    "_id": "6298860e09e1fa0032f97847",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162755/production/585a39dbe43900100017e9e8/ywdvrnj7s2sdryu3zg8z.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162755/production/585a39dbe43900100017e9e8/ywdvrnj7s2sdryu3zg8z.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 319988,
                    "id": "18403900_1413872479"
                },
                {
                    "_id": "6298860e09e1fa0032f97846",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/aymbzljdeglirtsgk7pv.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/aymbzljdeglirtsgk7pv.jpg",
                    "height": 2045,
                    "width": 1440,
                    "size": 235515,
                    "id": "18403900_1413872487"
                },
                {
                    "_id": "6298860e09e1fa0032f97845",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162748/production/585a39dbe43900100017e9e8/slybtuikhwldacx5fezt.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162748/production/585a39dbe43900100017e9e8/slybtuikhwldacx5fezt.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 179027,
                    "id": "18403900_1413872500"
                },
                {
                    "_id": "6298860e09e1fa0032f97844",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162755/production/585a39dbe43900100017e9e8/cngmvorarftzmgxaunio.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162755/production/585a39dbe43900100017e9e8/cngmvorarftzmgxaunio.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 134400,
                    "id": "18403900_1413872509"
                },
                {
                    "_id": "6298860e09e1fa0032f97843",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162749/production/585a39dbe43900100017e9e8/kpr6mg6jfxrwlaffrjbv.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162749/production/585a39dbe43900100017e9e8/kpr6mg6jfxrwlaffrjbv.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 98110,
                    "id": "18403900_1413872557"
                },
                {
                    "_id": "6298860e09e1fa0032f97842",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162748/production/585a39dbe43900100017e9e8/hb2o5bvmi7llj08zpxpl.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162748/production/585a39dbe43900100017e9e8/hb2o5bvmi7llj08zpxpl.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 139190,
                    "id": "18403900_1413872567"
                },
                {
                    "_id": "6298860e09e1fa0032f97841",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1654162748/production/585a39dbe43900100017e9e8/shoat8m7l4ifokqh4cvo.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162748/production/585a39dbe43900100017e9e8/shoat8m7l4ifokqh4cvo.jpg",
                    "height": 960,
                    "width": 1440,
                    "size": 103685,
                    "id": "18403900_1413872578"
                }
            ],
            "picture": {
                "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1654162751/production/585a39dbe43900100017e9e8/ayeu1w3ff0kh6otmephk.jpg"
            },
            "accommodates": 12,
            "accountId": "585a39dbe43900100017e9e8",
            "customFields": [],
            "publicDescription": {
                "guestControls": {
                    "allowsSmoking": false,
                    "allowsPets": false,
                    "allowsInfants": true,
                    "allowsEvents": true,
                    "allowsChildren": true
                },
                "space": "On the main floor, the living room of the Penthouse is bathed in natural light entering through the many doors, windows and skylights. \n\nYou have 2 huge terraces on each side of the living area allowing you to relax in different places according to your mood and the weather.\n\nThe Kosher kitchen with a central island combines quality and design.\n\nThe fineness of materials such as stone and woodwork shows the perfection and concern for detail sought in this property.\n\nDownstairs, in a haven of peace, you will appreciate the comfort and convenience of four bedrooms with 3 bathrooms.\n\nYou will have the privilege of spending unforgettable moments in the eternal city.",
                "neighborhood": "Located in one of the most select and exclusive neighborhoods in Jerusalem, close to the main attractions of the city.",
                "transit": "In Jerusalem you don't really need a car, everything is so close to this part of town.\nAnd there are buses and Taxis if you wish of course.",
                "notes": "Cleaning and Housekeeping services are available on request.\n\nAll Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking.",
                "interactionWithGuests": "We are available at all times to make sure our guests have a memorable stay !",
                "summary": "Situated in one of the most select and exclusive neighborhoods in Jerusalem, close to the main attractions of the city, you will enter an amazing Penthouse where quality and design become one.\n\nParticular attention was given to details. The living room of the apartment is bathed in natural light entering through the many doors and windows.\n\nEnjoy Jerusalem while staying in a luxurious Penthouse ideally situated in the lovely German Colony right next to where it's all happening.",
                "houseRules": "• No smoking\r\n• No pets\r\n• Check-in is anytime after 4:00 PM"
            },
            "address": {
                "searchable": "Derech Beit Lehem 40, Jerusalem, Jerusalem District, Israel",
                "full": "Derech Beit Lehem 40, Jerusalem, Jerusalem District, Israel",
                "city": "Jerusalem",
                "state": "Jerusalem District",
                "country": "Israel",
                "street": "Derech Beit Lehem 40",
                "lat": 31.762091,
                "lng": 35.223091
            },
            "pendingTasks": [],
            "bedType": "Real Bed",
            "bedrooms": 4,
            "defaultCheckOutTime": "11:00",
            "preBooking": [],
            "occupancyStats": [
                {
                    "_id": "5901bb7b1dcb540400125e7d",
                    "month": "2016-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e7e",
                    "month": "2016-05",
                    "available": 31
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e7f",
                    "month": "2016-06",
                    "available": 30,
                    "unavailable": 0
                },
                {
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e80",
                    "month": "2016-07"
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e81",
                    "month": "2016-08",
                    "available": 31
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e82",
                    "month": "2016-09",
                    "available": 30,
                    "unavailable": 0
                },
                {
                    "month": "2016-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e83"
                },
                {
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e84",
                    "month": "2016-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2016-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e85"
                },
                {
                    "month": "2017-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e86"
                },
                {
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e87",
                    "month": "2017-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2017-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e88"
                },
                {
                    "month": "2017-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e89"
                },
                {
                    "month": "2017-05",
                    "available": 23,
                    "unavailable": 8,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e8a"
                },
                {
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e8b",
                    "month": "2017-06",
                    "available": 7,
                    "unavailable": 23,
                    "booked": 0
                },
                {
                    "month": "2017-07",
                    "available": 25,
                    "unavailable": 6,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e8c"
                },
                {
                    "month": "2017-08",
                    "available": 22,
                    "unavailable": 9,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e8d"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e8e",
                    "month": "2017-09",
                    "available": 22,
                    "unavailable": 8
                },
                {
                    "month": "2017-10",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e8f"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e90",
                    "month": "2017-11",
                    "available": 30,
                    "unavailable": 0
                },
                {
                    "month": "2017-12",
                    "available": 26,
                    "unavailable": 5,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e91"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e92",
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0
                },
                {
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e93"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e94",
                    "month": "2018-03",
                    "available": 30,
                    "unavailable": 1
                },
                {
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5901bb7b1dcb540400125e95",
                    "month": "2018-04"
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "590701ef2430e10400db6918",
                    "month": "2018-05",
                    "available": 31
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "592fe1b4ba936c04005d0b43",
                    "month": "2018-06",
                    "available": 29,
                    "unavailable": 1
                },
                {
                    "month": "2018-07",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5971cbbaeae3d20400611bf2"
                },
                {
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a25167ae49b9b0400814e1c"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a25167ae49b9b0400814e1d"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a25167ae49b9b0400814e1e"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a25167ae49b9b0400814e1f"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a25167ae49b9b0400814e20"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a5f1986819eee0b005384c3"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a72de8b30c693000b5e4bfc"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a97c8c503a091000b676007"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ac0a753ff771d000b612229"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf078771bf9000b1416a0"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf078771bf9000b1416a1"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b389f897ed65e000be2a79e"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b617ef72614d20025b60113"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b8a5ced46763d00254fae97"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bb1ea066ac6a10025b1c79d"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bdac839b01fe10025b66a24"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c02550af54c71001c2792c6"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b336f0b0206001d178672"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c5411f1ec9de50023819349"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fbcf7665250022a43a6e"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1da778e7d2400221db8fc"
                }
            ],
            "SaaS": {
                "autoRenew": true
            },
            "__v": 772,
            "roomType": "Entire home/apt",
            "instantBookable": {
                "visibility": "off",
                "enabled": false
            },
            "isListed": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Coffee maker",
                "Dishwasher",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "Hot tub",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "tags": [
                "Israel"
            ],
            "propertyType": "Apartment",
            "timezone": "Asia/Jerusalem",
            "importedAt": "2017-04-26T10:29:53.098Z",
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-11-03T09:01:01.176Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-11-03T09:01:01.164Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-11-03T09:01:01.164Z"
                },
                "weekendMinNights": 3,
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-11-03T09:01:01.177Z"
            },
            "listingRooms": [
                {
                    "id": 6677165,
                    "roomNumber": 0,
                    "_id": "5b0968c97f0a743c4debd4e2",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "COUCH",
                            "_id": "5b0968c97f0a743c4debd4e3"
                        }
                    ]
                },
                {
                    "id": 6677166,
                    "roomNumber": 4,
                    "_id": "5b0968c97f0a743c4debd4e4",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968c97f0a743c4debd4e6"
                        },
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b0968c97f0a743c4debd4e5"
                        }
                    ]
                },
                {
                    "id": 6677167,
                    "roomNumber": 2,
                    "_id": "5b0968c97f0a743c4debd4e7",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968c97f0a743c4debd4e8"
                        }
                    ]
                },
                {
                    "id": 6677168,
                    "roomNumber": 3,
                    "_id": "5b0968c97f0a743c4debd4e9",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968c97f0a743c4debd4ea"
                        }
                    ]
                },
                {
                    "id": 6677169,
                    "roomNumber": 1,
                    "_id": "5b0968c97f0a743c4debd4eb",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968c97f0a743c4debd4ec"
                        }
                    ]
                }
            ],
            "lastUpdatedAt": "2023-01-11T05:35:08.710Z",
            "owners": [],
            "taxes": [],
            "useAccountTaxes": true,
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f31184ee43e24002f122abe",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 138
                    }
                }
            },
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c50d52129400485cd272"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 815,
                "basePriceUSD": 802,
                "cleaningFee": 138,
                "currency": "USD",
                "extraPersonFee": 28,
                "guestsIncludedInRegularFee": 8,
                "weekendBasePrice": null
            },
            "terms": {
                "minNights": 3,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:07.832Z"
            },
            "yieldManagement": {
                "rateStrategy": {
                    "_id": "62cd148bb8187d0035271783",
                    "name": "Sukkot 2022 | Jerusalem"
                }
            },
            "accountTaxes": []
        },
        {
            "_id": "58c3fed02b2f590400c0b225",
            "nickname": "JER009 Sara's Penth",
            "bathrooms": 4.5,
            "accommodates": 12,
            "defaultCheckInTime": "16:00",
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": [],
                        "active": true
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "SaaS": {
                "autoRenew": true
            },
            "createdAt": "2017-03-11T13:42:40.892Z",
            "lastActivityAt": "2022-03-15T14:26:55.064Z",
            "defaultCheckOutTime": "11:00",
            "isListed": true,
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-12-21T18:46:38.956Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-12-21T18:46:38.956Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-12-21T18:46:38.956Z"
                },
                "weekendMinNights": 3,
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-12-21T18:46:38.963Z"
            },
            "pendingTasks": [],
            "offeredServices": [],
            "beds": 12,
            "importedAt": "2017-03-11T13:42:40.895Z",
            "__v": 816,
            "roomType": "Entire home/apt",
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "occupancyStats": [
                {
                    "month": "2016-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6645"
                },
                {
                    "month": "2016-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6646"
                },
                {
                    "month": "2016-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6647"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6648",
                    "month": "2016-06",
                    "available": 30,
                    "unavailable": 0
                },
                {
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6649",
                    "month": "2016-07"
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f664a",
                    "month": "2016-08",
                    "available": 31
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f664b",
                    "month": "2016-09",
                    "available": 30,
                    "unavailable": 0
                },
                {
                    "month": "2016-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f664c"
                },
                {
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f664d",
                    "month": "2016-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2016-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f664e"
                },
                {
                    "month": "2017-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f664f"
                },
                {
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6650",
                    "month": "2017-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2017-03",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6651"
                },
                {
                    "month": "2017-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6652"
                },
                {
                    "month": "2017-05",
                    "available": 25,
                    "unavailable": 6,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6653"
                },
                {
                    "month": "2017-06",
                    "available": 23,
                    "unavailable": 7,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6654"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6655",
                    "month": "2017-07",
                    "available": 27,
                    "unavailable": 4
                },
                {
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6656",
                    "month": "2017-08"
                },
                {
                    "unavailable": 8,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6657",
                    "month": "2017-09",
                    "available": 22
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6658",
                    "month": "2017-10",
                    "available": 22,
                    "unavailable": 9
                },
                {
                    "month": "2017-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f6659"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f665a",
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f665b"
                },
                {
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f665c",
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0
                },
                {
                    "month": "2018-03",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58ca5c50b2f9d904006f665d"
                },
                {
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "58df7515c938f504006dee72",
                    "month": "2018-04"
                },
                {
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "590701b62430e10400db5e92",
                    "month": "2018-05",
                    "available": 31
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "592fe149ba936c04005d03f1",
                    "month": "2018-06",
                    "available": 29,
                    "unavailable": 1
                },
                {
                    "month": "2018-07",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59576cd1d2e676040099a47c"
                },
                {
                    "booked": 0,
                    "rate": 0,
                    "_id": "59804dbe51e79f04005ba81f",
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59a92a7166e4270400784f0f"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59d0b74cd38aac0400a766d4"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59f9958eb2c6dd0400a2e668"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a212220e533eb0400957ee6"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a55de88f5111f0b00f890a3"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a72de7830c693000b5e48c9"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a97c8b203a091000b675d1d"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ac0a744ff771d000b611fd1"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf061771bf9000b141322"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf061771bf9000b141323"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b389f7f7ed65e000be2a61f"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b617ed52614d20025b5ffd9"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b8a5cea46763d00254fad38"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bb1ea016ac6a10025b1c5ea"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bdac82db01fe10025b668c3"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c025500f54c71001c279165"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b335e0b0206001d17849e"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c5411e2ec9de500238191d4"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fbc87665250022a43915"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1da6f8e7d2400221db7eb"
                }
            ],
            "publicDescription": {
                "guestControls": {
                    "allowsSmoking": false,
                    "allowsPets": false,
                    "allowsInfants": true,
                    "allowsEvents": false,
                    "allowsChildren": true
                },
                "summary": "Amazingly situated Penthouse right in the heart of Jerusalem.\n\nIt's close to stores, restaurants and nightlife.\nIt's full of light with an extra large surrounding terrace, a private roof terrace and a jaccuzi pool !\n\nLuxuriously and tastefully finished with the finest amenities.\nFinished in a classical style. \nThoroughly modern and fully equipped Kosher Kitchens.\nSpectacular and breathtaking views from every direction.\n\nThe perfect location for a wonderful stay in Jerusalem!",
                "transit": "Nothing better than your 2 feet.\nYou can also explore Jerusalem by bike, an amazing experience.",
                "space": "1 super extra large living area with open kitchen and dining table seating 12.\n\n5 Large and Luxurious Bedrooms with plenty of closet space.\n4 bathrooms.\nGuest toilet.\nPrivate Parking.\nShabbat Elevator.\nKosher Vacation Flat.\n\nFully Equipped and Kosher Kitchen with 2 sinks, a large fridge, oven, stove, microwave and breakfast counter seating 4.\nEverything you will need!",
                "notes": "Cleaning and Housekeeping services are available on request.\n\nAll Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking.",
                "neighborhood": "Many Restaurants and Shopping options in the area, just at your doorstep.",
                "interactionWithGuests": "We are available at all times to make sure our guests have a memorable stay !",
                "access": "Private swimming pool on the roof with stunning views.\n\nPrivate Parking\n\nSynagogue right next to the building.",
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 4:00 PM"
            },
            "timezone": "Asia/Jerusalem",
            "preBooking": [],
            "customFields": [],
            "amenities": [
                "TV",
                "Cable TV",
                "Internet",
                "Wireless Internet",
                "Air conditioning",
                "Wheelchair accessible",
                "Swimming pool",
                "Free parking on premises",
                "Elevator",
                "Hot tub",
                "Buzzer/wireless intercom",
                "Heating",
                "Family/kid friendly",
                "Washer",
                "Dryer",
                "Smoke alarm",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Pool",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "instantBookable": {
                "visibility": "off",
                "enabled": false
            },
            "address": {
                "street": "Shamgar Street 10",
                "lat": 31.793001,
                "lng": 35.208534,
                "searchable": "Shamgar Street 10, Jerusalem, Jerusalem District 9446110, Israel",
                "full": "Shamgar Street 10, Jerusalem, Jerusalem District 9446110, Israel",
                "city": "Jerusalem",
                "state": "Jerusalem District",
                "country": "Israel",
                "zipcode": "9446110"
            },
            "tags": [
                "Israel"
            ],
            "propertyType": "Apartment",
            "importingPlatform": "airbnb",
            "accountId": "585a39dbe43900100017e9e8",
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278573827.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278573827.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_278573827.jpg",
                "caption": "What a generous living area"
            },
            "integrations": [],
            "pictures": [
                {
                    "_id": "5d09e2ca70d4f6003caa04f0",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278573827.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278573827.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278573827.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278573827.jpg",
                    "id": 278573827,
                    "sort": 1,
                    "caption": "What a generous living area"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04ef",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278578601.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278578601.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278578601.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278578601.jpg",
                    "id": 278578601,
                    "sort": 2,
                    "caption": "Your private pool with jacuzzi and swimming current"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04ee",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278595060.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278595060.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278595060.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278595060.jpg",
                    "id": 278595060,
                    "sort": 3,
                    "caption": "Pool by night"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04ed",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278576953.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278576953.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278576953.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278576953.jpg",
                    "id": 278576953,
                    "sort": 4,
                    "caption": "Pool on roof terrace with stunning views"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04ec",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278595096.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278595096.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278595096.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278595096.jpg",
                    "id": 278595096,
                    "sort": 5,
                    "caption": "Sunset over Jerusalem"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04eb",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278579262.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278579262.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278579262.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278579262.jpg",
                    "id": 278579262,
                    "sort": 6,
                    "caption": "What amazing views"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04ea",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278579338.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278579338.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278579338.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278579338.jpg",
                    "id": 278579338,
                    "sort": 7,
                    "caption": "Amazing rooftop 360 degrees views"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e9",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278581020.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278581020.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278581020.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278581020.jpg",
                    "id": 278581020,
                    "sort": 8,
                    "caption": "Above the world"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e8",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278583153.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278583153.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278583153.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278583153.jpg",
                    "id": 278583153,
                    "sort": 9,
                    "caption": "Fully equipped kosher kitchen"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e7",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278583242.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278583242.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278583242.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278583242.jpg",
                    "id": 278583242,
                    "sort": 10,
                    "caption": "Kitchen and breakfast terrace"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e6",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278583373.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278583373.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278583373.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278583373.jpg",
                    "id": 278583373,
                    "sort": 11,
                    "caption": "It has all you need"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e5",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278586913.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278586913.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278586913.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278586913.jpg",
                    "id": 278586913,
                    "sort": 12,
                    "caption": "Comfy living area"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e4",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278583376.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278583376.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278583376.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278583376.jpg",
                    "id": 278583376,
                    "sort": 13,
                    "caption": "dining for 12 with great views"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e3",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278590086.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278590086.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278590086.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278590086.jpg",
                    "id": 278590086,
                    "sort": 14,
                    "caption": "cozy terrace corner under sukka"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e2",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278583469.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278583469.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278583469.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278583469.jpg",
                    "id": 278583469,
                    "sort": 15,
                    "caption": "What's for dinner ? "
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e1",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278583687.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278583687.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278583687.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278583687.jpg",
                    "id": 278583687,
                    "sort": 16,
                    "caption": "Dining area and kitchen"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04e0",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278583796.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278583796.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278583796.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278583796.jpg",
                    "id": 278583796,
                    "sort": 17,
                    "caption": "Where do you want to sit ? "
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04df",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278587531.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278587531.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278587531.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278587531.jpg",
                    "id": 278587531,
                    "sort": 18,
                    "caption": "Kitchen and dining table"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04de",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278584425.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278584425.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278584425.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278584425.jpg",
                    "id": 278584425,
                    "sort": 19,
                    "caption": "Sukka by night"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04dd",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278588176.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278588176.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278588176.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278588176.jpg",
                    "id": 278588176,
                    "sort": 20,
                    "caption": "Look at these views from the private pool"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04dc",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278589706.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278589706.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278589706.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278589706.jpg",
                    "id": 278589706,
                    "sort": 21,
                    "caption": "Dining area"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04db",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278592913.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278592913.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278592913.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278592913.jpg",
                    "id": 278592913,
                    "sort": 22,
                    "caption": "Bedroom 1"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04da",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278590566.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278590566.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278590566.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278590566.jpg",
                    "id": 278590566,
                    "sort": 23,
                    "caption": "Bedroom 2"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d9",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278590940.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278590940.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278590940.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278590940.jpg",
                    "id": 278590940,
                    "sort": 24,
                    "caption": "Bedroom 3"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d8",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278593215.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278593215.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278593215.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278593215.jpg",
                    "id": 278593215,
                    "sort": 25,
                    "caption": "Bedroom 3 with dressing room"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d7",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278591277.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278591277.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278591277.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278591277.jpg",
                    "id": 278591277,
                    "sort": 26,
                    "caption": "Bedroom 4"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d6",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278593429.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278593429.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278593429.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278593429.jpg",
                    "id": 278593429,
                    "sort": 27,
                    "caption": "Bathroom 1"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d5",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278593714.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278593714.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278593714.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278593714.jpg",
                    "id": 278593714,
                    "sort": 28,
                    "caption": "Bathroom 2"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d4",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278593893.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278593893.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278593893.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278593893.jpg",
                    "id": 278593893,
                    "sort": 29,
                    "caption": "Views on Jerusalem"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d3",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278594112.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278594112.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278594112.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278594112.jpg",
                    "id": 278594112,
                    "sort": 30,
                    "caption": "Rooftop terrace"
                },
                {
                    "_id": "5d09e2ca70d4f6003caa04d2",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_278595009.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_278595009.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_278595009.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_278595009.jpg",
                    "id": 278595009,
                    "sort": 31,
                    "caption": "Tea time ? "
                }
            ],
            "lastSyncedAt": "2020-06-15T09:23:54.443Z",
            "bedType": "Real Bed",
            "bedrooms": 5,
            "title": "Amazing Penthouse with private Pool - roof terrace",
            "active": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "listingRooms": [
                {
                    "id": 5661781,
                    "roomNumber": 0,
                    "_id": "5b0968d57f0a743c4debeb98",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b0968d57f0a743c4debeb99"
                        }
                    ]
                },
                {
                    "id": 5661782,
                    "roomNumber": 1,
                    "_id": "5b0968d57f0a743c4debeb9a",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debeb9b"
                        }
                    ]
                },
                {
                    "id": 5661783,
                    "roomNumber": 2,
                    "_id": "5b0968d57f0a743c4debeb9c",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debeb9d"
                        }
                    ]
                },
                {
                    "id": 5661784,
                    "roomNumber": 3,
                    "_id": "5b0968d57f0a743c4debeb9e",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debeb9f"
                        }
                    ]
                },
                {
                    "id": 5661785,
                    "roomNumber": 4,
                    "_id": "5b0968d57f0a743c4debeba0",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debeba1"
                        }
                    ]
                },
                {
                    "id": 5661786,
                    "roomNumber": 5,
                    "_id": "5b0968d57f0a743c4debeba2",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "BUNK_BED",
                            "_id": "5b0968d57f0a743c4debeba4"
                        },
                        {
                            "quantity": 1,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debeba3"
                        }
                    ]
                }
            ],
            "lastUpdatedAt": "2022-12-21T18:46:39.206Z",
            "owners": [],
            "taxes": [],
            "useAccountTaxes": true,
            "rentalUnitedHostPhone": "41794897021",
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "60c7571f38ad0c002eb8daef",
                        "formula": 145,
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED"
                    },
                    "lastUpdated": "2021-06-14T13:18:23.494Z"
                }
            },
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c50f52129400485cd8a4"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 1250,
                "basePriceUSD": 1201,
                "cleaningFee": 145,
                "currency": "USD",
                "guestsIncludedInRegularFee": 12,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "terms": {
                "minNights": 3,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:09.722Z"
            },
            "yieldManagement": {
                "rateStrategy": {
                    "_id": "62cd148bb8187d0035271783",
                    "name": "Sukkot 2022 | Jerusalem"
                }
            },
            "accountTaxes": []
        },
        {
            "_id": "5ea7cfaa1cc4350070392263",
            "SaaS": {
                "autoRenew": true
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f3552f01ad65d002c2b7d45",
                        "formula": 0,
                        "valueType": "FIXED",
                        "multiplier": "PER_STAY"
                    }
                }
            },
            "address": {
                "full": "Safed, North District, Israel",
                "city": "Safed",
                "state": "North District",
                "country": "Israel",
                "lat": 32.964649,
                "lng": 35.495998,
                "searchable": "Safed, North District, Israel"
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 2
            },
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027156.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027156.jpg",
                "large": "//guestybookings.s3.amazonaws.com/images/large_999027156.jpg",
                "caption": ""
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125,
                "cancellation": "strict_14_with_grace_period"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "extraPersonFee": 565,
                "basePrice": 1350,
                "basePriceUSD": 432,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 2,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": false,
                    "allowsInfants": false,
                    "allowsPets": false,
                    "allowsSmoking": true,
                    "allowsEvents": false
                },
                "space": "Guest access\nA large suite, one of five, with a hot tub and private garden overlooking a vast view of the Galilee.\nOur coffee lounge and reading lounge, complete with armchairs and books, are available day and night.\nA small but very nicely arranged swimming pool to sunbathe and get away from the heat during summer.\nThe Body and Soul therapy room – our villa's unique feature to make your holiday perfect with an extra touch of relaxation. Please ask us about the variety of massages and other body therapy options.\n\nOther things to note\nSmoking in the rooms and indoor areas is strictly prohibited.\nWe love animals, but do not accommodate them – sorry, no pets allowed.\nLighting fires, cooking or barbecuing in and around the villa is strictly prohibited.\nOur breakfast is completely vegan, healthy and kosher.\nOur swimming pool is too deep for children.\nSuites are cleaned and beds are made as of your third day, every other day.",
                "summary": "A private large romantic suite (1 of 5) with all amenities and a separate entrance, in a beautiful boutique resort, situated on Mount Canaan overlooking the Sea of Galilee and the Golan Heights.\n\nSpacious but cozy and comfortable, with a luxurious touch of elegance, a peaceful atmosphere and a stunning view of nature.\nOutside your suite you may enjoy our villa's coffee lounge, or sunbathe around our swimming pool.",
                "houseRules": "• Not suitable for children and infants\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM"
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:45:09.793Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:45:09.792Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:45:09.792Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:45:09.796Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel"
            ],
            "owners": [],
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Smoking allowed",
                "Hot tub",
                "Heating",
                "Smoke alarm",
                "First aid kit",
                "Fire extinguisher",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Laptop-friendly workspace",
                "Hot water",
                "Bed linens",
                "Extra pillows and blankets",
                "Patio or balcony",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Dryer",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Indoor fireplace",
                "Iron",
                "Kitchen",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Washer",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Family/kid friendly",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pets allowed",
                "Pocket wifi",
                "Private entrance",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Stair gates",
                "Step-free access",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "createdAt": "2020-04-28T06:39:38.620Z",
            "lastUpdatedAt": "2023-01-11T05:45:09.920Z",
            "integrations": [
                {
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "id": "43291942",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "extraPersonFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "_id": "5f3553f42f3aa400291b8ecf",
                            "guestsIncludedInRegularFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "basePrice": {
                                "channelSyncStatus": "IN_PROGRESS"
                            }
                        },
                        "promotions": []
                    },
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/43291942"
                }
            ],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "5ea7cfaa1cc4350070392278",
                    "id": 92912938,
                    "roomNumber": 1,
                    "beds": [
                        {
                            "_id": "5ea7cfaa1cc435007039227a",
                            "quantity": 1,
                            "type": "DOUBLE_BED"
                        },
                        {
                            "_id": "5ea7cfaa1cc4350070392279",
                            "quantity": 1,
                            "type": "FLOOR_MATTRESS"
                        }
                    ]
                },
                {
                    "_id": "5ea7cfaa1cc435007039227b",
                    "id": 92913597,
                    "roomNumber": 0,
                    "beds": []
                }
            ],
            "pictures": [
                {
                    "_id": "5ea7cfaa1cc4350070392276",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027156.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027156.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027156.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027156.jpg",
                    "id": "43291942_1563163015",
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc4350070392275",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027153.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027153.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027153.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027153.jpg",
                    "id": "43291942_1563163038",
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc4350070392274",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027154.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027154.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027154.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027154.jpg",
                    "id": "43291942_1563163062",
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc4350070392273",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027155.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027155.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027155.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027155.jpg",
                    "id": "43291942_1563163086",
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc4350070392272",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027157.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027157.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027157.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027157.jpg",
                    "id": "43291942_1563163118",
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc4350070392271",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027163.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027163.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027163.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027163.jpg",
                    "id": "43291942_1563163141",
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc4350070392270",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027152.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027152.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027152.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027152.jpg",
                    "id": "43291942_1563163161",
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc435007039226f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027159.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027159.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027159.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027159.jpg",
                    "id": "43291942_1563163189",
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc435007039226e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027158.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027158.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027158.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027158.jpg",
                    "id": "43291942_1563163219",
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc435007039226d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027162.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027162.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027162.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027162.jpg",
                    "id": "43291942_1563163247",
                    "sort": 10,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc435007039226c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027161.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027161.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027161.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027161.jpg",
                    "id": "43291942_1563163283",
                    "sort": 11,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc435007039226b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027160.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027160.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027160.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027160.jpg",
                    "id": "43291942_1563163307",
                    "sort": 12,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc435007039226a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027164.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027164.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027164.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027164.jpg",
                    "id": "43291942_1563163333",
                    "sort": 13,
                    "caption": ""
                },
                {
                    "_id": "5ea7cfaa1cc4350070392269",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_999027165.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_999027165.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_999027165.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_999027165.jpg",
                    "id": "43291942_1563163363",
                    "sort": 14,
                    "caption": ""
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-04-28T06:39:38.622Z",
            "occupancyStats": [],
            "accountId": "585a39dbe43900100017e9e8",
            "importingPlatform": "airbnb",
            "nickname": "Dory Tsfat Suite",
            "isListed": true,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5ea7cfaa1cc4350070392268"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "12:00",
            "title": "Amazing Suite with Galilee View",
            "timezone": "Asia/Jerusalem",
            "bedrooms": 1,
            "beds": 1,
            "propertyType": "Apartment",
            "roomType": "Private room",
            "bedType": "Real Bed",
            "accommodates": 3,
            "bathrooms": 1,
            "lastSyncedAt": "2020-06-15T09:26:03.143Z",
            "__v": 15,
            "defaultCheckInEndTime": null,
            "lastActivityAt": "2021-01-27T20:57:55.645Z",
            "otaRoomType": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:18.326Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5cad8a8e9a4a6d002d5f87d7",
            "lastSyncedAt": "2020-06-15T09:30:09.713Z",
            "bathrooms": 3.5,
            "accommodates": 15,
            "bedType": "Real Bed",
            "roomType": "Entire home/apt",
            "propertyType": "Villa",
            "beds": 6,
            "bedrooms": 6,
            "timezone": "Asia/Jerusalem",
            "title": "Amazing Villa in Caesarea Perfect for Families",
            "defaultCheckOutTime": "15:00",
            "defaultCheckInTime": "15:00",
            "isListed": false,
            "nickname": "Yonatan Caesarea",
            "importingPlatform": "airbnb",
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [],
            "preBooking": [],
            "importedAt": "2019-04-10T06:17:50.049Z",
            "offeredServices": [],
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-12-21T18:46:39.406Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-12-21T18:46:39.406Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-12-21T18:46:39.406Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-12-21T18:46:39.409Z"
            },
            "customFields": [],
            "active": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "useAccountMarkups": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountTaxes": true,
            "taxes": [],
            "ownerRevenueFormula": "net_income - pm_commission",
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "useAccountRevenueShare": true,
            "publicDescription": {
                "guestControls": {
                    "allowsEvents": false,
                    "allowsSmoking": false,
                    "allowsPets": false,
                    "allowsInfants": true,
                    "allowsChildren": true
                },
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "summary": "Very cozy 6 bedroom house in stunning Caesarea with an amazing back yard filled with trees and a super serine environment. Perfect for friends and families in the best location possible!",
                "space": "Comfy 6 Bedroom villa with a unique back yaed, relaxing atmosphere for a one of a kind family or friends getaway"
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "First aid kit",
                "Flat smooth pathway to front door",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Free parking on premises",
                "Heating",
                "Washer",
                "Dryer",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Hot water",
                "Bed linens",
                "Extra pillows and blankets",
                "Patio or balcony",
                "Garden or backyard",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "pictures": [
                {
                    "_id": "5d09e22670d4f6003ca9cbb8",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721551547.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721551547.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721551547.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721551547.jpg",
                    "id": 721551547,
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb7",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721549194.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721549194.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721549194.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721549194.jpg",
                    "id": 721549194,
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb6",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721549200.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721549200.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721549200.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721549200.jpg",
                    "id": 721549200,
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb5",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721550904.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721550904.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721550904.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721550904.jpg",
                    "id": 721550904,
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb4",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721549172.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721549172.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721549172.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721549172.jpg",
                    "id": 721549172,
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb3",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721549158.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721549158.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721549158.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721549158.jpg",
                    "id": 721549158,
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb2",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721549181.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721549181.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721549181.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721549181.jpg",
                    "id": 721549181,
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb1",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721550778.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721550778.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721550778.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721550778.jpg",
                    "id": 721550778,
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbb0",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721550793.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721550793.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721550793.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721550793.jpg",
                    "id": 721550793,
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbaf",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721550798.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721550798.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721550798.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721550798.jpg",
                    "id": 721550798,
                    "sort": 10,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbae",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721550867.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721550867.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721550867.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721550867.jpg",
                    "id": 721550867,
                    "sort": 11,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbad",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721551393.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721551393.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721551393.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721551393.jpg",
                    "id": 721551393,
                    "sort": 12,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbac",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721551409.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721551409.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721551409.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721551409.jpg",
                    "id": 721551409,
                    "sort": 13,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbab",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721551437.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721551437.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721551437.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721551437.jpg",
                    "id": 721551437,
                    "sort": 14,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cbaa",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721551501.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721551501.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721551501.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721551501.jpg",
                    "id": 721551501,
                    "sort": 15,
                    "caption": ""
                },
                {
                    "_id": "5d09e22670d4f6003ca9cba9",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721551964.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721551964.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_721551964.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_721551964.jpg",
                    "id": 721551964,
                    "sort": 16,
                    "caption": ""
                }
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_721551547.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_721551547.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_721551547.jpg",
                "caption": ""
            },
            "instantBookable": {
                "leadTime": 24,
                "visibility": "off",
                "enabled": false
            },
            "address": {
                "searchable": "Livne Street 33, Caesarea, Haifa District, Israel",
                "lng": 34.901775,
                "lat": 32.512753,
                "street": "Livne Street 33",
                "country": "Israel",
                "state": "Haifa District",
                "city": "Caesarea",
                "full": "Livne Street 33, Caesarea, Haifa District, Israel",
                "county": "Israel"
            },
            "listingRooms": [
                {
                    "id": 40216450,
                    "roomNumber": 4,
                    "_id": "5cad8a8e9a4a6d002d5f87e9",
                    "beds": []
                },
                {
                    "id": 40216451,
                    "roomNumber": 1,
                    "_id": "5cad8a8e9a4a6d002d5f87ea",
                    "beds": []
                },
                {
                    "id": 40216452,
                    "roomNumber": 6,
                    "_id": "5cad8a8e9a4a6d002d5f87eb",
                    "beds": []
                },
                {
                    "id": 40216453,
                    "roomNumber": 2,
                    "_id": "5cad8a8e9a4a6d002d5f87ec",
                    "beds": []
                },
                {
                    "id": 40216454,
                    "roomNumber": 5,
                    "_id": "5cad8a8e9a4a6d002d5f87ed",
                    "beds": []
                },
                {
                    "id": 40216455,
                    "roomNumber": 3,
                    "_id": "5cad8a8e9a4a6d002d5f87ee",
                    "beds": []
                },
                {
                    "id": 40216456,
                    "roomNumber": 0,
                    "_id": "5cad8a8e9a4a6d002d5f87ef",
                    "beds": []
                }
            ],
            "owners": [],
            "tags": [
                "Israel",
                "PM-Unknown",
                "PMC-Unknown",
                "Free-parking"
            ],
            "pendingTasks": [],
            "integrations": [],
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f15f6da67da88002d87cc0d",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 0
                    }
                }
            },
            "SaaS": {
                "autoRenew": true
            },
            "type": "SINGLE",
            "lastUpdatedAt": "2022-12-21T18:46:39.493Z",
            "createdAt": "2019-04-10T06:17:50.048Z",
            "__v": 95,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c4f552129400485c9063"
            },
            "lastActivityAt": "2021-01-27T21:26:08.395Z",
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 499,
                "basePriceUSD": 499,
                "currency": "USD",
                "extraPersonFee": 25,
                "guestsIncludedInRegularFee": 6
            },
            "terms": {
                "minNights": 3,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 1125
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:36.010Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5c88a20e729149003840b614",
            "lastSyncedAt": "2020-06-15T09:30:35.538Z",
            "bathrooms": 6,
            "accommodates": 14,
            "bedType": "Real Bed",
            "roomType": "Entire home/apt",
            "propertyType": "Villa",
            "beds": 7,
            "bedrooms": 7,
            "timezone": "Asia/Jerusalem",
            "title": "Amazing Villa in the Heart of Eilat",
            "defaultCheckOutTime": "11:00",
            "defaultCheckInTime": "15:00",
            "isListed": true,
            "nickname": "EIL001 Eti Shilav",
            "importingPlatform": "airbnb",
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [],
            "preBooking": [],
            "importedAt": "2019-03-13T06:24:14.017Z",
            "offeredServices": [],
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:38:46.905Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:38:46.904Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:38:46.904Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:38:46.908Z"
            },
            "customFields": [],
            "active": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "useAccountMarkups": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountTaxes": true,
            "taxes": [],
            "ownerRevenueFormula": "net_income - pm_commission",
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "useAccountRevenueShare": true,
            "publicDescription": {
                "guestControls": {
                    "allowsEvents": false,
                    "allowsSmoking": false,
                    "allowsPets": false,
                    "allowsInfants": true,
                    "allowsChildren": true
                },
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "summary": "This villa is a 7 bedroom stunning villa in the center of Eilat right next to the beach and main attractions! Something very special.. The villa contains a swimming pool and a large garden. If you want to move from dream to reality, this villa is for you! It's more than luxury, it's a haven of peace to all the guests and a unique place full of happiness and fully equipped with everything you will need for an amazing stay!",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Heating",
                "Washer",
                "Dryer",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Hot water",
                "Bed linens",
                "Extra pillows and blankets",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "pictures": [
                {
                    "_id": "5d09e24570d4f6003ca9da99",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_698948914.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_698948914.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_698948914.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_698948914.jpg",
                    "id": "33003263_1228865918",
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e386",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978685802.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978685802.jpg",
                    "id": "33003263_1228865930"
                },
                {
                    "_id": "5d09e24570d4f6003ca9da82",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_698949357.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_698949357.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_698949357.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_698949357.jpg",
                    "id": "33003263_1228865936",
                    "sort": 24,
                    "caption": ""
                },
                {
                    "_id": "5d09e24570d4f6003ca9da5a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_698951757.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_698951757.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_698951757.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_698951757.jpg",
                    "id": "33003263_1228865943",
                    "sort": 64,
                    "caption": ""
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e383",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978685833.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978685833.jpg",
                    "id": "33003263_1228865954"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e382",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978685867.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978685867.jpg",
                    "id": "33003263_1228865961"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e381",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978685916.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978685916.jpg",
                    "id": "33003263_1228865967"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e380",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978685939.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978685939.jpg",
                    "id": "33003263_1228865978"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e37f",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978685984.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978685984.jpg",
                    "id": "33003263_1228865995"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e37e",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686025.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686025.jpg",
                    "id": "33003263_1228866002"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e37d",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686052.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686052.jpg",
                    "id": "33003263_1228866011"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e37c",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686098.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686098.jpg",
                    "id": "33003263_1228866020"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e37b",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686138.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686138.jpg",
                    "id": "33003263_1228866027"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e37a",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686163.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686163.jpg",
                    "id": "33003263_1228866038"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e379",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686192.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686192.jpg",
                    "id": "33003263_1228866050"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e378",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686208.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686208.jpg",
                    "id": "33003263_1228866057"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e377",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686234.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686234.jpg",
                    "id": "33003263_1228866064"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e376",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686245.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686245.jpg",
                    "id": "33003263_1228866072"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e375",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686281.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686281.jpg",
                    "id": "33003263_1228866087"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e374",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686304.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686304.jpg",
                    "id": "33003263_1228866100"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e373",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686348.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686348.jpg",
                    "id": "33003263_1228866115"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e372",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686368.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686368.jpg",
                    "id": "33003263_1228866124"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e371",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686397.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686397.jpg",
                    "id": "33003263_1228866136"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e370",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686424.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686424.jpg",
                    "id": "33003263_1228866147"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e365",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686866.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686866.jpg",
                    "id": "33003263_1228866159"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e368",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686771.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686771.jpg",
                    "id": "33003263_1228866181"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e366",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686812.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686812.jpg",
                    "id": "33003263_1228866191"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e364",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686914.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686914.jpg",
                    "id": "33003263_1228866195"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e36d",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686584.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686584.jpg",
                    "id": "33003263_1228866205"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e36f",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686478.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686478.jpg",
                    "id": "33003263_1228866219"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e36e",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686524.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686524.jpg",
                    "id": "33003263_1228866225"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e36b",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686650.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686650.jpg",
                    "id": "33003263_1228866234"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e36a",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686705.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686705.jpg",
                    "id": "33003263_1228866242"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e36c",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686611.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686611.jpg",
                    "id": "33003263_1228866250"
                },
                {
                    "_id": "6103e1392d4dd6002e4d6df2",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1627644069/production/585a39dbe43900100017e9e8/wkbthipj4rc1nk5ytnbo.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1627644069/production/585a39dbe43900100017e9e8/wkbthipj4rc1nk5ytnbo.jpg",
                    "height": 1024,
                    "width": 768,
                    "size": 78153,
                    "id": "33003263_1228866258"
                },
                {
                    "_id": "6103e1392d4dd6002e4d6df1",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1627644069/production/585a39dbe43900100017e9e8/awxnvjmd8iwtkqpdrvtx.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1627644069/production/585a39dbe43900100017e9e8/awxnvjmd8iwtkqpdrvtx.jpg",
                    "height": 775,
                    "width": 1024,
                    "size": 52223,
                    "id": "33003263_1228866261"
                },
                {
                    "_id": "6103e1392d4dd6002e4d6df0",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1627644069/production/585a39dbe43900100017e9e8/j0io6plvrwrgor8qgggm.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1627644069/production/585a39dbe43900100017e9e8/j0io6plvrwrgor8qgggm.jpg",
                    "height": 1024,
                    "width": 768,
                    "size": 50809,
                    "id": "33003263_1228866271"
                },
                {
                    "_id": "6103e1392d4dd6002e4d6def",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1627644069/production/585a39dbe43900100017e9e8/yoccrnzxhbdksweyi9eb.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1627644069/production/585a39dbe43900100017e9e8/yoccrnzxhbdksweyi9eb.jpg",
                    "height": 608,
                    "width": 1024,
                    "size": 55538,
                    "id": "33003263_1228866275"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e35b",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978687133.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978687133.jpg",
                    "id": "33003263_1228866280"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e35c",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978687108.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978687108.jpg",
                    "id": "33003263_1228866287"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e361",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978687001.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978687001.jpg",
                    "id": "33003263_1228866294"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e369",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686746.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686746.jpg",
                    "id": "33003263_1228866308"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e35e",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978687060.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978687060.jpg",
                    "id": "33003263_1228866320"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e367",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686792.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686792.jpg",
                    "id": "33003263_1228866328"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e363",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686941.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686941.jpg",
                    "id": "33003263_1228866334"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e362",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978686982.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978686982.jpg",
                    "id": "33003263_1228866340"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e35d",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978687085.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978687085.jpg",
                    "id": "33003263_1228866350"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e360",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978687023.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978687023.jpg",
                    "id": "33003263_1228866359"
                },
                {
                    "_id": "5e5b9c3d44f8a5002950e35f",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_978687038.jpg",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_978687038.jpg",
                    "id": "33003263_1228866365"
                }
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_698948914.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_698948914.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_698948914.jpg",
                "caption": ""
            },
            "instantBookable": {
                "leadTime": 24,
                "visibility": "off",
                "enabled": false
            },
            "address": {
                "searchable": "Mish'ol Zayit 1, Eilat, South District, Israel",
                "lng": 34.93774,
                "lat": 29.549671,
                "street": "Mish'ol Zayit 1",
                "country": "Israel",
                "state": "South District",
                "city": "Eilat",
                "full": "Mish'ol Zayit 1, Eilat, South District, Israel"
            },
            "listingRooms": [
                {
                    "id": 38128825,
                    "roomNumber": 3,
                    "_id": "5c88a20e729149003840b659",
                    "beds": []
                },
                {
                    "id": 38128826,
                    "roomNumber": 2,
                    "_id": "5c88a20e729149003840b65a",
                    "beds": []
                },
                {
                    "id": 38128827,
                    "roomNumber": 0,
                    "_id": "5c88a20e729149003840b65b",
                    "beds": []
                },
                {
                    "id": 38128829,
                    "roomNumber": 5,
                    "_id": "5c88a20e729149003840b65c",
                    "beds": []
                },
                {
                    "id": 38128830,
                    "roomNumber": 6,
                    "_id": "5c88a20e729149003840b65d",
                    "beds": []
                },
                {
                    "id": 38128831,
                    "roomNumber": 4,
                    "_id": "5c88a20e729149003840b65e",
                    "beds": []
                },
                {
                    "id": 38128832,
                    "roomNumber": 1,
                    "_id": "5c88a20e729149003840b65f",
                    "beds": []
                },
                {
                    "id": 38128833,
                    "roomNumber": 7,
                    "_id": "5c88a20e729149003840b660",
                    "beds": []
                }
            ],
            "owners": [],
            "tags": [
                "Israel"
            ],
            "pendingTasks": [],
            "integrations": [
                {
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/33003263",
                    "bookingCom": {
                        "errors": [],
                        "acceptedCreditCards": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "promotions": [],
                        "id": "33003263",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": false
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "60e5a2c1eae523002daadd6b",
                            "basePrice": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "guestsIncludedInRegularFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            }
                        }
                    }
                }
            ],
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f43b93d79f02f002d2cbf5a",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 300
                    }
                }
            },
            "SaaS": {
                "autoRenew": true
            },
            "type": "SINGLE",
            "lastUpdatedAt": "2023-01-11T05:38:46.991Z",
            "createdAt": "2019-03-13T06:24:14.016Z",
            "__v": 125,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c4fc52129400485ca3eb"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 2330,
                "basePriceUSD": 1800,
                "cleaningFee": 300,
                "currency": "USD",
                "guestsIncludedInRegularFee": 14,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "terms": {
                "minNights": 5,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 1125
            },
            "useAccountAdditionalFees": true,
            "lastActivityAt": "2021-03-09T15:48:04.824Z",
            "otaRoomType": null,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:37.513Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5b57506bdab618005382f7ea",
            "lastSyncedAt": "2020-06-15T09:30:56.478Z",
            "bathrooms": 4.5,
            "accommodates": 14,
            "bedType": "Real Bed",
            "roomType": "Entire home/apt",
            "propertyType": "Villa",
            "beds": 9,
            "bedrooms": 6,
            "timezone": "Asia/Jerusalem",
            "title": "Amazing big villa with elevator and pool",
            "defaultCheckOutTime": "15:00",
            "defaultCheckInTime": "11:00",
            "isListed": true,
            "nickname": "CAE008 Meirav Itach",
            "importingPlatform": "airbnb",
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [
                {
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5717"
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5718"
                },
                {
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5719"
                },
                {
                    "month": "2018-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd571a"
                },
                {
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd571b"
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd571c"
                },
                {
                    "month": "2018-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd571d"
                },
                {
                    "month": "2018-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd571e"
                },
                {
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd571f"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5720"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5721"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5722"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5723"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5724"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5725"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5726"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5727"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5728"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd5729"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd572a"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd572b"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd572c"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd572d"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd572e"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c04f90fa194d8001cbd572f"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b34800b0206001d17b128"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c54133dec9de5002381bbd2"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fc6f7665250022a45f0a"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1db358e7d2400221ddb72"
                }
            ],
            "preBooking": [],
            "importedAt": "2018-07-24T16:14:35.242Z",
            "offeredServices": [],
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-12-21T18:46:37.658Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-12-21T18:46:37.657Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-12-21T18:46:37.657Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-12-21T18:46:37.669Z"
            },
            "customFields": [],
            "active": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "useAccountMarkups": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountTaxes": true,
            "taxes": [],
            "ownerRevenueFormula": "net_income - pm_commission",
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "useAccountRevenueShare": true,
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": false,
                    "allowsInfants": false,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "summary": "This magnificent and comfortable house boasts 6 large bedrooms - three of them with en suite bathrooms.",
                "houseRules": "• Not suitable for children and infants\r\n• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is flexible",
                "space": "In this Villa, we have a swimming pool and it is surrounded with one Gazebo, ready sun loungers and big umbrella. It has a modern kitchen with refrigerator and other kitchen equipments. It also has a billiard, television and balcony. A perfect holiday vacation is waiting for you, your friends and your family!"
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "Crib",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Iron",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Disabled parking spot",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pets allowed",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "amenities": [
                "TV",
                "Cable TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Elevator",
                "Free parking on street",
                "Heating",
                "Washer",
                "Dryer",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "Hangers",
                "Hair dryer",
                "Laptop-friendly workspace",
                "Private entrance",
                "Hot water",
                "Bed linens",
                "Microwave",
                "Refrigerator",
                "Dishwasher",
                "Oven",
                "BBQ grill",
                "Patio or balcony",
                "Garden or backyard",
                "Wide entrance for guests",
                "No stairs or steps to enter",
                "Wide entrance",
                "Wide doorway to guest bathroom",
                "Pool",
                "Free street parking",
                "Cooking basics",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "pictures": [
                {
                    "_id": "5d09e20970d4f6003ca9b3c0",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614180.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614180.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614180.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614180.jpg",
                    "id": 545614180,
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3bf",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614163.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614163.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614163.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614163.jpg",
                    "id": 545614163,
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3be",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614135.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614135.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614135.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614135.jpg",
                    "id": 545614135,
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3bd",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614127.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614127.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614127.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614127.jpg",
                    "id": 545614127,
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3bc",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614103.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614103.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614103.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614103.jpg",
                    "id": 545614103,
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3bb",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614140.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614140.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614140.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614140.jpg",
                    "id": 545614140,
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3ba",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614096.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614096.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614096.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614096.jpg",
                    "id": 545614096,
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b9",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614069.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614069.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614069.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614069.jpg",
                    "id": 545614069,
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b8",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614088.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614088.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614088.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614088.jpg",
                    "id": 545614088,
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b7",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614041.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614041.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614041.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614041.jpg",
                    "id": 545614041,
                    "sort": 10,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b6",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614057.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614057.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614057.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614057.jpg",
                    "id": 545614057,
                    "sort": 11,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b5",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614058.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614058.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614058.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614058.jpg",
                    "id": 545614058,
                    "sort": 12,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b4",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614059.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614059.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614059.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614059.jpg",
                    "id": 545614059,
                    "sort": 13,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b3",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614063.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614063.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614063.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614063.jpg",
                    "id": 545614063,
                    "sort": 14,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b2",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614099.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614099.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614099.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614099.jpg",
                    "id": 545614099,
                    "sort": 15,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b1",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614075.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614075.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614075.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614075.jpg",
                    "id": 545614075,
                    "sort": 16,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3b0",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614083.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614083.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614083.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614083.jpg",
                    "id": 545614083,
                    "sort": 17,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3af",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614087.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614087.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614087.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614087.jpg",
                    "id": 545614087,
                    "sort": 18,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3ae",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614089.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614089.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614089.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614089.jpg",
                    "id": 545614089,
                    "sort": 19,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3ad",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614090.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614090.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614090.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614090.jpg",
                    "id": 545614090,
                    "sort": 20,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3ac",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614091.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614091.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614091.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614091.jpg",
                    "id": 545614091,
                    "sort": 21,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3ab",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614081.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614081.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614081.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614081.jpg",
                    "id": 545614081,
                    "sort": 22,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3aa",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614101.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614101.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614101.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614101.jpg",
                    "id": 545614101,
                    "sort": 23,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a9",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614013.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614013.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614013.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614013.jpg",
                    "id": 545614013,
                    "sort": 24,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a8",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614104.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614104.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614104.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614104.jpg",
                    "id": 545614104,
                    "sort": 25,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a7",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614106.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614106.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614106.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614106.jpg",
                    "id": 545614106,
                    "sort": 26,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a6",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614108.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614108.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614108.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614108.jpg",
                    "id": 545614108,
                    "sort": 27,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a5",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614112.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614112.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614112.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614112.jpg",
                    "id": 545614112,
                    "sort": 28,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a4",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614113.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614113.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614113.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614113.jpg",
                    "id": 545614113,
                    "sort": 29,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a3",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614117.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614117.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614117.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614117.jpg",
                    "id": 545614117,
                    "sort": 30,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a2",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614118.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614118.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614118.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614118.jpg",
                    "id": 545614118,
                    "sort": 31,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a1",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614130.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614130.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614130.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614130.jpg",
                    "id": 545614130,
                    "sort": 32,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b3a0",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614133.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614133.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614133.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614133.jpg",
                    "id": 545614133,
                    "sort": 33,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b39f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614146.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614146.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614146.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614146.jpg",
                    "id": 545614146,
                    "sort": 34,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b39e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614149.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614149.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614149.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614149.jpg",
                    "id": 545614149,
                    "sort": 35,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b39d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614150.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614150.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614150.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614150.jpg",
                    "id": 545614150,
                    "sort": 36,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b39c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614157.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614157.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614157.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614157.jpg",
                    "id": 545614157,
                    "sort": 37,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b39b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614165.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614165.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614165.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614165.jpg",
                    "id": 545614165,
                    "sort": 38,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b39a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614168.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614168.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614168.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614168.jpg",
                    "id": 545614168,
                    "sort": 39,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b399",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614171.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614171.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614171.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614171.jpg",
                    "id": 545614171,
                    "sort": 40,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b398",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614179.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614179.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614179.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614179.jpg",
                    "id": 545614179,
                    "sort": 41,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b397",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614182.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614182.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614182.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614182.jpg",
                    "id": 545614182,
                    "sort": 42,
                    "caption": ""
                },
                {
                    "_id": "5d09e20970d4f6003ca9b396",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614192.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614192.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_545614192.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_545614192.jpg",
                    "id": 545614192,
                    "sort": 43,
                    "caption": ""
                }
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_545614180.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_545614180.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_545614180.jpg",
                "caption": ""
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 24
            },
            "address": {
                "full": "Shoham St 17, Caesarea, Israel",
                "city": "Caesarea",
                "country": "Israel",
                "street": "Shoham Street 17",
                "lat": 32.4886256,
                "lng": 34.9068842,
                "searchable": "שוהם 17 קיסריה, קיסריה, Israel",
                "state": "Haifa District"
            },
            "listingRooms": [
                {
                    "id": 23721720,
                    "roomNumber": 2,
                    "_id": "5b57506bdab618005382f817",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b57506bdab618005382f818"
                        }
                    ]
                },
                {
                    "id": 23721721,
                    "roomNumber": 5,
                    "_id": "5b57506bdab618005382f819",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b57506bdab618005382f81a"
                        }
                    ]
                },
                {
                    "id": 23721722,
                    "roomNumber": 0,
                    "_id": "5b57506bdab618005382f81b",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SOFA_BED",
                            "_id": "5b57506bdab618005382f81c"
                        }
                    ]
                },
                {
                    "id": 23721723,
                    "roomNumber": 4,
                    "_id": "5b57506bdab618005382f81d",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b57506bdab618005382f81f"
                        },
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b57506bdab618005382f81e"
                        }
                    ]
                },
                {
                    "id": 23721724,
                    "roomNumber": 6,
                    "_id": "5b57506bdab618005382f820",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b57506bdab618005382f821"
                        }
                    ]
                },
                {
                    "id": 23721725,
                    "roomNumber": 3,
                    "_id": "5b57506bdab618005382f822",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b57506bdab618005382f823"
                        }
                    ]
                },
                {
                    "id": 23721726,
                    "roomNumber": 1,
                    "_id": "5b57506bdab618005382f824",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "KING_BED",
                            "_id": "5b57506bdab618005382f825"
                        }
                    ]
                }
            ],
            "owners": [],
            "tags": [
                "Israel"
            ],
            "pendingTasks": [],
            "integrations": [],
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f19ba1915544e002dbfbbd6",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 650
                    }
                }
            },
            "SaaS": {
                "autoRenew": true
            },
            "lastUpdatedAt": "2022-12-21T18:46:38.050Z",
            "createdAt": "2018-07-24T16:14:35.241Z",
            "__v": 355,
            "lastActivityAt": "2021-01-27T21:45:40.936Z",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c50f52129400485cd7a1"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 6900,
                "basePriceUSD": 1985,
                "cleaningFee": 650,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 1,
                "securityDepositFee": 3000
            },
            "terms": {
                "minNights": 5,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 60
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:42.562Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5a84164c02f8210039f11d23",
            "lastSyncedAt": "2020-06-15T09:23:31.989Z",
            "bathrooms": 6,
            "accommodates": 16,
            "bedType": "Real Bed",
            "roomType": "Entire home/apt",
            "propertyType": "Villa",
            "beds": 10,
            "bedrooms": 8,
            "timezone": "Asia/Jerusalem",
            "title": "Amazing villa with fenced pool, garden & playground",
            "defaultCheckOutTime": "11:00",
            "defaultCheckInTime": "15:00",
            "isListed": true,
            "nickname": "CAE005 Tami",
            "importingPlatform": "airbnb",
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [
                {
                    "month": "2017-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145617"
                },
                {
                    "month": "2017-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145618"
                },
                {
                    "month": "2017-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145619"
                },
                {
                    "month": "2017-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14561a"
                },
                {
                    "month": "2017-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14561b"
                },
                {
                    "month": "2017-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14561c"
                },
                {
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14561d"
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14561e"
                },
                {
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14561f"
                },
                {
                    "month": "2018-03",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145620"
                },
                {
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145621"
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145622"
                },
                {
                    "month": "2018-06",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145623"
                },
                {
                    "month": "2018-07",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145624"
                },
                {
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145625"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145626"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145627"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145628"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b145629"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14562a"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14562b"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14562c"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14562d"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14562e"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf1ff771bf9000b14562f"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b38a0297ed65e000be2bfe9"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b6180382614d20025b61b73"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b8a5dd946763d00254fc6d6"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bb1eb106ac6a10025b1dea5"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bdac8b1b01fe10025b67d69"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c0255a6f54c71001c27a614"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b33ec0b0206001d17983a"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c541290ec9de5002381a349"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fc217665250022a449ba"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1dad98e7d2400221dc761"
                }
            ],
            "preBooking": [],
            "importedAt": "2018-02-14T10:58:20.638Z",
            "offeredServices": [],
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:36:07.244Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:36:07.243Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:36:07.243Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:36:07.248Z"
            },
            "customFields": [],
            "active": true,
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": [],
                        "active": true
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "useAccountTaxes": true,
            "taxes": [],
            "publicDescription": {
                "guestControls": {
                    "allowsEvents": false,
                    "allowsSmoking": false,
                    "allowsPets": true,
                    "allowsInfants": true,
                    "allowsChildren": true
                },
                "houseRules": "• No smoking\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "summary": "amazing big villa with private and great garden and swimming pool.\nThe villa offers 8 Bedrooms and 6 bathrooms. suitable for families\nThe villa have a view to the sea and place in one of the most luxurious resort in israel.\nthe neighberhood surrounded by ancient roman ruins when you can tour, restruants, and golf course!",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\n \n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "amenitiesNotIncluded": [
                "Bathtub",
                "Bed linens",
                "Cable TV",
                "Dishwasher",
                "Elevator",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "Heating",
                "High chair",
                "Hot tub",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Disabled parking spot",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Gym",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pocket wifi",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "amenities": [
                "TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Pets allowed",
                "Indoor fireplace",
                "Family/kid friendly",
                "Washer",
                "Dryer",
                "First aid kit",
                "Fire extinguisher",
                "Essentials",
                "Shampoo",
                "Lock on bedroom door",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Private entrance",
                "Crib",
                "Microwave",
                "Refrigerator",
                "Oven",
                "BBQ grill",
                "Patio or balcony",
                "Garden or backyard",
                "Beach essentials",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Pool",
                "Cooking basics",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "pictures": [
                {
                    "_id": "5d09e27a70d4f6003ca9e5ad",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448243550.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448243550.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448243550.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448243550.jpg",
                    "id": "23264134_1036603344",
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5ac",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448348769.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448348769.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448348769.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448348769.jpg",
                    "id": "23264134_1036603388",
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5ab",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448348833.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448348833.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448348833.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448348833.jpg",
                    "id": "23264134_1036603462",
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5aa",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448243536.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448243536.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448243536.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448243536.jpg",
                    "id": "23264134_1036603552",
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5a9",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448243436.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448243436.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448243436.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448243436.jpg",
                    "id": "23264134_1036603612",
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5a8",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448243488.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448243488.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448243488.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448243488.jpg",
                    "id": "23264134_1036603671",
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "6089789f52ee1a002e6d9e99",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621987/production/585a39dbe43900100017e9e8/gfxqsxmbhcdzkzcfwumb.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621987/production/585a39dbe43900100017e9e8/gfxqsxmbhcdzkzcfwumb.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 160993,
                    "id": "23264134_1563150796"
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5a7",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448243519.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448243519.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448243519.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448243519.jpg",
                    "id": "23264134_1036603763",
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5a6",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448243559.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448243559.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448243559.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448243559.jpg",
                    "id": "23264134_1036603847",
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5a5",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448348830.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448348830.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448348830.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448348830.jpg",
                    "id": "23264134_1036603897",
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e5a4",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448349196.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448349196.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_448349196.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_448349196.jpg",
                    "id": "23264134_1036603987",
                    "sort": 10,
                    "caption": ""
                },
                {
                    "_id": "5f0b70ef75543f002ca8d00d",
                    "original": "https://cdn.filepicker.io/api/file/BVohPTv7R2a6OuAR67Bn",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/BVohPTv7R2a6OuAR67Bn",
                    "id": "23264134_1036604062"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e93",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621987/production/585a39dbe43900100017e9e8/oujbs1ihwzlvjvv8iabe.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621987/production/585a39dbe43900100017e9e8/oujbs1ihwzlvjvv8iabe.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 202791,
                    "id": "23264134_1563150828"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e92",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621987/production/585a39dbe43900100017e9e8/cerxcibro7rz3bnrsi6m.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621987/production/585a39dbe43900100017e9e8/cerxcibro7rz3bnrsi6m.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 108931,
                    "id": "23264134_1563150868"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e91",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621987/production/585a39dbe43900100017e9e8/brivjmgmqtd02gbvcgxo.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621987/production/585a39dbe43900100017e9e8/brivjmgmqtd02gbvcgxo.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 164116,
                    "id": "23264134_1563150898"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e90",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621988/production/585a39dbe43900100017e9e8/faf053khztzbm4sp4atc.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621988/production/585a39dbe43900100017e9e8/faf053khztzbm4sp4atc.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 144895,
                    "id": "23264134_1563150947"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d00c",
                    "original": "https://cdn.filepicker.io/api/file/QCVohqiSR6WVSzPFE4Bl",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/QCVohqiSR6WVSzPFE4Bl",
                    "id": "23264134_1036604134"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d00b",
                    "original": "https://cdn.filepicker.io/api/file/qWDwAtMAQqdMWXqqS0kA",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/qWDwAtMAQqdMWXqqS0kA",
                    "id": "23264134_1036604176"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d00a",
                    "original": "https://cdn.filepicker.io/api/file/BqwsT27HQumvIb1nuGED",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/BqwsT27HQumvIb1nuGED",
                    "id": "23264134_1036604224"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e8c",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621988/production/585a39dbe43900100017e9e8/wfswkz7gyifecm9jq74h.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621988/production/585a39dbe43900100017e9e8/wfswkz7gyifecm9jq74h.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 173779,
                    "id": "23264134_1563150984"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e8b",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621988/production/585a39dbe43900100017e9e8/fwsucdtmdngdojjbfgen.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621988/production/585a39dbe43900100017e9e8/fwsucdtmdngdojjbfgen.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 102316,
                    "id": "23264134_1563151050"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e8a",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621987/production/585a39dbe43900100017e9e8/bdokw4asv9uunaicxyxh.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621987/production/585a39dbe43900100017e9e8/bdokw4asv9uunaicxyxh.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 98291,
                    "id": "23264134_1563151076"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d007",
                    "original": "https://cdn.filepicker.io/api/file/oA25DhwGRO61aHZgfgTn",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/oA25DhwGRO61aHZgfgTn",
                    "id": "23264134_1036604341"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d009",
                    "original": "https://cdn.filepicker.io/api/file/OPyixqjeSTqgYhBZzECr",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/OPyixqjeSTqgYhBZzECr",
                    "id": "23264134_1036604270"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d008",
                    "original": "https://cdn.filepicker.io/api/file/6phL8FpwTOWeZsrikG9f",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/6phL8FpwTOWeZsrikG9f",
                    "id": "23264134_1036604299"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d006",
                    "original": "https://cdn.filepicker.io/api/file/YVgzk79XRs2IfaaYtc5x",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/YVgzk79XRs2IfaaYtc5x",
                    "id": "23264134_1036604389"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d005",
                    "original": "https://cdn.filepicker.io/api/file/JWkjveNjRfuikHGzQRmr",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/JWkjveNjRfuikHGzQRmr",
                    "id": "23264134_1036604430"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d004",
                    "original": "https://cdn.filepicker.io/api/file/kAtvTUM7Rk641SS97qls",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/kAtvTUM7Rk641SS97qls",
                    "id": "23264134_1036604467"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d003",
                    "original": "https://cdn.filepicker.io/api/file/5ssIhX16Ts4KgcLvnpIS",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/5ssIhX16Ts4KgcLvnpIS",
                    "id": "23264134_1036604501"
                },
                {
                    "_id": "5f0b70ef75543f002ca8d002",
                    "original": "https://cdn.filepicker.io/api/file/M7sSqxxlQfG5ZViiOETg",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/M7sSqxxlQfG5ZViiOETg",
                    "id": "23264134_1036604528"
                },
                {
                    "_id": "6089789f52ee1a002e6d9e81",
                    "original": "https://res.cloudinary.com/guesty/image/upload/v1619621987/production/585a39dbe43900100017e9e8/vbjxqlygqehwftw95kds.jpg",
                    "thumbnail": "https://res.cloudinary.com/guesty/image/upload/c_fit,h_200/v1619621987/production/585a39dbe43900100017e9e8/vbjxqlygqehwftw95kds.jpg",
                    "height": 1200,
                    "width": 1600,
                    "size": 237354,
                    "id": "23264134_1563151109"
                }
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_448243550.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_448243550.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_448243550.jpg",
                "caption": ""
            },
            "instantBookable": {
                "visibility": "off",
                "enabled": false
            },
            "address": {
                "searchable": "Narkis Street 14, Caesarea, Haifa District, Israel",
                "lng": 34.906921,
                "lat": 32.521358,
                "street": "Narkis Street 14",
                "country": "Israel",
                "state": "Haifa District",
                "city": "Caesarea",
                "full": "Narkis Street 14, Caesarea, Haifa District, Israel"
            },
            "listingRooms": [
                {
                    "id": 16137534,
                    "roomNumber": 1,
                    "_id": "5b0968df7f0a743c4dec02f2",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b0968df7f0a743c4dec02f3"
                        }
                    ]
                },
                {
                    "id": 16137535,
                    "roomNumber": 2,
                    "_id": "5b0968df7f0a743c4dec02f4",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968df7f0a743c4dec02f5"
                        }
                    ]
                },
                {
                    "id": 16137536,
                    "roomNumber": 0,
                    "_id": "5b0968df7f0a743c4dec02f6",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SOFA_BED",
                            "_id": "5b0968df7f0a743c4dec02f7"
                        }
                    ]
                },
                {
                    "id": 16137537,
                    "roomNumber": 3,
                    "_id": "5b0968df7f0a743c4dec02f8",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968df7f0a743c4dec02f9"
                        }
                    ]
                },
                {
                    "id": 16137538,
                    "roomNumber": 4,
                    "_id": "5b0968df7f0a743c4dec02fa",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968df7f0a743c4dec02fb"
                        }
                    ]
                },
                {
                    "id": 16137539,
                    "roomNumber": 5,
                    "_id": "5b0968df7f0a743c4dec02fc",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968df7f0a743c4dec02fd"
                        }
                    ]
                },
                {
                    "id": 16137540,
                    "roomNumber": 6,
                    "_id": "5b0968df7f0a743c4dec02fe",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968df7f0a743c4dec02ff"
                        }
                    ]
                },
                {
                    "id": 16137541,
                    "roomNumber": 7,
                    "_id": "5b0968df7f0a743c4dec0300",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "DOUBLE_BED",
                            "_id": "5b0968df7f0a743c4dec0301"
                        }
                    ]
                },
                {
                    "id": 16137542,
                    "roomNumber": 8,
                    "_id": "5b0968df7f0a743c4dec0302",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b0968df7f0a743c4dec0303"
                        }
                    ]
                }
            ],
            "owners": [],
            "tags": [
                "Israel"
            ],
            "pendingTasks": [
                {
                    "_id": "5f43b94179f02f002d2cbf80",
                    "mqId": "d8765188-35f1-48f8-8711-20bcb05f3427",
                    "platform": "rentalsUnited",
                    "description": "Update listing",
                    "createdAt": "2020-08-24T12:57:37.524Z",
                    "error": "Smaller in LongStay element cannot be greater than 180."
                }
            ],
            "integrations": [
                {
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/23264134",
                    "bookingCom": {
                        "errors": [],
                        "acceptedCreditCards": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "id": "23264134",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 0,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "6040a4ed3af84f0032d79424",
                            "extraPersonFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "basePrice": {
                                "channelSyncStatus": "IN_PROGRESS"
                            }
                        },
                        "promotions": []
                    }
                }
            ],
            "SaaS": {
                "autoRenew": true
            },
            "lastUpdatedAt": "2023-01-11T05:36:07.443Z",
            "createdAt": "2018-02-14T10:58:20.634Z",
            "__v": 501,
            "lastActivityAt": "2021-05-04T15:58:53.984Z",
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f0b709a75543f002ca8ceca",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 1000
                    }
                }
            },
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c50452129400485cbb92"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 5000,
                "basePriceUSD": 1438,
                "cleaningFee": 1000,
                "currency": "ILS",
                "extraPersonFee": 150,
                "guestsIncludedInRegularFee": 10,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "terms": {
                "minNights": 3,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "otaRoomType": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:55:46.323Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5975cd996af7df0400115149",
            "defaultCheckOutTime": "15:00",
            "isListed": false,
            "nickname": "JER006 Noam 205 King",
            "importingPlatform": "airbnb",
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2022-12-21T18:46:40.043Z"
                },
                "bookingWindow": {
                    "updatedAt": "2022-12-21T18:46:40.042Z"
                },
                "preparationTime": {
                    "updatedAt": "2022-12-21T18:46:40.043Z"
                },
                "weekendMinNights": 2,
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2022-12-21T18:46:40.046Z"
            },
            "amenities": [
                "TV",
                "Wireless Internet",
                "Air conditioning",
                "Swimming pool",
                "Free parking on premises",
                "Gym",
                "Elevator",
                "Heating",
                "Washer",
                "Dryer",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop-friendly workspace",
                "Suitable for children (2-12 years)",
                "Suitable for infants (under 2 years)",
                "Pool",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "roomType": "Entire home/apt",
            "beds": 6,
            "pictures": [
                {
                    "_id": "5d09e27a70d4f6003ca9e591",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347263988.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347263988.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347263988.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347263988.jpg",
                    "id": 347263988,
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e590",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347263625.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347263625.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347263625.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347263625.jpg",
                    "id": 347263625,
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e58f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347263636.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347263636.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347263636.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347263636.jpg",
                    "id": 347263636,
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e58e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347263639.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347263639.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347263639.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347263639.jpg",
                    "id": 347263639,
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e58d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347263990.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347263990.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347263990.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347263990.jpg",
                    "id": 347263990,
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e58c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347263993.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347263993.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347263993.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347263993.jpg",
                    "id": 347263993,
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e58b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347264179.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347264179.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347264179.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347264179.jpg",
                    "id": 347264179,
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e58a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347264183.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347264183.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_347264183.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_347264183.jpg",
                    "id": 347264183,
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e589",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_658119460.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_658119460.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_658119460.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_658119460.jpg",
                    "id": 658119460,
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5d09e27a70d4f6003ca9e588",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_658119532.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/listings/regular_658119532.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/listings/large_658119532.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/listings/original_658119532.jpg",
                    "id": 658119532,
                    "sort": 10,
                    "caption": ""
                }
            ],
            "integrations": [],
            "customFields": [],
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 55
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        }
                    },
                    "hooks": {
                        "ignoredHooks": [],
                        "active": true
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": false
            },
            "title": "An amazing Flat with Hotel facilities in Mamilla",
            "offeredServices": [],
            "bedrooms": 4,
            "defaultCheckInTime": "15:00",
            "publicDescription": {
                "guestControls": {
                    "allowsSmoking": false,
                    "allowsPets": false,
                    "allowsInfants": true,
                    "allowsEvents": false,
                    "allowsChildren": true
                },
                "summary": "Located in the new City center near Mamilla is the King David Residence building, close to the Mamilla Mall and Ben Yehuda - The Old City & The Kotel.\n\nThe apartment is close to the first train station and Emek Refaim. It has a balcony (10m2)  showing King David street and it has a large living room, dining room table and fully equipped kosher kitchen. \n\nYou may enjoy indoor pool, parking, Andalusia garden, gym, sauna, cigar room and large lobby.\n\nIt offers cleaning and housekeeping services with extra charges.",
                "houseRules": "• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 3:00 PM",
                "space": "The flat has a balcony (10m2)  showing King David street and it has a large living room, dining room table and fully equipped kosher kitchen."
            },
            "createdAt": "2017-07-24T10:36:09.632Z",
            "lastActivityAt": "2021-01-27T21:52:29.254Z",
            "bathrooms": 2.5,
            "propertyType": "Apartment",
            "timezone": "Asia/Jerusalem",
            "accountId": "585a39dbe43900100017e9e8",
            "occupancyStats": [
                {
                    "month": "2016-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa0"
                },
                {
                    "month": "2016-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa1"
                },
                {
                    "month": "2016-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa2"
                },
                {
                    "month": "2016-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa3"
                },
                {
                    "month": "2016-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa4"
                },
                {
                    "month": "2017-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa5"
                },
                {
                    "month": "2017-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa6"
                },
                {
                    "month": "2017-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa7"
                },
                {
                    "month": "2017-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa8"
                },
                {
                    "month": "2017-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfa9"
                },
                {
                    "month": "2017-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfaa"
                },
                {
                    "month": "2017-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfab"
                },
                {
                    "month": "2017-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfac"
                },
                {
                    "month": "2017-09",
                    "available": 22,
                    "unavailable": 8,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfad"
                },
                {
                    "month": "2017-10",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfae"
                },
                {
                    "month": "2017-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfaf"
                },
                {
                    "month": "2017-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb0"
                },
                {
                    "month": "2018-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb1"
                },
                {
                    "month": "2018-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb2"
                },
                {
                    "month": "2018-03",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb3"
                },
                {
                    "month": "2018-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb4"
                },
                {
                    "month": "2018-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb5"
                },
                {
                    "month": "2018-06",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb6"
                },
                {
                    "month": "2018-07",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb7"
                },
                {
                    "month": "2018-08",
                    "available": 28,
                    "unavailable": 3,
                    "booked": 0,
                    "rate": 0,
                    "_id": "599bfca0e3a01c0400cccfb8"
                },
                {
                    "month": "2018-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59a92b7366e4270400786364"
                },
                {
                    "month": "2018-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59d0b815d38aac0400a7774f"
                },
                {
                    "month": "2018-11",
                    "available": 29,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "59f99643b2c6dd0400a2f799"
                },
                {
                    "month": "2018-12",
                    "available": 30,
                    "unavailable": 1,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a2122c2e533eb0400958b4b"
                },
                {
                    "month": "2019-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a55df55f5111f0b00f890e1"
                },
                {
                    "month": "2019-02",
                    "available": 28,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a72deb730c693000b5e53c4"
                },
                {
                    "month": "2019-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5a97c8f603a091000b676706"
                },
                {
                    "month": "2019-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ac0a777ff771d000b612854"
                },
                {
                    "month": "2019-05",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf0c9771bf9000b1421ff"
                },
                {
                    "month": "2019-06",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b1cf0c9771bf9000b142200"
                },
                {
                    "month": "2019-07",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b389fb27ed65e000be2aca8"
                },
                {
                    "month": "2019-08",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b617f3c2614d20025b605ef"
                },
                {
                    "month": "2019-09",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5b8a5d1846763d00254fb35f"
                },
                {
                    "month": "2019-10",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bb1ea4c6ac6a10025b1cc28"
                },
                {
                    "month": "2019-11",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5bdac854b01fe10025b66de8"
                },
                {
                    "month": "2019-12",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c025531f54c71001c279640"
                },
                {
                    "month": "2020-01",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c2b33880b0206001d1789b1"
                },
                {
                    "month": "2020-02",
                    "available": 29,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c541213ec9de500238195d8"
                },
                {
                    "month": "2020-03",
                    "available": 31,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5c78fbdc7665250022a43d5a"
                },
                {
                    "month": "2020-04",
                    "available": 30,
                    "unavailable": 0,
                    "booked": 0,
                    "rate": 0,
                    "_id": "5ca1da808e7d2400221dbbb0"
                }
            ],
            "preBooking": [],
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "lastSyncedAt": "2020-06-15T09:23:52.777Z",
            "bedType": "Real Bed",
            "importedAt": "2017-07-24T10:36:09.634Z",
            "tags": [
                "Israel",
                "PM-Unknown",
                "PMC-Unknown",
                "Pool",
                "Free-parking",
                "Building-Elevator"
            ],
            "pendingTasks": [],
            "accommodates": 7,
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Cable TV",
                "Crib",
                "Coffee maker",
                "Dishwasher",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Microwave",
                "Oven",
                "Refrigerator",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private entrance",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for events",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/listings/thumbnail_347263988.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/listings/regular_347263988.jpg",
                "large": "//guestybookings.s3.amazonaws.com/listings/large_347263988.jpg",
                "caption": ""
            },
            "SaaS": {
                "autoRenew": true
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off"
            },
            "address": {
                "full": "King David 14, Jerusalem, Jerusalem District, Israel",
                "city": "Jerusalem",
                "state": "Jerusalem District",
                "country": "Israel",
                "street": "King David 14",
                "lat": 31.776346,
                "lng": 35.222202,
                "searchable": "King David 14, Jerusalem, Jerusalem District, Israel"
            },
            "__v": 689,
            "active": true,
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "listingRooms": [
                {
                    "id": 9421552,
                    "roomNumber": 0,
                    "_id": "5b0968d57f0a743c4debebee",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "SOFA_BED",
                            "_id": "5b0968d57f0a743c4debebef"
                        }
                    ]
                },
                {
                    "id": 9421553,
                    "roomNumber": 1,
                    "_id": "5b0968d57f0a743c4debebf0",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "QUEEN_BED",
                            "_id": "5b0968d57f0a743c4debebf1"
                        }
                    ]
                },
                {
                    "id": 9421554,
                    "roomNumber": 3,
                    "_id": "5b0968d57f0a743c4debebf2",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debebf3"
                        }
                    ]
                },
                {
                    "id": 9421555,
                    "roomNumber": 4,
                    "_id": "5b0968d57f0a743c4debebf4",
                    "beds": [
                        {
                            "quantity": 1,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debebf5"
                        }
                    ]
                },
                {
                    "id": 9421556,
                    "roomNumber": 2,
                    "_id": "5b0968d57f0a743c4debebf6",
                    "beds": [
                        {
                            "quantity": 2,
                            "type": "SINGLE_BED",
                            "_id": "5b0968d57f0a743c4debebf7"
                        }
                    ]
                }
            ],
            "lastUpdatedAt": "2022-12-21T18:46:40.191Z",
            "owners": [],
            "taxes": [],
            "useAccountTaxes": true,
            "rentalUnitedHostPhone": "41794897021",
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f311855a44cf40028ab0e04",
                        "multiplier": "PER_STAY",
                        "valueType": "FIXED",
                        "formula": 190
                    }
                }
            },
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "useAccountRevenueShare": true,
            "commissionFormula": "net_income",
            "netIncomeFormula": "host_payout",
            "ownerRevenueFormula": "net_income - pm_commission",
            "type": "SINGLE",
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5cb6c50452129400485cba1b"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 599,
                "basePriceUSD": 599,
                "cleaningFee": 190,
                "currency": "USD",
                "guestsIncludedInRegularFee": 1
            },
            "terms": {
                "minNights": 4,
                "cancellation": "strict_14_with_grace_period",
                "maxNights": 90
            },
            "useAccountAdditionalFees": true,
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-02T07:11:41.258Z"
            },
            "yieldManagement": {
                "rateStrategy": {
                    "_id": "62cd148bb8187d0035271783",
                    "name": "Sukkot 2022 | Jerusalem"
                }
            },
            "accountTaxes": []
        },
        {
            "_id": "5e3fdd6e2e90cf0078c4dc2e",
            "SaaS": {
                "autoRenew": true
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f311855a44cf40028ab0e25",
                        "formula": 0,
                        "valueType": "FIXED",
                        "multiplier": "PER_STAY"
                    }
                }
            },
            "address": {
                "full": "Tel Aviv-Yafo, Tel Aviv District, Israel",
                "city": "Tel Aviv-Yafo",
                "state": "Tel Aviv District",
                "country": "Israel",
                "lat": 32.064426,
                "lng": 34.772243,
                "searchable": "Tel Aviv-Yafo, Tel Aviv District, Israel",
                "neighborhood": "Lev HaIr"
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 2
            },
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055249.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055249.jpg",
                "large": "//guestybookings.s3.amazonaws.com/images/large_965055249.jpg",
                "caption": ""
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125,
                "cancellation": "strict_14_with_grace_period"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 9755,
                "basePriceUSD": 928,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 6,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": false,
                    "allowsInfants": false,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "space": "Spread across two floors, apartment 1 measures a total of 247 square meters (m2) with 3.5 meter high ceilings. The upper floor spans 122 m2, with a garden of 55 m2 and terrace of 3 m2. The lower floor measures 125 m2 and has an English garden of 30 m2.",
                "summary": "Located on the ground floor, apartment 1 features charming, English-inspired courtyards, wide staircases, high ceilings and plenty of natural light. The warm, interior design and spacious rooms within Apartment 1 create a homely feeling, where guests and families can feel at ease. A light, neutral color palette conveys the atmosphere similar to that of a breezy, summer villa, weighted with contemporary and sophisticated furnishings.",
                "houseRules": "• Not suitable for children and infants\r\n• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 2:00 PM",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    }
                },
                "rentalPeriods": []
            },
            "type": "SINGLE",
            "tags": [
                "Israel"
            ],
            "owners": [],
            "amenities": [
                "TV",
                "Wireless Internet",
                "Air conditioning",
                "Free parking on premises",
                "Heating",
                "Washer",
                "Dryer",
                "Shampoo",
                "Microwave",
                "Refrigerator",
                "Patio or balcony",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Cable TV",
                "Crib",
                "Dishwasher",
                "Elevator",
                "Essentials",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "Hair dryer",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Iron",
                "Kitchen",
                "Oven",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "First aid kit",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Hangers",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Pets allowed",
                "Pocket wifi",
                "Private entrance",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Suitable for events",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "createdAt": "2020-02-09T10:22:38.979Z",
            "lastUpdatedAt": "2022-09-19T09:05:22.640Z",
            "integrations": [
                {
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "initialComplexListing": false,
                        "publishCompanyLogo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "isPublishedCompanyInfo": false,
                        "taxInfo": []
                    },
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "id": "42152935",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_rates_and_availability",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "5e4d599760ebba0029fa8d7d",
                            "guestsIncludedInRegularFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "basePrice": {
                                "channelSyncStatus": "SUCCESS"
                            },
                            "currency": {
                                "channelSyncStatus": "SUCCESS"
                            }
                        },
                        "syncCategoryUpdatedAt": "2021-06-03T07:22:39.956Z",
                        "promotions": []
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/42152935"
                }
            ],
            "pendingTasks": [],
            "listingRooms": [],
            "pictures": [
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc3f",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055249.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055249.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055249.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055249.jpg",
                    "id": 965055249,
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc3e",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055238.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055238.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055238.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055238.jpg",
                    "id": 965055238,
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc3d",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055252.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055252.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055252.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055252.jpg",
                    "id": 965055252,
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc3c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055232.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055232.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055232.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055232.jpg",
                    "id": 965055232,
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc3b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055229.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055229.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055229.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055229.jpg",
                    "id": 965055229,
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc3a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055231.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055231.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055231.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055231.jpg",
                    "id": 965055231,
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc39",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055233.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055233.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055233.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055233.jpg",
                    "id": 965055233,
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc38",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055239.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055239.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055239.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055239.jpg",
                    "id": 965055239,
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc37",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055250.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055250.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055250.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055250.jpg",
                    "id": 965055250,
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc36",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055230.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055230.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055230.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055230.jpg",
                    "id": 965055230,
                    "sort": 10,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc35",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055251.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055251.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055251.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055251.jpg",
                    "id": 965055251,
                    "sort": 11,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6f2e90cf0078c4dc34",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965055253.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965055253.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965055253.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965055253.jpg",
                    "id": 965055253,
                    "sort": 12,
                    "caption": ""
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-02-09T10:22:38.981Z",
            "occupancyStats": [],
            "accountId": "585a39dbe43900100017e9e8",
            "importingPlatform": "airbnb",
            "nickname": "TLV002 Golan Embr 2",
            "isListed": true,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5e3fdd6f2e90cf0078c4dc33"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "11:00",
            "title": "Apartment 1 - The Premier",
            "timezone": "Asia/Jerusalem",
            "bedrooms": 3,
            "beds": 6,
            "propertyType": "Apartment",
            "roomType": "Entire home/apt",
            "bedType": "Real Bed",
            "accommodates": 6,
            "bathrooms": 3,
            "lastSyncedAt": "2020-06-15T09:28:15.059Z",
            "__v": 19,
            "lastActivityAt": "2021-01-27T21:48:44.433Z",
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2022-03-08T10:39:34.782Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5e3fdd6e2e90cf0078c4dc1e",
            "SaaS": {
                "autoRenew": true
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5ef344d4f93b1d002d698403",
                        "formula": 0,
                        "valueType": "FIXED",
                        "multiplier": "PER_STAY"
                    }
                }
            },
            "address": {
                "full": "Tel Aviv-Yafo, Tel Aviv District, Israel",
                "city": "Tel Aviv-Yafo",
                "state": "Tel Aviv District",
                "country": "Israel",
                "lat": 32.0853,
                "lng": 34.781769,
                "searchable": "Tel Aviv-Yafo, Tel Aviv District, Israel",
                "neighborhood": "Tzafon Yashan"
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 2
            },
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061589.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061589.jpg",
                "large": "//guestybookings.s3.amazonaws.com/images/large_965061589.jpg",
                "caption": ""
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125,
                "cancellation": "strict_14_with_grace_period"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 11039,
                "basePriceUSD": 3176,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 6,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": false,
                    "allowsInfants": false,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "space": "Spread across two floors, apartment 1 measures a total of 247 square meters (m2) with 3.5 meter high ceilings. The upper floor spans 122 m2, with a garden of 55 m2 and a terrace of 3 m2. The lower floor measures 125 m2 and has an English garden of 30 m2.",
                "summary": "Located on the ground floor, apartment 1 features charming, English-inspired courtyards, wide staircases, high ceilings and plenty of natural light. The warm, interior design and spacious rooms within Apartment 1 create a homely feeling, where guests and families can feel at ease. A light, neutral color palette conveys the atmosphere similar to that of a breezy, summer villa, weighted with contemporary and sophisticated furnishings.",
                "houseRules": "• Not suitable for children and infants\r\n• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 2:00 PM",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    },
                    "updatedAt": "2023-01-11T05:35:18.081Z"
                },
                "bookingWindow": {
                    "updatedAt": "2023-01-11T05:35:18.080Z"
                },
                "preparationTime": {
                    "updatedAt": "2023-01-11T05:35:18.080Z"
                },
                "rentalPeriods": [],
                "defaultAvailabilityUpdatedAt": "2023-01-11T05:35:18.083Z"
            },
            "type": "SINGLE",
            "tags": [
                "Israel",
                "PM-Golan",
                "PMC-972 54-454-9472",
                "Pool",
                "Steam-room",
                "Free-parking"
            ],
            "owners": [],
            "amenities": [
                "TV",
                "Wireless Internet",
                "Air conditioning",
                "Free parking on premises",
                "Heating",
                "Washer",
                "Dryer",
                "Microwave",
                "Refrigerator",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Cable TV",
                "Crib",
                "Dishwasher",
                "Elevator",
                "Essentials",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "Hair dryer",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Iron",
                "Kitchen",
                "Oven",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "First aid kit",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Hangers",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private entrance",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Shampoo",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Suitable for events",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "createdAt": "2020-02-09T10:22:38.907Z",
            "lastUpdatedAt": "2023-01-11T05:40:47.731Z",
            "integrations": [
                {
                    "airbnb2": {
                        "daysOfWeekMinimumNights": [],
                        "id": "42153218",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_all",
                        "status": "COMPLETED",
                        "financials": {
                            "guestsIncludedInRegularFee": {
                                "channelSyncStatus": "IN_PROGRESS"
                            },
                            "_id": "5e4d5cfaa7b50c0029ec0f60",
                            "basePrice": {
                                "channelSyncStatus": "SUCCESS"
                            },
                            "currency": {
                                "channelSyncStatus": "SUCCESS"
                            }
                        },
                        "promotions": []
                    },
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "taxInfo": [],
                        "initialComplexListing": false,
                        "isPublishedCompanyInfo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "publishCompanyLogo": false
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/42153218"
                }
            ],
            "pendingTasks": [],
            "listingRooms": [
                {
                    "_id": "63be4a964505b20066420032",
                    "roomNumber": 1,
                    "beds": [],
                    "id": 220365221
                }
            ],
            "pictures": [
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc2c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061589.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061589.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061589.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061589.jpg",
                    "id": "42153218_1024901481",
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc2b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061582.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061582.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061582.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061582.jpg",
                    "id": "42153218_1024901573",
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc2a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061594.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061594.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061594.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061594.jpg",
                    "id": "42153218_1024901678",
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc29",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061588.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061588.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061588.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061588.jpg",
                    "id": "42153218_1024901799",
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc28",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061586.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061586.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061586.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061586.jpg",
                    "id": "42153218_1024901935",
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc27",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061596.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061596.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061596.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061596.jpg",
                    "id": "42153218_1024902084",
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc26",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061601.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061601.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061601.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061601.jpg",
                    "id": "42153218_1024902211",
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc25",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061585.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061585.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061585.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061585.jpg",
                    "id": "42153218_1024902324",
                    "sort": 8,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc24",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965061597.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965061597.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965061597.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965061597.jpg",
                    "id": "42153218_1024902422",
                    "sort": 9,
                    "caption": ""
                },
                {
                    "_id": "5ef344d4f93b1d002d69841b",
                    "original": "https://cdn.filepicker.io/api/file/eK6dZVQGRLKS1hrsGoco",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/eK6dZVQGRLKS1hrsGoco",
                    "id": "42153218_1024902540"
                },
                {
                    "_id": "5ef344d4f93b1d002d69841a",
                    "original": "https://cdn.filepicker.io/api/file/hbVyTp0JTnG1v9crl99q",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/hbVyTp0JTnG1v9crl99q",
                    "id": "42153218_1024902664"
                },
                {
                    "_id": "5ef344d4f93b1d002d698419",
                    "original": "https://cdn.filepicker.io/api/file/a8A01jf6QOSjGmJWFsTS",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/a8A01jf6QOSjGmJWFsTS",
                    "id": "42153218_1024902767"
                },
                {
                    "_id": "5ef344d4f93b1d002d698418",
                    "original": "https://cdn.filepicker.io/api/file/n49x9Mj1S42vHUdsNfu1",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/n49x9Mj1S42vHUdsNfu1",
                    "id": "42153218_1024902833"
                },
                {
                    "_id": "5ef344d4f93b1d002d698417",
                    "original": "https://cdn.filepicker.io/api/file/S3JuWFCpQSexPYOCn71d",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/S3JuWFCpQSexPYOCn71d",
                    "id": "42153218_1024902897"
                },
                {
                    "_id": "5ef344d4f93b1d002d698416",
                    "original": "https://cdn.filepicker.io/api/file/PmXsKIyWTfmyAkZokqaU",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/PmXsKIyWTfmyAkZokqaU",
                    "id": "42153218_1024902948"
                },
                {
                    "_id": "5ef344d4f93b1d002d698415",
                    "original": "https://cdn.filepicker.io/api/file/Ewg1AkVnTHCD0hn2UmgF",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/Ewg1AkVnTHCD0hn2UmgF",
                    "id": "42153218_1024903014"
                },
                {
                    "_id": "5ef344d4f93b1d002d698414",
                    "original": "https://cdn.filepicker.io/api/file/XGKTrzodQhF09fXLjZQc",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/XGKTrzodQhF09fXLjZQc",
                    "id": "42153218_1024903079"
                },
                {
                    "_id": "5ef344d4f93b1d002d698413",
                    "original": "https://cdn.filepicker.io/api/file/qmMs3SGSSgiUXPdPAY5h",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/qmMs3SGSSgiUXPdPAY5h",
                    "id": "42153218_1024903137"
                },
                {
                    "_id": "5ef344d4f93b1d002d698412",
                    "original": "https://cdn.filepicker.io/api/file/LdJGcLScQCKjT7MeJt2n",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/LdJGcLScQCKjT7MeJt2n",
                    "id": "42153218_1024903194"
                },
                {
                    "_id": "5ef344d4f93b1d002d698411",
                    "original": "https://cdn.filepicker.io/api/file/H17JiBMQOOQ6aPNxgkuW",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/H17JiBMQOOQ6aPNxgkuW",
                    "id": "42153218_1024903240"
                },
                {
                    "_id": "5ef344d4f93b1d002d698410",
                    "original": "https://cdn.filepicker.io/api/file/eKF8sFnR5ihXCsmvdhrb",
                    "thumbnail": "https://cdn.filestackcontent.com/resize=height:200/eKF8sFnR5ihXCsmvdhrb",
                    "id": "42153218_1024903298"
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-02-09T10:22:38.912Z",
            "occupancyStats": [],
            "accountId": "585a39dbe43900100017e9e8",
            "importingPlatform": "airbnb",
            "nickname": "TLV003 Golan Embrac",
            "isListed": false,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5e3fdd6e2e90cf0078c4dc23"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "11:00",
            "title": "Apartment 2 - Charming One",
            "timezone": "Asia/Jerusalem",
            "bedrooms": 1,
            "beds": 3,
            "propertyType": "Apartment",
            "roomType": "Entire home/apt",
            "bedType": "Real Bed",
            "accommodates": 6,
            "bathrooms": 3,
            "lastSyncedAt": "2020-06-15T09:28:15.092Z",
            "__v": 24,
            "defaultCheckInEndTime": null,
            "lastActivityAt": "2021-01-27T21:30:20.273Z",
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:56:04.714Z"
            },
            "accountTaxes": []
        },
        {
            "_id": "5e3fdd6e2e90cf0078c4dc0f",
            "SaaS": {
                "autoRenew": true
            },
            "financials": {
                "cleaningFee": {
                    "value": {
                        "_id": "5f311858a44cf40028ab0e50",
                        "formula": 0,
                        "valueType": "FIXED",
                        "multiplier": "PER_STAY"
                    }
                }
            },
            "address": {
                "full": "Tel Aviv-Yafo, Tel Aviv District, Israel",
                "city": "Tel Aviv-Yafo",
                "state": "Tel Aviv District",
                "country": "Israel",
                "lat": 32.0853,
                "lng": 34.781769,
                "searchable": "Tel Aviv-Yafo, Tel Aviv District, Israel",
                "neighborhood": "Tzafon Yashan"
            },
            "instantBookable": {
                "enabled": false,
                "visibility": "off",
                "leadTime": 2
            },
            "picture": {
                "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082495.jpg",
                "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082495.jpg",
                "large": "//guestybookings.s3.amazonaws.com/images/large_965082495.jpg",
                "caption": ""
            },
            "terms": {
                "minNights": 3,
                "maxNights": 1125,
                "cancellation": "strict_14_with_grace_period"
            },
            "prices": {
                "monthlyPriceFactor": 1,
                "weeklyPriceFactor": 1,
                "basePrice": 2110,
                "basePriceUSD": 607,
                "currency": "ILS",
                "guestsIncludedInRegularFee": 1,
                "weekendBasePrice": null,
                "weekendDays": [
                    5,
                    6
                ]
            },
            "publicDescription": {
                "guestControls": {
                    "allowsChildren": false,
                    "allowsInfants": false,
                    "allowsPets": false,
                    "allowsSmoking": false,
                    "allowsEvents": false
                },
                "summary": "Inspired by rich, ART DECO style interiors, the first-floor apartments are distinguished by the lavish materials used throughout, such as marble and velvet. The original walls have been meticulously restored, exposing the raw, rough sandstone – a tremendous contrast to the added industrial design elements and clean, minimalist lighting.\n\nApartment 4 spans 120 m2 with 3.5 meter high ceilings, a front balcony measuring 4 m2 and rear balcony measuring 7 m2.",
                "houseRules": "• Not suitable for children and infants\r\n• No smoking\r\n• No pets\r\n• No parties or events\r\n• Check-in is anytime after 2:00 PM",
                "notes": "All Israeli citizens and holders of any other permit will be charged VAT at 17% (VAT rate may be changed without prior notice). Tourists (holders of diplomatic passport or foreign passport and a 3 month tourist visa - B2/3/4), are exempt from paying VAT on accommodations.\n\nIf applicable, the VAT will be collected separately by the Home Management Company after the booking."
            },
            "pms": {
                "automation": {
                    "answeringMachine": {
                        "confirmedBeforeCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckIn": {
                            "delayInMinutes": 45
                        },
                        "confirmedDayOfCheckOut": {
                            "delayInMinutes": 45
                        },
                        "confirmedDuringStay": {
                            "delayInMinutes": 45
                        },
                        "confirmedAfterCheckOut": {
                            "delayInMinutes": 45
                        },
                        "unconfirmedFirstMessage": {
                            "delayInMinutes": 1,
                            "active": true,
                            "message": "Hi there,\n\nThank you for your inquiry.\nI'll be right with you.\n\nCheers,\nMoriya"
                        },
                        "unconfirmedSubsequentMessage": {
                            "delayInMinutes": 45
                        },
                        "active": true
                    },
                    "hooks": {
                        "ignoredHooks": []
                    },
                    "calendarSmartRules": {
                        "blockListings": []
                    },
                    "autoReviews": {
                        "templates": []
                    },
                    "autoPricing": {
                        "rules": []
                    }
                },
                "tasks": {
                    "defaultTasks": []
                },
                "autoPayments": {
                    "policy": [
                        {
                            "scheduleTo": {
                                "timeRelation": {
                                    "relation": "AT",
                                    "unit": "HOURS",
                                    "amount": 1
                                },
                                "reservationEvent": "CHECK_IN"
                            },
                            "_id": "5da9e1c2761c4b0023af4048",
                            "chargeType": "REST_OF_PAYMENT",
                            "amount": 0,
                            "useGuestCard": true
                        }
                    ]
                },
                "active": true
            },
            "sales": {
                "salesService": {
                    "atPhones": []
                }
            },
            "receptionistsService": {
                "receptionDesk": {
                    "atPhones": [],
                    "ittt": []
                },
                "screening": {
                    "checklist": []
                }
            },
            "calendarRules": {
                "defaultAvailability": "AVAILABLE",
                "advanceNotice": {
                    "bookingCom": {
                        "isCutOffHoursEnabled": false
                    },
                    "expedia": {
                        "isCutOffHoursEnabled": false
                    },
                    "airbnb2": {
                        "isCutOffHoursEnabled": true
                    },
                    "directBookings": {
                        "isCutOffHoursEnabled": false
                    }
                },
                "rentalPeriods": []
            },
            "type": "SINGLE",
            "tags": [
                "Israel"
            ],
            "owners": [],
            "amenities": [
                "TV",
                "Wireless Internet",
                "Air conditioning",
                "Free parking on premises",
                "Heating",
                "Washer",
                "Dryer",
                "Microwave",
                "Refrigerator",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Stove",
                "Coffee maker",
                "Cookware",
                "Dishes and silverware",
                "Kettle",
                "Kitchen"
            ],
            "amenitiesNotIncluded": [
                "Bathtub",
                "BBQ grill",
                "Bed linens",
                "Cable TV",
                "Crib",
                "Dishwasher",
                "Elevator",
                "Essentials",
                "Free parking on street",
                "Game console",
                "Grab-rails for shower and toilet",
                "Hair dryer",
                "High chair",
                "Hot tub",
                "Indoor fireplace",
                "Iron",
                "Kitchen",
                "Oven",
                "Stove",
                "Accessible-height bed",
                "Accessible-height toilet",
                "Baby bath",
                "Baby monitor",
                "Babysitter recommendations",
                "Beach essentials",
                "Breakfast",
                "Carbon monoxide detector",
                "Changing table",
                "Children’s books and toys",
                "Children’s dinnerware",
                "Cleaning before checkout",
                "Cookware",
                "Disabled parking spot",
                "Dishes and silverware",
                "Doorman",
                "EV charger",
                "Extra pillows and blankets",
                "Family/kid friendly",
                "Fire extinguisher",
                "Fireplace guards",
                "First aid kit",
                "Flat smooth pathway to front door",
                "Garden or backyard",
                "Gym",
                "Hangers",
                "Indoor pool",
                "Internet",
                "Laptop friendly workspace",
                "Long term stays allowed",
                "Luggage dropoff allowed",
                "Outdoor pool",
                "Outlet covers",
                "Pack ’n Play/travel crib",
                "Paid parking off premises",
                "Path to entrance lit at night",
                "Patio or balcony",
                "Pets allowed",
                "Pocket wifi",
                "Private entrance",
                "Private pool",
                "Roll-in shower with shower bench or chair",
                "Room-darkening shades",
                "Shampoo",
                "Single level home",
                "Smoke detector",
                "Smoking allowed",
                "Stair gates",
                "Step-free access",
                "Suitable for infants (under 2 years)",
                "Suitable for children (2-12 years)",
                "Suitable for events",
                "Swimming pool",
                "Table corner guards",
                "Tub with shower bench",
                "Wheelchair accessible",
                "Wide clearance to bed",
                "Wide clearance to shower and toilet",
                "Wide doorway",
                "Wide hallway clearance",
                "Window guards"
            ],
            "useAccountRevenueShare": true,
            "netIncomeFormula": "host_payout",
            "commissionFormula": "net_income",
            "ownerRevenueFormula": "net_income - pm_commission",
            "useAccountAdditionalFees": true,
            "useAccountTaxes": true,
            "markups": {
                "airbnb2": {
                    "amount": 20,
                    "units": "PERCENTAGE",
                    "status": null
                },
                "airbnb": null,
                "default": {
                    "amount": 0,
                    "units": "PERCENTAGE"
                },
                "bookingCom": {
                    "amount": 21.95,
                    "units": "PERCENTAGE",
                    "status": null
                }
            },
            "useAccountMarkups": true,
            "active": true,
            "preBooking": [],
            "createdAt": "2020-02-09T10:22:38.820Z",
            "lastUpdatedAt": "2022-09-19T09:05:19.176Z",
            "integrations": [
                {
                    "bookingCom": {
                        "acceptedCreditCards": [],
                        "errors": [],
                        "initialComplexListing": false,
                        "publishCompanyLogo": false,
                        "isPublishedCompanyLogo": false,
                        "publishCompanyInfo": false,
                        "isPublishedCompanyInfo": false,
                        "taxInfo": []
                    },
                    "airbnb2": {
                        "id": "42154100",
                        "cancellationPolicy": "strict_14_with_grace_period",
                        "instantBookingAllowedCategory": "off",
                        "bookingLeadTime": {
                            "hours": 2,
                            "allowRequestToBook": true
                        },
                        "maxDaysNotice": {
                            "days": -1,
                            "allowRequestToBook": true
                        },
                        "turnoverDays": 0,
                        "syncCategory": "sync_rates_and_availability",
                        "status": "COMPLETED",
                        "financials": {
                            "_id": "5e4d605480aad90029887b66",
                            "basePrice": {
                                "channelSyncStatus": "SUCCESS"
                            },
                            "currency": {
                                "channelSyncStatus": "SUCCESS"
                            }
                        },
                        "daysOfWeekMinimumNights": [],
                        "syncCategoryUpdatedAt": "2021-06-03T07:24:40.695Z",
                        "promotions": []
                    },
                    "platform": "airbnb2",
                    "_id": "585a39dbe43900100017e9ed",
                    "externalUrl": "https://www.airbnb.com/rooms/42154100"
                }
            ],
            "pendingTasks": [],
            "listingRooms": [],
            "pictures": [
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc1c",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082495.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082495.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082495.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082495.jpg",
                    "id": 965082495,
                    "sort": 1,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc1b",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082506.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082506.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082506.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082506.jpg",
                    "id": 965082506,
                    "sort": 2,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc1a",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082490.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082490.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082490.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082490.jpg",
                    "id": 965082490,
                    "sort": 3,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc19",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082500.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082500.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082500.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082500.jpg",
                    "id": 965082500,
                    "sort": 4,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc18",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082503.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082503.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082503.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082503.jpg",
                    "id": 965082503,
                    "sort": 5,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc17",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082493.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082493.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082493.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082493.jpg",
                    "id": 965082493,
                    "sort": 6,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc16",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082489.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082489.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082489.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082489.jpg",
                    "id": 965082489,
                    "sort": 7,
                    "caption": ""
                },
                {
                    "_id": "5e3fdd6e2e90cf0078c4dc15",
                    "thumbnail": "//guestybookings.s3.amazonaws.com/images/thumbnail_965082499.jpg",
                    "regular": "//guestybookings.s3.amazonaws.com/images/regular_965082499.jpg",
                    "large": "//guestybookings.s3.amazonaws.com/images/large_965082499.jpg",
                    "original": "//guestybookings.s3.amazonaws.com/images/original_965082499.jpg",
                    "id": 965082499,
                    "sort": 8,
                    "caption": ""
                }
            ],
            "taxes": [],
            "customFields": [],
            "offeredServices": [],
            "importedAt": "2020-02-09T10:22:38.827Z",
            "occupancyStats": [],
            "accountId": "585a39dbe43900100017e9e8",
            "importingPlatform": "airbnb",
            "nickname": "TLV005 Golan Another",
            "isListed": true,
            "channelsListed": {
                "airbnb": {
                    "isListed": true
                },
                "_id": "5e3fdd6e2e90cf0078c4dc14"
            },
            "defaultCheckInTime": "15:00",
            "defaultCheckOutTime": "11:00",
            "title": "Apartment 4 - Minimalist Flat",
            "timezone": "Asia/Jerusalem",
            "bedrooms": 2,
            "beds": 2,
            "propertyType": "Apartment",
            "roomType": "Entire home/apt",
            "bedType": "Real Bed",
            "accommodates": 4,
            "bathrooms": 2,
            "lastSyncedAt": "2020-06-15T09:28:15.450Z",
            "__v": 21,
            "lastActivityAt": "2021-01-27T21:51:32.133Z",
            "defaultCheckInEndTime": null,
            "cleaningStatus": {
                "value": null,
                "updatedAt": "2021-12-29T11:56:06.319Z"
            },
            "accountTaxes": []
        }
    ],
    "title": "Listings Report",
    "fields": "",
    "limit": 25,
    "skip": 0,
    "count": 187
}
];
