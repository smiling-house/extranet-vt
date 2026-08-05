// ---------------------------------------------------------------------------
// External Partners (EPS) — admin list page.
//
// Redesigned 2026-08 to the shared modern list language (PartnersListView /
// /listings): page-hero + toolbar + card table with status pills, skeletons,
// empty state. All legacy behaviour is preserved:
//   * row click            → EditEPartner popup (edit / CSV upload / shared
//                            listings / remove partner)
//   * status cell click    → EPS partner-manage page
//   * count pills click    → EPS listings drill-down (swal if nothing shared)
//   * "Add Partner" button → EditEPartner in add mode with a fresh
//                            partnerId + bearerToken (this action existed but
//                            had no visible trigger in the old UI)
// Data source unchanged: SHub GET local/external-partners (limit/skip +
// optional partnerName / partnerId search).
// ---------------------------------------------------------------------------

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import {
	FiUsers,
	FiChevronRight,
	FiChevronLeft,
	FiPlus,
} from "react-icons/fi";

import Layout from "../../components/Layout";
import Paging from "../../components/Paging/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import EditEPartner from "./EditEPartner/index.js";
import ClientOfferLog from "./ClientOfferLog/index.js";
import constants, {
	PATH_EPS_LISTINGS,
	PATH_EPS_EPARTNER_MANAGE,
} from "../../Util/constants.js";

import "../PartnersListView/PartnersListView.scss";
import "./EPartner.scss";

const NEW_EPARTNER = {
	id: "-1",
	partnerName: "",
	contactName: "",
	email: "",
	partnerPhone: "",
	partnerId: "",
	bearerToken: "",
};

const userRequest = axios.create({
	baseURL: constants.SHUB_URL,
	headers: { Authorization: constants.SHUB_TOKEN },
});

// Count pill — same visual contract as PartnersListView's CountPill.
function CountPill({ variant, value, onClick, title }) {
	const isZero = !value || Number(value) === 0;
	return (
		<span
			className={`status-pill ${variant} ${isZero ? "is-zero" : ""}`}
			title={title}
			onClick={(e) => {
				if (isZero) return;
				e.stopPropagation();
				onClick?.();
			}}
		>
			{isZero ? "—" : value}
		</span>
	);
}

