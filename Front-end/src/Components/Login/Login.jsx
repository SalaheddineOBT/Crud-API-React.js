import React,{useState} from "react";
import sha256 from "sha256";

export default function Login({logined}){
    const user={
        email:'',
        password:''
    };
    const [Values,SetValues]=useState(user);
    const [Error,SetError]=useState(null);
    const [Success,SetSuccess]=useState(null);
    const OnChanging=(e)=>{
        const {name,value}=e.target;
        SetValues({...Values,[name]:value});
    };
    const login=async (info)=>{
        const log=await fetch("http://localhost/Crud%20API%20PHP/Operations/Login.php",
            {
                method:"POST",
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(info)
            }
        );
        const data=await log.json();
        return data;
    };
    const OnSubmited=async (e)=>{
        e.preventDefault();
        if(Values.password.length < 8){
            SetError("Password must be at least 8 characters !");
        }else{
            SetError("");
            const log=await login({email:Values.email,password:sha256.x2(Values.password)});
            if(log.success){
                SetSuccess(log.Message);
                logined(true,log.data.ID,log.data.UserName);
                SetValues({
                    email:'',
                    password:''
                });
            }else{
                SetError(log.Message);
            }
        }
    };
    return(
        <div className="loginPage">
            <form onSubmit={OnSubmited} className="form">
                <h1>Login Form</h1>
                {(Error && !Success) ? ( <div className="error">{Error}</div> ) : null}
                {(!Error && Success) ? ( <div className="info">{Success}</div> ) : null}
                <label htmlFor="email">Email :</label>
                <input type="email" name="email" placeholder="Enter Your Email :" value={Values.email} required onChange={OnChanging} />
                <label htmlFor="password">Passowrd :</label>
                <input type="password" name="password" placeholder="Enter Your Password :" value={Values.password} required onChange={OnChanging} />
                <button type="submit">Login</button>
                <a href="/register">Don't Have Account ?</a>
            </form>
        </div>
    )
}