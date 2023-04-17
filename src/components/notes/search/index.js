import React, { useState, useRef} from 'react';
import { Input, Column, Button } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Search(props) {
    const [query, setQuery] = useState("");
    const [timer, setTimer] = useState(null);

    // Use a ref to access the current count value in
    // an async callback.
    const queryRef = useRef(query);
    queryRef.current = query;

    const handleChange = () => {
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            props.searchNotes(queryRef.current)
        }, 500));
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.searchNotes(query)
            console.log(query, e.key);
        }
    }

    return (
        <Column.Group className="is-vcentered" breakpoint="mobile">
            <Column size="9" offset={1}>
                <Input type="text"
                       name={query}
                       value={query}
                       placeholder="Buscar anotações..."
                       onChange={(e) => {
                           setQuery(e.target.value);
                           console.log(e.target.value);
                           handleChange();
                       }}
                       onKeyDown={handleKeyDown} />
            </Column>
            <Column mobile={2} size={1}>
                <Button href="#" onClick={() => {
                    props.fetchNotes()
                    setQuery('')
                }}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        color="grey"
                        className="is-pulled-left  "
                    />
                </Button>
            </Column>
        </Column.Group>
    )
}

export default Search;