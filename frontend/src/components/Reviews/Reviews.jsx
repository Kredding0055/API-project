import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadAllReviews } from '../../store/reviews';


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
        <div key={review.id}>
          <p>{review.review}</p>
        </div>
      ))}
      </div>
    </div>
  )

}

export default Reviews;