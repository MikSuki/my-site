import React from 'react';
import { ContextHome } from './context_home';
import { ContextDetail } from './context_detail';

const ContextContainer = props => {
    const PROJECT_LIST = props.data;
    let context;
    if (PROJECT_LIST === null) return (<br />);
    // project page
    if (props.contextPage !== 0) {
        const data = PROJECT_LIST[props.contextPage];
        context = (
            <div className='container-fluid text-center'>
                <ContextDetail
                    key={props.contextPage}
                    title={props.contextPage}
                    detailData={data} />
            </div>
        );
    }
    // home page
    else {
        context = (
            <ContextHome
                imgGroupPage={props.imgGroupPage}
                data={props.data}
                chgContextPage={props.chgContextPage}
                chgImgGroupPage={props.chgImgGroupPage} />
        );
    }

    return (
        <div>
            <br /><br />
            {context}
        </div>
    );
};



export { ContextContainer };