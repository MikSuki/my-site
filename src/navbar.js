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
        this.myRef = React.createRef();
        this.closeNbAndOpen = this.closeNbAndOpen.bind(this)
    }

    // navbar close
    closeNavbar() {
        this.myRef.current.click();
        return
        const flag = this.myRef.current.ariaExpanded
        console.log(flag)
        if (flag) {
            console.log('in')
            this.myRef.current.click();
        }
    }

    closeNbAndOpen(key) {
        this.closeNavbar()
        this.props.handleNavBtnClick(key)
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="navbar-collapse collapse"
                    id="collapsingNavbar">
                    <h5 className="text-white">Side Project</h5>
                    <NavbarBtnList
                        data={this.props.data}
                        handleNavBtnClick={this.closeNbAndOpen} />
                </div>
                <h1 href="# " className="navbar-brand" onClick={() => this.props.chgContextPage(0)}>HOME</h1>
                <button className="navbar-toggler ml-auto"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsingNavbar"
                    ref={this.myRef}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                &nbsp;&nbsp;&nbsp;
            </nav>
        )
    }
}

export { Navbar };