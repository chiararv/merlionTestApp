import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product-bucket.reducer';
import { getEntity } from './product-bucket.reducer';
import { updateEntity } from './product-bucket.reducer';
import { IProductBucket } from 'app/shared/model/product-bucket.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import ProductOverview from './productOverview'
import ProductStock from './productStock';
import Container from './container';

export interface IProductBucketProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProductBucket = (props: IProductBucketProps) => {

  const { productBucketList, loading } = props;
  useEffect(() => {
    props.getEntities();  
  }, []);

  const handleUpdate = (entity) => {
    props.updateEntity(entity)
  }

  const sortedProductBucketList = [...productBucketList].sort((a, b) => a.id - b.id)
  
  return (
    <div>
      <h1 style={{textAlign: 'center', fontWeight: 700}}>Product Bucket</h1>
      {
         !loading && sortedProductBucketList.map( productBucket => (
          <ProductStock
          key={productBucket.id}
          entity={productBucket}
          handleUpdateEntity={handleUpdate}
        />
         ))
      }
    </div>
  );
};

const mapStateToProps = ({ productBucket }: IRootState) => ({
  productBucketList: productBucket.entities,
  loading: productBucket.loading,
  updating: productBucket.updating
});

const mapDispatchToProps = {
  getEntities,
  getEntity,
  updateEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductBucket);
