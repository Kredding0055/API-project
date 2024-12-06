import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

const loadReviews = (reviews) => {
  return {
      type: LOAD_REVIEWS,
      reviews
  }
};

const addReview = (review) => {
  return {
      type: ADD_REVIEW,
      review
  }
};

const updateReview = (review) => {
  return {
      type: UPDATE_REVIEW,
      review
  }
};

const deleteReview = (id, spotId) => {
  return {
      type: DELETE_REVIEW,
      review: {id, spotId}
  }
};

//thunk action creator
export const loadAllReviews = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}/reviews`);
  // variable can be anything you want. It just is the returned response.json
  if(response.ok) {
      const data = await response.json();
      dispatch(loadReviews(data.Reviews))
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

export const updateReviewDetails = (id, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
  });
  if(response.ok) {
      const reviewDetails = await response.json();
      dispatch(updateReview(reviewDetails));
      return reviewDetails
  }
  else{
      return { message: 'Update review details thunk didnt work' }
  }
}

export const deleteReviewThunk = (id, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
      method: 'DELETE',
  });
  
  if(response.ok) {
      dispatch(deleteReview(id, spotId))
  }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      const newState = { ...state };
      let reviews = newState[action.review.spotId].slice();
        reviews = reviews || [];
        reviews.push(action.review);
        newState[action.review.spotId] = reviews
      return newState;
    }
    case LOAD_REVIEWS: {
      const newState = { ...state };
      action.reviews.forEach((review) => {
        if (!newState[review.spotId]) {
          newState[review.spotId] = [];
        }
        if (newState[review.spotId].length === 0) {
          newState[review.spotId].push(review);
        } else {
          const existingReview = newState[review.spotId].find((r) => r.id === review.id);
          if (!existingReview) {
            newState[review.spotId].push(review);
          }
        }
      });
      return newState;
    }
    case UPDATE_REVIEW: {
      const newState = { ...state }
      const newReviews = newState[action.review.spotId].map(r => {
        if( r.id === action.review.id) {
          return action.review
        }
        return r
      })
      newState[action.review.spotId] = newReviews
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state }
      const newReviews = newState[action.review.spotId].filter(r => {
        if(r.id !== action.review.id) {
          return true
        }
        return false
      })
      newState[action.review.spotId] = newReviews
      return newState
    }
    default:
      return state
  }
}

export default reviewsReducer;