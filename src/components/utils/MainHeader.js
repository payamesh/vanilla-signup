/** @jsx jsx */

import { jsx } from "theme-ui"

const MainHeader = ({ children }) => {
  return (
    <div>
      <h1
        sx={{
          cursor: "default",
          margin: ["20px 5px", "30px 5px"],
          color: "#ccc",
          textAlign: "center",
          fontSize: ["26px", "40px"],
          letterSpacing: ".03em",
          transition: ".3s",
        }}
      >
        {children}
      </h1>
    </div>
  )
}
export default MainHeader
