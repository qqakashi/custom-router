import { Tabs, TabsProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { CompRoot } from "../../components/comp-root";
import { SystemRouterContext } from "../../utils/useSystemRouterParams";
import { SystemTopBack } from "../../components/system-top-back";
import useMessage from "antd/es/message/useMessage";

interface SystemRouterInter{
    children: React.ReactNode;
    systemRouterList: {name: string; params?: Record<string, any>}[][];
    systemParams?: Record<any ,any>;
    systemNavi?(key: string, params?: Record<string,any>): void;
    systemBack?(): void;
}


function SystemRouter(props: SystemRouterInter) {

    const contextValue = useMemo(() => ({
        systemRouterList: props.systemRouterList,
        systemParams: props.systemParams,
        systemNavi: props.systemNavi,
        systemBack: props.systemBack
    }), [props.systemRouterList, props.systemParams, props.systemNavi, props.systemBack]);


    return (
        <SystemRouterContext.Provider value={contextValue}>
            {props.children}
        </SystemRouterContext.Provider>
    );
}

export default function System() {
    const [message, messageInstans] = useMessage()
    const [systemRouterList, setSystemRouterList] = useState<{name: string; params?: Record<string, any>}[][]>([[{name: "device-manage"}]]);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [pageParams, setPageParams] = useState<Record<string, any>>();
    const [tabs, setTabsItem] = useState<TabsProps['items']>([
        {key: "device-manage", label: '', children: <CompRoot routeKey="device-manage" />},
        {key: "data-save", label: '', children: <CompRoot routeKey="data-save" />},
        {key: "warn-set", label: '', children: <CompRoot routeKey="warn-set" />},
        {key: "protocol-103", label: '', children: <CompRoot routeKey="protocol-103" />},
        {key: "protocol-PMU", label: '', children: <CompRoot routeKey="protocol-PMU" />},
        {key: "individuation", label: '', children: <CompRoot routeKey="individuation" />},
        {key: "import-set", label: '', children: <CompRoot routeKey="import-set" />},
        {key: "export-set", label: '', children: <CompRoot routeKey="export-set" />}
    ]);

    const goBack = useCallback(()=>{
        setSystemRouterList(prevRouterList => {
            const newRouterList = [...prevRouterList];
            newRouterList[tabIndex] = newRouterList[tabIndex].slice(0, -1);
            setPageParams(newRouterList[tabIndex][newRouterList[tabIndex].length - 1]?.params);
            return newRouterList;
        });
        setTabsItem(prevTabs => {
            const newTabs = prevTabs?.slice(0, -1); 
            return newTabs;
        });
    },[tabIndex])

    const tabsChange = useCallback((key: string, index: number)=>{
        const list = systemRouterList;
        if(!list[index]?.length){
            list[index] = [{name: key}]
            setSystemRouterList(list)
        }
        setPageParams(list[index][list[tabIndex].length-1]?.params)
        setTabIndex(index)
    },[systemRouterList])

    const systemNavi = useCallback((key: string, params: Record<string, any> = Object.create(null))=>{
        setSystemRouterList(prevRouterList => {
            const newRouterList = [...prevRouterList];
            newRouterList[tabIndex] = [...newRouterList[tabIndex], { name: key, params }];
            return newRouterList;
        });
        setTabsItem(prevTabs => [...prevTabs!, { key, label: '', children: <CompRoot routeKey={key} /> }]);
        setPageParams(params);
    },[tabIndex])

    return (<div style={{ display: "flex", width: "100%", height: "100%", background: "#fff", boxSizing: "border-box"}}>
        <div style={{marginLeft: 24, flex: 1}}>
            <SystemRouter systemRouterList={systemRouterList} systemParams={pageParams} systemNavi={systemNavi} systemBack={goBack}>
                <Tabs activeKey={systemRouterList[tabIndex][systemRouterList[tabIndex].length-1]?.name} items={tabs} />
            </SystemRouter>
        </div>
    </div>)
}