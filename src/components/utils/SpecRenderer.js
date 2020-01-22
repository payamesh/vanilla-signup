/** @jsx jsx */

import { jsx } from 'theme-ui';
import {useState, useCallback} from 'react';
import {PropTypes} from 'prop-types'
import { firestore } from "gatsby-theme-firebase";


const SpecRenderer = ({profile}) => {
 

const [name, setName] = useState('');
const [vocation, setVocation] = useState('');
const [spec, setSpec] = useState('');
      const specList = (vocation)=>{ 
        switch (vocation) {
        case 'Priest':
            return( 
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Holy</option>
            <option>Discipline</option>
            <option>Shadow</option>
           </select>
           </div>
            );
        case 'Warrior':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Protection</option>
            <option>Fury</option>
            <option>Arms</option>
           </select>
           </div>
            );
        case 'Druid':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Feral</option>
            <option>Balance</option>
            <option>Restoration</option>
           </select>
           </div>
            );
        case 'Shaman':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Enhancement</option>
            <option>Restoration</option>
            <option>Elemental</option>
           </select>
           </div>
            );
        case 'Paladin':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Holy</option>
            <option>Retribution</option>
            <option>Protection</option>
           </select>
           </div>
            );
        case 'Warlock':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Destruction</option>
            <option>Demonology</option>
            <option>Affliction</option>
           </select>
           </div>
            );
        case 'Mage':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Arcane</option>
            <option>Frost</option>
            <option>Fire</option>
           </select>
           </div>
            );
        case 'Rogue':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Subtlety</option>
            <option>Combat</option>
            <option>Assasination</option>
           </select>
           </div>
            );
        case 'Hunter':   
            return(
           <div>
           <label>Spec</label>
           <select onChange={event => setSpec(event.target.value)}>
           <option value="null">Choose your spec</option>
            <option>Marksmanship</option>
            <option>Beast Mastery</option>
            <option>Survival</option>
           </select>
           </div>
            );
    
        default:break;
    }}
    const classList = 
    <div>
        <label>Class</label>
        <select onChange={event => {
            setVocation(event.target.value)
            }}>
            <option>Choose a class</option>
            <option>Warrior</option>
            <option>Druid</option>
            <option>Shaman</option>
            <option>Paladin</option>
            <option>Priest</option>
            <option>Warlock</option>
            <option>Mage</option>
            <option>Rogue</option>
            <option>Hunter</option>
        </select>     
    </div>
    const handleSubmit = useCallback((name,vocation,spec) => {
        firestore.collection('profile').doc(name)
        .get()
        .then(function(doc){
            if(!doc.exists){
                console.log("name is available")
        firestore.collection('profile').doc(name)
        .set({name:name, class:vocation, talents:spec, uid:profile.uid})
        .then(()=>{
            console.log("Character added.");
        })
            }else{
                console.log("this name already exists")
            }
        })
    },[name,vocation,spec])
   
    return(
        <div>

              <div>
                <label>Character name</label>
                <input onChange={event => setName(event.target.value)} />
            </div>    
        <div>
        {classList}
            {specList(vocation)}
        </div>
        <input type="submit" onClick={(e) => {
                e.preventDefault()
                if(name == "" || vocation== "" || spec==""){
                    console.log("Fill out the whole form")

                }else{

                    handleSubmit(name,vocation,spec);
                    setTimeout(() => {
                        window.location.reload();
                        
                    }, 1500);

                }
        }}/>
        </div>
    )
}
SpecRenderer.propTypes={
profile: PropTypes.object.isRequired
}
export default SpecRenderer;