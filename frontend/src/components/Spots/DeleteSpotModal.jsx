import { useDispatch } from 'react-redux'
import { deleteSpotThunk } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css';


function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal, modalRef } = useModal();

  const handleSubmit = async (id) => {
    await dispatch(deleteSpotThunk(id))
    .then(closeModal)

  }

return (
  <div className='delete-modal-container'>
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to remove this spot from the listings?</p>
    <button className='Delete-yes-button Modal-delete-button' onClick={() => handleSubmit(spot.id)}>Yes (Delete Spot)</button>
    <button className='Delete-no-button Modal-delete-button' onClick={closeModal}>No (Keep Spot)</button>
  </div>

)
}

export default DeleteSpotModal;