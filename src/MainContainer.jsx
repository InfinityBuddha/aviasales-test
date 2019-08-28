import React, { Component } from 'react';
import p from 'prop-types';
import Ticket from './Ticket.jsx';
import s from './MainContainer.module.scss';
import { sortByPrice, sortByDuration } from './helpers.js';
import Checkbox from "./Checkbox";
import Tab from "./Tab";
import Logo from "./static/Logo";

class MainContainer extends Component {
    state = {
        tickets: [],
        ticketsError: false,
        isFetching: false,
        activeSort: '',
        filters: [
            { title: 'Все', type: 'stops_all', checked: false },
            { title: 'Без пересадок', type: 'stops_0', checked: true },
            { title: '1 пересадка', type: 'stops_1', checked: true},
            { title: '2 пересадки', type: 'stops_2', checked: true },
            { title: '3 пересадки', type: 'stops_3', checked: false }
        ],
    };

    componentDidMount() {
        this.fetchData();
    }

    getSearchId = () => fetch('https://front-test.beta.aviasales.ru/search')
        .then(response => {
            this.setState(() => ({ isFetching: true }));
            return response.json()
        })
        .then(searchId => searchId)
        .catch(err => {
            this.setState(() => ({ error: true }));
            throw err;
        });

    getTickets = (searchId) => fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
        .then(response => response.json())
        .then(tickets => this.setState(() => ({ tickets: tickets.tickets.slice(0, 100), isFetching: false })))
        .catch(err => {
            this.setState(() => ({ error: true, isFetching: false }));
            throw err;
        });

    async fetchData() {
        try {
            const { searchId } = await this.getSearchId();
            await this.getTickets(searchId);
            this.sorting({ type: 'price', sortFunction: sortByPrice() })
        } catch (err) {
            this.setState(() => ({ error: true }));
            throw err;
        }
    }

    sorting = ({ type, sortFunction }) => this.setState({
        tickets: this.state.tickets.sort(sortFunction),
        activeSort: type
    });

    handleCheckAll = (e) => {
        let filters = [...this.state.filters];

        if (filters.every(filter => filter.checked)) {
            this.setState({
                filters: filters[0].checked = false
            })
        }
        if (e.target.value === 'stops_all') {
            filters.forEach(filter => filter.checked = e.target.checked);
            this.setState({ filters })
        }
    };

    handleChecked = (e) => {
        const { value, checked } = e.target;
        let filters = [...this.state.filters];
        filters.forEach(item => {
            this.handleCheckAll(e)
            if (item.type === value) {
                item.checked = checked;
            }
        });
        this.setState(() => ({ filters }));
    };

    renderTickets = (tickets) => {
        return tickets.map((ticket, i) => {
            if (this.state.filters[0].checked) {
                return <Ticket
                    ticket={ticket}
                    key={`${ticket.carrier}${i}`}
                />
            }

            if ((this.state.filters[1].checked && ticket.segments.every(item => item.stops.length === 0)) ||
                (this.state.filters[2].checked && ticket.segments.every(item => item.stops.length >= 0 && item.stops.length <= 1)) ||
                (this.state.filters[3].checked && ticket.segments.every(item => item.stops.length >= 1 && item.stops.length <= 2)) ||
                (this.state.filters[4].checked && ticket.segments.every(item => item.stops.length >= 2 && item.stops.length <= 3))
            ) {
                return <Ticket
                    ticket={ticket}
                    key={`${ticket.carrier}${i}`}
                />
            }
        })
    };

    render() {
        const { tickets, error, activeSort, filters, isFetching } = this.state;
        const sorting = [
            { title: 'Самый дешевый', type: 'price', sortFunction: sortByPrice() },
            { title: 'Самый быстрый', type: 'duration', sortFunction: sortByDuration() }];

        return (
            <div className={s.container}>
                <div className={s.filters}>
                    <div className={s.filter}>
                        <div className={s.header}>Количество пересадок</div>
                        {filters.map((filter, i) => <Checkbox
                                checkbox={filter}
                                key={i}
                                handleChecked={this.handleChecked}
                            />
                        )}
                    </div>
                </div>
                <div className={s.ticketsBar}>
                    <Tab
                        tabs={sorting}
                        activeTab={activeSort}
                        onClick={this.sorting}
                    />

                    {this.renderTickets(tickets)}

                    {isFetching && <Logo className={s.logo}/>}
                    {error &&
                    <div className={s.errorMessage} onClick={() => document.location.reload(true)}>Ошибка! Перезагрузите
                        страницу.</div>}
                </div>
            </div>
        );
    }
}

MainContainer.propTypes = {
    activeSort: p.string,
    filter: p.array,
    tickets: p.array,
    ticketError: p.bool
};

export default MainContainer;

