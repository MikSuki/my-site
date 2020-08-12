import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import './index.css';
import { Navbar } from './navbar.js';
import { ContextContainer } from './context.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: null,
            data: null
        };
        this.navbar = React.createRef();
        this.handleNavbarOpen = this.handleNavbarOpen.bind(this);
        this.handleNavBtnClick = this.handleNavBtnClick.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "static/data/mySite.json",
        }).done(function (data) {
            this.setState({
                data: data
            })
        }.bind(this));
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
                    data={this.state.data}
                    ref={this.navbar}
                    handleNavBtnClick={this.handleNavBtnClick} />
                <ContextContainer
                    data={this.state.data}
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


