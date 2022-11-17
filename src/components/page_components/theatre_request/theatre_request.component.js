import React from 'react';
import { useForm } from 'react-hook-form';

import useAuthStore from '../../../store/authStore';
import useTeachersStore from './../../../store/admin/teachersStore';
import useTheatresStore from '../../../store/user/theatresStore';
import useSchoolStore from '../../../store/user/schoolStore';

import MultiSelect from '../../multi_select/multi_select.component';
import Editor from '../../reach_editor/editor.component';
import Button from '../../simple/button/button.component';
import FieldInput from '../../simple/field/field.input.component';
import Tab from '../../tabs/tab.component';
import Tabs from '../../tabs/tabs.component';
import Popup from "../../../components/popup/popup.component";

function TheatreRequest({ onSubmitDone, onBack, request }) {

    const { register, handleSubmit, reset, control, getValues, setValue } = useForm();

    const [popup, setPopup] = React.useState(<></>);
    const [socialLinks, setSocialLinks] = React.useState([]);

    const { user } = useAuthStore();
    const theatreStore = useTheatresStore();
    const teachersStore = useTeachersStore();
    const schoolStore = useSchoolStore();

    React.useEffect(() => {

        if (request) {

            console.log("Have data: ", request);

            setValue("title", request.title);
            setValue("address", request.address);
            setValue("foundationDate", request.foundation_date);
            setValue("theatreUrlSchool", request.theatre_url_school);
            setValue("editorShortDescription", request.short_description);
            setValue("editorDirectorMessage", request.director_message);

        }

    }, []);

    const handlePhoto = () => {

        setPopup(
            <Popup
                title={"Фото театра"}
                opened={true}
                onClose={() => {
                    setPopup(<></>);
                }}
            >

            </Popup>
        );

    };

    const handleSocialLink = () => {

        setSocialLinks([...socialLinks, { id: window.global.makeid(12), url: "" }]);

    };

    const onSubmit = handleSubmit(async (data) => {

        console.log("Форма: ", data);

        let sendObject = {
            schoolID: user.schoolID,
            title: data.title,
            address: data.address,
            foundationDate: data.foundationDate,
            theatreUrlSchool: data.theatreUrlSchool,
        };

        if (data.form_activity_select && data.form_activity_select.length > 0)
            sendObject['formActivity'] = Array.from(data.form_activity_select.map(item => item.value));

        if (data.age_members_select && data.age_members_select.length > 0)
            sendObject['ageMembers'] = Array.from(data.age_members_select.map(item => item.value));

        if (data.teachers_select && data.teachers_select.length > 0)
            sendObject['teachers'] = Array.from(data.teachers_select.map(item => item.value));

        if (socialLinks.length > 0)
            sendObject['socialLinks'] = Array.from(socialLinks.map(link => link.url));

        if (data.editorShortDescription)
            sendObject['editorShortDescription'] = data.editorShortDescription;

        if (data.editorDirectorMessage)
            sendObject['editorDirectorMessage'] = data.editorDirectorMessage;


        onSubmitDone(sendObject);

    });

    return (
        <form onSubmit={onSubmit} className='form'>
            <Tabs>
                <Tab index={1} title={"Основная информация"} extraClass='form__tab form__container --view-two-columns'>
                    <fieldset className='form__section'>
                        <FieldInput
                            label={"Название театра"}
                            type='text'
                            layout='flex'
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title")}
                        />
                        <FieldInput
                            label={"Адрес"}
                            type='textarea'
                            layout='flex'
                            required={true}
                            placeholder={"Введите адрес"}
                            {...register("address", { value: schoolStore.school.address })}
                        />
                        <div className="form__multy-block">
                            <p className="form__label">Форма осуществления деятельности</p>
                            <MultiSelect
                                required={true}
                                control={control}
                                isMulti={true}
                                name={"form_activity_select"}
                                closeMenuOnSelect={false}
                                options={theatreStore.formActivity.map((item) => {
                                    return {
                                        label: item,
                                        value: item,
                                    };
                                })}
                            />
                        </div>
                        <div className="form__multy-block">
                            <p className="form__label">Возрастной состав участников школьного театра</p>
                            <MultiSelect
                                required={true}
                                control={control}
                                isMulti={true}
                                name={"age_members_select"}
                                closeMenuOnSelect={false}
                                options={theatreStore.ageMembers.map((item) => {
                                    return {
                                        label: item,
                                        value: item,
                                    };
                                })}
                            />
                        </div>
                        <FieldInput
                            label={"Дата основания"}
                            type='date'
                            layout='flex'
                            required={true}
                            {...register("foundationDate")}
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Ссылки на соцсети</h2>
                        {
                            socialLinks.map(item => (
                                <div
                                    className="form__social-block"
                                    key={item.id}
                                >
                                    {
                                        item.img
                                    }
                                    <FieldInput
                                        type='text'
                                        extraClass='form__social-field'
                                        placeholder='Введите url-адрес...'
                                        {...register("social_" + item.id)}
                                        onChange={(event) => {
                                            setSocialLinks(socialLinks.map(link => {

                                                const social_icons = {
                                                    t: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path fill="#0088cc" d="M20.84,3.61c-0.1,0.03-0.2,0.06-0.3,0.1C14.56,6.03,8.59,8.36,2.62,10.69c-0.08,0.03-0.17,0.07-0.24,0.11
                                                            C2.12,10.92,1.99,11.13,2,11.42c0.01,0.29,0.17,0.48,0.43,0.59c0.07,0.03,0.15,0.05,0.23,0.07c1.41,0.42,2.82,0.83,4.23,1.24
                                                            c0.17,0.05,0.26,0.14,0.31,0.31c0.53,1.7,1.07,3.4,1.6,5.09c0.26,0.82,0.91,0.98,1.51,0.37c0.7-0.71,1.4-1.42,2.09-2.14
                                                            c0.15-0.16,0.24-0.15,0.41-0.03c1.45,1.07,2.9,2.13,4.35,3.2c0.78,0.57,1.54,0.28,1.73-0.66c1.23-5.9,2.23-10.66,2.71-12.94
                                                            c0.14-0.66,0.27-1.32,0.39-1.89C22.02,3.91,21.45,3.45,20.84,3.61z M18.37,7c-0.47,0.41-0.93,0.83-1.4,1.24
                                                            c-2.31,2.04-4.62,4.08-6.93,6.12c-0.18,0.16-0.26,0.34-0.29,0.58c-0.09,0.84-0.18,1.68-0.28,2.52c-0.01,0.06-0.02,0.12-0.04,0.18
                                                            c-0.01,0.03-0.04,0.07-0.06,0.08c-0.05,0.02-0.08-0.02-0.1-0.06c-0.02-0.06-0.04-0.12-0.06-0.18c-0.41-1.32-0.82-2.63-1.23-3.95
                                                            c-0.03-0.1-0.05-0.21-0.06-0.25c-0.01-0.3,0.14-0.43,0.33-0.54c1.19-0.74,2.38-1.47,3.56-2.21c2.04-1.26,4.07-2.52,6.11-3.79
                                                            c0.06-0.04,0.12-0.07,0.18-0.11c0.12-0.08,0.26-0.12,0.36,0.02C18.56,6.8,18.48,6.91,18.37,7z"/>
                                                        </svg>
                                                    ),
                                                    vk: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path fill="#597da3" d="M20.11,14.43c-0.51-0.59-1.27-1.24-1.5-1.55c-0.32-0.42-0.23-0.59,0-0.96c-0.02,0,2.65-3.73,2.92-4.98
	c0.15-0.46,0-0.8-0.66-0.8h-2.18c-0.55,0-0.8,0.29-0.95,0.61c0,0-1.12,2.68-2.69,4.42c-0.51,0.5-0.74,0.67-1.02,0.67
	c-0.15,0-0.34-0.17-0.34-0.63V6.91c0-0.54-0.17-0.8-0.64-0.8H9.63c-0.34,0-0.55,0.25-0.55,0.5c0,0.52,0.78,0.65,0.87,2.11v3.18
	c0,0.69-0.13,0.82-0.4,0.82c-0.74,0-2.54-2.7-3.62-5.78C5.71,6.35,5.49,6.12,4.94,6.12h-2.2C2.11,6.12,2,6.41,2,6.72
	c0,0.57,0.74,3.41,3.45,7.18c1.8,2.57,4.36,3.96,6.67,3.96c1.4,0,1.57-0.31,1.57-0.84v-1.95c0-0.63,0.13-0.73,0.57-0.73
	c0.32,0,0.89,0.17,2.18,1.4c1.48,1.47,1.74,2.14,2.56,2.14h2.18c0.64,0,0.93-0.31,0.76-0.92C21.76,16.35,21.04,15.47,20.11,14.43z"/>
                                                        </svg>
                                                    ),
                                                    ok: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path fill="#cccccc" d="M114.6,236.4L114.6,236.4c0.1,0,0.2,0,0.3,0.1c0.1,0,0.1,0,0.2,0.1c1.3,0.8,2.6,1.2,4,1.2c1.3,0,2.7-0.4,4-1.1
                                                                c0.2-0.1,0.3-0.2,0.5-0.2c0.1,0,0.3,0,0.5,0.3c0,0,0.3,0.5,0,0.7c-0.4,0.3-0.9,0.5-1.4,0.8c-0.2,0.1-0.4,0.2-0.5,0.3
                                                                c-0.1,0.1-0.3,0.1-0.5,0.2c-0.1,0-0.2,0.1-0.4,0.1l-1.4,0.5l1,1.1c0.1,0.1,0.2,0.2,0.3,0.3c0.2,0.2,0.4,0.5,0.6,0.7
                                                                c0.2,0.2,0.5,0.5,0.7,0.7c0.3,0.3,0.6,0.6,0.9,0.8c0.1,0.1,0.3,0.4,0.5,0.6c0.1,0.2,0,0.6-0.2,0.7c-0.2,0.1-0.3,0.2-0.5,0.2
                                                                c-0.1,0-0.1,0-0.3-0.1c-0.5-0.4-0.9-0.8-1.4-1.3l-0.3-0.3c-0.3-0.3-0.6-0.6-0.9-0.9c-0.1-0.2-0.3-0.3-0.4-0.5l-0.7-0.8l-0.7,0.7
                                                                l-0.6,0.6c-0.5,0.5-0.9,0.9-1.3,1.3l-0.2,0.2c-0.2,0.2-0.5,0.5-0.7,0.7c-0.1,0.1-0.3,0.2-0.5,0.2c-0.2,0-0.3-0.1-0.5-0.2
                                                                c-0.2-0.2-0.3-0.6-0.1-0.9c0.3-0.4,0.7-0.7,1.1-1.1c0.2-0.2,0.4-0.4,0.6-0.6c0.3-0.3,0.6-0.6,0.8-0.9l0.3-0.4l1-1l-1.3-0.6
                                                                l-0.7-0.3c-0.6-0.2-1.1-0.5-1.7-0.7c-0.1-0.1-0.3-0.2-0.4-0.3c-0.2-0.2-0.3-0.5-0.1-0.8C114.1,236.6,114.3,236.4,114.6,236.4
                                                                 M114.6,235.4c-0.6,0-1.1,0.3-1.5,0.9c-0.4,0.7-0.3,1.5,0.3,2c0.2,0.2,0.4,0.4,0.7,0.5c0.8,0.4,1.6,0.7,2.4,1
                                                                c-0.4,0.4-0.8,0.8-1.2,1.2c-0.6,0.6-1.2,1.1-1.7,1.8c-0.5,0.7-0.4,1.7,0.2,2.3c0.4,0.3,0.7,0.5,1.1,0.5c0.4,0,0.8-0.2,1.2-0.5
                                                                c0.3-0.3,0.7-0.6,1-1c0.6-0.6,1.2-1.2,1.9-1.9c0.5,0.5,0.9,1,1.3,1.4c0.6,0.6,1.1,1.2,1.8,1.7c0.3,0.2,0.6,0.3,0.9,0.3
                                                                c0.4,0,0.8-0.2,1.1-0.5c0.5-0.5,0.7-1.3,0.4-1.9c-0.2-0.3-0.4-0.6-0.6-0.8c-0.5-0.5-1.1-1-1.6-1.6c-0.3-0.3-0.5-0.6-0.9-1
                                                                c0.4-0.1,0.7-0.2,1-0.4c0.7-0.4,1.5-0.7,2.1-1.1c0.7-0.5,0.7-1.4,0.2-2.1c-0.3-0.5-0.8-0.8-1.3-0.8c-0.3,0-0.6,0.1-1,0.3
                                                                c-1.2,0.7-2.3,1-3.5,1c-1.2,0-2.3-0.3-3.5-1c-0.1-0.1-0.2-0.1-0.3-0.1C115,235.4,114.8,235.4,114.6,235.4L114.6,235.4z"/>
                                                            <path fill="#cccccc" d="M119,225.5L119,225.5c0.1,0,0.1,0,0.2,0c2.5,0.1,4.3,2,4.3,4.5c0,1.2-0.4,2.2-1.3,3.1c-0.9,0.9-2.1,1.4-3.3,1.4l-0.1,0
                                                                c-1.1,0-2.3-0.6-3.1-1.5c-0.8-0.8-1.2-1.9-1.1-2.9l0-0.1l0-0.1c0-1.1,0.4-2.2,1.2-3C116.6,226,117.7,225.5,119,225.5 M119,233.1
                                                                L119,233.1c1.6,0,3-1.4,3-3c0-0.8-0.3-1.6-0.9-2.2c-0.6-0.6-1.3-0.9-2.1-1l-0.1,0c-1.7,0-3,1.3-3.1,3c0,0.8,0.3,1.6,0.9,2.2
                                                                C117.4,232.7,118.2,233.1,119,233.1L119,233.1 M119,224.5c-3.1,0-5.5,2.6-5.4,5.5c-0.2,3,2.6,5.4,5.2,5.5c0,0,0.1,0,0.1,0
                                                                c3,0,5.6-2.3,5.5-5.4c0-3.3-2.3-5.4-5.3-5.5C119.1,224.5,119,224.5,119,224.5L119,224.5z M119,232.1
                                                                C119,232.1,119,232.1,119,232.1c-1.2,0-2.1-1-2.1-2.1c0-1.2,0.9-2.1,2.1-2.1c0,0,0,0,0.1,0c1.1,0,2,1,2,2.1
                                                                C121,231.1,120.1,232.1,119,232.1L119,232.1z"/>
                                                        </svg>
                                                    ),
                                                    facebook: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                                                    ),
                                                    google: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                                                    ),
                                                    linkedin: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg>
                                                    ),
                                                    twitter: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg>
                                                    ),
                                                    instagram: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                                                    ),
                                                }
                                                if (link.id === item.id) {
                                                    if (event.target.value.includes("t.me/"))
                                                        link.img = social_icons.t;
                                                    else if (event.target.value.includes("vk.com/"))
                                                        link.img = social_icons.vk;
                                                    else if (event.target.value.includes("ok.ru/"))
                                                        link.img = social_icons.ok;
                                                    else if (event.target.value.includes("facebook.com/") || event.target.value.includes("fb.com/"))
                                                        link.img = social_icons.facebook;
                                                    else if (event.target.value.includes("plus.google.com/"))
                                                        link.img = social_icons.google;
                                                    else if (event.target.value.includes("linkedin."))
                                                        link.img = social_icons.linkedin;
                                                    else if (event.target.value.includes("twitter.com/"))
                                                        link.img = social_icons.twitter;
                                                    else if (event.target.value.includes("instagram.com/"))
                                                        link.img = social_icons.instagram;
                                                    else
                                                        link.img = null;
                                                }

                                                return link;

                                            }));
                                            setValue("social_" + item.id, event.target.value);
                                        }}
                                        onBlur={(event) => {
                                            setSocialLinks(socialLinks.map(link => {

                                                if (link.id === item.id) {
                                                    link.url = event.target.value;
                                                }

                                                return link;

                                            }));
                                            setValue("social_" + item.id, event.target.value);
                                        }}
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
                                        onClick={() => {
                                            setSocialLinks(socialLinks.filter(link => link.id !== item.id));
                                        }}
                                    />
                                </div>
                            ))
                        }
                        <Button
                            type='button'
                            theme='text'
                            size='small'
                            extraClass="form__icon-btn"
                            iconClass={'mdi mdi-plus'}
                            isIconBtn='true'
                            aria-label='Добавить поле'
                            onClick={handleSocialLink}
                        />
                        <h2 className="form__title">Ссылка на страницу театра на сайте образовательной
                            организации </h2>
                        <div className="form__field-block">
                            <FieldInput
                                type='url'
                                placeholder='Введите url-адрес...'
                                {...register("theatreUrlSchool")}
                            />
                        </div>
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Педагоги</h2>
                        <MultiSelect
                            control={control}
                            isMulti={true}
                            name={"teachers_select"}
                            closeMenuOnSelect={false}
                            options={teachersStore.teachers.map((item) => {
                                return {
                                    label: `${item.f} ${item.i} ${item.o}`,
                                    value: item.ID,
                                };
                            })}
                        />
                    </fieldset>
                </Tab>
                <Tab index={2} title={"Краткое описание"} extraClass='form__tab'>
                    <div className="form__editor-block">
                        <p className="form__label">Краткое описание</p>
                        <Editor
                            required={true}
                            control={control}
                            name="editorShortDescription"
                        />
                    </div>
                </Tab>
                <Tab index={3} title={"Обращение режиссёра"} extraClass='form__tab'>
                    <div className="form__editor-block">
                        <p className="form__label">Обращение режиссёра</p>
                        <Editor
                            control={control}
                            name="editorDirectorMessage"
                        />
                    </div>
                </Tab>
                <Tab index={4} title={"Фотографии"} extraClass='form__tab'>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Фотографии театра</h2>
                        <ul className="gallery-form">
                            {/* Первая всегда Главная, там нет стрелок для смены позиции, есть только удалить, если удалить, то вторая соотв.становится Главной  */}
                            <li className='gallery-form__item'>
                                <img className='gallery-form__img'
                                    src="https://vsegda-pomnim.com/uploads/posts/2022-03/1648678393_126-vsegda-pomnim-com-p-reki-rossii-foto-133.jpg"
                                    alt="Изображение https://vsegda-pomnim.com/uploads/posts/2022-03/1648678393_126-vsegda-pomnim-com-p-reki-rossii-foto-133.jpg" />
                                <div className="gallery-form__item-panel">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-close'}
                                        aria-label='Удалить'
                                    />
                                </div>
                                {/* Наглядно показывает, что картинка Главная */}
                                <div className="gallery-form__title">1. Главная</div>
                            </li>
                            {/* Остальные фото будут по сл.разметке */}
                            <li className='gallery-form__item'>
                                <img className='gallery-form__img'
                                    src="https://vsegda-pomnim.com/uploads/posts/2022-03/1648678358_6-vsegda-pomnim-com-p-reki-rossii-foto-6.jpg"
                                    alt="Изображение https://vsegda-pomnim.com/uploads/posts/2022-03/1648678358_6-vsegda-pomnim-com-p-reki-rossii-foto-6.jpg" />
                                {/* Показывает какая позиция у фото */}
                                <span className="gallery-form__current-position">2</span>
                                {/* Панель при наведении показывается, можно удалить фото или сделать Главной */}
                                <div className="gallery-form__item-panel">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        text={'Сделать главной'}
                                        aria-label='Сделать главной'
                                    />
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-close'}
                                        aria-label='Удалить'
                                    />
                                </div>
                                {/* Панель при наведении показывается, для смены позиции фото, путем нажатия стрелочек влево/вправо */}
                                <div className="gallery-form__thumbs">
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-chevron-left'}
                                        aria-label='Назад'
                                    />
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={'mdi mdi-chevron-right'}
                                        aria-label='Вперед'
                                    />
                                </div>
                            </li>
                        </ul>
                        <Button
                            type='button'
                            text={'Добавить фото'}
                            extraClass={'form__add-btn'}
                            aria-label='Добавить поле'
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Фотографии посещения театра</h2>
                        {/* Такая же структура */}
                        <p>Нет загруженного контента</p>
                    </fieldset>
                </Tab>
                <Tab index={5} title={"Видео"} extraClass='form__tab'>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Видео лучших фрагментов</h2>
                        <div className="form__field-block">
                            <FieldInput
                                label={"Ссылка на видео"}
                                type='url'
                                placeholder='Введите url-адрес...'
                                layout='flex'
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
                </Tab>
                <Tab index={6} title={"Описания (рецензии)"} extraClass='form__tab'>
                    <fieldset className='form__section'>
                        <h2 className="form__title">Рассказ о других школьных театрах</h2>
                        <div className="form__field-block">
                            <FieldInput
                                label={"Название театра"}
                                type='text'
                                placeholder='Введите название...'
                                layout='flex'
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
                                <Editor
                                    control={control}
                                    name="editorTheatreDescription"
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
                            театров</h2>
                        <div className="form__field-block">
                            <FieldInput
                                label={"Название театра"}
                                type='text'
                                placeholder='Введите название...'
                                layout='flex'
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
                                <Editor
                                    control={control}
                                    name="editorTheatreVisit"
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
                    onClick={onBack}
                />
            </div>
        </form>
    )
}

export default TheatreRequest
