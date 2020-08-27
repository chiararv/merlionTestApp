import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';


import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product-bucket.reducer';
import { getEntity } from './product-bucket.reducer';
import { updateEntity } from './product-bucket.reducer';

import ProductStock from './productStock';


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
