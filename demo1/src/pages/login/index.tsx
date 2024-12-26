import "./login.css"
import { Button, Col, Form, Input, Row, message } from "antd"
import { useCallback, useState } from "react";
import Http2ServerRequest, { host } from "../../utils/request";
import { CompProps } from "../../utils/interface";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function Login(props: CompProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const [load, setload] = useState(false)
    const [code, setCode] = useState<string>(host + "")


    const handleSubmit = useCallback(async (data: any) => {
        setload(true)
        const res = await Http2ServerRequest("", data, "POST");
        if (!!res.code) {
            setCode(host+"" + new Date().getTime());
            messageApi.open({ type: "error", content: res.message });
            setload(false)
        } else {
            localStorage.setItem("", res.data.action[1]?.meta)
            localStorage.setItem("", res.data.result.nickname)
            setTimeout(() => {
                props.onCallBack?.("home")
            }, 300);
        }
    }, []);


    return (<div className="login">
        {contextHolder}
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <div className="login_bg">
                <div className="div_bg" />
                <span style={{ fontSize: "58.33rem", fontWeight: "600", color: "white", userSelect: "none", zIndex: 1 }}></span>
            </div>
            <div style={{ width: "300rem", height: 10 }} />
            <div className="login_form">
                <div style={{ fontSize: "27.22rem", fontWeight: "bold", textAlign: "center", padding: "15rem 0 30rem 80rem" }}>账号登录</div>
                <Form size="large" {...layout} name="basic" onFinish={handleSubmit} style={{ marginTop: "10rem" }}>
                    <Form.Item label="用户名" validateTrigger={false} name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" validateTrigger={false} name="password" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="验证码" validateTrigger={false} name="verify" rules={[{ required: true, message: '请输入验证码' }]}>
                        <Input suffix={<img src={code} style={{ cursor: "pointer" }} onClick={(e) => {
                            e.stopPropagation()
                            setCode("" + new Date().getTime());
                        }} />} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button loading={load} style={{ display: "block", margin: "0 auto", width: "150rem" }} size="large" type="primary" htmlType="submit">&nbsp;登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>)
}
