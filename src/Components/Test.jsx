import React, { useState } from "react";
import { Fragment } from "react";

export default function Welcome() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("signin");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  // Translation object (simplified for demo)
  const translations = {
    en: {
      signIn: "Sign In",
      signUp: "Sign Up",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      agreeTerms: "I agree to the Terms and Conditions",
      submit: "Submit",
      loggingIn: "Logging in...",
      signingUp: "Signing up...",
      guest: "Continue as Guest",
      welcome: "Welcome Back",
      joinUs: "Join Us Today"
    },
    fr: {
      signIn: "Se Connecter",
      signUp: "S'inscrire",
      fullName: "Nom Complet",
      email: "Email",
      password: "Mot de Passe",
      agreeTerms: "J'accepte les termes et conditions",
      submit: "Soumettre",
      loggingIn: "Connexion...",
      signingUp: "Inscription...",
      guest: "Continuer en tant qu'invité",
      welcome: "Bon Retour",
      joinUs: "Rejoignez-nous"
    },
    rw: {
      signIn: "Kwinjira",
      signUp: "Kwiyandikisha",
      fullName: "Amazina Yombi",
      email: "Imeli",
      password: "Ijambo ry'ibanga",
      agreeTerms: "Nemera amabwiriza",
      submit: "Ohereza",
      loggingIn: "Kwinjira...",
      signingUp: "Kwiyandikisha...",
      guest: "Komeza nk'umushyitsi",
      welcome: "Murakaza neza",
      joinUs: "Twifatanye"
    }
  };

  const t = (key) => translations[language][key] || key;

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 justify-center items-center p-8">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {activeTab === "signin" ? t("welcome") : t("joinUs")}
          </h2>
          <p className="text-xl">
            {activeTab === "signin" 
              ? "Access your account and continue your journey" 
              : "Create an account and start your journey with us"}
          </p>
          <div className="mt-8 p-4">
            {/* Placeholder for illustration */}
            <div className="w-64 h-64 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {activeTab === "signin" ? t("signIn") : t("signUp")}
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => changeLanguage("en")} 
                className={`px-2 py-1 text-sm rounded ${language === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage("fr")} 
                className={`px-2 py-1 text-sm rounded ${language === "fr" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                FR
              </button>
              <button 
                onClick={() => changeLanguage("rw")} 
                className={`px-2 py-1 text-sm rounded ${language === "rw" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                RW
              </button>
            </div>
          </div>

          <div className="flex mb-6">
            <button
              className={`flex-1 py-3 text-sm font-medium rounded-l-lg transition-colors ${
                activeTab === "signin" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              {t("signIn")}
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium rounded-r-lg transition-colors ${
                activeTab === "signup" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              {t("signUp")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("fullName")}</label>
                <input
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
              <input
                type="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="example@mail.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("password")}</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            {activeTab === "signup" && (
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">{t("agreeTerms")}</label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium mt-4"
              disabled={isLoading || (activeTab === "signup" && !agreeToTerms)}
            >
              {isLoading ? (activeTab === "signin" ? t("loggingIn") : t("signingUp")) : t("submit")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
            {t("guest")}
          </p>
        </div>
      </div>
    </div>
  );
}