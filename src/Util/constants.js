export const PATH_Welcome = '/welcome';
export const PATH_SIGNUP = '/signup';
export const PATH_SIGNOUT = 'signOut';
export const PATH_HOME = '/home';
export const PATH_QR = '/qr';
export const PATH_LOGIN = '/login';
export const PATH_FORGOT_PASSWORD = '/forgotPassword';
export const PATH_VERIFY_CODE = '/verifycode/:id';
export const PATH_SIGNUP_THANKS = '/signupthanks';
export const PATH_SEARCH = '/propertySearch';
export const PATH_SHUB = '/shub';
export const PATH_MAP = '/map';
export const PATH_CLIENTS = '/clients';
export const PATH_LISTINGS = '/listings';
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
export const PATH_EPARTNERS = '/external-partners';

export const PATH_ADMIN_LOGIN = '/adminlogin';

export const OPEN_AI_KEY = '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';

const constants = {
	ENV: 'LOCAL',
	BASE_URL: 'https://backend.villatracker.com',
	//SHUB_URL: 'http://localhost:3333',
	SHUB_URL: 'https://api.villatracker.com', //'https://api.triangle.luxury'
	//BASE_URL: 'http://localhost:8080',
	BASE_URL2: 'https://vt-backend-8zwvrrlxf-smiling-house.vercel.app',
	BASE_URL1: 'http://vtbackend-env.eba-b3vxhzrg.us-east-2.elasticbeanstalk.com',
	GLOBAL_ACTION_INIT_STATE: 'GLOBAL_ACTION_INIT_STATE',
	PAGING_PAGE_SIZE: 21,
	PAGING_CLIENT_SIZE: 20,
	PAGING_LISTING_SIZE: 20,
	PAGING_AGENCIES_SIZE: 20,
	PAGING_PARTNERS_SIZE: 20,
	PAGING_EPARTNERS_SIZE: 20,
	REACT_APP_STORAGE_SIGNED_USER_KEY: "selfit-frontend-user-data",

	TOAST_TYPE_INFO: 'toast_info',
	TOAST_TYPE_SUCCESS: 'toast_success',
	TOAST_TYPE_WARN: 'toast_warn',
	TOAST_TYPE_ERROR: 'toast_error',

	SHUB_TOKEN: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c'
};

export default constants;
