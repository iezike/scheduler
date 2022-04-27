import React from "react";
import "./styles.scss"
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../../src/hooks/useVisualMode"
import Confirm from "./Confirm";


export default function Appointment(props) {
  // mode options
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING) //transition to saving mode(with a message) for pessimistic rendering
      const interview = {
        student: name,
        interviewer
      };
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);  //transition to show mode when promise is resolved
        });
    }
  }

  const remove = function () {
    props.cancelInterview(props.id)
    transition(EMPTY);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === SAVING && (
        <Status
          message={SAVING}
        />
      )}
      {mode === DELETING && (
        <Status
          message={DELETING}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={remove}
          message="Confirm to remove appointment"
        />
      )}
      {mode === EDIT &&
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