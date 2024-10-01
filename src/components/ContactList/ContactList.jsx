import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contacts/selectors"; // Импортируйте селектор
import "./ContactList.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts); // Не передавайте filter, так как селектор уже учитывает его

  return (
    <ul className="contact-list">
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <Contact key={contact.id} {...contact} />
        ))
      ) : (
        <li>No contacts available</li>
      )}
    </ul>
  );
};

export default ContactList;
