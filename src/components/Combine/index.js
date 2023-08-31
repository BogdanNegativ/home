import React, { Component } from 'react';
import styles from './CombinedComponents.module.scss';

class CombinedComponents extends Component {
    constructor(props) {
        super(props);

        const currentDate = new Date();

        this.state = {
            currYear: currentDate.getFullYear(),
            currMonth: currentDate.getMonth(),
            currDay: currentDate.getDate(),
            time: "00:00:00",
        };

        this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
        this.Months = [
            'Січень',
            'Лютий',
            'Березень',
            'Квітень',
            'Травень',
            'Червень',
            'Липень',
            'Серпень',
            'Вересень',
            'Жовтень',
            'Листопад',
            'Грудень',
        ];
    }

    nextMonth = () => {
        const { currMonth, currYear } = this.state;

        if (currMonth === 11) {
            this.setState({ currMonth: 0, currYear: currYear + 1 }, this.showcurr);
        } else {
            this.setState({ currMonth: currMonth + 1 }, this.showcurr);
        }
    };

    previousMonth = () => {
        const { currMonth, currYear } = this.state;

        if (currMonth === 0) {
            this.setState({ currMonth: 11, currYear: currYear - 1 }, this.showcurr);
        } else {
            this.setState({ currMonth: currMonth - 1 }, this.showcurr);
        }
    };

    componentDidMount() {
        this.loadInterval = setInterval(this.getTime, 1000);
        this.showcurr();
    }

    componentWillUnmount() {
        clearInterval(this.loadInterval);
    }

    showcurr = () => {
        const { currYear, currMonth } = this.state;
        const d = new Date();
        const firstDayOfMonth = new Date(currYear, currMonth, 7).getDay();
        const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayOfLastMonth =
            currMonth === 0
                ? new Date(currYear - 1, 11, 0).getDate()
                : new Date(currYear, currMonth, 0).getDate();

        let html = '<table>';

        html += `<thead><tr><td colspan= 7">${this.Months[currMonth]} ${currYear}</td></tr></thead>`;
        html += '<tr class="days">';
        for (let i = 0; i < this.DaysOfWeek.length; i++) {
            html += `<td>${this.DaysOfWeek[i]}</td>`;
        }
        html += '</tr>';

        let i = 1;
        do {
            let dow = new Date(currYear, currMonth, i).getDay();

            if (dow === 1) {
                html += '<tr>';
            } else if (i === 1) {
                html += '<tr>';
                let k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (let j = 0; j < firstDayOfMonth; j++) {
                    html += `<td class=${styles.notcurrent}>${k}</td>`;
                    k++;
                }
            }

            if (currYear === d.getFullYear() && currMonth === d.getMonth() && i === d.getDate()) {
                html += `<td class=${styles.today}>${i}</td>`;
            } else {
                html += `<td class="normal">${i}</td>`;
            }

            if (dow === 0) {
                html += '</tr>';
            } else if (i === lastDateOfMonth) {
                let k = 1;
                for (dow; dow < 7; dow++) {
                    html += `<td class=${styles.notcurrent}>${k}</td>`;
                    k++;
                }
            }

            i++;
        } while (i <= lastDateOfMonth);

        html += '</table>';

        document.getElementById('divCal').innerHTML = html;
    };

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
        const { currYear, currMonth, time } = this.state;
        const currentDate = new Date();

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return (
            <div className={styles.container}>

                <div className={styles.calendarwrapper}>
                    <span
                        className={
                            time === "00:00:00" ? styles.time + " " + styles.blink : styles.time
                        }
                    >
                        {time}
                        <p>{currentDate.toLocaleDateString('uk-UA', options)}</p>
                    </span>
                    <button className={styles.btnPrev} type="button" onClick={this.previousMonth}>
                        &#60; Попередній
                    </button>
                    <button className={styles.btnNext} type="button" onClick={this.nextMonth}>
                        Наступний &#62;
                    </button>
                    <div id="divCal"></div>
                </div>

            </div>
        );
    }
}

export default CombinedComponents;
