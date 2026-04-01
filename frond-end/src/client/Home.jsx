import React, { useEffect } from 'react';

import axiosClient from '../api/axios-client.js';

const HomePage = () => {

    const [categories, setCategories] = React.useState([]);
    const handleSearch = (params) => {
        console.log('Recherche:', params);

    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosClient.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);



    return (
        <div className="min-h-screen bg-gray-50" >

            <section className={`relative bg-[#1b4f7296] pt-20 pb-12 overflow-hidden  `}>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url(/images/d.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                <div className={`absolute inset-0 bg-gradient-to-br  `}></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-white mb-3 leading-tight">
                        Trouvez le meilleur artisan<br />
                        <span className="text-[#D35400]">
                            près de chez vous
                        </span>
                    </h1>

                    <p className="text-[11px] text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed">
                        Des professionnels vérifiés pour tous vos travaux. Devis gratuit, intervention rapide.
                    </p>



                </div>
            </section>

        </div>
    );
};



export default HomePage;