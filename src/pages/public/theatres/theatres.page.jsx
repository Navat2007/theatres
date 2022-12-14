import React from 'react';

const TheatresPage = () => {
    return (
        <section>
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