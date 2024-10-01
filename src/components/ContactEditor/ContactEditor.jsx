import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations"; // Импортируйте вашу функцию для добавления контакта

const ContactEditor = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // Состояние для имени контакта
  const [number, setNumber] = useState(""); // Состояние для номера контакта

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем, чтобы поля не были пустыми
    if (name && number) {
      dispatch(addContact({ name, number })); // Отправляем новый контакт
      setName(""); // Очищаем поле имени
      setNumber(""); // Очищаем поле номера
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Phone Number"
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactEditor;
