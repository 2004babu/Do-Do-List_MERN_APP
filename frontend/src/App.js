import './App.css';
import {BrowserRouter as Router,Route,Routes}from 'react-router-dom'
import {HelmetProvider}from 'react-helmet-async'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer';
import Home from './components/Home';
function App() {


  return (
    <Router>
      <div className="App">
       <HelmetProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
       </HelmetProvider>
       </div>
    </Router>
  );
}

export default App;
