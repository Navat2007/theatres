import React from "react";
import { useForm } from "react-hook-form";

import useAuthStore from "../../../store/authStore";
import useTeachersStore from "../../../store/admin/teachersStore";
import useTheatresStore from "../../../store/user/theatresStore";
import useSchoolStore from "../../../store/user/schoolStore";

import MultiSelect from "../../multi_select/multi_select.component";
import Editor from "../../reach_editor/editor.component";
import Button from "../../simple/button/button.component";
import FieldInput from "../../simple/field/field.input.component";
import Tab from "../../tabs/tab.component";
import Tabs from "../../tabs/tabs.component";
import ImageSelector from "../../image_selector/image.selector.component";
import Notif from "../../notif/notif.component";

import progresStyles from "../../progress-bar/progress-bar.module.scss";

function TheatreRequest({
    onSubmitDone = () => null,
    onBack = () => null,
    onDecline = () => null,
    request,
    isAdmin,
}) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        getValues,
        setValue,
        watch,
    } = useForm();

    const [popup, setPopup] = React.useState(<></>);
    const [socialLinks, setSocialLinks] = React.useState([]);
    const [photo, setPhoto] = React.useState([]);
    const [photoVisit, setPhotoVisit] = React.useState([]);
    const [video, setVideo] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [reviewsVisit, setReviewsVisit] = React.useState([]);

    const theatreUrlSchoolWatch = watch("theatreUrlSchool");
    const videoBusinessCardWatch = watch("videoBusinessCard");

    const { user } = useAuthStore();
    const theatreStore = useTheatresStore();
    const teachersStore = useTeachersStore();
    const schoolStore = useSchoolStore();

    React.useEffect(() => {
        if (request) {
            console.log(request);
            setValue("title", request.title);
            setValue("address", request.address);
            setValue("coordinates", request.coordinates);
            setValue("foundationDate", request.foundation_date);
            setValue("theatreUrlSchool", request.theatre_url_school);
            setValue("videoBusinessCard", request.video_business_card);
            setValue("editorShortDescription", request.short_description);
            setValue("editorDirectorMessage", request.director_message);

            let socialLinksArray = request?.social_links?.map((link) => {
                return {
                    id: window.global.makeid(12),
                    url: link,
                    img: window.global.getSocialIcon(link),
                };
            });

            setSocialLinks(socialLinksArray ? socialLinksArray : []);

            setPhoto(request.photo ? request.photo : []);
            setPhotoVisit(request.photoVisit ? request.photoVisit : []);

            let videoLinksArray = request?.video?.map((link) => {
                return { id: window.global.makeid(12), url: link };
            });

            setVideo(videoLinksArray ? videoLinksArray : []);

            setReviews(
                request.reviews
                    ? request.reviews.map((item) => {
                          return {
                              id: window.global.makeid(12),
                              title: item.title,
                              text: item.text,
                          };
                      })
                    : []
            );
            setReviewsVisit(
                request.reviewsVisit
                    ? request.reviewsVisit.map((item) => {
                          return {
                              id: window.global.makeid(12),
                              title: item.title,
                              text: item.text,
                          };
                      })
                    : []
            );
        }
    }, []);

    const handleSocialLink = () => {
        setSocialLinks([
            ...socialLinks,
            { id: window.global.makeid(12), url: "" },
        ]);
    };

    const handleVideoLink = () => {
        setVideo([...video, { id: window.global.makeid(12), url: "" }]);
    };

    const handleReview = () => {
        setReviews([
            ...reviews,
            { id: window.global.makeid(12), title: "", text: "" },
        ]);
    };

    const handleReviewVisit = () => {
        setReviewsVisit([
            ...reviewsVisit,
            { id: window.global.makeid(12), title: "", text: "" },
        ]);
    };

    const performData = () => {
        const data = getValues();

        let sendObject = { ...data };

        sendObject["schoolID"] = user.schoolID;

        if (data.form_activity_select && data.form_activity_select.length > 0)
            sendObject["formActivity"] = Array.from(
                data.form_activity_select.map((item) => item.value)
            );

        if (data.age_members_select && data.age_members_select.length > 0)
            sendObject["ageMembers"] = Array.from(
                data.age_members_select.map((item) => item.value)
            );

        if (data.teachers_select && data.teachers_select.length > 0)
            sendObject["teachers"] = Array.from(
                data.teachers_select.map((item) => item.value)
            );

        if (socialLinks.length > 0)
            sendObject["socialLinks"] = Array.from(
                socialLinks
                    .filter((link) => link.url !== "")
                    .map((link) => link.url)
            );

        if (data.editorShortDescription)
            sendObject["editorShortDescription"] = data.editorShortDescription;

        if (data.editorDirectorMessage)
            sendObject["editorDirectorMessage"] = data.editorDirectorMessage;

        sendObject["photo"] = photo;
        sendObject["photoVisit"] = photoVisit;

        if (video.length > 0)
            sendObject["video"] = Array.from(
                video.filter((link) => link.url !== "").map((link) => link.url)
            );

        if (reviews.length > 0) {
            let tmpArray = Array.from(
                reviews
                    .filter(
                        (review) =>
                            getValues("review_" + review.id) &&
                            getValues("editor_review_" + review.id) !==
                                "<p><br></p>"
                    )
                    .map((review) => {
                        return {
                            title: getValues("review_" + review.id),
                            text: getValues("editor_review_" + review.id),
                        };
                    })
            );

            sendObject["reviews"] = tmpArray.length > 0 ? tmpArray : [];
        }

        if (reviewsVisit.length > 0) {
            let tmpArray = Array.from(
                reviewsVisit
                    .filter(
                        (review) =>
                            getValues("review_visit_" + review.id) &&
                            getValues("editor_review_visit_" + review.id) !==
                                "<p><br></p>"
                    )
                    .map((review) => {
                        return {
                            title: getValues("review_visit_" + review.id),
                            text: getValues("editor_review_visit_" + review.id),
                        };
                    })
            );

            sendObject["reviewsVisit"] = tmpArray.length > 0 ? tmpArray : [];
        }

        //console.log("Подготовленные данные: ", sendObject);

        return sendObject;
    };

    const onSubmit = handleSubmit(async (data) => {
        onSubmitDone(performData());
    });

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="form"
            >
                {/* Создала папку в компонентах, там сразу стилевой файл. Когда будешь переносить, пути также подправь. Да пока еще горит :Р)

                Цвета в зависимости от процента заполнения.
                с 0 до 25 var(--error)
                с 26 до 50 var(--alert)
                с 51 до 75 var(--info)
                с 76 до 100 var(--success)

                кстате цвет процента тоже можно перекрашивать
                */}
                {/*<div className={progresStyles.container}>*/}
                {/*    <p className={progresStyles.title}>*/}
                {/*        Процент заполнения информации по театру -{" "}*/}
                {/*        <span*/}
                {/*            className={progresStyles.span_accent}*/}
                {/*            style={{ color: "var(--info)" }}*/}
                {/*        >*/}
                {/*            53%*/}
                {/*        </span>*/}
                {/*    </p>*/}
                {/*    <div className={progresStyles.bar}>*/}
                {/*        <div*/}
                {/*            className={progresStyles.persent}*/}
                {/*            style={{*/}
                {/*                width: "53%",*/}
                {/*                backgroundColor: "var(--info)",*/}
                {/*            }}*/}
                {/*        />*/}
                {/*        <span className={progresStyles.count}>53 из 100</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Tabs>
                    <Tab
                        title={"Основная информация"}
                        extraClass="form__tab form__container --view-two-columns"
                    >
                        <fieldset className="form__section">
                            <FieldInput
                                label={"Название театра *"}
                                type="text"
                                layout="flex"
                                required={true}
                                placeholder={"Введите название"}
                                {...register("title")}
                            />
                            <FieldInput
                                label={"Адрес *"}
                                type="textarea"
                                layout="flex"
                                required={true}
                                placeholder={"Введите адрес *"}
                                {...register("address", {
                                    value: schoolStore?.school?.address,
                                })}
                            />
                            <FieldInput
                                label={"Координаты театра"}
                                type="text"
                                layout="flex"
                                placeholder={
                                    "Координаты через запятую: 55.760178, 37.618574"
                                }
                                {...register("coordinates")}
                            />
                            <div className="form__multy-block">
                                <p className="form__label">
                                    Форма осуществления деятельности *
                                </p>
                                <MultiSelect
                                    required={true}
                                    control={control}
                                    isMulti={true}
                                    name={"form_activity_select"}
                                    closeMenuOnSelect={false}
                                    values={request?.form_activity?.map(
                                        (item) => {
                                            return {
                                                label: item.activity,
                                                value: item.activity,
                                            };
                                        }
                                    )}
                                    options={theatreStore.formActivity.map(
                                        (item) => {
                                            return {
                                                label: item,
                                                value: item,
                                            };
                                        }
                                    )}
                                />
                            </div>
                            <div className="form__multy-block">
                                <p className="form__label">
                                    Возрастной состав участников школьного
                                    театра *
                                </p>
                                <MultiSelect
                                    required={true}
                                    control={control}
                                    isMulti={true}
                                    name={"age_members_select"}
                                    closeMenuOnSelect={false}
                                    values={request?.age_members?.map(
                                        (item) => {
                                            return {
                                                label: item.age,
                                                value: item.age,
                                            };
                                        }
                                    )}
                                    options={theatreStore.ageMembers.map(
                                        (item) => {
                                            return {
                                                label: item,
                                                value: item,
                                            };
                                        }
                                    )}
                                />
                            </div>
                            <FieldInput
                                label={"Дата основания *"}
                                type="date"
                                layout="flex"
                                required={true}
                                {...register("foundationDate")}
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">Ссылки на соцсети</h2>
                            {socialLinks.map((item) => (
                                <div
                                    className="form__group-block"
                                    key={item.id}
                                >
                                    {item.img && (
                                        <span className="form__social-icon">
                                            {item.img}
                                        </span>
                                    )}
                                    <FieldInput
                                        type="text"
                                        extraClass="form__field"
                                        placeholder="Введите url-адрес..."
                                        {...register("social_" + item.id, {
                                            value: item.url,
                                        })}
                                        onChange={(event) => {
                                            setSocialLinks(
                                                socialLinks.map((link) => {
                                                    if (link.id === item.id) {
                                                        link.img =
                                                            window.global.getSocialIcon(
                                                                event.target
                                                                    .value
                                                            );
                                                    }

                                                    return link;
                                                })
                                            );
                                            setValue(
                                                "social_" + item.id,
                                                event.target.value
                                            );
                                        }}
                                        onBlur={(event) => {
                                            setSocialLinks(
                                                socialLinks.map((link) => {
                                                    if (link.id === item.id) {
                                                        link.url =
                                                            event.target.value;
                                                    }

                                                    return link;
                                                })
                                            );
                                            setValue(
                                                "social_" + item.id,
                                                event.target.value
                                            );
                                        }}
                                        required={true}
                                    />
                                    {item.img && (
                                        <a
                                            className="form__social-link"
                                            href={
                                                item.url.includes("http")
                                                    ? item.url
                                                    : "http://" + item.url
                                            }
                                            aria-label="Открыть в новой вкладке"
                                            title="Открыть в новой вкладке"
                                            target={"_blank"}
                                            rel="nofollow noreferer noopener"
                                        >
                                            <span className="mdi mdi-open-in-new" />
                                        </a>
                                    )}
                                    <Button
                                        type="button"
                                        theme="text"
                                        size="smaller"
                                        extraClass="form__icon-btn"
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn="true"
                                        aria-label="Удалить поле"
                                        onClick={() => {
                                            setSocialLinks(
                                                socialLinks.filter(
                                                    (link) =>
                                                        link.id !== item.id
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                                onClick={handleSocialLink}
                            />
                            <h2 className="form__title">
                                Ссылка на страницу театра на сайте
                                образовательной организации{" "}
                            </h2>
                            <div className="form__group-block">
                                <FieldInput
                                    type="url"
                                    extraClass="form__field"
                                    placeholder="Введите url-адрес..."
                                    {...register("theatreUrlSchool")}
                                />
                                {theatreUrlSchoolWatch &&
                                    theatreUrlSchoolWatch.length > 0 && (
                                        <a
                                            className="form__social-link"
                                            href={
                                                theatreUrlSchoolWatch.includes(
                                                    "http"
                                                )
                                                    ? theatreUrlSchoolWatch
                                                    : "http://" +
                                                      theatreUrlSchoolWatch
                                            }
                                            aria-label="Открыть в новой вкладке"
                                            title="Открыть в новой вкладке"
                                            target={"_blank"}
                                            rel="nofollow noreferer noopener"
                                        >
                                            <span className="mdi mdi-open-in-new" />
                                        </a>
                                    )}
                            </div>
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">Педагоги</h2>
                            <MultiSelect
                                control={control}
                                isMulti={true}
                                name={"teachers_select"}
                                closeMenuOnSelect={false}
                                values={request?.teachers?.map((item) => {
                                    return {
                                        label: item.fio,
                                        value: item.ID,
                                    };
                                })}
                                options={teachersStore?.teachers?.map(
                                    (item) => {
                                        return {
                                            label: `${item.f} ${item.i} ${item.o}`,
                                            value: item.ID,
                                        };
                                    }
                                )}
                            />
                        </fieldset>
                    </Tab>
                    <Tab
                        title={"Краткое описание"}
                        extraClass="form__tab"
                    >
                        <div className="form__editor-block">
                            <p className="form__label">Краткое описание</p>
                            <Editor
                                control={control}
                                name="editorShortDescription"
                            />
                        </div>
                    </Tab>
                    <Tab
                        title={"Обращение режиссёра"}
                        extraClass="form__tab"
                    >
                        <div className="form__editor-block">
                            <p className="form__label">Обращение режиссёра</p>
                            <Editor
                                control={control}
                                name="editorDirectorMessage"
                            />
                        </div>
                    </Tab>
                    <Tab
                        title={"Фотографии"}
                        extraClass="form__tab"
                    >
                        <fieldset className="form__section">
                            <ImageSelector
                                title="Фотографии театра"
                                items={photo}
                                multiFiles={true}
                                onChange={(items) => setPhoto(items)}
                                onError={(text) =>
                                    setPopup(
                                        <Notif
                                            title="Ошибка!"
                                            text={text}
                                            opened={true}
                                            onClose={() => {
                                                setPopup(<></>);
                                            }}
                                        />
                                    )
                                }
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <ImageSelector
                                title="Фотографии театра и спектаклей"
                                items={photoVisit}
                                multiFiles={true}
                                onChange={(items) => setPhotoVisit(items)}
                                onError={(text) =>
                                    setPopup(
                                        <Notif
                                            title="Ошибка!"
                                            text={text}
                                            opened={true}
                                            onClose={() => {
                                                setPopup(<></>);
                                            }}
                                        />
                                    )
                                }
                            />
                        </fieldset>
                    </Tab>
                    <Tab
                        title={"Видео"}
                        extraClass="form__tab"
                    >
                        <fieldset className="form__section">
                            <h2 className="form__title">
                                Видео визитка школьного театра
                            </h2>
                            <div className="form__group-block">
                                <FieldInput
                                    label={"Ссылка на видео"}
                                    type="url"
                                    extraClass="form__field"
                                    placeholder="Введите url-адрес..."
                                    layout="flex"
                                    {...register("videoBusinessCard")}
                                />
                                {videoBusinessCardWatch &&
                                    videoBusinessCardWatch.length > 0 && (
                                        <a
                                            className="form__social-link"
                                            href={
                                                videoBusinessCardWatch.includes(
                                                    "http"
                                                )
                                                    ? videoBusinessCardWatch
                                                    : "http://" +
                                                      videoBusinessCardWatch
                                            }
                                            aria-label="Открыть в новой вкладке"
                                            title="Открыть в новой вкладке"
                                            target={"_blank"}
                                            rel="nofollow noreferer noopener"
                                        >
                                            <span className="mdi mdi-open-in-new" />
                                        </a>
                                    )}
                            </div>
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">
                                Видео лучших фрагментов
                            </h2>
                            {video.map((item) => (
                                <div
                                    className="form__group-block"
                                    key={item.id}
                                >
                                    <FieldInput
                                        type="text"
                                        extraClass="form__field"
                                        placeholder="Введите url-адрес..."
                                        {...register("video_" + item.id, {
                                            value: item.url,
                                        })}
                                        onBlur={(event) => {
                                            setVideo(
                                                video.map((link) => {
                                                    if (link.id === item.id) {
                                                        link.url =
                                                            event.target.value;
                                                    }

                                                    return link;
                                                })
                                            );
                                            setValue(
                                                "video_" + item.id,
                                                event.target.value
                                            );
                                        }}
                                        required={true}
                                    />
                                    {item.url && (
                                        <a
                                            className="form__social-link"
                                            href={
                                                item.url.includes("http")
                                                    ? item.url
                                                    : "http://" + item.url
                                            }
                                            aria-label="Открыть в новой вкладке"
                                            title="Открыть в новой вкладке"
                                            target={"_blank"}
                                            rel="nofollow noreferer noopener"
                                        >
                                            <span className="mdi mdi-open-in-new" />
                                        </a>
                                    )}
                                    <Button
                                        type="button"
                                        theme="text"
                                        size="smaller"
                                        extraClass="form__icon-btn"
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn="true"
                                        aria-label="Удалить поле"
                                        onClick={() => {
                                            setVideo(
                                                video.filter(
                                                    (link) =>
                                                        link.id !== item.id
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                                onClick={handleVideoLink}
                            />
                        </fieldset>
                    </Tab>
                    <Tab
                        title={"Описания (рецензии)"}
                        extraClass="form__tab"
                    >
                        <fieldset className="form__section">
                            <h2 className="form__title">
                                Рассказ о других школьных театрах
                            </h2>
                            {reviews.map((item) => (
                                <div
                                    className="form__group-block"
                                    key={item.id}
                                >
                                    <FieldInput
                                        label={"Название театра"}
                                        type="text"
                                        extraClass="form__field"
                                        placeholder="Введите название..."
                                        layout="flex"
                                        {...register("review_" + item.id, {
                                            value: item.title,
                                        })}
                                    />
                                    <Button
                                        type="button"
                                        theme="text"
                                        size="small"
                                        extraClass="form__icon-btn"
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn="true"
                                        aria-label="Удалить поле"
                                        onClick={() => {
                                            setReviews(
                                                reviews.filter(
                                                    (link) =>
                                                        link.id !== item.id
                                                )
                                            );
                                        }}
                                    />
                                    <div className="form__editor-block">
                                        <p className="form__label">
                                            Описание посещения театра
                                        </p>
                                        <Editor
                                            control={control}
                                            name={"editor_review_" + item.id}
                                            value={item.text}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                                onClick={handleReview}
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">
                                Рассказы (рецензии) о посещении других
                                московских театров
                            </h2>
                            {reviewsVisit.map((item) => (
                                <div
                                    className="form__group-block"
                                    key={item.id}
                                >
                                    <FieldInput
                                        label={"Название театра"}
                                        type="text"
                                        extraClass="form__field"
                                        placeholder="Введите название..."
                                        layout="flex"
                                        {...register(
                                            "review_visit_" + item.id,
                                            { value: item.title }
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        theme="text"
                                        size="small"
                                        extraClass="form__icon-btn"
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn="true"
                                        aria-label="Удалить поле"
                                        onClick={() => {
                                            setReviewsVisit(
                                                reviewsVisit.filter(
                                                    (link) =>
                                                        link.id !== item.id
                                                )
                                            );
                                        }}
                                    />
                                    <div className="form__editor-block">
                                        <p className="form__label">
                                            Описание посещения театра
                                        </p>
                                        <Editor
                                            control={control}
                                            name={
                                                "editor_review_visit_" + item.id
                                            }
                                            value={item.text}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"
                                theme="text"
                                size="small"
                                extraClass="form__icon-btn"
                                iconClass={"mdi mdi-plus"}
                                isIconBtn="true"
                                aria-label="Добавить поле"
                                onClick={handleReviewVisit}
                            />
                        </fieldset>
                    </Tab>
                </Tabs>
                <div className="form__controls">
                    {isAdmin ? (
                        <>
                            <Button
                                type="submit"
                                theme="primary"
                                text="Принять"
                            />
                            <Button
                                type="button"
                                theme="primary"
                                text="Отклонить"
                                onClick={() => {
                                    if (onDecline) onDecline(performData());
                                }}
                            />
                            <Button
                                type="button"
                                theme="text"
                                text="Отмена"
                                onClick={onBack}
                            />
                        </>
                    ) : (
                        <>
                            <Button
                                type="submit"
                                theme="primary"
                                text="Сохранить страницу театра"
                            />
                            <Button
                                type="button"
                                theme="text"
                                text="Отмена"
                                onClick={onBack}
                            />
                        </>
                    )}
                </div>
            </form>
            {popup}
        </>
    );
}

export default TheatreRequest;
