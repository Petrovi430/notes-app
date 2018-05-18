import React, {Component} from 'react';
import NotesList from './Notes-List';
import '../../scss/NotesGrid.scss';

class NotesGrid extends Component{
	render () {
		return (
			<div className="notes-grid">
				<NotesList></NotesList>
		    </div>
		);
	}
}
	
export default NotesGrid;