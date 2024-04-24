import { Fragment, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
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

  // const navigateAdminLogin = () => {
  //   navigate('/login');
  // };

  // const navigateItems = () => {
  //   navigate('/items');
  // };

  // const navigateHome = () => {
  //   navigate('/');
  // };

  return (
    <Fragment>
      
      <div className="navigation-container">
        <Container>
          <Row>
            <Col className='navigation-header'>
              <h1>
                <Link to='/'>Energetic Farm Reservation</Link>
              </h1>

              <div className="left-header">
                <NavLink to="/">Home</NavLink>
                { currentUser && <NavLink to="items">Items</NavLink> }
                { currentUser && <span onClick={handleSignOut}>Logout</span> }
                { !currentUser && <NavLink to="login">Admin Login</NavLink> }
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
              <p>Copyright &copy; {year} Energetic Farm Reservation System. All Rights Reserved.</p>                 
            </Col>
          </Row>
        </Container>
      </div>

    </Fragment>
  )
};


export default Navigation;