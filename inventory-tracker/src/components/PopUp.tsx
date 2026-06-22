import React, { PropsWithChildren } from 'react';
import './popUpStyle.css'
interface PopUpProps{
    showPopUp: Boolean;
    closePopUp: () => void;
}

function PopUp({showPopUp, closePopUp, children}: PropsWithChildren<PopUpProps>){
  if (!showPopUp) {return null}
  return (
    <div className="PopUp" >
        <button onClick={closePopUp}>close</button>
        {children}
    </div>
  );
};

export default PopUp;