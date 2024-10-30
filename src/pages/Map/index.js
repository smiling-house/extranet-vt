import React, { useEffect, useRef, useState } from "react";
import "./Map.scss";
 import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// import conImage from "../Assets/1.jpg"
// import greenBorder from "../Assets/green-border-marker.png"

let continentDefault = [
	{
		text: "OCENIA",
		latitude: "130.08150699373945",
		longitude: "-22.000825079689697",
	},
	{
		text: "CENTRAL & SOUTH AMERICS",
		latitude: "-65.03566465880945",
		longitude: "0.11347580615962916",
	},
	{
		text: "ASIA",
		latitude: "94.04635205722194",
		longitude: "35.40990487833411",
	},
	{
		text: "NORTH AMERICA",
		latitude: "-104.7622254741253",
		longitude: "47.11745852948719",
	},
	{
		text: "EUROPE",
		latitude: "31.731904807200426",
		longitude: "56.03724377127104",
	},
	{
		text: "AFRICA",
		latitude: "16.702608339094404",
		longitude: "7.649245194285175",
	},
];

let asianCountry = [
	{
		text: "INDIA",
		latitude: "75.12923350269232",
		longitude: "27.64981751707852",
	},
	{
		text: "MONGOLIA",
		latitude: "101.14485681788808",
		longitude: "44.93786053931482",
	},
	{
		text: "IRAN",
		latitude: "55.793297254911685",
		longitude: "30.415855064746847",
	},
];

let africaAmericaCountry = [
	{
		text: "NIGER",
		latitude: "11.144862646400052",
		longitude: "20.267715957722974",
	},
	{
		text: "DRC",
		latitude: "25.20736173569506",
		longitude: "1.8951861048663043",
	},
];
let northAmericaCountry = [
	{
		text: "CANADA",
		latitude: "-115.06607280451378",
		longitude: "57.77765428461838",
	},
	{
		text: "GREENLAND",
		latitude: "-46.51138974420058",
		longitude: "70.7743799309475",
	},
];
let europeCountry = [
	{
		text: "FRANCE",
		latitude: "1.4768920294548395",
		longitude: "49.12806876755028",
	},
	{
		text: "UKRAINE",
		latitude: "33.82063993483337",
		longitude: "49.24296142152702",
	},
];
let australiaCountry = [
	{
		text: "AUSTRALIA",
		latitude: "122.59017373480737",
		longitude: "-24.401780525355257",
	},
];
let southAmericaCountry = [
	{
		text: "BRAZIL",
		latitude: "-57.76138881072827",
		longitude: "-13.105850824905062",
	},
	{
		text: "ARGENTINA",
		latitude: "-66.90201321877004",
		longitude: "-39.397698221385596",
	},
	{
		text: "PERU",
		latitude: "-76.39420010404419",
		longitude: "-13.276993674895085",
	},
];
// -------------------------------------------------------------------------------------
let franceMarker = [
	{
		text: "PARIS",
		latitude: "2.9100740770185642",
		longitude: "48.68360674236763",
	},
	{
		text: "GRENOBLE",
		latitude: "5.293571637043644",
		longitude: "44.78568680989115",
	},
	{
		text: "NANTES",
		latitude: "-1.4134795927428851",
		longitude: "47.110501978483285",
	},
];

let india = [
	{
		text: "GUJRAT",
		latitude: "71.93080829937388",
		longitude: "22.19900212178194",
	},
	{
		text: "J&K",
		latitude: "75.13609041569924",
		longitude: "33.627510570955366",
	},
	{
		text: "RAJSTHAN",
		latitude: "76.59335131125127",
		longitude: "25.65974797186784",
	},
	{
		text: "ARUNACHAL PRADESH",
		latitude: "93.72684082687951",
		longitude: "27.775488638648813",
	},
	{
		text: "TAMIL NADU",
		latitude: "78.16022464783612",
		longitude: "11.13874097394804",
	},
];

