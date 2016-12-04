import React, {Component} from 'react';


class Category extends Component {
    constructor() {
        super();
        this.state={
            question5:[],
            response5:[],
            question100:[]
        }
    }
    componentWillMount(){
        fetch(global.server+'/assess_5/statistic/question').then(dat=>dat.json()).then(data=>{
            this.setState({
                question5:data
            })
        })
        fetch(global.server+'/assess_5/statistic/response').then(dat=>dat.json()).then(data=>{
            this.setState({
                response5:data
            })
        })
        fetch(global.server+'/assess_100/statistic').then(dat=>dat.json()).then(data=>{
            this.setState({
                question100:data
            })
        })
    }
    render() {
        return (
            <div>
                <h1>5점 평가(질문)</h1>
                {this.state.question5.map((item, index)=>{
                    return (
                        <div key={index} style={{border:'1px solid black'}}>
                            <p>제목: {item.title}</p>
                            <p>평균: {item.avg}</p>
                            <p>표준편차: {item.std} </p>
                        </div>
                    )
                })}

                <h1>5점 평가(답변)</h1>
                {this.state.response5.map((item, index)=>{
                    return (
                        <div key={index} style={{border:'1px solid black'}}>
                            <p>내용: {item.content}</p>
                            <p>평균: {item.avg}</p>
                            <p>표준편차: {item.std} </p>
                        </div>
                    )
                })}
                <h1>100점 평가(질문)</h1>
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
        );
    }
}
export default Category;