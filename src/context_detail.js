import React from 'react';

class Title extends React.Component {
    render() {
        return (
            <h2>
                {this.props.text}
            </h2>
        )
    }
}

class Row extends React.Component {
    render() {
        // const text = this.props.text.split("<br />");
        if (this.props.introData != null) {
            const text = this.props.introData.split("\n");
            const intro = [];
            let i = 0;
            text.forEach(element => {
                intro.push(element)
                intro.push(<br key={i++} />)
            });

            return (
                <div className='row'>
                    <div className='col-12 col-sm-2 col-md-3 col-xl-3'></div>
                    <div className='col-12 col-sm-8 col-md-6 col-xl-6 text-left'>
                        {intro}
                    </div>
                    {/* <div className='col-12 col-md-3'></div> */}
                </div>
            )
        }
        return (
            <br />
        )
    }
}

class Btn extends React.Component {
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

class ContextDetail extends React.Component {
    render() {
        const title = this.props.title;
        const { demoIp: demoIp, githubIp: githubIp, introData: introData } = this.props.detailData;
        return (
            <div>
                <Title
                    text={title} />
                <br />
                <Row
                    introData={introData} />
                <Btn
                    ip={demoIp}
                    btnName={'DEMO'} />
                &nbsp;&nbsp;
                <Btn
                    ip={githubIp}
                    btnName={'GitHub'} />
                <br /><br /><br />
            </div>
        )
    }
}

export { ContextDetail };
