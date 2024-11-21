import "../styles/AboutUs.css";
import DevelopersCard from "../components/DevelopersCard";

function AboutUs() {
  return (
    <>
      <h3 className="aboutus-title">ABOUT E-PITAKA</h3>
      <p className="aboutus-desc">
      E-PITAKA, a cutting-edge digital wallet developed for seamless transactions within the confines of educational institutions. Tailored to cater to the diverse needs of students, teachers, school staff, and vendors, E-PITAKA stands as a unique and exclusive digital transaction system. E-PITAKA mirrors the convenience of mainstream digital wallets, empowering users to effortlessly navigate through a myriad of payments, ranging from meal purchases to tuition fees and extracurricular expenses. E-PITAKA transforms the traditional financial landscape within educational settings, providing a secure and efficient means of exchange.
      </p>
      <div className="aboutus-line" />
      <h3 className="aboutus-h3">THE DEVELOPERS</h3>
      <DevelopersCard />
    </>
  );
}

export default AboutUs;
