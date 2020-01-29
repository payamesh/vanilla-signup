/** @jsx jsx */

import { jsx } from "theme-ui"
import { PropTypes } from "prop-types"

const PrimaryButton = ({ children, onClick }) => {
  return (
    <button
      sx={{
        display: "inline-block",
        padding: "0.3em 1.2em",
        margin: "0 0.3em 0.3em 0",
        borderRadius: "2em",
        boxSizing: "border-box",
        textDecoration: "none",
        fontFamily: "Roboto,sans-serif",
        fontWeight: 300,
        color: "#FFFFFF",
        backgroundColor: "#4eb5f1",
        textAlign: "center",
        transition: "all 0.2s",
        maxWidth: "200px",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
PrimaryButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
