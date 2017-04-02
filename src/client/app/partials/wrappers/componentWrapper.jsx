import React from 'react';
import ReactDom from 'react-dom';

import style from './componentWrapper.scss';

export default class ComponentWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.wrapper}>
                {this.props.children}
            </div>
        )
    }
}