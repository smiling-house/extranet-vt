import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Icon from 'react-web-vector-icons';
import Button from "../../components/Buttons/Button/Button";
import pageBg from '../../assets/SigninPic.jpeg';

import CollectionIcon from "../../components/CollectionIcon";

import VTChannelIcon from "../../assets/channels/icons/VTChannel.svg";
import VTChannelIconOn from "../../assets/channels/icons/VTChannel-on.svg";
import VTChannelIconOnBlue from "../../assets/channels/icons/VTChannel-on-blue.svg";
import VTChannelLabel from "../../assets/channels/icons/label-VTChannel.svg";

import SHChannelIcon from "../../assets/channels/icons/SHChannel.svg";
import SHChannelIconOn from "../../assets/channels/icons/SHChannel-on.svg";
import SHChannelIconOnBlue from "../../assets/channels/icons/SHChannel-on-blue.svg";
import SHChannelLabel from "../../assets/channels/icons/label-SHChannel.svg";

import TLChannelIcon from "../../assets/channels/icons/TLChannel.svg";
import TLChannelIconOn from "../../assets/channels/icons/TLChannel-on.svg";
import TLChannelIconOnBlue from "../../assets/channels/icons/TLChannel-on-blue.svg";
import TLChannelLabel from "../../assets/channels/icons/label-TLChannel.svg";

import eventsIcon from "../../assets/special-collection/icons/events.svg";
import eventsIconOn from "../../assets/special-collection/icons/events-on.svg";
import eventsIconOnBlue from "../../assets/special-collection/icons/events-on-blue.svg";
import eventsLabel from "../../assets/special-collection/icons/label-events.svg";


import editIcon from '../../assets/icons/admin-edit-icon.png';
import editAdminIcon from '../../assets/icons/admin/menu/edit.svg';
import addAdminIcon from '../../assets/icons/admin/menu/add.svg';
import deleteAdminIcon from '../../assets/icons/admin/menu/delete.svg';
import PageHeader from "../../components/PageHeader";
import swal from "sweetalert";
import Datatable from "../../components/Datatable";
// import DataTable from 'react-data-table-component';

import Popup from "../../components/Popup";
import EditTask from "./EditTask";
import {
	PATH_TASKS,
	PATH_LISTINGS,
} from "../../Util/constants";

import { data } from "./makeData.js";
import "./Admin.scss";
import ApproveAgent from "./ApproveAgent";
import DisApproveAgent from "./DisApproveAgent";
import DeleteTask from "./DeleteAgency";
import axios from "axios";
import { baseURL } from "../../core/index.js";
import Paging from "../../components/Paging";
import constants from "../../Util/constants";
import countryList from "../../Util/data/countries.json";
import { RawOff } from "@mui/icons-material";
import { BsChevronDown } from "react-icons/bs";
import ClientOfferLog from "./ClientOfferLog";
import Sidebar from "../../components/Sidebar";
const NEW_PARTNER = {
	id: "-1",
	taskName: "",
	contactName: "",
	email: "",
	token: "",
	phone: "",
	basicChannels: [],
	source: 'SH',
	accountChannel: "Smiling House"
};
const NEW_PARTNER_SH = {
	accountChannel: "Smiling House",
	id: "-1",
	taskName: "",
	contactName: "",
	email: "",
	token: "",
	phone: "",
	basicChannels: ["SH"],
	source: "SH"
};
const NEW_PARTNER_VT = {
	accountChannel: "Villa Tracker",
	id: "-1",
	taskName: "",
	contactName: "",
	email: "",
	token: "",
	phone: "",
	basicChannels: ["VT"],
	source: "VT"
};

