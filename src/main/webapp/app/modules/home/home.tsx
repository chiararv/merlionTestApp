import './home.scss';

import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Table } from 'reactstrap';
import { getEntities, sendOrder, updateEntity } from './home.reducer';

import { IRootState } from 'app/shared/reducers';
import Orders from './orders'
import Delivered from './delivered';
import Shipped from './shipped';


export interface IHomeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Home = (props: IHomeProps) => {
  const { salesList, updating, errorMsg } = props;

  const [status, setStatus] = useState('orders')

  useEffect(() => {
    props.getEntities()
  }, []);

const orders = salesList.filter(sale => sale.state === "IN_CHARGE")
const shippedOrders = salesList.filter(sale => sale.state === "SHIPPED")
const deliveredOrders = salesList.filter(sale => sale.state === "DELIVERED")
// eslint-disable-next-line no-console 
// console.log({salesList, orders, shippedOrders, deliveredOrders})



  return (
    <div>
      <div className="btnContainer">
        <button 
          className={`button ${status === 'orders' && 'selected'}`} onClick={() => setStatus('orders')}>encargado</button>
        <button className={`button ${status === 'shipped' && 'selected'}`} onClick={() => setStatus('shipped')}>enviado</button>
        <button className={`button ${status === 'delivered' && 'selected'}`} onClick={() =>setStatus('delivered')}>entregado</button>
      </div>
      <Table responsive classname="table">
      <thead>
        <tr>
          <th>
            Nro
          </th>
          <th>
            Proveedor
          </th>
          <th>
            Producto
          </th>
          <th>
          Fecha de entrega
          </th>
          <th>            
          </th>
        </tr>
      </thead>
      <tbody>
        {
          status === 'orders' && <Orders orders={orders} updateEntity={props.updateEntity} />
        }
        {
          status === 'shipped' && <Shipped shippedOrders={shippedOrders} updateEntity={props.updateEntity}/>
        }
        {
          status === 'delivered' && <Delivered deliveredOrders={deliveredOrders}/>
        }
        
        
      </tbody>
    </Table>
    </div>
  );
};

const mapStateToProps = ({home}: IRootState) => ({
  salesList: home.entities,
  loading: home.loading,
  updating: home.updating,
  errorMsg: home.errorMessage
});

const mapDispatchToProps = {
  getEntities,
  sendOrder,
  updateEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
