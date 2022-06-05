import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./my.css"

import axios from 'axios';
import Qs from 'qs';

import img2 from "./img/wx.jpg"
class My extends Component{
    state={
        data:[],
        myFavorite:[],
        mys:[],
        /* 手机 */
        color:0,
        active:0,

    }
    componentDidMount(){
        this.user()
    }
    //用户信息
    user=()=>{
        axios.get(`http://xueba.it266.com:8081/api/user/whoami?token=${window.localStorage.getItem("token")}`
        ).then((response)=>{
                if(response.data.code==="SUCCESS"){
                    this.setState({data:response.data.data})
                }else{
                    this.setState({data:[]})

                }
        })
        axios.get(`http://xueba.it266.com:8081/api/post/myFavorite?token=${window.localStorage.getItem("token")}`
        ).then((response)=>{
 
                if(response.data.code==="SUCCESS"){
                    this.setState({myFavorite:response.data.data.postDtoList})
                }else{
                    this.setState({myFavorite:[]})

                }
        })
        axios.get(`http://xueba.it266.com:8081/api/post/my?token=${window.localStorage.getItem("token")}`
        ).then((response)=>{
            /* console.log(response.data.data.postDtoList); */
                if(response.data.code==="SUCCESS"){
                    this.setState({mys:response.data.data.postDtoList})
                }else{
                    this.setState({mys:[]})

                }
        })
        


        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/user/create",
           data:Qs.stringify({
                token:window.localStorage.getItem("token"),
                nickname :"Zzzz1111",
                password :"Zzzz1111",
                username :"Zzzz1111",

            })
        }).then((response)=>{
       })

        /* axios.post(`http://xueba.it266.com:8081/api/upload/avatar?token=${window.localStorage.getItem("token")}`
        ).then((response)=>{
            console.log(response);
                    if(response.data.code==="SUCCESS"){
                }
        })  */
        

    }
    /* 推出 */
    setdelete=()=>{
        axios.get(`http://xueba.it266.com:8081/api/token/delete?token=${window.localStorage.getItem("token")}`
        ).then((response)=>{
                        this.user()
                        if(response.data.code==="SUCCESS"){
                }
        })
    }

    /* 修改信息 */
    /* update=()=>{
        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/user/update",
           data:Qs.stringify({
                token:window.localStorage.getItem("token"),
                nickname :"Zzzz1111",
                password :"Zzzz1111",
                username :"Zzzz1111",

            })
        }).then((response)=>{
            console.log(response);
       })
    } */
    render(){
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    this.value=value
                    return(
                        <div className="My">
                            <div className="phone">
                                <div className="mydata mydatao">
                                    <div className="img">
                                        <img src={this.state.data.avatar} alt="" />
                                    </div>
                                    <div className="wenzi">
                                        <div className="nickname">
                                            <span> {this.state.data.nickname}</span>
                                        </div>
                                        <div className="username">
                                            <span> {this.state.data.username}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mobile">
                                    手机号：<span> {this.state.data.mobile}</span>
                                    <span className="themobile"
                                     onClick={()=>{
                                        this.props.history.push('/Update')
                                    }}
                                    >绑定</span>
                                    
                                </div>
                                <div className="bacUpdate">
                                    <div className="update"
                                        onClick={()=>{
                                            this.props.history.push('/Update')
                                        }}
                                    >
                                        查看信息
                                    </div>
                                </div>
                                <div className="mychoose">
                                    <ul className="nav nav-tabs">
                                    <li role="presentation" className={this.state.active===0?"active":""} onClick={()=>{this.setState({active:0})}}><a>我的收藏</a></li>
                                    <li role="presentation" className={this.state.active===1?"active":""} onClick={()=>{this.setState({active:1})}}><a>我的帖子</a></li>
                                    </ul>
                                </div>
                                {/* 我的收藏 */}
                                <div className={this.state.active===0?"myFavorite":"dis"} >
                                    {(this.state.myFavorite).map((item,index)=>{
                                        return(
                                            <div key={index}>
                                                <div className="mydata">
                                                    <div className="img">
                                                        <img src={item.avatar} alt="" />
                                                    </div>
                                                    <div className="wenzi">
                                                        <div className="nickname">
                                                            <span
                                                                onClick={()=>{
                                                                    window.localStorage.setItem("id",item.post.id)
                                                                    value.setId(item.post.id)
                                                                    this.props.history.push('/Details')
                                                                }}
                                                            > {item.post.title}</span>
                                                        </div>
                                                        <div className="username">
                                                            <span> {item.nickname}</span>
                                                            <span className="lv"> LV{item.level}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                    {/* 我的帖子 */}
                                    <div className={this.state.active===1?"myFavorite":"dis"} >
                                    {(this.state.mys).map((item,index)=>{
                                        return(
                                            <div key={index}>
                                                <div className="mydata">
                                                    <div className="img">
                                                        <img src={item.avatar} alt="" />
                                                    </div>
                                                    <div className="wenzi">
                                                        <div className="nickname">
                                                            <span
                                                                onClick={()=>{
                                                                    window.localStorage.setItem("id",item.post.id)
                                                                    value.setId(item.post.id)
                                                                    this.props.history.push('/Details')
                                                                }}
                                                            > {item.post.title}</span>
                                                        </div>
                                                        <div className="username">
                                                            <span> {item.nickname}</span>
                                                            <span className="lv"> LV{item.level}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    </div>
                                <div className="rightbady">
                                    {/* 热门话题 */}
                                    <div className="topic">
                                        <div className="topicTitle">热门话题</div>
                                        <div className="topicNav">
                                            <span>教程</span>
                                            <span>公告</span>
                                            <span>笔记</span>
                                            <span>闲聊</span>
                                            <span>唠嗑</span>
                                        </div>
                                    </div>
                                    {/* 最近访客 */}
                                    <div className="visitors">
                                        <div className="visitorsTitle">最近访客</div>
                                            <div className="view">
                                                <div>
                                                    <img src="http://xueba.it266.com:8081/default/avatar/3.jpeg" alt="" />
                                                    <div>05-04 22:47</div>
                                                </div>
                                                <div>
                                                    <img src="http://xueba.it266.com:8081/default/avatar/3.jpeg" alt="" />
                                                    <div>05-04 22:47</div>
                                                </div>
                                                <div>
                                                    <img src="http://xueba.it266.com:8081/default/avatar/3.jpeg" alt="" />
                                                    <div>05-04 22:47</div>
                                                </div>
                                        </div>
                                        
                                    </div>
                                    {/* 广告 */}
                                    <div className="advertising" >
                                        <div className="visitorsTitle">广告招募哦~</div>
                                        <div className="advertis">
                                            代码库
                                        </div>
                                    </div>
                                    <div className="friend">
                                        <div className="visitorsTitle">点击图片或者QQ扫码加社区官方交流群~</div>
                                        <div className="advertis">
                                            <img src={img2} alt="" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                                
                        </div>
                    )}}
            </AuthContext.Consumer>   
        )}   
}
export default withRouter(My)
