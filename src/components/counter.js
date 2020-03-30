import * as React from 'react';
import './counter.css';
import { connect } from 'react-redux';

export class CounterBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Counter</p>
                <Counter id="0" />
                <Counter id="1" />
                <p>Sum: {this.props.sum}</p>
            </div>
        )
    }
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.changeSum = this.changeSum.bind(this);
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
        this.state = {
            value: 0
        }
    }

    changeSum() {
        this.props.dispatch({
            type: 'changeSum',
            payload: {
                id: this.props.id,
                value: this.state.value
            }
        })
    }

    decrease() {
        let _this = this;
        _this.setState({
            value: this.state.value - 1,
        }, () => {
            _this.changeSum();
        })
    }

    increase() {
        let _this = this;
        _this.setState({
            value: this.state.value + 1,
        }, () => {
            _this.changeSum();
        })
    }

    render() {
        const { value } = this.state;
        return (
            <div className="counter">
                <button className="counter-button" onClick={this.decrease}>Decrease</button>
                <span>{value}</span>
                <button className="counter-button" onClick={this.increase}>Increase</button>
            </div>
        )
    }
}

export function reducer(state = {number: [0, 0], sum: 0}, action = {}) {
    if (action.type === 'changeSum') {
        let { id, value } = action.payload;
        console.log("id: ", id, "value: ", value);
        state.number[id] = value;
        let _sum = 0;
        for (let i = 0; i < state.number.length; i++) {
            _sum += state.number[i];
        }
        return Object.assign({}, state, { sum: _sum });
    } else {
        return state;
    }
}

const CounterSTP = (state) => ({});

const CounterBodySTP = (state) => ({
    sum: state.sum
});

const DTP = (dispatch) => ({
    dispatch: dispatch
});

Counter = connect(CounterSTP, DTP)(Counter);

CounterBody = connect(CounterBodySTP, DTP)(CounterBody);
