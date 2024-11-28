import { useModal } from '../../context/Modal';
import './DeleteSpotModalButton.css';
import React from 'react';

function DeleteSpotModalButton({
  spot,
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(() => React.cloneElement(modalComponent, {spot}));
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className='manage-modal-buttons' onClick={onClick}>{buttonText}</button>;
}

export default DeleteSpotModalButton;



// import { useModal } from '../../context/Modal';
// import { useDispatch } from 'react-redux';
// import { deleteSpotThunk } from '../../store/spots';
// import './DeleteSpotModal.css';



// function DeleteSpotModal() {

// const handleSubmit = async (id) => {
//   await dispatch(deleteSpotThunk(id))
// }


// return (
//   <>
//     <h1>Confirm Delete</h1>
//     <h2>Are you sure you want to remove this spot from the listings?</h2>
//     <button onClick={() => handleSubmit(spot.id)}>Yes(Delete Spot)</button>
//     <button>No(Keep Spot)</button>
//   </>

// )
// }

// export default DeleteSpotModal;

