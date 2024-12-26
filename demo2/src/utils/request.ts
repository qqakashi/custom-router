const BaseUrl = AppConfig.apiUrl;
const SuccessCode = 200;

export interface IResponse<T=any>{
    code:number;
    message?:string;
    data?:T;
    isSuccess:boolean;
}
export type IRequestParams = Record<string, any>;
export default async function Request<T=any>(path:string, init?:RequestInit):Promise<IResponse<T>> {
    const result = {code:0, isSuccess:false} as IResponse;
    try{
        const url = formatUrl(path);
        const res = await fetch(formatUrl(url), init);
        result.isSuccess = res.ok;
        result.code = res.status;
        result.message = res.statusText;
        if(res.ok){
            result.data = await res.json() as T;
        } 
    }catch(e){
        result.code = 500;
        result.message ="请求出现错误";
        result.isSuccess = false;
    }
    return result;
}
export function RequestGet<T>(url:string, query?:IRequestParams){
    return Request<T>(formatQueryUrl(url, query), {
        method:"GET",
    });
}
export function RequestPost<T>(url:string, data?:IRequestParams){
    return Request<T>(url, {
        method:"POST",
        body:data && JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

Request.Get = RequestGet;
Request.Post = RequestPost;

export const RequestMethodMap = {
    "get":RequestGet,
    "post":RequestPost,
};

export type RequestMethodKeys = keyof typeof RequestMethodMap;


function formatUrl(url:string, query?:IRequestParams){
    if(!(/^(http|https):\/\//.test(url))){
        const sp = (BaseUrl.endsWith("/") || url.startsWith("/"))?"":"/";
        url = BaseUrl+sp+url; 
    };
    return url;
}
function formatQueryUrl(url:string, query?:IRequestParams){
    if(!query)return url;
    const queryStr = object2query(query);
    if(!!queryStr){
        url+=(url.indexOf("?")===-1?"?":"&")+queryStr;
    }
    return url;
}

function object2query(obj: Record<string, any>) {
    const arr = Object.entries(obj).map(([key, value])=>`${key}=${value}`);
    return arr.length>0?arr.join("&"):null;
}
