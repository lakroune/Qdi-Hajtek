import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/logo/Logo';
import { Mail, ArrowRight, Check, Shield, Clock, ArrowLeft } from 'lucide-react';
import Divider from '../components/border/Divider';
import LinkFooter from '../components/links/LinkFooter';
import Input from '../components/inputs/Input';
import Header from '../components/Header/Header';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez entrer un email valide');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log('Demande de réinitialisation pour:', email);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
   <Header 
    isAuthenticated={true}
    userType="client"
    userName="Ahmed Benali"
    notifications={3}
/>
  );
};

export default ForgotPasswordPage;