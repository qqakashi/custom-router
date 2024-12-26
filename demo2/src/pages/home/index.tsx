import { useCallback, useMemo, useState } from "react"
import { Top } from "./top"
import { CompRoot } from "../../components/comp-root"
import { RouterContext } from "../../utils/useRouterParams"
import { CompProps, routerListInter, RouterPathParams, spliceArr } from "../../utils/interface"
import { Tabs, TabsProps } from "antd"
import { SystemTopBack } from "../../components/system-top-back"


/**全局路由配置 */
function Router(props: RouterPathParams) {

    const contextValue = useMemo(() => ({
        router: props.routerList,
        pageParams: props.pageParams,
        navigate: props.onNavigate,
        activePageKey:props.activePageKey
    }), [props.routerList, props.pageParams, props.onNavigate, props.activePageKey]);

    return (
        <RouterContext.Provider value={contextValue}>
            {props.children}
        </RouterContext.Provider>
    );
}

 
const FirstPageKey = "tab1";
export default function Home(props: CompProps){
    const [routerList, setRouterList] = useState<routerListInter[][]>([[{name:FirstPageKey}]]);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [activePageKey, setActivePageKey] = useState<string>(FirstPageKey);
    const [tabsCenter, setTabsCenter] = useState<TabsProps['items']>([
        {key: "tab1", label: '', children: <CompRoot routeKey="tab1" />},
        {key: "tab2", label: '', children: <CompRoot routeKey="tab2" />},
        {key: "tab3", label: '', children: <CompRoot routeKey="tab3" />},
        {key: "tab4", label: '', children: <CompRoot routeKey="tab4" />},
        {key: "tab5", label: '', children: <CompRoot routeKey="tab5" />}
    ]);
    const [pageParams, setPageParams] = useState<Record<string, any>>();

    /**返回上一页 */
    const goBack = useCallback(()=>{
        setRouterList(prevRouterList => {
            const newRouterList = [...prevRouterList];
            newRouterList[tabIndex] = newRouterList[tabIndex].slice(0, -1);
            setPageParams(newRouterList[tabIndex][newRouterList[tabIndex].length - 1]?.params);
            return newRouterList;
        });
        setTabsCenter(prevTabs => {
            const newTabs = prevTabs?.slice(0, -1); 
            return newTabs;
        });
    },[tabIndex])

    const tabsChange = useCallback((key: string, index: number)=>{
        const list = routerList;
        if(!list[index]?.length){
            list[index] = [{name: key}]
            setRouterList(list)
        }
        setPageParams(list[index][list[tabIndex].length-1]?.params)
        setTabIndex(index)
        setActivePageKey(key)
    },[routerList])

    /**跳转页面 */
    const onNavigate = useCallback((key: string, params: Record<string, any> = Object.create(null))=>{
        setRouterList(prevRouterList => {
            const newRouterList = [...prevRouterList];
            newRouterList[tabIndex] = [...newRouterList[tabIndex], { name: key, params }];
            return newRouterList;
        });
        setTabsCenter(prevTabs => [...prevTabs!, { key, label: '', children: <CompRoot routeKey={key} /> }]);
        setPageParams(params);
    },[tabIndex])

    return (<div className="home">
        <Top onToggleView={tabsChange} />
        <div style={{display: "flex", boxSizing: "border-box", flexDirection: "column", flex: 1, background: "#f5f5f5"}}>
            {routerList[tabIndex].length>=2?<div style={{display: "flex", alignItems: "center", height: 50, marginLeft: 12}}>
                <SystemTopBack title={pageParams?.title} onBack={goBack} />
            </div>:<></>}
            <Router activePageKey={activePageKey} routerList={routerList} pageParams={pageParams} onNavigate={onNavigate}>
                <Tabs activeKey={routerList[tabIndex][routerList[tabIndex].length-1]?.name} items={tabsCenter}/>
            </Router>
        </div>
    </div>)
}
