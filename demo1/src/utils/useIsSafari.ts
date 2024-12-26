import { useLayoutEffect, useState } from "react";

export function useIsSafari(){
    const [safari, setSafari] = useState<boolean>(false)
    
    useLayoutEffect(()=>{
        (()=>{
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (isSafari) {
                setSafari(true)
            }
        })()
    },[])
    
    return safari
}

