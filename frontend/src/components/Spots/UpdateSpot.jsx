import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSpotDetails, loadAllSpots } from '../../store/spots';
import { useEffect } from 'react';


const UpdateSpot = () => {
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const dispatch = useDispatch('');
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [description, setDesciption] = useState('')
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
    setDesciption(spot.description)
    setPrice(spot.price)
    }
  }, [spot])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const spotPayload = {
    //   address,
    //   city,
    //   state,
    //   country,
    //   name,
    //   description,
    //   price,
    //   photoUrl
    // };

    // let spot = await dispatch(updateSpotDetails(spotPayload));

      if(spot) {
        navigate(`/spots/${spot.id}`)
      }
  }

  return (
    <div>
      <h1>Welcome to the Update Spot page!!!!</h1>
      { spot && (
        <form>
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
          <p>What do you call your place?</p>
          <input
            type='text'
            placeholder='Name'
            min='3'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Add a Description of your place!</p>
          <input
            type='text'
            placeholder='Description'
            min='25'
            required
            value={description}
            onChange={(e) => setDesciption(e.target.value)}
          />
          <p>Set a price for you place</p>
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
        <button onClick={handleSubmit}>Create Spot</button>
        </div>
      </form>
      )}
    </div>
    )
};

export default UpdateSpot;