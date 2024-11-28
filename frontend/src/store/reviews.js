import { csrfFetch } from "./csrf";

const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

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
    default:
      return state
  }
}