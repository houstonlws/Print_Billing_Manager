import React, { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';
import { Printer } from '../../../../../types/printer.types';
import { updatePrinter } from '../../../../../store/actions/printer.actions';
import { Formik } from 'formik';
import * as yup from 'yup';

interface Props {
  printer: Printer;
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  updatePrinter,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type EditProps = ConnectedProps<typeof connector> & Props;

const EditPrinter = (props: EditProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { printer } = props;
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

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const saveEdit = (formData: Printer) => {
    props.updatePrinter(formData);
    toggleEditing();
  };

  const discardEdit = () => {
    toggleEditing();
  };

  return (
    <div>
      <div data-testid={`edit-printer-${printer.id}`}>
        <Button data-testid={`show-editor`} onClick={toggleEditing}>
          Edit
        </Button>
      </div>
      <Modal
        show={editing}
        onHide={discardEdit}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className='d-flex justify-content-center' closeButton>
          <Modal.Title className='me-auto'>Edit Printer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={props.printer}
            onSubmit={saveEdit}
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
                  <Button variant='secondary' onClick={discardEdit}>
                    Cancel
                  </Button>
                  <Button
                    data-testid='submit-edit'
                    variant='primary'
                    type='submit'
                  >
                    Update
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

export default connector(EditPrinter);
