import React from 'react'

const Delivered = (props) => {
// eslint-disable-next-line no-console 

    return (
        <div>
        {
            props.deliveredOrders.map( (sale, i) => (
                <tr key={`entity-${i}`}>
                    <td>{sale.product.id}</td>
                    <td>Merlion Techs</td>
                    <td>fecha</td>
                </tr>

                ))
        }
        <div>delivered</div>
        </div>

    )
}

export default Delivered

