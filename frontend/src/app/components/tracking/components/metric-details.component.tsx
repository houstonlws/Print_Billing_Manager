import React, { Component } from "react";
import { Card, CardBody } from "react-bootstrap";
import { Metric, Printer } from "../../../types/printer.types";

interface Props {
  metric: Metric;
  printer: Printer;
}

class MetricDetailsComponent extends Component<Props> {
  render(): React.ReactNode {
    const { metric, printer } = this.props;

    return (
      <Card>
        <CardBody style={{ border: "1px solid #c8c8c8", borderRadius: "5px" }}>
          <div>
            <p>Printer: {printer?.serial_number}</p>
            <strong>Monthly Print Jobs:</strong>
            {metric?.monthly_print_jobs}
          </div>
          <div>
            <strong>Monthly Print Volume:</strong>
            {metric?.monthly_print_volume}
          </div>
          <div>
            <strong>Paper Levels:</strong>
            {metric?.paper_levels}
          </div>
          <div>
            <strong>Paper Usage Monthly:</strong>
            {metric?.paper_usage_monthly}
          </div>
          <div>
            <strong>Toner Levels:</strong>
            {metric?.toner_levels}
          </div>
          <div>
            <strong>Toner Usage Monthly:</strong>
            {metric?.toner_usage_monthly}
          </div>
          <div>
            <strong>Total Color Pages For Month:</strong>
            {metric?.total_color_pages_last_billing}
          </div>
          <div>
            <strong>Total Black & White Pages For Month:</strong>
            {metric?.total_bw_pages_last_billing}
          </div>
          <div>
            <strong>Total Color Pages:</strong>
            {metric?.total_color_pages_printed}
          </div>
          <div>
            <strong>Total Black & White Pages:</strong>
            {metric?.total_bw_pages_printed}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default MetricDetailsComponent;
