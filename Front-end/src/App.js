import './App.css';
import Home from './Components/Home/Home';
import React ,{useState} from 'react';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  const vrai={
    islogin:false,
    username:'',
    id:0
  };
  const [Vrai,SetVrai]=useState(vrai);
  const logined=(v,idd,name)=>{
    SetVrai({
      islogin:v,
      username:name,
      id:idd
    });
  };
  const logout=()=>{
    SetVrai({
      islogin:false,
      username:'',
      id:0
    });
  };
  return (
    <>
      {
        (!Vrai.islogin || !Vrai.username || !Vrai.id) ?
        (
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login logined={logined} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        ) : ( 
          <Home logout={logout} v={Vrai.username} id={Vrai.id} logined={logined}/>
        )
      } 
    </>
  )
};

export default App;