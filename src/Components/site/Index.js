import React from 'react';
import OurTeam from './OurTeam';
import TopBrand from './TopBrand';
import LigtBeam from './LightBeam';
import Footer from './Footer';
import OrderBox from './OrderBox';
import SuperMarioGame from './SuperMario/SuperMarioGame';


const Index = () => (
    <React.Fragment>
        <TopBrand/>
        <SuperMarioGame/>

        <div className={'afterGameDescription'}>
            <LigtBeam/>
            <OrderBox/>
            <OurTeam/>
        </div>

        <Footer/>
    </React.Fragment>
);

export default Index;
