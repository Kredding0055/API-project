import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const SPOT_DETAILS = 'spots/spotDetails';
const ADD_SPOT = 'spots/addSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const spotDetails = (spot) => {
    return {
        type: SPOT_DETAILS,
        spot
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

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
  };

const addReview = (review) => {
    return {
        type: ADD_SPOT,
        review
    }
  };

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
        dispatch(spotDetails(details))
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

export const loadAllReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews`);
    // variable can be anything you want. It just is the returned response.json
    if(response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data))
        return data;
    }
  };

export const createReview = (id, payload) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${id}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
            const review = await response.json();
            dispatch(addReview(review));
            return review;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            if (!Array.isArray(action.spots.Spots)) {
                return state;
              }
            const newState = { ...state }
            action.spots.Spots.forEach((spot) => {newState[spot.id] = spot});
            return newState;
        }
        case SPOT_DETAILS: {
            const newState = { ...state };
            newState[action.spot.id] = action.spot;
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
        case ADD_REVIEW: {
            const newState = { ...state };
            const spot = newState[action.review.spotId];
            if (spot) {
                spot.reviews = spot.reviews || [];
                spot.reviews.push(action.review);
            }
            return newState;
        }
        case LOAD_REVIEWS: {
            return state;
        }
        default:
            return state
    }
}


export default spotsReducer;