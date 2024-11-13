import {createGlobalStyle} from "styled-components";
import type {ComponentType} from "react";

export const GlobalFontHakgyoansimDunggeunmiso: ComponentType = createGlobalStyle`
    @font-face {
        font-family: 'HakgyoansimDunggeunmisoTTF-B';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
`;

export const GlobalFontSubakYang: ComponentType = createGlobalStyle`
    @font-face {
        font-family: 'RixXladywatermelonR';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-4@1.0/RixXladywatermelonR.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
`;