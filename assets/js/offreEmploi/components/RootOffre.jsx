import React from 'react';
import GeneralInformation from './GeneralInformation';
import OffreInformation from '../OffreInformation'

const RootOffre = () => {
    return (
        <div>
            <OffreInformation>
                <GeneralInformation/>
            </OffreInformation>
        </div>
    );
}

export default RootOffre;