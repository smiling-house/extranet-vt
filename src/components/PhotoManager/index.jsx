import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import Dialog from "@mui/material/Dialog"
import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import constants from "../../Util/constants"
import { ShubAuth } from "../../core"
import "./PhotoManager.scss"

// Per-listing photo manager (CloudStay-style), talking to the hub's
// listing_images curation API:
//   GET    /local/listings/:id/images
//   PUT    …/images/order     { order }
//   PUT    …/images/hidden    { urls, hidden, reason }   (admin)
//   PUT    …/images/category  { urls, category }
//   POST   …/images/upload    multipart "file"
//   DELETE …/images/upload    { url }                    (admin)
// The first 5 VISIBLE photos are the hero set (1 cover + 4 carousel) — moving a
// photo in or out of the top 5 is the only way to change it, same as CloudStay.
// Hidden photos stay visible to partners, greyed, with the reason, so they know
// what to replace; only admins can hide/unhide.

export const HERO_COUNT = 5
const STANDARD_CATEGORIES = ["exterior", "pool", "living", "kitchen", "dining", "view", "terrace", "garden", "amenities", "other"]

const hub = () => axios.create({
    baseURL: constants.SHUB_URL,
    headers: { Authorization: `Bearer ${ShubAuth}` }
})

const label = (s) => String(s || "").replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())

// Downscale big phone photos in the browser before upload (raw-first policy on
// the hub: no sharp). Keeps the bucket and the partner's upload time sane.
const MAX_EDGE = 2560
const shrink = (file) => new Promise((resolve) => {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return resolve(file)
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
        URL.revokeObjectURL(url)
        const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height))
        if (scale === 1 && file.size < 4 * 1024 * 1024) return resolve(file)
        const c = document.createElement("canvas")
        c.width = Math.round(img.width * scale)
        c.height = Math.round(img.height * scale)
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height)
        c.toBlob((b) => resolve(b ? new File([b], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file), "image/jpeg", 0.88)
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
})

const PhotoCard = ({ img, isAdmin, categories, selected, onSelect, onHide, onUnhide, onCategory, onMakeCover, onMoveTo, onDelete, dragHandle, style, dragging }) => {
    const heroBadge = img.position === 1 ? "Cover" : img.position && img.position <= HERO_COUNT ? `Carousel ${img.position}` : null
    return (
        <div className={`pm-card ${img.hidden ? "hidden" : ""} ${selected ? "selected" : ""} ${dragging ? "dragging" : ""}`} style={style} {...dragHandle}>
            <div className="pm-thumb">
                <img src={img.thumbnail || img.url} alt={img.caption || ""} loading="lazy" draggable={false} />
                <input type="checkbox" className="pm-select" checked={selected} onChange={() => onSelect(img.url)} onPointerDown={(e) => e.stopPropagation()} />
                {heroBadge && <span className={`pm-badge ${img.position === 1 ? "cover" : "carousel"}`}>{heroBadge}</span>}
                {!img.hidden && img.position > HERO_COUNT && <span className="pm-badge pos">#{img.position}</span>}
                {img.source === "upload" && <span className="pm-badge upload">Uploaded</span>}
                {img.brandingFlag?.branded && <span className="pm-badge ai" title="AI flagged branding / watermark / text on this photo">AI: branding</span>}
                {img.hidden && (
                    <div className="pm-hidden-overlay">
                        <strong>Hidden by Smiling House</strong>
                        <span>{label(img.hiddenReason || "other")}{img.hiddenBy ? ` · ${img.hiddenBy}` : ""}</span>
                    </div>
                )}
            </div>
            <div className="pm-card-actions" onPointerDown={(e) => e.stopPropagation()}>
                <select value={img.category || ""} onChange={(e) => onCategory([img.url], e.target.value)} title="Category">
                    <option value="">— category —</option>
                    {categories.map((c) => <option key={c} value={c}>{label(c)}</option>)}
                </select>
                {!img.hidden && img.position !== 1 && <button onClick={() => onMakeCover(img.url)} title="Make this the cover photo">★ Cover</button>}
                {!img.hidden && <button onClick={() => onMoveTo(img.url)} title="Move to position…">⇅</button>}
                {isAdmin && !img.hidden && <button className="danger" onClick={() => onHide([img.url])} title="Hide from all sites and channels">Hide</button>}
                {isAdmin && img.hidden && <button onClick={() => onUnhide([img.url])}>Unhide</button>}
                {isAdmin && img.source === "upload" && <button className="danger" onClick={() => onDelete(img.url)} title="Delete this uploaded file">Delete</button>}
            </div>
        </div>
    )
}

const SortableCard = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.img.url })
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }
    return <div ref={setNodeRef}><PhotoCard {...props} style={style} dragging={isDragging} dragHandle={{ ...attributes, ...listeners }} /></div>
}

