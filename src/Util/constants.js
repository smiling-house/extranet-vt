export const PATH_Welcome = '/welcome';
export const PATH_SIGNUP = '/signup';
export const PATH_SIGNOUT = 'signOut';
export const PATH_HOME = '/home';
// Admin landing page — read-only totals overview. Wired in pages/index.jsx
// and the Sidebar's admin menu group.
export const PATH_DASHBOARD = '/dashboard';
// Admin settings / operational tools (bulk welcome-email backfill, future
// admin-only jobs). Wired in pages/index.jsx and Sidebar Operations group.
export const PATH_ADMIN_SETTINGS = '/admin-settings';
export const PATH_QR = '/qr';
export const PATH_LOGIN = '/login';
export const PATH_ADMIN_LOGIN = '/adminlogin';
export const PATH_FORGOT_PASSWORD = '/forgotPassword';
export const PATH_VERIFY_CODE = '/verifycode/:id';
export const PATH_SIGNUP_THANKS = '/signupthanks';
export const PATH_SEARCH = '/propertySearch';
export const PATH_SHUB = '/shub';
export const PATH_MAP = '/map';
export const PATH_CLIENTS = '/clients';
export const PATH_LISTINGS = '/listings';

export const PATH_LISTINGS_SH_RU_DECLINED_BUT_LISTED_ON_RU = '/listings-sh-ru-declined-but-listed-on-ru';
export const PATH_LISTINGS_SH_BP_DECLINED_BUT_LISTED_ON_BP = '/listings-sh-bp-declined-but-listed-on-bp';

export const PATH_DUPLICATED_LISTINGS = '/duplicated-listings';
export const PATH_TASKS = '/tasks';
export const PATH_RESERVATIONS = '/reservations';
export const PATH_FAVORITES = '/favorites';
export const PATH_REPORTS = '/reports';
export const PATH_PROPERTY = '/property';
export const PATH_PROPERTY_ID = '/property/:id?';
export const PATH_PROPERTY_EDIT = '/propertyEdit';
export const PATH_PROPERTY_X = '/property/x';
export const PATH_RESERVE = '/propertyReservePage';
export const PATH_PROFILE = '/profile';
export const PATH_HOT_DESTINATIONS = '/hotdestinations';
export const PATH_WISH_LIST = '/wishlist';
export const PATH_COLLECTIONS = '/collections';
export const PATH_INTOUCH = '/intouch';
export const PATH_FAQ = '/faq';
export const PATH_ADMIN = '/admin';
export const PATH_PARTNERS = '/partners';
export const PATH_PARTNERS_RU = '/partners-ru';
export const PATH_PARTNERS_BP = '/partners-bp';
export const PATH_PARTNERS_BART = '/partners-bart';
export const PATH_PARTNERS_INVENIO = '/partners-invenio';
export const PATH_PARTNERS_BOOKINGPAL = '/partners-bookingpal';
export const PATH_LISTINGS_BOOKINGPAL = '/listings-bookingpal';
export const PATH_PARTNERS_HOSTAWAY = '/partners-hostaway';
export const PATH_EPARTNERS = '/external-partners';


export const PATH_LISTINGS_BP = '/listings-bp';
export const PATH_LISTINGS_RU = '/listings-ru';
 
//External Partner API
export const PATH_EPS_LISTINGS = '/eps-listings';
export const PATH_SELECT = '/eps-select-listings';
export const PATH_VERIFY_COMPARE_NEW_PMS = '/verify-compare-new-pms';


export const PATH_EPS_EPARTNER_MANAGE = '/eps-epartner-manage';

export const PATH_EPS_EPARTNERS_RESERVATIONS = '/eps-epartners-reservations';
export const PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES = '/eps-epartner-reservations-properties';

export const APP_DISPLAY_NAME = 'Villa Tracker Extranet';

export const PATH_ZIPS_REGIONS_MAPPING = '/zipcodes-regions-mapping';
export const PATH_ZIPS_REGIONS_MAPPING_COUNTRY = '/zipcodes-regions-mapping-country';

export const PATH_ZIPS_REGIONS_MAPPING_AI = '/ai-regions-for-zipcodes';

export const PATH_PARTNERS_SH = '/partners-sh';
export const PATH_PARTNERS_VT = '/partners-vt';

// New RU/DH source-partitioned partner pages (source-partitioned by G- vs RU-
// accountId prefix; served by GET /local/partners-by-source in VTHub).
export const PATH_PARTNERS_GUESTY_DH = '/partners-guesty-dh';
export const PATH_PARTNERS_RU_DH = '/partners-ru-dh';

export const PATH_SEARCH_LISTINGS = '/search-listings';
export const PATH_PROPERTIES_NEEDS_ATTENTION = '/properties-needs-attention';

// Agoda (YCS) distribution — see extranet-vt/AGODA-UI-PLAN.md
export const PATH_AGODA_LISTINGS = '/agoda-listings';
export const PATH_AGODA_SYNC = '/agoda-sync';
export const PATH_AGODA_INQUIRIES = '/agoda-inquiries';
export const PATH_AGODA_ACCOUNT = '/agoda-account';
export const PATH_AGODA_KEYS = '/agoda-keys';

const constants = {
	ENV: 'LOCAL',
	BASE_URL: 'https://backend.villatracker.com',
	//SHUB_URL: 'http://localhost:3331',
	SHUB_URL: 'https://api.villatracker.com',
	//BASE_URL: 'http://localhost:8080',
	BASE_URL2: 'https://vt-backend-8zwvrrlxf-smiling-house.vercel.app',
	BASE_URL1: 'http://vtbackend-env.eba-b3vxhzrg.us-east-2.elasticbeanstalk.com',
	GLOBAL_ACTION_INIT_STATE: 'GLOBAL_ACTION_INIT_STATE',
	PAGING_PAGE_SIZE: 100,
	PAGING_CLIENT_SIZE: 100,
	PAGING_LISTING_SIZE: 100,
	PAGING_AGENCIES_SIZE: 100,
	PAGING_PARTNERS_SIZE: 100,
	PAGING_EPARTNERS_SIZE: 100,
	REACT_APP_STORAGE_SIGNED_USER_KEY: "selfit-frontend-user-data",

	TOAST_TYPE_INFO: 'toast_info',
	TOAST_TYPE_SUCCESS: 'toast_success',
	TOAST_TYPE_WARN: 'toast_warn',
	TOAST_TYPE_ERROR: 'toast_error',

	AVAIL_STATUS: ['pending','disconnected','connected'],

	// Refreshed 2026-07-02: previous token expired 2023-01-30 (exp 1675112806),
	// causing "Wrong authorization token" on all Shub calls (login + Partners pages).
	// This is the same valid token as ShubAuth in src/core/index.js (exp 2042).
	SHUB_TOKEN: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g',

	X_API_KEY:'S994RQ5bl0yp6DGFqI79pwtnHmtYaMX2b5OmOUsl',
	GUESTY_CHANNEL_SOURCE:'VT'
};

export default constants;
