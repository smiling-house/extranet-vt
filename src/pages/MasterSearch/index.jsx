import React, { useState } from "react"
import axios from "axios"
import Layout from "../../components/Layout"
import pageBg from '../../assets/bk_pool.png'
import constants from "../../Util/constants"
import { ShubAuth } from "../../core"
import "./MasterSearch.scss"

// One search box across every source/PMS on BOTH hubs. Each hub is queried in
// parallel with the same keyword; a failing hub reports its error without
// hiding the other hub's results.
const HUBS = [
    { key: 'VT', label: 'VT Hub', url: constants.SHUB_URL },            // api.villatracker.com
    { key: 'SH', label: 'SH Hub', url: 'https://api.triangle.luxury' }, // SHub
]

const RESULTS_PER_HUB = 100

// Raw listing.source values as they exist in both hubs' Mongo (verified against
// live data): G, guesty_channel_api, RU, BP, HW, VillasInStBarth, InvenioHomes,
// smiling_house_api (+EX), and a handful of docs with no source at all.
const pmsOf = (item) => {
    const src = item?.source || ''
    const cs = item?.channelSource || ''
    if (src === 'G') return { label: 'Guesty / RU-DH (G-)', cls: 'pms-rudh' }
    if (src === 'guesty_channel_api' || src === 'guesty_partner_api') return { label: 'Guesty (Legacy)', cls: 'pms-guesty' }
    if (src === 'RU') return { label: 'Rentals United', cls: 'pms-ru' }
    if (src === 'BP' || cs === 'BP') return { label: 'BookingPal', cls: 'pms-bp' }
    if (src === 'HW' || cs === 'Hostaway') return { label: 'Hostaway', cls: 'pms-hostaway' }
    if (src === 'VillasInStBarth') return { label: 'VillasInStBarth (BART)', cls: 'pms-bart' }
    if (src === 'InvenioHomes') return { label: 'Invenio Homes', cls: 'pms-invenio' }
    if (cs === 'EX' || src === 'smiling_house_api') return { label: 'External (EX)', cls: 'pms-ex' }
    return { label: src || cs || 'Unknown / Legacy', cls: 'pms-legacy' }
}

const statusCls = (status) => {
    const s = String(status || '').toLowerCase()
    if (s === 'approved') return 'st-approved'
    if (s === 'pending') return 'st-pending'
    if (s === 'declined') return 'st-declined'
    return 'st-other'
}

const MasterSearch = ({ agent, agency, token, screenSize, activeMenu, handleToggleMenu, setActiveMenu }) => {

    const [keyword, setKeyword] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [listedFilter, setListedFilter] = useState('All')
    const [hubsEnabled, setHubsEnabled] = useState({ VT: true, SH: true })
    const [isLoading, setIsLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [hubResults, setHubResults] = useState({})   // key -> {count, shown, error}
    const [searched, setSearched] = useState(false)

    const hubRequest = axios.create({
        headers: { Authorization: `Bearer ${ShubAuth}` }
    })

    const searchHub = async (hub) => {
        const params = {
            extranetSearchListingsKeyWord: keyword.trim(),
            isListed: listedFilter,
            noCals: 1,
            limit: RESULTS_PER_HUB,
            skip: 0,
            sortBy: 'data.nickname:1',
        }
        if (statusFilter) params.status = statusFilter

        const response = await hubRequest.get(`${hub.url}/local/listings`, { params })
        const listings = response?.data?.listings || []
        return {
            count: response?.data?.count ?? listings.length,
            items: listings.map(item => ({ ...item, __hub: hub.key })),
        }
    }

    const doSearch = async () => {
        const kw = keyword.trim()
        if (kw.length < 2) return
        setIsLoading(true)
        setSearched(true)

        const activeHubs = HUBS.filter(h => hubsEnabled[h.key])
        const settled = await Promise.allSettled(activeHubs.map(searchHub))

        const nextRows = []
        const nextHubResults = {}
        settled.forEach((result, i) => {
            const hub = activeHubs[i]
            if (result.status === 'fulfilled') {
                nextHubResults[hub.key] = { count: result.value.count, shown: result.value.items.length }
                nextRows.push(...result.value.items)
            } else {
                console.log(`master-search ${hub.key} failed:`, result.reason)
                nextHubResults[hub.key] = { error: result.reason?.message || 'request failed' }
            }
        })

        nextRows.sort((a, b) =>
            String(a?.listing?.nickname || a?.listing?.title || '')
                .localeCompare(String(b?.listing?.nickname || b?.listing?.title || '')))

        setRows(nextRows)
        setHubResults(nextHubResults)
        setIsLoading(false)
    }

    const copyId = (id) => {
        try { navigator.clipboard.writeText(id) } catch (e) { /* older browsers */ }
    }

    const renderCounts = () => {
        if (!searched) return null
        return (
            <div className="master-search-counts">
                {HUBS.filter(h => hubsEnabled[h.key]).map(h => {
                    const r = hubResults[h.key]
                    if (!r) return null
                    return (
                        <span key={h.key} style={{ marginRight: '18px' }}>
                            <span className={`ms-badge hub-${h.key.toLowerCase()}`}>{h.label}</span>{' '}
                            {r.error
                                ? <span className="hub-err">error: {r.error}</span>
                                : <>{r.count} match{r.count === 1 ? '' : 'es'}{r.count > r.shown ? ` (showing first ${r.shown})` : ''}</>}
                        </span>
                    )
                })}
            </div>
        )
    }

    return (
        <Layout
            pageTitle="Master Search"
            agency={agency}
            agent={agent}
            token={token}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
        >
            <div className="master-search-container" style={{ backgroundImage: `url(${pageBg})` }}>
                <div className="master-search-main">
                    <h1>Master Search — All Sources</h1>
                    <div className="master-search-subtitle">
                        One search across both hubs and every PMS/channel (Guesty, RU-DH, Rentals United, BookingPal, Hostaway, BART, Invenio, External). Matches property ID, title or nickname.
                    </div>

                    <div className="master-search-bar">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Property ID / Title / Nickname (min 2 chars)"
                            value={keyword}
                            autoFocus
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') doSearch() }}
                        />
                        <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">Status: All</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Declined">Declined</option>
                        </select>
                        <select className="form-control" value={listedFilter} onChange={(e) => setListedFilter(e.target.value)}>
                            <option value="All">Listed + Unlisted</option>
                            <option value="Listed">Listed only</option>
                            <option value="Unlisted">Unlisted only</option>
                        </select>
                        <button className="master-search-btn" disabled={isLoading || keyword.trim().length < 2} onClick={doSearch}>
                            {isLoading ? 'Searching…' : 'Search'}
                        </button>
                    </div>

                    <div className="master-search-hubtoggles">
                        <strong>Hubs:</strong>
                        {HUBS.map(h => (
                            <label key={h.key}>
                                <input
                                    type="checkbox"
                                    checked={hubsEnabled[h.key]}
                                    onChange={() => setHubsEnabled({ ...hubsEnabled, [h.key]: !hubsEnabled[h.key] })}
                                />
                                {h.label}
                            </label>
                        ))}
                    </div>

                    {renderCounts()}

                    {rows.length > 0 &&
                        <div style={{ overflowX: 'auto' }}>
                            <table className="master-search-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Hub</th>
                                        <th>Source / PMS</th>
                                        <th>ID</th>
                                        <th>Nickname</th>
                                        <th>Title</th>
                                        <th>PM</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Listed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((item, idx) => {
                                        const d = item.listing || {}
                                        const x = item.xdata || {}
                                        const id = d._id || ''
                                        const pms = pmsOf(item)
                                        const thumb = d.picture?.thumbnail
                                        const isGuestyId = /^[0-9a-f]{24}$/.test(id)
                                        return (
                                            <tr key={`${item.__hub}-${id}-${idx}`}>
                                                <td>{thumb ? <img className="ms-thumb" src={thumb} alt="" /> : null}</td>
                                                <td><span className={`ms-badge hub-${item.__hub.toLowerCase()}`}>{item.__hub}</span></td>
                                                <td><span className={`ms-badge ${pms.cls}`}>{pms.label}</span></td>
                                                <td className="ms-id" title="Click to copy" onClick={() => copyId(id)}>
                                                    {isGuestyId
                                                        ? <a href={`https://app.guesty.com/properties/${id}/property/v2`} target="_blank" rel="noreferrer">{id}</a>
                                                        : id}
                                                </td>
                                                <td>{d.nickname || x.nickname || '-'}</td>
                                                <td className="ms-title">{d.title || '-'}</td>
                                                <td>{x.pmName || '-'}</td>
                                                <td>{[d.address?.city, d.address?.country].filter(Boolean).join(', ') || x.region || '-'}</td>
                                                <td><span className={`ms-badge ${statusCls(x.status)}`}>{x.status || '-'}</span></td>
                                                <td><span className={`ms-badge ${item.isListed ? 'listed-yes' : 'listed-no'}`}>{item.isListed ? 'Listed' : 'Unlisted'}</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }

                    {searched && !isLoading && rows.length === 0 &&
                        <div style={{ color: '#6b7f92', padding: '30px 0', textAlign: 'center' }}>
                            No listings matched "{keyword.trim()}" on the selected hubs.
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default MasterSearch
