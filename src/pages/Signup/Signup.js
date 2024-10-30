import React, { useEffect, useState } from "react";
import SignupForm from "../../components/Forms/SignupForm/SignupForm.jsx";
import { PWD_RULES, validateEmail, } from "../../Util/ValidationUtil.js";
import Logo from "../../components/Icons/Logo/Logo";
import { useDispatch } from "react-redux";
import * as userActions from '../../store/redux/User/actions';
import TermsFooter from "../../components/TermsFooter/TermsFooter";

import { useHistory } from "react-router-dom";

import LeftImage from '../../assets/SigninPic.jpeg'
import Checkbox from "../../components/Checkbox";

import Alert from "../../components/Alert/Alert";


const Signup = (props) => {

    const history = useHistory();
    const [chkRememberMe, setChkRememberMe] = useState(false);
    const [chkAgreeToTerms, setChkAgreeToTerms] = useState(false);
    const [showAgreeToTerms, setShowAgreeToTerms] = useState(false);
    const [state, setState] = useState({
        signup: false,
        inputStage: props.stage,
        pwdRules: PWD_RULES,
        agency_name: "",
        first_name: "",
        last_name: "",
        country: "",
        countryCode: "",
        address: "",
        stateProvince: "",
        city: "",
        zipCode: "",
        currency: "",
        username: "2901@test.com",
        email: "2901@test.com",
        phoneNoStart: "",
        phoneNoEnd: "",
        organization: "",
        password: "12345678",
        confirmPassword: "",
        loading: false,
        emailConsent: true,
        error: {},
        verification_resend_status: "none",
        userData: {},
    });

    const [smallScreen, setSmallScreen] = useState(false);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screenSize < 768) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }, [screenSize]);

    useEffect(() => {
        if (screenSize < 768) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }, [screenSize]);

    const dispatch = useDispatch();

    const setError = (field, msg) => {
        setState({
            ...state,
            error: {
                msg,
                placement: field,
            },
            loading: false,
        });
    };


    const validateSignup = () => {
        if (state.agency_name.length < 1) {
            setError('agencyname', 'Field is required');
            return true;
        }

        if (state.first_name.length < 1) {
            setError('fname', 'Field is required');
            return true;
        }

        if (state.last_name.length < 1) {
            setError('lname', 'Field is required');
            return true;
        }

        return false;
    };

    const signupCallback = result => {
        if (result === 'ok') {
            history.push("/signupthanks");
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({
            ...state,
            loading: false,
            error: {}
        });

        const signupErrors = validateSignup();
        if (signupErrors > 0) {
            return;
        }

        if (state.username.length === 0) {
            setState({
                ...state,
                error: {
                    msg: "Please enter an email",
                    placement: "email",
                },
                loading: false,
            });
            return;
        }
        else if (!validateEmail(state.username)) {
            setState({
                ...state,
                error: {
                    msg: "Looks like you forgot something",
                    placement: "email",
                },
                loading: false,
            });
            return;
        }
        else if (state.password.length < 6) {
            setState({
                ...state,
                error: {
                    msg: "Please check password",
                    placement: "password",
                },
                loading: false,
            });
            return;
        }

        if (state.password.length < 6 || state.password !== state.confirmPassword) {
            setState({
                ...state,
                error: {
                    msg: "Please check password",
                    placement: "password",
                },
                loading: false,
            });
            return;
        }

        if (!chkAgreeToTerms) {
            setShowAgreeToTerms(true);
            return;
        }

        let agent = {
            agencyName: state.agency_name,
            firstName: state.first_name,
            lastName: state.last_name,
            email: state.email,
            address: state.address,
            country: state.country,
            // stateProvince: state.stateProvince,
            // city: state.city,
            zipCode: state.zipCode,
            phone: state.phoneNoStart + "" + state.phoneNoEnd,
            currency: state.currency,
            organization: state.organization,
            password: state.password,
            status:"pending",
        };
        console.log(agent, "agent")
        dispatch(userActions.signUp(agent, signupCallback));


    };



    const handleChangePassword = (value) => {
        const pwdRules = state.pwdRules.map((rule) => {
            rule.valid = rule.regexp.test(value);
            return rule;
        });

        setState({
            ...state,
            pwdRules: pwdRules,
            password: value,
        });
    };

    const handleConfirmPassword = (value) => {
        const pwdRules = state.pwdRules.map((rule) => {
            rule.valid = rule.regexp.test(value);
            return rule;
        });

        setState({
            ...state,
            pwdRules: pwdRules,
            confirmPassword: value,
        });
    };



    return (
        <>
            <section>
                <div className="row">
                    {/* Left Image */}
                    <div className="col-md-5 d-none d-md-block">
                        <img src={LeftImage} className="img-fluid" alt="Left Image" style={{ height: '178vh', objectFit: 'cover' }} />
                    </div>
                    {/* Right Content */}
                    <div className="col-md-7" >
                        <div className="container text-center p-4">
                            <div className="mt-5 mb-5 d-flex justify-content-center">
                                <div style={{ width: '250px' }}>
                                    <Logo />
                                </div>
                            </div>
                            <h1>Sign up</h1>
                            <SignupForm
                                onSubmit={handleSubmit}
                                error={state.error}
                                agencyName={state.agency_name}
                                setAgencyName={(value) => setState({ ...state, agency_name: value })}

                                firstName={state.first_name}
                                setFirstName={(value) => setState({ ...state, first_name: value })}

                                lastName={state.last_name}
                                setLastName={(value) => setState({ ...state, last_name: value })}

                                email={state.email}
                                setEmail={(value) => setState({ ...state, email: value })}

                                address={state.address}
                                setAddress={(value) => setState({ ...state, address: value })}

                                country={state.country}
                                setCountry={(value) => setState({ ...state, country: value })}
                                countryCode={state.countryCode}
                                setCountryCode={(value) => setState({ ...state, countryCode: value })}

                                stateProvince={state.stateProvince}
                                setStateProvince={(value) => setState({ ...state, stateProvince: value })}

                                city={state.city}
                                setCity={(value) => setState({ ...state, city: value })}

                                zipCode={state.zipCode}
                                setZipCode={(value) => setState({ ...state, zipCode: value })}

                                username={state.username}
                                setUsername={(value) => setState({ ...state, username: value })}

                                phoneNoStart={state.phoneNoStart}
                                setPhoneNoStart={(value) => setState({ ...state, phoneNoStart: value })}

                                phoneNoEnd={state.phoneNoEnd}
                                setPhoneNoEnd={(value) => setState({ ...state, phoneNoEnd: value })}

                                organization={state.organization}
                                setOrganization={(value) => setState({ ...state, organization: value })}

                                currency={state.currency}
                                setCurrency={(value) => setState({ ...state, currency: value })}

                                password={state.password}
                                setPassword={handleChangePassword}
                                confirmPassword={state.confirmPassword}
                                setConfirmPassword={handleConfirmPassword}
                            />


                            <div className="row mt-4 d-flex justify-content-center">
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0 20px' }}>

                                    <Checkbox uid="talkWithRepresentative"
                                        label="I have read and agree to the Terms & Conditions and Privacy Policy.*"
                                        checked={chkAgreeToTerms}
                                        onChange={value => setChkAgreeToTerms(value)}
                                    />
                                </div>

                                {showAgreeToTerms &&
                                    <Alert type="warning" msg="Please agree to the terms" />

                                }
                                <div className="col-7 mt-5">
                                    <button
                                        style={{
                                            "height": " 66px !important",
                                            "border-radius": '6px',
                                            'font-weight': "100",
                                            "font-size": "22px",
                                            "color": "#fff",
                                            "background-color": "#165093",
                                        }}
                                        className="btn btn-primary col-12"
                                        fullwidth={true}
                                        loading={state.loading}
                                        text="Sign In"
                                        onClick={(e) => {
                                            setState({ ...state, error: undefined });
                                            handleSubmit(e);
                                        }}
                                    >Sign In</button>
                                </div>
                            </div>
                            <div className="mt-5 mb-5" style={{ "padding-bottom": "50px" }}>
                                <h4>Already have an account?<span className="text-decoration-underline text-primary cst-cursor" onClick={() => history.push("/login")}> Sign in</span></h4>
                            </div>
                        </div>
                       
                        <div className="col-12 model-footer pt-5 mb-2 cst-footer-add-css2">
                            <div className="container text-center">
                                <hr className="pb-3" />
                                <TermsFooter isMobile={smallScreen} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup