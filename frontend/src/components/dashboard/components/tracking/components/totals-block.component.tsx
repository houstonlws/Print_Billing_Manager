import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../../../types/app.types';
import { Card, CardBody } from 'react-bootstrap';
interface State {}
interface Props {
  title: string;
  value: string;
  unit?: string;
}
class TotalsBlock extends Component<ReduxProps, State> {
  render(): React.ReactNode {
    const { value, title, unit } = this.props;
    return (
      <Card className='totals-block'>
        <CardBody>
          <strong>{title}</strong>
          <div className='d-flex align-items-center'>
            <h2 data-testid={`${title}-${value}`}>{value}</h2>
            <small>{unit}</small>
          </div>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state: AppState) => ({});
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & Props;

export default connector(TotalsBlock);
