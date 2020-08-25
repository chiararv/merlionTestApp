import React from 'react'

const Delivered = (props) => {
// eslint-disable-next-line no-console 

    return (
        <>
        {
            props.deliveredOrders.map( (sale, i) => (
                <tr key={`entity-${i}`}>
                    <td>{sale.id}</td>
                    <td>Merlion Techs</td>
                    <td>{sale.product.id}</td>
                    <td>fecha</td>
                </tr>

                ))
        }
        </>

    )
}

export default Delivered

