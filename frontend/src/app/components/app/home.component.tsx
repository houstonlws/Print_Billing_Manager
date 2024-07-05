import React from 'react';
import { Button, Card, CardBody, Container, Image } from 'react-bootstrap';
import withRouter from '../../utilities/withRouter.utility';
import { ConnectedProps, connect } from 'react-redux';


class Home extends React.Component<Props> {
    
    navigate = (path: string) => {
        const { navigate } = this.props.router
        navigate(path)
    }

    render() { 


        return (
            <Container className='h-100 d-flex align-items-center justify-content-center'>
                <div>
                    <Image src="logo.png"></Image>
                    <Card>
                        <CardBody className='text-center'>
                            <h2>Welcome!</h2>
                            <div className='d-flex justify-content-center'>
                                <Button className='mx-1' onClick={() => this.navigate('/login')}>Login</Button>
                                <Button className='mx-1' onClick={() => this.navigate('/register')}>Register</Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        );
    }
}
 

const mapStateToProps = (state: any, props: any) => ({
    router: props.router
});

const mapDispatchToProps = {
  
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default withRouter(connector(Home));
