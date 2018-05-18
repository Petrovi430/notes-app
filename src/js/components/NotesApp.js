import React, {Component} from 'react';
import NotesSearch from './NotesSearch';
import NoteEditor from './NoteEditor';
import NotesGrid from './NotesGrid';
import '../../scss/NotesApp.scss';

class NotesApp extends Component {
	render(){
		return (
			<div className="notes-app">
		        <h2 className="app-header">NotesApp</h2>
		        <NotesSearch></NotesSearch>
		        <NoteEditor></NoteEditor>
		        <NotesGrid></NotesGrid>
		    </div>
		);
	}
}

export default NotesApp;