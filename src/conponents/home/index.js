import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./home.css"

import axios from 'axios';

import img2 from "./img/wx.jpg"
class Home extends Component{
    state={
        active:0,       //导航
        ranking:0,     //排行
        categoryId:0,    //导航1
        article:[],     //文章
        page:1,         //页码
        inputPage:1,   //输入页码
        thePage:0,     //文章数
        select:"",
        Selects:5,
    }
    componentDidMount(){
        this.ListPost();

    }
    /* 文章 */
    ListPost=()=>{
        axios.get(`http://xueba.it266.com:8081/api/post/list?limit=${this.state.Selects}&page=${this.state.page}&categoryId=${this.state.active}`
    ).then((response)=>{
        //console.log(response);
            if(response.data.code==="SUCCESS"){
                this.setState({article:response.data.data.postDtoList,thePage:response.data.data.postSearchDto.total})
                
            }
    })

    axios.get(`http://xueba.it266.com:8081/api/post/list?categoryId=3`
    ).then((response)=>{
            if(response.data.code==="SUCCESS"){
                
            }
    })

    }
    /* 周榜 */
    setWeek=()=>{
        axios.get(`http://xueba.it266.com:8081/api/post/week`
        ).then((response)=>{
                if(response.data.code==="SUCCESS"){
                    this.setState({article:response.data.data})
                   
                }
        })
    }
    /* 月榜 */
    setMonth=()=>{
        axios.get(`http://xueba.it266.com:8081/api/post/month`
        ).then((response)=>{
                if(response.data.code==="SUCCESS"){
                    this.setState({article:response.data.data})
                    
                }
        })
    }

    ///导航1
    handOnclick=()=>{
        axios.get(`http://xueba.it266.com:8081/api/post/list?limit=5&page=${this.state.page}&categoryId=${this.state.active}`
        ).then((response)=>{
            
                if(response.data.code==="SUCCESS"){
                this.setState({article:response.data.data.postDtoList,thePage:response.data.data.postSearchDto.total})
                }
        })
    }

