import React, {Component} from 'react';
import {Link} from 'react-router'

class Category extends Component {
    constructor() {
        super();
        this.state = {
            questionInfo: {},
            responseList: [],
            newResponse: {},
            userType: 'normal',
            editData:{},
            edit: false
        }
        this.newResponse = this.newResponse.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() {
        let qid = this.props.params.qid;
        console.log(qid);
        fetch(global.server + '/question/' + qid)
            .then(dat=>dat.json())
            .then(data=> {
                this.setState({
                    questionInfo: data,
                    editData:{
                        title: data.title,
                        content: data.content
                    }
                })
            });
        fetch(global.server + '/user/isMentor/' + localStorage.getItem("uid") + "-" + this.props.params.cid)
            .then(dat=>dat.json())
            .then(data=> {
                if (data.type == 0) {
                    //일반
                    this.setState({
                        userType: "normal"
                    })
                } else {
                    this.setState({
                        userType: "mentor"
                    })
                }
            })
        fetch(global.server + '/response/' + qid)
            .then(dat=>dat.json())
            .then(data=> {
                this.setState({
                    responseList: data
                })
            });
    }

    edit(type) {
        if(type=="submit"){
            let qid = this.props.params.qid;
            fetch(global.server + '/question/' + qid, {
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(this.state.editData)
            })
                .then(dat=>dat.json())
                .then(data=> {
                    alert('수정 완료');
                    location.reload();
                })
        }else{
            this.setState({
                edit: true
            })
        }

    }

    delete() {
        let qid = this.props.params.qid;
        fetch(global.server + '/question/' + qid, {
            method: "DELETE"
        })
            .then(dat=>dat.json())
            .then(data=> {
                alert('삭제 완료');
                history.back();
            })
    }

    newResponse() {
        fetch(global.server + '/response/' + localStorage.getItem("uid")||"11" + "-" + this.props.params.qid, {
            method: 'POST',
            body: formDataSerialize(this.state.newResponse)
        }).then(dat=>dat.json()).then(data=> {
            console.log(data);
            location.reload();
        })
    }


    render() {
        return (
            <div>
                <h2>제목: {this.state.questionInfo.title}</h2>
                <p>{this.state.questionInfo.content}</p>
                <img src={global.server + '/static/images/' + this.state.questionInfo.image}/>
                <br/>
                {(new Date(this.state.questionInfo.assess_end) > new Date() && this.state.userType == "normal")||(localStorage.getItem("admin")&&new Date(this.state.questionInfo.assess_end) > new Date()) ? (
                    <Link to={"/assess_5/q/" + this.state.questionInfo.id}>5점제 점수 매기기</Link>) : ""}
                {(new Date(this.state.questionInfo.assess_end) > new Date() && this.state.userType == "mentor")||(localStorage.getItem("admin")&&new Date(this.state.questionInfo.assess_end) > new Date()) ? (
                    <Link to={"/assess_100/" + this.state.questionInfo.id}>100점제 점수 매기기</Link>) : ""}
                {new Date(this.state.questionInfo.assess_end) > new Date() && this.state.questionInfo.User_id == localStorage.getItem("uid") ? (
                    <div>
                        <button onClick={this.edit}>수정</button>
                        <button onClick={this.delete}>삭제</button>
                    </div>) : ""}
                {this.state.edit?(
                    <div>
                        <input type="text" value={this.state.editData.title} onChange={e=> {
                            this.setState({
                                editData: Object.assign({}, this.state.editData, {
                                    title: e.target.value
                                })
                            })
                        }}/>
                        <br/>
                        <textarea value={this.state.editData.content} onChange={e=> {
                            this.setState({
                                editData: Object.assign({}, this.state.editData, {
                                    content: e.target.value
                                })
                            })
                        }}>

                        </textarea>
                        <br/>
                        <input type="file" name="image" onChange={e=> {
                            this.setState({
                                editData: Object.assign({}, this.state.editData, {
                                    image: e.target.files[0]
                                })
                            })
                        }}/>
                        <br/>
                        <button onClick={this.edit.bind(this,"submit")}>전송</button>
                    </div>
                ):""}
                <div>
                    <h4>답변</h4>
                    <ol>
                        {this.state.responseList.map((item, index)=> {
                            return (
                                <li key={index}>
                                    <p>{item.content}</p>
                                    {item.image != '' ? (
                                        <img src={global.server + '/static/images/' + item.image}/>) : ""}
                                    <br/>
                                    {new Date(item.assess_end) > new Date() && this.state.userType == "normal" ? (
                                        <Link to={"/assess_5/r/" + item.id}>5점제 점수 매기기</Link>) : ""}
                                </li>
                            )
                        })}
                    </ol>
                    {(this.state.userType == "normal"?(
                        <div>
                            <h5>새 답변</h5>
                            <textarea onChange={e=> {
                                this.setState({
                                    newResponse: Object.assign({}, this.state.newResponse, {
                                        content: e.target.value
                                    })
                                })
                            }}>

                        </textarea>
                            <br/>
                            <input type="file" name="image" onChange={e=> {
                                this.setState({
                                    newResponse: Object.assign({}, this.state.newResponse, {
                                        image: e.target.files[0]
                                    })
                                })
                            }}/>
                            <br/>
                            <button onClick={this.newResponse}>전송</button>
                        </div>
                    ):"")}

                </div>
            </div>
        );
    }
}
export default Category;
function formDataSerialize(data) {
    let form = new FormData();
    for (let key in data) {
        form.append(key, data[key]);
    }
    return form;
}