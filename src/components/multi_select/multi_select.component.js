import React from 'react';
import { motion } from 'framer-motion';

import Button from "../simple/button/button.component";

const MultiSelect = ({list, multi = false, ...rest}) => {

    const [opened, setOpened] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [search, setSearch] = React.useState("");

    return (
        <div className="field --type-multiselect">
            {
                selectedItems && selectedItems.map((item, index) =>
                    <div key={item.value + '_' + index}>
                        <p className='field__chip-text'>{item.value}</p>
                        <span className="field__chip-icon" aria-label='Удалить'/>
                    </div>)
            }
            {/* Текст.поле может быть разных типов, если мультиселект используем text, чтобы можно было ввести значения */}
            <input className='field__chip-input' type="text" placeholder='Выбрать или найти...' />
            {/* Стрелка для селекта, при нажатии тоглится вып.список, для всех списков необходимо добавлять */}
            <span className="field__icon --type-dropdown" onClick={() => setOpened(!opened)} />
            {/* Крестик для очистки интупа, нужен только если идет поиск по строке.
                        Можно также добавить для  все интупов текста, например */}
            {search && <span className="field__icon --type-delete" aria-label='Очистить строку'/>}
            {/* Стандартная иконка для отображения ошибки, отображается при установленном классе --state-error (у field), не всегда нужно бывает, если нет валидации, то нафиг */}
            <span className="field__icon --type-error"/>
            {/* Стандартное полу для вывода текста ошибки, не всегда нужно бывает, если нет валидации, то нафиг */}
            <p className="field__info">Сообщение об ошибке</p>
            {/* Для открытия/закрытия выпадающего списка тоглим --opened */}
            <div className={`field__list-container${opened ? ' --opened': ''}`}>
                <ul className='field__list'>
                    {
                        list && multi && list.map((item, index) =>
                            <li key={item.value + '_' + index} className='field__item'>
                                <div className="field --type-checkbox">
                                    <input className='field__checkbox' type="checkbox" id={'check_' + index}/>
                                    <label className='field__label' htmlFor={'check_' + index}>{item.label}</label>
                                </div>
                            </li>)
                    }
                    {
                        !list && <li className='field__item'><p>Нет опций для отображения</p></li>
                    }
                </ul>
                {list && <div className="field__list-controls">
                    <Button
                        type='button'
                        size='small'
                        text={'Готово'}/>
                    <Button
                        type='button'
                        size='small'
                        theme='text'
                        text={'Очистить'}/>
                </div>}
            </div>
            <select className="--hide"></select>
        </div>
    );

};

export default MultiSelect;