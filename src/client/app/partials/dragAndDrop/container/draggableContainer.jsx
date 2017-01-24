import React, { Component } from 'react';
import update from 'react/lib/update';
import Draggable from '../dragSource/draggable.jsx';
import DropTable from '../dragTarget/dropTable.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../../../util/TypeDefinition/ItemTypes.jsx';

const style = {
    width: 250
};

class Container extends Component {
    constructor(props) {
        super(props);

        this.reOrder = this.reOrder.bind(this);
        this.findEntry = this.findEntry.bind(this);
        this.moveDraggable = this.moveDraggable.bind(this);

        //Data Object
        this.state = {
            measures: [{
                id: 'mes-1',
                state: ItemTypes.AVAILABLE,
                text: 'Measure 1'
            }, {
                id: 'mes-2',
                state: ItemTypes.AVAILABLE,
                text: 'Measure 2'
            }, {
                id: 'mes-3',
                state: ItemTypes.AVAILABLE,
                text: 'Measure 3'
            }, {
                id: 'mes-4',
                state: ItemTypes.AVAILABLE,
                text: 'Measure 4'
            }, {
                id: 'mes-5',
                state: ItemTypes.AVAILABLE,
                text: 'Measure 5'
            }, {
                id: 'mes-6',
                state: ItemTypes.AVAILABLE,
                text: 'Measure 6'
            }],
            dimensions:[{
                id: 'dim-1',
                state: ItemTypes.AVAILABLE,
                text: 'Dimension 1'
            }, {
                id: 'dim-2',
                state: ItemTypes.AVAILABLE,
                text: 'Dimension 2'
            }, {
                id: 'dim-3',
                state: ItemTypes.AVAILABLE,
                text: 'Dimension 3'
            }, {
                id: 'dim-4',
                state: ItemTypes.AVAILABLE,
                text: 'Dimension 4'
            }, {
                id: 'dim-5',
                state: ItemTypes.AVAILABLE,
                text: 'Dimension 5'
            }, {
                id: 'dim-6',
                state: ItemTypes.AVAILABLE,
                text: 'Dimension 6'
            }],
            table:[]
        };
    }

    //Moving a Item from its list to the table
    moveItem(entry,index,type){
        this.setState(update(this.state, {
            [type]:{
                $apply: (data)=> {
                    data[index].state = ItemTypes.DISABLED;
                    return data
                }
            },
            table: {
                $push: [entry]
            }
        }));
    }

    //On Draggable Measure or Dimension dropped
    moveDraggable(item) {
        const {measures,dimensions} = this.state;
        let entry;

        if(item.type == ItemTypes.MEASURE){
            entry = measures[item.index];
        }else if(item.type == ItemTypes.DIMENSION){
            entry = dimensions[item.index];
        }

        this.moveItem({...entry,type:item.type},item.index,item.type);
    }

    //Re Order by dropped index location
    reOrder(id, atIndex){
        const {entry, index} = this.findEntry(id);
        this.setState(update(this.state, {
            table: {
                $splice: [
                    [index,1],
                    [atIndex, 0, entry]
                ]
            }
        }))
    }

    //Return object based on ID lookup
    findEntry(id){
        const entries = this.state.table;
        const entry = entries.filter(x => x.id === id)[0];
        return {
            entry,
            index: entries.indexOf(entry)
        }
    }

    render() {
        const measures = this.state.measures;
        const dimensions = this.state.dimensions;
        return (
            <div style={{
                display: 'flex'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={style}>
                        {measures.map((measure, i) => {
                            return (
                                <Draggable key={measure.id}
                                       index={i}
                                       type={ItemTypes.MEASURE}
                                       id={measure.id}
                                       state={measure.state}
                                       text={measure.text}
                                       items={measure.items}
                                       onClick={() =>
                                           this.moveItem({...measure,type:ItemTypes.MEASURE},i,ItemTypes.MEASURE)}
                                />
                            );
                        })}
                    </div>

                    <br/>
                    <br/>

                    <div style={style}>
                        {dimensions.map((dimension, i) => {
                            return (
                                <Draggable key={dimension.id}
                                           index={i}
                                           type={ItemTypes.DIMENSION}
                                           id={dimension.id}
                                           state={dimension.state}
                                           text={dimension.text}
                                           onClick={() =>
                                               this.moveItem({...dimension,type:ItemTypes.DIMENSION},i,ItemTypes.DIMENSION)}
                                />
                            );
                        })}
                    </div>
                </div>

                <DropTable
                    data={this.state.table}
                    onDrop={(item,component)=> this.moveDraggable(item,component)}
                    order={this.reOrder}
                    findEntry={this.findEntry}
                />
            </div>
        );
    }
}
export default DragDropContext(HTML5Backend)(Container)