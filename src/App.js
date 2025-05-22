import './App.css';
import Banner from './Banner/Banner.js'
import Teleporter from './Teleporter/Teleporter.js';
import SudokuBoard from './SudokuBoard/SudokuBoard.js';
import React, { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import UserPass from './UserPass/UserPass.js';
import SubBanner from './SubBanner/SubBanner.js';
import SavedPuzzles from './SavedPuzzles/SavedPuzzles.js';
import BoardBackground from './BoardBackground/BoardBackground.js';

function App() {
  const [puzzleInfo, setPuzzleInfo] = React.useState(null); 
  const [viewSavedPuzzles, setViewSavedPuzzles] = React.useState(false);
  const [isSavedPuzzleUsed, setIsSavedPuzzleUsed] = React.useState(false);
  const [_, setRerenderState] = React.useState(false);
          //   {/* <div style={{width: '500px', height: '500px', backgroundColor: 'red'}}></div>
          //  */}


  return (
    <div className="App"> 
      <Banner setRerenderState={setRerenderState}></Banner>
      <Routes>
        <Route exact path="/new-account" element={<SubBanner header="Create Account" />}></Route>
        <Route exact path="/login" element={<SubBanner header="Login" />}></Route>
        <Route exact path="/" element={<SubBanner header="Play!" puzzleInfo={puzzleInfo}/>}></Route>
      </Routes>
      <div style={{paddingTop: '2%', paddingLeft: '35%', paddingRight: '20%', width: '100%'}}>
        
        <Routes>
          <Route exact path="/" element={<BoardBackground><SudokuBoard setIsSavedPuzzleUsed={setIsSavedPuzzleUsed} setPuzzleInfo={setPuzzleInfo} puzzleInfo={puzzleInfo} /></BoardBackground>}></Route>
          <Route exact path="/new-account" element={<UserPass />} />
          <Route exact path="/login" element={<UserPass />} />
          <Route exact path="/saved-puzzles" element={<SavedPuzzles setPuzzleInfo={setPuzzleInfo} puzzleInfo={puzzleInfo} />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;
