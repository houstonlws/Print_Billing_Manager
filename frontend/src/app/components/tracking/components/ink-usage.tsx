import React, { Component, ReactNode } from "react";
import { Card, Stack } from "react-bootstrap";
import { Metric } from "../../../types/printer.types";

interface InkUsageProps {
  metrics: Metric[];
}

// total_color_pages_printed: string,
// total_bw_pages_printed: string,

class InkUsage extends Component<InkUsageProps> {
  // total_color_pages_last_billing: string,
  totalColor() {
    return this.props.metrics.reduce<number>((total, metric) => {
      return total + Number(metric.total_color_pages_last_billing);
    }, 0);
  }

  // total_bw_pages_last_billing: string,
  totalBW() {
    return this.props.metrics.reduce<number>((total, metric) => {
      return total + Number(metric.total_bw_pages_last_billing);
    }, 0);
  }

  render(): ReactNode {
    return (
      <Stack
        direction="horizontal"
        gap={2}
        className="justify-content-center text-center"
      >
        <Card>
          <Card.Header>Total Color Impressions: </Card.Header>
          <Card.Title>
            <h2>{this.totalColor()}</h2>
            <small>Clicks</small>
          </Card.Title>
        </Card>
        <Card>
          <Card.Header>Total Black & White Impressions: </Card.Header>
          <Card.Title>
            <h2>{this.totalBW()}</h2>
            <small>Clicks</small>
          </Card.Title>
        </Card>
      </Stack>
    );
  }
}

export default InkUsage;
