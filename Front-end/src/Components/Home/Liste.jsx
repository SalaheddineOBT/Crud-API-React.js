import React,{Component, createRef} from "react";

export default class Liste extends Component{
    constructor(props){
        super(props);
        this.inputUsername=createRef();
        this.inputEmail=createRef();
    };
    state={
        isUpdate:false,
        err:''
    };
    update=async (idd)=>{
        let name=this.inputUsername.current.value;
        let eml=this.inputEmail.current.value;
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(name && eml && idd){
            await fetch("http://localhost/Crud%20API%20PHP/Operations/Update.php",{
                method:"PUT",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({id:idd,username:name,email:eml})
            }).then(res=>{
                return res.json();
            }).then(data=>{
                if(!emailRegex.test(eml)){
                    this.setState({err:"Email Forma Incorrect !"});
                }else{
                    this.setState({err:""});
                    if(data.success){
                        this.toogleUpdate();
                        this.props.listing();
                        alert(data.Message);
                    }else{
                        alert(data.Message);
                    }
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    };
    delete=async (id) =>{
        if(window.confirm("Are You Really Wante Delete This User ?")){
            await fetch("http://localhost/Crud%20API%20PHP/Operations/Delete.php",{
                method:"DELETE",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({id:id})
            }).then(res=>{
                return res.json();
            }).then(data=>{
                if(data.success){
                    if(this.props.id===id){
                        this.props.logined(false,'','');
                    }else{
                        alert(data.Message);
                        this.props.listing();
                    }
                }else{
                    alert(data.Message);
                }
            }).catch(e=>{
                console.log(e);
            });
        }
    };
    cancel=()=>{
        this.toogleUpdate();
    };
    toogleUpdate=()=>{
        const {isUpdate}=this.state;
        this.setState({isUpdate:!isUpdate});
    };
    render(){
        const {users,index}=this.props;
        const lister=()=>{
            return(
                <tr>
                    <td>{users.ID}</td>
                    <td>{users.UserName}</td>
                    <td>{users.Email}</td>
                    <td><button className="btns up" type="submit" onClick={this.toogleUpdate}>Update</button><button className="btns del" type="submit" onClick={()=>this.delete(users.ID)}>Delete</button></td>
                </tr>
            )
        };
        const frm=()=>{
            return(
                <tr key={index}>
                    <td><input type="text" defaultValue={users.ID} disabled required /></td>
                    <td><input type="text" ref={this.inputUsername} defaultValue={users.UserName} required /></td>
                    <td>
                        <input type="email" ref={this.inputEmail} defaultValue={users.Email} required />
                        { (this.state.err) ? (<span className="error">{this.state.err}</span>) : null}
                    </td>
                    <td><button className="btns up" type="submit" onClick={()=>this.update(users.ID)}>Save</button><button className="btns" type="submit" onClick={this.cancel}>Cancel</button></td>
                </tr>
            )
        };
        return(
            <>
                {!this.state.isUpdate ? lister() : frm() }  
            </>
        )
    }
}