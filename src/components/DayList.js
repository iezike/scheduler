import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const daylist = props.days.map(day => { // helper function maps props data days to daylist while passing the props value.
    return (
      <DayListItem
        key={day.id}
        name = {day.name}
        spots = {day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
        {...day}
      />
    );
  })
  return(
    <ul>
      {daylist}
    </ul>
  );
}