import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PageRoot from "../../components/page-root";
import { useRouterParams } from "../../utils/useRouterParams";
import Http2ServerRequest from "../../utils/request";
import { Modal, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


export default function RightDetail() {
    const [index, setIndex] = useState(1)
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageNum, setPageNum] = useState<number>(1)
    const innerRef = useRef<HTMLDivElement>(null)
    const [messageApi, contextHolder] = message.useMessage();
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [list, setList] = useState<any[]>([]);
    const [selectKey, setSelectKey] = useState<number>();
    const [load, setLoad] = useState<boolean>(true);
    const [data, setData] = useState<any>(Object.create(null));
    const [newPoint, setNewPoint] = useState<any[]>([]);
    const svgref = useRef<SVGSVGElement>(null)
    const page = useRouterParams()

    useEffect(() => {
        // loadData()
    }, [])

    
    useEffect(() => {
        const parr: any[] = []
        for (let c of list) {
            parr.push({ ...c, point: hoverSelectKey2(c), show: false })
        }
        setNewPoint(parr)
    }, [list])

    useEffect(() => {
        innerRef.current?.addEventListener("scroll", loadMoreContent)
        return () => {
            innerRef.current?.removeEventListener("scroll", loadMoreContent)
        }
    }, [totalPage, pageNum, loadMore])

    const loadData = useCallback(async (p = 1) => {
        try {
            const res = await Http2ServerRequest("" + p, {}, "POST")
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

    return (<div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {contextHolder}
        <PageRoot>
            <div className="home-right">
                <div className="home-right-p0" style={{ padding: 0 }}>
                    <div ref={innerRef} className="inner-container" style={{ display: index ? "block" : "none" }}>
                        <div style={{ height: "35rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }} />
                        {load ? <LoadingOutlined style={{ fontSize: 23, color: "#91e5ff", margin: 15 }} /> : <>
                            {list.map((v, i) => <div key={i} style={{ paddingLeft: "13rem" }} onMouseLeave={() => leaveSelect(i)} onMouseEnter={() => hoverSelectKey(v, i)}
                                className={selectKey == i ? "home-right-p0-vtrs-active" : "home-right-p0-vtrs"}>
                                <div style={{ display: "flex", alignItems: "center", borderBottom: i + 1 == list.length ? "none" : "1px solid rgba(255,255,255,0.1)", padding: "10rem 0" }}>
                                    <span style={{ flex: 1, color: "#91E5FF", fontSize: "17rem" }}>{v.title.join()}</span>
                                    <img src={require("../../img/rt.png")} style={{ width: "17rem", marginRight: "7rem" }} />
                                </div>
                            </div>)}
                        </>}
                        {loadMore ? <div className="load_more">
                            <LoadingOutlined style={{ fontSize: 23, color: "#91e5ff", margin: 15 }} />
                        </div> : <></>}
                    </div>
                </div>
            </div>
        </PageRoot>
    </div>)
}