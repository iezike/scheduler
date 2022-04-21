import React from "react";
import "./styles.scss"

export default function Appointment(props) {
  return (
    <article className="appointment"> Appointment at time {props.time}</article>
  );
}