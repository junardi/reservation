import { useState, Fragment, useContext } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './book-reservation.styles.scss';
import { addReservation } from "../../utils/firebase/firebase.utils";
import { ItemsContext } from "../../contexts/items.context";
import { useEffect } from "react";

const dateToday = new Date();
dateToday.setDate(dateToday.getDate() + 1);
const year = dateToday.getFullYear();
const month = dateToday.getMonth();
const dayOfTheMonth = dateToday.getDate();

//const dateToDisable = new Date(2022, 6, 18);
//const arrayOfDateToDisable = [new Date(2022, 6, 18).toDateString(), new Date(2022, 6, 19).toDateString(), new Date(2022, 6, 20).toDateString()];                                      



const defaultFormFields = {
  name: '',
  email: '',
  phone: '',
  address: '',
  message: ''
};


const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//const sampleArray = ["Hi", "Hello"];

const BookReservation = ({show, onHide, selectedModalItem}) => {

  //console.log(selectedModalItem);
 

  const { doGetItemReservations  } = useContext(ItemsContext);
  const [itemReservationsArray, setItemReservationsArray] = useState([])

  useEffect(() => {
    
    const arrayOfDateToDisable = [];

    const getItemReservations = async() => {
      const itemReservations = await doGetItemReservations(selectedModalItem.id);
    
      Object.keys(itemReservations).every((id) => {
      
        const reservationValues = itemReservations[id]['reservationValues'];
        
        if(Array.isArray(reservationValues)) {
          reservationValues.every(obj => {
            arrayOfDateToDisable.push(obj.toDate().toDateString());
            return true;
          });
        } else {
          arrayOfDateToDisable.push(reservationValues.toDate().toDateString());
        }

        
        setItemReservationsArray(arrayOfDateToDisable);

        return true;
      });

    };

    getItemReservations();
  
  }, [doGetItemReservations, selectedModalItem.id]);


  // useEffect(() => {
  //   console.log(itemReservationsArray);
  // }, [itemReservationsArray]);


  const [selectedBooking, setSelectedBooking] = useState('');
  
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, phone, address, message } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const [value, onChange] = useState(null);
  const [isRange, setIsRange] = useState(false);

  const handleIsRange = (event) => {
    setIsRange(event.target.checked);
    onChange(null);
    setSelectedBooking('');
  };

  const setCalendarValue = (val) => {
  
    if(Array.isArray(val)) {
      const mappedValue = val.map(element => {
        return element.toDateString();
      });      
      setSelectedBooking(mappedValue);
    } else {
      setSelectedBooking(val.toDateString());
    }

    onChange(val);
    
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    let dateValue = null;
    
    if(Array.isArray(value)) {
      const start = value[0];
      const end = value[1];

      const dateRange = getDatesInRange(start, end);
      dateRange.unshift(start);
      dateValue = dateRange;

    } else {
      dateValue = value;
    }

    //console.log(dateValue);

    const data = {
      reservationValues: dateValue,
      name: name,
      email: email, 
      phone: phone,
      address: address,
      message: message
    };

    try {
      await addReservation(selectedModalItem.id, data);
      onHide(true);
    } catch(error) {
      console.log(error);
    }

  };

  const tileDisabled = ({activeStartDate, date, view}) => {
    //console.log(itemReservationsArray);
    if(itemReservationsArray) {
      const isFound = itemReservationsArray.find(x => x === date.toDateString());
      return date.toDateString() === isFound;
    }
  };

  const getDatesInRange = (startDate, endDate) => {
    
    const date = new Date(startDate.getTime());
    
    date.setDate(date.getDate() + 1);

    const dates = [];
  
    while (date < endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };


  return (

    <Fragment>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        backdrop="static"
        keyboard={false}
        className="book-reservation-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Book Reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {
            selectedModalItem &&
            <Container className="item-details">
              <Row>
                <Col xs="12">
                  <img src={selectedModalItem.file[0].downloadUrl} alt={`${selectedModalItem.file[0].name}`} className="img-fluid" />
                  <h3>{selectedModalItem.name}</h3>
                  <p>{selectedModalItem.description}</p>
                </Col>
              </Row>
            </Container>
          }
          
          <Form>
            <Container>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={isRange} onChange={handleIsRange} value="" id="flexCheckIndeterminate" />
                <label className="form-check-label">
                  Select Range for multiple day reservation
                </label>
              </div>

              {
                itemReservationsArray &&
                <Calendar 
                  onChange={setCalendarValue} 
                  value={value} 
                  locale="en" 
                  minDate={new Date(year, month, dayOfTheMonth)} 
                  selectRange={isRange} 
                  tileDisabled={tileDisabled}
                  className="book-react-calendar"
                />          
              }

              {
                selectedBooking && 
                <p className="selected-booking">
                  Selected Date: 
                  <span>
                    {
                      Array.isArray(selectedBooking) ? selectedBooking.join(' to ') : selectedBooking
                    }
                  </span>
                </p>
              }

            </Container> 
            
            <Container className="mt-5">
              <Row>
                
                <Col xs="6">
                  <Form.Group className="form-group">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange}></Form.Control>
                  </Form.Group>
                </Col>

                <Col xs="6">
                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} placeholder="sample@gmail.com"></Form.Control>
                  </Form.Group>
                </Col>

                <Col xs="6">
                  <Form.Group className="form-group">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" name="phone" onChange={handleChange}></Form.Control>
                  </Form.Group>
                </Col>

                <Col xs="6">
                  <Form.Group className="form-group">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" onChange={handleChange}></Form.Control>
                  </Form.Group>
                </Col>

                <Col xs="12">
                  <Form.Group className="form-group">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} name="message" onChange={handleChange}></Form.Control>
                  </Form.Group>
                </Col>

              </Row>

            </Container>
          
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button disabled={!value || !name || !isValidEmail(email) || !phone || !address || !message} onClick={handleSubmit}>Book Reservation</Button>
        </Modal.Footer>

      </Modal>  
     
    </Fragment>
  )

};

export default BookReservation;