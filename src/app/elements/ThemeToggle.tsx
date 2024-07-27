


// React
import { useState, useLayoutEffect } from "react";



const ThemeToggle = () => {

    const [darkTheme, setDarkTheme] = useState(false);

    const [visit, setVisit] = useState(
        localStorage.getItem('visit') ?
        parseInt(localStorage.getItem('visit')!) : 0
    );

    // useLayoutEffect removes the flash visible with useEffect
    // when loading the app with dark theme
    useLayoutEffect(() => {

        // Set dark theme on the first page load according to user preferences
        if (visit === 0 && window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches){
            setDarkTheme(true);
            localStorage.setItem("dark-theme", "true");
        }

        // Update the visit counter
        const newVisitVal = (visit ?? 1) + 1;
        setVisit(newVisitVal);
        localStorage.setItem('visit', newVisitVal.toString());
        
        // Get the app theme from localStorage
        const storedTheme =
            localStorage.getItem("dark-theme") === "true" ? true : false;

        // Set theme and add a class to the body
        setDarkTheme(storedTheme);
        themeClass(storedTheme);
        
    }, []);

    const themeClass = (darkTheme: boolean) => {

        if (darkTheme){
            document.body.classList.remove("theme-light");
            document.body.classList.add("theme-dark");
        } else {
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
        }

    }

    const updateAppTheme = () => {
        themeClass(!darkTheme);
        localStorage.setItem("dark-theme", (!darkTheme).toString());
        setDarkTheme(!darkTheme);
    };


    
    return (
        <div className="app-theme">
            <input type="checkbox" className="theme-input" id="theme-input"
            onChange={ updateAppTheme } checked={ darkTheme } />
            <label htmlFor="theme-input" className="theme-toggle"
            aria-label="Theme toggle button"></label>
        </div>
    );
    
}
 
export default ThemeToggle;
