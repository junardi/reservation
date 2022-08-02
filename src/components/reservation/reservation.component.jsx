import './reservation.styles.scss';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';

import { Fragment, useContext } from 'react';
import { ReservationContext } from '../../contexts/reservation.context';

const Reservation = () => {

  const { id } = useParams();

  const { currentReservation } = useContext(ReservationContext);

  return (
    <Container className='reservation-container'>
      <Row>
        <Col className='xs-12'>
          <h5 className='mb-5 mt-3'>Reservation Code: <strong>{id}</strong></h5>
        {
          currentReservation ?
          <Table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{currentReservation.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{currentReservation.email}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{currentReservation.address}</td>
              </tr>
              <tr>
                <td>Message:</td>
                <td>{currentReservation.message}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{currentReservation.phone}</td>
              </tr>
              <tr>
                <td>Reservation Date/Dates:</td>
                <td>
                {
                  Array.isArray(currentReservation.reservationValues) ? 
                  <Fragment>
                    <span>{currentReservation.reservationValues[0].toDate().toDateString()}</span>  
                    <span> - </span>
                    <span>{currentReservation.reservationValues[currentReservation.reservationValues.length - 1].toDate().toDateString()}</span> 
                  </Fragment>
                  : 
                  <span>{currentReservation.reservationValues.toDate().toDateString()}</span>
                }
                </td>
              </tr>
              <tr>
                <td>Date Requested:</td>
                <td>{currentReservation.dateCreated.toDate().toDateString()}</td>
              </tr>
              
              {
                currentReservation.approved ? 
                <tr>
                  <td>Date Approved:</td>
                  <td className='approved'>{currentReservation.dateUpdated.toDate().toDateString()}</td>
                </tr>
                :
                <tr>
                  <td>Date Approved:</td>
                  <td className='not-approved'>Not yet approved.</td>
                </tr>


              }
              
            

            </tbody>
          </Table>
          : <p>No data from selected code.</p>
        }
        </Col>
      </Row>
    </Container>
  )

};

export default Reservation;