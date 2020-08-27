import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

const Shipped = (props) => {
    const { salesList } = props

    const deliverOrder = (id) => {
        const saleEntity = salesList.find(sale => sale.id === id)
        const updatedEntity = {...saleEntity}
        updatedEntity.state = "DELIVERED"
        props.updateEntity(updatedEntity)

    }
    return (
        <>
        {
            props.shippedOrders.map( (sale, i) => (
                <tr key={`entity-${i}`}>
                    <td>{sale.id}</td>
                    <td>Merlion Techs</td>
                    <td>{sale.product.id}</td>
                    <td><button className="btn btn-primary float-right jh-create-entity" onClick={() => deliverOrder(sale.id)}>entregar</button></td>
                </tr>

            ))
        }
        </>

    )
}
const mapStateToProps = ({home}: IRootState) => ({
    salesList: home.entities,
  });
export default connect(mapStateToProps)(Shipped)

