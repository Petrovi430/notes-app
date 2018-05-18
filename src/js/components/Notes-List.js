import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../scss/Notes-List.scss';
import {deleteNote} from '../actions/index';

class NotesList extends Component {
	
	showList(){
		var rezult = this.props.notes.filter((el) => {
            var searchValue = el.text.toLowerCase();
            return searchValue.indexOf(this.props.searchQuery) !== -1;
        });
        if(rezult.length>0){
			return rezult.map((note) => {
	        	var style = { backgroundColor: note.color };
				return (
					<div className="note" key={note.id} style={style}>
				        <span className="delete-note" onClick={() => this.props.deleteNote(note)}> × </span>
				        {note.text}
				    </div>
				);
			});
        }else{
			return (
				<div>Ничего не найдено!!!</div>
			);
        }
	}
	render () {
		return (
			<div>
				{this.showList()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		notes: state.notes,
		searchQuery: state.colors.searchQuery
	}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({deleteNote: deleteNote}, dispatch)
}

export default connect (mapStateToProps, matchDispatchToProps)(NotesList);