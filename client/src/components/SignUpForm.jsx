import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignUp.css';
import axios from 'axios';

function SignUpForm({ handleLogin, setUsername, setUserType }) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/check-username/${username}`);
        const usernameExists = response.data.usernameExists;
        setUserExists(usernameExists);
        if (!usernameExists) {
          console.log(username)
          setUsername(username)
        }
      } catch (error) {
        console.error("Error checking username:", error);
      }
    }

    if (username) {
      checkUsername();
    } else {
      setUserExists(false)
    }
  }, [username])

  useEffect(() => {
    const checkEmail = async () => {
      if(email) {
        try {
          const emailResponse = await axios.get(`http://127.0.0.1:3000/check-email/${email}`)
          const emailExists = emailResponse.data.emailExists
          setEmailExists(emailExists)
        } catch (error) {
          console.error("Error checking email:", error)
        }
      }
    }
    checkEmail()
  }, [email])

  // Called when the button with type="submit" inside the form is pressed
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userExists) {
      console.error("Username already exists. Please choose a different one.");
      return;
    }

    if(password != confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }

    if(emailExists) {
      console.error("Email is already taken.")
    }

    const inputData = { fname, lname, username, password, email };

    console.log('Submitting Sign Up Form details...');
    console.table(inputData);

    try {
      const { data } = await axios.post(
        'http://127.0.0.1:3000/sign-up',
        inputData
      );

      // const token = data.token
      // localStorage.setItem('token', token)
      localStorage.setItem("userType", "regular");
      // localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      setUserType("regular")
      setUsername(username)
      alert('Account created successfully!');
      // handleLogin();
      console.log('Server responded with:', data);
      navigate('/e-pitaka/home');

    } catch (e) {
      // Catch errors from the backend here
      window.alert(e.message);
    }
  };

  // Helper function for handling input change events
  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  return (
    <>
      <div className="card text-center form-container sign-up-form">
        <form onSubmit={handleSubmit}>
          <h3>CREATE ACCOUNT</h3>
          {userExists && <p className='sign-up-error'>Username Already Exists</p>}
          {emailExists && <p className='sign-up-error'>Email Has Already Been Taken</p>}
          {password != confirmPassword && confirmPassword && <p className='sign-up-error'>Passwords Do Not Match</p>}
          <div className="row input-area">
            <div className="col-sm">
              <label>First Name</label>
              <input
                onChange={(e) => {
                  handleChange(e, setFname);
                }}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className=" col-sm">
              <label>Last Name</label>
              <input
                onChange={(e) => {
                  handleChange(e, setLname);
                }}
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row input-area">
            <div className="col">
              <label>Your Username</label>
              <input
                onChange={(e) => {
                  handleChange(e, setUsernameLocal);
                }}
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className='row input-area'>
            <div className='col'>
              <label>Email Address</label>
              <input
                onChange={(e) => {
                  handleChange(e, setEmail)
                }}
                type='email'
                className='form-control'
                required
              />
            </div>
          </div>
          <div className="row input-area">
            <div className="col">
              <label>Your Password</label>
              <input
                onChange={(e) => {
                  handleChange(e, setPassword);
                }}
                type="password"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className='row input-area'>
            <div className='col'>
              <label>Confirm Password</label>
              <input
                onChange={(e) => {
                  handleChange(e, setConfirmPassword)
                }}
                type='password'
                className='form-control'
                required
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <button type="submit" className="sign-up-button">
              SIGN UP
            </button>
          </div>
        </form>
        <p className='sign-in-link'>
          Already have an account? <Link to='/e-pitaka/' className='login-link'>Sign In</Link>
        </p>
      </div>
    </>
  );
}

export default SignUpForm;