import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllSpots } from '../../store/spots';
import './Spots.css';
import { useEffect } from 'react';


function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots)
    const allSpots = Object.values(spots)
    // console.log('allSpots', allSpots)

    useEffect(() => {
        dispatch(loadAllSpots())
    }, [dispatch])
    return (
        <>
            <div>Inside Spots.jsx</div>
            <div className='spots-display'>
                {allSpots?.map((spot) => (
                    <div key={spot.id}>
                        <Link to={`spots/${spot.id}`}>
                            {spot.city} {spot.state}
                            <br/>
                            ${spot.price} Night
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Spots;