import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllSpots } from '../../store/spots';
import { useEffect } from 'react';
import { ImStarFull } from 'react-icons/im';
import mainPic from '../../assets/mainPic.jpeg';
import './Spots.css';


function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots)
    const allSpots = Object.values(spots)
    
    useEffect(() => {
        dispatch(loadAllSpots())
    }, [dispatch])

    return (
        <div className='main-container'>
            <div className='spots-grid-container'>
                {allSpots?.map((spot) => (
                    <div key={spot.id} className='spots-grid-item'>
                        <Link to={`spots/${spot.id}`}>
                            <div className='tooltip-container'>
                                <img src={mainPic} alt={spot.name}/>
                                <span className='tooltip-text'>{spot.name}</span>
                            </div>
                            <div className='spots-footer-details'>
                                <span className='spot-city-state'>
                                    {spot.city} {spot.state}
                                </span>
                                <span className='spots-star-average'>
                                    <ImStarFull /> {spot.avgRating.toFixed(2)}
                                </span>
                            </div>
                            <br/>
                            ${spot.price} Night
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Spots;