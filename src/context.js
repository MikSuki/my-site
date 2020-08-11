import React from 'react';
import {data as PROJECT_LIST } from './data.js';

class ContextTitle extends React.Component {
    render() {
        return (
            <h2>
                {this.props.text}
            </h2>
        )
    }
}

class ContextRow extends React.Component {
    render() {
        const text = this.props.text.split("<br />");
        const intro = [];
        let i = 0;
        text.forEach(element => {
            intro.push(element)
            intro.push(<br key={i++} />)
        });

        return (
            <div className='row'>
                <div className='col'></div>
                <div className='col text-left'>
                    {intro}
                </div>
                <div className='col'></div>
            </div>
        )
    }
}

class ContextBtn extends React.Component {
    render() {
        return (
            <a
                className="btn btn-outline-light"
                href={this.props.ip}
                target="_blank" role="button">
                {this.props.btnName}
            </a>
        )
    }
}

class Context extends React.Component {
    render() {
        const title = this.props.title;
        const { demoIp: demoIp, githubIp: githubIp, intro: intro } = this.props.value;
        return (
            <div>
                <br />
                <ContextTitle
                    text={title} />
                <br />
                <ContextRow
                    text={intro} />
                <br /><br />
                <ContextBtn
                    ip={demoIp}
                    btnName={'DEMO'} />
                &nbsp;&nbsp;
                <ContextBtn
                    ip={githubIp}
                    btnName={'GitHub'} />
            </div>
        )
    }
}

class ContextContainer extends React.Component {
    render() {
        let context;
        // project page
        if (PROJECT_LIST[this.props.page] != null) {
            const data = PROJECT_LIST[this.props.page]
            context = (
                <Context
                    key={this.props.page}
                    title={this.props.page}
                    value={data} />
            )
        }
        // first page
        else {
            context = (
                <div>
                    <br /><br /><br /><br />
                    <h3>Portfolio</h3><br /><br /><br />
                    <a className="btn btn-outline-light w-30"
                        href='# ' role="button"
                        onClick={this.props.handleNavbarOpen}
                    >
                        view
                    </a>
                </div>
            )
        }

        return (
            <div className='container text-center'>
                {context}
            </div>
        )
    }
}

export { ContextContainer };