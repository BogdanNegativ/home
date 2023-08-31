import React, { Component } from 'react';
import styles from './Clock.module.scss';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "00:00:00",
            currentDate: new Date()
        };
    }

    componentDidMount() {
        this.loadInterval = setInterval(this.getTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.loadInterval);
    }

    getTime = () => {
        const addZero = n => (n < 10 ? "0" + n : n);

        let d = new Date();
        let h = addZero(d.getHours());
        let m = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());
        let t = `${h}:${m}:${s}`;

        this.setState({
            time: t
        });
    };

    render() {
        const { currentDate } = this.state;

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return (
            <span
                className={
                    this.state.time === "00:00:00" ? styles.time + " " + styles.blink : styles.time
                }
            >
                {this.state.time}
                <p>{currentDate.toLocaleDateString('uk-UA', options)}</p>
            </span>
        );
    }
}

export default Clock;
