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
import { Formik } from 'formik';
import * as yup from 'yup';

const initialProfile: PriceConfig = {
  id: '',
  name: '',
  bw_price: '',
  color_price: '',
  paper_price: '',
  is_active: '',
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

const PriceProfile = (props: Props) => {
  const [tempPriceProfile, setTempPriceProfile] =
    useState<PriceConfig>(initialProfile);

  const [selectedProfile, setSelectedProfile] = useState<string>(
    props.admin.activeProfile?.id || ''
  );

  const [loaded, setLoaded] = useState<boolean>(false);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    bw_price: yup.string().required('Black & White price is required'),
    color_price: yup.string().required('Color price is required'),
    paper_price: yup.string().required('Paper price is required'),
  });

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

  const addPriceProfile = async (formData: PriceConfig) => {
    const result = await props.addPriceProfile(formData);
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
          <Formik
            initialValues={initialProfile}
            onSubmit={addPriceProfile}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className='d-flex'>
                  <h3 className='me-auto'>Materials Price</h3>
                  <Button disabled={selectedProfile !== ''} type='submit'>
                    Add
                  </Button>
                </div>
                <FormGroup as={Row}>
                  <Col sm='3'>
                    <FormLabel>Profile Name</FormLabel>
                  </Col>
                  <Col sm='9'>
                    <FormControl
                      id='name'
                      type='text'
                      placeholder='Profile Name'
                      onChange={handleChange}
                      value={selectedProfile !== '' ? profileName : values.name}
                      isInvalid={touched.name && !!errors.name}
                      disabled={selectedProfile !== ''}
                    />
                    <FormControl.Feedback type='invalid'>
                      {errors.name}
                    </FormControl.Feedback>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <Col sm='3'>
                    <FormLabel>B&W Price</FormLabel>
                  </Col>
                  <Col sm='9'>
                    <FormControl
                      id='bw_price'
                      type='number'
                      placeholder='B&W Price'
                      onChange={handleChange}
                      value={selectedProfile !== '' ? bwPrice : values.bw_price}
                      isInvalid={touched.bw_price && !!errors.bw_price}
                      disabled={selectedProfile !== ''}
                    />
                    <FormControl.Feedback type='invalid'>
                      {errors.bw_price}
                    </FormControl.Feedback>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <Col sm='3'>
                    <FormLabel>Color Price</FormLabel>
                  </Col>
                  <Col sm='9'>
                    <FormControl
                      id='color_price'
                      type='number'
                      placeholder='Color Price'
                      onChange={handleChange}
                      value={
                        selectedProfile !== '' ? colorPrice : values.color_price
                      }
                      isInvalid={touched.color_price && !!errors.color_price}
                      disabled={selectedProfile !== ''}
                    />
                    <FormControl.Feedback type='invalid'>
                      {errors.color_price}
                    </FormControl.Feedback>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <Col sm='3'>
                    <FormLabel>Paper Price</FormLabel>
                  </Col>
                  <Col sm='9'>
                    <FormControl
                      id='paper_price'
                      type='number'
                      placeholder='Paper Price'
                      onChange={handleChange}
                      value={
                        selectedProfile !== '' ? paperPrice : values.paper_price
                      }
                      isInvalid={touched.paper_price && !!errors.paper_price}
                      disabled={selectedProfile !== ''}
                    />
                    <FormControl.Feedback type='invalid'>
                      {errors.paper_price}
                    </FormControl.Feedback>
                  </Col>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default connector(PriceProfile);
