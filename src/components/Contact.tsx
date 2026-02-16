"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);

    /* ============================= */
    /*       Parallax Background     */
    /* ============================= */

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const glow1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const glow2Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSuccess(false);
        setError(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            setLoading(false);

            if (res.ok) {
                setSuccess(true);
                setForm({ name: "", email: "", message: "" });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(true);
            }
        } catch (err) {
            setLoading(false);
            setError(true);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        >
            {/* Background Glow 1 - Purple */}
            <motion.div
                style={{ y: glow1Y }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"
            />

            {/* Background Glow 2 - Cyan */}
            <motion.div
                style={{ y: glow2Y }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] translate-x-1/2 translate-y-1/2 bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none"
            />

            <div className="max-w-7xl w-full mx-auto relative z-10">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                >
                    Let's Build Something
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center text-xl sm:text-2xl text-gray-400 mb-12 sm:mb-16 lg:mb-20"
                >
                    Impactful Together
                </motion.p>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
                    {/* ============================= */}
                    {/*         LEFT SIDE - INFO      */}
                    {/* ============================= */}

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                Open for Opportunities
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                                I'm open to freelance projects, full-time roles, and
                                collaborations on innovative products. Let's connect and
                                create something extraordinary.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            {/* Email */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="group p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 blur-lg opacity-50 rounded-xl" />
                                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/20">
                                            <FiMail className="text-purple-400" size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Email</p>
                                        <p className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-medium">
                                            your_email@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Location */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="group p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 blur-lg opacity-50 rounded-xl" />
                                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/20">
                                            <FiMapPin className="text-cyan-400" size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Location</p>
                                        <p className="text-sm sm:text-base text-white font-medium">
                                            India
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Availability Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                            />
                            <p className="text-green-400 font-medium text-sm sm:text-base">
                                Currently Available for Projects
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* ============================= */}
                    {/*       RIGHT SIDE - FORM       */}
                    {/* ============================= */}

                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        {/* Gradient Border Container */}
                        <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30">
                            {/* Form Card */}
                            <div className="relative p-8 sm:p-10 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            required
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder-gray-500 peer"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-purple-500/0 peer-focus:from-purple-500/10 peer-focus:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            required
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder-gray-500 peer"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-cyan-500/0 peer-focus:from-cyan-500/10 peer-focus:to-purple-500/10 transition-all duration-300 pointer-events-none" />
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="relative group">
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Your Message"
                                            rows={5}
                                            required
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-pink-400 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder-gray-500 resize-none peer"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 to-pink-500/0 peer-focus:from-pink-500/10 peer-focus:to-cyan-500/10 transition-all duration-300 pointer-events-none" />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: loading ? 1 : 1.02 }}
                                        whileTap={{ scale: loading ? 1 : 0.98 }}
                                        className="relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {/* Animated Gradient Background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 group-hover:from-purple-600 group-hover:via-cyan-600 group-hover:to-pink-600 transition-all duration-300" />

                                        {/* Shimmer Effect */}
                                        <motion.div
                                            animate={{
                                                x: ["-100%", "100%"],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        />

                                        {/* Button Content */}
                                        <span className="relative flex items-center justify-center gap-2">
                                            {loading ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{
                                                            duration: 1,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                        }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <FiSend size={18} />
                                                    Send Message
                                                </>
                                            )}
                                        </span>
                                    </motion.button>

                                    {/* Success Message */}
                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                                        >
                                            <BsCheckCircleFill className="text-green-400" size={20} />
                                            <p className="text-green-400 text-sm font-medium">
                                                Message sent successfully! I'll get back to you soon.
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                                        >
                                            <p className="text-red-400 text-sm font-medium">
                                                Something went wrong. Please try again.
                                            </p>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
