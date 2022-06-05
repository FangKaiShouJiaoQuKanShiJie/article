import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AuthContext} from "../../app"

import "./createPost.css"

import axios from 'axios';
import Qs from 'qs';


class CreatePost extends Component{
    state={
        title:"",
        content:"",     //内容
        categoryId:"请选择",  //类别
        category:0,     //类别
        tag:"",         //标签
        status:"所有用户可见",      //状态
        statusid:1,
    }
    componentDidMount(){

    }
    handOnclicl=()=>{
        switch (this.state.categoryId) {
            case "请选择":
                this.setState({category:0})
                break;
            case "其他":
                this.setState({category:1})
                break;
            case "提问":
                this.setState({category:2})
                break;
            case "分享":
                this.setState({category:3})
                break;
            case "建议":
                this.setState({category:4})
                break;
            case "讨论":
                this.setState({category:5})
                break;
            case "公告":
                this.setState({category:6})
                break;
                default:
                this.setState({category:7})
                break;
        }
        switch (this.state.status) {
            case "所有用户可见":
                this.setState({statusid:0})
                break;
                default:
                this.setState({statusid:1})
                break;

        }
        axios({     
            method:"post",
            url:"http://xueba.it266.com:8081/api/post/create",
           data:Qs.stringify({
                token:window.localStorage.getItem("token"),
                title :this.state.title,
                content:this.state.content,
                tag:this.state.tag,
                categoryId:this.state.category,
                status:this.state.statusid,
                 
            })
        }).then((res)=>{
            if (res.data.code==="SUCCESS") {
                this.props.history.push('/')
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
                        <div className="CreatePost">
                            <div>
                                <div className="title">发表新帖</div>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="标题"
                                        value={this.state.title} onChange={(e)=>{this.setState({title:e.target.value})}} />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" rows="8"
                                        value={this.state.content} onChange={(e)=>{this.setState({content:e.target.value})}} ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="出入标签,以英文逗号分割"
                                        value={this.state.tag} onChange={(e)=>{this.setState({tag:e.target.value})}} />
                                    </div>
                                    <div className="form-group">
                                        <div>所属专栏</div>
                                        <select className="form-control"
                                            value={this.state.categoryId} onChange={(e)=>{this.setState({categoryId:e.target.value})}}
                                             >
                                            <option>请选择</option>
                                            <option>其他</option>
                                            <option>提问</option>
                                            <option>分享</option>
                                            <option>建议</option>
                                            <option>讨论</option>
                                            <option>公告</option>
                                            <option>动态</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div>阅读权限</div>
                                        <select className="form-control"
                                            value={this.state.status} onChange={(e)=>{this.setState({status:e.target.value})}}>
                                            <option>所有用户可见</option>
                                            <option>仅个人空间中可见</option>

                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-default"
                                        onClick={()=>{this.handOnclicl()}}
                                    >发布</button>
                                </form>
                            </div>
                        </div>
                    )}}
            </AuthContext.Consumer>   
        )}   
}
export default withRouter(CreatePost)
