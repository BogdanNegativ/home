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
            autoClickInterval: 1000,
        };
        this.intervalId = null;
    }

    componentDidMount() {
        this.ToggleAutoClick();
    }

    ToggleAutoClick = () => {
        if (this.state.autoClick) {
            clearInterval(this.intervalId);
        } else {
            this.intervalId = setInterval(this.Click, this.state.autoClickInterval);
        }
        this.setState({ autoClick: !this.state.autoClick });
    };

    Click = () => {
        const { count, step, mode } = this.state;
        const newValue = mode === 'add' ? count + step : count - step;
        this.setState({ count: newValue });
    };

    ToggleMode = () => {
        const newMode = this.state.mode === 'add' ? 'subtract' : 'add';
        this.setState({ mode: newMode });
    };

    ChangeStep = (event) => {
        this.setState({ step: parseInt(event.target.value) });
    };

    ChangeAutoClickInterval = (event) => {
        this.setState({ autoClickInterval: parseInt(event.target.value) });
    };


    render() {
        return (
            <div>
                <h1>ЛІЧИЛЬНИК</h1>
                <Display
                    count={this.state.count}
                    onToggleAutoClick={this.ToggleAutoClick}
                    autoClick={this.state.autoClick}
                    onManualStep={this.Click}
                    mode={this.state.mode}
                />
                <Settings
                    step={this.state.step}
                    mode={this.state.mode}
                    autoClick={this.state.autoClick}
                    autoClickInterval={this.state.autoClickInterval}
                    onToggleMode={this.ToggleMode}
                    onChangeStep={this.ChangeStep}
                    onChangeAutoClickInterval={this.ChangeAutoClickInterval}
                />


            </div>
        );
    }
}

export default Counter;
