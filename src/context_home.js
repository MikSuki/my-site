import React from 'react';

class ImgText extends React.Component {
    render() {
        return (
            <div>{this.props.text}</div>
        )
    }
}

class Img extends React.Component {
    render() {
        return (
            <img
                className='main-img padding-black'
                src={this.props.url}
                onClick={this.props.chgContextPage} >
            </img>
        )
    }
}

class PageBtn extends React.Component {
    render() {
        let className = 'main-img-pg'
        if(this.props.isActive)
            className += ' main-img-pg-active'
        return (
            <a
                className={className}
                onMouseOver={this.props.chgImgGroupPage}>
            </a>
        )
    }
}

class PageGroup extends React.Component {
    render() {
        const pageBtns = []
        pageBtns.push(
            <span key={-9999}>&nbsp;&nbsp;</span>
        )
        for (let i = 0; i < this.props.num; ++i) {
            const isActive = i === this.props.imgGroupPage ? true : false
            pageBtns.push(
                <PageBtn
                    key={i}
                    isActive={isActive}
                    chgImgGroupPage={() => this.props.chgImgGroupPage(i)} />
            )
            pageBtns.push(
                <span key={i - 100}>&nbsp;&nbsp;</span>
            )
        }
        return (
            <div className='main-img-pg-content' >
                {pageBtns}
            </div>
        )
    }
}

class ImgGroup extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidUpdate() {
        this.chgWindowPage(this.props.imgGroupPage)
    }

    chgWindowPage(i) {
        const w = window.innerWidth
        this.ref.current.scrollTo({
            left: w * i,
            behavior: "smooth"
        });
    }

    render() {
        const path = 'https://i.imgur.com/'
        const imgurFileName = []
        const text = []
        const extension = '.png'
        const imgs = []
        let dataLen = 0
        if (this.props.data == null) return (<br />)

        for (let i in this.props.data) {
            ++dataLen
            text.push(i)
            imgurFileName.push(path + this.props.data[i].imgurFileName + extension)
        }

        for (let i = 0; i < imgurFileName.length; ++i) {
            const div = (
                <div
                    key={i}
                    className='main-img-content'>
                    <Img url={imgurFileName[i]}
                        chgContextPage={() => this.props.chgContextPage(text[i])} />
                    <ImgText text={text[i]} />
                </div>)
            imgs.push(div)
        }

        return (
            <div
                ref={this.ref}
                className='img-group'>
                {imgs}
                <PageGroup
                    num={dataLen}
                    imgGroupPage={this.props.imgGroupPage}
                    chgImgGroupPage={this.props.chgImgGroupPage} />
            </div>
        )
    }
}


class ContextHome extends React.Component {
    render() {
        return (
            <ImgGroup
                imgGroupPage={this.props.imgGroupPage}
                data={this.props.data}
                chgContextPage={this.props.chgContextPage}
                chgImgGroupPage={this.props.chgImgGroupPage} />
        )
    }
}

export { ContextHome };