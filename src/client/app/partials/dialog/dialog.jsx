import React from 'react';
import ReactDOM from 'react-dom';
import ComponentWrapper from '../wrappers/componentWrapper.jsx';

import style from './dialog.scss';

export default class Dialog extends React.Component {
    static defaultProps = {
        button1: 'Confirm',
        button2: 'Cancel',
        function1: null,
        function2: null
    };

    static propTypes = {
        text: React.PropTypes.string.isRequired,
        button1: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
        button2: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
        function1: React.PropTypes.func,
        function2: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentWrapper>
                <div className={style.dialog}>
                    <div>
                        {this.props.text}
                    </div>
                    <div className={style.buttonsContainer}>
                        {this.props.button1 ? (
                            <button onClick={this.props.function1 ? () => this.props.function1():false}>
                                {this.props.button1}
                            </button>
                        ): ''}
                        {this.props.button2 ? (
                            <button onClick={this.props.function2 ? () => this.props.function2():false}>
                                {this.props.button2}
                            </button>
                            ):''}
                    </div>
                </div>
            </ComponentWrapper>
        )
    }
}
