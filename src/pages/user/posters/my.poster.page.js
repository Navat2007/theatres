import React from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import JoditEditor from "jodit-react";

import useAuthStore from "../../../store/authStore";
import usePostersStore from "../../../store/user/postersStore";
import useTheatresStore from "../../../store/user/theatresStore";

import Button from "../../../components/simple/button/button.component";
import FieldInput from "../../../components/simple/field/field.input.component";
import Tabs from "../../../components/tabs/tabs.component";
import Tab from "../../../components/tabs/tab.component";
import commonStyles from "../../common.module.scss";

const MyPosterPage = () => {
    let { id } = useParams();

    const animatedComponents = makeAnimated();

    const { user } = useAuthStore();
    const { poster, loadPoster } = usePostersStore();
    const { theatres } = useTheatresStore();

    const { register, handleSubmit, reset, control } = useForm();

    const [editorState, setEditorState] = React.useState("");

    const fetchData = async () => {
        await loadPoster({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <>
            <div className={commonStyles.title_block}>
                <Button
                    type="button"
                    theme="text"
                    size="small"
                    iconClass={"mdi mdi-arrow-left"}
                    isIconBtn={true}
                    aria-label="Назад"
                />
                <h1 className={commonStyles.title}>Создание афиши</h1>
            </div>
            <form className="form">
                <Tabs>
                    <Tab
                        index={1}
                        title={"Основная информация"}
                        extraClass="form__tab form__container --view-one-column"
                    >
                        <fieldset className="form__section">
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
                                            options={theatres.map((item) => {
                                                return {
                                                    label: ``,
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
                                            options={theatres.map((item) => {
                                                return {
                                                    label: ``,
                                                    value: item.ID,
                                                };
                                            })}
                                        />
                                    )}
                                />
                            </div>
                            <div className="form__multy-block">
                                <p className="form__label">
                                    Возрастной состав участников спектакля
                                </p>
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
                                            options={theatres.map((item) => {
                                                return {
                                                    label: ``,
                                                    value: item.ID,
                                                };
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        </fieldset>
                    </Tab>
                    <Tab
                        index={2}
                        title={"Описание"}
                        extraClass="form__tab"
                    >
                        <Controller
                            control={control}
                            name="editor"
                            defaultValue={""}
                            render={({ field }) => (
                                <JoditEditor
                                    ref={field.ref}
                                    config={{
                                        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
                                        placeholder: "Начните писать...",
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
                    </Tab>
                    <Tab
                        index={3}
                        title={"Афиша"}
                        extraClass="form__tab"
                    >
                        <fieldset className="form__section">
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Ссылка на фото"}
                                    type="url"
                                    placeholder="Введите url-адрес..."
                                    layout="flex"
                                    required={true}
                                />
                                <Button
                                    type="button"
                                    theme="text"
                                    size="small"
                                    extraClass="form__icon-btn"
                                    iconClass={"mdi mdi-close"}
                                    isIconBtn="true"
                                    aria-label="Удалить поле"
                                />
                            </div>
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                            />
                        </fieldset>
                    </Tab>
                    <Tab
                        index={4}
                        title={"Программка"}
                        extraClass="form__tab"
                    >
                        <fieldset className="form__section">
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Ссылка на фото"}
                                    type="url"
                                    placeholder="Введите url-адрес..."
                                    layout="flex"
                                    required={true}
                                />
                                <Button
                                    type="button"
                                    theme="text"
                                    size="small"
                                    extraClass="form__icon-btn"
                                    iconClass={"mdi mdi-close"}
                                    isIconBtn="true"
                                    aria-label="Удалить поле"
                                />
                            </div>
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                            />
                        </fieldset>
                    </Tab>
                    <Tab
                        index={5}
                        title={"Фото"}
                        extraClass="form__tab"
                    >
                        <fieldset className="form__section">
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Ссылка на фото"}
                                    type="url"
                                    placeholder="Введите url-адрес..."
                                    layout="flex"
                                    required={true}
                                />
                                <Button
                                    type="button"
                                    theme="text"
                                    size="small"
                                    extraClass="form__icon-btn"
                                    iconClass={"mdi mdi-close"}
                                    isIconBtn="true"
                                    aria-label="Удалить поле"
                                />
                            </div>
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                            />
                        </fieldset>
                    </Tab>
                    <Tab
                        index={6}
                        title={"Видео анонс-приглашение"}
                        extraClass="form__tab"
                    >
                        <fieldset className="form__section">
                            <div className="form__field-block">
                                <FieldInput
                                    label={"Ссылка на фото"}
                                    type="url"
                                    placeholder="Введите url-адрес..."
                                    layout="flex"
                                    required={true}
                                />
                                <Button
                                    type="button"
                                    theme="text"
                                    size="small"
                                    extraClass="form__icon-btn"
                                    iconClass={"mdi mdi-close"}
                                    isIconBtn="true"
                                    aria-label="Удалить поле"
                                />
                            </div>
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                            />
                        </fieldset>
                    </Tab>
                    <Tab
                        index={7}
                        title={"Показы"}
                        extraClass="form__tab form__container --view-one-column"
                    >
                        <fieldset className="form__section">
                            <h2 className="form__title">Показы</h2>
                            <ol className="form__shows">
                                <li className="form__show form__section">
                                    {/* Может нужен мультиселект, чтобы можно было выбрать несколько вариантов времени и даты показа. */}
                                    <FieldInput
                                        label="Дата и время"
                                        type="date"
                                        layout="flex"
                                        required={true}
                                    />
                                    {/* По-умолчанию адрес школы, но с возможность изменить на другой */}
                                    <FieldInput
                                        label="Место показа"
                                        layout="flex"
                                        type="text"
                                        placeholder="Введите адрес..."
                                        required={true}
                                    />
                                    {/* выбор (переключение) вариантов “показа на своей площадке”, “показ на внешней площадке” */}
                                    <FieldInput
                                        label="Тип показа"
                                        layout="flex"
                                        type="select"
                                        required={true}
                                    />
                                    <FieldInput
                                        label="Доступно для внешних гостей"
                                        type="checkbox_variant"
                                        required={true}
                                    />
                                    {/* чек бокс, доступно если существует заявка для данного спектакля на фестиваль */}
                                    <FieldInput
                                        label="В рамках фестивального показа в направлении “Школьная Мельпомена”"
                                        type="checkbox_variant"
                                        required={true}
                                    />
                                    {/* тут непонятно число через дробь чтоли 10/4 ? может тип другой поля */}
                                    <FieldInput
                                        label="Кол-во мест в зале всего, из них доступны для бронирования на сайте"
                                        type="number"
                                        required={true}
                                    />
                                    {/* система бронирования, см. ниже, отображается при просмотре, если выбрана опция “доступно для внешних гостей” */}
                                    <Button
                                        type="button"
                                        theme="outline"
                                        text={"Бесплатный заказ билета"}
                                        aria-label="Бесплатный заказ билета"
                                    />
                                </li>
                            </ol>
                            {/* Если нужно добавить еще блок тыкаем на плюс, появляется блок как выше */}
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                            />
                        </fieldset>
                    </Tab>
                </Tabs>
                <div className="form__controls">
                    <Button
                        type="submit"
                        theme="primary"
                        text="Сохранить"
                    />
                    <Button
                        type="button"
                        theme="text"
                        text="Отмена"
                    />
                </div>
            </form>
        </>
    );
};

export default MyPosterPage;
