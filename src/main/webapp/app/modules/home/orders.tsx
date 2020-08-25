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
        <>
        {
            props.orders.map( (sale, i) => (
                <tr key={`entity-${i}`}>
                    <td>{sale.id}</td>
                    <td>Merlion Techs</td>
                    <td>{sale.product.id}</td>
                    <td>fecha</td>
                    <td><button className="btn btn-primary float-right jh-create-entity" onClick={() => shipOrder(sale.id)}>enviar</button></td>
                </tr>

                ))
        }
        </>

    )
}
const mapStateToProps = ({home}: IRootState) => ({
    entity: home.entity,
    salesList: home.entities,
  });
export default connect(mapStateToProps)(Orders)


