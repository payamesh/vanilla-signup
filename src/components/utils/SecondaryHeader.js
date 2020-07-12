/** @jsx jsx */

import { jsx } from "theme-ui"

const SecondaryHeader = ({ children }) => {
  return (
    <div className="secondary-header">
      <h2>
        {children}
      </h2>
    </div>
  )
}
export default SecondaryHeader
