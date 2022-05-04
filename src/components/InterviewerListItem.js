import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
    // handles styling for an interviewer on selected from the list
  const interviewerStyles = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  // handles styling for interviewer image on selected
  const imageStyles = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })
  
  return (
    <li className={interviewerStyles} onClick={props.setInterviewer}>
      <img className={imageStyles} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  )
}