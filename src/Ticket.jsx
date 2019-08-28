import React from 'react';
import p from 'prop-types';
import dayjs from 'dayjs';
import { timeConvert } from './helpers.js';
import s from './Ticket.module.scss';

const Ticket = ({ ticket }) => {
    return (
        <div className={s.ticket}>
            <div className={s.header}>
                <span className={s.price}>{ticket.price} Р</span>
                <div className={s.logo}>
                    <picture>
                        <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
                             srcSet={`//pics.avs.io/99/36/${ticket.carrier}@2x.png 2x`}
                             alt={ticket.carrier}
                             title={ticket.carrier}
                        />
                    </picture>
                </div>
            </div>
            <div className={s.row}>
                <div className={s.cell}>
                    <span className={s.title}>
                        {ticket.segments[0].origin} – {ticket.segments[0].destination}
                    </span>
                    <span className={s.value}>{`${dayjs(new Date(ticket.segments[0].date)).format('HH:mm')} - ${dayjs(new Date(ticket.segments[0].date))
                        .add(timeConvert(ticket.segments[0].duration).hours, 'hours')
                        .add(timeConvert(ticket.segments[0].duration).minutes, 'minutes')
                        .format('HH:mm')
                    }`}</span>
                </div>
                <div className={s.cell}>
                    <span className={s.title}>В пути</span>
                    <span className={s.value}>{timeConvert(ticket.segments[0].duration)['HH:mm']}</span>
                </div>
                <div className={s.cell}>
                     <span className={s.title}>{ticket.segments[0].stops && ticket.segments[0].stops.length} пересадки</span>
                    <span className={s.value}>{ticket.segments[0].stops.join(', ') || '-'}</span>
                </div>
            </div>
            <div className={s.row}>
                <div className={s.cell}>
                    <span className={s.title}>{ticket.segments[1].origin} – {ticket.segments[1].destination}</span>
                    <span className={s.value}>{`${dayjs(new Date(ticket.segments[1].date)).format('HH:mm')} - ${dayjs(new Date(ticket.segments[1].date))
                        .add(timeConvert(ticket.segments[1].duration).hours, 'hours')
                        .add(timeConvert(ticket.segments[1].duration).minutes, 'minutes')
                        .format('HH:mm')
                        }`}</span>
                </div>
                <div className={s.cell}>
                    <span className={s.title}>В пути</span>
                    <span className={s.value}>{timeConvert(ticket.segments[1].duration)['HH:mm']}</span>
                </div>
                <div className={s.cell}>
                    <span className={s.title}>{ticket.segments[1].stops && ticket.segments[1].stops.length} пересадки</span>
                    <span className={s.value}>{(ticket.segments[1].stops && ticket.segments[1].stops.join(', ')) || '-'}</span>
                </div>
            </div>

        </div>
    );
};

Ticket.propTypes = {
    ticket: p.shape({
        carrier: p.string,
        price: p.number,
        segments: p.arrayOf(
            p.shape({
                date: p.string,
                destination: p.string,
                duration: p.number,
                origin: p.string,
                stops: p.arrayOf(p.string, p.string)
            }),
            p.shape({
                date: p.string,
                destination: p.string,
                duration: p.number,
                origin: p.string,
                stops: p.arrayOf(p.string, p.string)
            }))
    }).isRequired
};

export default Ticket;
