import React from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import { collection, onSnapshot, updateDoc, doc} from "firebase/firestore";
import db from '../src/firebase-config.js'


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
    return (
      <div className='app-container'>
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        ></SidebarComponent>

        {
          this.state.selectedNote ?
            <EditorComponent
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.newNote}
              noteUpdate={this.noteUpdate}></EditorComponent> :
              null
          }
      </div>
    );
  }

  componentDidMount = () => {
    
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
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

  noteUpdate = (id, noteObj) => {
    const noteRef = doc(db, 'notes',id);
    const data = {
      title: noteObj.title,
      body: noteObj.body
    };

    updateDoc(noteRef, data)
      .then(docRef => {
        console.log('Documento atualizado1');
      })
      .catch(error => {
        console.log(error);
      })
  }

 
  

}

export default App;
