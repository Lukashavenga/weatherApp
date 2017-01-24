import React, { Component, PropTypes } from 'react';
import { DragSource,DropTarget } from 'react-dnd';
import flow from 'lodash.flow';
import ItemTypes from '../../../util/TypeDefinition/ItemTypes.jsx';

const style = {
    fontWeight: 'bolder',
    padding: '25px',
    cursor: 'move',
    width: 'calc(100% - 50px)',
    height: '100%',
    borderBottom: '1px solid gray',
    textTransform: 'uppercase',
    backgroundColor: '#efefef'
};

const itemSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.index
        };
    }
    ,
    endDrag(props, monitor) {
        const { id: draggedId } = props;
        const { id:  overId} = monitor.getItem();
        if (!monitor.didDrop()) {
            const { index: overIndex } = props.findEntry(overId);
            props.order(draggedId, overIndex);
        }
    }
};

const itemTarget = {
    canDrop(){
        return false
    },
    hover(props, monitor) {
        const { id: draggedId } = props;
        const { id:  overId} = monitor.getItem();
        if (draggedId !== overId) {
            const { index: overIndex } = props.findEntry(overId);
            props.order(draggedId, overIndex);
        }
    }
};


class RowItem extends Component {
    render() {
        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        //Hover over styling
        const dragging = isDragging ? {
            opacity: 1,
            backgroundColor: '#eaf4fd',
            borderTop: '2px dashed #0660a0',
            borderLeft: '2px dashed #0660a0',
            borderRight: '2px dashed #0660a0',
            borderBottom: '2px dashed #0660a0'
        } : {};

        return connectDragSource(connectDropTarget(
            <div style={{...style,...dragging}}>
                {text}
            </div>
        ));
    }
}

RowItem.propTypes = {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired
};

export default flow(
    DragSource(ItemTypes.DRAGGABLEITEM, itemSource, (connect, monitor) => ({
        isDragging: monitor.isDragging(),
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview()
    })),
    DropTarget(ItemTypes.DRAGGABLEITEM, itemTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    }))
)(RowItem);