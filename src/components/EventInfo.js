/** @jsx jsx */

import { jsx } from "theme-ui"

import { PropTypes } from "prop-types"

const EventInfo = ({ eventDate, eventTime, eventComment }) => {
  return (
    <div sx={{ margin: "0 auto", textAlign: "center" }}>
      <h2>
        {eventDate} {eventTime}
      </h2>

      <h3 sx={{ color: "white", margin: "0 auto" }}>{eventComment}</h3>
    </div>
  )
}

EventInfo.propTypes = {
  eventDate: PropTypes.string.isRequired,
  eventTime: PropTypes.string.isRequired,
  eventComment: PropTypes.string.isRequired,
}
export default EventInfo
