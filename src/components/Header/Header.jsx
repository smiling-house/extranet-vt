import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Heart from "../Icons/Heart/Heart";

const user_image = localStorage.getItem("user_image");
const Header = ({ setToken, user, agency }) => {
	const history = useHistory();
	const location = useLocation();
	const titleName = location.pathname === "/" ? "Profil" : location.pathname.split("/").pop();

	const handleLogout = async () => {

		localStorage.clear();
		setTimeout(() => {
			history.push("/login");
		}, 1000);
	};

	return (
		<div className="container-fluid">
			<header className="pt-3">
				<div className="d-flex align-items-center justify-content-between">
					<div className="name-with-logo-box float-md-start mb-0">
						<div className="d-flex">
							<div className="logo">
								<img src={user_image} alt="user_image" />
							</div>
							<h5 className="p-4 text-white">
								Hello, {user?.firstName + " " + user?.lastName} 
							</h5>
						</div>
					</div>
					<nav className="nav nav-masthead justify-content-center float-md-end">
						<a
							className="text-white text-decoration-none px-3"
							href="javascript"
						>
							<span className="ps-1">Contact us</span>
						</a>
						<a
							className="text-white text-decoration-none px-3"
							href="javascript"
						>
							<span className="ps-1">Collections</span>
						</a>
						<a
							className="text-white text-decoration-none px-3 border-left-One"
							href="javascript"
						>
							<span className="ps-1">Hot Destinations</span>
						</a>
						<a
							className="text-white text-decoration-none px-3 border-left-One"
							href="javascript"
						>
							<span className="ps-1">Wish List</span>
						</a>
						<a
							className="text-white text-decoration-none px-3 border-left-One"
							href="javascript"
						>
							<Heart />
							<span className="ps-1">My Lists</span>
						</a>
						<span
							className="text-white text-decoration-none px-3 border-left-One"
							onClick={handleLogout}
						>
							Sign Out
						</span>
						<div className="logo">
							<img width={25} height={25} src={user?.userImage} alt="" />
						</div>
					</nav>
				</div>
			</header>
		</div>
	);
};

export default Header;
