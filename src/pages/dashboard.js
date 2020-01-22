/** @jsx jsx */

import { jsx } from 'theme-ui';

import SpecRenderer from '../components/utils/SpecRenderer'
import EventRender from '../components/EventRender'
import CharacterList from '../components/CharacterList';
import CreateEvent from '../components/CreateEvent'
import {  graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image'
import { auth, useAuth, firebase } from 'gatsby-theme-firebase'
import { useState } from "react"


const Dashboard = () => {

    const data = useStaticQuery(graphql`
    query MyQuery {
        allImageSharp {
          totalCount
          nodes {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
`
);
const [thisUser, setUser] = useState('');
let user = firebase.auth().currentUser;

while(user && thisUser === ''){
    return setUser(user.uid)
}
    const { isLoading, isLoggedIn, profile } = useAuth();
    const ragImg = data.allImageSharp.nodes[1].fluid 
    const nefImg = data.allImageSharp.nodes[0].fluid 
return (
      <div sx={{color:'white'}}>
        <BackgroundImage
        fluid={ragImg}
        style={{
            height: `100vh`,
            width: `100vw`,
            backgroundColor: `transparent`,
            backgroundSize: `cover`,
            backgroundPosition: `center center`,
            display: `flex`,
            alignItems: `center`,
            position:'absolute',
            zIndex:-6,
            margin:'-8px'
        }}
                >
            <div sx={{
                height:'100%',
                width:'100%',
                backgroundColor:'rgba(16,26,52,.5)',
                zIndex:-5
            }}>
                {isLoading && <p>Loading..</p>}
                {isLoggedIn && 
                
                <div sx={{
                    paddingX:'150px',
                    zIndex:1,
                }}>
                <div>
                </div>
                    <form sx={{
                    display:'flex',
                    flexDirection:'column',
                    width:'50vw',
                    margin:'10px auto',
                    '& > div':{marginY:'20px'} }} method="POST">
                    <SpecRenderer profile={profile} />
                
                </form>
                <CharacterList />
                <button sx={{
                    ':hover':{
                        cursor:'pointer'
                    }
                }} onClick={() => auth.signOut()}>Sign Out</button>
                </div>
            }
            <div>
                {thisUser === 'ThngE79hWaYEXYNnUxqdJ04H12i2' ? <CreateEvent /> : null}
                
            </div>
            <EventRender profile={profile} ragImg={ragImg} nefImg={nefImg}/>
    </div>
        </BackgroundImage>
      </div>
);
}

export default Dashboard

