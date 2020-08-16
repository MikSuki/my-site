import React from 'react';
import { ContextHome } from './context_home.js';
import { ContextDetail } from './context_detail.js';


class ContextContainer extends React.Component {
    render() {
        const PROJECT_LIST = this.props.data;
        let context;
        if (PROJECT_LIST === null) return (<br />)
        // project page
        if (this.props.page != 0) {
            const data = PROJECT_LIST[this.props.page]
            context = (
                <div className='container-fluid text-center'>
                    <ContextDetail
                        key={this.props.page}
                        title={this.props.page}
                        detailData={data} />
                </div>
            )
        }
        // home page
        else {
            context = <ContextHome
                data={this.props.data}
                chgPage={this.props.chgPage}
                handleScrollWindow={this.props.handleScrollWindow} />
        }

        return (
            <div className='context-container'>
                {context}
            </div>
        )
    }
}

export { ContextContainer };