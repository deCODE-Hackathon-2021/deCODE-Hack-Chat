import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {questionsAddVote, questionsRemoveVote} from "../../../redux/questions/actions";

const questionMapState = (state, props) => ({
    user: state.chat.members[props.question.userId],
    didVote: props.question.likes.includes(state.chat.userIdentity)
})

const questionsMapDispatch = {
    questionsAddVote,
    questionsRemoveVote
}

const QuestionText = styled.div`
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
`
const QuestionAuthor = styled.div`
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.8em;
`

const QuestionContentWrapper = styled.div`
    flex-grow: 1;
`

const QuestionWrapper = styled.div`
    display: flex;
    padding: 8px 0px 8px 0px;
`

const QuestionVotesWrapper = styled.div`
    color: ${props => props.didVote ? '#0584FE' : 'rgba(0, 0,0,0.5)'};
    padding-right: 8px;
    padding-left: 8px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Question = connect(questionMapState, questionsMapDispatch)((props) => {
    const {
        question,
        user,
        didVote,
        questionsAddVote,
        questionsRemoveVote
    } = props;

    return <QuestionWrapper>
        <QuestionContentWrapper>
            <QuestionText>
                {question.question}
            </QuestionText>
            <QuestionAuthor>
                {question.isAnon || !user ? 'Anonymous' : user?.friendlyName}
            </QuestionAuthor>
        </QuestionContentWrapper>
        <QuestionWrapper onClick={() => (didVote ? questionsRemoveVote : questionsAddVote)(question.questionId)}>
            <QuestionVotesWrapper didVote={didVote}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill={`${didVote ? '#0584FE' : 'rgba(0, 0, 0, 0.5)'}`}
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.800482 12H15.2009C15.3467 11.9995 15.4896 11.9593 15.6142 11.8835C15.7389 11.8077 15.8405 11.6993 15.9083 11.57C15.976 11.4406 16.0072 11.2953 15.9986 11.1495C15.99 11.0037 15.9418 10.863 15.8593 10.7426L8.65911 0.323978C8.3607 -0.107993 7.64228 -0.107993 7.34307 0.323978L0.142863 10.7426C0.0595205 10.8627 0.0106466 11.0035 0.00155118 11.1495C-0.00754424 11.2956 0.0234868 11.4413 0.0912727 11.5709C0.159059 11.7005 0.261007 11.8091 0.386041 11.8847C0.511075 11.9604 0.654414 12.0002 0.800482 12Z"/>
                </svg>
                {question.likes.length}
            </QuestionVotesWrapper>
        </QuestionWrapper>
    </QuestionWrapper>
})

const Wrapper = styled.div`
overflow-y: auto;
`

const mapState = (state) => ({
    questions: state.questions.questions
})

const mapDispatch = {}

const Questions = connect(mapState, mapDispatch)((props) => {
    const {
        questions
    } = props;

    return <Wrapper>
        {questions.map(q => <Question key={q.questionId} question={q}/>)}
    </Wrapper>
})

export default Questions
