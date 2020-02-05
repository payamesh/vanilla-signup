/** @jsx jsx */

import { jsx } from "theme-ui"
import { PropTypes } from "prop-types"

const PrimaryButton = ({ children, onClick }) => {
  return (
    <button className="primary-button"
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
