import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from './tabs.module.scss';

console.log(styles);
const Tabs = ({
    extraClass,
    children
}) => {

    const [activeTab, setActiveTab] = React.useState(1);

    return (
        <div className={styles.tabs}>
            <ul className={styles.list}>
                {
                    children.map(child => (
                        <li
                            key={child.props.title}
                            onClick={() => setActiveTab(child.props.index)}
                            className={styles.item + (child.props.index === activeTab ? ` ` + styles.item_actived : "")}
                        >
                            {child.props.title}
                        </li>
                    ))
                }
            </ul>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={activeTab}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
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
        </div>

    );
};

export default Tabs;