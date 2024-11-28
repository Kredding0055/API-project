import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllSpots } from '../../store/spots';
import mainPic from '../../assets/mainPic.jpeg';
import { useEffect } from 'react';
import './Spots.css';


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
            <div className='spots-grid-container'>
                {allSpots?.map((spot) => (
                    <div key={spot.id} className='spots-grid-item'>
                        <Link to={`spots/${spot.id}`}>
                            <img src={mainPic} />
                        {/* <div className='spots-grid-item-info'> */}
                            {spot.city} {spot.state}
                            <br/>
                            <br/>
                            ${spot.price} Night
                            {/* </div> */}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Spots;