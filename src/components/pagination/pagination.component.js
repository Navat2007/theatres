import React, {Fragment} from 'react';
import _ from "lodash";

const Pagination = ({pageCount, minCount = 10, setPageCallback}) => {

    const [page, setPage] = React.useState(1);

    const handlePageSelect = (pageIndex) => {

        setPage(pageIndex);
        setPageCallback(pageIndex);

    };

    React.useEffect(() => {
        handlePageSelect(1);
    }, [pageCount])

    if (pageCount <= 1)
        return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <div className="pagin">
            <button onClick={() => handlePageSelect(page - 1)} className="pagin__thumb --type-prev" type="button"
                    aria-label="Назад" disabled={page === 1}/>
            <ul className="pagin__list">
                {
                    pages.map((item, index) => (
                        <Fragment key={item}>
                            {
                                pageCount <= minCount

                                &&

                                <li
                                    className={`pagin__item ${item === page ? "--actived" : ""}`}
                                    onClick={() => handlePageSelect(item)}
                                >
                                    {item}
                                </li>
                            }
                            {
                                pageCount > minCount

                                &&

                                <li
                                    className={`pagin__item ${item === page ? "--actived" : ""} ${index !== 0 && index !== pageCount - 1 &&(index < page - 2 || index > page ) ? "--hide" : ""}`}
                                    onClick={() => handlePageSelect(item)}
                                >
                                    {item}
                                </li>
                            }
                            {
                                pageCount > minCount && index === 0 &&
                                <li className={`pagin__item ${page > 3 ? "" : "--hide"}`}>...</li>
                            }
                            {
                                pageCount > minCount && index === pageCount - 2 &&
                                <li className={`pagin__item ${page < pageCount - 2 ? "" : "--hide"}`}>...</li>
                            }
                        </Fragment>
                    ))
                }
            </ul>
            <button onClick={() => handlePageSelect(page + 1)} className="pagin__thumb --type-next" type="button"
                    aria-label="Вперед" disabled={page === pageCount}/>
        </div>
    );
};

export default Pagination;