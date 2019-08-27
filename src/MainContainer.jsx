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
