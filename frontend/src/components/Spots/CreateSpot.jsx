import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateSpot.css'


function CreateSpot() {
    const dispatch = useDispatch('');
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [photoUrls, setPhotoUrls] = useState(['','','','','']);
    const [errors, setErrors] = useState({});

    const addPhoto = (photo, index) => {
        let photoUrlsCopy = photoUrls.slice()
        photoUrlsCopy[index] = photo;
        setPhotoUrls(photoUrlsCopy)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!address) validationErrors.address = 'Address is required';
        if (!city) validationErrors.city = 'City is required';
        if (!state) validationErrors.state = 'State is required';
        if (!country) validationErrors.country = 'Country is required';
        if (!name) validationErrors.name = 'Name is required';
        if (!description || description.length < 30) validationErrors.description = 'Description needs 30 or more characters';
        if (!price) validationErrors.price = 'Price per night is required';
        if (!photoUrls[0]) validationErrors.photoUrls = 'Preview Image URL is required';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
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
        }
        
        let spot = await dispatch(createSpot(spotPayload));

        if(spot) {
            navigate(`/spots/${spot.id}`)
        }

        reset();
    }
}

    const reset = () => {
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setName('');
        setDescription('');
        setPrice('');
        setPhotoUrls([]);
    }
    

    return (
        <div className='create-spot-container'>
        {sessionUser ? (
            <div className='create-spot-body'>
                <h1>Create a new Spot</h1>
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
                    {errors.country && <p className='error'>{errors.country}</p>}
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
                    {errors.address && <p className='error'>{errors.address}</p>}
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
                    {errors.city && <p className='error'>{errors.city}</p>}
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
                    {errors.state && <p className='error'>{errors.state}</p>}
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
                    {errors.description && <p className='error'>{errors.description}</p>}
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
                    {errors.name && <p className='error'>{errors.name}</p>}
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
                    {errors.price && <p className='error'>{errors.price}</p>}
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
                    {errors.photoUrls && <p className='error'>{errors.photoUrls}</p>}
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
                    <button onClick={handleSubmit}>Create Spot</button>
                    </div>
                    </section>  
                </form>
            </div>
             ) : (
                <h1>Please log in to create a new Spot</h1>
              )} 
        </div>
    )
}

export default CreateSpot;