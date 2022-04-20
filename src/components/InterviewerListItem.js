import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

// export default function InterviewerListItem() {
//   return (
//     <li className="interviewers__item">
//       <img
//         className="interviewers__item-image"
//         src="https://i.imgur.com/LpaY82x.png"
//         alt="Sylvia Palmer"
//       />
//       Sylvia Palmer
//     </li>
//   );
// }

export default function InterviewerListItem(props) {
  const interviewerStyles = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })
  const imageStyles = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })
  return (
    <li className={interviewerStyles} onClick={props.setInterviewer}>
      <img
        className={imageStyles}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}