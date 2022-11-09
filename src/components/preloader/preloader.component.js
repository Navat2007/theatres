import styles from './preloader.module.scss';

const Preloader = ({loaded}) => {

    return (
        <div className={styles.preloader + (loaded ? ` ${styles.preloader_hidden}` : ``)}>
            <div className={styles.preloader__item}>
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
};

export default Preloader;

