import React from 'react';
import p from 'prop-types';
import s from './MainContainer.module.scss';

const timeConvert = (time) => {
    const hours = (time / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours}ч ${rminutes}м`
};

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
                    <span className={s.value}>
                        10:45 – 08:00
                    </span>
                </div>
                <div className={s.cell}>
                    <span className={s.title}>В пути</span>
                    <span className={s.value}>{timeConvert(ticket.segments[0].duration)}</span>
                </div>
                <div className={s.cell}>
                     <span className={s.title}>
                        2 пересадки
                    </span>
                    <span className={s.value}>
                        HKG, JNB
                    </span>
                </div>
            </div>
            <div className={s.row}>
                <div className={s.cell}>
                    <span className={s.title}>MOW – HKT</span>
                    <span className={s.value}>10:45 – 08:00</span>
                </div>
                <div className={s.cell}>
                    <span className={s.title}>В пути</span>
                    <span className={s.value}>{timeConvert(ticket.segments[1].duration)}</span>
                </div>
                <div className={s.cell}>
                    <span className={s.title}>2 пересадки</span>
                    <span className={s.value}>HKG, JNB</span>
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
