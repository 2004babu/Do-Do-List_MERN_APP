import './App.css';
import {BrowserRouter as Router,Route,Routes}from 'react-router-dom'
import {HelmetProvider}from 'react-helmet-async'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer';
import Home from './components/Home';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLogin from './components/user/UserLogin';
import CreateDoDo from './components/Do-Do/CreateDoDo';
import store from './store'
import { loaduser } from './Actions/authAction';
import Register from './components/user/Register';
import EditDoDo from './components/Do-Do/EditDoDo';
import { useEffect } from 'react';
import Profile from './components/user/Profile';
import EditProfile from './components/user/EditProfile';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
function App() {
useEffect(()=>{
  store.dispatch(loaduser)
},[])
  

  return (
    <Router>
       <HelmetProvider>
        <Header/>
        <div className='container-fluid p-sm-1 p-md-5 d-flex justify-content-center'>
          <ToastContainer theme='dark'/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/createDoDo' element={<CreateDoDo/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/edit/:id' element={<EditDoDo/>}/>
          <Route path='/editprofile/:id' element={<EditProfile/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/password/reset/:id' element={<ResetPassword/>}/>
        </Routes>
        </div>
        <Footer/>
       </HelmetProvider>
    </Router>
  );
}

export default App;
