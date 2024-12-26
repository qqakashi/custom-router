import React from "react";

interface PageRootParams {
    children: React.ReactNode;
}


/**添加跳转动画 */
export default function PageRoot(props: PageRootParams){
    return(<div className="page-router-an-change">{props.children}</div>)
}