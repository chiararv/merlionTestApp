import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { updateEntity } from './home.reducer';

const Orders = (props) => {
// eslint-disable-next-line no-console 
// console.log(props.orders)

const { entity, salesList } = props

const shipOrder = (id) => {
    const saleEntity = salesList.find(sale => sale.id === id)
    const updatedEntity = {...saleEntity}
    updatedEntity.state = "SHIPPED"
    props.updateEntity(updatedEntity)

}


    return (
        <div>
        {
            props.orders.map( (sale, i) => (
                <tr key={`entity-${i}`}>
                    <td>{sale.product.id}</td>
                    <td>Merlion Techs</td>
                    <td>fecha</td>
                    <td>{sale.product.name}</td>
                    <td><button onClick={() => shipOrder(sale.id)}>enviar</button></td>
                </tr>

                ))
        }
        <div>orders</div>
        </div>

    )
}
const mapStateToProps = ({home}: IRootState) => ({
    entity: home.entity,
    salesList: home.entities,
  });
export default connect(mapStateToProps)(Orders)


