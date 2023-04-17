import React, {Fragment, useState, useEffect, useRef} from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor(props) {
    const [currentContent, setCurrentContent] = useState('')
    const [timer, setTimer] = useState(null);

    // usando Ref
    const currentContentRef = useRef(currentContent);
    currentContentRef.current = currentContent;

    const updateNote = (content) => {
        const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30);
        props.updateNote(props.note, {'title': title, 'body': content});
    }

    const handleChange = (content, delta, source) => {
        clearTimeout(timer);

        if(source === 'user') {
            setCurrentContent(content);
            setTimer(setTimeout(() => updateNote(currentContentRef.current), 1000));
        }
    }

    useEffect(()=> {
        setCurrentContent(props.note.body)
    }, [props.note])

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean'],
        ]
    }

    return (
        <Fragment>
            <ReactQuill value={currentContent} onChange={handleChange} modules={modules} />
        </Fragment>
    )
}

export default Editor;