import React, {Component} from 'react';


class Category extends Component {
    constructor() {
        super();
        this.state={
        }
        this.submit=this.submit.bind(this);
    }
    componentWillMount(){

    }
    submit(){
        fetch(global.server+'/assess_100/question/'+(localStorage.getItem("uid")==null?'11':localStorage.getItem("uid"))+"-"+this.props.params.qid,{
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                main:{
                    long_response: this.q3
                },
                sub: [
                    {
                        "score":this.q1,
                        "question_num":1
                    },
                    {
                        "score":this.q2,
                        "question_num":2
                    }
                ]
            })
        }).then(dat=>dat.json()).then(data=>{
            if(data.result){
                alert('전송 완료');
                history.back();
            }
        })
    }
    render() {
        return (
            <div>
                <h1>100점제 평가</h1>
                <p>본 질문은 의미있는 질문입니까? (50점)</p>
                <input type="number" onChange={e=>this.q1=e.target.value}/>점
                <p>본 질문은 전문성 있는 질문입니까? (50점)</p>
                <input type="number" onChange={e=>this.q2=e.target.value}/>점
                <p>본 질문에 답변하세요</p>
                <textarea type="number" onChange={e=>this.q3=e.target.value}/>점
                <br/>
                <button onClick={this.submit}>제출</button>
            </div>
        );
    }
}
export default Category;