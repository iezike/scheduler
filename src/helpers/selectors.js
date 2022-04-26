export function getAppointmentsForDay(state, day) {
  let appointments = [];
  //From state.days filter  day where days name matches the day parameter 
  const days = state.days.find(d => d.name === day) // days is an object
  if (days) {
    appointments = days.appointments.map(id => state.appointments[id]);
  }
  // From the days.appointmeents retrive the state appointment for each id 
  return appointments; // appointments is an array
}

export function getInterviewersForDay(state, day) {
  let interviewers = [];
  //From state.days filter day where days name matches the day parameter 
  const days = state.days.find(d => d.name === day) // days is an object
  if (days) {
    interviewers = days.interviewers.map(id => state.interviewers[id]);
  }
  // From the days.interviewers retrive the state interviewer for each id 
  return interviewers; // interviewers is an array
}


// helper function to retrieve interview in the right format
export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  //From state interviewers, retrive interviewer based on its id in interview parameter
  const interviewer = Object.values(state.interviewers).find(interviewer => interviewer.id === interview.interviewer);

  //update the interviewer property in interview and return the new object 
  return { ...interview, interviewer: interviewer }
}
