import React, {Component} from 'react';


class Assess_5 extends Component {
    constructor() {
        super();
        this.submit=this.submit.bind(this);
    }
    componentWillMount(){
        let type=this.props.params.type;
        if(type=="r"){
            this.type="response";
            this.kor="답변에 대한"
        }else{
            this.type="question";
            this.kor="질문에 대한"
        }
    }
    submit(){
        fetch(global.server+'/assess_5/'+this.type+"/"+localStorage.getItem("uid")+"-"+this.props.params.id,{
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({score: this.value})
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
                <h1>5점제 평가 ({this.kor})</h1>
                <input type="radio" name="assess_5" value="1" onClick={e=>{this.value=1}}/>1
                <input type="radio" name="assess_5" value="2"  onClick={e=>{this.value=2}}/>2
                <input type="radio" name="assess_5" value="3"  onClick={e=>{this.value=3}}/>3
                <input type="radio" name="assess_5" value="4" onClick={e=>{this.value=4}}/>4
                <input type="radio" name="assess_5" value="5" onClick={e=>{this.value=5}}/>5
                <br/>
                <button onClick={this.submit}>제출</button>
            </div>
        );
    }
}
export default Assess_5;