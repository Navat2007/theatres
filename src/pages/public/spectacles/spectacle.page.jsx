import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import commonStyles from "../common.module.scss";
import styles from "./spectacles.module.scss";

import { EventIcons } from "../../../components/svgs.js";

const SpectaclePage = () => {
    return (
        <section
            className={[commonStyles.wrap, commonStyles.bubbleCard].join(" ")}
        >
            <h2 className={[commonStyles.title, styles.pageTitle].join(" ")}>
                горе от ума
            </h2>
        </section>
    );
};

export default SpectaclePage;
