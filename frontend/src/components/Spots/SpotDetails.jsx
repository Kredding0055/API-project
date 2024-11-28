import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { spotDetailsThunk } from '../../store/spots';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../Reviews/ReviewFormModal';
import mainPic from '../../assets/mainPic.jpeg';
import secondPic from '../../assets/secondPic.jpeg';
import thirdPic from '../../assets/thirdPic.jpeg';
import fourthPic from '../../assets/fourthPic.jpeg';
import fifthPic from '../../assets/fifthPic.jpeg';
import './SpotDetails.css';


const SpotDetails = () => {
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id])
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(spotDetailsThunk(id))
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
              <img src={mainPic}/>
            </div>
              <div className='image-grid-container'>
                <div className='image-grid'>
                  <img src={secondPic} />
                  <img src={thirdPic}/>
                  <img src={fourthPic}/>
                  <img src={fifthPic}/>
                </div>
            </div>
          </div>  
                <h2 >{spot.price}</h2>
          </div>
          )}
      </div>
      <div>
        <OpenModalButton
          className='review-button-text'
          buttonText='Post Your Review'
          modalComponent={<ReviewFormModal />}
          />
      </div>
      <div>
        {/* {spot.numReviews} */}
      </div>
    </div>
  )
}

export default SpotDetails;