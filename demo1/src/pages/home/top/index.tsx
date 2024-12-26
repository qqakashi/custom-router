import { Checkbox, Col, GetProp, Row } from "antd";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CheckboxProps, MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from "@ant-design/icons";

interface topParams{
    right: React.ReactNode;
    islogin(key:string):void;
    onChangeTabsKey(key: number): void;
    onSelectKey?(keys: string):void;
}


export function Top(props: topParams){
    const homeRef = useRef<HTMLDivElement>(null)
    const manageRef = useRef<HTMLDivElement>(null)
    const [tabsKey, setTabsKey] = useState<number>(0)
    const [width, setWidth] = useState<number | undefined>(0)
    const [left, setLeft] = useState<number | undefined>(0)
    const [username, setUsername] = useState<string|null>("")
    const [stateowned, setStateOwned] = useState<string[]>([])

    useEffect(()=>{
        setUsername(localStorage.getItem(""))
        setWidth(homeRef.current?.clientWidth)
        window.addEventListener("resize",()=>{
            if(tabsKey){
                setWidth(manageRef.current?.clientWidth)
            }else{
                setWidth(homeRef.current?.clientWidth)
            }
        })
    },[])

    useEffect(()=>{
        props.onSelectKey?.(stateowned.join())
    },[stateowned])

    const onChangeTabsKey = useCallback((index: number)=>{
        props.onChangeTabsKey(index)
        setTabsKey(index)
        if(!!index){
            setWidth(manageRef.current?.clientWidth)
            setLeft(manageRef.current?.offsetLeft)
        } else {
            setWidth(homeRef.current?.clientWidth)
            setLeft(homeRef.current?.offsetLeft)
        }
    },[])

    const selectKey = useCallback((key: string)=>{
        if(stateowned.includes(key)){
            const arr = stateowned.filter((v)=>v!=key)
            setStateOwned(arr)
        } else {
            setStateOwned([...stateowned, key])
        }
        props.onSelectKey?.(stateowned.join())
    },[stateowned, props.onSelectKey])

    const checkAll = useMemo(()=>{
        if (stateowned.includes("2") && stateowned.includes("5") && stateowned.includes("3")) {
            return true
        }
        return false
    },[stateowned])

    const indeterminate = useMemo(()=>{
        if(checkAll){
            return false
        }
        if (stateowned.includes("2") || stateowned.includes("5") || stateowned.includes("3")) {
            return true
        }
        return false
    },[stateowned,checkAll]);

    const checkAll2 = useMemo(()=>{
        if(stateowned.includes("1") && stateowned.includes("4") && stateowned.includes("6")){
            return true
        }
        return false
    },[stateowned])

    const indeterminate2 = useMemo(()=>{
        if(checkAll2){
            return false
        }
        if(stateowned.includes("1") || stateowned.includes("4") || stateowned.includes("6")){
            return true
        }
        return false
    },[stateowned, checkAll2])

    /**退出登录 */
    const logout = useCallback(()=>{
        props.islogin("login")
    },[])

    return(<div className="home-top">
        <div style={{width: "310rem"}}>{props.right}</div>
        <div className="home-top-tabs-wrap" style={{top: "40%"}}>
            <div style={{width: "57rem", height: 1}} />
            <div style={{width, height: "2rem", background: "#91E5FF", position: "absolute", bottom: "-5rem", left, transition: "0.5s all"}}></div>
        </div>
        <div className="home-top-tabs-wrap2" style={{top: "40%"}}>
            <img src={require("../../../img/avat.png")} alt="暂无图片" style={{width: "23rem", height: "23rem", marginRight: "7rem"}} />
            <span style={{color: "#91E5FF", fontSize: "17rem", cursor: "pointer", padding: "0 4rem"}}>{username}</span>
            <span style={{color: "#91E5FF", fontSize: "17rem", cursor: "pointer", padding: "0 4rem"}} onClick={logout}>退出登录</span>
        </div>
    </div>)
}
