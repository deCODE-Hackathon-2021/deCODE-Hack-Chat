import './AskQuestion.css'
import 'reactjs-popup/dist/index.css';

import React, {useRef} from 'react';
import styled from 'styled-components'
import {questionsAddQuestion} from "../../../redux/questions/actions";
import {connect} from "react-redux";
import Popup from 'reactjs-popup'


const AskButton = styled.button`
    background: ${props => props.primary ? "#0584FE" : "white"};
    color: ${props => props.primary ? "white" : "#0584FE"};
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid #0584FE;
    border-radius: 3px;
    width: 100%;
    cursor: pointer;
`;

const Submit = styled.button`
    background: ${props => props.primary ? "#0584FE" : "white"};
    color: ${props => props.primary ? "white" : "#0584FE"};
    font-size: 1.5em;
    margin-top: 7em;
    padding: 0.25em 1em;
    border: 2px solid #0584FE;
    border-radius: 3px;
    width: 100%;
    cursor: pointer;
`;

const QuesInputForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`

const QuesInput = styled.input`
    padding: 10px;
    line-height: 140%;
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 1.5em;
`;

const mapDispatch = {questionsAddQuestion}

const AskQuestion = connect(undefined, mapDispatch)(
    (props) => {
        const {
            questionsAddQuestion
        } = props;

        const inputRef = useRef(null);

        const submitQuestion = (e) => {
            e?.preventDefault();

            questionsAddQuestion({
                question: inputRef.current.value,
                isAnon: false
            });
        }

        return (
            <Popup
                trigger={
                    <AskButton primary>Ask Question</AskButton>}
                modal
                nested
            >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header">Submit a Question</div>
                        <QuesInputForm onSubmit={(e) => {
                            submitQuestion(e);
                            close();
                        }}>
                            <QuesInput ref={inputRef} placeholder={"What's your question?"}/>
                            <Submit primary type={'submit'}
                                    onClick={(e) => {
                                        submitQuestion();
                                        close();
                                    }}
                            >
                                Submit
                            </Submit>
                        </QuesInputForm>

                    </div>
                )}
            </Popup>
        )
    }
)

export default AskQuestion
