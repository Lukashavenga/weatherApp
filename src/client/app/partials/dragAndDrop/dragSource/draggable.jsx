import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../../../util/TypeDefinition/ItemTypes.jsx';

const style = {
    cursor: 'move',
    color: '#404040',
    borderRadius: '2px',
    marginBottom: '.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#eaf4fd',
    border: '2px dashed #0660a0',
    WebkitTransition: 'all 0.6s ease-in-out',
    MozTransition: 'all 0.6s ease-in-out',
    OTransition: 'all 0.6s ease-in-out',
    transition: 'all 0.6s ease-in-out'
};

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    };
}

const draggableSource = {
    canDrag(props){
        if(props.state == 'disabled'){
            return false
        }else{
            return true
        }
    },
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
            type: props.type
        };
    }
    ,
    endDrag(props, monitor) {
        if (!monitor.didDrop()) {
            return;
        }
    }
};


class Draggable extends Component {
    render() {
        const {
            text,
            isDragging,
            connectDragSource,
            state
        } = this.props;

        const dragging = isDragging ? 
            {
                opacity: 0.3
            } 
            : {
                opacity: 1
            };

        const disabled = state == 'disabled' ? {
            opacity: 0.6,
            cursor: 'not-allowed',
            backgroundColor: '#eaeaea'
        } : {};

        return connectDragSource(
            <div style={{
                    ...style,
                    ...dragging,
                    ...disabled
                }}
                onClick={this.props.onClick}
            >
                {text}
            </div>
        );
    }
}

Draggable.propTypes = {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
};

export default DragSource(ItemTypes.DRAGGABLE, draggableSource, collect)(Draggable);