import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { spotDetailsThunk } from '../../store/spots';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../Reviews/ReviewFormModal';
import Reviews from '../Reviews/Reviews';
import { ImStarFull } from 'react-icons/im';
import './SpotDetails.css';


const SpotDetails = () => {
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const owner = useSelector((state) => state.spots[id]?.Owner);
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector((state) => state.reviews[id])
  const dispatch = useDispatch(); 
  console.log(spot)
 
  const showAlert = () => {
    alert('Feature coming soon...')
  }

  const numReviews = () => {
    if(reviews?.length === 1) {
      return (`${reviews.length} Review`)
    }
    if(reviews?.length > 1) {
      return (`${reviews.length} Reviews`)
    }
  }  

  const showReviewButton = () => {
    if(sessionUser && owner?.id !== sessionUser.id) {
      return !reviews || reviews?.every((review) => review.userId !== sessionUser.id)
    }
    return false
  }
  
  useEffect(() => {
    dispatch(spotDetailsThunk(id));
  },[dispatch, id])

  return (
    <div>
      <div className='spot-details-container'>
        {spot && (
          <div>
            <h1>{spot.name}</h1>
            <h2>{spot.city} {spot.state} {spot.country}</h2> 
            <div className='spot-details-content'>
              <div className='main-photo-container'>
                <img src={spot.SpotImages?.[0].url} />
              </div>
              <div className='image-grid-container'>
                <div className='image-grid'>
                {spot.SpotImages?.slice(1).map((image) => (
                  <img src={image.url} key={image.id} />
                ))}
                </div>
              </div>
            </div>
            <div className='spot-details-footer'>
              <div>  
                <h1 className='spot-details-footer-h1'>Hosted by {owner?.firstName} {owner?.lastName}</h1>
                <p>{spot.description}</p>
              </div>
              <div className='price-container'>
                  <div >
                    $ {spot.price} 
                    <span className='night-text'> night </span>
                    <span className='num-reviews'>{numReviews()}</span>
                    <span className='review-stars' style={{ marginLeft: 'auto' }}>
                    {reviews?.length > 0 ? (
                      <>
                        <ImStarFull />
                         {` ${Number(reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)}`}
                         &nbsp;
                         &middot;
                         &nbsp;
                      </>
                        ) : (
                        <div>
                          <ImStarFull style={{ fontSize: 20 }} /> <span style={{ fontSize: 20 }}>New</span>
                        </div> 
                    )}
                    </span>
                    </div>
                  <button onClick={showAlert}>Reserve</button>
              </div>
            </div>
          </div>
          )}
      </div>
      <div>
      <span className='review-stars'>
        {reviews?.length > 0 ? (
        <>
          <ImStarFull />
            {` ${Number(reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)}`}
              &nbsp;
              &middot;
              &nbsp;
            <span className='num-reviews'>{numReviews()}</span>
        </>
        ) : (
        <>
          <ImStarFull style={{ fontSize: 28 }} /> <span style={{ fontSize: 24 }}>New</span>
        </>
        )}
      </span>
        <>
        {showReviewButton() ? (
          <>
            <OpenModalButton
            className='review-button-text'
            buttonText='Post Your Review'
            modalComponent={<ReviewFormModal id={id} owner={owner}/>}
            />
          </>
        ) : (
        <>
        
        </>
        )}
        </>
      </div>
      <div>
        <Reviews id={id}/>
      </div>
    </div>
  )
}

export default SpotDetails;