import { useState, useEffect } from 'react'

const API_URL = "http://localhost:3001";



function App() {

  const [lists, setLists] = useState([]);
  const [popup, setPopup] = useState(false);
  const [newCheck, setNewCheck] = useState("");

  useEffect(() => {
    getLists();
    

  },[])

  const getLists = () => {
    fetch(API_URL + "/checklists")
      .then(response => response.json())
      .then(data => setLists(data))
      .catch(err => console.error("Error: ", err));

  }

  const completeChecklist = async id => {
    const data = await fetch(API_URL + "/checklist/complete/" + id)
      .then(response => response.json());

    setLists(lists => lists.map(checklist => {
      if (checklist._id === data._id) {

        checklist.complete = data.complete;
      }

      return checklist;
    }));
  }



  const deleteChecklist = async id => {
    const data = await fetch(API_URL + "/checklist/delete/" + id, { method: "DELETE" }).then(response => response.json());

    setLists(lists => lists.filter(checklist => checklist._id !== data.result._id));

  }

  const addCheck = async () => {
    const data = await fetch(API_URL + "/checklist/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newCheck
      })
    }).then(response => response.json());

    setLists([...lists, data]);
    setPopup(false);
    setNewCheck("");
  }

  return (
    <div className="App">
      <h1>Check-list App</h1>
      <h4> Your Tasks</h4>
      <div className="checklists">
        {lists.length > 0 ? lists.map(checklist => (
          <div className={
              "checklist " + (checklist.complete ? "is-complete" : "")} key={checklist._id}
            onClick={() => completeChecklist(checklist._id)}>
            <div className="checkbox"></div>
            <div className="text">{checklist.text}</div>
            <div className="delete-checklist" onClick={() => deleteChecklist(checklist._id)}>X</div>
          </div>
        )):(
          <p>No tasks</p>
        
        )}
      </div>

      <div className="addPopup" onClick={() => setPopup(true)}>+</div>

      {popup ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopup(false)}>X</div>
          <div className="content">

            <h3>Add Task</h3>
            <input
              type="text"
              className="add-checklist-input"
              onChange={e => setNewCheck(e.target.value)}
              value={newCheck} />
            <div className="button" onClick={addCheck}>Create</div>

          </div>
        </div>


      ) : ''}


    </div>
  );
}

export default App;
