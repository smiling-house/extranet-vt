import React, { useCallback, useEffect, useState } from "react"

const EPSFilterNumberComponent = (props) => {
    const { filterbyvaldata , indx , handleFilterOperatorChange, handlefilterNumberValueChange } = props;

    return (
        <div className="dropdown-menu" style={{minWidth: '250px', width: '250px', padding: '5px'}} onClick={(e) => e.stopPropagation()}>
            <div className="btn-group">
                <button 
                    type="button" 
                    className="btn dropdown-toggle" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{fontSize: "16px"}}
                >
                    {filterbyvaldata[indx].operator === '$lt' ? 'Less Than' : 
                    filterbyvaldata[indx].operator === '$lte' ? 'Less Than or Equal To' : 
                    filterbyvaldata[indx].operator === '$gt' ? 'Greater Than' : 
                    filterbyvaldata[indx].operator === '$gte' ? 'Greater Than or Equal To' : ''}
                    
                </button>
                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    
                    <div 
                        className="dropdown-item fs-16p" 
                        onClick={(e) => handleFilterOperatorChange(e, '$lt', indx)}
                    >
                        Less Than 
                    </div>
                    <div 
                        className="dropdown-item fs-16p" 
                        onClick={(e) => handleFilterOperatorChange(e, '$lte', indx)}
                    >
                        Less Than or Equal To
                    </div>
                    <div 
                        className="dropdown-item fs-16p" 
                        onClick={(e) => handleFilterOperatorChange(e, '$gt', indx)}
                    >
                        Greater Than 
                    </div>
                    <div 
                        className="dropdown-item fs-16p" 
                        onClick={(e) => handleFilterOperatorChange(e, '$gte', indx)}
                    >
                        Greater Than or Equal To
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Enter a number (1 - 50)" 
                    value={filterbyvaldata[indx].value[0]} 
                    onChange={(e) => handlefilterNumberValueChange(e, indx)} 
                />
            </div>
        </div>
    )
}

export default EPSFilterNumberComponent