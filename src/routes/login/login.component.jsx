import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js';
import './login.styles.scss';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import energetic from '../../assets/energetic.jpeg';


const defaultFormFields = {
  email: '',
  password: ''
};

const Login = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const resetFormFields = () => {
  //   setFormFields(defaultFormFields);
  // };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      navigate(state?.path || '/items');
    
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert("wrong password")
          break;
        case 'auth/user-not-found':
          alert("user not found");
          break;
        default: 
          console.log(error);
      }
    }

  };


  return(
    <div className="login-container">
      <Container>
        <Row>
          
          <Col>
            <div className="login-wrap">
              <h1>Login</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='form-group'>
                  <Form.Label>User Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder='' onChange={handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className='form-group'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder='' onChange={handleChange}></Form.Control>
                </Form.Group>

                <Button variant="primary" type='sumit'>Login</Button>

              </Form>
            </div>
          </Col>

          <Col>
            <img src={energetic} className='img-fluid' alt={`Damires Hills`} />
          </Col>

        </Row>
      </Container>
    </div>
  )
};

export default Login;