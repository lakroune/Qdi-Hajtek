
import React from 'react';
const OffreViewCard = (
    {
        offre = {}
    }
) => {

    return (
        <div className='space-y-4 mt-12'>
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-[#D35400] transition-colors ">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative">

                    <div className="absolute top-1 left-1">

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OffreViewCard;