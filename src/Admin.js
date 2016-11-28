import React, {Component} from 'react';
import {Link} from 'react-router'

class App extends Component {
    render() {
        return (
            <div className="container">
                <h1> "관리자"</h1>
                <ul>
                    <li><Link to="/user">회원관리</Link></li>
                    <li><Link to="/question">질문/답변관리</Link></li>
                    <li><Link to="/category">분류관리</Link></li>
                    <li><Link to="/mentor">멘토그룹관리</Link></li>
                    <li><Link to="/assess">평가관리</Link></li>
                </ul>
            </div>
        );
    }
}

export default App;
