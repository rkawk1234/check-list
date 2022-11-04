  import {useState, useEffect} from 'react'
  
  
  function App() {
    return (
      <div className="App">
        <h1>Welcome User Name</h1>
        <h4> Your Tasks</h4>
        <div className="checklists">

          <div className="checklist">
            <div className="checkbox"></div>
            <div className="text"></div>
            <div className="delete-checklist">X</div>
          </div>

          <div className="checklist is-complete">
            <div className="checkbox"></div>
            <div className="text"></div>
            <div className="delete-checklist">X</div>
          </div>

        </div>

      </div>
    );
  }

  export default App;
