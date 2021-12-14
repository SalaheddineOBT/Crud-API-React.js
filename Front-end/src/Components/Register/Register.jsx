import React,{useState} from "react";
import axios from 'axios';
import sha256 from 'sha256';

export default function Register(){
    const user={
        username:'',
        email:'',
        password:'',
        confirm:''
    }
    const [Values,SetValues]=useState(user);
    const [Error,SetError]=useState("");
    const [Success,SetSuccess]=useState("");
    
    const OnChanging=(e)=>{
        const {name,value}=e.target;
        SetValues({...Values,[name]:value});
    }

    const Register=async(info)=>{
        const reg=await axios.post("http://localhost/Crud%20API%20PHP/Operations/Create.php",info);
        return reg.data;
    }

    const OnSubmited=async(e)=>{
        e.preventDefault();
        if(Values.password.length < 8){
            SetError("Password must be at least 8 characters !");
        }else if(Values.password !== Values.confirm){
            SetError("Confirm Password is Incorrect !");
        }else{
            const reg=await Register(
                {
                    username:Values.username,
                    email:Values.email,
                    password:sha256.x2(Values.confirm)
                }
            );
            if(reg.success){
                SetSuccess(reg.Message);
                SetValues({...Values})
            }else{
                SetError(reg.Message);
            }
            console.log(Values);
        }
    }
    return(
        <form onSubmit={OnSubmited} className="form">
            <h1>Register Form</h1>
            {(Error && !Success)? ( <div className="error">{Error}</div> ) : null}
            {(!Error && Success)? ( <div className="info">{Success}</div> ) : null}
            <label htmlFor="username">User Name :</label>
            <input type="text" name="username" placeholder="Enter Your User Name :" required onChange={OnChanging} />
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" placeholder="Enter Your Email :" required onChange={OnChanging} />
            <label htmlFor="password">Passowrd :</label>
            <input type="password" name="password" placeholder="Enter Your Password :" required onChange={OnChanging} />
            <label htmlFor="confirm">Passowrd :</label>
            <input type="password" name="confirm" placeholder="Confirm Your Password :" required onChange={OnChanging} />
            <button type="submit">Register</button>
            <a href="/">Already Have Account ?</a>
        </form>
    )
}