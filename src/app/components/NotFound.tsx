


// React
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/not-found.css';
import PageTransition from '../core/PageTransition';
import { PageContext } from '../../App';
import { notFoundIcon } from "../core/SvgIcons";
import { capitalize } from '../functions/CapitalizeText';



const NotFound = () => {

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // Translation
    const { t } = useTranslation(['app']);

    document.title = `Uverit Converter - ${capitalize(t("404.not_found"))}`;

    console.log(t("404.not_found"))



    return (
        <section className="not-found whole-screen wrapper">
            <div className="not-found-inner">

                <div className="nf-img">
                    { notFoundIcon }
                </div>

                <div className="nf-txt glass" data-testid="not-found">

                    <h1>{ t("404.not_found") }</h1>
                    <h2>{ t("404.wrong_page1") }</h2>
                    <h2>{ t("404.wrong_page2") }</h2>

                    <Link to={ urlPath } className="go-back glass"
                    data-testid="go-back-btn">
                        <h3>{ t("404.go_back") }</h3>
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default PageTransition(NotFound);