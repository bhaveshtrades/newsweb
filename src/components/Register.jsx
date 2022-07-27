import React from 'react';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';

function Register() {

  if(document.body.classList.contains('bg-dark')){
    document.body.classList.remove('bg-dark')
  }else if(document.body.classList.contains('bg-light')){
    document.body.classList.remove('bg-light')
  }

 const{handleSubmit, register, formState: {errors}} = useForm({
  mode: "onChange"
 });

 document.title = 'News - Register';
 document.body.style.backgroundColor = 'rgb(78, 193, 255)';

 let navigate = useNavigate();

 const[registerStatus, setRegisterStatus] = useState();
 const[confirmAlert, setConfirmAlert] = useState(false);

 const onSubmit = (data) =>{
   const userData = localStorage.getItem(data.email);
   if(userData){
      setRegisterStatus(false);
   }else{
    if(data.password === data.confirmPass){
      localStorage.setItem(data.email, JSON.stringify({ 
        name: data.name, password: data.password 
    }));
    setRegisterStatus(true);
    setTimeout(()=>{
      navigate('/login');
    }, 2000)
   }else{
    setConfirmAlert(true);
   }
  }
 }


  return (
    <>
    {registerStatus === true && <Alert colorStatus='success' loginText='Registration Successful!!!'></Alert>}
    {registerStatus === false && <Alert colorStatus='danger' loginText='This account already exists.'></Alert>}
    {confirmAlert === true && <Alert colorStatus='danger' loginText='Password could not be confirmed'></Alert>}
    <div className='grid h-screen place-items-center leading-10'>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='registerContainer'>
    <label className='labelRegister'>Enter Your Name: </label><br/>
    <input type="text" {...register('name', {required: "Name Required", minLength: {value: 3, message: "Enter Valid Name"}, pattern: {value: /[A-Za-z]/, message: "Enter Valid Name"}})} placeholder="Enter Name" className='registerInputs' disabled={registerStatus}/><br/>
    {errors.name && <div className='registerSpan text-red-900 text-sm'>*{errors.name.message}</div>}

    <label className='labelRegister'>Enter Your Email: </label><br/>
    <input type="email" {...register('email', {required: "Email Required", pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter Valid Email"}})} placeholder="Enter email" className='registerInputs' disabled={registerStatus}/><br/>
    {errors.email && <div className='registerSpan text-red-900 text-sm'>*{errors.email.message}</div>}

    <label className='labelRegister'>Enter Your Password: </label><br/>
    <input type="password" {...register('password', {required: "Password Required", pattern: {value: /[A-Z]/, message: "Password should contain atleast 1 capital letter"}, minLength: {value: 5, message: "Password should contain atleast 5 characters"}})} placeholder="Set Password" className='registerInputs' disabled={registerStatus}/><br/>
    {errors.password && <div className='registerSpan text-red-900 text-sm'>*{errors.password.message}</div>}

    <label className='labelRegister'>Confirm Password: </label><br/>
    <input type="password" {...register('confirmPass', {required: "Confirm Your Password"})} placeholder="Confirm Password" className='registerInputs' disabled={registerStatus}/><br/>
    {errors.confirmPass && <div className='registerSpan text-red-900 text-sm'>*{errors.confirmPass.message}</div>}
    </div>

    <div className='flex gap-x-14 mt-10 justify-center'>
    <button type='submit' className='registerSubmit'>Register</button>
    <Link to ='/login' className='link'>Login from here!!</Link>
    </div>

    </form>
    </div>
    </>
  )
}

export default Register;