const Tasks = (props) => {
	const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props
	const divRefs = React.useRef([]);

	const [searchInputes, setsearchInputes] = useState({
		TaskName: "",
		TaskId: "",
	})
	const history = useHistory();
	const location = useLocation();
	const [editClickedId, seteditClickedId] = useState("")
	const [editTaskId, seteditTaskId] = useState("")
	const [SelectedTask, setSelectedTask] = useState(null);
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
	const [selectedTaskToEdit, setSelectedTaskToEdit] = useState(null);
	const [selectedTaskToDelete, setSelectedTaskToDelete] = useState(null);
	const [taskToApprove, setTaskToApprove] = useState(null);
	const [taskToDisApprove, setTaskToDisApprove] = useState(null);
	const [totalTasks, setTotalTasks] = useState(null);
	const [tasks, setTasks] = useState([]);
	// console.log("Tasks >>>>", Tasks);
	const [filterTasks, setFilterTasks] = useState();
	// console.log("filterTasks >>>>", filterTasks);
	const [searchTasks, setSearchTasks] = useState("");
	const [pageNumber, setPageNumber] = useState(0);
	let tasksPagingFrom = 1 + pageNumber * constants.PAGING_PARTNERS_SIZE;
	let tasksPagingTo = (tasksPagingFrom + constants.PAGING_PARTNERS_SIZE > totalTasks) ? totalTasks : tasksPagingFrom + constants.PAGING_PARTNERS_SIZE

	const userRequest = axios.create({
		baseURL: constants.SHUB_URL,
		headers: {
			Authorization: constants.SHUB_TOKEN,
		},
	});
	const getAllTasks = async () => {
		const tasksResponse = await userRequest.get(`local/tasks`,
			{ params: { limit: constants.PAGING_PARTNERS_SIZE, skip: tasksPagingFrom - 1 } },
		);
		//console.log("response:",tasksResponse.data)
		if (tasksResponse.data) {
			localStorage.setItem("taskCount", tasksResponse.data.count);
			setTasks(tasksResponse.data.items);
			setTotalTasks(parseInt(tasksResponse.data.count))
		} else { console.log("error on reading tasks api from shub/local/tasks") }
	};
	const getSearchTasks = async () => {
		const tasksResponse = await userRequest.get(`tasks/get-tasks`,
			{
				params: {
					limit: constants.PAGING_PARTNERS_SIZE,
					skip: tasksPagingFrom - 1,
					taskName: searchInputes.TaskName,
					taskID: searchInputes.TaskId
				}
			},
		);
		localStorage.setItem("taskCount", tasksResponse.data.count);
		setTotalTasks(parseInt(tasksResponse.data.count))
		setTasks(tasksResponse.data.tasks);
	};


	useEffect(() => {
		getAllTasks();
	}, []);

	const GoToTaskListings = (task, accountId) => {
		console.log("see listings for account:", accountId, task.source);
		localStorage.setItem("task", JSON.stringify(task))
		if (!task.offsetRead) {
			swal({
				show: true,
				icon: 'error',
				title: 'Opps!!',
				text: "No Data Found on Account ID :" + accountId + ' channel: ' + task.source
			})
		} else {
			history.push(PATH_LISTINGS, { task, accountId, source: task.source });
		}

	};

	const doSearch = pageNumber => {
		tasksPagingFrom = 1 + pageNumber * constants.PAGING_PARTNERS_SIZE;
		tasksPagingTo = (tasksPagingFrom + constants.PAGING_PARTNERS_SIZE > totalTasks) ? totalTasks : tasksPagingFrom + constants.PAGING_PARTNERS_SIZE
		console.log("skipping : ", tasksPagingFrom - 1);
		getAllTasks();
		//setShowSelection(false);
		//dispatch(TaskActions.loadtasks(pageNumber));
	};


	const onChangePage = pageNumber => {
		console.log("page=", pageNumber + 1);
		setPageNumber(pageNumber);
		doSearch(pageNumber);
	};

	const menuStyle = () => {
		const pos = divRefs.current[selectedRowToEdit.id].getBoundingClientRect();
		const top = (pos.top > window.innerHeight) ? (window.innerHeight) : pos.top;
		return { top: `${top}px`, left: `${pos.left - 170}px` };
	};

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const clearEditMenu = () => {
		setSelectedRowToEdit(null);
		goToTop()
	};
	const onClose = () => {
		setSelectedRowToEdit(null);
		setSelectedTask(null)
		setSelectedTaskToDelete(null)
		setSelectedTaskToEdit(null)
		document.body.style.overflow = "auto";
	};

	const onShowEditMenu = (row) => {
		setSelectedRowToEdit(row);
		console.log("Row to edit=", row);
	};

	const onEditTask = (id, selectedTask) => {
		console.log(id, selectedTask)
		seteditClickedId(id)
		setSelectedTaskToEdit(selectedTask);
		clearEditMenu();
		document.body.style.overflow = "hidden";
	};

	const updateTask = (accountId, editedTask) => {
		console.log("task to save:", accountId, editedTask)
	};

	const onAddTaskSH = () => {
		seteditClickedId(0)
		setSelectedTaskToEdit(NEW_PARTNER_SH);
		document.body.style.overflow = "hidden";
		clearEditMenu();
	};
	const onAddTaskVT = () => {
		seteditClickedId(0)
		setSelectedTaskToEdit(NEW_PARTNER_VT);
		document.body.style.overflow = "hidden";
		clearEditMenu();
	};

	const onDeleteTask = () => {
		setSelectedTaskToDelete(selectedRowToEdit);
		document.body.style.overflow = "hidden";
		clearEditMenu();
	};

	const onTaskToApprove = (row) => {
		setTaskToApprove(row);
		console.log("Row to approve=", row);
		console.log("country=", row.country);
		const ccIndex = countryList.findIndex((i) => i.name === row.country);
		const cc = ccIndex ? countryList[ccIndex].code : "";
		console.log("countryCode=", cc);

	};
	function getCountryCode(row) {
		const ccIndex = countryList.findIndex((i) => i.name === row.country);
		const cc = ccIndex ? countryList[ccIndex].code : "";
		return cc;
	}

	const columns = [
		{
			name: '#',
			width: '50px'
		},
		{
			name: 'Task Name',
			width: '350px'
		}, {
			name: 'Source',
			width: '80px'
		}, {
			name: 'Account ID',
			width: '250px'
		}, {
			name: 'Status',
			width: '80px'
		}, {
			name: 'Running?',
			sortable: true,
			width: '150px'
		}, {
			name: 'Updated at',
			width: '300px'
		}, {
			name: 'frequency',
			width: '300px'
		}, {
			name: 'preferred Time',
			width: '300px'
		},{
			name: 'Last run',
			width: '300px'
		},
	];

	// selectedRowToEdit && console.log("pos: ", selectedRowToEdit.id, divRefs.current[selectedRowToEdit.id].getBoundingClientRect().top);
	// paging numbering:

	const handleSearchFuntionality = (value, name) => {
		console.log(name, value, "added as a search input")
		setsearchInputes({ ...searchInputes, [name]: value })
	}
	const handlSearchButtonAdmin = () => {
		getSearchTasks();
	}
	function handekanda(status) {
		if (status !== "pending") {
			setTaskToDisApprove("null")
		}
	}
	const renderChannels = (row) => {
		return (
			<div className="channels-main-selection-icons"
				style={{
					paddingTop: '15px',
					display: 'grid',
					gridTemplateColumns: '80px 80px 80px',
					justifyItems: 'center',
				}}>
				<CollectionIcon
					path={VTChannelIcon}
					pathOver={VTChannelIconOn}
					selected={row?.source?.indexOf("VT") > -1}
					selected2={false}
					label={VTChannelLabel}
					readOnly={true}
				/>
				<CollectionIcon
					readOnly={true}
					path={SHChannelIcon}
					pathOver={SHChannelIconOn}
					pathOver2={SHChannelIconOnBlue}
					selected={row?.source?.indexOf("SH") > -1}
					selected2={false}
					label={SHChannelLabel}
				/>
			</div>
		)
	};
	return (
		<div className="page-container">
			<div className="page-header">Villa Tracker Extranet : PMs</div>
			<Sidebar
				agency={agency}
				agent={agent}
				token={token}
				screenSize={screenSize}
				activeMenu={activeMenu}
				handleToggleMenu={handleToggleMenu}
			/>
			<div className={activeMenu ? `${"page-body"}` : "page-body"} >

				<div className="agencies-container" >
					<PageHeader handleSearchFuntionality={handleSearchFuntionality} searchInputes={searchInputes} handlSearchButtonAdmin={handlSearchButtonAdmin} searchOpen={null} topBgColor="rgb(119, 198, 85)" />
					{selectedRowToEdit &&
						<>
							<div className="agencies-floating-edit-menu-floater" onClick={clearEditMenu} />
							<div className="agencies-floating-edit-menu" style={menuStyle()}>
								{/* <div className="agencies-floating-edit-menu-row" onClick={onEditTask}><img src={editAdminIcon} alt="" />&nbsp;&nbsp;Edit Task</div> */}
								<div className="agencies-floating-edit-menu-row" onClick={onDeleteTask}><img src={deleteAdminIcon} alt="" />&nbsp;&nbsp;Delete Task</div>
								<div className="agencies-floating-edit-menu-row" onClick={onAddTaskSH}><img src={addAdminIcon} alt="" />&nbsp;&nbsp;Add Task</div>
								<div className="agencies-floating-edit-menu-row" onClick={clearEditMenu}>&nbsp;&nbsp;close X</div>
							</div>
						</>
					}

					{taskToApprove &&
						<Popup width={820} onClose={onClose}>
							<ApproveAgent task={taskToApprove} onClose={onClose} />
						</Popup>
					}
					{taskToDisApprove &&
						<Popup width={820} onClose={onClose}>
							<DisApproveAgent task={taskToDisApprove} onClose={onClose} />
						</Popup>
					}

					{selectedTaskToDelete &&
						<Popup width={820} onClose={onClose}>
							<DeleteTask task={selectedTaskToDelete} onClose={onClose} />
						</Popup>
					}
					{selectedTaskToEdit &&
						<div className="popup-wrapper" >
							<div className="popup-container p-2" style={{ width: "730px" }} >
								<EditTask newTaskID={parseInt(totalTasks) + 1} editClickedId={editClickedId} editTaskId={editTaskId} task={selectedTaskToEdit} tasks={tasks} onClose={onClose} />					</div>
						</div>
					}
					{
						SelectedTask &&
						<ClientOfferLog
							token={token}
							task={SelectedTask}
							onClose={onClose}
						/>
					}
					<div className="agencies-main">
						<div className="agencies-title">
							<button class="dropdown-item" onClick={onAddTaskSH}><img src={addAdminIcon} alt='add task' /> ADD TASK </button>
							<div className="agencies-main-subtitle">Displaying Tasks {tasksPagingFrom}-{tasksPagingTo} of {totalTasks ? totalTasks : "?"}
							</div>
						</div>
						{<Paging perPage={constants.PAGING_PARTNERS_SIZE} totalItems={localStorage.getItem("taskCount")} currentPage={pageNumber} onChangePage={onChangePage} />}
						<div className="table-responsive px-3">
							<table class="table">
								<thead style={{ backgroundColor: "#f9f9f7" }} >
									<tr>
										{columns?.map((item, index) => {
											return <>
												<th scope="col" style={{ cursor: "pointer", width: item.width }}><h3>{item.name} <BsChevronDown /></h3></th>
											</>
										})}
									</tr>
								</thead>
								<tbody>
									{tasks?.map((item, index) => {
										console.log("item ", index, item)
										return <>
											<tr >
												<td className="number px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4 onClick={() => onEditTask(item._id, item.taskId)}>{totalTasks - tasksPagingFrom - index + 1}</h4></td>
												<td className="pmName px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4 onClick={() => onEditTask(item._id, item)}>{item.name != null ? item.name : ""}</h4></td>
												<td className="Source px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4 onClick={() => onEditTask(item._id, item.taskId)}>{item.source != null ? item.source : "SH"}</h4></td>
												<td className="accountId px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => onEditTask(item._id, item)}>{item.accountId !== null ? item.accountId : ""}</h4></td>
												<td className="Status px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToTaskListings(item, item.accountId)}>{item.status ? item.status : "No status"}</h4></td>
												<td className="isRunning provider px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => onEditTask(item._id, item.clientId)}>{item.isRunning ? "YES" : "NO"}</h4></td>
												<td className="Updated px-4 p-3"><h4>{item.updatedAt !== null && item.updatedAt !== "" ? item.updatedAt.slice(0, 10) : ""}</h4></td>
												<td className="frequency px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToTaskListings(item, item.clientId)}>{item.frequency ? item.frequency : "-"}</h4></td>
												<td className="preferredTime px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToTaskListings(item, item.clientId)}>{item.preferredTime ? item.preferredTime : "-"}</h4></td>
												<td className="preferredTime px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToTaskListings(item, item.clientId)}>{item.lastStartTime ? item.lastStartTime.slice(0, 10) : "-"}</h4></td>
											</tr >
										</>
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div >
			</div>
		</div>
	);
};

export default Tasks;
