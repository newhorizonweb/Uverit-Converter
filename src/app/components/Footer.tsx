


// React
import version from '../../../package.json';

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/footer.css';
import { uveritLogo, githubIcon } from "../core/SvgIcons";



function Footer(){

    // Translation
    const { t } = useTranslation(['app']);

    // App version
    const appVersion:string = version.version;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };



    return (
        <footer className="wrapper glass" onClick={ scrollToTop }>

            <div className="footer-logo app-logo-action">
                { uveritLogo }
            </div>

            <div className="footer-credits">

                <div className="socials">
                    <h6>{ t("uverit_github") }</h6>
                    <a href="https://github.com/newhorizonweb" className="social-btn" target="_blank"
                    rel="noreferrer" aria-label="GitHub Icon (link)">
                        { githubIcon }
                    </a>
                </div>

                <a href="https://github.com/newhorizonweb"
                className="app-version" target="_blank" rel="noreferrer">
                    {`© Uverit Converter v${appVersion} - 2024`}
                </a>

            </div>

        </footer>
    );
}

export default Footer;
