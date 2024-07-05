import React, { Component, FormEvent, ReactNode } from "react";
import { AppState } from "../../types/app.types";
import { ConnectedProps, connect } from "react-redux";
import { updateUserData } from "../../store/actions/auth.action";
import { User } from "../../types/auth.types";
import { getDepartments } from "../../store/actions/data.action";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  FormSelect,
  Row,
} from "react-bootstrap";

type ProfileState = {
  firstName: string;
  lastName: string;
  department_id: string;
  email: string;
  phone: string;
  status?: string | null
};

class ProfileComponent extends Component<ProfileProps, ProfileState> {
  componentDidMount(): void {
    this.props.getDepartments();
  }

  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      department_id: props.department_id || "",
      email: props.email || "",
      phone: props.phone || "",
      status: null,
    };
  }

  onChange = (event: any) => {
    switch (event.target.id) {
      case "firstName":
        this.setState({ firstName: event.target.value });
        break;
      case "lastName":
        this.setState({ lastName: event.target.value });
        break;
      case "department":
        this.setState({ department_id: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "phone":
        this.setState({ phone: event.target.value });
        break;
      default:
        return;
    }
  };

  handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await this.props.updateUserData(this.state as User);
    console.log('res', result)
    if(result){
        this.setState({status: 'success'})
      }
    else{
        this.setState({status: 'danger'})
      }
  };

  render(): ReactNode {

    const { firstName, lastName, email, phone, department_id, status } = this.state!;
    const { departments } = this.props!

    return (
      <>
        <h2>User Profile</h2>
        {status !== null && (
          <Alert variant={status}>{status === 'danger' ? 'Error updating profile': 'Updated Profile Successfully'}</Alert>
        )}

        <Card>
          <CardBody>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  First Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    id="firstName"
                    placeholder={"First Name"}
                    value={firstName || undefined}
                    onChange={this.onChange}
                  ></Form.Control>
                </Col>
                <Form.Label column sm={2}>
                  Last Name:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={this.onChange}
                    value={lastName || undefined}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <FormGroup as={Row}>
                <Form.Label column sm={2}>
                  Email:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={this.onChange}
                    value={email || undefined}
                  ></Form.Control>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Form.Label column sm={2}>
                  Phone:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={this.onChange}
                    value={phone || undefined}
                  ></Form.Control>
                </Col>
              </FormGroup>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Department:
                </Form.Label>
                <Col sm={10}>
                  <FormSelect
                    className="form-control"
                    id="department"
                    onChange={this.onChange}
                    value={department_id || undefined}
                  >
                    <option value="">--Select a Department</option>
                    {departments?.map((department) => (
                      <option value={department.id} key={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Form.Group>
              <Button type="submit">Update</Button>
            </Form>
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    email: state.auth.user?.email,
    firstName: state.auth.user?.firstName,
    lastName: state.auth.user?.lastName,
    department_id: state.auth.user?.department_id,
    phone: state.auth.user?.phone,
    departments: state.data.departments,
    status: state.auth.updatedDataStatus
  };
};

const mapDispatchToProps = {
  updateUserData,
  getDepartments,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileProps = ConnectedProps<typeof connector>;

export default connector(ProfileComponent);