const Map = () => {
	const mapContainer = useRef(null);
	// const map = useRef(null);
	let hoveredId;
	const markers = [];
	let currentCountryMarkerr = [];
	const showCountriesMArk = [];
	let activeCountryMarker = [];
	let setActiveCountry = [];
	var zoomOutButton = document.getElementById("zoom-out-button");
	const [continentName, setContinentName] = useState("");
	const [destinationContainer, setDestinationContainer] = useState(false);

	useEffect(() => {
		const map = new maplibregl.Map({
			container: mapContainer.current,
			// style: "https://api.maptiler.com/maps/winter-v2/style.json?key=j0AmunE6RIJzMVTqDAUu#1.0/-15.17266/6.14127",
			style:
				"https://api.maptiler.com/maps/winter-v2/style.json?key=OxlzpOeoFf3sL2RL7JiE",
			center: [8.5456, 47.3739],
			zoom: 1,
			doubleClickZoom: false,
			scrollZoom: false,
			cursor: "pointer",
		});

		setDestinationContainer(false)
		var zoomOutButton = document.getElementById("zoom-out-button");
		zoomOutButton.addEventListener("click", function () {
			map.flyTo({
				center: [8.5456, 47.3739],
				zoom: 1,
				doubleClickZoom: false,
			});
		});

		const navigationControl = map.addControl(
			new maplibregl.NavigationControl({
				showCompass: false, // Show compass control
			}),
			"top-right"
		);
		navigationControl._container?.appendChild(zoomOutButton);

		map.on("data", (event) => {
			if (event.sourceId === "continents" && event.isSourceLoaded) {
				console.log("GeoJSON file loaded successfully:", event);
			}
		});

		map.on("load", function () {
			map.addSource("continents", {
				type: "geojson",
				data: "/GeoJson/final.geojson",
				// data: continentsData,
			});
			map.addSource("countries", {
				type: "geojson",
				data: "/GeoJson/final-country.geojson",
			});
			continentFunction();
		});

		const continentFunction = () => {
			map.addLayer({
				id: "continent-fills",
				type: "fill",
				source: "continents",
				layout: {},
				paint: {
					"fill-opacity": [
						"case",
						["boolean", ["feature-state", "hover"], false],
						0.4, // Highlighted color
						0, // Default color
					],
					"fill-color": "#59ff59",
					// "fill-opacity": 0.4,
				},
			});

			map.on("click", "continent-fills", function (e) {
				setContinentName(e.features[0].properties.STATE_NAME);
				let zoomLevel = map.getZoom(); //get map's curret zoom level
				if (zoomLevel < 4) {
					map.easeTo({
						center: e.lngLat,
						zoom: 2.5,
						duration: 1000,
					});
					countryFunction(e.features[0].properties.STATE_NAME);
					map.removeLayer("continent-fills");
					markers.forEach(function (marker) {
						marker.remove();
					});
				}
			});

			map.on("mousemove", "continent-fills", function (e) {
				map.getCanvas().style.cursor = "pointer";
				if (e.features.length > 0) {
					if (hoveredId) {
						map.setFeatureState(
							{ source: "continents", id: hoveredId },
							{ hover: false }
						);
					}
					// setHoveredId = e.features[0].id;
					hoveredId = e.features[0].id;
					map.setFeatureState(
						{ source: "continents", id: hoveredId },
						{ hover: true }
					);
				}
			});

			map.on("mouseleave", "continent-fills", function () {
				if (hoveredId) {
					map.setFeatureState(
						{ source: "continents", id: hoveredId },
						{ hover: false }
					);
				}
			});
			hoveredId = null;

			continentDefault.map((marker) => {
				const el = document.createElement('div');
				el.className = 'custom-continent-marker';
				var mapMarker = new maplibregl.Marker({
					element: el,
					// color: 'green',
					// height: "10px",
					// width: "10px",
					cursor: "pointer",
					rotation: -45
				})
					.setLngLat([marker.latitude, marker.longitude])
					.setPopup(
						new maplibregl.Popup().setHTML("<h4>" + marker.text + "</h4>")
					)
					.addTo(map);
				markers.push(mapMarker);
			});
		};

		const countryFunction = (continent) => {
			map.addLayer({
				id: "country-fills",
				type: "fill",
				source: "countries",
				layout: {},
				paint: {
					"fill-opacity": [
						"case",
						["boolean", ["feature-state", "hover"], false],
						0.4, // Highlighted color
						0, // Default color
					],
					"fill-color": "#59ff59",
					// "fill-opacity": 0.4,
				},
			});

			map.on("click", "country-fills", function (e) {
				setContinentName(e.features[0].properties.ADMIN);
				let zoomLevel = map.getZoom(); //get map's curret zoom level
				if (zoomLevel < 4) {
					map.easeTo({
						center: e.lngLat,
						zoom: 4,
						duration: 1000,
					});
					topDestinationFunction(e);
					// map.removeLayer("country-fills");
					showCountriesMArk.forEach(function (marker) {
						marker.remove();
					});
				} else {
					map.easeTo({
						center: e.lngLat,
						zoom: 4,
						duration: 1000,
					});
				}
			});

			map.on("mousemove", "country-fills", function (e) {
				map.getCanvas().style.cursor = "pointer";
				if (e.features.length > 0) {
					if (hoveredId) {
						map.setFeatureState(
							{ source: "countries", id: hoveredId },
							{ hover: false }
						);
					}
					// setHoveredId = e.features[0].id;
					hoveredId = e.features[0].id;
					map.setFeatureState(
						{ source: "countries", id: hoveredId },
						{ hover: true }
					);
				}
			});

			map.on("mouseleave", "country-fills", function () {
				if (hoveredId) {
					map.setFeatureState(
						{ source: "countries", id: hoveredId },
						{ hover: false }
					);
				}
			});
			hoveredId = null;

			if (continent) {
				if (continent === "Asia") {
					currentCountryMarkerr.push(asianCountry);
				} else if (continent === "Europe") {
					currentCountryMarkerr.push(europeCountry);
				} else if (continent === "North America") {
					currentCountryMarkerr.push(northAmericaCountry);
				} else if (continent === "Africa") {
					currentCountryMarkerr.push(africaAmericaCountry);
				} else if (continent === "South America") {
					currentCountryMarkerr.push(southAmericaCountry);
				} else if (continent === "Australia") {
					currentCountryMarkerr.push(australiaCountry);
				}

				currentCountryMarkerr[0]?.map((marker) => {
					const el = document.createElement('div');
					el.className = 'custom-country-marker';
					var mapMarker = new maplibregl.Marker({
						element: el,
						rotation: -45,	
						// color: "red",
						// height: "10px",
						// width: "10px",
						cursor: "pointer",
					})
						.setLngLat([marker.latitude, marker.longitude])
						.setPopup(
							new maplibregl.Popup()?.setHTML("<h4>" + marker.text + "</h4>")
						)
						.addTo(map);
					showCountriesMArk.push(mapMarker);
				});
			}
		};

		const topDestinationFunction = (e) => {
			setDestinationContainer(true)
			// map.addLayer({
			// 	id: "des-fills",
			// 	type: "fill",
			// 	source: "countries",
			// 	layout: {},
			// 	paint: {
			// 		"fill-opacity": [
			// 			"case",
			// 			["==", ["feature-state", "active"], false],
			// 			0.4, // Highlighted color
			// 			0, // Default color
			// 		],
			// 		"fill-color": "#59ff59",
			// 		// "fill-opacity": 0.4,
			// 	},
			// });

			// map.on("idle", "des-fills", function (e) {
			// 	if (e.features.length > 0) {
			// 		if (hoveredId) {
			// 			map.setFeatureState(
			// 				{ source: "countries", id: hoveredId },
			// 				{ active: false }
			// 			);
			// 		}
			// 		// setHoveredId = e.features[0].id;
			// 		hoveredId = e.features[0].id
			// 		map.setFeatureState(
			// 			{ source: "countries", id: hoveredId },
			// 			{ active: true }
			// 		);
			// 	}
			// });

			let country = e.features[0].properties.ADMIN;
			if (country) {
				if (country === "India") {
					activeCountryMarker.push(india);
				} else if (country === "France") {
					activeCountryMarker.push(franceMarker);
				} else {
					activeCountryMarker = []
				}

				// var image = document.createElement('img');
				// image.style.width = "48"  ; // Adjust the width as desired
				// image.style.height= "48"; // Adjust the height as desired

				activeCountryMarker[0]?.map((marker) => {
					const el = document.createElement('div');
					el.className = 'custom-single-country-marker';
					var mapMarker = new maplibregl.Marker({
						element: el,
						rotation: -45
						// color: "black",
						// height: "10px",
						// width: "10px",
						// cursor: "pointer",
						// rotation: ''
					})
						// console.log("markert !~~~>>><<<<",marker)
						.setLngLat([marker.latitude, marker.longitude])
						.setPopup(
							new maplibregl.Popup()?.setHTML("<h4>" + marker.text + "</h4>")
						)
						.addTo(map);
					setActiveCountry.push(mapMarker);
				});
			}
		};
	}, [mapContainer, hoveredId]);

	return (
		<>
			<div className="interactive-map">
				{
					destinationContainer ?
						<div id="country-top-destination" class="country-info">
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div style={{ display: 'flex', flexDirection: 'row' }}>
									<div style={{ display: 'flex', width: '20%', padding: '1%' }}>
										{/* <img src={conImage} alt="Image" width="100%" /> */}
									</div>
									<div
										style={{
											display: 'flex',
											width: '80%',
											flexDirection: 'column',
										}}
									>
										<div>
											<h4>Country France</h4>
										</div>
										<div>
											From the fragrant lavender fields of Provence and the sun-kissed
											villas of the Côte d'Azur to storybook alpine chalets, ornate
											Parisian retreats, and historic vineyard châteaux, find your
											haven in France and live in a dream..
										</div>
										<div>
											<h5>TOP DESTINATION</h5>
										</div>
										<div className="top-destination-container">
											{
												franceMarker?.map((data) => {
													return (
														<div className="top-destination">
															{data.text}
														</div>
													)
												})
											}

										</div>
									</div>
								</div>
							</div>
						</div> : null
				}

				<div ref={mapContainer} className="interactive-map-container">
					<h1 id="continent-name" class="continent-text">
						{continentName}
					</h1>
					<button id="zoom-out-button" class="earth-icon-button">
						<i class="fas fa-globe"></i>
					</button>
				</div>
			</div>
		</>
	);
};

export default Map;

