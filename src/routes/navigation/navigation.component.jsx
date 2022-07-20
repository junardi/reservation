import { Fragment, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const d = new Date();
let year = d.getFullYear();

const Navigation = () => {
  
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async() => {
    await signOutUser();
    navigate('/login');
  };

  const navigateAdminLogin = () => {
    navigate('/login');
  };

  const navigateItems = () => {
    navigate('/items');
  };

  const navigateHome = () => {
    navigate('/');
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

              <div className="left-header">
                <span onClick={navigateHome}>Home</span>
                { currentUser && <span onClick={navigateItems}>Items</span> }
                { currentUser && <span onClick={handleSignOut}>Logout</span> }
                { !currentUser && <span onClick={navigateAdminLogin}>Admin Login</span> }
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main-container">
        <Outlet />
      </div>

      <div className="footer">
        <Container className='footer-inner'>
          <Row>
            <Col>
              <p>Copyright &copy; {year} Damires Hills Reservation System. All Rights Reserved.</p>                 
            </Col>
          </Row>
        </Container>
      </div>

    </Fragment>
  )
};


export default Navigation;