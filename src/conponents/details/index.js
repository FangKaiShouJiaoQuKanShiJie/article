import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./details.css"

import axios from 'axios';
import Qs from 'qs';

import img2 from "./img/wx.jpg"
class Details extends Component{
    state={
        data:[],        //文章详情
        replyList:[],   //回复详情
        replyLists:[],  //回复回复详情
        tagList:[],     //标签
        token:"",       //
        textarea:"",        //文本
        likeCount:0,        //点赞数
        favorite:0,         //收藏数
        id:0,   
        dis:-1,               //消失
        textareas:[]        //回复回复
    }
    componentDidMount(){
        this.setState({token:window.localStorage.getItem("token")})
        /* setTimeout(() => {
            console.log(this.state.token)
        }, 100); */
        this.setDetails()
    }
    one=()=>{
        return(
            <div>
                <div className="title">{/* 标题 */}
                    <strong>{this.state.data.length!==0?this.state.data.post.title:console.log()}</strong>
                </div>
                <div className="titles">{/* 标题 */}
                    <span className="categoryId">
                        {this.state.data.length!==0?this.setCategoryId(this.state.data.post.categoryId):""}
                    </span>
                    <span className="glyphicons" >
                        <span>
                            <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                            {this.state.data.length!==0?this.state.data.post.replyCount:""}
                        </span>
                        <span>
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                            {this.state.data.length!==0?this.state.data.post.viewCount:""}
                        </span>
                    </span>
                </div>
                <div className="flex">{/* 信息 */}
                    <div className="img">
                        <img src={this.state.data.length!==0?this.state.data.avatar:""} alt="" />
                    </div>
                    <div className="information">
                        <div className="introduction">
                           <span className="text-info">{this.state.data.length!==0?this.state.data.nickname:""}</span> 
                           <span>LV{this.state.data.length!==0?this.state.data.level:""}</span> 
                           <span className="text-muted">{this.state.data.length!==0?this.state.data.post.updatedAt:""}</span> 
                        </div>
                        <div className="nointroduction">
                            <span className="text-danger">点击群号免费加入社区交流群：</span>12345
                        </div>
                    </div>
                </div>
                <div className="content">{/* 内容 */}
                    {this.state.data.length!==0?this.state.data.post.content:""}
                </div>
                <div className="tagList">标签：
                    {(this.state.tagList).map((item,index)=>{
                        return(
                        
                            <span key={index}>{item.name===null?console.log():item.name}</span>
                        )
                    })}
                </div>
                <div className={"operation text-center text-primary"}>{/* 点赞 */}
                    <span
                        onClick={()=>{this.setLike()}}>
                        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                        点赞（{this.state.likeCount}）
                    </span>
                    <span
                        onClick={()=>{this.setfavorite()}}>
                        <span className={"glyphicon glyphicon-star-empty"}aria-hidden="true"></span>
                        收藏（{this.state.favorite}）
                    </span>
                </div>
                <div className="reply">
                    <textarea value={this.state.textarea} onChange={(e)=>{this.setState({textarea:e.target.value})}} />
                    <div onClick={()=>{
                        this.createdReply()
                    }}>回复</div>
                </div>
            </div>
        )
    }
    setDetails=()=>{    //文章
        axios.get(`http://xueba.it266.com:8081/api/post/view?id=${window.localStorage.getItem("id")}`
        ).then((response)=>{
            console.log(response.data.data.postDto.post);
                if(response.data.code==="SUCCESS"){
                    this.setState({data:response.data.data.postDto,
                        likeCount:response.data.data.postDto.post.likeCount,
                        tagList:response.data.data.tagList,
                        favorite:response.data.data.postDto.post.favoriteCount,
                    },this.one)
                    this.state.data.length!==0?window.localStorage.setItem("title",this.state.data.post.title):console.log()
                }
        })
        axios.get(`http://xueba.it266.com:8081/api/post/replyList?id=${window.localStorage.getItem("id")}`
        ).then((response)=>{
                if(response.data.code==="SUCCESS"){
                    this.setState({replyList:response.data.data.replyList})
                }
        })
        
    }
    setCategoryId=(ev)=>{ //类别
        switch (ev) {
            case 0:
                return
            case 1:
                return(<span className="categoryId"
                
                >其他</span>)
            case 2:
                return(<span className="categoryId"

                >提问</span>)
            case 3:
                return(<span className="categoryId"
                
                >分享</span>)
            case 4:
                return(<span className="categoryId"
                
                >建议</span>)
            case 5:
                return(<span className="categoryId"
                
                >讨论</span>)
            case 6:
                return(<span className="categoryId"
                
                >公告</span>)
            default:
                return(<span className="categoryId"
                
                >动态</span>)
        
            
        } 
    }
    /* 点赞 */
    Like=()=>{
       return (<span> {this.state.data.length!==0?this.state.data.post.likeCount:""} </span>)
    }
    setLike=()=>{
        
        /* if (window.localStorage.getItem("token")===""||window.localStorage.getItem("token")===null) {
            
        }else{ */

        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/post/like",
           data:Qs.stringify({
                token:this.state.token,
                id:window.localStorage.getItem("id")
            })
        }).then((response)=>{
                console.log(response);
                if (response.data.code==="SUCCESS") {
                this.setDetails()
            }else{
                if (response.data.message==="请登录") {
                    window.alert("请登录");
                    this.props.history.push('/Login')
                }
                console.log(response);
            }
       })
 //   }

    }
    /* 收藏 */
    setfavorite=()=>{
        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/post/favorite",
           data:Qs.stringify({
                token:this.state.token,
                id:window.localStorage.getItem("id")
            })
        }).then((response)=>{
            if (response.data.code==="SUCCESS") {
            console.log(response);
            this.setState({favorite:response.data.data.favoriteCount},this.setDetails)
        }else{
            if (response.data.message==="请登录") {
                window.alert("请登录");
                this.props.history.push('/Login')
            }
            console.log(response);
        }
            
       })
    }
    /* 回复 */
    createdReply=()=>{
            axios({     
                method:"post",
                url:"http://xueba.it266.com:8081/api/post/reply",
               data:Qs.stringify({
                    token:this.state.token,
                    id:window.localStorage.getItem("id"),
                    content:this.state.textarea,
                })
            }).then((response)=>{
                if (this.state.textarea!=="") {
                    this.setState({textarea:""},this.setDetails)
                }
                if (response.data.message==="请登录") {
                    window.alert("请登录");
                    this.props.history.push('/Login')
                }
                
        })
    }
        
    

