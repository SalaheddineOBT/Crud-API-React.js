import './App.css';
import Home from './Components/Home/Home';
import React ,{useState} from 'react';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {

  const vrai={
    islogin:false
  }
  const [Vrai,SetVrai]=useState(vrai);

  const logined=(v)=>{
    SetVrai({islogin:v});

  }
  const logout=()=>{
    SetVrai({islogin:false});
  }

  return (
    <>
      {
        (!Vrai.islogin) ?
        ( <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login logined={logined} />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter> ) :

        ( <Home logout={logout} /> )
      }
    </>
  )
}

export default App;