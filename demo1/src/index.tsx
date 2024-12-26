import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import locale from "antd/locale/zh_CN"

function setRootFontSize() {
  const baseSize = 16;
  var clientWidth = document.documentElement.clientWidth;
  var wid = (clientWidth / 1920);
  const scaleFactor = window.innerWidth / 1920;
  document.documentElement.style.fontSize = wid+"px" //`${baseSize * scaleFactor}px`;
}

window.addEventListener('resize', setRootFontSize);
setRootFontSize();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={locale} theme={{
    components:{
      Checkbox: {
        colorText: "#91E5FF",
        colorPrimary: "#91E5FF",
        colorWhite: "black",
        colorBgContainer: "transparent",
        colorBorder: "#91E5FF",
        colorPrimaryHover: "#91E5FF",
        borderRadiusSM: 2,
        fontSize: 16,
        fontWeightStrong: 600
      },
      Dropdown: {
        colorBgElevated: "rgba(255,255,255,1)",
        colorText: "#333",
      },
      Menu:{
        paddingContentHorizontal: 20
      },
      Tabs: {
        itemActiveColor: "#91E5FF",
        itemColor: "#91E5FF",
        itemHoverColor: "#91E5FF",
        itemSelectedColor: "#91E5FF",
        inkBarColor: "#91E5FF",
        horizontalItemPadding: "0.45rem 0",
        titleFontSize: 18
      }
    }
  }}>
    <App />
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
