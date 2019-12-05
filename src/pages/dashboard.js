/** @jsx jsx */

import { jsx } from 'theme-ui';
import { auth, useAuth } from "gatsby-theme-firebase";
import {Link} from 'gatsby';
import SpecRenderer from '../components/utils/SpecRenderer'
import CharacterList from '../components/CharacterList';

const Dashboard = () => {
    const { isLoading, isLoggedIn, profile } = useAuth();

    return (
      <div>
        {isLoading && <p>Loading..</p>}
        {profile && <p>Hello {profile.displayName}</p>}
        {isLoggedIn && 
        <div>
            <form sx={{
             display:'flex',
             flexDirection:'column',
             width:'50vw',
             margin:'10px auto',
            '& > div':{marginY:'20px'} }} method="POST">
            <SpecRenderer profile={profile} />
          
        </form>
        <CharacterList />
        <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    }

        
      </div>
);
}

export default Dashboard