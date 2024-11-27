import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { updateSpotDetails, loadAllSpots } from '../../store/spots';
import { useEffect } from 'react';


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
  const [photoUrl, setPhotoUrl] = useState('');

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

    console.log('SpotPayload in the UpdateSpotJSX', spotPayload)
    let spot = await dispatch(updateSpotDetails(id, spotPayload));

      if(spot) {
        navigate(`/spots/${spot.id}`)
      }
  }

  if(!sessionUser) {
    return <Navigate to='/' />
  }

  return (
    <div>
      {}
      <h1>Update your Spot</h1>
      { spot && (
        <form>
          <h2>Where is your place located?</h2>
          <div>
          <p>Street Address</p>
          <input
            type='text'
            placeholder='Address'
            min='5'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p>City</p>
          <input
            type='text'
            placeholder='City'
            min='2'
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <p>State</p>
          <input
            type='text'
            placeholder='State'
            min='2'
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <p>Country</p>
          <input
            type='text'
            placeholder='Country'
            min='2'
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <p>Name of your Place?</p>
          <input
            type='text'
            placeholder='Name'
            min='3'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Description of your place!</p>
          <input
            type='text'
            placeholder='Description'
            min='25'
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Price for you place</p>
          <label>$</label>
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]'
            placeholder='Price'
            min='5'
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step='any'
          />
          <p>Add photos to your Spot!</p>
          <input
            type='url'
            placeholder='Preview Image URL'
            required
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <input
            type='url'
            placeholder='Image URL'
            required
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <input
            type='url'
            placeholder='Image URL'
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <input
            type='url'
            placeholder='Image URL'
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <input
            type='url'
            placeholder='Image URL'
            required
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <br/>
          <br/>
        <button onClick={handleSubmit}>Update your Spot</button>
        </div>
      </form>
      )}
    </div>
    )
};

export default UpdateSpot;