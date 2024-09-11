import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../../../types/app.types';
import { Card, CardBody } from 'react-bootstrap';

interface Props {
  title: string;
  value: string;
  unit?: string;
}

const mapStateToProps = (state: AppState) => ({});
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & Props;

const TotalsBlock = (props: ReduxProps) => {
  const { value, title, unit } = props;
  return (
    <>
      <style key={'tb-styles'}>
        {`.totals-block {
              width: 100%;
          }`}
      </style>
      <Card key={'tb-block'} className='totals-block'>
        <CardBody>
          <strong>{title}</strong>
          <div className='d-flex align-items-center'>
            <h2 data-testid={`${title}-${value}`}>{value}</h2>
            <small>{unit}</small>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default connector(TotalsBlock);
