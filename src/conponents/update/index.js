import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./update.css"

import axios from 'axios';
import Qs from 'qs';


class Update extends Component{
    
    
    state={
        data:[],
        up:-1,

        nickname:"",
        password:"",
        mobile:"",

        message:"",
        avatar:'',
        passwords:"",


    }
    componentDidMount(){
        this.user()
    }
    //用户信息
    user=()=>{
        axios.get(`http://xueba.it266.com:8081/api/user/whoami?token=${window.localStorage.getItem("token")}`
        ).then((response)=>{
           // console.log(response.data.data);
                if(response.data.code==="SUCCESS"){
                    this.setState({data:response.data.data})
                }
        })
    }


    /* 修改信息 */
    update=()=>{
        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/user/update",
           data:Qs.stringify({
                token:window.localStorage.getItem("token"),
                nickname:this.state.nickname===""?this.state.data.nickname:this.state.nickname,
                password:this.state.passwords,
                mobile:this.state.mobile===""?this.state.data.mobile:this.state.mobile,

            })
        }).then((response)=>{
            console.log(response.data.message);
            if (response.data.code==="ERROR") {
                this.setState({message:response.data.message},this.user)
            }
            if (response.data.code==="SUCCESS") {
                this.setState({up:-1,message:""},this.user)
        }
       }) 
    }
        /* 推出 */
        setdelete=()=>{
            axios.get(`http://xueba.it266.com:8081/api/token/delete?token=${window.localStorage.getItem("token")}`
            ).then((response)=>{
               // console.log(response);
                this.props.history.push('/Login')
            }).then(()=>{
               /*  window.localStorage.setItem('token',null)
                window.localStorage.removeItem("token") */
                this.value.setToken(null)
                window.localStorage.setItem("token","")

            })
        }
        verifyPwd=()=>{
            axios.get(`http://xueba.it266.com:8081/api/user/pwd?token=${window.localStorage.getItem("token")}&password=${this.state.password}`
            ).then((response)=>{
                console.log(response.data.message);
                if (response.data.code==="SUCCESS") {
                    this.setState({up:88,message:""})
                }else{
                    this.setState({message:response.data.message},this.user)
                }
            }) 
        }
        //头像
        setAvatar=()=>{
            let formData = new FormData()
            formData.append('avatar', this.state.avatar);
              axios({     
                method:"post",
                url:`http://xueba.it266.com:8081/api/upload/avatar?token=${window.localStorage.getItem("token")}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 20000,
                
            }).then((response)=>{
                console.log(response);
               // console.log(this.state.avatar);
                if (response.data.code==="SUCCESS") {
                    this.setState({up:-1,message:""},this.user)
            }
           })  
        }
    render(){
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    this.value=value
                    return(
                        <div className="Update">
                            <div className="phone">
                                <div className="img">
                                    头像：<img src={this.state.data.avatar} alt="头像" />

                                    <span className="glyphicon glyphicon-menu-right" aria-hidden="true"
                                        onClick={()=>{
                                            this.state.up===0?this.setState({up:-1,message:""}):this.setState({up:0,message:""})
                                        }}
                                    ></span>
                                        <div className={this.state.up===0?"updiv":"dis"}>
                                            <div>

                                                <input id="file" accept="image/*" type="file" onChange={(e)=>{this.setState({avatar:e.target.files[0]})}} />
                                                
                                                <button 
                                                    onClick={()=>{
                                                        
                                                        this.setAvatar()}}
                                                >提交</button>
                                            </div>
                                        </div>
                                </div>

                                <div className="nickname">
                                    昵称：<span> {this.state.data.nickname}</span>
                                <span className="glyphicon glyphicon-menu-right" aria-hidden="true"
                                    onClick={()=>{
                                       this.state.up===1?this.setState({up:-1,message:""}):this.setState({up:1,message:""})
                                }}
                                ></span>
                                    <div className={this.state.up===1?"updiv":"dis"}>
                                        <input value={this.state.nickname} onChange={(e)=>{this.setState({nickname:e.target.value})}} /><button
                                            onClick={()=>{this.update()}}
                                        >提交</button>
                                    </div>
                                </div>



                                <div className="mobile">
                                    手机号：<span> {this.state.data.mobile}</span>
                                    
                                <span className="glyphicon glyphicon-menu-right" aria-hidden="true"
                                    onClick={()=>{
                                        this.state.up===4?this.setState({up:-1,message:""}):this.setState({up:4,message:""})}}
                                ></span>
                                    <div className={this.state.up===4?"updiv":"dis"}>
                                        <input value={this.state.mobile} onChange={(e)=>{this.setState({mobile:e.target.value})}} /><button
                                            onClick={()=>{this.update()}}
                                        >提交</button>
                                    </div>
                                </div>
                                <div className="username">
                                    账户：<span> {this.state.data.username}</span>
                                </div>

                                <div className="createdAt">
                                    注册时间：<span> {this.state.data.createdAt}</span>
                                   
                                </div>
                                <div className="password">
                                    修改密码:<span className="glyphicon glyphicon-menu-right" aria-hidden="true"
                                    onClick={()=>{
                                        this.state.up===8||this.state.up===88?this.setState({up:-1,message:"",password:"",passwords:""}):this.setState({up:8,password:"",message:"",passwords:""})}}
                                ></span>
                                <div className={this.state.up===8?"updiv":"dis"}>
                                        <input value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} type="password" placeholder="原密码" /><button
                                            onClick={()=>{this.setState({message:""},this.verifyPwd)}}
                                        >提交</button>
                                        <span>{this.state.message}</span>
                                    </div>
                                    <div className={this.state.up===88?"updiv":"dis"}>
                                        <input value={this.state.passwords} onChange={(e)=>{this.setState({passwords:e.target.value})}} type="password" placeholder="新密码" /><button
                                            onClick={()=>{this.setState({message:""},this.update)}}
                                        >提交</button>
                                        <span>{this.state.message}</span>
                                    </div>
                                </div>
                            
                                <div className="themobile"
                                        onClick={()=>{
                                            this.setdelete() 
                                            
                                        }}
                                    >退出</div>
                                </div>
                        </div>
                    )}}
            </AuthContext.Consumer>   
        )}   
}
export default withRouter(Update)
