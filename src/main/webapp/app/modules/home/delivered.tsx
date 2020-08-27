import React from 'react'

const Delivered = (props) => {
    return (
        <>
        {
            props.deliveredOrders.map( (sale, i) => (
                <tr key={`entity-${i}`}>
                    <td>{sale.id}</td>
                    <td>Merlion Techs</td>
                    <td>{sale.product.id}</td>
                </tr>

            ))
        }
        </>

    )
}

export default Delivered

