import React from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  render() {
    return(
      <div className='app-container'>
        <SidebarComponent 
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
          ></SidebarComponent>
        <EditorComponent></EditorComponent>
      </div>
    );
  }

  componentDidMount = () => {
    const db = getFirestore();
    const notesRef = collection(db, 'notes');
  
    onSnapshot(notesRef, (serverUpdate) => {
      const notes = serverUpdate.docs.map((_doc) => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      console.log(notes);
      this.setState({ notes: notes });
    });
  };

}

export default App;
