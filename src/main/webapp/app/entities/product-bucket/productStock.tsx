import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { create } from 'domain';
import styled from 'styled-components'


const ProductStock = (props) => {
   
    const { productBucket, data, handleUpdateEntity, key } = props
    // eslint-disable-next-line no-console
    console.log('entra')
    const grid = 8;

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

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const onDragEnd = result => {
        const { source, destination, draggableId } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        if(source.droppableId === destination.droppableId) return
        const updatedProductBucket = {...productBucket}

        updatedProductBucket[source.droppableId] = updatedProductBucket[source.droppableId] - 1;
        updatedProductBucket[destination.droppableId] = updatedProductBucket[destination.droppableId] + 1;

        handleUpdateEntity(updatedProductBucket)
               // eslint-disable-next-line no-console
               console.log({productBucket, updatedProductBucket, destination, handleUpdateEntity})
    };
    
    // const arr = [...Array(productBucket.availableToSellQuantity)]


    const createArr = (category) => {
        const arr = []
        for ( let i = 0; i < productBucket[category]; i += 1){
            const product = {
                id: `product-${category}-${i}`
            }
            arr.push(product)
           }
           return arr
    }
    const categories = ['availableToSellQuantity', 'brokenQuantity', 'inChargeQuantity']

    const Container = styled.div`
        padding: 2em;
        background: rgb(235, 245, 238);
        display: flex;
        flex-direction: column;
        margin: 20px;
    `;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h4 style={{margin:'20px', fontWeight: 700, textTransform: 'capitalize'}}>{productBucket.product.name}</h4>
            <Container>
                {categories.map((category, iterator) => (
                    <Droppable droppableId={category} key={category}>
                    {(provided, snapshot) => (
                        <>
                         <div>{category}</div>                        
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                           
                            {                           
                                createArr(category).map( (i, index) => (
                                <> 
                                     
                                    <Draggable
                                        key={`${productBucket.id}${index}`}
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
                                </>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    </>
                    )}
                </Droppable>
                ))}
            </Container>

            </DragDropContext> 
    )
}

export default ProductStock


