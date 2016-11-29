import React, {Component} from 'react';
import {Link} from 'react-router'

class Category extends Component {
    constructor() {
        super();
        this.state = {
            questionList: [],
            newQuestion: false,
            new: {}
        };
        this.new=this.new.bind(this);
    }

    componentWillMount() {
        let cid = this.props.params.cid;
        console.log(cid);
        fetch(global.server + '/question/category/' + cid)
            .then(dat=>dat.json()).then(data=> {
            this.setState({
                questionList: data
            })
        })
    }

    new(type){

        if(type=="submit"){
            fetch(global.server + '/question/' + localStorage.getItem("uid")+"-"+this.props.params.cid, {
                method: "POST",
                body: formDataSerialize(this.state.new)
            })
                .then(dat=>dat.json())
                .then(data=> {
                    this.setState({
                        newQuestion: false
                    })
                    alert('업로드 완료');
                    location.reload();
                })
        }else{
            this.setState({
                newQuestion: true
            })
        }

    }
    render() {
        return (
            <div>
                <h1>{this.props.params.name} 질문목록 <button onClick={this.new}>질문 올리기</button></h1>
                {this.state.newQuestion?(
                    <div>
                        <input type="text" onChange={e=> {
                            this.setState({
                                new: Object.assign({}, this.state.new, {
                                    title: e.target.value
                                })
                            })
                        }}/>
                        <br/>
                        <textarea onChange={e=> {
                            this.setState({
                                new: Object.assign({}, this.state.new, {
                                    content: e.target.value
                                })
                            })
                        }}>

                        </textarea>
                        <br/>
                        <input type="file" name="image" onChange={e=> {
                            this.setState({
                                new: Object.assign({}, this.state.new, {
                                    image: e.target.files[0]
                                })
                            })
                        }}/>
                        <br/>
                        <button onClick={this.new.bind(this,"submit")}>전송</button>
                    </div>
                ):""}
                <ol>
                    {this.state.questionList.map((item, index)=> {
                        return (<li key={index}><Link
                            to={"/question/" + item.id + '/' + this.props.params.cid}>{item.title}</Link></li>)
                    })}
                </ol>
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