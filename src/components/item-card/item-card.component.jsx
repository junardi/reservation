import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './item-card.styles.scss';
import { UserContext } from '../../contexts/user.context';

const ItemCard = ({item, openReservationModal, id}) => {

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { name, file, description } = item;

  const bookReservation = (event) => {
    
    item.id = id;
    
    openReservationModal(item);
  };

  const navigateToSelectedItem = () => {
    navigate(`/items/${id}`);
  };

  return(
    <div className='item-card-container'>
      <img src={file[0].downloadUrl} className="img-fluid" alt={`${name}`} />
      <div className="details-container">
        <h3>{name}</h3>
        <p className='description'>{description}</p>

        {
          !currentUser &&
          <div className="book-reservation-button" onClick={bookReservation}>
            <h3>Book Reservation</h3>
          </div>
        }

        {
          currentUser &&
          <div className="book-reservation-button wide" onClick={navigateToSelectedItem}>
            <h3>View item</h3>
          </div>
        }






      </div>
    </div>
  ) 

};

export default ItemCard;