import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  //create transition to update new Mode
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode((prev) => newMode) // update state mode with newMode
      let replaceHistory = [...history]; // create a copy of history mode
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => replaceHistory);
    } else {
      setMode((prev) => newMode); // update state mode with newMode
      let newHistory = [...history]; // create a copy of state history 
      newHistory.push(newMode); // add newMode to history array
      setHistory((prev) => newHistory); // update state history to tract newMode 
    }
  };
  //create a back function to transition back to previous mode
  function back() {
    const newHistory = [...history];
    newHistory.pop(); // remove previous-last state mode from history
    // ensure that history array is not empty, then...
    if(newHistory.length >= 1) {
      setMode(newHistory[newHistory.length - 1]); // update state mode 
      setHistory(newHistory); // update state history with modified newHistory
    } 
  }

  return {mode, transition, back} 
}

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode) {
//     setMode(newMode);
//     let newHistory = [...history];
//     newHistory.push(newMode);
//     setHistory(newHistory);
//   }
//   //create a back function to transition back to previous mode
//   function back() {
//     const newHistory = [...history];
//     newHistory.pop();
//     // ensure that history array is not empty, then...
//     if(newHistory.length >= 1) {
//       setMode(newHistory[newHistory.length - 1]);
//       setHistory(newHistory);
//     } 
//   }
//   return {mode, transition, back} 
// }

