import { Container, Row, Col } from 'react-bootstrap';
import ImageGallery from "react-image-gallery";
import jade1 from '../../assets/jade1.jpg';
import jade2 from '../../assets/jade2.jpg';
import jade3 from '../../assets/jade3.jpg';
import jade4 from '../../assets/jade4.jpg';


const images = [
    {
        original: jade1,
        thumbnail: jade1,
    },
    {
        original: jade2,
        thumbnail: jade2,
    },
    {
        original: jade3,
        thumbnail: jade3,
    },
    {
        original: jade4,
        thumbnail: jade4,
    },
];

const Gallery = () => {



  return (
    <Container>
        <Row>
            <Col>
                <h1 className='text-center my-5'>Gallery of Images</h1>
                <ImageGallery items={images} />
            </Col>
        </Row>
    </Container>
  )
};

export default Gallery;