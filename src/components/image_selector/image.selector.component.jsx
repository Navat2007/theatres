import React from "react";
import axios from "axios";

import Button from "../button/button.component";
import FieldInput from "../field/field.input.component";
import Notif from "../notif/notif.component";
import Popup from "../popup/popup.component";
import styles from "./image.module.scss";
import { AdminIcons } from "../svgs.js";

const ImageSelector = ({title, items, multiFiles, withLinks, maxFileSize = 5, onChange, onError}) => {

    const [photo, setPhoto] = React.useState([]);
    const [photoAddBtnDisabled, setPhotoAddBtnDisabled] = React.useState(false);
    const [photoFileAddBtnDisabled, setPhotoFileAddBtnDisabled] = React.useState(false);
    const [photoInputKey, setPhotoInputKey] = React.useState("");
    const [notif, setNotif] = React.useState(<></>);

    const inputRef = React.createRef();
    const inputFileRef = React.createRef();

    React.useEffect(() => {
        setPhoto(items);
    }, []);

    React.useEffect(() => {

        if(items.length === 0 && photo.length > 0)
            setPhoto([]);

    }, [items]);

    React.useEffect(() => {
        onChange(photo);
    }, [photo]);

    function getOrderIndex(array, tmpArray) {
        let index = 0;

        array.map((item) => {
            if (item.order > index) index = item.order;
        });

        tmpArray.map((item) => {
            if (item.order > index) index = item.order;
        });

        return ++index;
    }

    function setNewOrder(array) {
        return array.map((item, index) => {
            if (index === 0) item.main = 1;
            else item.main = 0;

            item.order = index + 1;

            return item;
        });
    }

    function moveElementInArray(input, from, to) {
        let numberOfDeletedElm = 1;

        const elm = input.splice(from, numberOfDeletedElm)[0];

        numberOfDeletedElm = 0;

        input.splice(to, numberOfDeletedElm, elm);
    }

    const handleAddPhoto = async () => {
        //https://source.unsplash.com/random/200x200?sig=1

        setPhotoAddBtnDisabled(true);

        const value = inputRef.current.value;
        const link = value?.includes("http") ? value : "http://" + value;

        await axios
            .get(link)
            .then((res) => {
                if (res.status === 200) {
                    setPhoto([
                        ...photo,
                        {
                            main: photo.length === 0 ? 1 : 0,
                            url: link,
                            order: getOrderIndex(photo),
                        },
                    ]);

                    setPhotoAddBtnDisabled(false);
                }
            })
            .catch((err) => {
                //console.log(err);
                onError("???? ?????????????? ?????????????????? ?????????????????????? ???? ????????????");
                setPhotoAddBtnDisabled(false);
            });
    };

    const handleAddFilePhoto = async (e) => {

        let errorFiles = [];

        async function readFileAsDataURL(file) {
            let result_base64 = await new Promise((resolve) => {
                let fileReader = new FileReader();
                fileReader.onload = (e) => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            });

            return result_base64;
        }

        let tmp_array = [];

        for (const file of e.target.files) {

            if (file.type.match("image.*")) {
                if (file.size <= maxFileSize * 1000000) {
                } else {
                    errorFiles.push({
                        title: file.name,
                        text: "???????? ???????????? " + maxFileSize + " ????."
                    });
                    continue;
                }
            } else {
                errorFiles.push({
                    title: file.name,
                    text: "???????? ???????????? ???????? ????????????????????????."
                });
                continue;
            }

            const result = await readFileAsDataURL(file);

            tmp_array.push({
                main: photo.length === 0 && tmp_array.length === 0 ? 1 : 0,
                url: result,
                file: file,
                isFile: 1,
                isLoaded: 0,
                order: getOrderIndex(photo, tmp_array),
            });


        }

        setPhoto([
            ...photo,
            ...tmp_array,
        ]);

        setPhotoInputKey(window.global.makeid(30));

        if (errorFiles.length > 0) {

            setNotif(
                <Popup
                    opened={true}
                    onClose={() => setNotif(<></>)}
                    title={"???????????? ???????????????? ????????????"}
                >
                    <h3 className={styles.errorCaption}>
                        {AdminIcons.error} ???? ?????????????? ???????????????? ?????????????????? ??????????:
                    </h3>
                    <ol className={styles.errorList}>
                        {errorFiles.map((error) => (
                            <li key={error.title}>
                                <p className={styles.errorText}>
                                    {error.title}{" "}
                                    <span className={styles.errorSpan}>
                                        {error.text}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ol>
                </Popup>
            );

        }

    };

    const handleMovePhoto = (elementOrder, toOrder) => {
        let array = [...photo];

        let currentIndex = array.findIndex(
            (item) => item.order === elementOrder
        );
        let wantIndex = array.findIndex((item) => item.order === toOrder);

        moveElementInArray(array, currentIndex, wantIndex);

        setPhoto(setNewOrder(array));
    };

    const handleDeletePhoto = (itemElement) => {

        if(itemElement.isLoaded === 1){
            setNotif(<Notif
                text={"???? ?????????????? ?????? ???????????? ??????????????? ???????? ?????????? ???????????????? ?? ?????????????? ?? ?????????? ???? ???????????????? ???? ?????????????????? ???????????????? ??????????!"}
                opened={true}
                onClose={() => setNotif(<></>)}
                buttons={
                    <>
                        <Button
                            type="button"
                            size={"small"}
                            text={"??????"}
                            theme="text"
                            onClick={() => setNotif(<></>)}
                        />
                        <Button
                            type="button"
                            size={"small"}
                            theme="info"
                            text={"????"}
                            onClick={async () => {

                                if(itemElement.isFile === 1 && itemElement.isLoaded === 1)
                                {

                                    let form = new FormData();
                                    window.global.buildFormData(form, itemElement);

                                    const response = await axios.postForm(process.env.REACT_APP_BASE_URL + 'php/models/files/remove_theatre_image.php', form);
                                    //console.log(response);

                                }

                                let array = [...photo].filter((item) => item.order !== itemElement.order);

                                setPhoto(setNewOrder(array));

                                setNotif(<></>)
                            }}
                        />
                    </>
                }
            />);
        }
        else
        {
            let array = [...photo].filter((item) => item.order !== itemElement.order);

            setPhoto(setNewOrder(array));
        }

    };

    return (
        <>
            <h2 className="form__title">{title}</h2>
            <ul className="gallery-form">
                {photo.map((item, index) =>
                    item.main ? (
                        <li
                            key={index}
                            className="gallery-form__item"
                        >
                            <img
                                className="gallery-form__img"
                                src={item.isFile === 1 && item.isLoaded === 1 ? process.env.REACT_APP_BASE_URL + item.url : item.url}
                                alt={"?????????????????????? " + item.url}
                            />
                            <div className="gallery-form__item-panel">
                                <Button
                                    type="button"
                                    theme="white"
                                    size="smaller"
                                    isIconBtn="true"
                                    iconClass={"mdi mdi-close"}
                                    aria-label="??????????????"
                                    disabled={photoAddBtnDisabled}
                                    onClick={() =>
                                        handleDeletePhoto(item)
                                    }
                                />
                            </div>
                            <div className="gallery-form__title">
                                1. ??????????????
                            </div>
                        </li>
                    ) : (
                        <li
                            key={index}
                            className="gallery-form__item"
                        >
                            <img
                                className="gallery-form__img"
                                src={item.isFile === 1 && item.isLoaded === 1 ? process.env.REACT_APP_BASE_URL + item.url : item.url}
                                alt={"?????????????????????? " + item.url}
                            />
                            <span className="gallery-form__current-position">
                                {item.order}
                            </span>
                            <div className="gallery-form__item-panel">
                                <Button
                                    type="button"
                                    theme="white"
                                    size="smaller"
                                    text={"?????????????? ??????????????"}
                                    aria-label="?????????????? ??????????????"
                                    disabled={photoAddBtnDisabled}
                                    onClick={() =>
                                        handleMovePhoto(item.order, 1)
                                    }
                                />
                                <Button
                                    type="button"
                                    theme="white"
                                    size="smaller"
                                    isIconBtn="true"
                                    iconClass={"mdi mdi-close"}
                                    aria-label="??????????????"
                                    disabled={photoAddBtnDisabled}
                                    onClick={() =>
                                        handleDeletePhoto(item)
                                    }
                                />
                            </div>
                            <div className="gallery-form__thumbs">
                                <Button
                                    type="button"
                                    theme="white"
                                    size="smaller"
                                    isIconBtn="true"
                                    iconClass={"mdi mdi-chevron-left"}
                                    aria-label="??????????"
                                    disabled={photoAddBtnDisabled}
                                    onClick={() =>
                                        handleMovePhoto(
                                            item.order,
                                            item.order - 1
                                        )
                                    }
                                />
                                {index < photo.length - 1 && (
                                    <Button
                                        type="button"
                                        theme="white"
                                        size="smaller"
                                        isIconBtn="true"
                                        iconClass={"mdi mdi-chevron-right"}
                                        aria-label="????????????"
                                        disabled={photoAddBtnDisabled}
                                        onClick={() =>
                                            handleMovePhoto(
                                                item.order,
                                                item.order + 1
                                            )
                                        }
                                    />
                                )}
                            </div>
                        </li>
                    )
                )}

                {/* ???????????????? ???????? ?????? ???????????????? ??????????????????????, ???????? ?????????? ?????????? ??????????, ??????????????.
                ?? ?????? ?? ???????? ??????????????, ??.??. ?? ???????? ?????????????????????? ???????? gallery-form ?? ????????????, ???? ?????????????????? ?????????? ???????????????????? ???????????????? ?????????????????? ???? theatre.component.js (?????????????? ?????????? ?????????? ???? ??????????, ??.??. ?????????????????? ?????? ????????????????????) */}
                <li
                    className="gallery-form__download-block"
                    onDrop={(e) => {
                        e.preventDefault();
                        handleAddFilePhoto({
                            target: {
                                files: e.dataTransfer.files
                            }
                        });
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                >
                    <p className="gallery-form__download-text">
                        ?????????????? ?????????????????? ?????????????????????? ?????????????? ?????????????????????????????? ??
                        ?????????? ?????????? ?????????? ????????. ?????????????????????? ???? ????????????
                        ?????????????????????? 5 MB.
                        <span className="gallery-form__download-span">??????</span>
                    </p>
                    <Button
                        type="button"
                        text="?????????????? ??????????"
                        disabled={photoFileAddBtnDisabled}
                        onClick={() => inputFileRef.current.click()}
                    />
                    <input
                        ref={inputFileRef}
                        key={photoInputKey}
                        onChange={handleAddFilePhoto}
                        hidden={true}
                        type="file"
                        accept="image/*"
                        multiple={multiFiles}
                    />
                </li>
            </ul>
            {
                withLinks
                &&
                <div className="form__group-block">
                    <FieldInput
                        ref={inputRef}
                        label={"???????????? ???? ????????"}
                        type="url"
                        extraClass="form__field"
                        placeholder="?????????????? url-??????????..."
                        layout="flex"
                    />
                    <a
                        className="form__social-link --hide"
                        href=""
                        aria-label="?????????????? ?? ?????????? ??????????????"
                        title="?????????????? ?? ?????????? ??????????????"
                        target={"_blank"}
                        rel="nofollow noreferer noopener"
                    >
                        <span className="mdi mdi-open-in-new"/>
                    </a>
                    <Button
                        type="button"
                        theme="text"
                        size="small"
                        extraClass="form__icon-btn"
                        iconClass={"mdi mdi-plus"}
                        isIconBtn="true"
                        aria-label="???????????????? ????????"
                        disabled={photoAddBtnDisabled}
                        onClick={handleAddPhoto}
                    />
                </div>
            }
            {notif}
        </>
    );
};

export default ImageSelector;
