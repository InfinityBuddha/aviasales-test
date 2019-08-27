import React, { Component } from 'react';
import Ticket from './Ticket.jsx';
import s from './MainContainer.module.scss';
import cx from 'classnames';

class MainContainer extends Component {
    state = {
        tickets: []
    };

    componentDidMount() {
        this.fetchData()
    }

    getSearchId = () => fetch('https://front-test.beta.aviasales.ru/search')
        .then(response => response.json())
        .then(searchId => searchId)
        .catch(err => console.error(err));

    getTickets = (searchId) => fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
        .then(response => response.json())
        .then(tickets => this.setState(() => ({ tickets: tickets.tickets })))
        .catch(err => console.error(err));

    async fetchData() {
        try {
            const { searchId } = await this.getSearchId();
            await this.getTickets(searchId);
        } catch (err) {
            throw err;
        }
    }

    render() {
        const { tickets } = this.state;
        return (
            <div className={s.container}>
                <div className={s.filters}>
                    <div className={s.filter}>
                        <div className={s.header}>Количество пересадок</div>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            <span>Все</span>
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            <span>Без пересадок</span>
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            <span>1 пересадка</span>
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            <span>2 пересадки</span>
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            <span>3 пересадки</span>
                        </label>
                    </div>
                </div>
                <div className={s.ticketsBar}>
                    <ul className={s.tabs}>
                        <li className={cx(s.tab, s.active)}>Самый дешевый</li>
                        <li className={s.tab}>Самый быстрый</li>
                    </ul>
                    {tickets.map((ticket, i) => <Ticket
                        ticket={ticket}
                        key={`${ticket.carrier}${i}`}
                    />)}
                </div>
            </div>
        );
    }
}

MainContainer.propTypes = {};
MainContainer.defaultProps = {};

export default MainContainer;
