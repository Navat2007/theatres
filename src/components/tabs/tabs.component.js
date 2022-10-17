import React from 'react';

const Tabs = ({children}) => {

    const [activeTab, setActiveTab] = React.useState(1);

    return (
        <div className="tab">
            <ul className="tab__list">
                {
                    children.map(child => (
                        <li onClick={() => setActiveTab(child.props.index)} key={child.props.title} className={`tab__item ${activeTab === child.props.index ? "--actived" : ""}`}>{child.props.title}</li>
                    ))
                }
            </ul>
            <div className="tab__container">
                {
                    children.filter(child => activeTab === child.props.index).map(child => (
                        <section key={child.props.title} className="tab__section --actived">
                            {child.props.children}
                        </section>
                    ))
                }
            </div>
        </div>
    );
};

export default Tabs;