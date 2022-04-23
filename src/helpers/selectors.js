export function getAppointmentsForDay(state, day) {
  let appointments = []
  //From state.days filter appointment day where day name matches the day parameter 
  const days = state.days.find(d => d.name === day) // days is an object
  if (days) {
    //  print day to view
    console.log(days)

    appointments = days.appointments.map(id => state.appointments[id])
  }
  // From the days.appointmeents retrive the state appointment for each id 
  return appointments; // appointments is an array
}