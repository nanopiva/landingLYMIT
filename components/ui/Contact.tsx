"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin, Mail, Send, User, MessageSquare, AtSign } from "lucide-react";
import AnimatedCopy from "./AnimatedCopy";

// --- VARIANTES DE ANIMACIÓN (Framer Motion) ---
// Mantenemos estas animaciones porque son de entrada y no afectan el scroll
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const iconHoverVariants: Variants = {
  rest: { scale: 1, backgroundColor: "#f5f5f7", color: "#000" },
  hover: {
    scale: 1.1,
    backgroundColor: "#000",
    color: "#fff",
    rotate: -5,
    transition: { duration: 0.3 },
  },
};

export default function Contact() {
  // Eliminamos sectionRef y useEffect de GSAP para quitar el "imán"

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // --- LÓGICA DE FORMULARIO ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulación de envío (aquí conectarías tu API real)
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <section
      className="contact_section"
      style={{ position: "relative", zIndex: 10 }}
    >
      <motion.div
        className="contact_container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
        <div className="contact_info_col">
          <motion.div className="contact_header" variants={itemVariants}>
            <span className="contact_subtitle">Hablemos</span>
            <h2 className="contact_title">Iniciá tu transformación digital.</h2>
            <AnimatedCopy colorFinal="#666666" triggerEnd="top 60%">
              <p className="contact_description">
                Estamos listos para escalar tu negocio. Contanos sobre tu
                proyecto y descubrí cómo podemos potenciarlo.
              </p>
            </AnimatedCopy>
          </motion.div>

          <div className="contact_details">
            {/* Ubicación */}
            <motion.div className="detail_item" variants={itemVariants}>
              <motion.div
                className="icon_circle"
                variants={iconHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                <MapPin size={22} strokeWidth={1.5} />
              </motion.div>
              <div className="detail_text_wrapper">
                <h3>Ubicación</h3>
                <p>Santa Fe, Argentina</p>
                <span className="detail_note">
                  (Trabajamos de forma remota con alcance global)
                </span>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div className="detail_item" variants={itemVariants}>
              <motion.div
                className="icon_circle"
                variants={iconHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                <Mail size={22} strokeWidth={1.5} />
              </motion.div>
              <div className="detail_text_wrapper">
                <h3>Email</h3>
                <a
                  href="mailto:contact@lymitsolutions.com"
                  className="detail_link"
                >
                  contact@lymitsolutions.com
                </a>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div className="detail_item" variants={itemVariants}>
              <motion.div
                className="icon_circle"
                variants={iconHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                <WhatsAppIcon />
              </motion.div>
              <div className="detail_text_wrapper">
                <h3>WhatsApp</h3>
                <div className="phones_grid">
                  <a
                    href="https://wa.me/5493425364800"
                    target="_blank"
                    className="detail_link"
                  >
                    +54 9 (342) 536-4800
                  </a>
                  <a
                    href="https://wa.me/5491123957675"
                    target="_blank"
                    className="detail_link"
                  >
                    +54 9 (011) 239-57675
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <motion.div className="contact_form_col" variants={itemVariants}>
          <form onSubmit={handleSubmit} className="actual_form">
            <FloatingInput
              label="Tu Nombre"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              icon={<User size={18} />}
            />

            <FloatingInput
              label="Tu Correo Electrónico"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              icon={<AtSign size={18} />}
            />

            <FloatingInput
              label="Contanos sobre tu proyecto"
              name="message"
              type="textarea"
              value={formState.message}
              onChange={handleChange}
              icon={<MessageSquare size={18} />}
            />

            <div className="form_footer">
              <motion.button
                type="submit"
                className="submit_btn"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02, backgroundColor: "#222" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {status === "loading" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Enviando...
                    </motion.span>
                  ) : status === "success" ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      ¡Mensaje Enviado!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      Enviar Mensaje <Send size={16} className="btn_icon" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {status === "error" && (
                <motion.p
                  className="error_msg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  Error al enviar. Intenta por email.
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- SUBCOMPONENTES ---

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 1h4a.5.5 0 0 0 1-1v-1a.5.5 0 0 0-1-1h-4a.5.5 0 0 0-1 1v1z" />
    </svg>
  );
}

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  icon: React.ReactNode;
}

function FloatingInput({
  label,
  name,
  type,
  value,
  onChange,
  icon,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      className={`input_group ${isFocused || hasValue ? "active" : ""}`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor={name} className="floating_label">
        <motion.span
          className="label_icon"
          animate={{
            color: isFocused ? "#000" : "#999",
            scale: isFocused ? 1.1 : 1,
          }}
        >
          {icon}
        </motion.span>
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className="form_input textarea"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className="form_input"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
        />
      )}
      <div className="input_border_base" />
      <motion.div
        className="input_border_active"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
