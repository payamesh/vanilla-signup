/** @jsx jsx */

import { jsx } from "theme-ui"

import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import News from '../components/News'

const LandingPage = () => {

    return(
    <div>

        <div sx={{textAlign:'center', fontSize:'35px'}}>
            <h1>Welcome to EzClap's official website.</h1>
        </div>
        <div sx={{width:'100vw', display:'flex'}}>
            <LoginModal />
            <News/>
        </div>
            <SignupModal />
    </div>
    )
}

export default LandingPage
