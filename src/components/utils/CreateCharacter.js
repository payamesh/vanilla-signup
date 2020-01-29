/** @jsx jsx */
import { jsx } from "theme-ui"
import { firestore } from "gatsby-theme-firebase"

const CreateCharacter = ({ props }) => {
  firestore
    .collection("profile")
    .doc(name)
    .get()
    .then(function(doc) {
      if (!doc.exists) {
        console.log("name is available")
        firestore
          .collection("profile")
          .doc(name)
          .set({
            name: props.name,
            class: props.vocation,
            talents: props.spec,
            uid: props.profile.uid,
          })
          .then(() => {
            console.log("Character added.")
          })
      } else {
        console.log("this name already exists")
      }
    })
}

export default CreateCharacter
