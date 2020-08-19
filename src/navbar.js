import React from 'react';

class NavbarBtn extends React.Component {
    render() {
        return (
            <a
                className='navbar-band' href='# '
                onClick={this.props.handleNavBtnClick}>
                {this.props.name}
            </a>
        )
    }
}

class NavbarBtnList extends React.Component {
    constructor(props) {
        super(props)
        this.refs = {
            Toggle: React.createRef()
        }
    }

    render() {
        const PROJECT_LIST = this.props.data;
        const LIST = [];
        if (PROJECT_LIST === null) return (<br />)
        for (const [key, value] of Object.entries(PROJECT_LIST)) {
            LIST.push(
                <span key={key}>
                    <NavbarBtn
                        name={key}
                        handleNavBtnClick={() => this.props.handleNavBtnClick(key)} />
                &nbsp;&nbsp;&nbsp;
            </span>
            )
        }
        return LIST
    }
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = {
            Toggle: React.createRef()
        };
        this.closeNbAndOpen = this.closeNbAndOpen.bind(this)
    }

    // navbar close
    closeNavbar() {
        const element = this.myRef.Toggle.current
        if (element.ariaExpanded == 'true') {
            element.click();
        }
    }

    closeNbAndOpen(key) {
        this.closeNavbar()
        this.props.handleNavBtnClick(key)
    }

    render() {
        if (this.props.needCloseNavbar) {
            this.closeNavbar()
        }

        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="navbar-collapse collapse"
                    id="collapsingNavbar">
                    <h5 className="text-white">Side Project</h5>
                    <NavbarBtnList
                        data={this.props.data}
                        handleNavBtnClick={this.closeNbAndOpen} />
                </div>
                <div className='my-navbar-title' href="# " onClick={() => this.props.chgContextPage(0)}>HOME</div>
                <button className="navbar-toggler ml-auto bg-secondary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsingNavbar"
                    ref={this.myRef.Toggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                &nbsp;&nbsp;&nbsp;
            </nav>
        )
    }
}

export { Navbar };