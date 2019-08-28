import React, { Component } from 'react';
import Ticket from './Ticket.jsx';
import s from './MainContainer.module.scss';
import cx from 'classnames';

class MainContainer extends Component {
    state = {
        tickets: [],
        ticketsError: undefined,
        activeSort: undefined,
        filters: [
            { title: 'Все', type: 'stops_all', checked: false },
            { title: 'Без пересадок', type: 'stops_0', checked: false },
            { title: '1 пересадка', type: 'stops_1', checked: false },
            { title: '2 пересадки', type: 'stops_2', checked: false },
            { title: '3 пересадки', type: 'stops_3', checked: false }
        ]
    };

    componentDidMount() {
        this.fetchData();
    }

    getSearchId = () => fetch('https://front-test.beta.aviasales.ru/search')
        .then(response => response.json())
        .then(searchId => searchId)
        .catch(err => {
            this.setState(() => ({ error: true }));
            throw err;
        });

    getTickets = (searchId) => fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
        .then(response => response.json())
        .then(tickets => this.setState(() => ({ tickets: tickets.tickets.slice(0, 100)})))
        .catch(err => {
            this.setState(() => ({ error: true }));
            throw err;
        });

    async fetchData() {
        try {
            const { searchId } = await this.getSearchId();
            await this.getTickets(searchId);
            this.sorting({ type: 'price', sortFunction: this.sortByPrice() })
        } catch (err) {
            this.setState(() => ({ error: true }));
            throw err;
        }
    }

    compare = ({ a = 0, b = 0 }) => {
        if (a === b) {
            return 0;
        }
        return a > b ? 1 : -1;
    };

    sortByDuration = () => (a, b) => this.compare({ a: a.segments[0].duration + a.segments[1].duration, b: b.segments[0].duration + b.segments[1].duration });

    sortByPrice = () => (a, b) => this.compare({ a: a.price, b: b.price });

    sorting = ({ type, sortFunction }) => this.setState({ tickets: this.state.tickets.sort(sortFunction), activeSort: type });

    filter = ({ type, checked }) => {
        const newFilters = [...this.state.filters];
        const ticketsToFilter = [...this.state.tickets];
        const filterFunction = (item) => {
            switch (type) {
                case 'stops_all': {
                    return true;
                }

                case 'stops_0': {
                    return item.segments.every(item => item.stops.length === 0)
                }

                case 'stops_1': {
                    return item.segments.every(item => item.stops.length === 1)
                }

                case 'stops_2': {
                    return item.segments.every(item => item.stops.length === 2)
                }

                case 'stops_3': {
                    return item.segments.every(item => item.stops.length === 3)
                }
                default: {
                    break;
                }
            }
        };
        const result = newFilters.map(item => {
            if (item.type === type && item.checked) {
                item.checked = false;
            } else if (item.type === type && !item.checked) {
                item.checked = true;
            }
            return item;
        });

        this.setState({
            filters: result
        })
    };

    handleCheckAll = (e) => {
        let filters = [...this.state.filters];
        filters.forEach(filter => filter.checked = e.target.checked);
        this.setState({ filters })
    };

    handleChecked = (e) => {
        let filters = [...this.state.filters];
        filters.forEach(item => {
            if (e.target.value === 'stops_all') {
                this.handleCheckAll(e)
            }
            if (item.type === e.target.value) {
                item.checked = e.target.checked;
            }
        });
        this.setState({ filters })
    };

    render() {
        const { tickets, error, activeSort } = this.state;
        const sorting = [
            { title: 'Самый дешевый', type: 'price', sortFunction: this.sortByPrice()},
            { title: 'Самый быстрый', type: 'duration', sortFunction: this.sortByDuration()}];

        return (
            <div className={s.container}>
                <div className={s.filters}>
                    <div className={s.filter}>
                        <div className={s.header}>Количество пересадок</div>
                        {this.state.filters.map(filter => {
                            return <label className={s.checkbox}>
                                <input type='checkbox' onChange={this.handleChecked} value={filter.type} checked={filter.checked} />
                                <span>{filter.title}</span>
                            </label>
                        })}
                    </div>
                </div>
                <div className={s.ticketsBar}>
                    <ul className={s.sorting}>
                        {sorting.map(tab => <li
                            className={cx(s.sortTab,
                                activeSort === tab.type && s.active)}
                            onClick={() => this.sorting({ type: tab.type, sortFunction: tab.sortFunction })}>{tab.title}</li>)}
                    </ul>
                    {tickets.map((ticket, i) => <Ticket
                        ticket={ticket}
                        key={`${ticket.carrier}${i}`}
                    />)}
                    {error &&
                    <div className={s.errorMessage} onClick={() => document.location.reload(true)}>Ошибка! Перезагрузите страницу.</div>}
                </div>
            </div>
        );
    }
}

MainContainer.propTypes = {};
MainContainer.defaultProps = {};

export default MainContainer;
