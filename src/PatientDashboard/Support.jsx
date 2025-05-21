import React, { useState } from 'react';
import '../dashboardstyles/support.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Support = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/recommend/contact/createContact', data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                Notify.success("Your message has been sent! We will get back to you soon.");
                reset(); // Clear form
            } else {
                Notify.failure("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            Notify.failure("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="support-container">
            <h1 className="support-title">Patient Support Center</h1>
            <p className="support-intro">Hi there! How can we help you today? Please check common topics or send us a message.</p>

            <div className="support-topics">
                <button>Appointment Issues</button>
                <button>Access Records</button>
                <button>Billing Inquiries</button>
                <button>Password Reset</button>
            </div>

            <h2 className="support-subtitle">Send us a message</h2>
            <form className="support-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register('full_name', { required: true })}
                />
                {errors.full_name && <span className="error">Full name is required</span>}

                <input
                    type="email"
                    placeholder="Email Address"
                    {...register('email', { required: true })}
                />
                {errors.email && <span className="error">Valid email is required</span>}

                <textarea
                    placeholder="Describe your issue..."
                    rows="4"
                    {...register('content', { required: true })}
                ></textarea>
                {errors.content && <span className="error">Message content is required</span>}

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Submit"}
                </button>
            </form>

            <div className="support-contact">
                <h3>Other ways to reach us:</h3>
                <p>Email: <span style={{ color: "#444", fontSize: "1rem" }}>dushimiyimanaelisa@gmail.com</span></p>
                <p>Phone: <span style={{ color: "#444", fontSize: "1rem" }}>+250 787 239 952</span></p>
            </div>
        </div>
    );
};

export default Support;
