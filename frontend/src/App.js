import logo from './logo.svg';
import './redux/chat/chat';
import './App.css';
import {connect} from "react-redux";
import Chat from "./apps/Chat";

const mapState = (state) => ({
    count: state.count
})

const mapDispatch = {
}


const App = connect(mapState, mapDispatch)(
    (props) => {
        const {
            count,
        } = props;

        return (
            <div className="App">
                <Chat/>
            </div>
        );
    });

export default App;
