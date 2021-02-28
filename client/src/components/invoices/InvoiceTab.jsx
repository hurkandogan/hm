import React from 'react';

function InvoiceTab(props){
    return(
        <li className="nav-item" key={ props.costType.id }>
            <a className="nav-link" id={ props.costType.id } data-toggle="pill" href={'#tab' + props.costType.id } role="tab" aria-controls={ props.costType.id }>{ props.costType.name }</a>
        </li>
    );
}

export default InvoiceTab;