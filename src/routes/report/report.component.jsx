import './report.styles.scss';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useState, useEffect, Fragment } from 'react';

import { getAllReservations } from '../../utils/firebase/firebase.utils';



const Report = () => {

    const [list , setList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {        
        const getReservations = async() => {
            const reservations = await getAllReservations();
            const filterList = reservations.filter(el => el.approved === true);

            const filteredList = filterList.filter((el) => {
                const dateApproved = el.dateUpdated.toDate();
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
        
                if (start && end) {
                    return dateApproved >= start && dateApproved <= end;
                }
                if (start) {
                    return dateApproved >= start;
                }
                if (end) {
                    return dateApproved <= end;
                }
                return true;
            });


            setList(filteredList);
        };
        getReservations();
    }, [startDate, endDate]);

    console.log('list is ', list);


    
      return (
        <Container fluid className='report-container'>
          <Row>
            <Col>
              <h1 className='text-center py-5'>Report</h1>
            </Col>
          </Row>

          <Row>
            <Col>
                <label htmlFor="date">Start</label> &nbsp;
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Col>

            <Col>
                <label htmlFor="date">End</label> &nbsp;
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col>


              <Table striped>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Message</th>
                    <th>Reservation Date/ Dates</th>
                    <th className='text-center'>Date Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((el) => {
                    return (
                      <tr key={el.id}>
                        <td>{el.itemName}</td>
                        <td>{el.name}</td>
                        <td>{el.phone}</td>
                        <td>{el.email}</td>
                        <td>{el.address}</td>
                        <td>{el.message}</td>
                        <td>
                        {
                          Array.isArray(el.reservationValues) ? 
                          <Fragment>
                            <span>{el.reservationValues[0].toDate().toDateString()}</span>  
                            <span> - </span>
                            <span>{el.reservationValues[el.reservationValues.length - 1].toDate().toDateString()}</span> 
                          </Fragment>
                          : 
                          <span>{el.reservationValues.toDate().toDateString()}</span>
                        }
                        </td>
                        <td>
                            {
                            el.approved &&
                            el.dateUpdated.toDate().toDateString()
                          }
                        </td>
                      </tr>


                    );
                  })}
                </tbody>
              </Table>

              <Button className='printButton' onClick={() => window.print()}>Print</Button>
            </Col>
          </Row>
        </Container>
      );
    

};

export default Report;