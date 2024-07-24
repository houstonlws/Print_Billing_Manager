import React, { Component, ReactNode } from 'react';
import { CardBody } from 'react-bootstrap';
import { Metric } from '../../../types/printer.types';

type PaperUsageProps = {
  metric: Metric;
};

class PaperUsage extends Component<PaperUsageProps> {
  render(): ReactNode {
    return (
      <CardBody>
        <div>
          <strong>Total Pages Printed This Month: </strong>
        </div>
      </CardBody>
    );
  }
}

export default PaperUsage;
