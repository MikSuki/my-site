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
                className='main-img'
                src={this.props.url}
                onClick={this.props.chgPage} >
            </img>
        )
    }
}

class PageBtn extends React.Component {
    render() {
        return (
            <a
                className='main-img-pg'
                onMouseOver={() => this.props.handleScrollWindow(this.props.page)}>
            </a>
        )
    }
}

class PageGroup extends React.Component {
    render() {
        const pageBtns = []
        for (let i = 0; i < 5; ++i) {
            pageBtns.push(
                <PageBtn
                    key={i}
                    page={i}
                    handleScrollWindow={this.props.handleScrollWindow} />
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
    render() {
        const path = 'https://i.imgur.com/'
        const imgurFileName = []
        const text = []
        const extension = '.png'
        const imgs = []

        if (this.props.data == null) return (<br />)

        for (let i in this.props.data) {
            text.push(i)
            imgurFileName.push(path + this.props.data[i].imgurFileName + extension)
        }
        
        for (let i = 0; i < imgurFileName.length; ++i) {
            const div = (
                <div key={i} className='main-img-content'>
                    <Img url={imgurFileName[i]}
                        chgPage={() => this.props.chgPage(text[i])} />
                    <ImgText text={text[i]} />
                </div>)
            imgs.push(div)
        }

        return (
            <div className='img-group'>
                {imgs}
                <PageGroup
                    handleScrollWindow={this.props.handleScrollWindow} />
            </div>
        )
    }
}


class ContextHome extends React.Component {
    render() {
        return (
            <ImgGroup
                data={this.props.data}
                chgPage={this.props.chgPage}
                handleScrollWindow={this.props.handleScrollWindow} />
        )
    }
}

export { ContextHome };