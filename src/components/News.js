/** @jsx jsx */

import { jsx } from "theme-ui"

const News = () => {

    return(
        <div sx={{width:'50vw',}}>
            <h2 sx={{textAlign:'center', marginTop:'0px'}}>What's up?</h2>
            <hr/>

            <div>
                <h3>We are now recruiting!</h3>
                <p>We are now recruiting Paladins, warlocks and priests. Fill in your name in the google docs and our classleaders will contact you for an interview!</p>
            </div>
        </div>
    )
}

export default News;