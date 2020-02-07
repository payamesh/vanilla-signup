/** @jsx jsx */

import { jsx } from "theme-ui"

import { PropTypes } from "prop-types"

const EventInfo = ({ eventName, eventDate, eventTime, eventComment }) => {
  return (
    <div className="event-header">
      <div className="event-name">
        {eventName}
      </div>
      <div className="event-time">
        {eventDate}, {eventTime}
      </div>
      <div className="event-description">{eventComment}</div>
    </div>
  )
}

EventInfo.propTypes = {
  eventDate: PropTypes.string.isRequired,
  eventTime: PropTypes.string.isRequired,
  eventComment: PropTypes.string.isRequired,
}
export default EventInfo
