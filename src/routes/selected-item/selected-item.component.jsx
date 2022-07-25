import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './selected-item.styles.scss';
import { ItemsContext } from '../../contexts/items.context';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import AddItem from '../../modals/add-item/add-item.modal';


const SelectedItem = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { doGetItemDataById, doApproveReservation, doDeleteReservation, doDeleteItem, callReTrigger, doDeleteFile } = useContext(ItemsContext);

  const [selectedItem, setSelectedItem] = useState(null);

  const [reset, setReset] = useState(false);


  useEffect(() => {
    const getSelectedItem = async() => {
      const item = await doGetItemDataById(id);
      setSelectedItem(item);
    };

    getSelectedItem(); 
  }, [doGetItemDataById, id, reset]);

  const handleCancelReservation = async(event, reservationId) => {
    try {
      await doDeleteReservation(id, reservationId);
      setReset(!reset);
    } catch(error) {
      console.log(error);
    }
  };

  const handleApproveRequest = async(event, reservationId) => {
    try {
      await doApproveReservation(id, reservationId);
      setReset(!reset);
    } catch(error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async(event, filename) => {

    //console.log(filename);

    try {
      await doDeleteItem(id);
      await doDeleteFile(filename);
      callReTrigger();
      navigate('/items', { replace: true });
    } catch(error) {
      console.log(error);
    }

  };

  /* below for the add item modal */

  const [addItemShow, setAddItemShow] = useState(false);

  const closeAddItem = () => {
    setAddItemShow(false);
  };

  const openAddItem = (event) => {
    setAddItemShow(true);
  };



  if(selectedItem) {

    const { description, file, name, reservations, price} = selectedItem;

    return(

      <Fragment>
        <Container className='selected-item-container'>
          <Row>
            <Col xs="4">
              <img src={file[0].downloadUrl} alt={`${file[0].name}`} className="img-fluid" />                                   
            </Col>
            <Col xs="8">
              <h1 
                className='selected-item-header'
              >
                <strong>{name}</strong> 
                <span className='actions-container'>

                  <span 
                    className='trash-icon-container'
                    onClick={event => handleDeleteItem(event, file[0].name)}
                  >
                    <Trash className='trash-icon' /> Delete
                  </span>
                    
                  <span
                    className='edit-icon-container'
                    onClick={openAddItem}
                  >
                    <PencilSquare className='edit-icon' /> Edit
                  </span>

                </span>
              
              </h1>
              <p>{description}</p>
              <p>&#8369; <strong>{price}</strong></p>
            </Col>
          </Row>

          <Row className='mt-5'>
            <Col xs="12">
              <h3><strong>Reservations</strong></h3>
              <Table striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Message</th>
                    <th>Date Requested</th>
                    <th className='text-center'>Date Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    reservations.map((el, index) => (
                      
                      <tr key={index}>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.phone}</td>
                        <td>{el.address}</td>
                        <td>{el.message}</td>
                        <td>{el.dateCreated.toDate().toDateString()}</td>
                        <td className='button-actions-container text-center'>
                          
                          {
                            !el.approved &&
                            <Fragment>
                              <Button className='btn-danger' onClick={event => handleCancelReservation(event, el.reservationId)}>Cancel</Button>                              
                              <Button onClick={event => handleApproveRequest(event, el.reservationId)}>Approve</Button>
                            </Fragment>
                          }  

                          {
                            el.approved &&
                            el.dateUpdated.toDate().toDateString()
                          }
                        
                        </td>
                      </tr>
                      
                    ))      
                  }
                </tbody>
              </Table>
            </Col>
          </Row>


        </Container>

        <AddItem show={addItemShow} onHide={closeAddItem} selectedItem={selectedItem} id={id} />
      </Fragment>
    
    )

  }

};

export default SelectedItem;