/* 回复点赞 */
botLike=()=>{
    return (<span> {this.state.data.length!==0?this.state.data.post.likeCount:""} </span>)
 }
 setBotLike=()=>{
     axios({     
         method:"post",
         url:"http://xueba.it266.com:8081/api/post/like",
        data:Qs.stringify({
             token:this.state.token,
             id:this.state.id,
         })
     }).then((response)=>{
         this.setDetails()
         
            if (response.data.message==="请登录") {
                window.alert("请登录");
                this.props.history.push('/Login')
            }
            console.log(response);
        
    })
 }
     /* 回复回复 */
     botCreatedReply=()=>{
        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/post/reply",
           data:Qs.stringify({
                token:this.state.token,
                id:this.state.id,
                content:this.state.textareas,
            })
        }).then((response)=>{
            this.setState({textareas:"",dis:-1},this.setDetails)
            
                if (response.data.message==="请登录") {
                    window.alert("请登录");
                    this.props.history.push('/Login')
                }
                console.log(response);
            
       })

    }
    twoReplyList=()=>{
        axios.get(`http://xueba.it266.com:8081/api/post/replyList?id=${this.state.id}`
        ).then((response)=>{
                if(response.data.code==="SUCCESS"){
                    this.setState({replyLists:response.data.data},this.two)
                    
                        
                        /* (this.state.replyList).map((item,index)=>{
                            return(
                                <div key={(this.state.replyLists.replyList[index])!=undefined?this.state.replyLists.replyList[index].post.id:0}>
                                    {(this.state.replyLists.replyList[index])!=undefined?this.state.replyLists.replyList[index].nickname:console.log()}
                                    {this.state.replyLists.replyList}
                                    <span>awg</span>
                                </div>
                            )
                        }) */
                }
        })
    }


    render(){
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    this.value=value
                   // console.log(value.id);
                    return(
                        <div className="Details">
                            <div className="Detail">
                                <div className="leftbady">
                                    {this.one()}
                                    <div className="color"></div>
                                    <div className=" fenge text-center">{this.state.data.length!==0?this.state.data.post.replyCount:""}个回复</div>
                                    {(this.state.replyList).map((item,index)=>{
                                        return( 
                                            <div  key={item.post.id} className="replys">
                                                <div className="flex">
                                                    <div className="img">
                                                        <img src={item.avatar} alt="" />
                                                    </div>
                                                    <div className="information">
                                                        <div className="introduction">
                                                            <span className="text-info">{item.nickname}</span>
                                                            <span>LV{item.level}</span>
                                                            <span>{item.username===this.state.data.username?"（楼主）":""}</span>
                                                        </div>
                                                        <div  className="nointroduction">
                                                            <span className="text-muted">{item.post.createdAt}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="contentbody"
                                                onClick={()=>{
                                                    window.localStorage.setItem("id",item.post.id)
                                                    value.setId(item.post.id)
                                                    this.props.history.push('/Reply')
                                                }}
                                                >
                                                    <span>{item.post.content}</span>
                                                </div>
                                                <div className="like text-muted">
                                                    <span       /* 喜欢数 */
                                                        onClick={()=>{
                                                            this.setState({id:item.post.id},this.setBotLike)
                                                        }}
                                                    >
                                                        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                                                        {item.post.likeCount}
                                                    </span>
                                                    <span 
                                                    onClick={/* ()=>{this.setState({dis:index ,id:item.post.id},this.twoReplyList)
                                                    {console.log(this.state.textareas)}
                                                    } */()=>{
                                                        window.localStorage.setItem("id",item.post.id)
                                                        value.setId(item.post.id)
                                                        this.props.history.push('/Reply')
                                                    }
                                                    } 
                                                    className="replyCount">{/* 回复数 */}
                                                        <span className="glyphicon glyphicon-comment" aria-hidden="true"
                                                        onClick={()=>{
                                                            window.localStorage.setItem("id",item.post.id)
                                                            value.setId(item.post.id)
                                                            this.props.history.push('/Reply')
                                                        }}
                                                        ></span>
                                                        {item.post.replyCount}
                                                    </span>
                                                </div>
                                                    {/* <textarea className={this.state.dis == index?"replyreply":" dis"} value={this.state.textareas} onChange={(e)=>{this.setState({textareas:e.target.value})}} />
                                                    <button  className={this.state.dis == index?"buttom":" dis"}
                                                        onClick={()=>{this.botCreatedReply()}}
                                                    >提交</button>
                                                    <div  className={this.state.dis == index?"buttom":" dis"}>
                                                    </div> */}
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
export default withRouter(Details)
