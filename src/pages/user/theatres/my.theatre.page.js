import React from "react";
import {useParams} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import JoditEditor from 'jodit-react';
import {Helmet} from "react-helmet";

import useAuthStore from "../../../store/authStore";
import useTheatresStore from "../../../store/user/theatresStore";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import useTeachersStore from "../../../store/admin/teachersStore";

const MyTheatrePage = () => {

    let {id} = useParams();

    const animatedComponents = makeAnimated();

    const {user} = useAuthStore();
    const {theatre, loadTheatre} = useTheatresStore();
    const {teachers, loadTeachers} = useTeachersStore();

    const {register, handleSubmit, reset, control} = useForm();

    const [editorState, setEditorState] = React.useState('');

    const fetchData = async () => {
        await loadTheatre({id});
        await loadTeachers({schoolID: user.schoolID});
    };

    React.useEffect(() => {

        fetchData();

    }, [id]);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        console.log(editorState);
    });

    return (<>
        <Helmet>
            <title>Создание театра</title>
        </Helmet>
        <div className="content__section">
            {!id && (
                <>
                    <div className="content__title-block">
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            iconClass={'mdi mdi-arrow-left'}
                            isIconBtn='true'
                            aria-label='Назад'
                        />
                        <h1 className='content__title'>Создание театра</h1>
                    </div>
                    <form onSubmit={onSubmit} className='form --place-theatre'>
                        <div className="form__container">
                            <fieldset className='form__section'>
                                <h2 className="form__title">Основная информация</h2>
                                <div className="form__multy-block">
                                    <p className="form__label">Адрес</p>
                                    <Controller
                                        control={control}
                                        name="select"
                                        defaultValue={[]}
                                        render={({field}) => (
                                            <ReactSelect
                                                classNamePrefix="multy-select"
                                                {...field}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                options={[]}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="form__multy-block">
                                    <p className="form__label">Форма осуществления деятельности</p>
                                    <Controller
                                        control={control}
                                        name="select"
                                        defaultValue={[]}
                                        render={({field}) => (
                                            <ReactSelect
                                                classNamePrefix="multy-select"
                                                {...field}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                options={[]}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="form__multy-block">
                                    <p className="form__label">Возрастной состав участников школьного театра</p>
                                    <Controller
                                        control={control}
                                        name="select"
                                        defaultValue={[]}
                                        render={({field}) => (
                                            <ReactSelect
                                                classNamePrefix="multy-select"
                                                {...field}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                options={[]}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="form__multy-block">
                                    <p className="form__label">Уровень Школьного театра</p>
                                    <Controller
                                        control={control}
                                        name="select"
                                        defaultValue={[]}
                                        render={({field}) => (
                                            <ReactSelect
                                                classNamePrefix="multy-select"
                                                {...field}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                options={[]}
                                            />
                                        )}
                                    />
                                </div>
                                <FieldInput
                                    label={"Год основания"}
                                    type='date'
                                    layout='flex'
                                    required={true}
                                />
                                <div className="form__editor-block">
                                    <p className="form__label">Краткое описание</p>
                                    <Controller
                                        control={control}
                                        name="editor"
                                        defaultValue={""}
                                        render={({field}) => (
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
                                <div className="form__editor-block">
                                    <p className="form__label">Обращение режисера</p>
                                    <Controller
                                        control={control}
                                        name="editor"
                                        defaultValue={""}
                                        render={({field}) => (
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
                                <h2 className="form__title">Педагоги</h2>
                                <Controller
                                    control={control}
                                    name="select"
                                    defaultValue={[]}
                                    render={({field}) => (
                                        <ReactSelect
                                            classNamePrefix="multy-select"
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={teachers.map((item) => {
                                                return {
                                                    label: `${item.f} ${item.i} ${item.o}`,
                                                    value: item.ID,
                                                };
                                            })}
                                        />
                                    )}
                                />
                            </fieldset>
                            <fieldset className='form__section'>
                                <h2 className="form__title">Афиши спектаклей</h2>
                                <Controller
                                    control={control}
                                    name="select"
                                    defaultValue={[]}
                                    render={({field}) => (
                                        <ReactSelect
                                            classNamePrefix="multy-select"
                                            {...field}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={[]}
                                        />
                                    )}
                                />
                            </fieldset>
                            {/* Фото */}
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
                                    <fieldset className='form__section'>
                                        <h2 className="form__title">фотографии посещения театров</h2>
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
                            {/* Видео */}
                            <div className="accordion --theme-text --icon-plus form__accordion">
                                <div className="accordion__caption">
                                    Видео
                                </div>
                                <div className="accordion__section">
                                    <fieldset className='form__section'>
                                        <h2 className="form__title">Видео лучших фрагментов</h2>
                                        <div className="form__field-block">
                                            <FieldInput
                                                label={"Ссылка на видео"}
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
                                    <fieldset className='form__section'>
                                        <h2 className="form__title">Видео визитка школьного театра</h2>
                                        <div className="form__field-block">
                                            <FieldInput
                                                label={"Ссылка на видео"}
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
                            {/* Описания (рецензии) */}
                            <div className="accordion --theme-text --icon-plus form__accordion">
                                <div className="accordion__caption">
                                    Описания (рецензии)
                                </div>
                                <div className="accordion__section">
                                    <fieldset className='form__section'>
                                        <h2 className="form__title">Рассказ о других школьных театрах</h2>
                                        <div className="form__field-block">
                                            <FieldInput
                                                label={"Название театра"}
                                                type='text'
                                                placeholder='Введите название...'
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
                                            <div className="form__editor-block">
                                                <p className="form__label">Описание театра</p>
                                                <Controller
                                                    control={control}
                                                    name="editor"
                                                    defaultValue={""}
                                                    render={({field}) => (
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
                                    <fieldset className='form__section'>
                                        <h2 className="form__title">Рассказы (рецензии) о посещении других московских
                                            театрах</h2>
                                        <div className="form__field-block">
                                            <FieldInput
                                                label={"Название театра"}
                                                type='text'
                                                placeholder='Введите название...'
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
                                            <div className="form__editor-block">
                                                <p className="form__label">Описание посещения театра</p>
                                                <Controller
                                                    control={control}
                                                    name="editor"
                                                    defaultValue={""}
                                                    render={({field}) => (
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
                                <h2 className="form__title">Ссылки на соцсети</h2>
                                <div className="form__field-block">
                                    <FieldInput
                                        type='select'
                                        placeholder='Выберите соцсеть из списка...'
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
                                    <FieldInput
                                        type='url'
                                        extraClass='form__social-block-url'
                                        placeholder='Введите url-адрес...'
                                        required={true}
                                    />
                                </div>
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
                                <h2 className="form__title">Ссылки на страницу театра на сайт образовательной
                                    организации </h2>
                                <div className="form__field-block">
                                    <FieldInput
                                        label={"Ссылка на сайт"}
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
                            <Button type="submit" theme="primary" text="Сохранить"/>
                        </div>
                    </form>
                </>
            )}
            {id && <p>Театр №{id}</p>}
        </div>
    </>);
};

export default MyTheatrePage;
