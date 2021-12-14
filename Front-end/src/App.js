import './App.css';
import Home from './Components/Home/Home';
import React ,{useState} from 'react';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Create from './Components/Create/Create';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  const vrai={
    islogin:false,
    username:'',
    id:0
  };
  const [Vrai,SetVrai]=useState(vrai);
  const logined=(v)=>{
    SetVrai({islogin:v});
  };
  const logout=()=>{
    SetVrai({islogin:false});
  };
  return (
    <>
      {
        (!Vrai.islogin) ?
        (
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login logined={logined} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new" element={<Create />} />
            </Routes>
          </BrowserRouter>
        ) : ( 
          <Home logout={logout} v={Vrai.islogin} />
        )
      } 
    </>
  )
};

export default App;