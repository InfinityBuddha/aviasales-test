import React from 'react';
import p from 'prop-types';
import s from './Checkbox.module.scss';

const Checkbox = ({ checkbox, handleChecked }) => {
    const onChange = e =>  handleChecked(e);
    return (
        <label className={s.checkbox}>
            <input type='checkbox' onChange={onChange} value={checkbox.type}
                   checked={checkbox.checked}/>
            <span>{checkbox.title}</span>
        </label>
    );
};

Checkbox.propTypes = {
    checkbox: p.shape({
        checked: p.bool,
        title: p.string,
        type: p.string
    }),
    handleChecked: p.func
};
Checkbox.defaultProps = {
    handleChecked: () => {}
};

export default Checkbox;
