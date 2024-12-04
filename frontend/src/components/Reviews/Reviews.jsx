import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadAllReviews } from '../../store/reviews';
import Review from './Review';


function Reviews({ id, owner }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews[id]);
  const sessionUser = useSelector(state => state.session.user);

  const beTheFirstToReview = () => {
    if((reviews?.length === 0 || !reviews) && owner?.id !== sessionUser?.id) {
      return true
    }
    return false
  }
  
  useEffect(() => {
    dispatch(loadAllReviews(id))
  }, [dispatch, id]);

  return (
    <>
    {!beTheFirstToReview() ? (
    <div className='reviews-container'>
      <div>
      {reviews?.slice().reverse().map((review) => (
        <Review key={review.id} review={review}/> ))}
      </div>
      <div>
      </div>
    </div>
    ) : (
      <>
        <h2>Be the first to post a review!</h2>
      </>
    )}
    </>
  )

}

export default Reviews;