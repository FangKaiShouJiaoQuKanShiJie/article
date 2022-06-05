import React from 'react';
import {HashRouter,Switch,Route} from"react-router-dom"
import "./app.css"

import Home from './conponents/home'
import Login from './conponents/login'
import Top from './conponents/top'
import Details from './conponents/details'
import Reply from './conponents/reply'
import CreatePost from './conponents/createPost'
import My from './conponents/my'
import Registered from './conponents/registered'
import Update from './conponents/update'


let token=window.localStorage.getItem("token");
let id=window.localStorage.getItem("id");
export const AuthContext=React.createContext({
    auth:{
        token:null,             
        setToken: () => {
        },
        id:null,
        setId:()=>{},
}
}) 
class App extends React.Component{
    constructor(val){
        super(val);
        this.setToken = (u) => {
            this.setState({auth:{...this.state.auth,token:u}})
        }
        this.setId=(u)=>{
            this.setState({auth:{...this.state.auth,id:u}})
        }
        this.state={
            auth:{
                token:token?{token:token}:null,
                setToken:this.setToken,
                id:id?{id:id}:null,
                setId:this.setId,
                } 
            }
    }
    render(){
        return(
            <AuthContext.Provider  value={this.state.auth}>
            <HashRouter>
                <Top />
            <Switch className="Switch">
                <Route exact path="/"        component={Home}        ></Route>
                <Route path="/Login"         component={Login}       ></Route>
                <Route path="/Details"       component={Details}     ></Route>
                <Route path="/Reply"         component={Reply}       ></Route>
                <Route path="/CreatePost"    component={CreatePost}  ></Route>
                <Route path="/My"            component={My}          ></Route>
                <Route path="/Registered"    component={Registered}  ></Route>
                <Route path="/Update"        component={Update}      ></Route>
            </Switch>
        </HashRouter>
        </AuthContext.Provider>
        )
    }
}
export default App