interface respone {
    code: number;
    data: Record<string, any>;
    message: string;
}
export const host = process.env.NODE_ENV == "development"? "http://localhost:10111" : ""
export const addr = process.env.NODE_ENV == "development"? "http://localhost:10111/monism/": ""

export default function Http2ServerRequest(url: string, params?: Record<string, any>, method = "GET"){
    const token = localStorage.getItem("token-sx")
    return new Promise<respone>(async(s,j)=>{
        let headers:Record<string, any> = { "Content-Type": "application/json;charset=utf-8" }
        if (!!token) {
            headers = {
                "Content-Type": "application/json;charset=utf-8",
                "X-Request-Token": `${token}`,
            }
        }
        fetch(host + url,{
            method,
            credentials: "include",
            body: method == "GET" ? undefined : JSON.stringify(params),
            headers
        }).then(async(e)=>{s(e.json())})
            .catch(e=>{
                const data = {
                    code: 500,
                    data: null,
                    message: e
                }
                j(data)
            })
    })
}

export function uploadFiles(files: File[]) {
    let formData = new FormData();
    const token = localStorage.getItem("")
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    const init: RequestInit = {
        method: "POST",
        body: formData,
        headers: {
            "Platform": "pc",
            "Authorization": `Bearer ${token}`,
        },
    }
    fetch('', init)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
