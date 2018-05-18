const initialState = {
	text: '',
	color: 'green',
	colors:[
		{number: 0, color:"green"},
        {number: 1, color:"yellow"},
        {number: 2, color:"pink"},
        {number: 3, color:"#5cbf2a"},
        {number: 4, color:"rgb(128, 255, 255)"}
	],
	checkItem: 0,
	searchQuery: ''
};
  
export default function(state = initialState, action) {
	if (action !== undefined) {
		switch(action.type){
			case "COLOR_SELECTED":
				return Object.assign({}, state, {
			        color: action.payload.color,
			        checkItem: action.payload.number
			    });
				break;
			case "CHANGE_TEXT":
				return Object.assign({}, state, {
			        text: action.payload
			    });
				break;
			case "SEARCH_NOTE":
				return Object.assign({}, state, {
			        searchQuery: action.payload
			    });
				break;
		}
	}
	return state;
}