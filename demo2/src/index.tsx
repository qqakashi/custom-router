import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
// for date-picker i18n
import 'dayjs/locale/zh-cn';


function resize() {
  const s = window.innerWidth / 1920;
  document.body.style.transformOrigin = '0 0';
  document.body.style.transform = `scale(${s},${s})`;
  document.body.style.width = window.innerWidth / s + 'px';
  document.body.style.height = window.innerHeight / s + 'px';
}
window.onresize = function () {
  resize();
}
resize();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={zhCN} theme={{
    components:{
      // Dropdown: {
      //   colorBgElevated: "rgba(255,255,255,1)",
      //   colorText: "#333",
      // },
      // Menu:{
      //   paddingContentHorizontal: 20
      // },
      Button:{
        defaultHoverColor: "#3F51B5",
        defaultHoverBorderColor: "#3F51B5"
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
