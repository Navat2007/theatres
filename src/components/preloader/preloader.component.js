const Preloader = ({loaded}) => {
    let className = 'preloader --rounds';

    if(loaded)
        className += " --hidden";

    return (
        <div className={className}>
            <div className="preloader__item">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Preloader;

