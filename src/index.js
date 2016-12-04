import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Login from './Login'
import Admin from './Admin'
import Main from './Main'
import Category from './Category'
import Question from './Question';
import Assess_5 from './Assess_5'
import Assess_10 from './Assess_10';
import Total from './Total'

import UserAdmin from './UserAdmin'
import QuestionAdmin from './QuestionAdmin'
import CategoryAdmin from './CategoryAdmin'
import MentorAdmin from './MentorAdmin'
import AssessAdmin from './AssessAdmin'
import UserAdminSpecific from './UserAdminSpecific';
import MentorSpecific from './MentorSpecific'
import Group from './Group'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
// global.server = 'http://localhost:3003';
global.server ='http://130.211.203.92:1234';

ReactDOM.render(
    user(),
    document.getElementById('root')
);

function user() {
    if (localStorage.getItem("admin")) {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Admin}/>
                    <Route path="admin" component={Admin}/>
                    <Route path="user">
                        <IndexRoute component={UserAdmin}/>
                        <Route path=":uid" component={UserAdminSpecific}/>
                    </Route>
                    <Route path="question">
                        <IndexRoute component={QuestionAdmin}/>
                        <Route path=":qid/:cid" component={Question}/>
                    </Route>
                    <Route path="category" component={CategoryAdmin}/>
                    <Route path="assess_5">
                        <Route path=":type/:id" component={Assess_5}/>
                    </Route>
                    <Route path="assess_100">
                        <Route path=":qid" component={Assess_10}/>
                    </Route>
                    <Route path="mentor">
                        <IndexRoute component={MentorAdmin}/>
                        <Route path=":gid/:gname/:cid" component={MentorSpecific}/>
                    </Route>
                    <Route path="assess" component={AssessAdmin}/>
                </Route>
            </Router>
        )
    } else if (localStorage.getItem("uid")) {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Main}/>
                    <Route path="main" component={Main}/>
                    <Route path="category">
                        <Route path=":cid!!!:name" component={Category}/>
                    </Route>
                    <Route path="question">
                        <Route path=":qid/:cid" component={Question}/>
                    </Route>
                    <Route path="assess_5">
                        <Route path=":type/:id" component={Assess_5}/>
                    </Route>
                    <Route path="assess_100">
                        <Route path=":qid" component={Assess_10}/>
                    </Route>
                    <Route path="group">
                        <Route path=":gid!!!:name!!!:cid" component={Group}/>
                    </Route>
                    <Route path="total" component={Total}/>

                </Route>
            </Router>
        )
    } else {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login}/>
                </Route>
            </Router>
        )
    }
}