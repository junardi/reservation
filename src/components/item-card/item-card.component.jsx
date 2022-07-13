
import './item-card.styles.scss';


const ItemCard = ({item, openReservationModal}) => {

  const { name, file, description } = item;

  const bookReservation = (event) => {
    openReservationModal(true);
  };

  return(
    <div className='item-card-container'>
      <img src={file[0].downloadUrl} className="img-fluid" alt={`${name}`} />
      <div className="details-container">
        <h3>{name}</h3>
        <p className='description'>{description}</p>

        <div className="book-reservation-button" onClick={bookReservation}>
          <h3>Book Reservation</h3>
        </div>

      </div>
    </div>
  ) 

};

export default ItemCard;