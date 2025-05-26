import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

export default function Welcome() {
  const [activeTab, setActiveTab] = useState("signin");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

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
      joinUs: "Join Us Today",
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
      joinUs: "Rejoignez-nous",
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
      joinUs: "Twifatanye",
    },
  };

  const t = (key) => translations[language][key] || key;
  const changeLanguage = (lng) => setLanguage(lng);

  const onSubmit = async (data) => {
    if (activeTab === "signup" && !agreeToTerms) {
      Notify.failure("You must agree to the terms to sign up.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (activeTab === "signup") {
        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);
        await axios.post("http://localhost:8000/recommend/register", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        Notify.success("Registration successful, please login.");
        reset();
        setActiveTab("signin");
      } else {
        const res = await axios.post(
          "http://localhost:8000/recommend/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userToken = res.data;
        localStorage.setItem("userToken", JSON.stringify(userToken));
        const Role = userToken?.user?.userRole;
        console.log("=====================", Role);

        if (Role === "hospital") {
          navigate("/dashboard");
          Notify.success("Hospital Login Successful");
        } else if (Role === "doctor") {
          navigate("/doctor");
          Notify.success("Doctor Login SuccessFull");
        } else if (Role === "superAdmin") {
          navigate("/super");
          Notify.success("Super Admin Login SuccessFull");
        } else {
          navigate("/patient");
          Notify.success("Patient Login SuccessFull");
        }
      }
    } catch (error) {
      console.error(error);
      Notify.failure("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section - Image */}
      {/* Left Section - Image */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 justify-center items-center p-8 z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {activeTab === "signin" ? t("welcome") : t("joinUs")}
          </h2>
          <p className="text-xl text-white">
            {activeTab === "signin"
              ? "Access your account and continue your journey"
              : "Create an account and start your journey with us"}
          </p>
          <div className="mt-8 p-4">
            <div className="w-64 h-64 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg
                className="w-40 h-40 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-4 md:p-8 md:ml-[50%] min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex flex-row items-center justify-between mb-4">
            <div className="text-xl font-bold text-gray-800">
              {activeTab === "signin" ? t("signIn") : t("signUp")}
            </div>
            <div className="flex items-center space-x-2">
              {["en", "fr", "rw"].map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={`w-16 h-10 text-xs rounded ${
                    language === lng
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
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

          <form onSubmit={handleSubmit(onSubmit)}>
            {activeTab === "signup" && (
              <>
                <div className="mb-4">
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    {t("FirstName")}
                  </div>
                  <input
                    {...register("firstname", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                    name="firstname"
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-4">
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    {t("LastName")}
                  </div>
                  <input
                    {...register("lastname", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                    name="lastname"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <div className="block text-sm font-medium text-gray-700 mb-1">
                {t("email")}
              </div>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@mail.com"
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <div className="block text-sm font-medium text-gray-700 mb-1">
                {t("password")}
              </div>
              <input
                type="password"
                {...register("password", { required: true, minLength: 3 })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            {activeTab === "signin" && (
              <div className="mb-4">Forget Password</div>
            )}

            {activeTab === "signup" && (
              <div className="mb-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    {t("agreeTerms")}
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-3 hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : t("submit")}
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
