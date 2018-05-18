import React, {Component} from 'react';
import NotesList from './Notes-List';
import {connect} from 'react-redux';
import '../../scss/NotesGrid.scss';

class NotesGrid extends Component{
	componentDidMount () {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length || this.props.searchQuery !== prevProps.searchQuery) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }
	render () {
		return (
			<div className="notes-grid" ref="grid">
				<NotesList></NotesList>
		    </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notes: state.notes,
		searchQuery: state.colors.searchQuery
	}
}	

export default connect(mapStateToProps)(NotesGrid);