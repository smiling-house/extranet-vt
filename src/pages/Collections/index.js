import React, { useState, useEffect } from "react";
// import hotDestinationsBg from "../../assets/desktop/hot-destinations-bg.png";
import myvdo from "../../assets/eventsCollection.mp4";
import myvdo1 from "../../assets/familyCollection.mp4";
import myvdo2 from "../../assets/petsCollection.mp4";
import myvdo3 from "../../assets/sustainCollection.mp4";
import PageHeader from "../../components/PageHeader";
import Collection from "./Collection";
import { useHistory, useLocation } from "react-router-dom";
import "youtube-video-js";
import "./Collections.scss";

const Collections = (props, tagName, token) => {
  const [flag, setflag] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [bgVdo, setBgVdo] = useState("");
  const history = useHistory();

  useEffect(() => {
    const load = async () => { };
    load();
  }, []);

  function PressSelection(collectionType, tagName, bg) {
    localStorage.setItem("tags", tagName);
    //console.log("collection=", collectionType);
    //console.log("VID=", `${bg}`);
    setSelectedCollection(collectionType);
    setBgVdo(bg);


  }

  const renderBox = (bg, video, title, collectionType, tagName) => {
    let play = false;
    const handleMouseEnter = () => {
      play = true;
    };
    const handleMouseLeave = () => {
      play = false;
    };
    return (
      <>
        <div class="col-sm-6">
          <div class="card"
            // style={{ width: "80%" }}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <video

              type={selectedCollection}
              onClick={() => PressSelection(collectionType, tagName, bg)}
              src={`${bg}`}
              class="col-sm-4"
              alt="video"
              style={{ width: "100%" }}
              // controls={isAutoPlay}
              autoPlay
              //play={play}
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
              loop
              muted
            //  type="video/mp4"
            />
            <div
              class="card-body text-center"
              style={{
                backgroundColor: "rgba(19, 59, 113, 0.8)",
                color: "white",
                position: "absolute",
                bottom: "0",
                width: "100%",
                borderRadius: "17px"
              }}
            >
              <h4 class="card-title">{title}</h4>
            </div>
          </div>
          <br></br>
        </div>
      </>
      // <video
      //   className="collections-box"
      //   type={selectedCollection}
      //   onClick={() => PressSelection(collectionType)}
      //   src={`${bg}`}
      //   // controls
      //   height="700vh"
      //   width="800vh"
      // >
      //   <div className="collections-box-footer">{title}</div>
      // </video>
    );
  };

  return (
    <div>
      <div className="collections-container">
        <PageHeader searchOpen={null} flag={flag} />

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>


        {selectedCollection ? (
          <Collection
            token={token}
            bgVdo={bgVdo}
            type={selectedCollection}
            onBack={() => setSelectedCollection(null)}
          />
        ) : (
          <div className="collections-body">
            <div className="collections-body-title mb-4 mt-4">
              Filter your selection from a special global collection:
            </div>

            <div className="collections-boxes row">
              {renderBox(
                myvdo,
                "https://www.youtube.com/watch?v=WkRGl16eTm0",
                "Discover the event collection",
                "Event",
                "eventCollection"
              )}
              {renderBox(
                myvdo1,
                "https://www.youtube.com/watch?v=Uw5uqhl8-io",
                "Discover the families collection",
                "Family",
                "familyCollection"
              )}
              {renderBox(
                myvdo2,
                "https://www.youtube.com/watch?v=Uw5uqhl8-io",
                "Discover the pet friendly collection",
                "Pet Friendly",
                "petsCollection"
              )}
              {renderBox(
                myvdo3,
                "https://www.youtube.com/watch?v=WkRGl16eTm0",
                "Discover the sustainable collection",
                "Sustainable",
                "sustainCollection"
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
