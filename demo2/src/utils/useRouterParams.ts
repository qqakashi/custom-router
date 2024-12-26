import { createContext, useContext } from "react";
import { routerListInter } from "./interface";


/**全局参数配置 */
interface ContextParams{
    /**路由列表 */
    router: routerListInter[][];
    /**页面传递参数 */
    pageParams?: Record<string, any>;
    /**跳转页面方法 */
    navigate?(key:string, params?: Record<string,any>): void;
    /**当前页面key */
    activePageKey?:string;
}

export const RouterContext = createContext<ContextParams | undefined>(undefined);


/**获取全局页面参数 */
export function useRouterParams() {
    const pageContext = useContext(RouterContext);
    return pageContext;
}