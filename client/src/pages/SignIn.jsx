import "../styles/SignIn.css";
import SignInForm from "../components/SignInForm";
import down_arrow from "../assets/down_arrow.svg";
import money from "../assets/money.svg";
import send from "../assets/send.svg";
import wallet from "../assets/wallet.svg";

function SignIn({ handleLogin, setUsername, setUserType }) {
  return (
    <div className="container-fluid sign-in-container">
      <div className="row justify-content-center">
        <div className="col-lg-4 order-1">
          <SignInForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setUserType={setUserType}
          />
        </div>
        <div className="col-lg-7 order-2 info-container">
          <div className="info-header">
            A DIGITAL WALLET FOR THE SCHOOL
          </div>
          <p className="info-text">
          
Welcome to E-PITAKA, a cutting-edge digital wallet meticulously developed for seamless transactions within the confines of educational institutions. Tailored to cater to the diverse needs of students, teachers, school staff, and vendors. Experience the future of educational transactions with E-PITAKA - where innovation meets convenience.
          </p>
          <img
            src={down_arrow}
            className="down-arrow align-self-center"
            alt=""
          />
          <div className="container text-center sign-in-icons">
            <div className="row justify-content-center">
              <div className="col-4">
                <img src={money} className=" row sign-in-icon" alt="" />
                <small className="icon-label">MONEY</small>
              </div>
              <div className="col-4">
                <img src={send} className="row sign-in-icon" alt="" />
                <small className="icon-label">SEND</small>
              </div>
              <div className="col-4">
                <img src={wallet} className="row sign-in-icon" alt="" />
                <small className="icon-label">SAVE</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
