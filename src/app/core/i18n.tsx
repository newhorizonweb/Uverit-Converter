


// Locales
import i18next from "i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
.use(HttpApi)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    supportedLngs: ["en", "de", "es", "fr", "pl", "ru"],
    fallbackLng: "en",
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
    },
    backend: {
        loadPath: '../../Uverit-Converter/assets/locales/{{lng}}/{{ns}}.json'
    }
});

export default i18next;