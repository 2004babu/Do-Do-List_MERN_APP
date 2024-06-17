import './App.css';
import {BrowserRouter as Router,Route,Routes}from 'react-router-dom'
import {HelmetProvider}from 'react-helmet-async'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer';
import Home from './components/Home';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLogin from './components/user/UserLogin';
function App() {


  return (
    <Router>
       <HelmetProvider>
        <Header/>
        <div id='index_container'>
          <ToastContainer theme='dark'/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<UserLogin/>}/>
        </Routes>
        </div>
        <Footer/>
       </HelmetProvider>
    </Router>
  );
}

export default App;
