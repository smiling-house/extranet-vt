import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { BsEnvelope } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import axios from "axios";
import { baseURL } from "../../core/index.js";
import "./Touch.scss";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";





const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const Welcome = (props) => {
  const agent = JSON.parse(localStorage.getItem("agent"));
  const token = JSON.parse(localStorage.getItem("token"));
  const agency = JSON.parse(localStorage.getItem("travelAgency"));
  console.log("Agent profile>>>", agent);
  console.log("Agency profile>>>", agency);
  // state for input value,error and submit
  const [form, setform] = useState({
    name: '',
    to: '',
    message: '',
    phone: '',
  });

  const [error, setError] = useState({ ...form });
  const [submit, setsubmit] = useState(false);
  form.name = agent?.firstName + ' ' + agent?.lastName;
  form.phone = agent?.phone;
  form.email = agent?.email;
  form.subject = 'VillaTracker needs some calrification.';
  form.message = "hello, this is agent " + agent?.firstName + ' ' + agent?.lastName + " , from " + agency?.agencyName + " agency. ";
  // onchange handler function for all inputs and test for validation onChange event--
  const handleOnchnageEvent = (e) => {
    let { name, value } = e.target;
    setform({ ...form, [name]: value });
    switch (name) {
      // case "name":
      //   if (nameRegex.test(value)) {
      //     console.log("dk");
      //     error.name = "";
      //   } else if (value.length === 0) {
      //     error.name = "Enter name *";
      //   } else {
      //     error.name = "Enter valid name *";
      //   }
      //   break;
      case "to":
        if (emailRegex.test(value)) {
          error.email = "";
        } else if (value.length === 0) {
          error.email = "Enter email *";
        } else {
          error.email = "Enter valid email *";
        }
        break;

      default:
        break;
    }
    setError(error);
  };

  function validate() {
    if (!form.email) {
      error.email = "Enter email *";
    }

    setError(error);
  }


  const sendMessageButton = () => {
    //validate();
    setsubmit(true);
    console.log(form, "email form="); // contact form deatils
    sendEmail();
  }
  const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
      token: `Bearer ${token}`,
    },
  });

  const sendEmail = async () => {
    const emailResponse = await userRequest.post(`/email/send-email`, {
      params: { ...form },
    }
    );
    console.log("email response >>>>", emailResponse.data);

  };

  return (
    <div className="main_cover">
      <div className="welcomesss-bg">
        <PageHeader searchOpen={null} />
        <section className="p-5">
          <div className="kanda-big text-white" style={{ "padding": "4px 300px 32px 300px" }}>
            <h1 className="mt-5 cst-margin-cst">Get In Touch</h1>
            <h1>We're happy to hear from you!</h1>
            <h3 className="cst-opcity mb-5">We're based in Gstaad, Switzerland <br /> Where we also have plenty of luxury chalets for sale! </h3>
            <div className="row">
              <div className="col-sm-8">
                <div className="row mt-5">
                  <div className="col-sm-6 mb-4">
                    <h2><HiOutlineEnvelope className="icons_details" />E-Mail</h2>
                    <h2 className="px-5"> info@smilinghouse.ch</h2>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <h3>Name</h3>
                    <input type="text" className="form-control" id="coloredInput" />
                  </div>

                  {/* <div className="col-sm-6">
                <h3>Message</h3>
                <textarea className="form-control" id="coloredInput" rows={5} cols={60}></textarea>
              </div> */}
                </div>

                <div className="row mt-5">
                  <div className="col-sm-6 mb-4">
                    <h2><FiPhoneCall className="icons_details" />Customer Support</h2>
                    <h2 className="px-5">+41 79 489 70 21</h2>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <h3>Email</h3>
                    <input type="text" id="coloredInput" className="form-control" />
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-sm-6 mb-4">
                    <h2><HiOutlineLocationMarker /> Office Address</h2>
                    <h2 className="px-5">Mettlenstr. 16, CH-3780 Gstaad,Switzerland</h2>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <h3>Phone</h3>
                    <input type="text" className="form-control" id="coloredInput" />
                  </div>
                </div>
              </div>
              <div className="col-sm-4 mt-5">
                <div className="row">
                  <div className="col">
                    <h3>Message</h3>
                    <textarea className="form-control" id="coloredInput" rows={5} cols={60} style={{"resize": "none"}}></textarea>
                  </div>
                  <div className="row"></div>
                  <div className="row mt-5">
                    <div className="col mt-5">
                      <button className="btn btn-success form-control p-3 mt-2 mb-5" style={{ "background": "#165093", "color": "white", "border": "#165093" }}>Send Message</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ "float": "right" }}>
            <div id="Component_267__1" class="Component_267___1" >
              <svg class="Path_3269" viewBox="1 2 49.4 46.107" style={{ width: "50px" }} >
                <path
                  id="Path_3269"
                  d="M 45.46035385131836 2 L 5.940039157867432 2 C 3.2164306640625 2 1 4.2164306640625 1 6.940039157867432 L 1 33.28691482543945 C 1 36.01052093505859 3.2164306640625 38.22695541381836 5.940039157867432 38.22695541381836 L 10.88007831573486 38.22695541381836 L 10.88007831573486 46.46035385131836 C 10.88007831573486 47.09432601928711 11.24399471282959 47.66901779174805 11.81209945678711 47.94401168823242 C 12.04098796844482 48.05269622802734 12.28469562530518 48.10703659057617 12.52675819396973 48.10703659057617 C 12.89396667480469 48.10703659057617 13.25788402557373 47.98518371582031 13.55593299865723 47.74641418457031 L 25.4548397064209 38.22695541381836 L 45.46035385131836 38.22695541381836 C 48.1839599609375 38.22695541381836 50.400390625 36.01052474975586 50.400390625 33.28691864013672 L 50.400390625 6.940042495727539 C 50.400390625 4.216434001922607 48.1839599609375 2.000003099441528 45.46035385131836 2.000003099441528 Z M 25.7001953125 25.05351638793945 L 12.52675819396973 25.05351638793945 C 11.61614513397217 25.05351638793945 10.88007831573486 24.31580352783203 10.88007831573486 23.40683746337891 C 10.88007831573486 22.49786949157715 11.61614513397217 21.76015663146973 12.52675819396973 21.76015663146973 L 25.7001953125 21.76015663146973 C 26.61080932617188 21.76015663146973 27.34687614440918 22.49786949157715 27.34687614440918 23.40683746337891 C 27.34687614440918 24.31580352783203 26.61080932617188 25.05351638793945 25.7001953125 25.05351638793945 Z M 38.87363433837891 18.466796875 L 12.52675819396973 18.466796875 C 11.61614513397217 18.466796875 10.88007831573486 17.72908401489258 10.88007831573486 16.82011604309082 C 10.88007831573486 15.9111499786377 11.61614513397217 15.17343711853027 12.52675819396973 15.17343711853027 L 38.87363433837891 15.17343711853027 C 39.78424835205078 15.17343711853027 40.52031326293945 15.9111499786377 40.52031326293945 16.82011604309082 C 40.52031326293945 17.72908401489258 39.78424835205078 18.466796875 38.87363433837891 18.466796875 Z"
                ></path>
              </svg>
            </div>
          </div>
          <br />
          <div className="mt-5">
            <hr style={{ "color": "white" }} />
          </div>
          <p className="text-white text-center">© 2023 VillaTracker. All rights reserved. Cookie Policy, Privacy and Terms.</p>
        </section>


      </div>
    </div>

  );
};

export default Welcome;
