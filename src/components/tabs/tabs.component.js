import React from 'react';
import {motion, AnimatePresence} from "framer-motion";

const Tabs = ({
    extraClass,
    children
}) => {

    const [activeTab, setActiveTab] = React.useState(1);

    console.log(children);

    return (
        <div>
            <nav>
                <ul>
                    {
                        children.map(child => (
                            <li
                                key={child.props.title}
                                onClick={() => setActiveTab(child.props.index)}
                                className={child.props.index === activeTab ? "selected" : ""}
                            >
                                {child.props.title}
                                {child.props.index === activeTab ? (
                                    <motion.div className="underline" layoutId="underline" />
                                ) : null}
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <main>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={activeTab}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {
                            children.filter(child => activeTab === child.props.index).map(child => (
                                <section
                                    key={child.props.title}
                                    className={child.props.extraClass}
                                >
                                    {child.props.children}
                                </section>
                            ))
                        }
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>

    );
};

export default Tabs;

// <div className={`tab ` + extraClass}>
//     <ul className="tab__list">
//         {
//             children.map(child => (
//                 <li onClick={() => setActiveTab(child.props.index)} key={child.props.title} className={`tab__item ${activeTab === child.props.index ? "--actived" : ""}`}>{child.props.title}</li>
//             ))
//         }
//     </ul>
//     {
//         children.filter(child => activeTab === child.props.index).map(child => (
//             <section key={child.props.title} className={child.props.className}>
//                 {child.props.children}
//             </section>
//         ))
//     }
// </div>