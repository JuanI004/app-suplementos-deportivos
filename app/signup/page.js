"use client";

import Image from "next/image";
import classes from "@/app/login/page.module.css";
import headerImg from "@/public/images/ironfuel-header.webp";
import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errores, setErrores] = useState({});
  const [passVisibles, setPassVisibles] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  function validarFormulario() {
    const nuevosErrores = {};

    if (!signupData.name) {
      nuevosErrores.name = "Por favor, introduce tu nombre.";
    }
    if (!signupData.email) {
      nuevosErrores.email = "Por favor, introduce tu email.";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      nuevosErrores.email = "Por favor, introduce un email válido.";
    }
    if (!signupData.password) {
      nuevosErrores.password = "Por favor, introduce tu contraseña.";
    }
    if (signupData.password !== signupData.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: { data: { nombre: signupData.name } },
      });
      if (error && data.user && data.user.identities?.length === 0) {
        setErrores({
          general: "Error al crear la cuenta. Inténtalo de nuevo.",
        });
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div className={classes.bg}>
      <div className={classes.main}>
        <Image src={headerImg} width={180} alt="Description" />
        <div className={classes["main-title"]}>
          <h1>Crear cuenta</h1>
          <p>Empieza tu camino con IronFuel</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            type="text"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgba(255, 255, 255, 0.226)"
                viewBox="0 0 256 256"
              >
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
              </svg>
            }
            value={signupData.name}
            onChange={(e) => {
              setSignupData((prev) => ({ ...prev, name: e.target.value }));
              setErrores((prev) => ({ ...prev, name: null }));
            }}
            error={errores.name}
            placeholder="Tu Nombre"
          />
          <Input
            label="Email"
            type="email"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgba(255, 255, 255, 0.226)"
                viewBox="0 0 256 256"
              >
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
              </svg>
            }
            error={errores.email}
            value={signupData.email}
            onChange={(e) => {
              setSignupData((prev) => ({ ...prev, email: e.target.value }));
              setErrores((prev) => ({ ...prev, email: null }));
            }}
            placeholder="tu@email.com"
          />
          <Input
            label="Contraseña"
            type={passVisibles.password ? "text" : "password"}
            togglePassword={() =>
              setPassVisibles((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgba(255, 255, 255, 0.226)"
                viewBox="0 0 256 256"
              >
                <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path>
              </svg>
            }
            error={errores.password}
            value={signupData.password}
            onChange={(e) => {
              setSignupData((prev) => ({ ...prev, password: e.target.value }));
              setErrores((prev) => ({ ...prev, password: null }));
            }}
            placeholder="••••••••"
            verIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgba(255, 255, 255, 0.226)"
                viewBox="0 0 256 256"
              >
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
              </svg>
            }
          />
          <Input
            label="Confirmar contraseña"
            type={passVisibles.confirmPassword ? "text" : "password"}
            togglePassword={() =>
              setPassVisibles((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgba(255, 255, 255, 0.226)"
                viewBox="0 0 256 256"
              >
                <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path>
              </svg>
            }
            verIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="rgba(255, 255, 255, 0.226)"
                viewBox="0 0 256 256"
              >
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
              </svg>
            }
            error={errores.confirmPassword}
            value={signupData.confirmPassword}
            onChange={(e) => {
              setSignupData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));
              setErrores((prev) => ({ ...prev, confirmPassword: null }));
            }}
            placeholder="Repite tu contraseña"
          />
          <button type="submit" className={classes.button}>
            Crear cuenta{" "}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span>
            ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
