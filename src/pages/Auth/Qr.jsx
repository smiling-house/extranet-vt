import { useLocation } from 'react-router-dom';


const Qr = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const partnerLoginEmail = queryParams.get('email');
    const partnerLoginAccountIdRev = queryParams.get('accountId');

    // A link without accountId used to crash the page (.split on null).
    const partnerLoginAccountId = (partnerLoginAccountIdRev || "").split("").reverse().join("");

	localStorage.setItem('partnerLoginEmail', partnerLoginEmail);
	localStorage.setItem('partnerLoginAccountId', partnerLoginAccountId);
};
export default Qr;
