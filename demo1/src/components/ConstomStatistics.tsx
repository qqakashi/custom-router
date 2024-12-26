import {useCallback, useEffect, useRef} from "react"
import * as echarts from "echarts";

interface StatisticsProps{
    marginTop?: number | string;
    width?: number | string;
    height?:number | string;
    option: any;
    canclick?: boolean;
}


export function ConstomStatistics(props:StatisticsProps){
    const staticState = useRef<echarts.ECharts>();
    const timer = useRef<NodeJS.Timeout>()
    const div = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.addEventListener("resize", onResize)
        onResize()
    }, [])

    useEffect(() => {
        timer.current = setTimeout(()=>{
            if (staticState.current) {
                staticState.current.setOption(props.option, true);
            }else {
                staticState.current = echarts.init(div.current!);
                staticState.current?.setOption(props.option, true);
            }
        },300)
        return()=>{
            if(timer.current) clearTimeout(timer.current)
        }
    },[props.option])

    const onResize = useCallback(() => {
        staticState.current && staticState.current.resize();
    },[])

    return(<div ref={div} style={{width: props.width ?? "100%", height: props.height ?? "28rem", margin: "0 auto", marginTop: props.marginTop, cursor: props.canclick?"pointer":"none" }} />)
}
