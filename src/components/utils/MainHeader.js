/** @jsx jsx */

import { jsx } from "theme-ui"

const MainHeader = ({ children }) => {
  return (
    <div className="main-header">
      <h1>
        {children}
      </h1>
    </div>
  )
}
export default MainHeader
