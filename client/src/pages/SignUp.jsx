import SignUpForm from "../components/SignUpForm";
import "../styles/SignUp.css";

function SignUp({handleLogin, setUsername, setUserType}) {
  return (
    <div className="sign-up-container">
      <SignUpForm
        handleLogin={handleLogin}
        setUsername={setUsername}
        setUserType={setUserType}
      />
    </div>
  );
}

export default SignUp;
