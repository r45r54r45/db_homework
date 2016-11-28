import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
    constructor(){
        super();
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
        this.registerSubmit=this.registerSubmit.bind(this);
        this.state={
            loginInfo:{
                email: '',
                password:''
            },
            registerInfo:{
                name:'',
                email:'',
                nickname: '',
                password: '',
                sex: '',
                birth: ''
            },
            loginError:null,
            registerError: null,
            showRegister: false
        }
    }
    login(){
        if(this.state.loginInfo.email=='admin'&&this.state.loginInfo.password=='admin'){
            localStorage.setItem("admin","true");
            location.reload();
            return;
        }
        fetch(global.server+'/user/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state.loginInfo)
        }).then(dat=>dat.json()).then(data=>{
            if(data.err){
                this.setState({
                    loginError:data.err
                })
            }else{
                localStorage.setItem("uid",data.uid.toString());
                location.reload();
            }
        })
    }
    register(){
        this.setState({
            showRegister: true
        })
    }
    registerSubmit(){
        fetch(global.server+'/user',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state.registerInfo)
        }).then(dat=>dat.json()).then(data=>{
            if(data.err){
                this.setState({
                    registerError:data.err
                })
            }else{
                localStorage.setItem("uid",data.uid.toString());
                location.reload();
            }
        })
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div>
                    <input type="text" placeholder="이메일" onChange={e=>this.setState({loginError:null,loginInfo: Object.assign({},this.state.loginInfo,{email:e.target.value})})}/>
                </div>
                <div>
                    <input type="password" placeholder="비밀번호" onChange={e=>this.setState({loginError:null,loginInfo: Object.assign({},this.state.loginInfo,{password:e.target.value})})}/>
                </div>
                {this.state.loginError?(<h4>{this.state.loginError}</h4>):""}
                <div>
                    <button onClick={this.login}>로그인</button>
                    <button onClick={this.register}>회원가입</button>
                </div>
                {this.state.showRegister==true?(
                   <div style={{marginTop: '30px'}}>
                       <div>
                           <input type="text" placeholder="이메일" onChange={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{email:e.target.value})})}/>
                       </div>
                       <div>
                           <input type="text" placeholder="이름" onChange={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{name:e.target.value})})}/>
                       </div>
                       <div>
                           <input type="text" placeholder="비밀번호" onChange={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{password:e.target.value})})}/>
                       </div>
                       <div>
                           <input type="text" placeholder="닉네임" onChange={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{nickname:e.target.value})})}/>
                       </div>
                       <div>
                           <input type="radio" name="sex" onClick={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{sex:"male"})})}/>남자
                           <input type="radio" name="sex" onClick={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{sex:"female"})})}/>여자
                       </div>
                       <div>
                           <input type="text" placeholder="생일(예: 1994/10/09)" onChange={e=>this.setState({registerError:null,registerInfo: Object.assign({},this.state.registerInfo,{birth:new Date(e.target.value).toMysqlFormat()})})}/>
                       </div>
                       {this.state.registerError?(<h4>{this.state.registerError}</h4>):""}
                       <div>
                           <button onClick={this.registerSubmit}>회원가입하기</button>
                       </div>
                   </div>
                ):""}
            </div>
        );
    }
}
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function() {
    this.setDate(new Date().getDate()+1);
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
export default Login;
