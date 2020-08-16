import React from 'react';
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
            page: 0,
            data: null
        };
        this.navbar = React.createRef();
        this.handleNavbarClose = this.handleNavbarClose.bind(this);
        this.handleNavBtnClick = this.handleNavBtnClick.bind(this);
        this.afterGetPortfolioList = this.afterGetPortfolioList.bind(this);
        this.afterGetEachIntro = this.afterGetEachIntro.bind(this);
        this.chgPage = this.chgPage.bind(this)
    }

    componentDidMount() {
        const cb = this.afterGetPortfolioList
        $.ajax({
            url: DATA_PATH + MAIN_FILE,
        }).done(cb);
    }

    afterGetPortfolioList(data) {
        const cb = this.afterGetEachIntro
        for (let key in data) {
            $.ajax({
                url: DATA_PATH + data[key]['fileName'],
            }).done(function (data) {
                cb(key, data)
            });
        }
        this.setState({
            data: data
        })
        this.handleScrollWindow(0)
    }

    afterGetEachIntro(dateKey, data) {
        const state_data = this.state.data
        state_data[dateKey]['introData'] = data
        this.setState({
            data: state_data
        })
    }

    handleNavbarClose() {
        this.navbar.current.closeNavbar()
    }

    handleNavBtnClick(val) {
        if (this.page != val)
            this.setState({
                page: val
            });
    }

    handleScrollWindow(windowPage) {
        const w = window.innerWidth
        window.scrollTo({
            left: w * windowPage,
            behavior: "smooth"
        });
    }

    // 0-> home
    // other-> detail
    chgPage(page) {
        // if (page == 0) this.handleNavbarClose()
        this.setState({
            page: page
        })
    }

    render() {
        return (
            <div>
                <Navbar
                    ref={this.navbar}
                    data={this.state.data}
                    handleNavBtnClick={this.handleNavBtnClick}
                    chgPage={this.chgPage} />
                <ContextContainer
                    page={this.state.page}
                    data={this.state.data}
                    chgPage={this.chgPage}
                    handleNavbarClose={this.handleNavbarClose}
                    handleScrollWindow={this.handleScrollWindow} />
            </div>
        )
    }
}


export {App};