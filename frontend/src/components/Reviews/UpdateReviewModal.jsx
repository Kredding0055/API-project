import { useState, useEffect,  } from 'react';
import { useDispatch } from 'react-redux';
import { updateReviewDetails } from '../../store/reviews';
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { useModal } from '../../context/Modal';


function UpdateReview({ currReview }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState(currReview.review);
  const [starRating, setStarRating] = useState(currReview.stars);
  const [hover, setHover] = useState(0)
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { closeModal } = useModal();
  // const [errors, setErrors] = useState({});

  const starFilled = (num) => {
    setStarRating(num);
  }

  const handleHover = (num) => {
    setHover(num);
  }

  useEffect(() => {
    if(starRating > 0 && review.length >= 10) {
      setSubmitDisabled(false)
    }
    else {
      setSubmitDisabled(true)
    }
  }, [starRating, review])

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewPayload = {
      review,
      stars: starRating
    }

    dispatch(updateReviewDetails(currReview.id, reviewPayload));
    closeModal()

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
          <div className='star-rating-container'>
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index}>
                {(starRating >= index || hover >= index) ? (
                  <ImStarFull 
                    className='star-rating' 
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHover(0)}
                    onClick={() => starFilled(index)}
                  />
                ) : (
                  <ImStarEmpty 
                    className='star-rating' 
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHover(0)}
                    onClick={() => starFilled(index)}
                  />
                )}
              </div>
            ))}
            <h3>Stars</h3>       
          </div>
          <button
            className={submitDisabled ? 'Review-submit-button' : 'Review-submit-button-enabled  '}
            disabled={submitDisabled}
            type='submit'
          >Submit Your Review</button>
        </form>
    </div>
  )
}

export default UpdateReview;