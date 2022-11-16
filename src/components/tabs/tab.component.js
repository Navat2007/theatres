import React from 'react';

const Tab = ({
    index,
    title,
    extraClass,
    children,
}) => {
    return (
        <section className={`tab__section ` + extraClass}>
            {children}
        </section>
    );
};

export default Tab;