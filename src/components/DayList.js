import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const daylist = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        selected={day.name === props.day}
        setDay={props.setDay}
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