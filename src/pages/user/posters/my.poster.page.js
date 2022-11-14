import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import JoditEditor from 'jodit-react';

import { Helmet } from "react-helmet";
import Button from "../../../components/simple/button/button.component";

import { clear, loadTeachers } from "../../../store/admin/teachersSlice";
import { loadSchools } from "../../../store/admin/schoolsSlice";
import FieldInput from "../../../components/simple/field/field.input.component";
import useAuthStore from "../../../store/authStore";

const MyPosterPage = () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();

    const {user} = useAuthStore();
    const { data, statusError } = useSelector((state) => state.teachers);

    const { register, handleSubmit, reset, control } = useForm();

    const school = useSelector((state) => state.schools);

    const [editorState, setEditorState] = React.useState('');

    const fetchData = async () => {
        await dispatch(loadTeachers({ schoolID: user.schoolID }));
        await dispatch(loadSchools());
    };

    React.useEffect(() => {
        fetchData();

        return () => {
            dispatch(clear());
        };
    }, [id]);

    React.useEffect(() => {
    }, []);

    return (<>
        <Helmet>
            <title>Создание афишы</title>
        </Helmet>
        <div className='content__section'>
            <div className="content__title-block">
                <Button
                    type="button"
                    isIconBtn={true}
                    iconClass={'mdi mdi-arrow-left'}
                    theme="text"
                    aria-label="Назад"
                />
                <h1 className="content__title">Создание афишы</h1>
            </div>
            <form className='form --place-theatre'>
                <div className="form__container">
                    <fieldset className='form__section'>
                        <h2 className="form__title">Основная информация</h2>
                        <div className="form__multy-block">
                            <p className="form__label">Школьный театр</p>
                            <Controller
                                control={control}
                                name="select"
                                defaultValue={[]}
                                render={({ field }) => (
                                    <ReactSelect
                                        classNamePrefix="multy-select"
                                        {...field}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={school.data.map((item) => {
                                            return {
                                                //label: `${item.f} ${item.i} ${item.o}`,
                                                label: `${item.org_short_name}`,
                                                value: item.ID,
                                            };
                                        })}
                                    />
                                )}
                            />
                        </div>
                        <div className="form__multy-block">
                            <p className="form__label">Педагоги</p>
                            <Controller
                                control={control}
                                name="select"
                                defaultValue={[]}
                                render={({ field }) => (
                                    <ReactSelect
                                        classNamePrefix="multy-select"
                                        {...field}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={school.data.map((item) => {
                                            return {
                                                //label: `${item.f} ${item.i} ${item.o}`,
                                                label: `${item.org_short_name}`,
                                                value: item.ID,
                                            };
                                        })}
                                    />
                                )}
                            />
                        </div>
                        <div className="form__multy-block">
                            <p className="form__label">Возрастной состав участников спектакля</p>
                            <Controller
                                control={control}
                                name="select"
                                defaultValue={[]}
                                render={({ field }) => (
                                    <ReactSelect
                                        classNamePrefix="multy-select"
                                        {...field}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={school.data.map((item) => {
                                            return {
                                                //label: `${item.f} ${item.i} ${item.o}`,
                                                label: `${item.org_short_name}`,
                                                value: item.ID,
                                            };
                                        })}
                                    />
                                )}
                            />
                        </div>
                        <div className="form__editor-block">
                            <p className="form__label">Описание</p>
                            <Controller
                                control={control}
                                name="editor"
                                defaultValue={""}
                                render={({ field }) => (
                                    <JoditEditor
                                        ref={field.ref}
                                        config={{
                                            readonly: false, // all options from https://xdsoft.net/jodit/doc/,
                                            placeholder: 'Начните писать...'
                                        }}
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        onBlur={() => {
                                            field.onBlur();
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Афиша спектакля</h2>
                        <div className="form__field-block">
                            <FieldInput
                                label={"Ссылка на фото"}
                                type='url'
                                placeholder='Введите url-адрес...'
                                layout='flex'
                                required={true}
                            />
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass="form__icon-btn"
                                iconClass={'mdi mdi-close'}
                                isIconBtn='true'
                                aria-label='Удалить поле'
                            />
                        </div>
                        {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                    {/* Афиша спектакля */}
                    <div className="accordion --theme-text --icon-plus form__accordion">
                        <div className="accordion__caption">
                            Афиша спектакля
                        </div>
                        <div className="accordion__section">
                            <fieldset className='form__section'>
                                <h2 className="form__title">Афиша спектакля</h2>
                                <div className="form__field-block">
                                    <FieldInput
                                        label={"Ссылка на фото"}
                                        type='url'
                                        placeholder='Введите url-адрес...'
                                        layout='flex'
                                        required={true}
                                    />
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='small'
                                        extraClass="form__icon-btn"
                                        iconClass={'mdi mdi-close'}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                    />
                                </div>
                                {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                                <Button
                                    type='button'
                                    theme='text'
                                    size='small'
                                    extraClass="form__icon-btn"
                                    iconClass={'mdi mdi-plus'}
                                    isIconBtn='true'
                                    aria-label='Добавить поле'
                                />
                            </fieldset>
                        </div>
                    </div>
                    {/* Программка */}
                    <div className="accordion --theme-text --icon-plus form__accordion">
                        <div className="accordion__caption">
                            Программка
                        </div>
                        <div className="accordion__section">
                            <fieldset className='form__section'>
                                <h2 className="form__title">Программка</h2>
                                <div className="form__field-block">
                                    <FieldInput
                                        label={"Ссылка на фото"}
                                        type='url'
                                        placeholder='Введите url-адрес...'
                                        layout='flex'
                                        required={true}
                                    />
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='small'
                                        extraClass="form__icon-btn"
                                        iconClass={'mdi mdi-close'}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                    />
                                </div>
                                {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                                <Button
                                    type='button'
                                    theme='text'
                                    size='small'
                                    extraClass="form__icon-btn"
                                    iconClass={'mdi mdi-plus'}
                                    isIconBtn='true'
                                    aria-label='Добавить поле'
                                />
                            </fieldset>
                        </div>
                    </div>
                    {/* Фотографии */}
                    <div className="accordion --theme-text --icon-plus form__accordion">
                        <div className="accordion__caption">
                            Фотографии
                        </div>
                        <div className="accordion__section">
                            <fieldset className='form__section'>
                                <h2 className="form__title">Фотографии</h2>
                                <div className="form__field-block">
                                    <FieldInput
                                        label={"Ссылка на фото"}
                                        type='url'
                                        placeholder='Введите url-адрес...'
                                        layout='flex'
                                        required={true}
                                    />
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='small'
                                        extraClass="form__icon-btn"
                                        iconClass={'mdi mdi-close'}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                    />
                                </div>
                                {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                                <Button
                                    type='button'
                                    theme='text'
                                    size='small'
                                    extraClass="form__icon-btn"
                                    iconClass={'mdi mdi-plus'}
                                    isIconBtn='true'
                                    aria-label='Добавить поле'
                                />
                            </fieldset>
                        </div>
                    </div>
                    {/* Видео анонс-приглашение */}
                    <div className="accordion --theme-text --icon-plus form__accordion">
                        <div className="accordion__caption">
                            Видео анонс-приглашение
                        </div>
                        <div className="accordion__section">
                            <fieldset className='form__section'>
                                <h2 className="form__title">Видео анонс-приглашение</h2>
                                <div className="form__field-block">
                                    <FieldInput
                                        label={"Ссылка на фото"}
                                        type='url'
                                        placeholder='Введите url-адрес...'
                                        layout='flex'
                                        required={true}
                                    />
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='small'
                                        extraClass="form__icon-btn"
                                        iconClass={'mdi mdi-close'}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                    />
                                </div>
                                {/* Если нужно добавить еще поле тыкаем на плюс, появляется поле как выше */}
                                <Button
                                    type='button'
                                    theme='text'
                                    size='small'
                                    extraClass="form__icon-btn"
                                    iconClass={'mdi mdi-plus'}
                                    isIconBtn='true'
                                    aria-label='Добавить поле'
                                />
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div className="form__container">
                    <fieldset className='form__section'>
                        <h2 className="form__title">Показы</h2>
                        <ol className='form__shows'>
                            <li className='form__show form__section'>
                                {/* Может нужен мультиселект, чтобы можно было выбрать несколько вариантов времени и даты показа. */}
                                <FieldInput
                                    label='Дата и время'
                                    type='date'
                                    layout='flex'
                                    required={true}
                                />
                                {/* По-умолчанию адрес школы, но с возможность изменить на другой */}
                                <FieldInput
                                    label='Место показа'
                                    layout='flex'
                                    type='text'
                                    placeholder='Введите адрес...'
                                    required={true}
                                />
                                {/* выбор (переключение) вариантов “показа на своей площадке”, “показ на внешней площадке” */}
                                <FieldInput
                                    label='Тип показа'
                                    layout='flex'
                                    type='select'
                                    required={true}
                                />
                                <FieldInput
                                    label='Доступно для внешних гостей'
                                    type='checkbox_variant'
                                    required={true}
                                />
                                {/* чек бокс, доступно если существует заявка для данного спектакля на фестиваль */}
                                <FieldInput
                                    label='В рамках фестивального показа в направлении “Школьная Мельпомена”'
                                    type='checkbox_variant'
                                    required={true}
                                />
                                {/* тут непонятно число через дробь чтоли 10/4 ? может тип другой поля */}
                                <FieldInput
                                    label='Кол-во мест в зале всего, из них доступны для бронирования на сайте'
                                    type='number'
                                    required={true}
                                />
                                {/* система бронирования, см. ниже, отображается при просмотре, если выбрана опция “доступно для внешних гостей” */}
                                <Button
                                    type='button'
                                    theme='outline'
                                    text={'Бесплатный заказ билета'}
                                    aria-label='Бесплатный заказ билета'
                                />
                            </li>
                        </ol>
                        {/* Если нужно добавить еще блок тыкаем на плюс, появляется блок как выше */}
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Подать заявку на фестиваль “Живая сцена”</h2>
                        <Button
                            type='button'
                            iconClass={'mdi mdi-plus'}
                            text='Подать заявку'
                            aria-label='Подать заяку'
                        />
                    </fieldset>
                </div>
                <div className="form__controls">
                    <Button type="submit" theme="primary" text="Сохранить" />
                </div>
            </form>
        </div>
    </>
    );
};

export default MyPosterPage;