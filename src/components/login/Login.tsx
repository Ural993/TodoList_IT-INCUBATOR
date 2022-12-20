import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppRootStateType } from "../../state/store";
import { loginTC } from "../../state/reducers/login-reducer";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { LoginParamsType } from "../../api/api";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const onFinish = (values: LoginParamsType) => {
    dispatch(loginTC(values));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Row justify="space-around" align="middle" style={{ height: "100%" }}>
      <Col span={6}>
        <Form name="normal_login" onFinish={onFinish} wrapperCol={{ span: 24 }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password type="password" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="rememberMe">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item >
                <Button htmlType="submit" type="primary" style={{width:'100%'}}>
                  Login
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
