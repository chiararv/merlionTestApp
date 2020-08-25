import React from 'react'

const Shipped = (props) => {
// eslint-disable-next-line no-console 

    return (
        <div>
        {
            props.shippedOrders.map( (sale, i) => (
                <tr key={`entity-${i}`}>
                    <td>{sale.product.id}</td>
                    <td>Merlion Techs</td>
                    <td>fecha</td>
                    <td><button>entregar</button></td>
                </tr>

                ))
        }
        <div>shipped</div>
        </div>

    )
}

export default Shipped

