import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Navbar } from './navbar.js';
import { ContextContainer } from './context.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: null
        };
        this.navbar = React.createRef();
        this.handleNavbarOpen = this.handleNavbarOpen.bind(this);
        this.handleNavBtnClick = this.handleNavBtnClick.bind(this);
    }

    handleNavbarOpen() {
        this.navbar.current.handleClick()
    }

    handleNavBtnClick(val) {
        this.setState({
            page: val
        });
    }

    render() {
        return (
            <div>
                <Navbar
                    ref={this.navbar}
                    handleNavBtnClick={this.handleNavBtnClick} />
                <ContextContainer
                    page={this.state.page}
                    handleNavbarOpen={this.handleNavbarOpen} />
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);


