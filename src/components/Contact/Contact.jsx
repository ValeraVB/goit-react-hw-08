import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { Person, Phone, Delete, Edit } from "@mui/icons-material";
import Modal from "react-modal";
import "./Contact.css";

// Устанавливаем root элемент для модального окна
Modal.setAppElement("#root");

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);

  const handleDelete = () => {
    dispatch(deleteContact(id));
    setIsModalOpen(false); // Закрыть модальное окно после удаления
  };

  const handleEdit = () => {
    dispatch(
      updateContact({ id, updatedData: { name: newName, number: newNumber } })
    );
    setIsEditModalOpen(false); // Закрыть модальное окно после редактирования
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

      <div className="contact-actions">
        <button
          className="button edit-button"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Edit className="icon" />
          Edit
        </button>
        <button
          className="button delete-button"
          onClick={() => setIsModalOpen(true)}
        >
          <Delete className="icon" />
          Delete
        </button>
      </div>

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

      {/* Модальное окно редактирования контакта */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Contact"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Contact</h2>
        <form onSubmit={handleEdit}>
          <label className="label">Name:</label>

          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <label className="label">Phone Number:</label>
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
          {/* Контейнер для кнопок */}
          <div className="button-container">
            <button type="submit" className="button">
              Save
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </li>
  );
};

export default Contact;
