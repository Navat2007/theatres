import React from 'react';
import commonStyles from "../common.module.scss";

const TheatresPage = () => {
    return (
        <section className={commonStyles.wrap}>
            <h2>Театры</h2>
            <iframe
                seamless={true}
                title={"Театры"}
                width={"100%"}
                height={800}
                style={{ border: 0 }}
                //src={"https://patriotsport.moscow/premery-spektaklej/"}
                src={"https://razgovor.moscow/test.html"}
            />
        </section>
    );
};

export default TheatresPage;