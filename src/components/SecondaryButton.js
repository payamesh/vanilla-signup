/** @jsx jsx */

import { jsx } from "theme-ui"
import { PropTypes } from "prop-types"

const SecondaryButton = ({ children, onClick, style }) => {
  return (
    <button
      sx={{
        display: "inline-block",
        padding: "0.3em 1.2em",
        margin: "10px auto",
        borderRadius: "2em",
        boxSizing: "border-box",
        textDecoration: "none",
        fontFamily: "Roboto,sans-serif",
        fontWeight: 300,
        color: "#FFFFFF",
        backgroundColor: "red",
        textAlign: "center",
        transition: "all 0.2s",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default SecondaryButton
SecondaryButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
}
