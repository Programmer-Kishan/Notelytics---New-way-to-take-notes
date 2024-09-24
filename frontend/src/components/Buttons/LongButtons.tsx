import { useState } from "react";

import ButtonProps from "./ButtonInterface"

const LongButtons = ({text, bgColor, textColor, hoverColor, type="button"}: ButtonProps) => {
  // used for hover effect
  const [isFocused, setIsFocused] = useState(false);
  return (
    <button 
        style={{
          backgroundColor: !isFocused ? bgColor : hoverColor,
          color: textColor,
        }}
        className={`p-3 w-full rounded-lg font-poppins font-semibold text-xl`}
        type={type}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
    >
      {text}
    </button>
  )
}

export default LongButtons
