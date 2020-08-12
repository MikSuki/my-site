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
        if(PROJECT_LIST === null) return (<br />)
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
        this.twoClick = this.twoClick.bind(this)
    }

    handleClick() {
        this.myRef.current.click();
    }

    twoClick(key) {
        this.handleClick()
        this.props.handleNavBtnClick(key)
    }

    render() {
        return (
            <div className="pos-f-t">
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="bg-dark bg-transparent p-4">
                        <h5 className="text-white">Side Project</h5>
                        <NavbarBtnList
                            data={this.props.data}
                            handleNavBtnClick={this.twoClick} />
                    </div>
                </div>
                <nav className="navbar navbar-dark bg-dark bg-transparent">
                    <ul className='p-0 m-0'>
                        <h2 id='' className="navbar-brand" href="# "></h2>
                    </ul>
                    <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                        aria-expanded="false" aria-label="Toggle navigation"
                        ref={this.myRef}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </div>
        )
    }
}

export {Navbar};