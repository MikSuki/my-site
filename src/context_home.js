import React, { useEffect, useRef } from 'react';

const ImgText = props => {
    return (
        <div>{props.text}</div>
    );
};

const Img = props => {
    return (
        <img
            className='main-img padding-black'
            src={props.url}
            alt="img not found"
            onClick={props.chgContextPage}
        />
    );
};

const PageBtn = props => {
    let className = 'main-img-pg';
    if (props.isActive)
        className += ' main-img-pg-active';
    return (
        <a
            href='# '
            className={className}
            onMouseOver={props.chgImgGroupPage}>
        </a>
    );
};

const PageGroup = props => {
    const pageBtns = [];
    pageBtns.push(
        <span key={-9999}>&nbsp;&nbsp;</span>
    );
    for (let i = 0; i < props.num; ++i) {
        const isActive = i === props.imgGroupPage ? true : false;
        pageBtns.push(
            <PageBtn
                key={i}
                isActive={isActive}
                chgImgGroupPage={() => props.chgImgGroupPage(i)} />
        );
        pageBtns.push(
            <span key={i - 100}>&nbsp;&nbsp;</span>
        );
    }
    return (
        <div className='main-img-pg-content' >
            {pageBtns}
        </div>
    );
};

const ImgGroup = props => {
    const imgWindow = useRef(null);

    useEffect(() => {
        function chgWindowPage(i) {
            const w = window.innerWidth;
            if (imgWindow.current.scrollTo !== undefined)
                imgWindow.current.scrollTo({
                    left: w * i,
                    behavior: "smooth"
                });
            else
                imgWindow.current.scrollLeft += w;
        }

        chgWindowPage(props.imgGroupPage);
    });


    const path = 'https://i.imgur.com/';
    const imgurFileName = [];
    const text = [];
    const extension = '.png';
    const imgs = [];
    let dataLen = 0;
    if (props.data == null) return (<br />);

    for (let i in props.data) {
        ++dataLen;
        text.push(i);
        imgurFileName.push(path + props.data[i].imgurFileName + extension);
    }

    for (let i = 0; i < imgurFileName.length; ++i) {
        const div = (
            <div
                key={i}
                className='main-img-content'>
                <Img url={imgurFileName[i]}
                    chgContextPage={() => props.chgContextPage(text[i])} />
                <ImgText text={text[i]} />
            </div>
        );
        imgs.push(div);
    }

    return (
        <div
            ref={imgWindow}
            className='img-group'>
            {imgs}
            <PageGroup
                num={dataLen}
                imgGroupPage={props.imgGroupPage}
                chgImgGroupPage={props.chgImgGroupPage} />
        </div>
    );
};

const ContextHome = props => {
    return (
        <ImgGroup
            imgGroupPage={props.imgGroupPage}
            data={props.data}
            chgContextPage={props.chgContextPage}
            chgImgGroupPage={props.chgImgGroupPage} />
    );
};

export { ContextHome };