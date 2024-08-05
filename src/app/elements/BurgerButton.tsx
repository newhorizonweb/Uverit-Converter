


// BurgerButton.tsx
import React from 'react';

// Assets
import '../../assets/css/burger-button.css';

// TS
interface PropTypes {
    togglePopup: () => void;
    isBurgerOpen: boolean;
}



const BurgerButton = React.forwardRef<HTMLButtonElement, PropTypes>((
    { togglePopup, isBurgerOpen }, burgerBtn
) => {

    return (
        <button className={`burger-btn 
        ${isBurgerOpen ? " burger-open" : ""}`}
        ref={ burgerBtn } onClick={ togglePopup }
        aria-label="Navigation burger button"
        data-testid="burger-btn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );

});

export default BurgerButton;
