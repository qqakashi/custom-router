import { useCallback, useEffect, useState } from "react";


interface topParams {
    onToggleView(key: string, index: number): void;
}


export function Top(props: topParams) {
    const [tabkey] = useState([
        { name: "tab1", key: "tab1"},
        { name: "tab2", key: "tab2"},
        { name: "tab3", key: "tab3"},
        { name: "tab4", key: "tab4"},
        { name: "tab5", key: "tab5" },
    ])
    const [key, setKey] = useState("tab1")


    const onChangeTabsKey = useCallback((key: string, index: number) => {
        setKey(key)
        props.onToggleView(key, index)
    }, [props.onToggleView])

    return (<div style={{ background: "#3F51B5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#fff", fontWeight: "bold", fontSize: 32 }}></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ width: 126, height: 80 }} />
            {tabkey.map((v, i) => <div key={i} style={{ display: "flex", height: 80, justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "0 30px", background: key == v.key ? "#303f9f" : "", cursor: "pointer" }} onClick={()=>onChangeTabsKey(v.key, i)}>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 12 }}>{v.name}</span>
            </div>)}
        </div>
    </div>)
}
