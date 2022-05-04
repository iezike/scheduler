import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //define state variables
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  //helper function to update number of spots remaining
  function updateSpotsDay(id, newAppointments) {
    const days = state.days.map((day) => {
      const newDay = {...day};
      if(newDay.name === state.day) {
        let spots = 0;
        newDay.appointments.map((appointmentID) => {
          if(!newAppointments[appointmentID].interview) {
            spots += 1;
          }
          return spots
        })
        newDay.spots = spots;
      }
      return newDay;
    });
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
    const days = updateSpotsDay(id, appointments);
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
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
    const days = updateSpotsDay(id, appointments);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
