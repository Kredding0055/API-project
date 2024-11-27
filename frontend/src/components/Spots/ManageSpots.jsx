import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadAllSpots } from "../../store/spots";
import { useEffect } from "react";
import DeleteSpotModal from "./DeleteSpotModal";
import DeleteSpotModalButton from "../DeleteSpotModal/DeleteSpotModalButton";
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

  useEffect(() => {
    dispatch(loadAllSpots())
  }, [dispatch]);

  return (
    <div>
      <h1>Manage Spots</h1>
      <div className='spots-display'>
        {Object.values(ownerSpots).map((spot) => (
          <div key={spot.id}>
                <Link to={`spots/${spot.id}`}>
                {spot.city} {spot.state}
              <br/>
              ${spot.price} Night
            </Link>
            <button className="manage-modal-buttons" onClick={() => handleClick(spot.id)}>Update</button>
            <DeleteSpotModalButton
            spot={spot}
            buttonText='Delete'
            modalComponent={<DeleteSpotModal />}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageSpots;