import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { deleteSpotThunk, loadAllSpots } from "../../store/spots";
import { useEffect } from "react";



function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const ownerId = useSelector((state) => state.session.user.id);
  const allSpots = Object.values(spots)
  const ownerSpots = {};
 
  allSpots.forEach((spot) => {
    if(spot.ownerId === ownerId) {
      ownerSpots[spot.id] = spot
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(deleteSpotThunk(id))
  }


  useEffect(() => {
    dispatch(loadAllSpots())
  }, [dispatch]);

  return (
    <div>
      <h1>In the owner/ current spots owned page</h1>
      <div className='spots-display'>
        {Object.values(ownerSpots).map((spot) => (
          <div key={spot.id}>
                <Link to={`spots/${spot.id}`}>
                {spot.city} {spot.state}
              <br/>
              ${spot.price} Night
            </Link>
            <button>Update</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )

}

export default ManageSpots;