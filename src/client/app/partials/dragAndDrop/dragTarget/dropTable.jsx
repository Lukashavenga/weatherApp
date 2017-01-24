import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import RowItem from '../dragSource/rowItem.jsx';
import ColumnItem from '../dragSource/columnItem.jsx';
import ItemTypes from '../../../util/TypeDefinition/ItemTypes.jsx';

const style = {
    width: '80%',
    height: '700px',
    margin: '0 auto',
    display: 'flex',
    border: '1px solid gray',
    backgroundColor: '#ffffff'
};

const rowStyle = {
    display: 'flex',
    width: '100%',
    flex: 1,
    marginTop: '70px',
    flexDirection: 'column',
};

const columnStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
};

//Specifies the drop target contract
const dropTableTarget = {
    //On Drop fire the callback function with the current
    //component being dragged
    drop(props,monitor,component){
        //
        if(monitor.getItem().originalIndex === undefined){
            props.onDrop(monitor.getItem(),component);
        }
    }
};

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        itemType: monitor.getItemType(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class DropTable extends Component {
    constructor(props){
        super(props);
    }

    render() {
        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const {isOver, connectDropTarget, data: entries} = this.props;

        //Hover over state styling
        const hovering = isOver ? {
            border: '2px dashed #0660a0'
        }: {};

        const rows = entries.filter((entry)=>{
            return entry.type == ItemTypes.MEASURE ? entry : false;
        });

        const columns = entries.filter((entry)=>{
            return entry.type == ItemTypes.DIMENSION  ? entry : false;
        });

        //Adjust column sizing when added
        const flex = columns.length > 0 ? 1 : 0;

        return connectDropTarget(
            <div style={
                {...style,
                 ...hovering
                }}>
                <div style={rowStyle}>
                    {rows.map((entry,index) => {
                        return (
                            <RowItem
                                key={entry.id}
                                index={index}
                                id={entry.id}
                                text={entry.text}
                                order={this.props.order}
                                findEntry={this.props.findEntry}
                            />
                        )
                    })}
                </div>

                <div style={{...columnStyle,flex}}>
                    {columns.map((entry,index) => {
                        return (
                            <ColumnItem
                                rowItems={rows}
                                key={entry.id}
                                index={index}
                                id={entry.id}
                                text={entry.text}
                                order={this.props.order}
                                findEntry={this.props.findEntry}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

DropTable.propTypes = {
    order: PropTypes.func,
    findEntry: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(
    // Drag sources and drop targets only interact
    // if they have the same string type.
    ItemTypes.DRAGGABLE,
    dropTableTarget,
    collect)(DropTable)