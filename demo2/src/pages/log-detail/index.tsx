import { Button } from "antd";
import PageRoot from "../../components/page-root";
import { useCallback } from "react";
import { useRouterParams } from "../../utils/useRouterParams";


export default function LogDetail(){
    const page = useRouterParams()
    const xx = useCallback(()=>{
        page?.navigate?.("data-save", {title: "三级页面"})
    },[])

    return(<PageRoot>
        <span onClick={xx}>
            士大夫
        </span>
    </PageRoot>)
}