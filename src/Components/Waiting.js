import React from 'react';
import HeadSeo from './../helpers/buildHeadSeo';


function Waiting(props) {
    const redirectURL = props.url || `/panel/?to=${window.location.pathname}`;
    const redirectTimeout = props.timeout || 600;
    const message = props.message || 'در حال بارگذاری صفحه';
    const icon = props.icon || 'done';
    const doRedirect = props.redirect || false;


    /**
     * Do we want redirect with waiting
     */
    if (doRedirect) {
        setTimeout(() => {
            window.location.href = redirectURL;
        }, redirectTimeout);
    }

    return (
        <main>
            <h1>اینجا انیمیشن لودینگ است !</h1>
        </main>
    );
}

export default Waiting;
