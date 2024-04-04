import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import SIDEBAR_VI from '../locales/vi/sidebar.json';
import SIDEBAR_EN from '../locales/en/sidebar.json';
import SIDEBAR_JP from '../locales/jp/sidebar.json';
import BUTTON_VI from '../locales/vi/button.json';
import BUTTON_EN from '../locales/en/button.json';
import BUTTON_JP from '../locales/jp/button.json';
import SEARCH_VI from '../locales/vi/button.json';
import SEARCH_EN from '../locales/en/button.json';
import SEARCH_JP from '../locales/jp/button.json';
import LOGIN_VI from '../locales/vi/login.json';
import LOGIN_EN from '../locales/en/login.json';
import LOGIN_JP from '../locales/jp/login.json';
import SUBMENU_VI from '../locales/vi/submenu.json';
import SUBMENU_EN from '../locales/en/submenu.json';
import SUBMENU_JP from '../locales/jp/submenu.json';

const resources = {
    vi: {
        sidebar: SIDEBAR_VI,
        button: BUTTON_VI,
        search: SEARCH_VI,
        login: LOGIN_VI,
        submenu: SUBMENU_VI
    },
    en: {
        sidebar: SIDEBAR_EN,
        button: BUTTON_EN,
        search: SEARCH_EN,
        login: LOGIN_EN,
        submenu: SUBMENU_EN
    },
    jp: {
        sidebar: SIDEBAR_JP,
        button: BUTTON_JP,
        search: SEARCH_JP,
        login: LOGIN_JP,
        submenu: SUBMENU_JP
    }
};

const defaultNS = 'sidebar';

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    ns: ['sidebar', 'search', 'button', 'login', 'submenu'],
    fallbackLng: 'vi',
    defaultNS,
    nterpolation: {
        escapeValue: false // react already safes from xss
    }
})