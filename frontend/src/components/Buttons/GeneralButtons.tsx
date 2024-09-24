import { useState } from "react"

import { NavLink } from "react-router-dom"
import ButtonProps from "./ButtonInterface"

interface AdditionalProps {
  to?: string
}

const GeneralButtons = ({text, bgColor, textColor, hoverColor, to}: ButtonProps & AdditionalProps) => {
  // for button hover color change
  const [isFocused, setIsFocused] = useState(false);
  return (
    <NavLink to={`/${to}`}>
      <button 
        style={{
          backgroundColor: !isFocused ? bgColor : hoverColor,
          color: textColor
        }}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className={`py-2 px-6 font-bold text-lg rounded-2xl tracking-wide`} 
      >
          {text}
      </button>
    </NavLink>
  )
}

export default GeneralButtons
