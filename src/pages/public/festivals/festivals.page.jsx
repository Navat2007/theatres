import React from 'react';

const FestivalsPage = () => {
    return (
        <section>
            <h2>Фестиваль «Живая сцена»</h2>
            <iframe
                seamless={true}
                title={"Фестиваль"}
                width={"100%"}
                height={800}
                style={{ border: 0 }}
                //src={"https://patriotsport.moscow/premery-spektaklej/"}
                src={"https://razgovor.moscow/test.html"}
            />
        </section>
    );
};

export default FestivalsPage;