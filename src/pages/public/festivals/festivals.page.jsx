import React from 'react';
import commonStyles from "../common.module.scss";

const FestivalsPage = () => {
    return (
        <section className={commonStyles.wrap}>
            <h2 className={commonStyles.title}>Фестиваль «Живая сцена»</h2>
            <iframe
                seamless={true}
                title={"Фестиваль"}
                width={"100%"}
                height={4650}
                style={{ border: 0 }}
                //src={"https://patriotsport.moscow/premery-spektaklej/"}
                src={"https://razgovor.moscow/live-stage.html"}
            />
        </section>
    );
};

export default FestivalsPage;