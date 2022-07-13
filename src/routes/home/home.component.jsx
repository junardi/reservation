import './home.styles.scss';
import { Container } from 'react-bootstrap';
import ItemsContainer from '../../components/items-container/items-container.component';

const Home = () => {
  return (
    <Container>
      <ItemsContainer></ItemsContainer>
    </Container>
  )
};

export default Home;