import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                {!(localStorage.getItem("admin") || localStorage.getItem("uid")) ? "" : (
                    <div>
                        <button id="logout_button" onClick={e=> {
                            localStorage.clear();
                            location.href = "/";
                        }}>로그아웃
                        </button>
                        <button id="home_button" onClick={e=> {
                            location.href = "/";
                        }}>홈으로
                        </button>
                    </div>
                )}
                {this.props.children}
            </div>
        );
    }
}

export default App;
