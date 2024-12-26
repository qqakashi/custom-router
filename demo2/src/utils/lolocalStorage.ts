//lolocalStorage简单封装(统一前缀方便清理缓存)
const PrefixName = "GZB_Excitation_";

function setItem(key:string, value:string){
    localStorage.setItem(PrefixName + key, value);
}
function getItem(key:string){
    return localStorage.getItem(PrefixName + key);
}

export default {
    setItem,
    getItem
}