import React, {Component} from 'react';
import {Link} from 'react-router'

class Category extends Component {
    constructor() {
        super();
        this.state = {
            questionList: []
        };
    }

    componentWillMount() {
        fetch(global.server + '/question/type/1-'+window.localStorage.getItem("uid"))
            .then(dat=>dat.json()).then(data=> {
            this.setState({
                questionList: data
            })
        })
    }

    render() {
        return (
            <div>
                <h1>질문목록</h1>
                <select onChange={e=>{
                    console.log(e.target.value);
                    fetch(global.server + '/question/type/'+e.target.value+"-"+window.localStorage.getItem("uid"))
                        .then(dat=>dat.json()).then(data=> {
                        this.setState({
                            questionList: data
                        })
                    })}}>
                    <option value="1">분류 순</option>
                    <option value="2">작성시간 순</option>
                    <option value="3">평가 가능 순</option>
                    <option value="4">높은 평가점수 순</option>
                    <option value="5">낮은 평가점수 순</option>
                    <option value="6">할당된 질문 순 (해당 카테고리 멘토일 경우)</option>
                </select>
                <ol>
                    {this.state.questionList.map((item, index)=> {
                        return (<li key={index}><Link
                            to={"/question/" + item.id + '/' + item.Category_id}>{item.title}</Link></li>)
                    })}
                </ol>
            </div>
        );
    }
}
export default Category;