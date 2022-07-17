import { Row, Col } from 'react-bootstrap';
import { Fragment, useContext, useState } from 'react';
import './items-container.styles.scss';

import { ItemsContext } from '../../contexts/items.context';
import ItemCard from '../../components/item-card/item-card.component';
import BookReservation from '../../modals/book-reservation/book-reservation.modal';

const ItemsContainer = () => {

  const [modalShow, setModalShow] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);

  const { itemsMap } = useContext(ItemsContext);

  const openReservationModal = (selectedItem) => {
    setSelectedModalItem(selectedItem);
    setModalShow(true);
  };

  const closeReservationModal = (event) => {
    setSelectedModalItem(null);
    setModalShow(false);
  };

  return(
    <Fragment>
      
      <Row>
        <Col xs="12">
          <div className='items-container'>
            {
              Object.keys(itemsMap).map(id => {
                const item =itemsMap[id];
                return <ItemCard key={id} item={item} id={id} openReservationModal={openReservationModal}></ItemCard>
              })
            }
          </div>
        </Col>
      </Row>
      
      {
        selectedModalItem && 
        <BookReservation show={modalShow} onHide={closeReservationModal} selectedModalItem={selectedModalItem}></BookReservation>                                                    
      }
      

    </Fragment>
  )
};

export default ItemsContainer;