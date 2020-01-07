/** @jsx jsx */

import { jsx } from 'theme-ui';
import { auth, useAuth } from "gatsby-theme-firebase";
import SpecRenderer from '../components/utils/SpecRenderer'
import CharacterList from '../components/CharacterList';
import {  graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image'


const Dashboard = () => {
    const data = useStaticQuery(graphql`
query MyQuery {
    imageSharp {
      id
      fluid(maxWidth: 2480, quality: 100) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`
);
    const { isLoading, isLoggedIn, profile } = useAuth();
    const imageData = data.imageSharp.fluid;
    return (
      <div>
<BackgroundImage
fluid={imageData}
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
        {profile && <p>Hello {profile.displayName}</p>}
        {isLoggedIn && 
        <div sx={{
            paddingX:'150px',
            zIndex:1,
        }}>
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
    </div>
        </BackgroundImage>
      </div>
);
}

export default Dashboard

