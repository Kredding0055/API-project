import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';


function CreateSpot() {
    const dispatch = useDispatch('');
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDesciption] = useState('')
    const [price, setPrice] = useState('')
    const [photoUrl, setPhotoUrl] = useState('');
    // console.log('session user', sessionUser)

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
        }
        console.log('spot payload in create spot', spotPayload);
        let spot = await dispatch(createSpot(spotPayload));

        if(spot) {
            navigate(`/spots/${spot.id}`)
        }

        reset();
    }

    const reset = () => {
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setName('');
        setDesciption('');
        setPrice('');
        setPhotoUrl('');
    }
    

    return (
        <>
        {sessionUser ? (
            <>
            <h2>Create a new Spot</h2>
            <form>
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
                {/* <input
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
                /> */}
                <br/>
                <br/>
                <button onClick={handleSubmit}>Create Spot</button>
            </form>
            </>
             ) : (
                <h1>Please log in to create a new Spot</h1>
              )} 
        </>
    )
}

export default CreateSpot;