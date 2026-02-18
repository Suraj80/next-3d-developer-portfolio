import { useState } from "react";

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export function useContactForm() {
    const [form, setForm] = useState<ContactForm>({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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

    return {
        form,
        loading,
        success,
        error,
        handleChange,
        handleSubmit,
    };
}
