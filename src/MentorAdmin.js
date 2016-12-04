import React, {Component} from 'react';
import {Link} from 'react-router'

class Category extends Component {
    constructor() {
        super();
        this.state={
            groupList: [],
            categoryList:[],
            newGroup:{}
        }
        this.makeGroup=this.makeGroup.bind(this);
    }
    componentWillMount(){
        fetch(global.server+'/category').then(dat=>dat.json()).then(data=>{
            this.setState({
                categoryList: data
            })
        })
        fetch(global.server+'/group').then(dat=>dat.json()).then(data=>{
            this.setState({
                groupList: data
            })
        })
    }
    makeGroup(){
        fetch(global.server+'/group',{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(this.state.newGroup)
        }).then(dat=>dat.json()).then(data=>{
            location.reload();
        })
    }
    render() {
        return (
            <div>
                <h1>멘토그룹 목록</h1>
                <ul>
                    {this.state.groupList.map((item, index)=>{
                        return <li key={index}><Link to={"/mentor/"+item.id+"/"+item.name+"/"+item.Category_id}>{item.name}</Link></li>
                    })}
                </ul>
                <h1>멘토그룹 생성</h1>
                그룹 이름: <input type="text" onChange={e=>{
                this.setState({
                    newGroup: Object.assign({},this.state.newGroup,{
                        name: e.target.value
                    })
                })
            }}/>
                <br/>
                그룹 카테고리:
                <select onChange={e=>{
                    this.setState({
                        newGroup: Object.assign({},this.state.newGroup,{
                            Category_id: e.target.value
                        })
                    })
                }}>
                    <option value={-1}>고르시오</option>
                    {this.state.categoryList.map((item, index)=>{
                        return (
                            <option value={item.id} key={index}>{item.name}</option>
                        )
                    })}
                </select>
                <br/>
                <button onClick={this.makeGroup}>그룹 생성</button>
            </div>
        );
    }
}
export default Category;