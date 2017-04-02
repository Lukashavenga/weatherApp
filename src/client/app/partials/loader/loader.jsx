import React from 'react';

import style from './loader.scss';

export default class Loader extends React.Component {
    static defaultProps = {

    };

    static propTypes = {
        loading: React.PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.loading ? (
            // true ? (
                <div >
                    <img className={style.image} src='public/resources/wpress_loader.gif' />
                    {/*<div className={style.text}>Loading...</div>*/}
                </div>
            ) : false
        )
    }
}