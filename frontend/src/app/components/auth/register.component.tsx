import React, { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import { register } from "../../store/actions/auth.action";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

interface RegisterState {
  email: string;
  password: string;
  password2: string;
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.id) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "password2":
        this.setState({ password2: event.target.value });
        break;
      default:
        return;
    }
  }

  registerAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.passwordsMatch()) {
      console.log("passwords dont match");
      return;
    }
    this.props.register(this.state.email, this.state.password);
  };

  passwordsMatch = () => {
    return (
      this.state.password === this.state.password2 &&
      this.state.password !== "" &&
      this.state.password !== undefined
    );
  };

  render() {
    return (
      <Container className="h-100">
        <Row className="h-100">
          <Card
            style={{
              maxWidth: "500px",
              margin: "auto",
              padding: '0px'
            }}
          >
            <CardHeader>
              <h3>Register</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.registerAccount}>
                <InputGroup className="mb-4">
                  <InputGroupText id="emailHelp">Email</InputGroupText>
                  <FormControl
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></FormControl>
                </InputGroup>
                <InputGroup className="mb-2">
                  <InputGroupText id="passwordHelp">Password</InputGroupText>
                  <FormControl
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></FormControl>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupText id="confirm-password">
                    Confirm Password
                  </InputGroupText>
                  <FormControl
                    type="password"
                    className="form-control"
                    id="password2"
                    placeholder="Confirm password"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></FormControl>
                </InputGroup>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  register,
};

const connector = connect(() => {
  return {};
}, mapDispatchToProps);

type RegisterProps = ConnectedProps<typeof connector>;

export default connector(Register);
