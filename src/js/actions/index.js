export const selectColor = (color) => {
	return {
		type: "COLOR_SELECTED",
		payload: color
	}
};

export const changeText = (event) => {
	return {
		type: "CHANGE_TEXT",
		payload: event.target.value
	}
};

export const addNote = (note) => {
	return {
		type: "ADD_NOTE",
		payload: note
	}
};

export const searchNote = (query) => {
	return {
		type: "SEARCH_NOTE",
		payload: query
	}
};

export const deleteNote = (note) => {
	return {
		type: "DELETE_NOTE",
		payload: note
	}
};