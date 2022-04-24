import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  //create transition to update new Mode
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode((prev) => newMode)
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => replaceHistory);
    } else {
      setMode((prev) => newMode);
      let newHistory = [...history];
      newHistory.push(newMode);
      setHistory((prev) => newHistory);
    }
  };
  //create a back function to transition back to previous mode
  function back() {
    const newHistory = [...history];
    newHistory.pop();
    // ensure that history array is not empty, then...
    if(newHistory.length >= 1) {
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    } 
  }

  return {mode, transition, back} 
}

