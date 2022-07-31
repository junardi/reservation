import './search-code.styles.scss';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchCode = () => {

  const [code, setCode] = useState('');
  const navigate  = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setCode(value.trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/reservation/${code}`);
  };

  return(
    <Row className='search-code-container'>
      <Col xs="12">
        <Form onSubmit={handleSubmit}>
          <Form.Group className='form-group mb-0'>
            <Form.Control 
              type="text" 
              placeholder="Enter code" 
              name="code"
              onChange={handleChange}
            />
          </Form.Group>

          <Button disabled={!code} variant="secondary" type="submit">
            View Status
          </Button>
        </Form>
      </Col>
    </Row>
  )
};

export default SearchCode;