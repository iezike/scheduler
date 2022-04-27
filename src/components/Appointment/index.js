import React from "react";
import "./styles.scss"
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Error from "./Error";
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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"

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
          transition(SHOW)  //transition to show mode when promise is resolved
        })
        .catch(() => transition(ERROR_SAVE, true)); // Error handling
    }
  }

  const remove = function () {
    props.cancelInterview(props.id)
    // .catch(() => transition(ERROR_DELETE, true))
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
      {mode === ERROR_SAVE && (
        <Error
          onClose={back}
          message="Could not save appointment"
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={back}
          message="Could not delete appointment"
        />
      )}
    </article>
  );
}