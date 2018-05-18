import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../scss/NotesSearch.scss';
import {searchNote} from '../actions/index';

class NotesSearch extends Component{
	searchQuery(){
		let search = this.refs.search.value.toLowerCase();
		//this.refs.search.value = '';
		return search;
	}
	render (){
		return(
			<div className="search">
		        <input type="text" ref="search"/>
		        <button onClick={() => this.props.searchNote(this.searchQuery())}>Go!</button>
		    </div>
		)
	}
}

function mapStateToProps(state) {
    return {
        colors: state.colors
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({searchNote: searchNote}, dispatch)
}	

export default connect (mapStateToProps, matchDispatchToProps)(NotesSearch);