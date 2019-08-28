import React from 'react';
import p from 'prop-types';
import s from "./Tab.module.scss";
import cx from "classnames";

const Tab = ({ tabs, activeTab, onClick }) => {
    return (
        <ul className={s.tabs}>
            {tabs.map((tab, i) => <li
                key={i}
                className={cx(s.tab,
                    activeTab === tab.type && s.active)}
                onClick={() => onClick({
                    type: tab.type,
                    sortFunction: tab.sortFunction
                })}>{tab.title}</li>)}
        </ul>
    );
};

Tab.propTypes = {
    tabs: p.arrayOf(p.shape({ title: p.string, type: p.string, sortFunction: p.func })).isRequired
};

export default Tab;
