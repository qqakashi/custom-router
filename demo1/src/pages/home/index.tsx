import { useCallback, useMemo, useState } from "react"
import { Top } from "./top"
import { CompRoot } from "../../components/comp-root"
import { RouterContext } from "../../utils/useRouterParams"
import { CompProps, RouterPathParams } from "../../utils/interface"
import { Tabs, TabsProps } from "antd"


/**全局路由配置 */
function Router(props: RouterPathParams) {

    const contextValue = useMemo(()=>({
        router: props.routerList, 
        pageParams: props.pageParams, 
        navigate: props.onNavigate, 
    }),[props.routerList,props.pageParams,props.onNavigate])

    return (
        <RouterContext.Provider value={contextValue}>
            {props.children}
        </RouterContext.Provider>
    );
}


export default function Home(props: CompProps){
    const [planView, setPlanView] = useState<boolean>(false)
    const [tabsKey, setTabsKey] = useState<number>(0)
    const [routerList, setRouterList] = useState<string[]>([])
    const [tabsCenter, setTabsCenter] = useState<TabsProps['items']>([{key: "center-right", label: '', children: <CompRoot routeKey={"center-right"} />}])
    const [titleList, setTitleList] = useState<string[]>([])
    const [routerParams, setRouterParams] = useState<any[]>([])
    const [pageParams, setPageParams] = useState<Record<string, any>>(Object.create(null))

    const goBack = useCallback(()=>{
        setRouterList(prevRouterList=>{
            let newRouterList = [...prevRouterList];
            newRouterList = newRouterList.slice(0, -1);
            return newRouterList
        })
        setTitleList(prevTitleList=>{
            const newTitle = prevTitleList.slice(0,-1)
            return newTitle
        })
        setRouterParams(prevRouterParams=>{
            const newParams = prevRouterParams.slice(0, -1)
            setPageParams(newParams[newParams.length-1])
            return newParams
        })
        setTabsCenter(prevTabsCenter=>{
            const newTabs = prevTabsCenter?.slice(0, -1)
            return newTabs
        })
    },[])

    const onNavigate = useCallback((key: string, params: Record<string, any> = Object.create(null))=>{
        setPageParams(params)
        setRouterList(prevRouterList=>{
            let newRouterList = [...prevRouterList];
            newRouterList = [...newRouterList, key]
            return newRouterList
        })
        setTitleList(prevTitleList=>[...prevTitleList, params.name])
        setRouterParams(prevRouterParams=>[...prevRouterParams, params])
        setTabsCenter(prevTabs=> [...prevTabs!, {key, label: '', children: <CompRoot routeKey={key} />}])
    },[])

    return (<div className="home">
        <Top right={routerList.length?<div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={goBack}>
                <img src={require("../../img/fh.png")} style={{width: "35rem", height: "35rem"}} />
                <span style={{color: "#91E5FF", fontSize: "18rem", fontWeight: "bold"}}>{titleList[titleList.length-1]}</span>
            </div>:<></>}
            onChangeTabsKey={setTabsKey} islogin={(t)=>props.onCallBack?.(t)}
        />
        <div style={{display: tabsKey? "none" : "flex", boxSizing: "border-box", flexDirection: "column"}}>
            <Router routerList={routerList} pageParams={pageParams} onNavigate={onNavigate}>
                <div className="home-c0-stl">
                    <div style={{display: "flex", flex: 1, position: "relative", boxSizing: "border-box"}}>
                        <Tabs activeKey={routerList[routerList.length-1]} items={tabsCenter} />
                    </div>
                </div>
            </Router>
        </div>
    </div>)
}
