/** @jsx jsx */

import { jsx } from "theme-ui"
import { firestore } from "gatsby-theme-firebase"
import { useState, useEffect } from "react"
import BackgroundImage from 'gatsby-background-image'
import {PropTypes} from 'prop-types'
import CharacterList from './CharacterList';



const EventRender = ({ragImg, nefImg}) => {

    const [events, setEvent] = useState([]);
    useEffect(() => {
        firestore.collection("events")
        .get()
        .then(function(querySnapshot) {
            const eventList = [];
            querySnapshot.forEach(function(doc) {
            eventList.push(doc.data());
            })
            setEvent(eventList);
        })

    }, [])
    return(
        <div sx={{position:'fixed', top:'20px', right:'20px', width:'40vw', height:'80vh', overflowY:'scroll', textAlign:'center'}} >
            {/* print eventSection here :-)) */}
            {events.map((event)=>{
                const time = new Date(1970, 0, 1);
                time.setSeconds(event.date.seconds + 7200)
                console.log(event.date,'date')
    console.log(event.title,'title')
                const eventDate = time.toLocaleDateString("en-GB", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
                const eventTime = time.toJSON().substring(11,16);
        
                return(
                    <BackgroundImage 
                    style={{
                        height: `30vh`,
                        width: `40vw`,
                        backgroundColor: `transparent`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center center`,
                        display: `flex`,
                        alignItems: `center`,
                        overflow:'scroll',
                        zIndex:-6,
                        margin:'-8px'
                    }}
                    key={event.date} fluid={event.title == 'Molten Core' ? ragImg : nefImg} >
                <p sx={{color:'white', margin:'0 auto'}} >
                {eventDate}
                <br/>
                {eventTime}
                <br />
                {event.comment}
                {event.attendees}
                </p>

                <CharacterList />
                <button>Signup to raid</button>
                
                    </BackgroundImage>
                )
            })}
        

        </div>
    )
}
EventRender.propTypes={
    ragImg: PropTypes.object.isRequired,
    nefImg: PropTypes.object.isRequired
    }
export default EventRender