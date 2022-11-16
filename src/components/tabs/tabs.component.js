import React from 'react';

const Tabs = ({
    extraClass,
    children
}) => {

    const [activeTab, setActiveTab] = React.useState(1);

    return (
        <div className={`tab ` + extraClass}>
            <ul className="tab__list">
                {
                    children.map(child => (
                        <li onClick={() => setActiveTab(child.props.index)} key={child.props.title} className={`tab__item ${activeTab === child.props.index ? "--actived" : ""}`}>{child.props.title}</li>
                    ))
                }
            </ul>
            {
                children.filter(child => activeTab === child.props.index).map(child => (
                    <section key={child.props.title} className={child.props.className}>
                        {child.props.children}
                    </section>
                ))
            }
        </div>
    );
};

export default Tabs;