"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import MailApi from "@api/email/mailApi";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(""); // 保存 reCAPTCHA token
  const [isVerified, setIsVerified] = useState(false); // 是否验证成功
  const form = useRef(); // 绑定表单

  // reCAPTCHA 生成 token
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setIsVerified(true); // 验证通过
  };

  // 发送邮件逻辑
  const sendEmail = (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify the reCAPTCHA first.");
      return;
    }

    emailjs
      .sendForm(
        MailApi.SERVICE_ID,
        MailApi.TEMPLATE_ID,
        form.current,
        MailApi.PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          setEmailSubmitted(true);
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          alert("Failed to send message. Please check your information.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="flex flex-col my-12 gap-8 relative items-center"
    >
      {/* 上方文本描述 */}
      <div className="z-10 w-full max-w-lg text-center">
        <h2 className="text-center text-4xl font-bold text-white mt-4 mb-2 md:mb-4">
          Let&apos;s Connect
        </h2>
        <p className="text-[#ADB7BE] mb-0">
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to
          you! 😊
        </p>
      </div>

      {/* 下方表单 */}
      <div className="z-10 w-full max-w-lg">
        {emailSubmitted ? (
          <p className="text-green-500 text-center text-sm mt-4">
            Email sent successfully! 🎉
          </p>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="flex flex-col">
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-white mb-2 text-sm font-medium"
              >
                Your Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                placeholder="you@example.com"
                className="w-full p-2.5 rounded-lg bg-[#18191E] text-gray-100 border border-[#33353F] placeholder-[#9CA2A9]"
              />
            </div>

            {/* Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-white mb-2 text-sm font-medium"
              >
                Your Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Your Name"
                required
                className="w-full p-2.5 rounded-lg bg-[#18191E] text-gray-100 border border-[#33353F] placeholder-[#9CA2A9]"
              />
            </div>
            {/* Subject */}
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-white mb-2 text-sm font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                placeholder="Just saying hi!"
                required
                className="w-full p-2.5 rounded-lg bg-[#18191E] text-gray-100 border border-[#33353F] placeholder-[#9CA2A9]"
              />
            </div>
            {/* Message */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-white mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                placeholder="Let's talk about..."
                className="w-full p-2.5 rounded-lg bg-[#18191E] text-gray-100 border border-[#33353F] placeholder-[#9CA2A9]"
              ></textarea>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center items-center">
              <ReCAPTCHA
                sitekey="6LeszpwqAAAAAP9WPzNdwRxPP3Xj2BFtgq3zjeq2"
                onChange={handleRecaptchaChange}
                className="g-recaptcha"
              />
            </div>

            {/* 发送按钮 */}
            <button
              type="submit"
              disabled={!isVerified} // 按钮禁用逻辑
              className={`w-full text-white font-medium py-2.5 px-5 rounded-lg mt-4 ${
                isVerified
                  ? "bg-primary-500 hover:bg-primary-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
