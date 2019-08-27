import React, { Component } from 'react';
import s from './MainContainer.module.scss';
import cx from 'classnames';

class MainContainer extends Component {
    render() {
        return (
            <div className={s.container}>
                <div className={s.filters}>
                    <div className={s.filter}>
                        <div className={s.header}>Количество пересадок</div>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            Все
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            Без пересадок
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            1 пересадка
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            2 пересадки
                        </label>
                        <label className={s.checkbox}>
                            <input type='checkbox'/>
                            3 пересадки
                        </label>
                    </div>
                </div>
                <div className={s.ticketsBar}>
                    <ul className={s.tabs}>
                        <li className={cx(s.tab, s.active)}>Самый дешевый</li>
                        <li className={s.tab}>Самый быстрый</li>
                    </ul>
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
