import React from "react";
import axios from "axios";
import "./styles.scss"
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../../src/hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE= "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    const id = 4
    props.bookInterview(id, interview);

    transition(SHOW);
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
    </article>
  );
}