import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';

function Login(){

  let dispatch = useDispatch();

  if(document.body.classList.contains('bg-dark')){
    document.body.classList.remove('bg-dark');
  }else if(document.body.classList.contains('bg-light')){
    document.body.classList.remove('bg-light');
  }

  const{handleSubmit, register, formState: {errors}} = useForm({
   mode: "onChange"
  });

  let navigate = useNavigate();

  const[loginStatus, setLoginStatus] = useState();

  document.title = 'News - Login';
  document.body.style.backgroundColor = 'rgb(78, 193, 255)'; 

  const onSubmit = (data) =>{
    const userData = JSON.parse(localStorage.getItem(data.email));
    if (userData) {
        if (userData.password === data.password){
          dispatch({type: 'SIGN_IN'});
          setLoginStatus(true);
          setTimeout(()=>{
            navigate('/');
          }, 2000)
        } else {
          setLoginStatus(false);
        }
      }else{
        alert('This account does not exist. Register first.');
      }
  }

  return (
    <>
    {(loginStatus === true) && <Alert colorStatus='success' loginText='Login Successful!!!'></Alert>}
    {(loginStatus === false) && <Alert colorStatus='danger' loginText='Wrong Password. Try Again.'></Alert>}
    <div className='grid h-screen place-items-center leading-10'>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='loginContainer'>
    <label htmlFor="email" className='labelLogin'>Enter Email: </label><br/>
    <input type="email" {...register('email', {required: "Email Required", pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter Valid Email"}})} placeholder="Enter Your Email" className='loginInputs' disabled={loginStatus}/><br/>
    {errors.email && <div className='loginSpan'><span className='text-red-900 text-sm'>*{errors.email.message}</span></div>}

    <label htmlFor="password" className='labelLogin'>Enter Password: </label><br/>
    <input type="password" {...register('password', {required: "Password Required"})} placeholder="Enter Your Password" className='loginInputs' disabled={loginStatus}/><br/>
    {errors.password && <div className='loginSpan'><span className='text-red-900 text-sm'>*{errors.password.message}</span></div>}
    </div>

    <div className='flex gap-x-14 mt-10 justify-center'>
    <button type='submit' className='loginSubmit'>Login</button>
    <Link to = "/register" className='link'>Register here!!</Link>
    </div> 
    
    </form>
    </div>
    </>
  )
}

export default Login;