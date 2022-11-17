import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from './accordion.module.scss';

const More = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width='24'
        height='24'
    >
        <path fill='currentColor' d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
);

const Less = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width='24'
        height='24'
    >
        <path fill='currentColor' d="M19,13H5V11H19V13Z" />
    </svg>
);

const Accordion = ({
    theme = 'text',
    icon = 'plus',
    extraClass,
    children,
    title,
    ...rest
}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const config = [
        styles.accordion,
        theme ? styles["accordion_theme_" + theme] : null,
        icon ? styles["accordion_icon_" + icon] : null,
        extraClass,
    ];

    const finalClassName = config.filter(Boolean).join(' ');

    return (
        <div className={finalClassName}>
            <div
                aria-controls={title}
                aria-expanded={isOpen}
                className={styles.caption}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div>{title}</div>
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        className={styles.icon}
                        key={isOpen ? "minus" : "plus"}
                        initial={{
                            rotate: isOpen ? -90 : 90,
                        }}
                        animate={{
                            rotate: 0,
                            transition: {
                                type: "tween",
                                duration: 0.15,
                                ease: "circOut",
                            },
                        }}
                        exit={{
                            rotate: isOpen ? -90 : 90,
                            transition: {
                                type: "tween",
                                duration: 0.15,
                                ease: "circIn",
                            },
                        }}
                    >
                        {isOpen ? <Less /> : <More />}
                    </motion.div>
                </AnimatePresence>
            </div>
            <motion.div
                id={title}
                initial={false}
                animate={
                    isOpen
                        ? {
                            height: "auto",
                            opacity: 1,
                            display: "block",
                            transition: {
                                height: {
                                    duration: 0.4,
                                },
                                opacity: {
                                    duration: 0.25,
                                    delay: 0.15,
                                },
                            },
                        }
                        : {
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: {
                                    duration: 0.4,
                                },
                                opacity: {
                                    duration: 0.25,
                                },
                            },
                            transitionEnd: {
                                display: "none",
                            },
                        }
                }
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Accordion;