import { useNavigate } from "react-router-dom";
const PageButton = ({toPage, pageIcon, pageName, handleLogout}) => {
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const token = localStorage.getItem('token')
    console.log('Token Check:', token)
    if(!token) {
      console.log('Token has expired. Logging out...')
      localStorage.removeItem('token')
      handleLogout()
      navigate('/e-pitaka/')
    } else {
      navigate(`${toPage}`)
    }
  }

  return (
    <>
      <div className="col">
        <button
          className="card page-button"
          onClick={handleButtonClick}
        >
          <img className="page-icon" src={pageIcon}/>
          <h3 className="page-name">{pageName}</h3>
        </button>
      </div>
    </>
  );
};

export default PageButton;
