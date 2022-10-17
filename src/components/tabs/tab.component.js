import React from 'react';

const Tab = ({children, index, title}) => {
    return (
        <section className="tab__section">
            {children}
        </section>
    );
};

export default Tab;