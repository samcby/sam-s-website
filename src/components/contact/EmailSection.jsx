"use client";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from '@/context/ThemeContext';
import emailjs from '@emailjs/browser';

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useRef();
  const { isDarkMode } = useTheme();

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setIsVerified(true);
    setError(""); // 清除之前的错误
  };

  const validateFields = (data) => {
    const errors = {};
    
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject || data.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters';
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log('Form submission started');

    setIsLoading(true);
    setError(""); // Clear previous errors

    if (!isVerified) {
      setError("Please complete the reCAPTCHA verification");
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting to send email...');
      
      const templateParams = {
        name: form.current.name.value,
        email: form.current.email.value,
        subject: form.current.subject.value,
        message: form.current.message.value,
      };

      console.log('Template params:', templateParams);

      const response = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);

      if (response.status === 200) {
        setEmailSubmitted(true);
        form.current.reset();
        setIsVerified(false);
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      } else {
        throw new Error('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setError(error.message || "Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center"
    >
      {/* Description text */}
      <div className="w-full max-w-lg text-center">
        <p className={`text-sm sm:text-base mb-8 px-4 sm:px-0 transition-colors duration-300
                    ${isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'}`}>
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to
          you! 😊
        </p>
      </div>

      {/* Form section */}
      <div className="w-full max-w-lg">
        {emailSubmitted ? (
          <p className="text-green-500 text-center text-sm mt-4">
            Email sent successfully! 🎉
          </p>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4 sm:space-y-6">
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
                {error}
              </div>
            )}
            
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Your Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                placeholder="you@example.com"
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              />
            </div>

            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Your Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Your Name"
                required
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              />
            </div>

            {/* Subject field */}
            <div>
              <label
                htmlFor="subject"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                placeholder="Just saying hi!"
                required
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              />
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                placeholder="Let's talk about..."
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300 resize-none
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              ></textarea>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center items-center transform scale-90 sm:scale-100">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
                className="g-recaptcha"
                theme={isDarkMode ? "dark" : "light"}
                hl="en"
                onExpired={() => {
                  setIsVerified(false);
                  setError("reCAPTCHA expired. Please verify again.");
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isVerified || isLoading}
              className={`w-full font-medium py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg text-sm sm:text-base transition-colors
                       ${isVerified && !isLoading
                         ? isDarkMode
                           ? 'bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198]'
                           : 'bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198]'
                         : 'bg-gray-500 cursor-not-allowed text-[#fdf6e3]'}`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
