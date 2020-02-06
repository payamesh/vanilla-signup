/** @jsx jsx */

import { jsx } from "theme-ui"
import { PropTypes } from "prop-types"

const SecondaryButton = ({ children, onClick, style }) => {
  return (
    <button className="secondary-button"
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
