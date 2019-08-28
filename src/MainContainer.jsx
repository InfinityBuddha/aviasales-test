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
        .then(tickets => this.setState(() => ({tickets: tickets.tickets.slice(0, 100)})))
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

    sortByDuration = () => (a, b) => this.compare({
        a: a.segments[0].duration + a.segments[1].duration,
        b: b.segments[0].duration + b.segments[1].duration
    });

    sortByPrice = () => (a, b) => this.compare({ a: a.price, b: b.price });

    sorting = ({ type, sortFunction }) => this.setState({
        tickets: this.state.tickets.sort(sortFunction),
        activeSort: type
    });

    handleCheckAll = (e) => {
        let filters = [...this.state.filters];
        filters.forEach(filter => filter.checked = e.target.checked);
        this.setState({ filters })
    };

    handleChecked = (e) => {
        const { value, checked } = e.target;
        let filters = [...this.state.filters];
        filters.forEach(item => {
            if (e.target.value === 'stops_all') {
                this.handleCheckAll(e)
            }
            if (item.type === value) {
                item.checked = checked;
            }
        });
        this.setState(() => ({ filters }))
    };

    renderTickets = (tickets) => {
        return tickets.map((ticket, i) => {
            if (ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0 && this.state.filters[1].checked) {
                return <Ticket
                    ticket={ticket}
                    key={`${ticket.carrier}${i}`}
                />
            }

            if (ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1 && this.state.filters[2].checked) {
                return <Ticket
                    ticket={ticket}
                    key={`${ticket.carrier}${i}`}
                />
            }

            if (ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2 && this.state.filters[3].checked) {
                return <Ticket
                    ticket={ticket}
                    key={`${ticket.carrier}${i}`}
                />
            }

            if (ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3 && this.state.filters[4].checked) {
                return <Ticket
                    ticket={ticket}
                    key={`${ticket.carrier}${i}`}
                />
            }
        })
    };

    render() {
        const { tickets, error, activeSort, filters } = this.state;
        const sorting = [
            { title: 'Самый дешевый', type: 'price', sortFunction: this.sortByPrice() },
            { title: 'Самый быстрый', type: 'duration', sortFunction: this.sortByDuration() }];

        return (
            <div className={s.container}>
                <div className={s.filters}>
                    <div className={s.filter}>
                        <div className={s.header}>Количество пересадок</div>
                        {filters.map(filter => {
                            return <label className={s.checkbox}>
                                <input type='checkbox' onChange={this.handleChecked} value={filter.type}
                                       checked={filter.checked}/>
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
                            onClick={() => this.sorting({
                                type: tab.type,
                                sortFunction: tab.sortFunction
                            })}>{tab.title}</li>)}
                    </ul>
                    {this.renderTickets(tickets)}
                    {error &&
                    <div className={s.errorMessage} onClick={() => document.location.reload(true)}>Ошибка! Перезагрузите
                        страницу.</div>}
                </div>
            </div>
        );
    }
}

MainContainer.propTypes = {};
MainContainer.defaultProps = {};

export default MainContainer;
