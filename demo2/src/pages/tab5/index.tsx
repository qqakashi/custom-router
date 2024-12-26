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
            {messageInstans}
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 12}}>
                <div style={{height: 50, display: "flex", alignItems: "center"}}>
                    <span style={{ fontSize: 20, fontWeight: "bold"}}>&ensp;系统设置</span>
                </div>
                <div onClick={()=>tabsChange("device-manage", 0)} style={{cursor: "pointer", height: 50, display: "flex", alignItems: "center", padding: "0 12px" ,marginTop: 12, borderRadius: 5, width: 275, boxSizing: "border-box", background: tabIndex==0?"rgba(63,81,181,0.05)":"#fff", boxShadow: "0px 0px 2px rgba(63,81,181,0.3)"}}>
                    <img src={require("../../img/sbgl.png")} style={{width: 24, height: 24}} />
                    <span style={{ fontSize: 16, flex: 1 }}>&emsp;设备管理</span>
                    <img src={require("../../img/rto.png")} style={{width: 12, height: 12}} />
                </div>
                <span style={{fontSize: 12, color: "#757575", marginTop: 24, marginBottom: 12}}>数据</span>
                <div style={{width: 275, borderRadius: 5, background: "rgba(63,81,181,0.05)", boxShadow: "0px 0px 2px rgba(63,81,181,0.3)"}}>
                    {/* <div onClick={()=>tabsChange("data-save", 1)} style={{ display: "flex", cursor: "pointer", borderTopLeftRadius: 5, borderTopRightRadius: 5, alignItems: "center", background: tabIndex==1?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/save.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{borderBottom: "1px solid rgba(63,81,181,0.15)", marginLeft: 12, flex: 1, boxSizing: "border-box", height: 50, display: "flex", alignItems: "center"}}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>数据保存</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div> */}
                    <div onClick={()=>tabsChange("warn-set", 2)} style={{ display: "flex", cursor: "pointer", alignItems: "center", borderRadius: 5, background: tabIndex==2?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/gjsz.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{height: 50, display: "flex", flex: 1, alignItems: "center", marginLeft: 12}}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>告警设置</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div>
                    {/* <div onClick={()=>tabsChange("warn-set", 2)} style={{ display: "flex", cursor: "pointer", alignItems: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, background: tabIndex==2?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/gjsz.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{height: 50, display: "flex", flex: 1, alignItems: "center", marginLeft: 12}}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>告警设置</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div> */}
                </div>
                {/* <span style={{fontSize: 12, color: "#757575", marginTop: 24, marginBottom: 12}}>协议</span>
                <div style={{width: 275, borderRadius: 5, background: "rgba(63,81,181,0.05)", boxShadow: "0px 0px 2px rgba(63,81,181,0.3)"}}>
                    <div onClick={()=>tabsChange("protocol-103",3)} style={{ display: "flex", cursor: "pointer", alignItems: "center", borderTopLeftRadius: 5, borderTopRightRadius: 5, background: tabIndex==3?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/xy1.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{borderBottom: "1px solid rgba(63,81,181,0.15)", marginLeft: 12, flex: 1, boxSizing: "border-box", height: 50, display: "flex", alignItems: "center"}}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>103</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div>
                    <div onClick={()=>tabsChange("protocol-PMU",4)} style={{ display: "flex", cursor: "pointer", alignItems: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, background: tabIndex==4?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/xy2.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{height: 50, display: "flex", flex: 1, alignItems: "center", marginLeft: 12}}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>PMU</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div>
                </div> */}
                {/* <span style={{fontSize: 12, color: "#757575", marginTop: 24, marginBottom: 12}}>系统</span>
                <div onClick={()=>tabsChange("individuation",5)} style={{cursor: "pointer", height: 50, display: "flex", alignItems: "center", padding: "0 12px" ,marginTop: 12, borderRadius: 5, width: 275, boxSizing: "border-box", background: tabIndex==5?"rgba(63,81,181,0.05)":"#fff", boxShadow: "0px 0px 2px rgba(63,81,181,0.3)" }}>
                    <img src={require("../../img/gxh.png")} style={{width: 24, height: 24}} />
                    <div style={{marginLeft: 12, flex: 1, boxSizing: "border-box", height: 50, display: "flex", alignItems: "center"}}>
                        <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>个性化</span>
                        <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                    </div>
                </div> */}
                {/* <div style={{width: 275, borderRadius: 5, background: "rgba(63,81,181,0.05)", boxShadow: "0px 0px 2px rgba(63,81,181,0.3)"}}>
                    <div onClick={()=>tabsChange("individuation",5)} style={{ display: "flex", cursor: "pointer", alignItems: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, background: tabIndex==5?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/gxh.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{borderBottom: "1px solid rgba(63,81,181,0.15)", marginLeft: 12, flex: 1, boxSizing: "border-box", height: 50, display: "flex", alignItems: "center"}}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>个性化</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div>
                    <div onClick={()=>tabsChange("import-set",6)} style={{ display: "flex", cursor: "pointer", alignItems: "center", background: tabIndex==6?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/dr.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{borderBottom: "1px solid rgba(63,81,181,0.15)", marginLeft: 12, flex: 1, boxSizing: "border-box", height: 50, display: "flex", alignItems: "center"}}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>导入设置</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div>
                    <div onClick={()=>tabsChange("export-set",7)} style={{ display: "flex", cursor: "pointer", alignItems: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, background: tabIndex==7?"rgba(63,81,181,0.05)":"#fff" }}>
                        <img src={require("../../img/dc2.png")} style={{width: 24, height: 24, marginLeft: 12}} />
                        <div style={{height: 50, display: "flex", flex: 1, alignItems: "center", marginLeft: 12 }}>
                            <span style={{ fontSize: 16, flex: 1, color: "rgba(0,0,0,0.85)" }}>导出设置</span>
                            <img src={require("../../img/rto.png")} style={{width: 12, height: 12, marginRight: 12}} />
                        </div>
                    </div>
                </div> */}
            </div>
            <div style={{marginLeft: 24, flex: 1}}>
                <SystemRouter systemRouterList={systemRouterList} systemParams={pageParams} systemNavi={systemNavi} systemBack={goBack}>
                    <Tabs activeKey={systemRouterList[tabIndex][systemRouterList[tabIndex].length-1]?.name} items={tabs} />
                </SystemRouter>
            </div>
    </div>)
}