import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { Person, Phone, Delete } from "@mui/icons-material";
import Modal from "react-modal";
// import { toast } from "react-hot-toast"; // Импортируем toast
import "./Contact.css";

// Устанавливаем root элемент для модального окна
Modal.setAppElement("#root");

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id));
    setIsModalOpen(false); // Закрыть модальное окно после удаления
    // toast.success(`${name} has been deleted successfully!`); // Отображаем уведомление
  };

  return (
    <li className="contact-item">
      <div className="contact-details">
        <div className="contact-detail">
          <Person className="contact-icon" />
          <span>{name}</span>
        </div>
        <div className="contact-detail">
          <Phone className="contact-icon" />
          <span>{number}</span>
        </div>
      </div>
      <button className="delete-button" onClick={() => setIsModalOpen(true)}>
        <Delete className="delete-icon" />
        Delete
      </button>

      {/* Модальное окно подтверждения удаления */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Deletion"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Are you sure you want to delete this contact?</h2>
        <p>
          {name} - {number}
        </p>
        <button onClick={handleDelete}>Yes, delete</button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>
    </li>
  );
};

export default Contact;
