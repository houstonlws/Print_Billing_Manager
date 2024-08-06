import React from 'react';
import { Card, CardBody, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <Container
        data-testid='home-root'
        className='h-100 d-flex align-items-center justify-content-center'
      >
        <div>
          <Image src='logo.png'></Image>
          <Card>
            <CardBody className='text-center'>
              <h2>Welcome!</h2>
              <div className='d-flex justify-content-center'>
                <Link className='btn btn-primary' to='/login'>
                  Login
                </Link>
                <Link className='btn btn-primary mx-1' to='/register'>
                  Register
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    );
  }
}

export default Home;
