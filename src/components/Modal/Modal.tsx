import React from "react";
import "./styles.css";
interface Props {
    heading: string,
    onContinue: Function,
}
const Modal: React.FC<Props> = (props: Props) => {
    const {heading,onContinue} = props;
  return (
    <div className="modalContainer">
      <div className="modalBox">
          <div className="modal-heading">Congratulations !!</div>
          <div className="modal-text">{heading}</div>
          <div className="continue-button" onClick={()=>{onContinue()}}>Continue</div>
          </div>
    </div>
  );
};

export default Modal;
