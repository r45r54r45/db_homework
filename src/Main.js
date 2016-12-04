import React, {Component} from 'react';
import {Link} from 'react-router'
class Main extends Component {
    constructor() {
        super();
        this.state = {
            editBasic: false,
            registerInfo: {},
            categoryList:[],
            groupList:[],
            allocatedList:[],
            groupList2:[]
        }
        this.editBasic = this.editBasic.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentWillMount() {
        fetch(global.server + '/question/category').then(dat=>dat.json()).then(data=>{
            this.setState({
                categoryList: data
            })
        })
        fetch(global.server + '/group/'+localStorage.getItem("uid")).then(dat=>dat.json()).then(data=>{
            this.setState({
                groupList: data
            })
        })
        fetch(global.server + '/assign/'+localStorage.getItem("uid")).then(dat=>dat.json()).then(data=>{
            this.setState({
                allocatedList: data
            })
        })
        fetch(global.server + '/group/belong/'+localStorage.getItem("uid")).then(dat=>dat.json()).then(data=>{
            this.setState({
                groupList2: data
            })
        })
    }

    editBasic(type) {
        if (type != "submit") {
            fetch(global.server + '/user/' + localStorage.getItem("uid"), {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(dat=>dat.json()).then(function (data) {
                this.setState({
                    registerInfo: data
                })
            }.bind(this))
            this.setState({
                editBasic: true
            })
        } else {
            fetch(global.server + '/user/' + localStorage.getItem("uid"), {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.state.registerInfo)
            }).then(dat=>dat.json()).then(function (data) {
                alert('수정완료');
                this.setState({
                    editBasic: false
                })
            }.bind(this))
        }
    }

    deleteUser() {
        fetch(global.server + '/user/' + localStorage.getItem("uid"), {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(dat=>dat.json()).then(function (data) {
            alert('탈퇴완료');
            localStorage.clear();
            location.reload();
        })
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.editBasic.bind(this, "open")}>기본정보 수정</button>
                    <button onClick={this.deleteUser}>회원 탈퇴</button>
                    {this.state.editBasic == true ? (
                        <div style={{marginTop: '30px'}}>
                            <div>
                                <input type="text" placeholder="이메일" value={this.state.registerInfo.email}
                                       onChange={e=>this.setState({
                                           registerError: null,
                                           registerInfo: Object.assign({}, this.state.registerInfo, {email: e.target.value})
                                       })}/>
                            </div>
                            <div>
                                <input type="text" placeholder="이름" value={this.state.registerInfo.name}
                                       onChange={e=>this.setState({
                                           registerError: null,
                                           registerInfo: Object.assign({}, this.state.registerInfo, {name: e.target.value})
                                       })}/>
                            </div>
                            <div>
                                <input type="text" placeholder="비밀번호" value={this.state.registerInfo.password}
                                       onChange={e=>this.setState({
                                           registerError: null,
                                           registerInfo: Object.assign({}, this.state.registerInfo, {password: e.target.value})
                                       })}/>
                            </div>
                            <div>
                                <input type="text" placeholder="닉네임" value={this.state.registerInfo.nickname}
                                       onChange={e=>this.setState({
                                           registerError: null,
                                           registerInfo: Object.assign({}, this.state.registerInfo, {nickname: e.target.value})
                                       })}/>
                            </div>
                            <div>
                                <input type="text" placeholder="성별" value={this.state.registerInfo.sex}
                                       onChange={e=>this.setState({
                                           registerError: null,
                                           registerInfo: Object.assign({}, this.state.registerInfo, {sex: e.target.value})
                                       })}/>
                            </div>
                            <div>
                                <input type="text" placeholder="생일(예: 1994/10/09)" value={this.state.registerInfo.birth}
                                       onChange={e=>this.setState({
                                           registerError: null,
                                           registerInfo: Object.assign({}, this.state.registerInfo, {birth: new Date(e.target.value).toMysqlFormat()})
                                       })}/>
                            </div>
                            <div>
                                <button onClick={this.editBasic.bind(this, 'submit')}>수정하기</button>
                            </div>
                        </div>
                    ) : ""}
                </div>
                <div>
                    <h1>질문하거나 답변하려면 분류를 선택하시오</h1>
                    <ul>
                        <li><Link to="/total">전체 질문</Link></li>
                        {this.state.categoryList.map((item, index)=> {
                            return (<li key={index}><Link to={"/category/"+item.id+"!!!"+item.name}>{item.name}</Link></li>)
                        })}
                    </ul>
                </div>
                <div>
                    <h1>내가 슈퍼멘토로 있는 멘토그룹 관리</h1>
                    <ul>
                        {this.state.groupList.map((item, index)=> {
                            return (<li key={index}><Link to={"/group/"+item.id+"!!!"+item.name+"!!!"+item.cid}>{item.name}</Link></li>)
                        })}
                    </ul>
                </div>
                <div>
                    <h1>내가 소속된 멘토그룹과 공지사항</h1>
                    <ul>
                        {this.state.groupList2.map((item, index)=> {
                            return (<li key={index}>{item.name} [{item.content}] </li>)
                        })}
                    </ul>
                </div>
                <div>
                    <h1>나에게 할당된 질문들</h1>
                    <ul>
                        {this.state.allocatedList.map((item, index)=> {
                            return (<li key={index}><Link to={"/question/"+item.Question_id+"/"+item.Category_id}>{item.title}</Link></li>)
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function () {
    this.setDate(new Date().getDate() + 1);
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
export default Main;
