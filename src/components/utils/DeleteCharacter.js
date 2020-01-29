/** @jsx jsx */

import { jsx } from "theme-ui"
import { firestore } from "gatsby-theme-firebase"

const DeleteCharacter = name => {
  firestore
    .collection("profile")
    .doc(name)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!")
    })
    .catch(function(error) {
      console.error("Error removing document: ", error)
    })
}

export default DeleteCharacter
