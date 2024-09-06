import React, { useState, useEffect } from 'react';
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

const initialProfile: PriceConfig = {
  id: '',
  name: '',
  bw_price: '',
  color_price: '',
  paper_price: '',
  is_active: '',
};

const PriceProfile = (props: Props) => {
  const [tempPriceProfile, setTempPriceProfile] =
    useState<PriceConfig>(initialProfile);
  const [selectedProfile, setSelectedProfile] = useState<string>(
    props.admin.activeProfile?.id || ''
  );
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await props.getPriceProfileList();
      await props.getPriceProfile();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loaded && selectedProfile === '' && props.admin.activeProfile?.id) {
      setSelectedProfile(props.admin.activeProfile.id);
      setLoaded(true);
      const prof = props.admin.priceProfiles?.find(
        (p) => p.id === props.admin.activeProfile.id
      );
      if (prof) setTempPriceProfile(prof);
    }
  }, [
    loaded,
    selectedProfile,
    props.admin.activeProfile,
    props.admin.priceProfiles,
  ]);

  const addPriceProfile = async () => {
    const result = await props.addPriceProfile(tempPriceProfile);
    if (result) {
      window.location.reload();
    }
  };

  const setPriceProfile = async () => {
    const result = await props.setPriceProfile(selectedProfile);
    if (result) {
      window.location.reload();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setTempPriceProfile((prev) => ({
      ...prev,
      [id.replace('profile-', '')]: value || '',
    }));
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedProfile(value);
    if (value === '') {
      setTempPriceProfile(initialProfile);
    } else {
      const prof = props.admin.priceProfiles?.find((p) => p.id === value);
      if (prof) setTempPriceProfile(prof);
    }
  };

  const { priceProfiles } = props.admin;
  const selectedProfileData =
    selectedProfile !== ''
      ? priceProfiles?.find((p) => p.id === selectedProfile)
      : tempPriceProfile;

  const profileName = selectedProfileData?.name || '';
  const bwPrice = selectedProfileData?.bw_price || '';
  const colorPrice = selectedProfileData?.color_price || '';
  const paperPrice = selectedProfileData?.paper_price || '';

  return (
    <>
      <Card>
        <CardBody>
          <div className='d-flex'>
            <h3 className='me-auto'>Set Active Price Profile</h3>
            <Button onClick={setPriceProfile}>Update</Button>
          </div>
          <FormSelect
            id={'price-profile'}
            data-testid={'select-price-profile'}
            onChange={onChangeSelect}
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
      </Card>

      <Card>
        <CardBody>
          <div className='d-flex'>
            <h3 className='me-auto'>Materials Price</h3>
            <Button disabled={selectedProfile !== ''} onClick={addPriceProfile}>
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
                  onChange={onChange}
                  value={profileName}
                  disabled={selectedProfile !== ''}
                />
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
                  onChange={onChange}
                  value={bwPrice}
                  disabled={selectedProfile !== ''}
                />
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
                  onChange={onChange}
                  value={colorPrice}
                  disabled={selectedProfile !== ''}
                />
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
                  onChange={onChange}
                  value={paperPrice}
                  disabled={selectedProfile !== ''}
                />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

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
type Props = ConnectedProps<typeof connector>;

export default connector(PriceProfile);
