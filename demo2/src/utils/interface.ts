/** 页面渲染器接口*/
export interface CompProps {
    /**统一回调 */
    onCallBack?(t: any): void;
}


export interface routerListInter {
    name: string;
    params?: Record<string, any>
}


export interface RouterPathParams {
    children: React.ReactNode;
    routerList: routerListInter[][];
    /**页面传递参数 */
    pageParams?: Record<string, any>;
    /**跳转页面 */
    onNavigate?(key: string, params?: Record<string,any>): void;
    activePageKey?:string;
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

// export const OwnershipTypeDescriptions: { [key in OwnershipType]: string } = {
//     [OwnershipType.Other]: "其他",
//     [OwnershipType.Private]: "私人",
//     [OwnershipType.MunicipalStateOwned]: "国有（市）",
//     [OwnershipType.Collective]: "集体",
//     [OwnershipType.PrivateEnterprise]: "私企",
//     [OwnershipType.CentralStateOwned]: "国有（央）",
//     [OwnershipType.PrivateLitigation]: "私人涉诉"
// };
export const OwnershipTypeDescriptions1: { [key in OwnershipType]: string } = {
    [OwnershipType.Other]: "其他",
    [OwnershipType.Private]: "国有（央）",
    [OwnershipType.MunicipalStateOwned]: "国有（区）",
    [OwnershipType.Collective]: "国有（市）",
    [OwnershipType.PrivateEnterprise]: "私企",
    [OwnershipType.CentralStateOwned]: "国有（央）",
    [OwnershipType.PrivateLitigation]: "私人涉诉"
};
export const OwnershipTypeDescriptions2: { [key in OwnershipType2]: string } = {
    [OwnershipType2.Other]: "其他",
    [OwnershipType2.MunicipalStateOwned]: "国有（央）",
    [OwnershipType2.CentralStateZone]: "国有（区）",
    [OwnershipType2.CentralStateCity]: "国有（市）",
    [OwnershipType2.Group]: "集体",
    [OwnershipType2.PrivateEnterprise]: "私企",
    [OwnershipType2.Private]: "私人",
    [OwnershipType2.CentralStatePrivenOwnedm]: "国有（省）"
};

export enum PayRentStatus {
    nopay = 0,
    somepay,
    ispay,
    notpay
};

export const PayRentStatusDescriptions: { [key in PayRentStatus]: string } = {
    [PayRentStatus.nopay]: "未付",
    [PayRentStatus.somepay]: "已付部分",
    [PayRentStatus.ispay]: "已付",
    [PayRentStatus.notpay]: "已免"
};


export function formatDate(val: string | number | Date, word?: boolean){
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
            return "#8E8CD8"
        case 6:
            return "#718733"
        case 1: case 2: case 3:
            return "#00B294"
        default:
            return "rgb(255,255,255)"
    }
}


/**删除数组元素，返回数组 */
export function spliceArr<U>(arr: Array<U>, index: number){
    const list = [...arr.slice(0, index), ...arr.slice(index+1)]
    return list
}
  