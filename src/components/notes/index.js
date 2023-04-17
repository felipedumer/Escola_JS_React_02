import React, {useState, useEffect, Fragment} from "react";
import '../../styles/notes.scss';
import {push as Menu} from "react-burger-menu";
import {Column} from "rbx";
import List from "../notes/list";
import Editor from "../notes/editor";
import Search from "../notes/search";
import NotesService from "../../services/notes";
import AuthUser from "../auth/verify_token";

function Notes(props) {
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrentNote] = useState({title: "", body: "", id: ""});

    async function fetchNotes() {
        const response = await NotesService.index();
        if (response.status === 200) {
            if (response.data.length >= 1) {
                setNotes(response.data.reverse());
                setCurrentNote(response.data[0]);
            } else {
                setNotes([]);
                setCurrentNote({title: "", body: "", id: ""});
            }
        }
        else {
            await AuthUser().then(res => console.log(res)).catch(res => console.log(res));
            window.location.reload();
        }
    }

    const createNote = async (note) => {
        await NotesService.create(note);
        fetchNotes();
    }

    const deleteNote = async (note) => {
        await NotesService.delete(note._id);
        fetchNotes();
    }

    const updateNote = async (oldNote, params) => {
        if (oldNote.id !== '') {
            const response = await NotesService.update(oldNote._id, params);
            if (response.status !== 200) {
                await AuthUser().then(res => console.log(res)).catch(res => console.log(res));
                window.location.reload();
            }
            const index = notes.indexOf(oldNote);
            notes[index].body = params.body;
            notes[index].title = params.title;
        } else {
            await NotesService.create(params);
            fetchNotes();
        }

    }

    const searchNotes = async (query) => {
        if (query === '') {
            fetchNotes();
        } else {
            const response = await NotesService.search(query);
            setNotes(response.data);
        }
    }

    const selectNote = (id) => {
        const note = notes.find((note) => {
            return note._id === id;
        })
        setCurrentNote(note);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <Fragment>
            <Column.Group className="notes" id="notes">
                <Menu
                    pageWrapId={"notes-editor"}
                    isOpen={props.isOpen}
                    onStateChange={(state) => props.setIsOpen(state.isOpen)}
                    disableAutoFocus
                    outerContainerId={"notes"}
                    customBurgerIcon={false}
                    customCrossIcon={false}
                >
                    <Column.Group>
                        <Column size={9} offset={0}>
                            <Search searchNotes={searchNotes} fetchNotes={fetchNotes}/>
                        </Column>
                    </Column.Group>
                    <List
                        notes={notes}
                        selectNote={selectNote}
                        current_note={current_note}
                        deleteNote={deleteNote}
                        createNote={createNote}/>
                </Menu>


                <Column size={12} className="notes-editor" id="notes-editor">
                    <Editor
                        note={current_note}
                        updateNote={updateNote}
                    />
                </Column>
            </Column.Group>
        </Fragment>
    );
};

export default Notes;