import React from "react";
import styles from "./news.module.scss";

const AllNewsPage = () => {
    return (
        <section className={styles.section}>
            <h2>Новости</h2>
            <iframe
                seamless={true}
                title={"Новости"}
                width={"100%"}
                height={800}
                style={{ border: 0 }}
                //src={"https://patriotsport.moscow/premery-spektaklej/"}
                src={"https://razgovor.moscow/test.html"}
            />
        </section>
    );
};

export default AllNewsPage;
