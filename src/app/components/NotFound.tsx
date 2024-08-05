


// React
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Assets
import PageTransition from '../core/PageTransition';
import { PageContext } from '../../App';


// Locales
import { useTranslation } from 'react-i18next';

const NotFound = () => {

    // 404 image
    const img404 = (<svg></svg>);

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // Translation
    const { t } = useTranslation(['app']);


    console.log(t("404.not_found"))

    return (
        <section className="not-found">
            <div className="not-found-inner">

                <div className="nf-img">
                    404 { img404 }
                </div>

                <div className="nf-txt" data-testid="not-found">

                    <h1>{ t("404.not_found") }</h1>
                    <h4>{ t("404.wrong_page1") }</h4>
                    <h4>{ t("404.wrong_page2") }</h4>

                    <Link to={ urlPath } className="go-back glass">
                        { t("404.go_back") }
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default PageTransition(NotFound);