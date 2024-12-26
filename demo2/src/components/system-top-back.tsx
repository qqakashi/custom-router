import { useCallback } from "react";
import { useSystemRouterParams } from "../utils/useSystemRouterParams";

interface top {
    title: string;
    onBack(): void;
    children?: React.ReactNode;
}

export function SystemTopBack(props: top){
    const back = useCallback(()=>{
        props?.onBack()
    },[])

    return(<div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={back}>
        <img src={require("../img/back2.png")} style={{width: 20, height: 20}} />
        <span style={{fontSize: 20, fontWeight: "bold"}}>&ensp;{props.title}</span>
    </div>)
}