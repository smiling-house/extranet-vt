import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import hotBg from '../../assets/hot-destination.png'
import Heart from "../../assets/icons/like-full.png";
import showHotDestinations from "../../assets/btn-show-hot-destinations.png";

import './HotDestinations.scss';
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

const HotDestinations = props => {
	const history = useHistory()
	const [selectedDestination, setSelectedDestination] = useState(null);
	const [selectedData, setselectedData] = useState(null);
	const [hotdesinationsData, sethotdesinationsData] = useState([])

    const clearSelection = () => {
        window.scrollTo(0, 0);
        setSelectedDestination(null);
    };

    const selectDestination = (iteam) => {
        console.log(iteam, "iteam")
        setSelectedDestination(iteam.destination);
        setselectedData(iteam)
        window.scrollTo(0, 0);
    };

    const renderDestination = () => {
        return (
            <div className="hot-destination-selected">
                <div className="hot-destinations-selected-top">

                    <div className="hot-destinations-selected-top-left">
                        <div className="hot-destinations-selected-top-number">{selectedData.destination}</div>
                        <div className="hot-destinations-selected-top-location"><span style={{ color: '#2C486159', padding: '0 5px' }}>/</span>{selectedData.country}, {selectedData.countryCode}</div>
                    </div>

                    <div className="hot-destinations-selected-top-right">
                        280&nbsp;
                        <img src={Heart} alt="" style={{ width: '50px' }} />
                    </div>

                </div>

                <div className="hot-destinations-selected-hr" />

                <div className="hot-destinations-selected-text">
                    {selectedData.description}
                </div>

                <img src={selectedData.image_url} alt="" style={{ width: '100%' }} />
                <div className="mt-3 mb-3 float-end">

					<button className="btn btn-primary" onClick={() => clearSelection(null)}>Check More destination</button>
				</div>
			</div>
		)
	};

	const renderDestinationBox = (iteam, i) => {
		console.log(iteam, i)
		return (
			<div key={i} className="row" onClick={() => selectDestination(iteam)} style={{ cursor: "pointer" }}>
				<div className="">
					<div className="d-flex justify-content-between">
						<div className="-number" style={{ fontSize: '22px' }}>{i + 1}/{iteam.destination}</div>
						<div className="-number" style={{ fontSize: '22px' }}> {iteam.likes} <img src={Heart} alt="Heart" className="img-fluid" /></div>
					</div>
					<div className=" ">
						<img src={iteam.image_url} alt={iteam.image_url}
							width={800}
							// height={800}

							className="img-fluid"
						/>
					</div>
				</div>
			</div>
		)
	};

    useEffect(() => {
        AuthService.getHotDesinationsApi().then((response) => {
            if (response) {
                sethotdesinationsData(response.HotDestinations)
            }
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    return (
        <div className="hot-destinations-container">
            <PageHeader searchOpen={null} bgColor="transparent" topBgColor="#264b0f" />
            <div className="hot-destinations-body">
                <div className="hot-destinations-main">
                    <div className="hot-destinations-title">Hot Destinations &nbsp;<span style={{ color: '#0BE70B' }}>~2023~</span></div>

                    <div className="hot-destinations-subtitle">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod magna aliquyat.
                        <br />
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                    </div>

                    {selectedDestination ?
                        renderDestination()
                        :
                        <div className="hot-destinations-content">
                            {hotdesinationsData?.map((d, i) => renderDestinationBox(d, i))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default HotDestinations;
