import React from 'react';
import ReactDOM from 'react-dom';
import DraggableContainer from '../../partials/dragAndDrop/container/draggableContainer.jsx';

export default class MainPage extends React.Component {
    render() {
        return (
            <div style={{padding: '50px'}}>
                <DraggableContainer/>
            </div>
        );
    }
}