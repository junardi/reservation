
import { Container} from 'react-bootstrap';

import './items.styles.scss';
import ItemsContainer from '../../components/items-container/items-container.component';


const Items = () => {
  
  return(
    <Container>
      {
        // <Row>
        //   <AddItem />
        // </Row>
      }
      <ItemsContainer></ItemsContainer>
    </Container>
  )

};

export default Items;