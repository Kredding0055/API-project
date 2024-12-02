import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadAllReviews } from '../../store/reviews';
import Review from './Review';


function Reviews({ id }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews[id]);
  
  useEffect(() => {
    dispatch(loadAllReviews(id))
  }, [dispatch, id]);

  return (
    <div className='reviews-container'>
      <div>
      {reviews?.slice().reverse().map((review) => (
        <Review key={review.id} review={review}/> ))}
      </div>
      <div>
      </div>
    </div>
  )

}

export default Reviews;