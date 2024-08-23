import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContentState] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const setModalContent = (content) => {
    console.log("Setting modalContent to:", content);
    setModalContentState(content);
  };

  const closeModal = () => {
    console.log("closeModal function called");
    console.log("Before setting modalContent to null:", modalContent);
    setModalContentState(null); // Clear the modal contents
    console.log("After setting modalContent to null:", modalContent);

    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={() => {
        console.log("Background clicked, closing modal...");
        closeModal();
      }} />
      <div id="modal-content">
        {/* Render the content passed through setModalContent */}
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
