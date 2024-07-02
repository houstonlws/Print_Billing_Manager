import React, { Component, ReactNode } from "react";
import { AppState } from "../../types/app.types";
import { ConnectedProps, connect } from "react-redux";
import { getDepartmentBillingHistory } from "../../store/actions/billing.actions";
import {
    BarElement,
    CategoryScale,
    Chart,
    ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem, Stack } from "react-bootstrap";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

class BillingComponent extends Component<BillingComponentProps> {

    componentDidMount(): void {
        this.props.getDepartmentBillingHistory()
    }

   

    chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Print Copies for the Last 12 Months',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Copies',
            },
          },
        },
    }

    render(): ReactNode {

        const { billData, departments } = this.props

        return (
            <Stack gap={2}>
                <Card>
                  <CardHeader>
                    <h2>Billing</h2>
                  </CardHeader>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>{departments.find(d => d.id === billData?.department_id)?.name}</CardTitle>
                    <CardText>{billData?.billing_cycle_start} - {billData?.billing_cycle_end}</CardText>
                  </CardBody>
                </Card>

                <Card>
                    <ListGroup>
                      <ListGroupItem>
                        <div>Total Color Pages: {billData?.total_color_pages}</div>
                      </ListGroupItem>
                      <ListGroupItem>
                        <div>Total B&W Pages: {billData?.total_bw_pages}</div>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardText>Total Paper: {billData?.total_paper}</CardText>
                      </ListGroupItem>
                    </ListGroup>
                </Card>
                <Card>
                  <CardBody>
                    <h2>Amount Due: ${billData?.total_charges}</h2>
                  </CardBody>
                </Card>
                
            </Stack>
        )
    }

}

const mapStateToProps = (state: AppState) => {
    return {
        departments: state.data.departments,
        billData: state.billing.billData
    }
}

const mapDispatchToProps = {
    getDepartmentBillingHistory
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type BillingComponentProps = ConnectedProps<typeof connector>

export default connector(BillingComponent)