import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { updateSpotDetails, loadAllSpots } from '../../store/spots';
import { useEffect } from 'react';
import './CreateSpot.css'


const UpdateSpot = () => {
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const dispatch = useDispatch('');
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user)
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  //will need to find a way to add mutliple files for photo state
  const [photoUrls, setPhotoUrls] = useState('','','','','');

  const addPhoto = (photo, index) => {
    let photoUrlsCopy = photoUrls.slice()
    photoUrlsCopy[index] = photo;
    setPhotoUrls(photoUrlsCopy)
}

  useEffect(() => {
    dispatch(loadAllSpots())
  }, [dispatch]);

  useEffect(() => {
    if(spot) {
    setAddress(spot.address)
    setCity(spot.city);
    setState(spot.state);
    setCountry(spot.country);
    setName(spot.name);
    setDescription(spot.description)
    setPrice(spot.price)
    }    
  }, [spot])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const spotPayload = {
      address,
        city,
        state,
        country,
        name,
        description,
        lat: 1,
        lng: 1,
        price,
        ownerId: sessionUser.id
    };

    let spot = await dispatch(updateSpotDetails(id, spotPayload));

      if(spot) {
        navigate(`/spots/${spot.id}`)
      }
  }

  if(!sessionUser) {
    return <Navigate to='/' />
  }

  return (
    <div className='create-spot-container'>
      { spot && (
         <div className='create-spot-body'>
         <h1>Update your Spot</h1>
         <form className='create-form'>
         <section>
         <h2>Where&apos;s your place located?</h2>
         <p>Guests will only get your exact address once they booked
             a reservation.
         </p>
         <div className='form-inputs-top'>
         <label>Country</label>
             <input
                 type='text'
                 placeholder='Country'
                 min='2'
                 required
                 value={country}
                 onChange={(e) => setCountry(e.target.value)}
             />
             </div>
             <div className='form-inputs-top'>
             <label>Street Address</label>
             <input
                 type='text'
                 placeholder='Address'
                 min='5'
                 required
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
             />
             </div>
             <div className='city-state-container'>
             <div>
             <label>City</label>
             <input
                 type='text'
                 placeholder='City'
                 min='2'
                 required
                 value={city}
                 onChange={(e) => setCity(e.target.value)}
                 />
                 </div>
             <div>
             <label>State</label>
             <input
                 type='text'
                 placeholder='State'
                 min='2'
                 required
                 value={state}
                 onChange={(e) => setState(e.target.value)}
                 />
                 </div>
             </div>
             <h3>Describe your place to guests</h3>
             <p>Mention the best features of your space, any special
                 amentities like fast wifi or parking, and what you
                 love about the neighborhood.
             </p>
             <textarea className='text-area'
                 type='text'
                 placeholder='Please write at least 30 characters'
                 min='30'
                 required
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
             />
             <div className='bottom-div'>
             <h3>Create a title for your spot</h3>
             <p>Catch guests&apos; attention with a spot title that 
                 highlights what makes your place special.</p>
             <input
                 type='text'
                 placeholder='Name of your spot'
                 min='3'
                 required
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 />
             <h3>Set a base price for your spot</h3>
             <p>Competitive pricing can help your listing stand 
                 out and rank higher in search results.</p>
             <label>$</label>
             <input
                 type='text'
                 inputMode='numeric'
                 pattern='[0-9]'
                 placeholder='Price per night (USD)'
                 min='5'
                 required
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
                 step='any'
                 />
             <h3>Liven up your spot with photos</h3>
             <p>Submit a link to at least one photo to publish your spot.</p>
             <div className='photo-section'>
             <input
                 type='url'
                 placeholder='Preview Image URL'
                 required
                 value={photoUrls[0]}
                 onChange={(e) => addPhoto(e.target.value, 0)}
                 />
             <input
                 type='url'
                 placeholder='Image URL'
                 value={photoUrls[1]}
                 onChange={(e) => addPhoto(e.target.value, 1)}
                 />
             <input
                 type='url'
                 placeholder='Image URL'
                 value={photoUrls[2]}
                 onChange={(e) => addPhoto(e.target.value, 2)}
                 />
             <input
                 type='url'
                 placeholder='Image URL'
                 value={photoUrls[3]}
                 onChange={(e) => addPhoto(e.target.value, 3)}
                 />
             <input
                 type='url'
                 placeholder='Image URL'
                 value={photoUrls[4]}
                 onChange={(e) => addPhoto(e.target.value, 4)}
                 />
             <br/>
             <br/>
             </div>
             <button onClick={handleSubmit}>Update your Spot</button>
             </div>
             </section>  
         </form>
     </div>
      )}
    </div>
    )
};

export default UpdateSpot;