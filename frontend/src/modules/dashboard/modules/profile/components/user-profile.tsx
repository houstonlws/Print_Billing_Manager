import React, { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import messages from "../utilities/profile.messages";
import { AppState } from "../../../../../App";
import { ConnectedProps, connect } from "react-redux";
import { User } from "../../../../auth/utilities/auth.models";
import ProfileService from "../utilities/profile.service";

interface UserProfileState {
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  phone: string;
}

class UserProfile extends Component<UserProfileProps, UserProfileState> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      department: props.departmant || "",
      email: props.email || "",
      phone: props.phone || "",
    };
  }

  departmentSelect = messages.userProfile.departmentSelect;

  onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    switch (event.target.id) {
      case "firstName":
        this.setState({ firstName: event.target.value });
        break;
      case "lastName":
        this.setState({ lastName: event.target.value });
        break;
      case "department":
        this.setState({ department: event.target.value });
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
    const result = await ProfileService.updateUserData(this.state as User);
    if (result) {
      console.log("updateed profile successfully");
    } else {
      console.log("profile not updated");
    }
  };

  render(): ReactNode {
    const { departments } = this.props!;

    return (
      <>
        <h2>User Profile</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              aria-describedby=""
              placeholder="First Name"
              onChange={this.onChange}
              value={this.state.firstName}
            ></input>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              aria-describedby=""
              placeholder="Last Name"
              onChange={this.onChange}
              value={this.state.lastName}
            ></input>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                className="form-control"
                id="department"
                aria-describedby=""
                onChange={this.onChange}
                value={this.state.department}
              >
                <option value="">--Select a Department</option>
                {departments?.map((department) => (
                  <option value={department.id} key={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby=""
                placeholder="Email"
                onChange={this.onChange}
                value={this.state.email}
              ></input>
              <label htmlFor="phone">Phone</label>
              <input
                type="phone"
                className="form-control"
                id="phone"
                aria-describedby=""
                placeholder="Phone"
                onChange={this.onChange}
                value={this.state.phone}
              ></input>
            </div>
          </div>
          <button type="submit">Update</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    email: state.dashboard.profile?.user?.email,
    firstName: state.dashboard.profile?.user?.firstName,
    lastName: state.dashboard.profile?.user?.lastName,
    departmant: state.dashboard.profile?.user?.department,
    phone: state.dashboard.profile?.user?.phone,
    departments: state.dashboard.profile?.departments,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserProfileProps = ConnectedProps<typeof connector>;

export default connector(UserProfile);
