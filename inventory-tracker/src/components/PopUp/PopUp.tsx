import { PropsWithChildren } from 'react';
import './PopUp.css'

//https://dev.to/chukwuma1976/its-popping-pop-ups-made-simple-in-react-5cd8
// Code taken and changed from this tutorial

interface PopUpProps {
  showPopUp: Boolean;
  closePopUp: () => void;
}

function PopUp({ showPopUp, closePopUp, children }: PropsWithChildren<PopUpProps>) {
  if (!showPopUp) { return null }
  return (
    <div className="PopUp" >
      {children}
      <button className="close-popup-button" onClick={closePopUp}>close</button>
    </div>
  );
};

export default PopUp;