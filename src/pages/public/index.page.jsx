import React from 'react';
import commonStyles from "../common.module.scss";

const MainPage = () => {
    return (
        <>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h1 className={commonStyles.title}>О Содружестве</h1>
                </article>
            </section>
            <section
                className={[
                    commonStyles.section,
                    commonStyles.section_bg_g100,
                ].join(" ")}
            >
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Спектакли</h2>
                </article>
            </section>
            <section className={commonStyles.section}>
                <article className={commonStyles.wrap}>
                    <h2 className={commonStyles.title}>Друзья содружества</h2>
                </article>
            </section>
        </>
    );
};

export default MainPage;