import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from 'redux';
import allReducers from './reducers'
import NotesApp from './components/NotesApp';

const store = createStore(allReducers);

ReactDOM.render(
	<Provider store={store}>
		<NotesApp/>
	</Provider>, 
  	document.getElementById('mount-point')
);
