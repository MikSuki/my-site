import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const NavbarBtn = props => {
    return (
        <a
            className='navbar-band' href='# '
            onClick={props.handleNavBtnClick}>
            {props.name}
        </a>
    );
};

const NavbarBtnList = props => {
    const PROJECT_LIST = props.data;
    const LIST = [];
    if (!PROJECT_LIST) return (<br />);
    for (const [key] of Object.entries(PROJECT_LIST)) {
        LIST.push(
            <span key={key}>
                <NavbarBtn
                    name={key}
                    handleNavBtnClick={() => props.handleNavBtnClick(key)} />
                &nbsp;&nbsp;&nbsp;
            </span>
        );
    }
    return LIST;
};

const Navbar = forwardRef((props, ref) => {
    const ref_toggle = useRef(null);

    useImperativeHandle(
        ref,
        () => ({
            closeNavbar() {
                const element = ref_toggle.current;
                if (element.ariaExpanded === 'true') {
                    element.click();
                }
            }
        }),
    )

    // navbar close
    const closeNavbar = () => {
        const element = ref_toggle.current;
        if (element.ariaExpanded === 'true') {
            element.click();
        }
    }

    const closeNbAndOpen = key => {
        closeNavbar();
        props.handleNavBtnClick(key);
    }

    if (props.needCloseNavbar) {
        closeNavbar();
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="navbar-collapse collapse"
                id="collapsingNavbar">
                <h5 className="text-white">Side Project</h5>
                <NavbarBtnList
                    data={props.data}
                    handleNavBtnClick={closeNbAndOpen} />
            </div>
            <div
                className='my-navbar-title'
                href="# "
                onClick={() => { props.chgContextPage(0) }}>
                HOME
                </div>
            <button className="navbar-toggler ml-auto bg-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#collapsingNavbar"
                ref={ref_toggle}>
                <span className="navbar-toggler-icon"></span>
            </button>
                &nbsp;&nbsp;&nbsp;
        </nav>
    );
});

export { Navbar };