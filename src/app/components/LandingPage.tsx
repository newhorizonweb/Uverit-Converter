


// React

// Components
import PageHeading from "../elements/PageHeading";
import LinkTiles from "./LinkTiles";

// Transition
import PageTransition from '../core/PageTransition';

function LandingPage(){

    document.title = "Uverit Converter";

    return (
        <section className="wrapper">
            <PageHeading heading="Uverit-Converter" />
            <LinkTiles />
        </section>
    );
    
}

export default PageTransition(LandingPage);
