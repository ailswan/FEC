import React from 'react';
import colorArray from '../../../../../util/colorArray.js';

const StyleEntry = ({style}) => {
  const colors = colorArray(style.name);
  console.log(colors);

  if (colors.length === 0) {
    return (
      <li className="style-select-img horizontal-list" style={{'background':'grey'}}>

      </li>
    )
  } else if (colors.length === 1) {
    return (
      <li className="style-select-img horizontal-list" style = {{'background': `${colors[0]}`}} >
      </li>
    )
  } else if (colors.length === 2) {
    return (
      <li className="style-select-img horizontal-list" style={{'background':`linear-gradient(-45deg, ${colors[0]}, ${colors[0]} 49%, white 49%, white 51%, ${colors[1]} 51%`}}>
      </li>
    )
  } else {
    return (
      <li className="style-select-img horizontal-list" style={{'background':'grey'}}>

      </li>
    )
  }

};

export default StyleEntry;
