import React, {Component} from 'react';
import {Link} from  'react-router'

class Category extends Component {
    constructor() {
        super();
        this.state = {
            questionList: [],
            responseList: []
        }
        this.deleteQ=this.deleteQ.bind(this);
        this.deleteR=this.deleteR.bind(this);
    }
    componentWillMount(){
        fetch(global.server+"/question")
            .then(dat=>dat.json())
            .then(data=>{
                this.setState({
                    questionList: data
                })
            })
        fetch(global.server+"/response")
            .then(dat=>dat.json())
            .then(data=>{
                this.setState({
                    responseList: data
                })
            })
    }
    deleteQ(qid) {
        fetch(global.server + '/question/' + qid, {
            method: "DELETE"
        })
            .then(dat=>dat.json())
            .then(data=> {
                alert('삭제 완료');
                location.reload()
            })
    }
    deleteR(rid) {
        fetch(global.server + '/response/' + rid, {
            method: "DELETE"
        })
            .then(dat=>dat.json())
            .then(data=> {
                alert('삭제 완료');
                location.reload()
            })
    }
    render() {
        return (
            <div>
                <h1>질문 리스트</h1>
                <ul>
                    {this.state.questionList.map((item, index)=> {
                        return (<li key={index}><Link
                            to={"/question/" + item.id + '/' + item.Category_id}>{item.title}</Link><button onClick={this.deleteQ.bind(this, item.id)}>삭제</button> </li>)
                    })}
                </ul>
                <h1>답변 리스트</h1>
                <ul>
                    {this.state.responseList.map((item, index)=> {
                        return (<li key={index}>{item.content} <button onClick={this.deleteR.bind(this, item.id)}>삭제</button></li>)
                    })}
                </ul>
            </div>
        );
    }
}
export default Category;