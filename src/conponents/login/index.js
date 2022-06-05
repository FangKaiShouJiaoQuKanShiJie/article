import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./login.css"

import axios from 'axios';
import Qs from 'qs';

class Login extends Component{
    state={
        username:"",
        password:"",
        token:"",
        message:"",
    }
    loginOnclick=()=>{
        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/token/create",
           data:Qs.stringify({
                username:this.state.username,
                password:this.state.password,
            })
        }).then((response)=>{
                    if(response.data.code!=="ERROR"){
                        window.localStorage.setItem("token",response.data.data.token)
                        this.value.setToken({token:response.data.data.token}) 
                        this.setState({token:response.data.data.token},this.props.history.push('/'))
                            

                }else{
                    this.setState({message:response.data.message})
                }
       })



    }
    render(){
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    this.value=value
                    return(
                        <div className="login">
                      <div className="form-group">
                                    <label></label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputEmail3" crossOrigin="用户名"
                                            value={this.state.username}
                                            onChange={(e)=>{this.setState({username:e.target.value})}}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label></label>
                                        <div className="col-sm-10">
                                        <input type="password" className="form-control" id="inputPassword3" crossOrigin="密码"
                                            value={this.state.password}
                                            onChange={(e)=>{this.setState({password:e.target.value})}}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className=" col-sm-10">
                                        <button onClick={()=>{
                                            this.loginOnclick()
                                        }}>登录</button>
                                    </div>
                                    <div className="text-left">
                                        {this.state.message}
                                    </div>
                                    <div className="text-right"
                                        onClick={()=>{
                                            this.props.history.push('/Registered')
                                        }}
                                    >
                                        我要注册
                                    </div>
                                </div>
                        </div>
                    )}}
            </AuthContext.Consumer>   
        )}   
}
export default withRouter(Login)




