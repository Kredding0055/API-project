import { useState, useEffect,  } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './Reviews.css';


function ReviewFormModal() {
  const { modalRef, closeModal } = useModal(); 
  // const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();


  } 
  
  return (
    <div className='review-modal-container'>
      <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className='review-input'
            type='text'
            placeholder='Leave your review here...'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <br/>
          <button
            className='Review-submit-button'
            disabled={submitDisabled}
            type='submit'
          >Submit Your Review</button>
        </form>
    </div>
  )
}

export default ReviewFormModal;