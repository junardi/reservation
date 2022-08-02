import './selected-reservation.styles.scss';
import Reservation from '../../components/reservation/reservation.component';
import { ReservationProvider } from '../../contexts/reservation.context';

const SelectedReservation = () => {
  return(
    <ReservationProvider>
      <Reservation />
    </ReservationProvider>
  )
};

export default SelectedReservation;