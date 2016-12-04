import React, {Component} from 'react';


class Category extends Component {
    constructor() {
        super();
        this.state = {
            mentorAddOpen: false,
            allocateOpen: false,
            userList: [],
            mentorList: [],
            questionList:[],
            question5:[],
            response5:[],
            question100:[]
        }
        this.addMentor = this.addMentor.bind(this);
        this.allocate = this.allocate.bind(this);
        this.allocateQuestion=this.allocateQuestion.bind(this);
        this.delete=this.delete.bind(this);
    }

    componentWillMount() {
        fetch(global.server + '/user').then(dat=>dat.json()).then(data=> {
            this.setState({
                userList: data
            })
        })
        fetch(global.server + '/group/all/' + this.props.params.gid).then(dat=>dat.json()).then(data=> {
            this.setState({
                mentorList: data
            })
        })
        fetch(global.server + '/question/category/' + this.props.params.cid).then(dat=>dat.json()).then(data=> {
            this.setState({
                questionList: data
            })
        })


        fetch(global.server+'/assess_5/statistic/question/'+ this.props.params.cid).then(dat=>dat.json()).then(data=>{
            this.setState({
                question5:data
            })
        })
        fetch(global.server+'/assess_5/statistic/response/'+ this.props.params.cid).then(dat=>dat.json()).then(data=>{
            this.setState({
                response5:data
            })
        })
        fetch(global.server+'/assess_100/statistic/'+ this.props.params.cid).then(dat=>dat.json()).then(data=>{
            this.setState({
                question100:data
            })
        })
    }

    addMentor(uid) {
        fetch(global.server + '/group/add/' + this.props.params.gid + "/" + uid + "/" + this.props.params.cid).then(dat=>dat.json()).then(Data=> {
            location.reload();
        })
    }

    allocate(id, name) {
        this.setState({
            allocateOpen: true
        })
        this.name=name;
        this.id=id;
    }
    allocateQuestion(){
        fetch(global.server + '/assign',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Question_id: this.allocatedQid,
                User_id: this.id
            })
        }).then(dat=>dat.json()).then(Data=> {
            alert('할당 완료');
            location.reload();
        })
    }
    delete(uid){
        fetch(global.server + '/group/'+this.props.params.gid+"/"+uid,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                User_id: this.id
            })
        }).then(dat=>dat.json()).then(Data=> {
            alert('제거 완료');
            location.reload();
        })
    }
    render() {
        return (
            <div>
                <h1>{this.props.params.name} 관리</h1>
                <h2>
                    <button onClick={e=> {
                        this.setState({
                            mentorAddOpen: true
                        })
                    }}>멘토들 추가
                    </button>
                </h2>
                {this.state.mentorAddOpen ? (
                    <div>
                        <h3>멘토리스트 추가하려면 클릭</h3>
                        <ul>
                            {this.state.userList.map((item, index)=> {
                                return <li key={index} onClick={e=>this.addMentor(item.id)}>{item.name}</li>
                            })}
                        </ul>
                    </div>
                ) : ""}
                <h2>소속 멘토 리스트</h2>
                <ul>
                    {this.state.mentorList.map((item, index)=> {
                        return <li key={index}>
                            <div>
                                이름: {item.name}<br/>
                                <button  onClick={e=>this.delete(item.id)}>멘토 삭제</button>
                                 <button  onClick={e=>this.allocate(item.id, item.name)}>질문 할당</button>
                            </div>
                        </li>
                    })}
                </ul>
                {(this.state.allocateOpen?(
                    <div>
                        <h3>[{this.name}]에게 질문 할당</h3>
                        <select onChange={e=>this.allocatedQid=e.target.value}>
                            <option>선택</option>
                            {this.state.questionList.map((item, index)=>{
                                return <option key={index} value={item.id}>{item.title}</option>
                            })}
                        </select><br/>
                        <button onClick={this.allocateQuestion}>할당 하기</button>
                    </div>
                ):"")}
                <div>
                    <h2>평가 관리</h2>
                    <h3>5점 평가(질문)</h3>
                    {this.state.question5.map((item, index)=>{
                        return (
                            <div key={index} style={{border:'1px solid black'}}>
                                <p>제목: {item.title}</p>
                                <p>평균: {item.avg}</p>
                                <p>표준편차: {item.std} </p>
                            </div>
                        )
                    })}

                    <h3>5점 평가(답변)</h3>
                    {this.state.response5.map((item, index)=>{
                        return (
                            <div key={index} style={{border:'1px solid black'}}>
                                <p>내용: {item.content}</p>
                                <p>평균: {item.avg}</p>
                                <p>표준편차: {item.std} </p>
                            </div>
                        )
                    })}
                    <h3>100점 평가(질문)</h3>
                    {this.state.question100.map((item, index)=>{
                        return (
                            <div key={index} style={{border:'1px solid black'}}>
                                <h3>질문 제목: {item.title}</h3>
                                <p>질문1: {item.aq1}</p>
                                <p>질문2: {item.aq2}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
export default Category;