import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //define state variables
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });
  //useEffect as a hook
  useEffect(() => {
    // multiple api calls using axios promise
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {
        //multiple state variables update
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  //helper function to increase or decrease number of spots remaining
  function updateSpotsDay(id) {
    const day = state.days.find(day => day.appointments.includes(id));
    const incrementDay = state.appointments[id].interview;
    if(incrementDay) {
      day.spots +=1;
    } else {
      day.spots -=1;
    }
    const days = [...state.days];
    days[day.id - 1] = day;
    return days;
  }

  //helper function to handle booking of an appointment logic 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpotsDay(id);
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days});
      });
  }

  //helper function to handle canceling of an appointment logic 
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpotsDay(id);
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days});
      });
  }
   
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
