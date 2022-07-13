import { Fragment, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async() => {
    await signOutUser();
    navigate('/login');
  };

  return (
    <Fragment>
      
      <div className="navigation-container">
        <Container>
          <Row>
            <Col className='navigation-header'>
              <h1>
                <Link to='/'>Damires Hills Reservation</Link>
              </h1>

              { currentUser && <span onClick={handleSignOut}>Logout</span> }
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main-container">
        <Outlet />
      </div>

    </Fragment>
  )
};


export default Navigation;