const EPartners = (props) => {
	const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props;

	const history = useHistory();

	const [EPartners, setEPartners] = useState([]);
	const [totalEPartners, setTotalEPartners] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefetching, setIsRefetching] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);

	// Debounced server-side search (partnerName wins over partnerId, matching
	// the legacy getSearchEPartners behaviour).
	const [searchNameRaw, setSearchNameRaw] = useState("");
	const [searchIdRaw, setSearchIdRaw] = useState("");
	const [searchName, setSearchName] = useState("");
	const [searchId, setSearchId] = useState("");
	const searchDebounceRef = useRef(null);

	// Popups
	const [editClickedId, seteditClickedId] = useState("");
	const [selectedEPartnerToEdit, setSelectedEPartnerToEdit] = useState(null);
	const [SelectedEPartner, setSelectedEPartner] = useState(null); // ClientOfferLog

	const EPartnersPagingFrom = 1 + pageNumber * constants.PAGING_EPARTNERS_SIZE;
	const EPartnersPagingTo = useMemo(() => {
		const cap = EPartnersPagingFrom + constants.PAGING_EPARTNERS_SIZE - 1;
		return totalEPartners && cap > totalEPartners ? totalEPartners : cap;
	}, [EPartnersPagingFrom, totalEPartners]);

	const totalPages = useMemo(() => {
		if (!totalEPartners) return 1;
		return Math.max(1, Math.ceil(totalEPartners / constants.PAGING_EPARTNERS_SIZE));
	}, [totalEPartners]);

	const loadEPartners = useCallback(
		async (isFirstLoad = false) => {
			if (isFirstLoad) setIsLoading(true);
			else setIsRefetching(true);
			const params = {
				limit: constants.PAGING_EPARTNERS_SIZE,
				skip: EPartnersPagingFrom - 1,
			};
			if (searchName) params.partnerName = searchName;
			else if (searchId) params.partnerId = searchId;
			try {
				const res = await userRequest.get(`local/external-partners`, { params });
				const data = res?.data || {};
				setEPartners(Array.isArray(data.partners) ? data.partners : []);
				const count = parseInt(data.count) || 0;
				setTotalEPartners(count);
				localStorage.setItem("EpartnerCount", String(count));
			} catch (e) {
				console.error("local/external-partners failed", e?.message || e);
				setEPartners([]);
				setTotalEPartners(0);
			}
			setIsLoading(false);
			setIsRefetching(false);
		},
		[EPartnersPagingFrom, searchName, searchId]
	);

	const firstLoadDoneRef = useRef(false);
	useEffect(() => {
		const isFirst = !firstLoadDoneRef.current;
		loadEPartners(isFirst);
		firstLoadDoneRef.current = true;
	}, [loadEPartners]);

	useEffect(() => {
		if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
		searchDebounceRef.current = setTimeout(() => {
			setSearchName(searchNameRaw.trim());
			setSearchId(searchIdRaw.trim());
			setPageNumber(0);
		}, 300);
		return () => {
			if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
		};
	}, [searchNameRaw, searchIdRaw]);

	// -------------------------------------------------------------------------
	// Navigation / actions (unchanged behaviour)
	// -------------------------------------------------------------------------
	const GoToEPartnerListings = (Epartner, partnerId) => {
		localStorage.setItem("Epartner", JSON.stringify(Epartner));
		localStorage.setItem("EpartnerIds", JSON.stringify(Epartner.ids));
		if (!Epartner.ids) {
			swal({
				show: true,
				icon: "error",
				title: "Opps!!",
				text: "still No shared listings Data Found for partner ID :" + partnerId,
			});
		} else {
			history.push(PATH_EPS_LISTINGS, { Epartner, partnerId });
		}
	};

	const goToEpartnerManage = (ePartnerEmail, ePartner) => {
		localStorage.setItem("ePartnerEmail", ePartnerEmail);
		localStorage.setItem("Epartner", JSON.stringify(ePartner));
		history.push(PATH_EPS_EPARTNER_MANAGE);
	};

	const onChangePage = (nextPage) => {
		setPageNumber(nextPage);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const onClose = () => {
		setSelectedEPartner(null);
		setSelectedEPartnerToEdit(null);
		loadEPartners();
		document.body.style.overflow = "auto";
	};

	const onEditEPartner = (id, selectedEPartner) => {
		seteditClickedId(id);
		setSelectedEPartnerToEdit(selectedEPartner);
		document.body.style.overflow = "hidden";
	};

	const onAddEPartner = () => {
		seteditClickedId(0);
		setSelectedEPartnerToEdit({
			...NEW_EPARTNER,
			partnerId: uuidv4(),
			bearerToken: uuidv4(),
		});
		document.body.style.overflow = "hidden";
	};

	const clearSearch = () => {
		setSearchNameRaw("");
		setSearchIdRaw("");
		setSearchName("");
		setSearchId("");
		setPageNumber(0);
	};

	const hasActiveFilters = !!(searchName || searchId);
	const showEmpty = !isLoading && EPartners.length === 0;
	const serialBase = pageNumber * constants.PAGING_EPARTNERS_SIZE;

	// Shared / connected / pending / disconnected counts from the ids map.
	const countIds = (item) => {
		let connected = 0, disconnected = 0, pending = 0;
		if (item?.ids && typeof item.ids === "object") {
			Object.values(item.ids).forEach((idObj) => {
				if (idObj?.status === "connected") connected++;
				else if (idObj?.status === "disconnected") disconnected++;
				else if (idObj?.status === "pending") pending++;
			});
		}
		return { connected, disconnected, pending, shared: connected + disconnected + pending };
	};

	return (
		<Layout
			pageTitle="External Partners"
			agency={agency}
			agent={agent}
			token={token}
			screenSize={screenSize}
			activeMenu={activeMenu}
			handleToggleMenu={handleToggleMenu}
			setActiveMenu={setActiveMenu}
		>
			<div className="partners-view epartners-view">
				<LoadingBox visible={isLoading} />

				{/* Hero */}
				<div className="page-hero">
					<div className="page-hero-left">
						<div className="page-hero-icon">
							<FiUsers size={22} />
						</div>
						<div>
							<h1 className="page-hero-title">External Partners</h1>
							<p className="page-hero-subhead">
								EPS partners receiving shared listings via the External Partner API
							</p>
						</div>
					</div>
					<div className="page-hero-meta">
						<span className="page-hero-pill">
							{totalEPartners
								? `${totalEPartners} partner${totalEPartners === 1 ? "" : "s"}`
								: "— partners"}
						</span>
						<div className="page-hero-pager" role="group" aria-label="Pagination">
							<button
								type="button"
								className="page-hero-pager-btn"
								onClick={() => onChangePage(Math.max(0, pageNumber - 1))}
								disabled={pageNumber <= 0}
								aria-label="Previous page"
								title="Previous page"
							>
								<FiChevronLeft size={16} />
							</button>
							<span className="page-hero-pager-label">
								Page {pageNumber + 1} of {totalPages}
							</span>
							<button
								type="button"
								className="page-hero-pager-btn"
								onClick={() => onChangePage(Math.min(totalPages - 1, pageNumber + 1))}
								disabled={pageNumber >= totalPages - 1}
								aria-label="Next page"
								title="Next page"
							>
								<FiChevronRight size={16} />
							</button>
						</div>
					</div>
				</div>

				{/* Toolbar */}
				<div className="toolbar">
					<div className="search-wrap">
						<IoIosSearch className="search-icon" />
						<input
							type="text"
							className="search-input"
							placeholder="Search by partner name…"
							value={searchNameRaw}
							onChange={(e) => setSearchNameRaw(e.target.value)}
							aria-label="Search partners by name"
						/>
						{isRefetching && !searchNameRaw && (
							<span className="search-spinner" aria-hidden="true" />
						)}
						{searchNameRaw && (
							<button
								type="button"
								className="search-clear"
								onClick={clearSearch}
								aria-label="Clear search"
								title="Clear search"
							>
								<IoMdClose size={16} />
							</button>
						)}
					</div>

					<div className="search-wrap epartners-id-search">
						<IoIosSearch className="search-icon" />
						<input
							type="text"
							className="search-input"
							placeholder="Partner ID…"
							value={searchIdRaw}
							onChange={(e) => setSearchIdRaw(e.target.value)}
							aria-label="Search partners by partner ID"
						/>
						{searchIdRaw && (
							<button
								type="button"
								className="search-clear"
								onClick={() => setSearchIdRaw("")}
								aria-label="Clear partner ID"
								title="Clear partner ID"
							>
								<IoMdClose size={16} />
							</button>
						)}
					</div>

					<button type="button" className="epartners-add-btn" onClick={onAddEPartner}>
						<FiPlus size={16} />
						<span>Add Partner</span>
					</button>
				</div>

				{/* Popups */}
				{selectedEPartnerToEdit && (
					<div className="popup-wrapper">
						<div className="popup-container p-2 epartner-edit-popup" style={{ width: "730px" }}>
							<EditEPartner
								agent={agent}
								newPartnerID={parseInt(totalEPartners) + 1}
								editClickedId={editClickedId}
								partner={selectedEPartnerToEdit}
								partners={EPartners}
								onClose={onClose}
							/>
						</div>
					</div>
				)}
				{SelectedEPartner && (
					<ClientOfferLog token={token} partner={SelectedEPartner} onClose={onClose} />
				)}

				{/* Table card */}
				<div className="partners-card">
					<div className="partners-table-scroll">
						<table className="partners-table epartners-table">
							<thead>
								<tr>
									<th style={{ width: 44 }}>#</th>
									<th>Partner Name</th>
									<th>Partner ID</th>
									<th style={{ width: 90 }}>Status</th>
									<th style={{ width: 90 }}>Shared</th>
									<th style={{ width: 100 }}>Connected</th>
									<th style={{ width: 100 }}>Pending</th>
									<th style={{ width: 110 }}>Disconnected</th>
									<th>Uploading Agent</th>
									<th>Contact</th>
									<th>Phone</th>
									<th>Email</th>
									<th style={{ width: 90 }}>Provider</th>
									<th style={{ width: 110 }}>Updated</th>
									<th style={{ width: 32 }} aria-label="Open" />
								</tr>
							</thead>
							<tbody>
								{isLoading &&
									Array.from({ length: 6 }).map((_, i) => (
										<tr key={`skeleton-${i}`}>
											<td className="serial">
												<span className="skeleton-block" style={{ width: 22 }} />
											</td>
											<td>
												<span className="skeleton-block" style={{ width: 180 }} />
											</td>
											<td>
												<span className="skeleton-block" style={{ width: 220 }} />
											</td>
											{[0, 1, 2, 3, 4].map((k) => (
												<td key={k}>
													<span className="skeleton-pill" />
												</td>
											))}
											{[0, 1, 2, 3, 4, 5].map((k) => (
												<td key={`b-${k}`}>
													<span className="skeleton-block" style={{ width: 90 }} />
												</td>
											))}
											<td />
										</tr>
									))}

								{!isLoading &&
									EPartners.map((item, index) => {
										const counts = countIds(item);
										return (
											<tr
												key={item._id || `${item.partnerId}-${index}`}
												onClick={() => onEditEPartner(item._id, item)}
											>
												<td className="serial" data-label="#">
													{serialBase + index + 1}
												</td>
												<td className="pm-name" data-label="Partner Name" title={item.partnerName || ""}>
													{item.partnerName || "—"}
												</td>
												<td className="account-id" data-label="Partner ID" title={item.partnerId || ""}>
													{item.partnerId || ""}
												</td>
												<td data-label="Status">
													<span
														className={`epartners-status-badge ${String(item.status || "").toLowerCase()}`}
														title="Open partner manage page"
														onClick={(e) => {
															e.stopPropagation();
															goToEpartnerManage(item.email, item);
														}}
													>
														{item.status || "—"}
													</span>
												</td>
												<td data-label="Shared">
													<CountPill
														variant="total"
														value={counts.shared}
														title="View shared listings"
														onClick={() => GoToEPartnerListings(item, item.partnerId)}
													/>
												</td>
												<td data-label="Connected">
													<CountPill
														variant="approved"
														value={counts.connected}
														title="View shared listings"
														onClick={() => GoToEPartnerListings(item, item.partnerId)}
													/>
												</td>
												<td data-label="Pending">
													<CountPill
														variant="pending"
														value={counts.pending}
														title="View shared listings"
														onClick={() => GoToEPartnerListings(item, item.partnerId)}
													/>
												</td>
												<td data-label="Disconnected">
													<CountPill
														variant="declined"
														value={counts.disconnected}
														title="View shared listings"
														onClick={() => GoToEPartnerListings(item, item.partnerId)}
													/>
												</td>
												<td className="epartners-secondary" data-label="Uploading Agent">
													{item.agent || "—"}
												</td>
												<td className="epartners-secondary" data-label="Contact">
													{item.contactName || "—"}
												</td>
												<td className="epartners-secondary" data-label="Phone">
													{item.partnerPhone || item.pmPhone || "—"}
												</td>
												<td className="epartners-secondary epartners-email" data-label="Email" title={item.email || ""}>
													{item.email || "—"}
												</td>
												<td className="epartners-secondary" data-label="Provider">
													{item.provider || "—"}
												</td>
												<td className="onboarded" data-label="Updated">
													{item.updatedAt ? String(item.updatedAt).slice(0, 10) : "—"}
												</td>
												<td className="arrow-cell" aria-hidden="true">
													<FiChevronRight className="row-arrow" />
												</td>
											</tr>
										);
									})}

								{showEmpty && (
									<tr>
										<td colSpan={15} style={{ padding: 0 }}>
											<div className="empty-state">
												<div className="empty-state-icon">
													<FiUsers />
												</div>
												<h3 className="empty-state-title">No external partners found</h3>
												<p className="empty-state-hint">
													{hasActiveFilters
														? "Try clearing your search."
														: "Add your first external partner to start sharing listings."}
												</p>
												{hasActiveFilters ? (
													<button type="button" className="empty-state-action" onClick={clearSearch}>
														Clear search
													</button>
												) : (
													<button type="button" className="empty-state-action" onClick={onAddEPartner}>
														Add Partner
													</button>
												)}
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{totalEPartners > 0 && (
						<div className="partners-card-footer">
							<Paging
								perPage={constants.PAGING_EPARTNERS_SIZE}
								totalItems={totalEPartners}
								currentPage={pageNumber}
								onChangePage={onChangePage}
							/>
							<div
								style={{
									textAlign: "right",
									fontSize: "0.78rem",
									color: "#6b7280",
									marginTop: 6,
								}}
							>
								Displaying {EPartnersPagingFrom}–{EPartnersPagingTo} of {totalEPartners}
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default EPartners;
