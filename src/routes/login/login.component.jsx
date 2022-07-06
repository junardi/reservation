import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login.styles.scss';

const Login = () => {
  return(
    <div className="login-container">
      <Container>
        <Row>
          
          <Col>
            <div className="login-wrap">
              <h1>Login</h1>
              <Form>
                <Form.Group className='form-group'>
                  <Form.Label>User Email</Form.Label>
                  <Form.Control type="email" placeholder=''></Form.Control>
                </Form.Group>
                <Form.Group className='form-group'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder=''></Form.Control>
                </Form.Group>

                <Button variant="primary" type='sumit'>Login</Button>

              </Form>
            </div>
          </Col>

          <Col>
            <img src="https://images.summitmedia-digital.com/spotph/images/2020/10/29/damires5-1603972972.jpg" alt={`Damires Hills`} />
          </Col>

        </Row>
      </Container>
    </div>
  )
};

export default Login;