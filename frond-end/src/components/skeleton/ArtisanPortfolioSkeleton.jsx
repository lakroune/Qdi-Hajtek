const ArtisanPortfolioSkeleton = () => {
    return (
        <div className="min-h-screen bg-white animate-pulse">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-6 pb-12">

                <div className="border border-gray-100 p-4 mb-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 border border-gray-100 flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div className="w-full">
                                    <div className="h-6 bg-gray-200 w-1/3 mb-2" />
                                    <div className="h-4 bg-gray-100 w-1/4 mb-4" />

                                    <div className="flex gap-4 mt-2">
                                        <div className="h-4 bg-gray-100 w-16" />
                                        <div className="h-4 bg-gray-100 w-16" />
                                        <div className="h-4 bg-gray-100 w-16" />
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="h-3 bg-gray-50 w-full" />
                                        <div className="h-3 bg-gray-50 w-5/6" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="h-4 bg-gray-200 w-6" />
                                    <div className="w-10 h-10 bg-gray-100 border border-gray-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-100 mb-6 flex gap-8">
                    <div className="h-10 bg-gray-100 w-32" />
                    <div className="h-10 bg-gray-100 w-32" />
                </div>

                <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="border border-gray-100 flex flex-col">
                            <div className="aspect-[4/3] bg-gray-200" />

                            <div className="p-3 space-y-3">
                                <div className="h-4 bg-gray-200 w-3/4" />
                                <div className="space-y-1">
                                    <div className="h-2.5 bg-gray-100 w-full" />
                                    <div className="h-2.5 bg-gray-100 w-5/6" />
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                    <div className="h-6 bg-gray-200 w-1/3" />
                                    <div className="h-8 w-8 bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default ArtisanPortfolioSkeleton