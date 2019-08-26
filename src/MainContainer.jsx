import React, { Component } from 'react';
import s from './MainContainer.module.scss';

class MainContainer extends Component {
    render() {
        return (
            <div className={s.container}>
                <div className={s.sidebar}>
                    <span>Количество пересадок</span>
                    <input type='checkbox'/>
                    <input type='checkbox'/>
                    <input type='checkbox'/>
                    <input type='checkbox'/>
                    <input type='checkbox'/>
                    <input type='checkbox'/>
                </div>
                <div className={s.ticketsBar}>
                    <div className={s.filter}>
                        <button type='button' className={s.btn}>Самый дешевый</button>
                        <button type='button' className={s.btn}>Самый быстрый</button>
                    </div>
                    <div className={s.ticket}>
                        <div className={s.header}>
                            <span className={s.price}>13 400 Р</span>
                            <div className={s.logo}>
                                Airlines
                            </div>
                        </div>
                        <div className={s.row}>
                            <div className={s.cell}>
                                <span className={s.title}>
                                    MOW – HKT
                                </span>
                                <span className={s.value}>
                                    10:45 – 08:00
                                </span>
                            </div>
                            <div className={s.cell}>
                                <span className={s.title}>
                                В пути
                                </span>
                                <span className={s.value}>
                                 21ч 15м
                                </span>
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
                                <span className={s.title}>
                                    MOW – HKT
                                </span>
                                <span className={s.value}>
                                    10:45 – 08:00
                                </span>
                            </div>
                            <div className={s.cell}>
                                <span className={s.title}>
                                В пути
                                </span>
                                <span className={s.value}>
                                 21ч 15м
                                </span>
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

                    </div>
                </div>
            </div>
        );
    }
}

MainContainer.propTypes = {};
MainContainer.defaultProps = {};

export default MainContainer;
