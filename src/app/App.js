import React from 'react';
import './App.css';
import SidebarComponent from '../sidebar/sidebar';
import EditorComponent from '../editor/editor';
import { collection, onSnapshot, updateDoc, doc, serverTimestamp, addDoc, deleteDoc } from "firebase/firestore";
import db from '../firebase-config.js';

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
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {
          this.state.selectedNote ? (
            <EditorComponent
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.newNote}
              noteUpdate={this.noteUpdate}/>
            ) : null
        }
      </div>
    );
  }

  // Função que roda toda vez que o component é criado na página
  // Usando normalmente quando queremos fazer uma requisição para uma api recuperar dados que serão usados na aplicação
  // no caso é necessário para buscar no firestore as notas que seram mostradas no nosso App
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
    const noteRef = doc(db, 'notes', id);
    const data = {
      title: noteObj.title,
      body: noteObj.body,
      timestamp: serverTimestamp()
    };

    updateDoc(noteRef, data)
      .then(docRef => {
        console.log('Documento atualizado1');
      })
      .catch(error => {
        console.log(error);
      })
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: '',
      timestamp: serverTimestamp()
    };
    const dbRef = collection(db, 'notes');


    const newFromDB = await collection(db, 'notes')(
      addDoc(dbRef, note)
    );
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }

  deleteNote = async (note) => {
    const noteIndex = note.id;
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    const docRef = doc(db, 'notes', noteIndex);
    deleteDoc(docRef);


  }

  // selectNote = (note, index) => this.setState({selectedNoteIndex: index, selectedNote: note });


}

export default App;
