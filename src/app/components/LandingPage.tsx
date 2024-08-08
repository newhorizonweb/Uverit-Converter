


// React

// Components
import PageHeading from "../elements/PageHeading";
import LinkTiles from "./LinkTiles";

// Transition
import PageTransition from '../core/PageTransition';

function LandingPage(){

    return (
        <section className="wrapper">
            <PageHeading heading="Uverit-Converter" />
            <LinkTiles />
        </section>
    );
    
}

export default PageTransition(LandingPage);
