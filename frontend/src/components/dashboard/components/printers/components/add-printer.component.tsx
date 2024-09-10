import React, { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from 'react-bootstrap';
import { AppState, Printer } from '../../../../../types';
import {
  addPrinter,
  getDepartmentPrinters,
} from '../../../../../store/actions';
import { CONSTANTS } from '../../../../../config/constants';
import { Formik } from 'formik';
import * as yup from 'yup';

type Props = {
  departmentId: string;
};

const mapStateToProps = (state: AppState) => ({
  account: state.account,
});
const mapDispatchToProps = {
  addPrinter,
  getDepartmentPrinters,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type AddProps = ConnectedProps<typeof connector> & Props;

const initialState: Printer = {
  id: '',
  serial_number: '',
  model: '',
  brand: '',
  location: '',
  installation_date: '',
  warranty_expiry_date: '',
  ip_address: '',
  mac_address: '',
  firmware_version: '',
  department_id: '',
};

const AddPrinterComponent = (props: AddProps) => {
  const { user } = props.account;
  const isAdmin = user.type === CONSTANTS.ADMIN;
  const [adding, setAdding] = useState<boolean>(false);
  const schema = yup.object().shape({
    serial_number: yup.string().required('Serial number is required'),
    model: yup.string().required('Model is required'),
    brand: yup.string().required('Brand is required'),
    location: yup.string().required('Location is required'),
    installation_date: yup.string(),
    warranty_expiry_date: yup.string(),
    ip_address: yup.string(),
    mac_address: yup.string(),
    firmware_version: yup.string(),
    department_id: yup.string(),
  });

  const setDepartment = async (event: any) => {
    await props.getDepartmentPrinters(event.target.value);
  };

  const toggleAdding = () => {
    setAdding((prev) => !prev);
  };

  const cancelAdd = () => {
    toggleAdding();
  };

  const addPrinter = async (formData: Printer) => {
    await props.addPrinter(formData);
  };

  return (
    <div data-testid='addprinter'>
      <Card>
        <CardHeader className='d-flex justify-content-between'>
          <h2>Printers</h2>
          <Button data-testid='toggle-add' onClick={toggleAdding}>
            Add
          </Button>
        </CardHeader>
      </Card>
      <Modal
        show={adding}
        onHide={cancelAdd}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Printer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialState,
              department_id: isAdmin ? props.departmentId : user.department_id,
            }}
            onSubmit={addPrinter}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FloatingLabel label='Serial Number' className='mb-3'>
                    <FormControl
                      type='text'
                      id='serial'
                      placeholder='Serial'
                      onChange={handleChange}
                      value={values.serial_number}
                      isInvalid={
                        touched.serial_number && !!errors.serial_number
                      }
                    ></FormControl>
                    <FormControl.Feedback type='invalid'>
                      {errors.serial_number}
                    </FormControl.Feedback>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='Model' className='mb-3'>
                    <FormControl
                      type='text'
                      id='model'
                      placeholder='Model'
                      onChange={handleChange}
                      value={values.model}
                      isInvalid={touched.model && !!errors.model}
                    ></FormControl>
                    <FormControl.Feedback type='invalid'>
                      {errors.model}
                    </FormControl.Feedback>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='Brand' className='mb-3'>
                    <FormControl
                      type='text'
                      id='brand'
                      placeholder='Brand'
                      onChange={handleChange}
                      value={values.brand}
                      isInvalid={touched.brand && !!errors.brand}
                    ></FormControl>
                    <FormControl.Feedback type='invalid'>
                      {errors.brand}
                    </FormControl.Feedback>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='Location' className='mb-3'>
                    <FormControl
                      type='text'
                      id='location'
                      placeholder='Location'
                      onChange={handleChange}
                      value={values.location}
                      isInvalid={touched.location && !!errors.location}
                    ></FormControl>
                    <FormControl.Feedback type='invalid'>
                      {errors.location}
                    </FormControl.Feedback>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='IP Address' className='mb-3'>
                    <FormControl
                      type='text'
                      id='ip'
                      placeholder='IP Address'
                      onChange={handleChange}
                      value={values.ip_address}
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='MAC Address' className='mb-3'>
                    <FormControl
                      type='text'
                      id='mac'
                      placeholder='MAC Address'
                      onChange={handleChange}
                      value={values.mac_address}
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='Firmware Version' className='mb-3'>
                    <FormControl
                      type='text'
                      id='firmware'
                      placeholder='Firmware Version'
                      onChange={handleChange}
                      value={values.firmware_version}
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='Installation Date' className='mb-3'>
                    <FormControl
                      type='text'
                      id='install_date'
                      placeholder='Installation Date'
                      onChange={handleChange}
                      value={values.installation_date}
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup>
                  <FloatingLabel label='Warranty Expiration' className='mb-3'>
                    <FormControl
                      type='text'
                      id='warranty'
                      placeholder='Warranty Expiration'
                      onChange={handleChange}
                      value={values.warranty_expiry_date}
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
                <ButtonGroup>
                  <Button variant='secondary' onClick={cancelAdd}>
                    Cancel
                  </Button>
                  <Button
                    data-testid='submit-add'
                    variant='primary'
                    type='submit'
                  >
                    Add
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default connector(AddPrinterComponent);
