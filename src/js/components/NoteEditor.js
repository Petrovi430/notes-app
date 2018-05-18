import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import NotesColor from './Notes-Color';
import {connect} from 'react-redux';
import {changeText} from '../actions/index';
import {addNote} from '../actions/index';
import '../../scss/NoteEditor.scss';

class NoteEditor extends Component {
    newNote (){
        if(this.props.colors.text !== ''){
            let note = {
                text: this.props.colors.text,
                color: this.props.colors.color,
                id: Date.now()
            }
            this.refs.textarea.value = '';
            this.props.colors.text = '';
            return note;
        }
    }
    render (){
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    onChange={(event) => this.props.changeText(event)}
                    ref="textarea"
                />
                <div>
                    <NotesColor></NotesColor>    
                </div>
                <button className="add-button" onClick={() => this.props.addNote(this.newNote())}>Add</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        colors: state.colors
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeText: changeText, addNote: addNote}, dispatch)
}	

export default connect (mapStateToProps, matchDispatchToProps)(NoteEditor);