    //类别
    setcategoryId=(ev)=>{
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

    onPages=()=>{
        if (this.state.page<=3) {
            return(
                <>
                <span className={this.state.page===1?"onPage":""} onClick={()=>{this.setState({page:1},this.ListPost)}}>1</span>
                <span className={this.state.page===2?"onPage":""} onClick={()=>{this.setState({page:2},this.ListPost)}}>2</span>
                <span className={this.state.page===3?"onPage":""} onClick={()=>{this.setState({page:3},this.ListPost)}}>3</span>
                <span className={this.state.page===4?"onPage":""} onClick={()=>{this.setState({page:4},this.ListPost)}}>4</span>
                <span className={this.state.page===5?"onPage":""} onClick={()=>{this.setState({page:5},this.ListPost)}}>5</span>
                </>
            )
        }else{
            if (this.state.page>=(Math.ceil(this.state.thePage/this.state.Selects)-2)) {
                return(
                    <>
                    <span  onClick={()=>{this.setState({page:Math.ceil(this.state.thePage/this.state.Selects)-4},this.ListPost)}} className={this.state.page===Math.ceil(this.state.thePage/this.state.Selects)-4?"onPage":""} >{Math.ceil(this.state.thePage/this.state.Selects)-4}</span>
                    <span  onClick={()=>{this.setState({page:Math.ceil(this.state.thePage/this.state.Selects)-3},this.ListPost)}} className={this.state.page===Math.ceil(this.state.thePage/this.state.Selects-3)?"onPage":""} >{Math.ceil(this.state.thePage/this.state.Selects)-3}</span>
                    <span  onClick={()=>{this.setState({page:Math.ceil(this.state.thePage/this.state.Selects)-2},this.ListPost)}} className={this.state.page===Math.ceil(this.state.thePage/this.state.Selects-2)?"onPage":""} >{Math.ceil(this.state.thePage/this.state.Selects)-2}</span>
                    <span  onClick={()=>{this.setState({page:Math.ceil(this.state.thePage/this.state.Selects)-1},this.ListPost)}} className={this.state.page===Math.ceil(this.state.thePage/this.state.Selects-1)?"onPage":""} >{Math.ceil(this.state.thePage/this.state.Selects)-1}</span>
                    <span  onClick={()=>{this.setState({page:Math.ceil(this.state.thePage/this.state.Selects)  },this.ListPost)}} className={this.state.page===Math.ceil(this.state.thePage/this.state.Selects)?"onPage":""} >  {Math.ceil(this.state.thePage/this.state.Selects)}</span>
                    </>
                ) 
            }else{
                return(
                    <>
                    <span  onClick={()=>{this.setState({page:this.state.page-2},this.ListPost)}}>{this.state.page-2}</span>
                    <span  onClick={()=>{this.setState({page:this.state.page-1},this.ListPost)}}>{this.state.page-1}</span>
                    <span  onClick={()=>{this.setState({page:this.state.page  },this.ListPost)}}className="onPage" >{this.state.page}</span>
                    <span  onClick={()=>{this.setState({page:this.state.page+1},this.ListPost)}}>{this.state.page+1}</span>
                    <span  onClick={()=>{this.setState({page:this.state.page+2},this.ListPost)}}>{this.state.page+2}</span>
                    </>
                )  
            }
        }

        
    }
    setSelect=()=>{
        switch (this.state.select) {
            case "每页5条":
                this.setState({Selects:5},this.ListPost)
                break;
        
            case "每页10条":
                this.setState({Selects:10},this.ListPost)
                
                break;
            case "每页15条":
                this.setState({Selects:15},this.ListPost)
                
                break;
        }
    }
    render(){
        return(
            <AuthContext.Consumer>
                {(value)=>{
                    return(
                        <div className="home">
                            <div className="reference">
                                {/* 图标引用 */}
                                <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
                                <link rel="stylesheet" href="./font-awesome-4.7.0/css/font-awesome.min.css"></link>
                                {/* Bootstrap组件引用 */}
                                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
	                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
	                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
                                {/* jQuery引用 */}
                                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                            </div>
                            {/* 第一行 */}
                            
                            {/* 第二行 */}
                            <div className="back2">
                                <div className="topnav">
                                <ul className="nav nav-tabs">
                                    <li role="presentation" className={this.state.active===0?"active":""} onClick={()=>{this.setState({page:1,active:0},this.handOnclick)}}><a href="####" >首页</a></li>
                                    <li role="presentation" className={this.state.active===1?"active":""} onClick={()=>{this.setState({page:1,active:1},this.handOnclick)}}><a href="####" >其他</a></li>
                                    <li role="presentation" className={this.state.active===2?"active":""} onClick={()=>{this.setState({page:1,active:2},this.handOnclick)}}><a href="####" >提问</a></li>
                                    <li role="presentation" className={this.state.active===3?"active":""} onClick={()=>{this.setState({page:1,active:3},this.handOnclick)}}><a href="####" >分享</a></li>
                                    <li role="presentation" className={this.state.active===4?"active":""} onClick={()=>{this.setState({page:1,active:4},this.handOnclick)}}><a href="####" >建议</a></li>
                                    <li role="presentation" className={this.state.active===5?"active":""} onClick={()=>{this.setState({page:1,active:5},this.handOnclick)}}><a href="####" >讨论</a></li>
                                    <li role="presentation" className={this.state.active===6?"active":""} onClick={()=>{this.setState({page:1,active:6},this.handOnclick)}}><a href="####" >公告</a></li>
                                    <li role="presentation" className={this.state.active===7?"active":""} onClick={()=>{this.setState({page:1,active:7},this.handOnclick)}}><a href="####" >动态</a></li>
                                <div className="search">
                                    <input placeholder="搜索帖子" />
                                    <span className="glyphicon glyphicon-search" aria-hidden="true">{/* 我的 */}</span>
                                    <button 
                                        onClick={()=>{
                                            this.props.history.push('/CreatePost')
                                        }}
                                    >发表新帖子</button>
                                </div>
                                </ul>
                                </div>
                            </div>
                            {/* 第左一行 */}
                            <div className="backbady">
                            <div className="badys">
                                <div className="leftbady">
                                    <div className="leftnav">{/* nav */}
                                        <span onClick={()=>{this.setState({ranking:0},this.ListPost())}} className={this.state.ranking===0?"ranking":""} >综合</span>|
                                        <span onClick={()=>{this.setState({ranking:1},this.setWeek())}} className={this.state.ranking===1?"ranking":""} >周榜</span>|
                                        <span onClick={()=>{this.setState({ranking:2},this.setMonth())}} className={this.state.ranking===2?"ranking":""} >月榜</span>|
                                        <span onClick={()=>{this.setState({ranking:3})}} className={this.state.ranking===3?"ranking":""} >精华</span>
                                        <div className="rightnav">
                                            <span className="">最新</span>|<span>沙发</span>
                                        </div>
                                    </div>
                                    {/* 文章 */}
                                    <div className="articles">
                                        {(this.state.article).map((item)=>{
                                            return(
                                                <div className="article" key={item.post.id} >
                                                    {/* 图片 */}
                                                    <div>
                                                        <img src={item.avatar} alt="" />
                                                    </div>
                                                    {/* 标题 */}
                                                    <div>
                                                        <div className="title">
                                                                {this.setcategoryId(item.post.categoryId)}
                                                            <strong 
                                                            onClick={()=>{
                                                                //console.log(item.post.id);
                                                                window.localStorage.setItem("id",item.post.id)
                                                                value.setId(item.post.id)
                                                                this.props.history.push('/Details')
                                                                }}>{item.post.title}</strong>
                                                        </div>
                                                        <div className="titles">
                                                            <span className="nickname">{/* 昵称 */}
                                                                {item.nickname}
                                                            </span>
                                                            <span className="level">{/* 等级 */}
                                                                LV{item.level}
                                                            </span>
                                                            <span className="asf updatedAt">{/* 更新时间 */}
                                                                {item.post.updatedAt}
                                                            </span>
                                                            <span className="asf likeCount">{/* 喜欢数 */}
                                                            <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                                                                {item.post.likeCount}
                                                            </span>
                                                            <span className="asf favoriteCount">{/* 收藏数 */}
                                                            <span className={true?"glyphicon glyphicon-star-empty":"glyphicon glyphicon-star"}aria-hidden="true"></span>
                                                                {item.post.favoriteCount}
                                                            </span>
                                                            <span className="asf viewCount">{/* 足迹 */}
                                                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                                {item.post.viewCount}
                                                            </span>
                                                            <span className="asf replyCount">{/* 回复数 */}
                                                            <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                                                                {item.post.replyCount}
                                                            </span>
                                                            <div className="asf twoUpdatedAt">{/* 更新时间 */}
                                                                {item.post.updatedAt}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            )
                                        })}                                                                                                             
                                        <div className="theBottom">
                                            {this.state.ranking!==0?"到底啦~":""}
                                        </div>
                                        <div className={this.state.ranking===0?"thePage":"dis"}>
                                            <span className="athePage">共{this.state.thePage}条</span>
                                            <span className="page glyphicon glyphicon-menu-left" onClick={()=>{this.state.page>1?this.setState({page:this.state.page-1},this.ListPost):console.log()}} aria-hidden="true"></span>
                                            <span className="pages">
                                                
                                            {this.onPages()}
                                            </span>
                                            
                                            <span className="ListPost glyphicon glyphicon-menu-right" onClick={()=>{this.state.page<Math.ceil(this.state.thePage/5)?this.setState({page:this.state.page+1},this.ListPost):console.log();}} aria-hidden="true"></span>
                                            <span className="select">
                                                <select  className="form-control"
                                                value={this.state.select}
                                                onChange={(e)=>{this.setState({select:e.target.value})}}
                                                 onClick={()=>{this.setSelect()}}
                                                >
                                                    <option>每页5条</option>
                                                    <option>每页10条</option>
                                                    <option>每页15条</option>
                                                </select>
                                            </span>
                                            <span className="thisPage">当前第{this.state.page}页 {console.log(this.state.page)} </span>
                                            <span className="inputPage" onClick={()=>{this.setState({page:this.state.inputPage},this.ListPost)}}>前往<input type="number"  value={Math.ceil(this.state.thePage/5)>=this.state.inputPage>=1?this.state.inputPage:1} onChange={(e)=>{this.setState({inputPage:e.target.value-0},this.ListPost)}} /> 页</span>
                                            <span className="thePagechu">共{Math.ceil(this.state.thePage/5)}页</span>
                                            
                                            
                                            
                                            

                                        </div>
                                    </div>




                                </div>




                                {/* 右 */}
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
                        </div>

                    )
                }}
            </AuthContext.Consumer>
        )
    }
}
export default withRouter(Home)