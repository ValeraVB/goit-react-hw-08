import PageTitle from "../../components/PageTitle/PageTitle";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <PageTitle>Welcome to Home Page</PageTitle>
      <p>This is the main page of your application.</p>
    </div>
  );
}
