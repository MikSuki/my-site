import React from 'react';

const Title = props => {
    return (
        <h2>
            {props.text}
        </h2>
    );
};

const RowImg = props => {
    return (
        <div className='text-center'>
            <img
                className="main-img no-border"
                src={props.src}
                alt="img not found"
            />
        </div>
    );
};

const Row = props =>  {
    if (props.introData != null) {
        const text = props.introData.split("\n");
        const intro = [];
        let i = 0;
        text.forEach(element => {
            // text
            if (element.indexOf('imgur.com') === -1) {
                intro.push(element);
            }
            // is image
            else
                intro.push(
                    <RowImg
                        key={i * - 1 - 1}
                        src={element} />
                );

            // br or line
            if (element.indexOf('●') !== -1)
                intro.push(<hr key={i++}></hr>);
            else
                intro.push(<br key={i++} />);
        });

        return (
            <div className='row'>
                <div className='col-12 col-sm-2 col-md-3 col-xl-3'></div>
                <div className='col-12 col-sm-8 col-md-6 col-xl-6 text-left'>
                    {intro}
                </div>
                {/* <div className='col-12 col-md-3'></div> */}
            </div>
        );
    }
    return (
        <br />
    );
};

const Btn = props => {
    return (
        <a
            className="btn btn-outline-light"
            href={props.ip}
            target="_blank"
            rel="noopener noreferrer"
            role="button">
            {props.btnName}
        </a>
    );
};

const ContextDetail = props => {
    const title = props.title;
    const { demoIp, githubIp, introData } = props.detailData;
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
    );
};

export { ContextDetail };
