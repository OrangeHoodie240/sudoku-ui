import './App.css';
import Banner from './Banner/Banner.js'
import Teleporter from './Teleporter/Teleporter.js';
import SudokuBoard from './SudokuBoard/SudokuBoard.js';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import UserPass from './UserPass/UserPass.js';
import SubBanner from './SubBanner/SubBanner.js';

function App() {
  const [puzzleInfo, setPuzzleInfo] = React.useState(null); 
  const [viewSavedPuzzles, setViewSavedPuzzles] = React.useState(false);
  const [isSavedPuzzleUsed, setIsSavedPuzzleUsed] = React.useState(false);


          //   {/* <div style={{width: '500px', height: '500px', backgroundColor: 'red'}}></div>
          //  */}
  return (
    <div className="App"> 
      <Banner></Banner>
      <Routes>
        <Route exact path="/new-account" element={<SubBanner header="Create Account" />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/login" element={<SubBanner header="Login" />}></Route>
      </Routes>
      <div style={{paddingTop: '2%', paddingLeft: '35%', paddingRight: '20%', width: '100%'}}>
        
        <Routes>
          <Route exact path="/" element={<Teleporter><SudokuBoard setIsSavedPuzzleUsed={setIsSavedPuzzleUsed} setPuzzleInfo={setPuzzleInfo} puzzleInfo={puzzleInfo} /></Teleporter>}></Route>
          <Route exact path="/new-account" element={<UserPass />} />
          <Route exact path="/login" element={<UserPass />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;
