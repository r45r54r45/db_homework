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
        let cid = this.props.params.cid;
        console.log(cid);
        fetch(global.server + '/question/category/' + cid)
            .then(dat=>dat.json()).then(data=> {
            this.setState({
                questionList: data
            })
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.params.name} 질문목록</h1>
                {/*<select>*/}
                    {/*<option value="1">분류순</option>*/}
                    {/*<option value="1">분류순</option>*/}
                {/*</select>*/}
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
