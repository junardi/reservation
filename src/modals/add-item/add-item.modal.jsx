import { useState, Fragment, useContext, useEffect, useRef } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { uploadFile, getDownloadUrl, addItem, updateReservationItem } from "../../utils/firebase/firebase.utils";  
import './add-item.styles.scss';  
import { ItemsContext } from "../../contexts/items.context";

const defaultFormFields = {
  name: '',
  description: ''
};

const AddItem = ({show, onHide, selectedItem, id}) => {

  const [imageDisplay, setImageDisplay] = useState('');

  const { callReTrigger } = useContext(ItemsContext);

  const [showLoading, setShowLoading] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, description } = formFields;

  useEffect(() => {

    if(selectedItem) {
     
      const { description, file, name } = selectedItem;

      defaultFormFields.name = name;
      defaultFormFields.description = description;

      setFormFields(defaultFormFields);
      setImageDisplay(file[0].downloadUrl);

    } else {

      defaultFormFields.name = '';
      defaultFormFields.description = '';

      setFormFields(defaultFormFields);
      setImageDisplay('');

    }

  }, [selectedItem]);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const selectedFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const handleFileChange = (event) => {
    
    let reader = new FileReader();   
		reader.readAsDataURL(event.target.files[0]);      

    reader.onload = (_event) => { 
      //const img = new Image(); 

			setImageDisplay(reader.result);
      //console.log(reader.result);
    };

    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!selectedItem) {

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
        onHide();
        callReTrigger();
  
      } catch(error) {
        console.log(error);
      }
    } else {

      try {

        if(selectedFile) {
          const upload = await uploadFile(selectedFile, selectedItem.file[0].name);
          const downloadUrl = await getDownloadUrl(upload.metadata.name);
          const data = {
            name: name,
            description: description,
            fileName: upload.metadata.name,
            fileDownloadUrl: downloadUrl
          };
          await updateReservationItem(id, data);
        } else {
          const data = {
            name: name,
            description: description,
            fileName: selectedItem.file[0].name,
            fileDownloadUrl: selectedItem.file[0].downloadUrl
          };
          await updateReservationItem(id, data);
        }
        
        setShowLoading(false);
        onHide();
        callReTrigger();

      } catch(error) {
        console.log(error);
      }
    }

  };


  const handleReset = () => {
    const { description, file, name } = selectedItem;
    defaultFormFields.name = name;
    defaultFormFields.description = description;
    setFormFields(defaultFormFields);
    setImageDisplay(file[0].downloadUrl);
    setSelectedFile(null);
    selectedFileRef.current.value = null;
  };

  return (
    <Fragment>
    
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        className="add-item-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{  selectedItem ? 'Edit Item' : 'Add Item for Reservation' }</Modal.Title>
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
                      <Form.Control type="text" name="name" onChange={handleChange} value={name}></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs="12">
                    <Form.Group className="form-group">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={5} name="description" onChange={handleChange} value={description}></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs="12">
                    <Form.Group className="form-group">
                      <Form.Label>Featured Image</Form.Label>
                      <Form.Control ref={selectedFileRef} type="file" name="file" accept="image/*" onChange={handleFileChange}></Form.Control>
                    </Form.Group>
                  </Col>

                  {
                    imageDisplay &&
                    <Col xs="12">
                      <img src={imageDisplay} alt={`Current Item profileImage`} className="img-fluid" />                     
                    </Col>
                  }

                  <Col xs="12" className="modal-buttons-container">
                    
                    {
                      !selectedItem &&
                      <Button disabled={!name || !description || !selectedFile} type="submit">Add</Button>
                    }

                    {
                      selectedItem && 
                      <Fragment>
                        <Button type="button" variant="secondary" onClick={handleReset}>Reset</Button>
                        <Button disabled={!name || !description} type="submit">Update</Button>
                      </Fragment>
                    }
                    
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
   
      </Modal>
    </Fragment>
  );

};

export default AddItem;