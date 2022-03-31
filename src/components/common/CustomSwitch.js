import React, { useState } from 'react';
import Switch from 'rc-switch';
// import 'rc-switch/assets/index.css';

export const CustomSwitch = ({className, checked, identity, handleOnChange}) => {
    const [isChecked, setIsChecked] = useState(checked);
    const onChange = (value) => {
        setIsChecked(value);
        handleOnChange(value, identity);
    }

    return (
        <Switch
            className={className}
            checked={isChecked}
            onChange={onChange}
        />
    );
}