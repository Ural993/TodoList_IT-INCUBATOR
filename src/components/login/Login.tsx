import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRootStateType } from '../../state/store';
import { loginTC } from '../../state/login-reducer';

const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '', password: '', rememberMe: false
    },
    onSubmit: values => {
      dispatch(loginTC(values))
    },
  });

 const  {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik

if(isLoggedIn){
  return <Navigate to='/'/>
}

  return (
    <div>
        <Grid container justifyContent='center'>
          <Grid item xs={4}>

            <form onSubmit={handleSubmit}>

          <FormControl>
            <FormGroup>
        <TextField
          label='Email'
          type="email"
          name="email"
          margin='normal'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && errors.email}
        <TextField
          label='Password'
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          margin='normal'
        />
        {errors.password && touched.password && errors.password}
        <FormControlLabel
        label='RememberMe' 
        onChange={handleChange}
        onBlur={handleBlur}
        control={<Checkbox  name='rememberMe'
          checked={values.rememberMe}
       
         />}
          />
        <Button type="submit" variant='contained' color='primary'>
          Login
        </Button>
            </FormGroup>
          </FormControl>
      </form>
      </Grid>

        </Grid>

  </div>
  )
}

export default Login