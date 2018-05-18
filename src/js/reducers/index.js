import {combineReducers} from 'redux';
import NotesReducers from './notes';
import ColorsReducers from './colors';

const allReducers = combineReducers({
	notes: NotesReducers,
	colors: ColorsReducers
});

export default allReducers;