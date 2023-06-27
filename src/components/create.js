import React, { useState } from "react";
import { useNavigate } from "react-router";
import './App.css';
 
export default function Create() {
 const [form, setForm] = useState({
   player1: "",
   team1: "",
   player2: "",
   team2: "",
   season: "", 
   week: "",
   match_link: "",
   winner: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newMatch = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newMatch),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ player1: "", team1: "", player2: "", team2: "", season: "", week: "", match_link: "", winner: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
      <div className="row">
        <div className="column">
          <div className="column1">
            <div className="form-group">
              <label htmlFor="player1">Player 1</label>
              <input
                type="text"
                className="form-control"
                id="player1"
                value={form.player1}
                onChange={(e) => updateForm({ player1: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="team1">Team 1</label>
              <input
                type="text"
                className="form-control"
                id="team1"
                value={form.team1}
                onChange={(e) => updateForm({ team1: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="column2">
            <div className="form-group">
              <label htmlFor="player2">Player 2</label>
              <input
                type="text"
                className="form-control"
                id="player2"
                value={form.player2}
                onChange={(e) => updateForm({ player2: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="team2" id="team2">Team 2</label>
              <input
                type="text"
                className="form-control"
                id="team2"
                value={form.team2}
                onChange={(e) => updateForm({ team2: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="row" id="pad-row">
          <div className="column">
            <div className="form-group">
              <label htmlFor="match_link" id="text_match">Match Link</label>
              <input
                type="text"
                className="form-control"
                id="match_link"
                value={form.match_link}
                onChange={(e) => updateForm({ match_link: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="row" id="lesser-pad-row">
          <div className="column">
            <div className="form-group">
              <label htmlFor="season">Season</label>
              <input
                type="text"
                className="form-control"
                id="season"
                value={form.season}
                onChange={(e) => updateForm({ season: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="row" id="lesser-pad-row">
          <div className="column">
            <div className="form-group">
              <label htmlFor="week">Week</label>
              <input
                type="text"
                className="form-control"
                id="week"
                value={form.week}
                onChange={(e) => updateForm({ week: e.target.value })}
              />
            </div>
          </div>
        </div>
       </div>
       <div className="row">
        <div className="column">
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="winner"
                id="winnerPlayer1"
                value={form.player1}
                onChange={(e) => updateForm({ winner: e.target.value })}
              />
              <label htmlFor="winnerPlayer1" className="form-check-label">{form.player1}</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="winner"
                id="winnerPlayer2"
                value={form.player2}
                onChange={(e) => updateForm({ winner: e.target.value })}
              />
              <label htmlFor="winnerPlayer2" className="form-check-label">{form.player2}</label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Match"
              className="btn btn-primary"
            />
          </div>
        </div>
       </div>
     </form>
   </div>
 );
}