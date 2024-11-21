import Lim from "../assets/Lim.png"
import Lopez from "../assets/Lopez.png"
import Manatad from "../assets/Manatad.jpg"
import Marbella from "../assets/Marbella.jpg"
import "../styles/DevelopersCard.css";

function DevelopersCard() {
  return (
    <>
      <div className="card text-center developers-container">
        <div className="row">
          <div className="col-sm order-1 developer">
            <img src={Lopez} className="developer-image" />
            <p className="developer-name">ROXANNE ANGELLI LOPEZ</p>
          </div>
          <div className="col-sm order-2 developer">
            <img src={Lim} className="developer-image" />
            <p className="developer-name">REECE SERGEI LIM</p>
          </div>
          <div className="col-sm order-3 developer">
            <img src={Manatad} className="developer-image" />
            <p className="developer-name">ERNIE MANATAD</p>
          </div>
          <div className="col-sm order-4 developer">
            <img src={Marbella} className="developer-image" />
            <p className="developer-name">JASPER LEE MARBELLA</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DevelopersCard;
