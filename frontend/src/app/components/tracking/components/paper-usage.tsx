import React, { Component, ReactNode } from "react";
import { Metric } from "../../../types/printer.types";
import { animated } from "@react-spring/web";
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
          <animated.span>{metric.paper_usage_monthly}</animated.span>
        </div>
      </CardBody>
    );
  }
}

export default PaperUsage;
