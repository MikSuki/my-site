import React from 'react';
import { ContextHome } from './context_home.js';
import { ContextDetail } from './context_detail.js';


class ContextContainer extends React.Component {
    render() {
        const PROJECT_LIST = this.props.data;
        let context;
        if (PROJECT_LIST === null) return (<br />)
        // project page
        if (this.props.contextPage != 0) {
            const data = PROJECT_LIST[this.props.contextPage]
            context = (
                <div className='container-fluid text-center'>
                    <ContextDetail
                        key={this.props.contextPage}
                        title={this.props.contextPage}
                        detailData={data} />
                </div>
            )
        }
        // home page
        else {
            context = <ContextHome
                imgGroupPage={this.props.imgGroupPage}
                data={this.props.data}
                chgContextPage={this.props.chgContextPage}
                handleScrollWindow={this.props.handleScrollWindow} />
        }

        return (
            <div>
                <br /><br />
                {context}
            </div>
        )
    }
}

export { ContextContainer };