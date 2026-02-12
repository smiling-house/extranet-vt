import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as userActions from "../../store/redux/User/actions";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import menuIcon from '../../assets/icons8-menu-50.png'
import {
	// PATH_PARTNERS,
	// PATH_LISTINGS,
	// PATH_SIGNOUT,
	PATH_LOGIN
} from "../../Util/constants";
import "./Admin.scss";
import addAdminIcon from '../../assets/icons/admin/menu/add.svg';
import { getStorageValue } from "../../Util/general.js";

const PartnersBP = (props) => {

    const dispatch = useDispatch();	
    const history = useHistory();
    const location = useLocation();
    const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props
    const agentData = JSON.parse(agent);
    const partnerLogin = getStorageValue('partnerLogin')
    const partnerName = getStorageValue('partnerName')

    const [showSideBarMenu, setShowSideBarMenu] = useState(false);
    const [searchInputes, setsearchInputes] = useState({
        pmName: "",
        accountId: partnerLogin,
    })

    const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
    const [selectedPartnerToEdit, setSelectedPartnerToEdit] = useState(null);
    const [selectedPartnerToDelete, setSelectedPartnerToDelete] = useState(null);
    const [partnerToApprove, setPartnerToApprove] = useState(null);
    const [partnerToDisApprove, setPartnerToDisApprove] = useState(null);
    const [totalPartners, setTotalPartners] = useState(null);
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterPartners, setFilterPartners] = useState();
    const [searchPartners, setSearchPartners] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [filterPropertyStatus, setFilterPropertyStatus] = useState("");
    const [serialNumber, setSerialNumber] = useState(0);

    const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');

    // UI event handlers (no real logic)
    const showOrHideSideBarMenu = () => {
        setShowSideBarMenu((prev) => !prev);
    };
    const clearEditMenu = () => {
        setSelectedRowToEdit(null);
    };
    const onClose = () => {
        setSelectedRowToEdit(null);
        setSelectedPartnerToEdit(null);
        setSelectedPartnerToDelete(null);
    };
    const onShowEditMenu = (row) => {
        setSelectedRowToEdit(row);
    };
    const onEditPartner = (id, selectedPartner) => {
        setSelectedPartnerToEdit(selectedPartner);
        clearEditMenu();
    };
    const onAddPartnerBP = () => {
        setSelectedPartnerToEdit({});
        clearEditMenu();
    };
    const onDeletePartner = () => {
        setSelectedPartnerToDelete(selectedRowToEdit);
        clearEditMenu();
    };

    const signOut = () => {
        localStorage.clear();
        dispatch(userActions.signOut());
        history.push(PATH_LOGIN);
    };

    const handleSearchFuntionality = (name, value) => {
		// console.log('set search:', name, value)
		setsearchInputes({ ...searchInputes, [name]: value })
	}

    const handlSearchButtonAdmin = () => {
		// getSearchPartners();
	}

    // const getSearchPartners = async () => {

    // }

    // Table columns skeleton
    const columns = [
        { name: '#', width: '50px' },
        { name: 'partner Name', width: '350px' },
        { name: 'Account ID', width: '250px' },
        { name: 'Listings', width: '100px' },
        { name: 'APPROVED', sortable: true, width: '150px' },
        { name: 'PENDING', width: '150px' },
        { name: 'DECLINED', width: '150px' },
        { name: 'Updated at', width: '300px' },
    ];
    

    return (
        <div className="page-container">
            <div className="page-header">
                <img src={menuIcon} style={{'width':'25px'}} className="cst-cursor" onClick={showOrHideSideBarMenu} />
                &nbsp;Villa Tracker Extranet : PMs - {agentData.firstName}
                <span className="cst-cursor" onClick={signOut}>Sign Out</span>
            </div>
            {showSideBarMenu && (
                <Sidebar
                    agency={agency}
                    agent={agent}
                    token={token}
                    screenSize={screenSize}
                    activeMenu={activeMenu}
                    handleToggleMenu={handleToggleMenu}
                />
            )}
        <div className={showSideBarMenu ? "page-body" : "page-body-nomargin"}>
            <div className="agencies-container">
            {/* LoadingBox placeholder */}
            {selectedRowToEdit && (
                <>
                <div className="agencies-floating-edit-menu-floater" onClick={clearEditMenu} />
                <div className="agencies-floating-edit-menu">
                    <div className="agencies-floating-edit-menu-row" onClick={onDeletePartner}>Delete Partner</div>
                    <div className="agencies-floating-edit-menu-row" onClick={onAddPartnerBP}>Add Partner</div>
                    <div className="agencies-floating-edit-menu-row" onClick={clearEditMenu}>close X</div>
                </div>
                </>
            )}
            {partnerToApprove && <div>{/* ApproveAgent popup placeholder */}</div>}
            {partnerToDisApprove && <div>{/* DisApproveAgent popup placeholder */}</div>}
            {selectedPartnerToDelete && <div>{/* DeletePartner popup placeholder */}</div>}
            {selectedPartnerToEdit && (
                <div className="popup-wrapper">
                <div className="popup-container p-2" style={{ width: "730px" }}>
                    {/* EditPartner placeholder */}
                </div>
                </div>
            )}
            
            <div className="agencies-main">
                {extranet_vt_logged_in_role==='admin' && (
                    <div className="agencies-search-container">
                        <div className="navigation-bar" style={{ position: "absolute", marginBottom: "110px" }}> </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="text" className="form-control" placeholder="Search by PM Name"  onChange={(e) => handleSearchFuntionality("pmName",e.target.value)} />
                            </div>
                            <div className="col-sm-2">
                                <button className="form-control" style={{ height: "60px", width: "200px", fontSize: "20px", borderRadius: "6px", fontWeight: 100, }} onClick={() => handlSearchButtonAdmin()}>
                                    <span>Search</span>
                                </button>
                            </div>
                            <span className=" agencies-search-separator"></span>
                        </div>
                    </div>
                )}
                <div className="agencies-title">
                
                    {extranet_vt_logged_in_role==='admin' && <span>BP PM List (SH)</span> }
                    {extranet_vt_logged_in_role==='partner' && <span>BP PM Home</span> }
                    {!partnerLogin && (
                        <>
                            <a class="dropdown-item" href="#" onClick={() => {}}><img src={addAdminIcon} /> connect BP PM partner VT = Villa Tracker </a>
                        </>
                    )}
                    <div className="agencies-main-subtitle">
                        Displaying PMs {1 + pageNumber * 10}-{10 + pageNumber * 10} of {totalPartners ? totalPartners : "?"}
                    </div>
                </div>
                {extranet_vt_logged_in_role==='admin' &&
                    <div className="row">
                        <div className="col-12">
                            <div className="listings-search-container row">
                                <div className="col-sm-2">
                                    <label style={{'color':'white'}}><strong>Filter by Status</strong></label>
                                    <select class="form-control" onChange={(e)=>{}}>
                                        <option value="">--All--</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Declined">Declined</option>
                                    </select>                        
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="table-responsive px-3">
                    <table className="table">
                        <thead style={{ backgroundColor: "#f9f9f7" }}>
                            <tr>
                                {columns.map((item, index) => (
                                    <th key={index} style={{ cursor: "pointer", width: item.width }}>{item.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                        {/* Table rows placeholder */}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PartnersBP;
