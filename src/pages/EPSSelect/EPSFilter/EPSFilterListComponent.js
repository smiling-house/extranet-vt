import React, { useCallback, useEffect, useState } from "react"

const EPSFilterListComponent = (props) => {
    const { searchTerm, filterbyvaldata , searchFilteredListData, indx , handleFilterSearch, handlefilterbyvaldataChange } = props;

    return (
        <div className="dropdown-menu" style={{minWidth: '250px', width: '250px', padding: '5px'}}>
            <input 
                type="text" 
                className="form-control mb-2 fs-16p" 
                placeholder="Search ..." 
                style={{padding: "5px 5px", height: 'unset'}}
                value={searchTerm[indx]} 
                onChange={(e) => handleFilterSearch(e, indx)} 
            />
            <ul className="list-unstyled m-0" style={{maxHeight: '250px', height: "250px", overflow: 'hidden', overflowY: 'auto'}}>
                {
                    filterbyvaldata[indx].value.length ? (filterbyvaldata[indx].value.map((item, index) => (
                        <li key={`cntry${index}`} className="dropdown-item" style={{whiteSpace: "normal", wordWrap: "break-word", fontSize: '16px'}}>
                            <label className="d-flex align-items-center">
                            <input 
                                type="checkbox" 
                                className="form-check-input me-2" 
                                checked={filterbyvaldata[indx].value.includes(item)} 
                                onChange={(e) => handlefilterbyvaldataChange(e, item, indx)} 
                            />
                            <b>{ item }</b>
                            </label>
                        </li>
                    ))) : ('')
                }
                {
                    filterbyvaldata[indx].value.length ? (<div class="dropdown-divider"></div>) : ('')
                }
                {
                    searchFilteredListData[indx].map((item, index) => (
                        <li key={`cntry${index}`} className="dropdown-item" style={{whiteSpace: "normal", wordWrap: "break-word", fontSize: '16px'}}>
                            <label className="d-flex align-items-center">
                            <input 
                                type="checkbox" 
                                className="form-check-input me-2" 
                                checked={filterbyvaldata[indx].value.includes(item)} 
                                onChange={(e) => handlefilterbyvaldataChange(e, item, indx)} 
                            />
                            { item }
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default EPSFilterListComponent