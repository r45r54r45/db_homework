import React, {Component} from 'react';


class Category extends Component {
    constructor() {
        super();
        this.state={
            categoryList:[],
            input: null,
            open: false,
            modify:{}
        }
        this.addCate=this.addCate.bind(this);
        this.delete=this.delete.bind(this);
        this.edit=this.edit.bind(this);
        this.ed=this.ed.bind(this);
    }
    componentWillMount(){
        fetch(global.server+'/category').then(dat=>dat.json()).then(data=>{
            this.setState({
                categoryList: data
            })
        })
    }
    addCate(){
        fetch(global.server+'/category',{
            method: "POST",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({name: this.state.input})
        }).then(dat=>dat.json()).then(data=>{
            if(data.err){
                alert('같은 이름은 안대~');
            }else{
                location.reload();
            }

        })
    }
    delete(id){
        fetch(global.server+'/category',{
            method: "DELETE",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({id: id})
        }).then(dat=>dat.json()).then(data=>{
            location.reload();
        })
    }
    edit(){
        fetch(global.server+'/category/'+this.state.modify.id,{
            method: "PATCH",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({name:this.state.modify.name})
        }).then(dat=>dat.json()).then(data=>{
            location.reload();
        })
    }
    ed(id, name){
        this.setState({
            open: true,
            modify: {id: id, name: name}
        })
    }
    render() {
        return (
            <div>
                <h1>카테고리 현황</h1>
                <ul>
                    {this.state.categoryList.map((item, index)=>{
                        return (
                            <li key={index}>{item.name}  <button onClick={e=>this.ed(item.id ,item.name)}>수정</button><button onClick={e=>this.delete(item.id)}>삭제</button></li>
                        )
                    })}
                </ul>
                {this.state.open?(
                    <div>
                        <h1>수정</h1>
                        이름: <input type="text" onChange={e=> this.setState({
                        modify: Object.assign({},this.state.modify,{
                            name: e.target.value
                        })
                    })}/>
                        <br/>
                        <button onClick={this.edit}>추가하기</button>
                        </div>
                ):""}
                <h1>카테고리 추가</h1>
                <div>
                    이름: <input type="text" onChange={e=> this.setState({
                    input: e.target.value
                })}/>
                    <br/>
                    <button onClick={this.addCate}>추가하기</button>
                </div>
            </div>
        );
    }
}
export default Category;