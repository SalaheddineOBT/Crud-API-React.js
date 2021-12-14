// import axios from "axios";
import React,{Component,Fragment} from "react";
import Liste from "./Liste";

export default class Home extends Component{
    state={
        users:[]
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
    Onsub=(e)=>{
        e.preventDefault();
    };
    render(){
        const lister=this.state.users.map((u,i)=>{
            return(
                <Fragment key={i}>
                    <Liste users={u} index={i} listing={this.listing} />
                </Fragment>
            )
        });
        return(
            <div className="HomePage">
                <nav>
                    <h1>welcom in the dashboard </h1>
                    <button type='submit' onClick={()=>this.props.logout()}>Logout</button>
                </nav>
                <form onSubmit={this.Onsub}>
                    <a href="new">Create New User ?</a>
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
        )
    }
}
