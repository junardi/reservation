import { useState, Fragment } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { uploadFile, getDownloadUrl, addItem } from "../../utils/firebase/firebase.utils";  
import './add-item.styles.scss';  

const defaultFormFields = {
  name: '',
  description: ''
};

const AddItem = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showLoading, setShowLoading] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, description } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const [selectedFile, setSelectedFile] = useState(null); 
  const handleFileChange = (event) => {
    //console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setShowLoading(true);

    try {

      const upload = await uploadFile(selectedFile);
      const downloadUrl = await getDownloadUrl(upload.metadata.name);
      const item = {
        name: name,
        description: description,
        file: [
          {
            name: upload.metadata.name,
            downloadUrl: downloadUrl
          }
        ]
      };
  
      await addItem(item);
      setShowLoading(false);
      handleClose();

    } catch(error) {
      console.log(error);
    }

  };

  return (
    <Fragment>
      <Col className="add-item-modal-header">
        <h1>List of Items</h1>
        <Button variant="primary" onClick={handleShow}>
          Add
        </Button>
      </Col>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="add-item-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Item for Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !showLoading &&
            <Form onSubmit={handleSubmit}>
              <Container>
                <Row>
                  
                  <Col xs="12">
                    <Form.Group className="form-group">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name="name" onChange={handleChange}></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs="12">
                    <Form.Group className="form-group">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={5} name="description" onChange={handleChange}></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs="12">
                    <Form.Group className="form-group">
                      <Form.Label>Featured Image</Form.Label>
                      <Form.Control type="file" name="file" accept="image/*" onChange={handleFileChange}></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs="12">
                    <Button variant="secondary" type="submit">Add</Button>
                  </Col>

                </Row>
              </Container>
            </Form>
          }

          {
            showLoading &&
            <Container>
              <Row>
                <Col xs="12" className="text-center">
                  <div className="lds-ripple"><div></div><div></div></div>
                </Col>
              </Row>
            </Container>
          }

        </Modal.Body>
        {/*
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      */}
      </Modal>
    </Fragment>
  );

};

export default AddItem;