import { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss';

const Navigation = () => {
  
  return (
    <Fragment>
      
      <div className="navigation-container">
        <Container>
          <Row>
            <Col className='navigation-header'>
              <h1>
                <Link to='/'>Damires Hills Reservation</Link>
              </h1>
            </Col>
          </Row>
        </Container>
      </div>

      <Outlet />

    </Fragment>
  )


};






export default Navigation;