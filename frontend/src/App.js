import logo from './logo.svg';
import './App.css';
import {incrementCounterAction} from "./redux/actions";
import {connect} from "react-redux";

import RoomList from 'apps/RoomList/components/RoomList';

const mapState = (state) => ({
    count: state.count
})

const mapDispatch = {
    incrementCounterAction
}

const App = connect(mapState, mapDispatch)(
    (props) => {
        const {
            count,
            incrementCounterAction
        } = props;

        // return (
        //     <div className="App">
        //         <header className="App-header">
        //             <div>
        //                 count: {count}
        //             </div>
        //             <button onClick={() => incrementCounterAction(1)}>Increment</button>
        //         </header>
        //     </div>
        // );

        return (
            <RoomList />
        )
    });

export default App;
