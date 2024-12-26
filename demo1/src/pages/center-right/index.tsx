import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouterParams } from "../../utils/useRouterParams";
import { message } from "antd";
import Http2ServerRequest from "../../utils/request";
import { LoadingOutlined } from "@ant-design/icons";
import PageRoot from "../../components/page-root";



export default function CenterRight() {
    const [index, setIndex] = useState(0)
    const [selectKey, setSelectKey] = useState()
    const svgref = useRef<SVGSVGElement>(null)
    const [list,setList] = useState<any[]>([])
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageNum, setPageNum] = useState<number>(1)
    const innerRef = useRef<HTMLDivElement>(null)
    const [load, setLoad] = useState<boolean>(true);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [newPoint, setNewPoint] = useState<any[]>([])
    const page = useRouterParams()


    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        innerRef.current?.addEventListener("scroll", loadMoreContent)
        return () => {
            innerRef.current?.removeEventListener("scroll", loadMoreContent)
        }
    }, [totalPage, pageNum, loadMore])

    useEffect(() => {
        const parr: any[] = []
        for (let c of list) {
            parr.push({ ...c, point: hoverSelectKey2(c), show: false })
        }
        setNewPoint(parr)
    }, [list])

    const loadData = useCallback(async (p = 1) => {
        try {
            const res = await Http2ServerRequest("" + p)
            if (!!res.code) {
                messageApi.open({ type: "error", content: res.message })
            } else {
                setList([...list, ...res.data.list.reverse()])
                setTotalPage(Math.ceil(res.data.pages.total / res.data.pages.pageSize))
                setPageNum(p)
            }
        } catch (error) {
            messageApi.open({ type: "error", content: JSON.stringify(error) })
        } finally {
            setLoad(false)
            setLoadMore(false)
        }
    }, [list])

    const loadMoreContent = () => {
        if (innerRef.current) {
            if (innerRef.current.scrollTop + innerRef.current.clientHeight >= innerRef.current.scrollHeight) {
                if (pageNum + 1 <= totalPage) {
                    if (loadMore) return
                    setLoadMore(true)
                    loadData(pageNum + 1)
                }
            }
        }
    }


    const onSelectKey = useCallback((val: any, index: number) => {
        page?.navigate?.("right-detail", { name: val.building_code + val.title, id: val.id, img: val.file })
        // props.onSelectKey({...val, path: "right-detail"})
    }, [])

    const hoverSelectKey2 = (val: any) => {
        if (!val.position) return []
        const coordinates: any[] = []
        if (svgref.current) {
            const width = svgref.current.clientWidth;
            const height = svgref.current.clientHeight;
            const position = val.position ? val.position.split(",") : ""
            for (let i = 0; i < position.length; i += 2) {
                const x = (position[i]) * width;
                const y = (position[i + 1]) * height;
                coordinates.push(`${x},${y}`);
            }
        }
        return coordinates
    }


    const hoverSelectKey = useCallback((val: any, i: number) => {
        if (newPoint[i]) {
            if (newPoint[i].point.length) {
                newPoint[i].show = true
                setNewPoint([...newPoint])
            }
        }
    }, [newPoint])

    const leaveSelect = useCallback((i: number) => {
        if (newPoint[i]) {
            if (newPoint[i].point.length) {
                newPoint[i].show = false
                setNewPoint([...newPoint])
            }
        }
    }, [newPoint])


    const navito = useCallback(() => {
        page?.navigate?.("ownership-detail", { name: "产权统计" })
    }, [])

    return (<div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {contextHolder}
        <PageRoot>
            {/* <div className="home-center">
                <img className="home-center-img" src={""} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 5 }} />
                <svg width="100%" height="100%" ref={svgref} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", bottom: 0, right: 0, zIndex: 50 }}>
                    <defs>
                        <filter id="shadow2">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                        </filter>
                    </defs>
                    <defs>
                        <filter id="shadow">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                        </filter>
                    </defs>
                    <mask id="myMask">
                        {newPoint.map((v, i) => <polygon key={i} points={v.point.join(" ")} fill="white" />)}
                    </mask>
                    {newPoint.map((v, i) => <g fill="#91E5FF" fillOpacity={0.3} key={i} style={{ cursor: "pointer", opacity: v.show ? 1 : 0, transition: "0.5s" }}
                        onMouseLeave={() => leaveSelect(i)} onClick={() => onSelectKey2(v)} onMouseEnter={() => hoverSelectKey(v, i)}>
                        <polygon points={v.point.join(" ")} filter="url(#shadow2)" fill="transparent" stroke="#fff" strokeWidth="2" mask="url(#myMask)" />
                        <polygon points={v.point.join(" ")} stroke="#fff" strokeWidth={1} opacity="1" />
                        <polygon className="g-dash-line" points={v.point.join(" ")} fill="transparent" strokeWidth={2} filter="url(#shadow)" />
                    </g>)}
                </svg>
            </div> */}
            <div className="home-right">
                <div className="home-right-p0" style={{ padding: 0 }}>
                    <div ref={innerRef} className="inner-container" style={{ display: index ? "block" : "none" }}>
                        <div style={{ height: "35rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }} />
                        {load ? <LoadingOutlined style={{ fontSize: 23, color: "#91e5ff", margin: 15 }} /> : <>
                            {list.map((v, i) => <div key={i} style={{ paddingLeft: "13rem" }} onMouseLeave={() => leaveSelect(i)} onMouseEnter={() => hoverSelectKey(v, i)}
                                className={selectKey == i ? "home-right-p0-vtrs-active" : "home-right-p0-vtrs"} onClick={() => onSelectKey(v, i)}>
                                <div style={{ display: "flex", alignItems: "center", borderBottom: i + 1 == list.length ? "none" : "1px solid rgba(255,255,255,0.1)", padding: "10rem 0" }}>
                                    <span style={{ flex: 1, color: "#91E5FF", fontSize: "17rem" }}>{v.building_code}{v.title}</span>
                                    <img src={require("../../img/rt.png")} style={{ width: "17rem", marginRight: "7rem" }} />
                                </div>
                            </div>)}
                            {loadMore ? <div className="load_more">
                                <LoadingOutlined style={{ fontSize: 23, color: "#91e5ff", margin: 15 }} />
                            </div> : <></>}
                        </>}
                    </div>
                </div>
            </div>
        </PageRoot>
    </div>)
}

function minY(array:any[]){
    const item = array.reduce((minItem, currentItem) => {
        const [firstMin, secondMin] = minItem.split(',').map(Number);
        const [firstCurrent, secondCurrent] = currentItem.split(',').map(Number);
        return secondCurrent < secondMin ? currentItem : minItem;
    });
    return {
        x: item.split(",")[0],
        y: item.split(",")[1]
    }
}
