import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../scss/Notes-List.scss';
import {deleteNote} from '../actions/index';

class NotesList extends Component {
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
			<div ref="grid">
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