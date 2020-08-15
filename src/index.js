import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import './index.css';
import { Navbar } from './navbar.js';
import { ContextContainer } from './context.js';

const DATA_PATH = 'static/data/'
const MAIN_FILE = 'mySite.json'

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
            url: DATA_PATH + MAIN_FILE,
        }).done(function (data) {
            for(let key in data){
                $.ajax({
                    url: DATA_PATH + data[key]['fileName'],
                }).done(function (intro) {
                    const state_data = this.state.data
                    state_data[key]['introData'] = intro
                    this.setState({
                        data: state_data
                    })
                }.bind(this));
            }
            this.setState({
                data: data
            })

        }.bind(this));
    }

    handleNavbarOpen() {
        this.navbar.current.handleClick()
    }

    handleNavBtnClick(val) {
        if(this.page != val)
            this.setState({
                page: val
            });
    }

    render() {
        return (
            <div>
                <Navbar
                    ref={this.navbar}
                    data={this.state.data}
                    handleNavBtnClick={this.handleNavBtnClick} />
                <ContextContainer
                    page={this.state.page}
                    data={this.state.data}
                    handleNavbarOpen={this.handleNavbarOpen} />
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);


