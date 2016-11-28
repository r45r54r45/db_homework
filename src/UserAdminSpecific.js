import React, {Component} from 'react';


class Category extends Component {
    constructor() {
        super();
        this.state={
            basic:{},
            integrate:{},
            registerInfo:{},
            editBasic: false,
            registerError: null
        }
        this.edit=this.edit.bind(this);
        this.delete=this.delete.bind(this);
    }
    componentWillMount(){
        fetch(global.server+"/user/"+this.props.params.uid)
            .then(dat=>dat.json())
            .then(data=>{
                this.setState({
                    basic: data
                })
            })
        fetch(global.server+"/user/specific/"+this.props.params.uid)
            .then(dat=>dat.json())
            .then(data=>{
                this.setState({
                    integrate: data
                })
            })
    }

    edit(type) {
        if (type != "submit") {
            fetch(global.server + '/user/' + this.props.params.uid, {
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
            delete this.state.registerInfo.id;
            delete this.state.registerInfo.created_at;
            delete this.state.registerInfo.updated_at;
            delete this.state.registerInfo.birth;
            fetch(global.server + '/user/' + this.props.params.uid, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.state.registerInfo)
            }).then(dat=>dat.json()).then(function (data) {
                alert('수정완료');
                location.reload();
            }.bind(this))
        }
    }

    delete() {
        fetch(global.server + '/user/' + this.props.params.uid, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(dat=>dat.json()).then(function (data) {
            alert('삭제완료');
            history.back();
        })
    }
    render() {
        return (
            <div>
                <h1>유저 정보</h1>
                <h3>기본 정보</h3>
                <div>
                    이메일: {this.state.basic.email}
                </div>
                <div>
                    이름: {this.state.basic.name}
                </div>
                <div>
                    닉네임: {this.state.basic.nickname}
                </div>
                <div>
                    성별: {this.state.basic.sex}
                </div>
                <div>
                    생일: {this.state.basic.birth}
                </div>
                <h3>추가 정보</h3>
                <div>
                    질문 횟수: {this.state.integrate.question_count}
                </div>
                <div>
                    답변 횟수: {this.state.integrate.response_count}
                </div>
                <div>
                    일반 평가 횟수: {this.state.integrate.assess_5_count}
                </div>
                <div>
                    멘토 평가 횟수: {this.state.integrate.assess_100_count}
                </div>
                <div>
                    5점 평가 점수 평균: {this.state.integrate.avg_score_5}
                </div>
                <div>
                    5점 평가 점수 표준편차: {this.state.integrate.std_score_5}
                </div>
                <div>
                    100점 평가 점수 평균: {this.state.integrate.avg_score_100}
                </div>
                <div>
                    100점 평가 점수 표준편차: {this.state.integrate.std_score_100}
                </div>
                <h1><button onClick={this.edit}>수정 </button><button onClick={this.delete}> 삭제 </button></h1>
                <br/>
                <div>
                    {this.state.editBasic == true ? (
                        <div style={{marginTop: '30px'}}>
                            <h3>수정</h3>
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
                                <input type="radio" name="sex" onClick={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{sex:"male"})})}/>남자
                                <input type="radio" name="sex" onClick={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{sex:"female"})})}/>여자
                            </div>
                            <div>
                                <button onClick={this.edit.bind(this, 'submit')}>수정하기</button>
                            </div>
                        </div>
                    ) : ""}
                </div>
            </div>
        );
    }
}
export default Category;