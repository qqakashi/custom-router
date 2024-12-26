import { createContext, useContext } from "react";


interface SystemRouterInter{
    systemRouterList: {name: string; params?: Record<string, any>}[][];
    systemParams?: Record<any ,any>;
    /**跳转二级页面
     * @param key 页面名
     * @param params 额外的传递参数
     */
    systemNavi?(key: string, params?: Record<string,any>):void;
    /**返回上一页 */
    systemBack?(): void;
}

/**系统页自定路由 */
export const SystemRouterContext = createContext<SystemRouterInter | undefined>(undefined);


/**获取系统设置页面参数 */
export function useSystemRouterParams() {
    const pageContext = useContext(SystemRouterContext);
    return pageContext;
}