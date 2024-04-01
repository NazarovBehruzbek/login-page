import {Form, Input, Button, message} from 'antd';
import './login.css'
import {deleteLocalStorage, getToken, setLocalStorage, signin, tokenKey} from "./Auth.js";


const Login = () => {

    const onFinish = (values) => {
        signin(values).then(res => {
            if (res && res?.data?.data?.tokens?.accessToken?.token) {
                setLocalStorage(tokenKey, res?.data?.data?.tokens?.accessToken?.token);
                message.success("Muvaffaqiyatli o'tildi")
            } else {
                message.error("Login yoki parol noto'g'ri");
            }
        }).catch(err => {
            console.log(err)
            message.error("Login yoki parol noto'g'ri");
        });
    };

    return (
        <>

            <Form
                className="login-form"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Telefon raqam"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Parol"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight:'20px'}}>
                        Kirish
                    </Button>
                    <Button type="primary" onClick={()=>deleteLocalStorage(tokenKey)}>Delete Locale Storage </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;