import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { Fragment } from "react"; // Helps to group a list of children without adding extra nodes to the DOM.

export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.time? `Appointment at time ${props.time}`: "No appointment"}
    </article>
  );
}