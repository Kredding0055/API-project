import { useSelector } from "react-redux";
import UpdateReview from "./UpdateReviewModal";
import DeleteReview from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function Review({ review }) {
  const sessionUser = useSelector(state => state.session.user);



  return (
    <div>
      <p>{review.review}</p>
      {sessionUser.id === review.userId ? (
        <>
          <OpenModalButton
          className='user-review-modal-button'
          buttonText='Update'
          modalComponent={<UpdateReview currReview={review} />}
          />
          <OpenModalButton
          className='user-review-modal-button'
          buttonText='Delete'          
          modalComponent={<DeleteReview review={review}/>}
          />
        </>
      ): (
        <></>
      )}
    </div>
  )
}

export default Review;