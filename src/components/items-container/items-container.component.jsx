import { Row, Col, Button } from 'react-bootstrap';
import { Fragment, useContext, useState } from 'react';
import './items-container.styles.scss';

import { ItemsContext } from '../../contexts/items.context';
import ItemCard from '../../components/item-card/item-card.component';
import BookReservation from '../../modals/book-reservation/book-reservation.modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddItem from '../../modals/add-item/add-item.modal';


const ItemsContainer = ({isHome}) => {

  const [modalShow, setModalShow] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState(null);

  const { itemsMap } = useContext(ItemsContext);

  const notify = (message) => toast(message);

  const openReservationModal = (selectedItem) => {
    setSelectedModalItem(selectedItem);
    setModalShow(true);
  };

  const closeReservationModal = (isAdded) => {
    setSelectedModalItem(null);
    setModalShow(false);

    if(isAdded) {
      notify('Reservation request sent. Check your email for details');
    }
 
  };

  /* Below for the add item */
  
  const [addItemShow, setAddItemShow] = useState(false);

  const closeAddItem = () => {
    setAddItemShow(false);
  };

  const openAddItem = (event) => {
    setAddItemShow(true);
  };


  return(
    <Fragment>
      
      {
        !isHome &&
        <Row>
          <Col className="add-item-modal-header">
            <h1>List of Items</h1>
            <Button variant="primary" onClick={openAddItem}>
              Add
            </Button>
          </Col>
        </Row>
      }

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
      
      <AddItem show={addItemShow} onHide={closeAddItem} selectedItem={null} />
      <ToastContainer />

    </Fragment>
  )
};

export default ItemsContainer;