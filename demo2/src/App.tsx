import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import "./base-index.css";
import './App.css';
import { CompRoot } from './components/comp-root';

export default function App() {
  const [routeKey, setRouteKey] = useState<string>("home")

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

// export default App;
// export default ()=>{
//   const dataReceiver = useRef<DataReceiver>(new DataReceiver()).current;
//   useEffect(()=>{
//     dataReceiver.keys = ["1001", "1002", "1003"];
//     const onReceived = dataReceiver.onReceived((data)=>{
//       console.log("接收到数据：", data);
//     });
//     return ()=>{
//       onReceived.remove();
//     }
//   },[]);
//   return <div>
//      <h1>数据接收器</h1>
//       <button onClick={async()=>{
//         // dataReceiver.start();
//         var ssa = await GetAppConfig.request();
//         console.log("ssa", ssa);
//       }}>开始</button>
//       <button onClick={()=>{
//         dataReceiver.stop();
//       }}>停止</button>
//   </div>
// }



