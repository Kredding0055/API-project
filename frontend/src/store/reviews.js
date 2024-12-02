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

const deleteReview = (id) => {
  return {
      type: DELETE_REVIEW,
      id
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

export const deleteReviewThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
      method: 'DELETE',
  });
  
  if(response.ok) {
      dispatch(deleteReview(id))
  }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
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
      const newState = { ...state };
      action.reviews.forEach((review) => {
        if (!newState[review.spotId]) {
          newState[review.spotId] = [];
        }
        const existingReview = newState[review.spotId].find((r) => r.id === review.id);
        if (!existingReview) {
          newState[review.spotId].push(review);
        }
      });
      return newState;
    }
    default:
      return state
  }
}

export default reviewsReducer;