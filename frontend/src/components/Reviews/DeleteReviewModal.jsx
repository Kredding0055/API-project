import { useDispatch } from 'react-redux'
import { deleteReviewThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';

function DeleteReview({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (id, spotId) => {
    await dispatch(deleteReviewThunk(id, spotId))
    .then(closeModal)
  }

  return (
    <div className='delete-modal-container'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button className='Delete-yes-button Modal-delete-button' 
      onClick={() => handleSubmit(review.id, review.spotId)}>Yes (Delete Review)
      </button>
      <button className='Delete-no-button Modal-delete-button' 
      onClick={closeModal}>No (Keep Review)
      </button>
    </div>
  )

}

export default DeleteReview;