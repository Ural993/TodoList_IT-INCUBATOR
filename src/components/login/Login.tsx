import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppRootStateType } from "../../state/store";
import { loginTC } from "../../state/reducers/login-reducer";
import { Button, Checkbox, Input, Row } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(loginTC(values));
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Row justify="center" align="middle">
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && errors.email}
        <Input.Password
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && errors.password}

        <Checkbox onChange={handleChange}>Remember me</Checkbox>

        <Button htmlType="submit" type="primary">
          Login
        </Button>
      </form>
    </Row>
  );
};

export default Login;
