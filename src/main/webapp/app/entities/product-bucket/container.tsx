import React, { useState, useEffect } from 'react';
import ProductStock from './productStock';
import { updateEntity } from '../product/product.reducer';


const Container = (props) => {
    
    const { id, entity, update } = props;


    const availableIds = []
    for ( let i = entity.availableToSellQuantity; i > 0; i--){
     const productId= `product-${i}`
     availableIds.push(productId)
    }
    const inChargeIds = []
    for ( let i = entity.inChargeQuantity; i > 0; i--){
     const productId= `product-${i}`
     inChargeIds.push(productId)
    }
    const brokenIds = []
    for ( let i = entity.brokenQuantity; i > 0; i--){
     const productId= `product-${i}`
     brokenIds.push(productId)
    }

    const initialData = {
        products: {
            'product-1': {id:'product-1', content: '' }
        },
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Available To Sell Quantity',
                itemsIds: availableIds
            },
            'column-2': {
                id: 'column-2',
                title: 'In Charge Quantity',
                itemsIds: inChargeIds
            },
            'column-3': {
                id: 'column-3',
                title: 'Broken Quantity',
                itemsIds: brokenIds
            },
        },
        columnOrder: ['column-1', 'column-2', 'column-3']
      }
    
    const [data, setData] = useState(initialData)

    return (
        <div>
            {
            entity &&
            <ProductStock
              key={entity.id}
              productBucket={entity}
              data={data}
              handleUpdateEntity={update}
            />
            }
        </div>
    )
}

export default Container
