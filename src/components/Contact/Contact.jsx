import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { Person, Phone, Delete } from "@mui/icons-material";
import "./Contact.css";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
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
      <button className="delete-button" onClick={handleDelete}>
        <Delete className="delete-icon" />
        Delete
      </button>
    </li>
  );
};

export default Contact;
