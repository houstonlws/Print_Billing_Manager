import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, CardBody, FormSelect } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { CONSTANTS } from '../../../../../config/constants';
import { getAllUsers, updateUserType } from '../../../../../store/actions';
import { AppState, TypeMap } from '../../../../../types';

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  admin: state.admin,
});
const mapDispatchToProps = {
  getAllUsers,
  updateUserType,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const SwitchUserType = (props: ReduxProps) => {
  const [updated, setUpdated] = useState<boolean>(false);
  const [switchedType, setSwitchedType] = useState<TypeMap<boolean>>({});
  const { users } = props.admin;

  useEffect(() => {
    const onMount = async () => {
      await props.getAllUsers();
    };
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUserType = (event: any) => {
    let copy = { ...switchedType };
    if (copy[event.target.id]) {
      delete copy[event.target.id];
    } else {
      copy[event.target.id] = true;
    }
    setSwitchedType(copy);
  };

  const submitChanges = async () => {
    let userIds: string[] = [];
    Object.entries(switchedType).forEach((item) => {
      userIds.push(item[0]);
    });
    if (userIds.length > 0) {
      const result = await props.updateUserType(userIds);
      if (result) {
        setUpdated(true);
        await props.getAllUsers();
        window.location.reload();
      }
    }
  };

  return (
    <Card>
      <style>
        {`.changed {
                    background-color: lightyellow!important;
                }`}
      </style>
      <CardBody>
        {updated && <Alert>Users Updated</Alert>}

        <div className='d-flex'>
          <h3 className='me-auto'>Set User Type</h3>
          <Button onClick={submitChanges}>Update</Button>
        </div>
        {users?.map((user) => {
          let change = switchedType[user.id];
          let val = user.type;
          if (change) {
            val =
              user.type === CONSTANTS.ADMIN ? CONSTANTS.USER : CONSTANTS.ADMIN;
          }
          return (
            <div className={`d-flex ${change ? 'changed' : ''}`} key={user.id}>
              <div className='w-100'>{user.email}</div>
              <div className='w-100'>
                <FormSelect id={user.id} value={val} onChange={updateUserType}>
                  <option value={CONSTANTS.ADMIN}>{CONSTANTS.ADMIN}</option>
                  <option value={CONSTANTS.USER}>{CONSTANTS.USER}</option>
                </FormSelect>
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default connector(SwitchUserType);
