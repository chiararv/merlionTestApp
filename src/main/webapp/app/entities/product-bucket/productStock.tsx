import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const ProductStock = (props) => {
   
    const { entity, handleUpdateEntity} = props

    const grid = 8;
    const categories = ['availableToSellQuantity', 'brokenQuantity', 'inChargeQuantity']


    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        padding: grid ,
        margin: grid,
        width: '50px',
        height: '50px',
        borderRadius: '2px',

        background: isDragging ? 'lightgreen' : 'rgb(8, 65, 92)',

        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 'auto',
        margin: '10px 0 10px 0', 
        display: 'flex'
    });

    const onDragEnd = result => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) return
        const updatedEntity = {...entity}

        updatedEntity[source.droppableId] = updatedEntity[source.droppableId] - 1;
        updatedEntity[destination.droppableId] = updatedEntity[destination.droppableId] + 1;

        handleUpdateEntity(updatedEntity)

    };
    
    const createArr = (category) => {
        const arr = []
        for ( let i = 0; i < entity[category]; i += 1){
            const product = {
                id: `product-${category}-${i}`
            }
            arr.push(product)
           }
           return arr
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h4 style={{margin:'20px', fontWeight: 700, textTransform: 'capitalize'}}>{entity.product.name}</h4>
            <div style={{padding: '2em',background: 'rgb(235, 245, 238)', display:'flex', flexDirection: 'column', margin:'20px' }}>
                {categories.map((category) => (
                    <Droppable droppableId={category} key={category} direction="horizontal">
                    {(provided, snapshot) => (
                        <>
                         <div>{category}</div>                        
                         <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >                           
                            {                           
                                createArr(category).map( (i, index) => (                                    
                                    <Draggable
                                        key={`${entity.id}${index}`}
                                        draggableId={i.id}
                                        index={index}>
                                            
                                        {(prov, snap) => (
                                            <div
                                                ref={prov.innerRef}
                                                {...prov.draggableProps}
                                                {...prov.dragHandleProps}
                                                style={getItemStyle(
                                                    snap.isDragging,
                                                    prov.draggableProps.style
                                                )}>
                                                
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    </>
                    )}
                </Droppable>
                ))}
            </div>
        </DragDropContext> 
    )
}

export default ProductStock


