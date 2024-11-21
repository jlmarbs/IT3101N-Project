import React from "react";
import "../styles/Home.css";
import deposit from "../assets/Money.png";
import send from "../assets/Send_fill.png";
import history from "../assets/Ticket_alt.png";
import savings from "../assets/Wallet.png";

import CurrBalance from "../components/CurrBalance.jsx";
import PageButton from "../components/PageButton.jsx";

function Home({username}) {
  return (
    <>
      <div className="home-container">
        <h1 className="text-center">Hi, {username}!</h1>
        <CurrBalance username = {username} />

        <div>
          <footer className="card page-button-container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
              <PageButton
                toPage={"/e-pitaka/deposit"}
                pageIcon={deposit}
                pageName={"DEPOSIT/WITHDRAW"}
              />

              <PageButton
                toPage={"/e-pitaka/send"}
                pageIcon={send}
                pageName={"SEND"}
              />

              <PageButton
                toPage={"/e-pitaka/history"}
                pageIcon={history}
                pageName={"HISTORY"}
              />

              <PageButton
                toPage={"/e-pitaka/savings"}
                pageIcon={savings}
                pageName={"SAVINGS"}
              />
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
