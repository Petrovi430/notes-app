const initialState = [
        {
            text: 'Hello',
            color: 'green',
            id: 1
        },
        {
            text: 'bye',
            color: 'pink',
            id: 2
        },
        {
            text: 'Hello',
            color: 'red',
            id: 3
        },
        {
            text: 'bye',
            color: 'yellow',
            id: 4
        },
    ]

export default function(state = initialState, action) {
    if (action !== undefined) {
        switch(action.type){
            case "ADD_NOTE":{
                if(action.payload !== undefined){
                    let newState = state.map((el) => {return el});
                    newState.unshift(action.payload);
                    return newState;
                }
                break; 
            } 
            case "DELETE_NOTE":{
                let noteId = action.payload.id;
                let newNotes = state.filter((note) => {
                    return note.id !== noteId;
                });
                return newNotes;
                break;
            } 
        }
    }
	return state;
}