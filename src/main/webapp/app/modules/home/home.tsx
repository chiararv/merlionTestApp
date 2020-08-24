import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Table } from 'reactstrap';
import { getEntities } from '../../entities/sales/sales.reducer';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {

  useEffect(() => {
    getEntities();
  }, []);

  const { salesList } = props;

  return (
    <div>
      <div>
        <button>encargado</button>
        <button>enviado</button>
        <button>entregado</button>
      </div>
      <Table responsive>
      <thead>
        <tr>
          <th>
            Nro
          </th>
          <th>
            Poveedor
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
        salesList.map( (sale, i) => (
          <tr key={`entity-${i}`}>
            <td>{sale.product.id}</td>
            <td>Merlion Techs</td>
            <td>fecha</td>
            <td><button>accion</button></td>
          </tr>

        ))
      }
      </tbody>
    </Table>
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,

};
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
