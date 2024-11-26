import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
// const SPOT_DETAILS = 'spots/spotDetails';
const ADD_SPOT = 'spots/addSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot'

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}


const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}

//thunk action creator
export const loadAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);
    // variable can be anything you want. It just is the returned response.json
    if(response.ok) {
        const data = await response.json()
        // console.log('data', data)
        dispatch(loadSpots(data))
        return data;
    }
}

export const spotDetailsThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);

    if(response.ok) {
        const details = await response.json();
        dispatch(addSpot(details))
        return details;
    }
    else{
        return { message: 'Spot details thunk issue'}
    }
}

export const createSpot = (payload) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const spotData = await response.json();
        dispatch(addSpot(spotData));
        return spotData;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
}


export const updateSpotDetails = (id, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if(response.ok) {
        const spotDetails = await response.json();
        dispatch(updateSpot(spotDetails));
        return spotDetails
    }
    else{
        return { message: 'Update spot details thunk didnt work' }
    }
}

export const deleteSpotThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
    });
    
    if(response.ok) {
        dispatch(deleteSpot(id))
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            console.log('Action:', action)
            if (!Array.isArray(action.spots.Spots)) {
                console.error('Expected action.Spots to be an array.');
                return state;
              }
            const newState = { ...state }
            action.spots.Spots.forEach((spot) => {newState[spot.id] = spot});
            return newState;
        }
        case ADD_SPOT: {
            //this is for the create spot thunk
            if(!state[action.spot.id]) {
                const newState = {
                    ...state, [action.spot.id]: action.spot
                }
                return newState
            }
            else {
                const newState = { ...state };
                newState[action.spot.id] = action.spot;
                return newState;
        }
        }
        case UPDATE_SPOT: {
            const newState = { ...state}
            newState[action.spot.id] = action.spot
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state
    }
}


export default spotsReducer;