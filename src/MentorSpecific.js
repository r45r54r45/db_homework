import React, {Component} from 'react';


class Category extends Component {
    constructor() {
        super();
        this.state = {
            userList: [],
            original: {}
        }
        this.superMentor=this.superMentor.bind(this);
    }

    componentWillMount(){
        fetch(global.server + '/user').then(dat=>dat.json()).then(data=> {
            this.setState({
                userList: data
            })
        })
        fetch(global.server + '/group/super/'+this.props.params.gid).then(dat=>dat.json()).then(data=> {
            console.log(data);
            this.setState({
                original: data
            })
        })
    }
    superMentor(id){
        fetch(global.server + '/group/super/'+id+'/'+this.props.params.cid,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                User_id: id,
                Mentor_group_id: this.props.params.gid,
                isSuper: 1
            })
        }).then(dat=>dat.json()).then(data=> {
            alert('설정 성공');
            history.back();
        })
    }
    render() {
        return (
            <div>
                <h1>
                   [{this.props.params.gname}] 수퍼멘토 설정
                </h1>
                <h3>원래는 {this.state.original.name}</h3>
                <p>아래에서 고르시오</p>
                <ul>
                    {this.state.userList.map((item, index)=> {
                       return  <li key={index} onClick={e=>this.superMentor(item.id)}>{item.name}</li>
                    })}
                </ul>
            </div>
        );
    }
}
export default Category;