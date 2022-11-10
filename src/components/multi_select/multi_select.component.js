import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useForm } from "react-hook-form";

import Button from "../simple/button/button.component";

const MultiSelect = ({ list, multi = false, ...rest }) => {

    const { register, handleSubmit, reset, getValues, setValue, watch } = useForm();

    const [opened, setOpened] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [search, setSearch] = React.useState("");

    const searchInput = watch("search");

    const onSubmit = handleSubmit(data => {
        console.log(data);
    });

    React.useEffect(() => {

        if (searchInput && !opened)
            setOpened(!opened);

    }, [searchInput]);

    return (
        <form onSubmit={onSubmit}>
            <div className="field --type-multiselect">
                {
                    selectedItems && multi && selectedItems.map((item, index) =>
                        <div key={item.value + '_' + index} className="field__chip">
                            <p className='field__chip-text'>{item.label}</p>
                            <span className="field__chip-icon" aria-label='Удалить' onClick={() => {
                                setValue('check_' + item.value, !getValues('check_' + item.value));
                                const temp = [...selectedItems];
                                temp.splice(index, 1);
                                setSelectedItems(temp);
                            }} />
                        </div>)
                }
                <input
                    className='field__chip-input'
                    type="text"
                    placeholder='Выбрать или найти...'
                    onKeyUp={(value) => setSearch(value)}
                    {...register("search")}
                />
                <select
                    multiple
                    className="--hide"
                    {...register("select")}
                >
                    {
                        selectedItems && selectedItems.map((item, index) =>
                            <option key={item.value + '_' + index} value={item.value}>
                                {item.label}
                            </option>)
                    }
                </select>
                <motion.span
                    animate={opened ? "open" : "closed"}
                    variants={{
                        open: { rotateX: 180 },
                        closed: { rotateX: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="field__icon --type-dropdown"
                    onClick={() => setOpened(!opened)}
                />
                {searchInput && <span className="field__icon --type-delete" aria-label='Очистить строку' onClick={() => setValue("search", "")} />}
                {/* Стандартная иконка для отображения ошибки, отображается при установленном классе --state-error (у field) */}
                <span className="field__icon --type-error" />
                {/* Стандартное полу для вывода текста ошибки*/}
                <p className="field__info">Сообщение об ошибке</p>

                <div className={`field__list-container${opened ? ' --opened' : ''}`}>
                    <ul className='field__list'>
                        {
                            list && multi && list.length > 0 &&
                            list
                                .filter(item => item.label.toLowerCase().includes(searchInput ? searchInput.toLowerCase() : ""))
                                .map((item, index) =>
                                    <li
                                        key={item.value + '_' + index}
                                        className='field__item'
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setValue('check_' + item.value, !getValues('check_' + item.value));
                                            if (getValues('check_' + item.value)) {
                                                setSelectedItems(prevArray => [...prevArray, { label: item.label, value: item.value }]);
                                            }
                                            else {
                                                const temp = [...selectedItems];
                                                temp.splice(index, 1);
                                                setSelectedItems(temp);
                                            }
                                        }}
                                    >
                                        <div className="field --type-checkbox" style={{ pointerEvents: "none" }}>
                                            <input className='field__checkbox' type="checkbox" id={'check_' + item.value} {...register('check_' + item.value)} />
                                            <label className='field__label' htmlFor={'check_' + item.value}>{item.label}</label>
                                        </div>
                                    </li>)
                        }
                        {
                            (!list || list.filter(item => item.label.toLowerCase().includes(searchInput ? searchInput.toLowerCase() : "")).length === 0)
                            &&
                            <li className='field__item'><p>Нет опций для отображения</p></li>
                        }
                    </ul>
                    {list && <div className="field__list-controls">
                        <Button
                            type='button'
                            size='small'
                            text={'Готово'}
                            onClick={() => setOpened(!opened)}
                        />
                        <Button
                            type='button'
                            size='small'
                            theme='text'
                            text={'Очистить'}
                            onClick={() => {
                                reset();
                                setSelectedItems([]);
                            }}
                        />
                    </div>}
                </div>
            </div>
        </form>
    );

};

export default MultiSelect;