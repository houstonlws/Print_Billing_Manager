import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
  FormControl,
  FormSelect,
  Modal,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import * as yup from 'yup';
import { maintenanceTypes } from '../../../../../config/app-data';
import { addMaintenanceRequest } from '../../../../../store/actions/printer.actions';
import { AppState, MaintenanceRequest, Printer } from '../../../../../types';

interface Props {}

const mapStateToProps = (state: AppState) => ({
  printers: state.printer.printers,
  depId: state.account.user.department_id,
});

const mapDispatchToProps = {
  addMaintenanceRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReportProps = ConnectedProps<typeof connector> & Props;

const ReportIssue = (props: ReportProps) => {
  const today = new Date().toISOString().split('T')[0];

  const [reporting, setReporting] = useState<boolean>(false);
  const { printers } = props;

  const schema = yup.object().shape({
    maintenance_type: yup.string().required('Maintenance type required'),
    description: yup.string().required('Description required'),
    printer_id: yup.string().required('Printer required'),
  });

  const toggleReporting = () => {
    setReporting((prev) => !prev);
  };

  const submitReport = async (formData: MaintenanceRequest) => {
    await props.addMaintenanceRequest(formData);
    toggleReporting();
  };

  const cancelReport = () => {
    toggleReporting();
  };

  return (
    <div data-testid={'report-issue-root'}>
      <div>
        <Button data-testid={`report-toggler`} onClick={toggleReporting}>
          Add Request
        </Button>
      </div>
      <Modal
        show={reporting}
        onHide={cancelReport}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className='d-flex justify-content-center' closeButton>
          <Modal.Title className='me-auto'>Request Maintenance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              id: '',
              printer_id: '',
              department_id: props.depId,
              request_date: today,
              maintenance_type: '',
              description: '',
              status: 'Pending',
            }}
            onSubmit={submitReport}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <FloatingLabel label='Printer' className='mb-3'>
                  <FormSelect
                    id='printer_id'
                    data-testid='printer_id'
                    onChange={handleChange}
                    value={values.printer_id || ''}
                    isInvalid={touched.printer_id && !!errors.printer_id}
                  >
                    <option value=''>--Select A Printer</option>
                    {printers?.map((printer: Printer, index) => (
                      <option value={printer.id} key={index}>
                        {`${printer.location} - ${printer.brand} - ${printer.model}`}
                      </option>
                    ))}
                  </FormSelect>
                  <FormControl.Feedback type='invalid'>
                    {errors.printer_id}
                  </FormControl.Feedback>
                </FloatingLabel>
                <FloatingLabel label='Maintenance Type' className='mb-3'>
                  <FormSelect
                    className='form-control'
                    id='maintenance_type'
                    data-testid='maintenance_type'
                    onChange={handleChange}
                    value={values.maintenance_type}
                    isInvalid={
                      touched.maintenance_type && !!errors.maintenance_type
                    }
                  >
                    <option value=''>--Select A Maintenance Reason</option>
                    {maintenanceTypes?.map((type, index) => (
                      <option value={type} key={index}>
                        {type}
                      </option>
                    ))}
                  </FormSelect>
                  <FormControl.Feedback type='invalid'>
                    {errors.maintenance_type}
                  </FormControl.Feedback>
                </FloatingLabel>
                <FloatingLabel label='Description' className='mb-3'>
                  <FormControl
                    type='text'
                    id='description'
                    placeholder='description'
                    onChange={handleChange}
                    value={values.description}
                    isInvalid={touched.description && !!errors.description}
                  ></FormControl>
                  <FormControl.Feedback type='invalid'>
                    {errors.description}
                  </FormControl.Feedback>
                </FloatingLabel>
                <ButtonGroup>
                  <Button variant='secondary' onClick={cancelReport}>
                    Cancel
                  </Button>
                  <Button
                    data-testid='submit-report'
                    variant='success'
                    type='submit'
                  >
                    Submit
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

export default connector(ReportIssue);
