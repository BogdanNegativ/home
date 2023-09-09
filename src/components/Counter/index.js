import React, { Component } from 'react';
import Settings from './Settings';
import Display from './Display';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            step: 1,
            mode: 'add',
            autoClick: false,
            autoClickInterval: 1000, // Default interval in milliseconds
        };
        this.intervalId = null;
    }

    handleToggleAutoClick = () => {
        if (this.state.autoClick) {
            clearInterval(this.intervalId);
        } else {
            this.intervalId = setInterval(this.handleAutoClick, this.state.autoClickInterval);
        }
        this.setState({ autoClick: !this.state.autoClick });
    };

    handleAutoClick = () => {
        const { count, step, mode } = this.state;
        const newValue = mode === 'add' ? count + step : count - step;
        this.setState({ count: newValue });
    };

    handleToggleMode = () => {
        const newMode = this.state.mode === 'add' ? 'subtract' : 'add';
        this.setState({ mode: newMode });
    };

    handleChangeStep = (event) => {
        this.setState({ step: parseInt(event.target.value) });
    };

    handleChangeAutoClickInterval = (event) => {
        this.setState({ autoClickInterval: parseInt(event.target.value) });
    };


    render() {
        return (
            <div>
                <h1>ЛІЧИЛЬНИК</h1>
                <Settings
                    step={this.state.step}
                    mode={this.state.mode}
                    autoClick={this.state.autoClick}
                    autoClickInterval={this.state.autoClickInterval}
                    onToggleMode={this.handleToggleMode}
                    onChangeStep={this.handleChangeStep}
                    onChangeAutoClickInterval={this.handleChangeAutoClickInterval}
                />
                <Display
                    count={this.state.count}
                    onToggleAutoClick={this.handleToggleAutoClick}
                    autoClick={this.state.autoClick}
                />

            </div>
        );
    }
}

export default Counter;
