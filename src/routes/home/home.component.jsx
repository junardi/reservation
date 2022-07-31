import './home.styles.scss';
import { Container } from 'react-bootstrap';
import ItemsContainer from '../../components/items-container/items-container.component';
import SearchCode from '../../components/search-code/search-code.component';

const Home = () => {
  return (
    <Container>
      <SearchCode />
      <ItemsContainer isHome={true}></ItemsContainer>
    </Container>
  )
};

export default Home;