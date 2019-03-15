import React from 'react';
import { Helmet } from 'react-helmet';

const HeadSeo = props => {
    const { name, address, description, image } = props;
    return (
        <Helmet>
            <meta charSet='utf-8'/>
            <title>{name ? `${name} - ` : ''}{process.env.APP_NAME}</title>
            <link rel={'canonical'} href={process.env.SITE_DOMAIN + { address }}/>


            <meta http-equiv='content-type' content='text/html; charset=UTF-8'/>
            <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/>


            {/* -- Meta -- */}
            <meta name='copyright' content='Copyright © TorfehNegar Holding Company. All Rights Reserved.'/>
            <meta name='author' content='Torfenegar developers (lead jafarRezaei : http://jrjs.ir)'/>
            <meta name='robots' content='index, follow'/>

            {/* -- Mobile -- */}
            <meta name='viewport'
                content='width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0'/>
            <meta name='apple-mobile-web-app-capable' content='yes'/>


            {/* --  Social tags      -- */}
            <meta name='description' content={description}/>

            {/* -- Schema.org markup for Google+ -- */}
            <meta itemProp='name' content={name}/>
            <meta itemProp='description' content={description}/>
            <meta itemProp='image' content={image}/>

            {/* -- Twitter Card data -- */}
            <meta name='twitter:card' content='summary_large_image'/>
            <meta name='twitter:title' content={name}/>
            <meta name='twitter:description' content={description}/>
            <meta name='twitter:image' content={image}/>

            {/* -- Open Graph data -- */}
            <meta property='og:title' content={name}/>
            <meta property='og:type' content='article'/>
            <meta property='og:url' content={process.env.SITE_DOMAIN + address}/>
            <meta property='og:image' content={image}/>
            <meta property='og:description' content={description}/>
            <meta property='og:site_name' content={process.env.APP_NAME}/>


            {/* -- favIcon -- */}
            <link rel='apple-touch-icon' sizes='57x57' href='/static/images/favicon/apple-icon-57x57.png'/>
            <link rel='apple-touch-icon' sizes='60x60' href='/static/images/favicon/apple-icon-60x60.png'/>
            <link rel='apple-touch-icon' sizes='72x72' href='/static/images/favicon/apple-icon-72x72.png'/>
            <link rel='apple-touch-icon' sizes='76x76' href='/static/images/favicon/apple-icon-76x76.png'/>
            <link rel='apple-touch-icon' sizes='114x114' href='/static/images/favicon/apple-icon-114x114.png'/>
            <link rel='apple-touch-icon' sizes='120x120' href='/static/images/favicon/apple-icon-120x120.png'/>
            <link rel='apple-touch-icon' sizes='144x144' href='/static/images/favicon/apple-icon-144x144.png'/>
            <link rel='apple-touch-icon' sizes='152x152' href='/static/images/favicon/apple-icon-152x152.png'/>
            <link rel='apple-touch-icon' sizes='180x180' href='/static/images/favicon/apple-icon-180x180.png'/>
            <link rel='icon' type='image/png' sizes='192x192' href='/static/images/favicon/android-icon-192x192.png'/>
            <link rel='icon' type='image/png' sizes='32x32' href='/static/images/favicon/favicon-32x32.png'/>
            <link rel='icon' type='image/png' sizes='96x96' href='/static/images/favicon/favicon-96x96.png'/>
            <link rel='icon' type='image/png' sizes='16x16' href='/static/images/favicon/favicon-16x16.png'/>
            <link rel='manifest' href='/static/images/favicon/manifest.json'/>
            <meta name='msapplication-TileColor' content='#ffffff'/>
            <meta name='msapplication-TileImage' content='/static/images/favicon/ms-icon-144x144.png'/>
            <meta name='theme-color' content='#ffffff'/>
        </Helmet>
    );
};

export default HeadSeo;
