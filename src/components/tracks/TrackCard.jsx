import React from 'react';
import prettyMilliseconds from 'pretty-ms';



function TrackCard(props) {
  const formattedDuration = prettyMilliseconds(props.duration, {colonNotation: true, secondsDecimalDigits: 0});
  let rating = ""
  if (props.rating) {
    rating = "yes"
  } else {
    rating = "no"
  }
  

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.albumName}</td>
      <td className="text-center">{formattedDuration}</td>
      <td className="text-center">{props.popularity}%</td>
      <td className="text-center">{rating}</td>
    </tr>
  )
}

export default TrackCard