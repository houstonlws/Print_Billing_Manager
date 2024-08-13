import React, { Component } from 'react';
import { AppState } from '../../../../types/app.types';
import { connect, ConnectedProps } from 'react-redux';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Stack,
  Table,
} from 'react-bootstrap';
import { CONSTANTS } from '../../../../config/constants';
import {
  addPriceProfile,
  getAllUsers,
  register,
  setPriceProfile,
  updateUserType,
} from '../../../../store/actions/auth.action';
import { AdminState, PriceConfig, User } from '../../../../types/auth.types';

interface State {
  switchedType: { [key: string]: boolean };
  updated: boolean;
  added: boolean;
  priceProfile: PriceConfig;
  selectedProfile: string;
}

class AdminSettings extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      switchedType: {},
      updated: false,
      added: false,
      priceProfile: {
        id: '',
        name: '',
        bw_price: '',
        color_price: '',
        paper_price: '',
        is_active: '',
      },
      selectedProfile: props.admin.activeProfile?.id || '',
    };
  }

  updateUserType = (event: any) => {
    const { switchedType } = this.state;
    if (switchedType[event.target.id]) {
      delete switchedType[event.target.id];
    } else {
      switchedType[event.target.id] = true;
    }
    this.setState({ switchedType: switchedType });
  };

  submitChanges = async () => {
    const { switchedType } = this.state;
    let userIds: string[] = [];
    Object.entries(switchedType).forEach((item) => {
      userIds.push(item[0]);
    });
    if (userIds.length > 0) {
      const result = await this.props.updateUserType(userIds);
      if (result) {
        this.setState({ updated: true });
        this.props.getAllUsers();
      }
    }
  };

  createUser = async (event: any) => {
    event.preventDefault();
    const email = event.target[0].value;
    const pass = event.target[1].value;
    const result = await this.props.register(email, pass);
    if (result) {
      this.setState({ added: true });
      event.target[0].value = '';
      event.target[1].value = '';
    }
  };

  onChange = (event: any) => {
    let { priceProfile } = this.state;

    switch (event.target.id) {
      case 'profile-name':
        priceProfile.name = event.target.value;
        break;
      case 'bw-price':
        priceProfile.bw_price = event.target.value;
        break;
      case 'color-price':
        priceProfile.color_price = event.target.value;
        break;
      case 'paper-price':
        priceProfile.paper_price = event.target.value;
        break;
      case 'price-profile':
        this.setState({ selectedProfile: event.target.value });
        break;
      default:
        break;
    }

    this.setState({ priceProfile: priceProfile });
  };

  setPriceProfile = async () => {
    const { selectedProfile } = this.state;
    const result = await this.props.setPriceProfile(selectedProfile);
    if (result) console.log('set');
  };

  addPriceProfile = async () => {
    const { priceProfile } = this.state;
    console.log('prices', priceProfile);
    const result = await this.props.addPriceProfile(priceProfile);
    if (result) {
      console.log('added');
    }
  };

  render(): React.ReactNode {
    const { switchedType, updated, added, priceProfile, selectedProfile } =
      this.state;
    const {
      admin: { users, priceProfiles },
    } = this.props;

    return (
      <div data-testid='admin-settings-component'>
        <style>
          {`.changed td {
                    background-color: lightyellow!important;
                }`}
        </style>
        {updated && <Alert>Users Updated</Alert>}
        {added && <Alert>User Created</Alert>}
        <h3>Add User</h3>
        <Card>
          <CardBody>
            <Form onSubmit={this.createUser}>
              <FormGroup as={Stack} gap={1} direction={'horizontal'}>
                <FormControl type='email' placeholder='Email'></FormControl>
                <FormControl
                  type='text'
                  placeholder='Temp Password'
                ></FormControl>
                <Button type='submit'>Submit</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <div className='d-flex justify-content-between mt-3'>
          <h3 className='me-auto'>Set User Type</h3>
          <Button onClick={this.submitChanges}>Update</Button>
        </div>
        <Table className='mt-3'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              let change = switchedType[user.id];
              let val = user.type;
              if (change) {
                val =
                  user.type === CONSTANTS.ADMIN
                    ? CONSTANTS.USER
                    : CONSTANTS.ADMIN;
              }
              return (
                <tr className={change ? 'changed' : ''} key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <FormSelect
                      id={user.id}
                      value={val}
                      onChange={this.updateUserType}
                    >
                      <option value={CONSTANTS.ADMIN}>{CONSTANTS.ADMIN}</option>
                      <option value={CONSTANTS.USER}>{CONSTANTS.USER}</option>
                    </FormSelect>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className='d-flex justify-content-between mt-3'>
          <h3 className='me-auto'>Set Active Price Profile</h3>
          <FormSelect
            id={'price-profile'}
            data-testid={'select-price-profile'}
            onChange={this.onChange}
            value={selectedProfile}
          >
            <option value={''}>select profile</option>
            {priceProfiles?.map((p: PriceConfig) => (
              <option key={p?.id} value={p?.id}>
                {p?.name}
              </option>
            ))}
          </FormSelect>
          <Button onClick={this.setPriceProfile}>Update</Button>
        </div>
        <div className='d-flex justify-content-between mt-3'>
          <h3 className='me-auto'>Set Materials Price</h3>
          <Button onClick={this.addPriceProfile}>Add</Button>
        </div>
        <Card>
          <CardBody>
            <Form>
              <FormGroup as={Row}>
                <Col>
                  <FormLabel>Profile Name</FormLabel>
                </Col>
                <Col>
                  <FormControl
                    id='profile-name'
                    type='text'
                    placeholder='Profile Name'
                    onChange={this.onChange}
                    value={priceProfile?.name}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Col>
                  <FormLabel>B&W Price</FormLabel>
                </Col>
                <Col>
                  <FormControl
                    id='bw-price'
                    type='number'
                    placeholder='B&W Price'
                    onChange={this.onChange}
                    value={priceProfile?.bw_price}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Col>
                  <FormLabel>Color Price</FormLabel>
                </Col>
                <Col>
                  <FormControl
                    id='color-price'
                    type='number'
                    placeholder='Color Price'
                    onChange={this.onChange}
                    value={priceProfile?.color_price}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Col>
                  <FormLabel>Paper Price</FormLabel>
                </Col>
                <Col>
                  <FormControl
                    id='paper-price'
                    type='number'
                    placeholder='Paper Price'
                    onChange={this.onChange}
                    value={priceProfile?.paper_price}
                  ></FormControl>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  admin: state.admin,
});

const mapDispatchToProps = {
  updateUserType,
  getAllUsers,
  register,
  addPriceProfile,
  setPriceProfile,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AdminSettings);
