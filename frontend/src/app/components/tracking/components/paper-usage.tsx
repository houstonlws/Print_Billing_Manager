import React, { Component, ReactNode } from "react";
import { Metric } from "../../../types/printer.types";
import { CardBody } from "react-bootstrap";

type PaperUsageProps = {
  metric: Metric;
};

class PaperUsage extends Component<PaperUsageProps> {
  render(): ReactNode {
    const { metric } = this.props;

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
