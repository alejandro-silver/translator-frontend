import React from 'react';
import './Tooltip.scss';

const Tooltip = (props) => {
		const { data, style } = props
    return <p className='Tooltip' style={style}>{data}</p>
};

export default Tooltip;
