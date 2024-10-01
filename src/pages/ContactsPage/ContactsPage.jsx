import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectIsLoading, selectError } from "../../redux/contacts/selectors";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts()); // Запуск загрузки контактов при монтировании компонента
  }, [dispatch]);

  return (
    <>
      <PageTitle>Add Your contacts</PageTitle>
      <ContactForm />
      <PageTitle>Contacts filter</PageTitle>
      <SearchBox />
      <PageTitle>Your contacts</PageTitle>
      {isLoading && <div>Request in progress...</div>}
      {error && <div>Error: {error}</div>}
      <ContactList />
    </>
  );
}