const PhotoManager = ({ listingId, title, bedrooms, bathrooms, open = true, inline = false, showHero = true, showHeader = true, onClose, isAdmin = false, actor = "extranet", onChanged }) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [busy, setBusy] = useState(false)
    const [tab, setTab] = useState("all")
    const [selected, setSelected] = useState(() => new Set())
    const [roomFilter, setRoomFilter] = useState("")
    const [uploadProgress, setUploadProgress] = useState("")
    const fileRef = useRef(null)
    const saveChain = useRef(Promise.resolve())

    const api = useMemo(() => {
        const h = hub()
        h.defaults.headers["X-Actor"] = actor
        return h
    }, [actor])

    const categories = useMemo(() => {
        const beds = Math.min(Number(bedrooms) || 0, 20)
        const baths = Math.min(Math.ceil(Number(bathrooms) || 0), 20)
        const rooms = []
        for (let i = 1; i <= beds; i++) rooms.push(`bedroom_${i}`)
        for (let i = 1; i <= baths; i++) rooms.push(`bathroom_${i}`)
        return [...STANDARD_CATEGORIES.slice(0, -1), ...rooms, "other"]
    }, [bedrooms, bathrooms])

    const load = useCallback(async () => {
        if (!listingId) return
        setError("")
        try {
            const res = await api.get(`/local/listings/${encodeURIComponent(listingId)}/images`)
            setData(res.data)
        } catch (e) {
            setError(e?.response?.data?.message || e.message)
        }
    }, [api, listingId])

    useEffect(() => { if (open) load() }, [open, load])

    // Every write returns the fresh resolved state; serialise them so a fast
    // drag + hide can't interleave (CloudStay's reorder/carousel race).
    const write = useCallback((fn) => {
        const run = async () => {
            setBusy(true)
            setError("")
            try {
                const res = await fn(api)
                setData(res.data)
                if (onChanged) onChanged(res.data)
            } catch (e) {
                setError(e?.response?.data?.message || e.message)
                await load()
            } finally {
                setBusy(false)
            }
        }
        saveChain.current = saveChain.current.then(run, run)
        return saveChain.current
    }, [api, load, onChanged])

    const images = useMemo(() => data?.images || [], [data])
    const visible = images.filter((i) => !i.hidden)
    const hidden = images.filter((i) => i.hidden)
    const hero = visible.slice(0, HERO_COUNT)
    const path = `/local/listings/${encodeURIComponent(listingId)}/images`

    // Persist a full order: the visible sequence as given, hidden ones after.
    const saveOrder = (visibleUrls) => write((h) => h.put(`${path}/order`, { order: [...visibleUrls, ...hidden.map((i) => i.url)] }))

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const onDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return
        const urls = visible.map((i) => i.url)
        const next = arrayMove(urls, urls.indexOf(active.id), urls.indexOf(over.id))
        // optimistic
        setData((d) => ({ ...d, images: [...next.map((u, idx) => ({ ...images.find((i) => i.url === u), position: idx + 1 })), ...hidden] }))
        saveOrder(next)
    }

    const makeCover = (url) => saveOrder([url, ...visible.map((i) => i.url).filter((u) => u !== url)])
    const moveTo = (url) => {
        const n = parseInt(window.prompt(`Move to position (1–${visible.length})`, "1"), 10)
        if (!n || n < 1 || n > visible.length) return
        const urls = visible.map((i) => i.url).filter((u) => u !== url)
        urls.splice(n - 1, 0, url)
        saveOrder(urls)
    }

    const hideUrls = (urls) => {
        const reasons = data?.hideReasons || ["watermark", "branding", "logo", "text", "quality", "duplicate", "other"]
        const reason = window.prompt(`Why hide ${urls.length > 1 ? `${urls.length} photos` : "this photo"}?\n(${reasons.join(" / ")})`, "watermark")
        if (reason === null) return
        setSelected(new Set())
        write((h) => h.put(`${path}/hidden`, { urls, hidden: true, reason: reasons.includes(reason.trim()) ? reason.trim() : "other" }))
    }
    const unhideUrls = (urls) => { setSelected(new Set()); write((h) => h.put(`${path}/hidden`, { urls, hidden: false })) }
    const setCategory = (urls, category) => { setSelected(new Set()); write((h) => h.put(`${path}/category`, { urls, category })) }
    const deleteUpload = (url) => {
        if (!window.confirm("Delete this uploaded photo permanently?")) return
        write((h) => h.delete(`${path}/upload`, { data: { url } }))
    }

    const onFiles = async (fileList) => {
        const files = Array.from(fileList || []).filter((f) => /^image\//.test(f.type))
        if (!files.length) return
        setUploadProgress(`Preparing ${files.length} photo${files.length > 1 ? "s" : ""}…`)
        const prepared = []
        for (const f of files) prepared.push(await shrink(f))
        const form = new FormData()
        prepared.forEach((f) => form.append("file", f, f.name))
        setUploadProgress(`Uploading ${files.length}…`)
        await write((h) => h.post(`${path}/upload`, form, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (ev) => ev.total && setUploadProgress(`Uploading ${Math.round((ev.loaded / ev.total) * 100)}%`)
        }))
        setUploadProgress("")
        if (fileRef.current) fileRef.current.value = ""
    }

    const toggleSelect = (url) => setSelected((s) => { const n = new Set(s); n.has(url) ? n.delete(url) : n.add(url); return n })
    const selectedUrls = [...selected]

    const gridFor = (list, sortable) => {
        const cardProps = (img) => ({
            key: img.url, img, isAdmin, categories,
            selected: selected.has(img.url), onSelect: toggleSelect,
            onHide: hideUrls, onUnhide: unhideUrls, onCategory: setCategory,
            onMakeCover: makeCover, onMoveTo: moveTo, onDelete: deleteUpload
        })
        if (!sortable) return <div className="pm-grid">{list.map((img) => <PhotoCard {...cardProps(img)} />)}</div>
        return (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={list.map((i) => i.url)} strategy={rectSortingStrategy}>
                    <div className="pm-grid">{list.map((img) => <SortableCard {...cardProps(img)} />)}</div>
                </SortableContext>
            </DndContext>
        )
    }

    const roomCounts = useMemo(() => {
        const m = {}
        images.forEach((i) => { const c = i.category || "uncategorised"; m[c] = (m[c] || 0) + 1 })
        return m
    }, [images])

    const body = (
        <div className={`pm-root ${inline ? "pm-inline" : ""}`}>
            {showHeader && <div className="pm-head">
                <div>
                    <h2>Photos{title ? ` — ${title}` : ""}</h2>
                    <div className="pm-sub">
                        <span className="pm-id">{listingId}</span>
                        {data && <> · {data.counts.visible} visible · {data.counts.hidden} hidden{data.curation?.updatedAt ? ` · last edit ${new Date(data.curation.updatedAt).toLocaleString()} by ${data.curation.updatedBy || "?"}` : ""}</>}
                        {busy && <span className="pm-busy"> · saving…</span>}
                    </div>
                </div>
                <div className="pm-head-actions">
                    {data?.uploadsEnabled && <>
                        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
                        <button className="pm-btn primary" disabled={!!uploadProgress} onClick={() => fileRef.current?.click()}>{uploadProgress || "Upload photos"}</button>
                    </>}
                    {!inline && <button className="pm-btn" onClick={onClose}>Close</button>}
                </div>
            </div>}

            {error && <div className="pm-error">{error}</div>}

            {data && (
                <>
                    {showHero && (<>
                    <div className="pm-hero">
                        <div className="pm-hero-main">
                            {hero[0] ? <img src={hero[0].thumbnail || hero[0].url} alt="" /> : <div className="pm-empty">No visible photo</div>}
                            <span className="pm-badge cover">Cover</span>
                        </div>
                        <div className="pm-hero-side">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="pm-hero-small">
                                    {hero[n] ? <img src={hero[n].thumbnail || hero[n].url} alt="" /> : <div className="pm-empty">{n + 1}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pm-hint">The first {HERO_COUNT} visible photos are the cover and carousel on every site and channel. Drag to reorder, or use ★ Cover.</div>

                    </>)}
                    <div className="pm-tabs">
                        <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>All ({visible.length})</button>
                        <button className={tab === "hidden" ? "active" : ""} onClick={() => setTab("hidden")}>Hidden ({hidden.length})</button>
                        <button className={tab === "rooms" ? "active" : ""} onClick={() => setTab("rooms")}>Rooms</button>
                        {selectedUrls.length > 0 && (
                            <div className="pm-bulk">
                                {selectedUrls.length} selected ·
                                <select defaultValue="" onChange={(e) => e.target.value && setCategory(selectedUrls, e.target.value)}>
                                    <option value="">set category…</option>
                                    {categories.map((c) => <option key={c} value={c}>{label(c)}</option>)}
                                </select>
                                {isAdmin && tab !== "hidden" && <button className="danger" onClick={() => hideUrls(selectedUrls)}>Hide selected</button>}
                                {isAdmin && tab === "hidden" && <button onClick={() => unhideUrls(selectedUrls)}>Unhide selected</button>}
                                <button onClick={() => setSelected(new Set())}>clear</button>
                            </div>
                        )}
                    </div>

                    {tab === "all" && gridFor(visible, true)}
                    {tab === "hidden" && (hidden.length ? gridFor(hidden, false) : <div className="pm-none">Nothing hidden on this listing.</div>)}
                    {tab === "rooms" && (
                        <>
                            <div className="pm-rooms">
                                <button className={roomFilter === "" ? "active" : ""} onClick={() => setRoomFilter("")}>All</button>
                                {categories.map((c) => (
                                    <button key={c} className={roomFilter === c ? "active" : ""} onClick={() => setRoomFilter(c)}>{label(c)} <em>{roomCounts[c] || 0}</em></button>
                                ))}
                                <button className={roomFilter === "uncategorised" ? "active" : ""} onClick={() => setRoomFilter("uncategorised")}>Uncategorised <em>{roomCounts.uncategorised || 0}</em></button>
                            </div>
                            {gridFor(images.filter((i) => roomFilter === "" ? true : roomFilter === "uncategorised" ? !i.category : i.category === roomFilter), false)}
                        </>
                    )}
                </>
            )}
            {!data && !error && <div className="pm-none">Loading photos…</div>}
        </div>
    )

    if (inline) return body
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" PaperProps={{ className: "pm-dialog" }}>
            {body}
        </Dialog>
    )
}

export default PhotoManager
