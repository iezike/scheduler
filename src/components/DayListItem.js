import React from "react";
import "./DayListItem.scss";
import classNames from "classnames"; // This library helps to handle className specification based on conditions for styling purposes.

export default function DayListItem(props) {
  const formatSpots = spots => { // helper function for conditional display text.
    if (!spots) {
      return `no spots remaining`;
    }
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    return `${spots} spots remaining`;
  }

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected = {props.selected}>
      <h2 className="day-list_item">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
