import { useParams } from 'react-router-dom';
import './selected-item.styles.scss';

const SelectedItem = () => {

  const { id } = useParams();
  console.log(id);

  return(
    <div>
      <h1>Hello Selected Item</h1>
    </div>
  )

};

export default SelectedItem;