import React,{Component,Fragment,createRef} from "react";
import sha256 from "sha256";
import Liste from "./Liste";

export default class Home extends Component{

    constructor(props){
        super(props);
        this.inputName=createRef();
        this.inputEmail=createRef();
        this.inputPassword=createRef();
        this.inputConfirm=createRef();
    }

    state={
        err:'',
        active:false,
        users:[],
        user:{
            username:'',
            email:'',
            password:'',
            confirm:''
        },
        user1:{},
        f:false
    };

    componentDidMount(){
        this.listing();
    };

    listing=async ()=>{
        await fetch('http://localhost/Crud%20API%20PHP/Operations/Listing.php')
        .then(res=>{
            return res.json();
        }).then(data=>{
            this.setState({users:data.data});
        }).catch(e=>{
            console.log(e);
        });
    };

    OnChanging=()=>{
        const i={
            username:this.inputName.current.value,
            email:this.inputEmail.current.value,
            password:this.inputPassword.current.value,
            confirm:this.inputConfirm.current.value
        }
        this.setState({user:i});
    }

    Onsub=(e)=>{
        e.preventDefault();
    };

    OnSubmited=async(e)=>{
        e.preventDefault();
        const {user}=this.state;
        if(user.password.length < 8){
            this.setState({err:"Password Must Be at least 8 characters !"});
        }else if(user.password!==user.confirm){
            this.setState({err:"Confirm Password Is Incorrect !"});
        }else{
            await fetch("http://localhost/Crud%20API%20PHP/Operations/Create.php",{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    username:user.username,
                    email:user.email,
                    password:sha256.x2(user.confirm)
                })
            }).then(res=>{
                return res.json();
            }).then(data=>{
                if(data.success){
                    alert(data.Message);
                    this.listing();
                    this.setState({err:""});
                    this.setState({user:{
                        username:'',
                        email:'',
                        password:'',
                        confirm:''
                    }});
                    this.inputName.current.value="";
                    this.inputEmail.current.value="";
                    this.inputPassword.current.value="";
                    this.inputConfirm.current.value="";
                    this.toogle();

                }else{
                    this.setState({err:data.Message});
            }

            }).catch(e=>{
                console.log(e);
            });
        }
    }

    toogle=()=>{
        const {active}=this.state;
        this.setState({active:!active});
        this.inputName.current.value="";
        this.inputEmail.current.value="";
        this.inputPassword.current.value="";
        this.inputConfirm.current.value="";
    }

    Read=async (id,v)=>{
        if(id && Number.isInteger(id)){
            await fetch(`http://localhost/Crud%20API%20PHP/Operations/Read.php?id=${id}`,{

            }).then(res=>{
                return res.json();
            }).then(data=>{
                if(data.success){
                    this.setState({user1:data.data});
                    this.setState({f:v});
                }else{
                    alert(data.Message);
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    }

    toogleF=()=>{
        this.setState({f:false});
    }
    
    render(){
        const {id}=this.props;

        const lister=this.state.users.map((u,i)=>{
            return(
                <Fragment key={i}>
                    <Liste users={u} id={id} Read={this.Read} logined={this.props.logined} index={i} listing={this.listing} />
                </Fragment>
            )
        });

        return(
            <>
                <div className={(this.state.active) ? "active" : "Create"}>
                    <form onSubmit={this.OnSubmited} className="form">
                        <h1>Create New User</h1>
                        {this.state.err ? (<span className="error">{this.state.err}</span>) : null}
                        <label htmlFor="username">User Name :</label>
                        <input type="text" name="username" placeholder="Enter Your User Name :" ref={this.inputName} defaultValue={this.state.user.username} required onChange={this.OnChanging} />
                        <label htmlFor="email">Email :</label>
                        <input type="email" name="email" placeholder="Enter Your Email :" ref={this.inputEmail} defaultValue={this.state.user.email} required onChange={this.OnChanging} />
                        <label htmlFor="password">Passowrd :</label>
                        <input type="password" name="password" placeholder="Enter Your Password :" ref={this.inputPassword} defaultValue={this.state.user.password} required onChange={this.OnChanging} />
                        <label htmlFor="confirm">Confirme Passowrd :</label>
                        <input type="password" name="confirm" placeholder="Confirm Your Password :" ref={this.inputConfirm} defaultValue={this.state.user.confirm} required onChange={this.OnChanging} />
                        <div className="bb">
                            <button type="submit">ADD</button>
                            <button type="button" onClick={this.toogle}>Back</button>
                        </div>
                    </form>
                </div>
                
                <div className="HomePage">
                    <nav>
                        <span className="tit">Dashboard</span>
                        <h1>User Connecté : <span className="h">{this.props.v}</span></h1>
                        <button className="logout" type='submit' onClick={()=>this.props.logout()}>Logout</button>
                    </nav>
                    <div className="cont">
                        <div className="toping">
                            <h1>Members Information</h1>
                            <button className="btni" type="submit" onClick={this.toogle}>Create New</button>
                        </div>
                        <form onSubmit={this.Onsub}>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Operations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lister}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>

                <div className={this.state.f ? "information" : "informaleft"}>
                    <div className="containn">
                        <h1>User Information</h1>
                        <ul>
                            <li><span className="in">ID : </span>{this.state.user1.ID} </li>
                            <li><span className="in">User Name : </span> {this.state.user1.UserName}</li>
                            <li><span className="in">Email : </span>{this.state.user1.Email} </li>
                            <li><span className="in">Create in : </span> {this.state.user1.CreateDate}</li>
                        </ul>
                        <button onClick={this.toogleF}>Close</button>
                    </div>
                </div>
            </>
        )
    }
}