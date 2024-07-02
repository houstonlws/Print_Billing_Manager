import React, { Component, ReactNode } from "react";
import { Button, Card, CardHeader, Form, FormControl, FormLabel, FormSelect, Modal } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../../types/app.types";
import { MaintenanceRequest } from "../../../types/maintenance.types";
import { request } from "http";
import { addMaintenanceRequest } from "../../../store/actions/maintenance.actions";

interface State {
  request: MaintenanceRequest;
  adding: boolean;
}

const initialRequest: MaintenanceRequest = {
  id: "",
  printer_id: "",
  request_date: "",
  maintenance_type: "",
  description: "",
  status: "",
};

class AddRequest extends Component<AddRequestProps, State> {

  constructor(props: AddRequestProps) {
    super(props);
    this.state = {
      adding: false,
      request: {...initialRequest},
    };
  }

  onChange = (event: any) => {
    const { request } = this.state
    switch(event.target.id){
        case 'type': {
          request.maintenance_type = event.target.value
        } break;
        case 'printer': {
          request.printer_id = event.target.value
        } break;
        case 'description': {
          request.description = event.target.value
        } break;
        default: return
    }
    this.setState({request: request})
  }

  toggleAdding = () => {
    this.setState(prev => ({
        adding: !prev.adding
    }))
  }

  cancelAdd = () => {
    this.setState({
        request: {...initialRequest}
    })
    this.toggleAdding()
  }

  submit = () => {
    const {request} = this.state
    request.request_date = new Date().toISOString().split('T')[0]
    this.props.addMaintenanceRequest(request)
  }

  render(): ReactNode {

    const { adding, request } = this.state
    const { printers } = this.props

    return (
      <>
        <Card>
          <CardHeader className="d-flex">
            <h2 className="me-auto">Maintenance Requests</h2>
            <Button onClick={this.toggleAdding}>Add</Button>
          </CardHeader>
        </Card>
        <Modal
          show={adding}
          onHide={this.cancelAdd}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Maintenance Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <FormLabel>Type</FormLabel>
                <FormControl
                  type="text"
                  id="type"
                  onChange={this.onChange}
                  value={request.maintenance_type}
                ></FormControl>
                <FormLabel>Printer</FormLabel>
                <FormSelect
                  id="printer"
                  onChange={this.onChange}
                  value={request.printer_id}
                >
                    <option value={''}>Select Printer</option>
                    {printers?.map(printer => (
                        <option key={printer.id} value={printer.id}>{printer.location} - {printer.brand} - {printer.model}</option>
                    ))}
                </FormSelect>
                <FormLabel>Description</FormLabel>
                <FormControl
                  as="textarea"
                  id="description"
                  onChange={this.onChange}
                  value={request.description}
                ></FormControl>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cancelAdd}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.submit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
    printers: state.printer.printers
});

const mapDispatchToProps = {
  addMaintenanceRequest
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AddRequestProps = ConnectedProps<typeof connector>;

export default connector(AddRequest);
