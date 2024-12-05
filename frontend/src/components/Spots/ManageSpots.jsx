import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { ImStarFull } from 'react-icons/im';
import DeleteSpotModal from "./DeleteSpotModal";
import DeleteSpotModalButton from "../DeleteSpotModalButton/DeleteSpotModalButton";
import mainPic from '../../assets/mainPic.jpeg';
import './ManageSpots.css';



function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector((state) => state.spots);
  const ownerId = useSelector((state) => state.session.user.id);
  const allSpots = Object.values(spots)
  const ownerSpots = {};
 
  allSpots.forEach((spot) => {
    if(spot.ownerId === ownerId) {
      ownerSpots[spot.id] = spot
    }
  })

  const handleClick = (id) => {
    navigate(`/spots/${id}/edit`)
  }

  const handleCreateSpot = () => {
    navigate('/spots/newSpot')
  }

  useEffect(() => {
    dispatch(loadAllSpots())
  }, [dispatch]);

  return (
    <div className="main-container">
      <h1>Manage Spots</h1>
        {Object.keys(ownerSpots).length > 0 ? (
        <div className="spots-grid-container">
          {Object.values(ownerSpots).map((spot) => (
          <div key={spot.id} className='spots-grid-item'>
            <Link to={`spots/${spot.id}`}>
              <div className='tooltip-container'>
                <img src={mainPic} alt={spot.name}/>
                <span className='tooltip-text'>{spot.name}</span>
              </div>
              <div className='spots-footer-details'>
                {spot.city} {spot.state}
              <br/>
              <span className='spots-star-average'>
              {spot?.Reviews?.length > 0 ? (
                  <>
                    <ImStarFull /> {spot?.avgRating?.toFixed(2)}
                  </>
                ) : ( 
                  'New'
                )}
              </span>
              </div>
              <br/>
              ${spot.price} Night
            </Link>
            <div className="manage-buttons"> 
            <button className="manage-modal-buttons" onClick={() => handleClick(spot.id)}>Update</button>
            <DeleteSpotModalButton
            spot={spot}
            buttonText='Delete'
            modalComponent={<DeleteSpotModal />}/>
          </div>
          </div>
        ))}
        </div>
      ) : (
        <div className="no-spots-button">
          <button onClick={handleCreateSpot}>Create a New Spot</button>
        </div>
      )}
    </div>
  )
}

export default ManageSpots;