import React, { useEffect, useState } from 'react';
import {
    MapPin, Calendar, DollarSign, Clock, ArrowLeft,
    CheckCircle2, MoreVertical, Star,
    Briefcase, AlertCircle
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axios-client';

const ClientOffreDetail = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const fetchOffreTravail = async () => {
            try {
                const response = await axiosClient.get('/offres/' + id);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOffreTravail();
    }, []);


 

 
 
   
    return (
        <div className="min-h-screen bg-gray-50 mt-20 pb-8">

          
       
        </div>
    );
};

export default ClientOffreDetail;