import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {More, Less} from "../../svgs";

const Accordion = ({children, title, ...rest}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="accordion --theme-text form__accordion">
            <div
                aria-controls={title}
                aria-expanded={isOpen}
                className="accordion__caption"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div>{title}</div>
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
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
                className=""
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Accordion;

//<div className="accordion --theme-text --icon-plus form__accordion">
    //     <div className="accordion__caption">
    //         Видео
    //     </div>
    //     <div className="accordion__section">
    //         <fieldset className='form__section'>
    //             <h2 className="form__title">Видео лучших фрагментов</h2>
    //             <div className="form__field-block">
    //                 <FieldInput
//                     label={"Ссылка на видео"}
//                     type='url'
//                     placeholder='Введите url-адрес...'
//                     layout='flex'
//                 />
//                 <Button
//                     type='button'
//                     theme='text'
//                     size='small'
//                     extraClass="form__icon-btn"
//                     iconClass={'mdi mdi-close'}
//                     isIconBtn='true'
//                     aria-label='Удалить поле'
//                 />
//             </div>
//             {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
//             <Button
//                 type='button'
//                 theme='text'
//                 size='small'
//                 extraClass="form__icon-btn"
//                 iconClass={'mdi mdi-plus'}
//                 isIconBtn='true'
//                 aria-label='Добавить поле'
//             />
//         </fieldset>
//         <fieldset className='form__section'>
//             <h2 className="form__title">Видео визитка школьного театра</h2>
//             <div className="form__field-block">
//                 <FieldInput
//                     label={"Ссылка на видео"}
//                     type='url'
//                     placeholder='Введите url-адрес...'
//                     layout='flex'
//                 />
//                 <Button
//                     type='button'
//                     theme='text'
//                     size='small'
//                     extraClass="form__icon-btn"
//                     iconClass={'mdi mdi-close'}
//                     isIconBtn='true'
//                     aria-label='Удалить поле'
//                 />
//             </div>
//             {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
//             <Button
//                 type='button'
//                 theme='text'
//                 size='small'
//                 extraClass="form__icon-btn"
//                 iconClass={'mdi mdi-plus'}
//                 isIconBtn='true'
//                 aria-label='Добавить поле'
//             />
//         </fieldset>
//     </div>
// </div>
//