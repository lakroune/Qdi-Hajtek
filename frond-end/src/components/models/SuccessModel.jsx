
import { CheckCircle } from "lucide-react";


const SuccessModel = (
    {
        message = "",
        goTo = "",
        buttonName = ""

    }

) => {



    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 text-center border border-gray-200">
                <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-[18px] font-bold text-[#1B4F72] mb-2"> {message}</h2>
                <p className="text-[12px] text-gray-500 mb-6">
                    Votre proposition a été envoyée au client. Vous serez notifié dès qu'il la consulte.
                </p>
                <div className="flex gap-3 justify-center">
                    <a
                        href={goTo}
                        className="px-6 py-2.5 bg-[#1B4F72] hover:bg-[#D35400] text-white text-[12px] font-medium transition-colors"
                    >
                        {buttonName}
                    </a>
                    <a
                        href="window.history.back()"
                        className="px-6 py-2.5 border border-gray-200 hover:border-[#1B4F72] text-[12px] text-gray-600 hover:text-[#1B4F72] transition-colors"
                    >
                        back
                    </a>
                </div>
            </div>
        </div>
    );

}

export default SuccessModel;    