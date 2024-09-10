import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContentState] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const setModalContent = (content) => {
    setModalContentState(content);
  };

  const closeModal = () => {
    setModalContentState(null); // Clear modal contents
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

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'modal-background') {
      closeModal(); // Close modal if the background is clicked
    }
  };

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={handleBackgroundClick} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
