import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./registered.css"

import axios from 'axios';
import Qs from 'qs';


class Registered extends Component{
    state={
        username:"",
        password:"",
        token:"",
        message:"",
        nickname :"",
    }
    loginOnclick=()=>{
        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/user/create",
           data:Qs.stringify({
                nickname:this.state.nickname,
                username:this.state.username,
                password:this.state.password,
            })
        }).then((response)=>{
                    if(response.data.code!=="ERROR"){
                        this.setState({token:response.data.data.token},
                            this.value.setToken({token:response.data.data.token},this.props.history.push('/Login')),
                            window.localStorage.setItem("token",response.data.data.token))
                            

                }else{
                    this.setState({message:response.data.message})
                }
       })

setTimeout(() => {
    /* axios.get(`http://xueba.it266.com:8081/api/post/list`
    ).then((response)=>{
        console.log(response);
            if(response.data.status){
            }
    }) */ 

/*     axios({     
        method:"post",
        url:"http://xueba.it266.com:8081/api/post/list",
       data:Qs.stringify({
            token:this.state.token,
        })
    }).then((response)=>{
        console.log(response);
   }) */


}, 1000);

    }
    render(){
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    this.value=value
                    return(
                        <div className="Registered">
                      <div className="form-group">
                                    <label></label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputEmail3" crossOrigin="名称" placeholder="名称"
                                            value={this.state.nickname}
                                            onChange={(e)=>{this.setState({nickname:e.target.value})}}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label ></label>
                                        <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputPassword3" crossOrigin="用户名" placeholder="用户名"
                                            value={this.state.username}
                                            onChange={(e)=>{this.setState({username:e.target.value})}}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label ></label>
                                        <div className="col-sm-10">
                                        <input type="password" className="form-control"  crossOrigin="密码" placeholder="密码"
                                            value={this.state.password}
                                            onChange={(e)=>{this.setState({password:e.target.value})}}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-10">
                                        <button onClick={()=>{
                                            this.loginOnclick()
                                        }}>注册</button>
                                    </div>
                                    <div className="text-left">
                                        {this.state.message}
                                    </div>
                                    <div className="text-right"
                                        onClick={()=>{
                                            this.props.history.push('/Login')
                                        }}
                                    >
                                        我要登录
                                    </div>
                                </div>
                        </div>
                    )}}
            </AuthContext.Consumer>   
        )}   
}
export default withRouter(Registered)