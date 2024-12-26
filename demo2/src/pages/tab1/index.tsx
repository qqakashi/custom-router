import { useCallback, useEffect, useState } from "react"
import { useRouterParams } from "../../utils/useRouterParams";
export default function Tab1() {
    const router = useRouterParams();


    const navito = useCallback(()=>{
        router?.navigate?.("")
    },[])

    return (<div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <span onClick={navito}>跳转</span>
        </div>
    )
}