import styles from './preloader.module.scss';

const Preloader = () => {

    return (
        <div className={styles.preloader}>
            <div className={styles.preloader__item}>
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
};

export default Preloader;

