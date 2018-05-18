import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectColor} from '../actions/index';
import '../../scss/Notes-Color.scss';

class NotesColors extends Component {
	showColors(){
		var checkItem = this.props.colors.checkItem;
		return this.props.colors.colors.map((color) => {
			var bgColor = {backgroundColor: color.color}
			return (
				<li 
					key={color.number} 
					className={(checkItem == color.number) ? "color-checked" : ""} 
					style={bgColor}
					onClick={() => this.props.selectColor(color)} 
					></li>
				)
		});
	}
	render () {
		return (
			<ol>{this.showColors()}</ol>
		)
	}
}

function mapStateToProps(state) {
	return {
		colors: state.colors
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({selectColor: selectColor}, dispatch)
}

export default connect (mapStateToProps, matchDispatchToProps)(NotesColors);