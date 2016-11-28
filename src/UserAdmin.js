import React, {Component} from 'react';
import {Link} from 'react-router'

class Category extends Component {
    constructor() {
        super();
        this.state = {
            userList: []
        }
    }

    componentWillMount() {
        fetch(global.server + '/user')
            .then(dat=>dat.json())
            .then(data=> {
                this.setState({
                    userList: data
                })
            })
    }

    render() {
        return (
            <div>
                <h1>유저 관리</h1>
                <select onChange={e=> {
                    fetch(global.server + '/user/category/' + e.target.value)
                        .then(dat=>dat.json())
                        .then(data=> {
                            this.setState({
                                userList: data
                            })
                        })
                }}>
                    <option value="0">전체</option>
                    <option value="1">역할(멘티)</option>
                    <option value="2">역할(멘토)</option>
                    <option value="3">나이대(10대)</option>
                    <option value="4">나이대(10대 이상)</option>
                    <option value="5">남자</option>
                    <option value="6">여자</option>
                </select>
                <ol>
                    {this.state.userList.map((item, index)=> {
                        return (<li key={index} style={{margin: '10px'}}>
                            <div>
                                이름: <Link to={"/user/"+item.id}>{item.name}</Link>
                            </div>
                        </li>);
                    })}
                </ol>
            </div>
        );
    }
}
export default Category;