import { addr } from "./request";

export function encodeQueryString(options?: any): string {
    if (options === null || options === undefined) return "";
    let optArray: any[] = [];
    for (let key in options) {
      let value = options[key];
      if (value === null || value === undefined) continue;
      let encodedKey = encodeURIComponent(key);
      if (value instanceof Array) {
        for (let sub of value) {
          optArray.push(encodedKey + "=" + encodeURIComponent(sub.toString()));
        }
      } else
        optArray.push(encodedKey + "=" + encodeURIComponent(value.toString()));
    }
    if (optArray.length) return optArray.join("&");
    return "";
  }


export class CodedError extends Error {
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
    readonly code: number;

    static toJson(e: any) {
        console.error(e);
        return {
            code: e.code || 500,
            message: e.message || "未知错误"
        }
    }

    static result(data: any) {
        return {
            code: 0,
            data
        }
    }
}

function isArrayBufferView(obj: any) {
    if (!(obj?.buffer instanceof ArrayBuffer)) return false;
    if (!(typeof obj?.byteLength === "number")) return false;
    if (!(typeof obj?.byteOffset === "number")) return false;
    return true;
}

export const fetchApiConfig = {
    'default': addr
};


export interface MonismViewUrl<T = any> {
    url: string | {
        url: string;
        data?: any;
        options?: any;
    };
    data?: any;
    options?: T;
    server?: string;
}

export interface FetchApiUrl {
    url: string;
    options?: any;
    server?: string;
}

export interface FetchUrl extends FetchApiUrl {
    data?: any;
}

export function toFetchUrl(baseServer: string | undefined, url: MonismViewUrl): FetchUrl {
    if (typeof url.url === "string") return url as FetchUrl;
    return {
        url: url.url.url,
        data: (url.data || url.url.data) ? {...url.data, ...url.url.data} : undefined,
        options: (url.options || url.url.options) ? {...url.options, ...url.url.options} : undefined,
        server: url.server ?? baseServer
    }
}

export interface FetchApiBeforeSendArgs { url: string; init: RequestInit }



export function fetchApiUrlToString(urlObject: FetchApiUrl): string {
    let { options, server } = urlObject;

    let queryString = encodeQueryString(options);
    let url = urlObject.url;
    if (queryString) {
        if (url.indexOf("?") >= 0) url += "&" + queryString;
        else url += "?" + queryString;
    }
    let prefix = "";
    if (server === undefined) prefix = fetchApiConfig.default || "";
    else if (server) prefix = (fetchApiConfig as any)[server] || "";

    return prefix + url;

}

