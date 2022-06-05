import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./top.css"

import axios from 'axios';

import Sdglogo from "./img/sdglogo.png"
class Top extends Component{
    state={
        token:null,
        data:[],
        /* 手机 */
        color:0,

    }

    
    componentDidMount(){
       // this.awsgwa()
        this.value.token==null?console.log():this.getUser()
        //console.log(this.value.token.token);
            
    }
    Updation(){
        //this.setState({token:window.localStorage.getItem("token")})

    }
    getUser=()=>{
       // this.setState({token:window.localStorage.getItem("token")})

        axios.get(`http://xueba.it266.com:8081/api/user/whoami?token=${this.value.token.token}`
        ).then((response)=>{
            this.awsgwa()
            if(response.data.code==="SUCCESS"){
                    this.setState({data:response.data.data},this.awsgwa)
                }
        })

    }
    //我的
    myOnclick=()=>{
        this.props.history.push('/My')
    }
    awsgwa=()=>{
        return(
            <div>
                   
            </div>
        )
    }
    render(){
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    this.value=value
                    console.log(value.token);
                        
                   // this.value.token==null?console.log(value.token):this.getUser()
                    return(
                        <div className="Top">
                            {/* 图标引用 */}
                            <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
                            <link rel="stylesheet" href="./font-awesome-4.7.0/css/font-awesome.min.css"></link>
                            {/* Bootstrap组件引用 */}
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
	                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
	                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
                            {/* jQuery引用 */}
                            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                           {/* 移动端 */}
                           <div className="back">
                    <div className=" bg-primary topback ">
                        <span className="dog">
                            <img onClick={()=>{this.props.history.push('/')}} alt="" className="icon" src={Sdglogo}></img>
                            <span onClick={()=>{this.props.history.push('/')}}>svliy</span>
                        </span>

                        <span>
                        <span className="glyphicon glyphicon-home" aria-hidden="true">{/* 主页 */}</span>
                        <span>主页</span>
                        </span>

                        <span>
                        <span className="glyphicon glyphicon-folder-open" aria-hidden="true">{/* 文档 */}</span>
                        <span>文档</span>
                        </span>

                        
                        {value.token!==null?
                        <>
                        {this.getUser()}
                            <span className={"text-right"/* this.state.token!=null?"text-right":"dis" */}
                                onClick={()=>{this.myOnclick()}}
                                >
                                    
                                {this.state.data.nickname}
                            </span>
                            </>
                            
                            :
                            <span className={"text-right"/* this.state.token==null?"text-right":"dis" */} >
                                <span>
                                    <span className="glyphicon glyphicon-user" aria-hidden="true">{/* 我的 */}</span>
                                    <span className="my"
                                        onClick={()=>{
                                            this.props.history.push('/Login')
                                        }}
                                    >登录</span>
                                    <span  className="my">注册</span>
                                    <span  className="mys">我的</span>
                                </span>

                                <span className="my">
                                <i className="fa fa-qq"></i>
                                </span>

                                <span className="my">
                                <i className="fa fa-comments"></i>
                                </span>
                            </span>
                        }


                        
                    </div>
                    </div>
                    {/* 手机端 */}
                    <div className="phoneBack">
                        <div className=" bg-primary topback ">
                                
                            <div onClick={()=>{this.setState({color:0})
                                this.props.history.push('/')}}
                                className={this.state.color===0?"yellow":""}
                                >
                                <span className="glyphicon glyphicon-home" aria-hidden="true">{/* 主页 */}</span>
                                <div>主页</div>
                            </div>
                                
                            <div onClick={()=>{this.setState({color:1})}}
                                className={this.state.color===1?"yellow":""}
                                >
                                <span className="glyphicon glyphicon-folder-open" aria-hidden="true">{/* 文档 */}</span>
                                <div>文档</div>
                            </div>
                            <div onClick={()=>{this.setState({color:2})
                                window.localStorage.getItem("token")!=null?
                                this.props.history.push('/My'):
                                this.props.history.push('/Login') 
                            }}
                                className={this.state.color===2?"yellow":""}
                                >
                                <span className="glyphicon glyphicon-user" aria-hidden="true">{/* 我的 */}</span>
                                <div  className="mys">我的</div>
                                
                            </div>
                            <span className={this.state.token!=null?"text-right":"dis"}>
                                {this.state.data.nickname}
                            </span>
                        </div>
                    </div>
                        {this.awsgwa()}
                        </div>
                    )}}
            </AuthContext.Consumer>   
        )}   
}
export default withRouter(Top)
