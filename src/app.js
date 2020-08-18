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
            imgGroupPage: 0,
            contextPage: 0,
            data: null
        };
        this.ref = {
            navbar: React.createRef(),
        }
        this.handleNavbarClose = this.handleNavbarClose.bind(this);
        this.handleNavBtnClick = this.handleNavBtnClick.bind(this);
        this.afterGetPortfolioList = this.afterGetPortfolioList.bind(this);
        this.afterGetEachIntro = this.afterGetEachIntro.bind(this);
        this.chgContextPage = this.chgContextPage.bind(this)
    }

    componentDidMount() {
        const cb = this.afterGetPortfolioList
        $.ajax({
            url: DATA_PATH + MAIN_FILE,
        }).done(cb);

        this.loop()
    }

    loop() {
        const period = 5000
        setInterval(() => {
            if (this.state.contextPage === 0 && this.state.data != null) {
                this.handleScrollWindow()
            }
        }, period)
    }

    afterGetPortfolioList(data) {
        const cb = this.afterGetEachIntro
        let totalWindowPage = 0
        for (let key in data) {
            ++totalWindowPage
            $.ajax({
                url: DATA_PATH + data[key]['fileName'],
            }).done(function (data) {
                cb(key, data)
            });
        }
        this.setState({
            data: data
        })
        this.handleScrollWindow = this.handleScrollWindow(totalWindowPage)
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
        this.ref.navbar.current.closeNavbar()
    }

    handleNavBtnClick(val) {
        if (this.contextPage != val)
            this.setState({
                contextPage: val
            });
    }

    // init after func-> afterGetPortfolioList
    handleScrollWindow(totalWindowPage) {
        return function (imgGroupPage = -1) {
            let curWindowPage = this.state.imgGroupPage
            const w = window.innerWidth
            if (imgGroupPage == -1) {
                if (++curWindowPage >= totalWindowPage)
                    curWindowPage = 0
            }
            else {
                curWindowPage = imgGroupPage
            }
            window.scrollTo({
                left: w * curWindowPage,
                behavior: "smooth"
            });
            this.setState({
                imgGroupPage: curWindowPage
            })
            // return curWindowPage
        }.bind(this)
    }

    // 0-> home
    // other-> detail
    chgContextPage(contextPage) {
        // if (contextPage == 0) this.handleNavbarClose()
        this.setState({
            contextPage: contextPage
        })
    }

    render() {
        return (
            <div>
                <Navbar
                    ref={this.ref.navbar}
                    data={this.state.data}
                    handleNavBtnClick={this.handleNavBtnClick}
                    chgContextPage={this.chgContextPage} />
                <ContextContainer
                    imgGroupPage={this.state.imgGroupPage}
                    contextPage={this.state.contextPage}
                    data={this.state.data}
                    chgContextPage={this.chgContextPage}
                    handleNavbarClose={this.handleNavbarClose}
                    handleScrollWindow={this.handleScrollWindow} />
            </div>
        )
    }
}


export { App };