import React from 'react'
import { connect } from 'react-redux'
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product-bucket.reducer';
import { RouteComponentProps } from 'react-router-dom';

// export interface IProductBucketProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const productOverview = (props) => {
    const { products } = props;
  // eslint-disable-next-line no-console
    console.log('entra', props)
    return (
        <div>
            { products && products.length > 0 && (
                products.map((item, index) => (
                    <div key={index}>
                        <h3>{item.product.name}</h3>
                        <button onClick={props.showStock}>Ver stock</button>
                    </div>
                ))

            )}
        </div>
    )
}
// const mapStateToProps = ({ productBucket }: IRootState) => ({
//     productBucketList: productBucket.entities,
//     loading: productBucket.loading,
//   });
  
//   const mapDispatchToProps = {
//     getEntities,
//   };

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;


export default productOverview

