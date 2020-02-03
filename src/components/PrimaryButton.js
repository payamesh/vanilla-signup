/** @jsx jsx */

import { jsx } from "theme-ui"
import { PropTypes } from "prop-types"

const PrimaryButton = ({ children, onClick }) => {
  return (
    <button
      sx={{
        width: "100%",
        height: "100%",
        display: "inline-block",
        padding: "12px 12px",
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
        outline: "none",
        ":hover": {
          cursor: "pointer",
        },
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
