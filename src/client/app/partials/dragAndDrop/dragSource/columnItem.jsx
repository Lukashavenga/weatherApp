import React, { Component, PropTypes } from 'react';
import { DragSource,DropTarget } from 'react-dnd';
import flow from 'lodash.flow';
import ItemTypes from '../../../util/TypeDefinition/ItemTypes.jsx';

const style = {
    fontWeight: 'bolder',
    lineHeight: '70px',
    cursor: 'move',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    borderLeft: '1px solid gray',
    textTransform: 'uppercase',
    backgroundColor: '#efefef'
};

const rowStyle = {
    display: 'flex',
    flex: 1,
    height: '100%',
    flexDirection: 'column',
};

const rowItemStyle = {
    display:  'flex',
    flex:  '1',
    position:  'relative',
    fontWeight:  'bolder',
    padding:  '50px 0px 50px 25px',
    cursor:  'move',
    width:  'auto',
    bottom:  '0',
    top:  '0',
    left:  '0',
    right:  '0',
    height:  'auto',
    borderBottom:  '1px solid gray',
    textTransform:  'uppercase',
    backgroundColor:  'rgb(239, 239, 239)',
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


class ColumnItem extends Component {

    render() {
        const {
            text,
            rowItems,
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        //Hover over styling
        const dragging = isDragging ? {
            opacity: 1,
            borderTop: '2px dashed #0660a0',
            borderLeft: '2px dashed #0660a0',
            borderRight: '2px dashed #0660a0',
            borderBottom: '2px dashed #0660a0',
            backgroundColor: '#eaf4fd'
        } : {};

        return connectDragSource(connectDropTarget(
            <div style={{...style,...dragging}}>
                {text}
                <div style={rowStyle}>
                    {rowItems.map((entry,index) => {
                        return (
                            <div style={rowItemStyle} key={index}>
                                {entry.text}
                                </div>
                        )
                    })}
                </div>
            </div>
        ));
    }
}

ColumnItem.propTypes = {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    rowItems: PropTypes.array.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
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
)(ColumnItem);