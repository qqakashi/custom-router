import { useCallback, useLayoutEffect, useState } from 'react';
import "./base-index.css";
import './App.css';
import { CompRoot } from './components/comp-root';

function App() {
  const [routeKey, setRouteKey] = useState<string>("login")

  useLayoutEffect(()=>{
    const token = localStorage.getItem("token-sx")
    if(token){
      setRouteKey("home")
    }
  },[])


  const loginout = useCallback((key:string) => {
    setRouteKey(key)
    if(key == "home"){}
    else {
      localStorage.removeItem("token-sx")
      localStorage.removeItem("username-sx")
    }
  },[])

  const loging = useCallback((key: string)=>{
    setTimeout(()=>{loginout(key)},300)
  },[])

  return (
    <div style={{width: "100%", height: "100%"}}>
      <CompRoot routeKey={routeKey} onCallBack={loging} />
    </div>
  );
}

export default App;
