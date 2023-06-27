import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import './App.css';
 
export default function Edit() {
 const [form, setForm] = useState({
   player1: "",
   team1: "",
   player2: "",
   team2: "",
   match_link: "",
   season: "",
   week: "",
   winner: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedMatch = {
     player1: form.player1,
     team1: form.team1,
     player2: form.player2,
     team2: form.team2,
     match_link: form.match_link,
     season: form.season,
     week: form.week,
     winner: form.winner,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedMatch),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
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