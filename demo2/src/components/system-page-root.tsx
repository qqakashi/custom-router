import React, { useCallback } from "react";
import { useSystemRouterParams } from "../utils/useSystemRouterParams";

interface PageRootParams {
    children: React.ReactNode;
}


/**添加跳转动画 */
export default function SystemPageRoot(props: PageRootParams){
    return(<div className="page-router-an-change">
        {props.children}
    </div>)
}