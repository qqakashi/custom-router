/** 页面渲染器接口*/
export interface CompProps {
    /**统一回调 */
    onCallBack?(t: any): void;
}


export interface RouterPathParams {
    children: React.ReactNode;
    routerList: string[];
    /**页面传递参数 */
    pageParams?: Record<string, any>;
    /**跳转页面 */
    onNavigate?(key: string, params?: Record<string,any>): void;
}
 
export interface pointInterf{
    floor_id: number;
    file: string;
    points: {
        show: boolean;
        showall: boolean;
        /**商铺类型 */
        ownership_nature: number; 
        /**商铺坐标点 */
        point: any[]}[]
    data: {shop_position: string; ownership_nature: number}[]
}

export interface LoginProps {
    /** 登录回调 */
    islogin(key:string): void
}

export interface DynamicComponentLoaderProps<P> {
    componentName: string;
    componentProps?: P;
}

export enum OwnershipType {
    Other = 0,
    Private,
    MunicipalStateOwned,
    Collective,
    PrivateEnterprise,
    CentralStateOwned,
    PrivateLitigation
};

export enum OwnershipType2 {
    Other = 0,
    MunicipalStateOwned,
    CentralStateZone,
    CentralStateCity,
    Group,
    PrivateEnterprise,
    Private,
    CentralStatePrivenOwnedm
};


export function formatDate(val: string, word?: boolean){
    if (!val) return ""
    const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    const date = new Date(val)
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // getMonth() 返回 0-11，所以需要加 1
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    return word?`${year}年${date.getMonth() + 1}月`:`${year}-${month}-${day}`;
};


export function floodColor(key:number){
    switch (key) {
        case 5:
            return "#718733"
        case 6:
            return "#8E8CD8"
        case 1: case 2: case 3: case 7:
            return "#00B294"
        default:
            return "rgb(255,255,255)"
    }
}

export function timeendwarning(val: string){
    const date = new Date(val)
    const date2 = new Date()
    const end = date.getTime() - (30*24*60*60*1000)
    if(end <= date2.getTime()) return true
    return false
}

export function ownershipColor(key: any){
    switch (key) {
        case 1:
            return "#28A7AA"
        case 2:
            return "#2F975B"
        case 3:
            return "#CC7CAA"
        case 4:
            return "#76AF71"
        case 5:
            return "#995E4E"
        case 6:
            return "#2091BE"
        default:
            return "#1D51B5"
    }
}
