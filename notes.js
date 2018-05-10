var NotesSearch = React.createClass({
    getInitialState: function() {
        return {
            searchText: ''
        };
    },
    handleTextChange: function(event) {
        this.setState({ searchText: event.target.value });
    },
    handleNoteSearch: function() {
        var newSearch = {text: this.state.searchText};
        this.props.onSearch(newSearch);
    },
    render: function() {
        return (
            <div className="search">
                <input type="text" onChange={this.handleTextChange}/>
                <button  onClick={this.handleNoteSearch}>Go!</button>
            </div>
        );
    }
});

var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});

var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: '',
            color: 'green',
            colors: [
                {number: 0, color:"green"},
                {number: 1, color:"yellow"},
                {number: 2, color:"pink"},
                {number: 3, color:"#5cbf2a"},
                {number: 4, color:"rgb(128, 255, 255)"}
            ],
            checkItem: 0
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleColorChange: function(color) {
        var self = this;
        this.setState({ color: color });
        this.state.colors.forEach(function(el) {
            if(el.color == color){
                self.setState({ checkItem: el.number});
            }
        });
    },

    handleNoteAdd: function() {
        var newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };
        if(this.state.text != ''){
            this.props.onNoteAdd(newNote);
            this.setState({ text: '' });
        }
    },

    render: function() {
        var handleColorChange = this.handleColorChange;
        var checked = this.state.checkItem;
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div>
                    {
                        this.state.colors.map(function(item) {
                            return <NotesColor checkItem={(checked == item.number) ? "color-checked" : ""} key={item.number} color={item.color} handleColorChange={handleColorChange}/>;
                        })
                    
                    }
                </div>
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
});

var NotesColor = React.createClass({
    render: function() {
        var color = this.props.color;
        var divStyle = {
            display: 'inline-block',
            width:50,
            height:50,
            marginRight: 10,
            backgroundColor: color,
            borderRadius: 25,
            cursor:'pointer'
        };
        return (
            <div className={this.props.checkItem} style={divStyle} onClick={()=>{this.props.handleColorChange(color)}}></div>
        );
    }
});


var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length || this.props.searchNotes !== prevProps.searchNotes) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;
            var rezult = this.props.notes.filter((el) => {
                var searchValue = el.text;
                return searchValue.indexOf(this.props.searchNotes) !== -1;
            });
        return (
            <div className="notes-grid" ref="grid">
                {
                    (rezult.length>0) ? (
                        rezult.map(function(note){
                            return (
                                <Note
                                    key={note.id}
                                    onDelete={onNoteDelete.bind(null, note)}
                                    color={note.color}>
                                    {note.text}
                                </Note>
                            );
                        })
                    ):(
                        <div>Ничего не найдено!!!</div>
                    )
                }
            </div>
        );
        
    }
});

var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            searchNotes: ""
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleSearch: function(event) {
        this.setState({
            searchNotes: event.text
        });
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NotesSearch  onSearch={this.handleSearch}/>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} searchNotes={this.state.searchNotes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);