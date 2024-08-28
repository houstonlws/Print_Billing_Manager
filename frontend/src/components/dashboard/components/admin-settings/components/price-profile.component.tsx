import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState, PriceConfig } from '../../../../../types';
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from 'react-bootstrap';
import {
  addPriceProfile,
  getPriceProfile,
  getPriceProfileList,
  setPriceProfile,
} from '../../../../../store/actions';

interface State {
  tempPriceProfile: PriceConfig;
  selectedProfile: string;
  loaded: boolean;
}

const initialProfile: PriceConfig = {
  id: '',
  name: '',
  bw_price: '',
  color_price: '',
  paper_price: '',
  is_active: '',
};

class PriceProfile extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      tempPriceProfile: initialProfile,
      selectedProfile: props.admin.activeProfile?.id || '',
      loaded: false,
    };
  }

  async componentDidMount() {
    await this.props.getPriceProfileList();
    await this.props.getPriceProfile();
  }

  componentDidUpdate(
    prevProps: Readonly<ReduxProps>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    const { loaded } = this.state;
    const {
      admin: { priceProfiles, activeProfile },
    } = this.props;
    if (
      prevState.selectedProfile === '' &&
      !loaded &&
      activeProfile?.id !== ''
    ) {
      this.setState({ selectedProfile: activeProfile.id, loaded: true });
      const prof = priceProfiles?.find((p) => p.id == activeProfile.id);
      if (prof) this.setState({ tempPriceProfile: prof });
    }
  }

  addPriceProfile = async () => {
    const { tempPriceProfile: priceProfile } = this.state;
    const result = await this.props.addPriceProfile(priceProfile);
    if (result) {
      console.log('added');
      window.location.reload();
    }
  };

  setPriceProfile = async () => {
    const { selectedProfile } = this.state;
    const result = await this.props.setPriceProfile(selectedProfile);
    if (result) {
      console.log('set');
      window.location.reload();
    }
  };

  onChange = (event: any) => {
    const { tempPriceProfile } = this.state;
    switch (event.target.id) {
      case 'profile-name':
        tempPriceProfile.name = event.target.value;
        break;
      case 'bw-price':
        tempPriceProfile.bw_price = event.target.value;
        break;
      case 'color-price':
        tempPriceProfile.color_price = event.target.value;
        break;
      case 'paper-price':
        tempPriceProfile.paper_price = event.target.value;
        break;
      default:
        break;
    }
    this.setState({ tempPriceProfile: tempPriceProfile });
  };

  onChangeSelect = (event: any) => {
    const {
      admin: { priceProfiles, activeProfile },
    } = this.props;
    this.setState({ selectedProfile: event.target.value });
    if (event.target.value === '') {
      this.setState({ tempPriceProfile: initialProfile });
    } else {
      const prof = priceProfiles?.find((p) => p.id == activeProfile.id);
      if (prof) this.setState({ tempPriceProfile: prof });
    }
  };

  render(): React.ReactNode {
    const { selectedProfile, tempPriceProfile } = this.state;
    const {
      admin: { priceProfiles },
    } = this.props;

    let selectedProfileData;
    if (selectedProfile !== '') {
      selectedProfileData = priceProfiles?.find(
        (p) => p.id === selectedProfile
      );
    } else {
      selectedProfileData = tempPriceProfile;
    }

    return [
      <Card key={1}>
        <CardBody>
          <div className='d-flex'>
            <h3 className='me-auto'>Set Active Price Profile</h3>
            <Button onClick={this.setPriceProfile}>Update</Button>
          </div>
          <FormSelect
            id={'price-profile'}
            data-testid={'select-price-profile'}
            onChange={this.onChangeSelect}
            value={selectedProfile}
          >
            <option value={''}>create new price profile</option>
            {priceProfiles?.map((p: PriceConfig) => (
              <option key={p?.id} value={p?.id}>
                {p?.name}
              </option>
            ))}
          </FormSelect>
        </CardBody>
      </Card>,

      <Card key={2}>
        <CardBody>
          <div className='d-flex'>
            <h3 className='me-auto'>Materials Price</h3>
            <Button
              disabled={selectedProfile !== ''}
              onClick={this.addPriceProfile}
            >
              Add
            </Button>
          </div>
          <Form>
            <FormGroup as={Row}>
              <Col sm='3'>
                <FormLabel>Profile Name</FormLabel>
              </Col>
              <Col sm='9'>
                <FormControl
                  id='profile-name'
                  type='text'
                  placeholder='Profile Name'
                  onChange={this.onChange}
                  value={selectedProfileData?.name}
                  disabled={selectedProfile !== ''}
                ></FormControl>
              </Col>
            </FormGroup>
            <FormGroup as={Row}>
              <Col sm='3'>
                <FormLabel>B&W Price</FormLabel>
              </Col>
              <Col sm='9'>
                <FormControl
                  id='bw-price'
                  type='number'
                  placeholder='B&W Price'
                  onChange={this.onChange}
                  value={selectedProfileData?.bw_price}
                  disabled={selectedProfile !== ''}
                ></FormControl>
              </Col>
            </FormGroup>
            <FormGroup as={Row}>
              <Col sm='3'>
                <FormLabel>Color Price</FormLabel>
              </Col>
              <Col sm='9'>
                <FormControl
                  id='color-price'
                  type='number'
                  placeholder='Color Price'
                  onChange={this.onChange}
                  value={selectedProfileData?.color_price}
                  disabled={selectedProfile !== ''}
                ></FormControl>
              </Col>
            </FormGroup>
            <FormGroup as={Row}>
              <Col sm='3'>
                <FormLabel>Paper Price</FormLabel>
              </Col>
              <Col sm='9'>
                <FormControl
                  id='paper-price'
                  type='number'
                  placeholder='Paper Price'
                  onChange={this.onChange}
                  value={selectedProfileData?.paper_price}
                  disabled={selectedProfile !== ''}
                ></FormControl>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>,
    ];
  }
}
const mapStateToProps = (state: AppState) => ({
  admin: state.admin,
});
const mapDispatchToProps = {
  setPriceProfile,
  addPriceProfile,
  getPriceProfile,
  getPriceProfileList,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export default connector(PriceProfile);
