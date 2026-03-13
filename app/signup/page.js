"use client";

import Image from "next/image";
import classes from "@/app/login/page.module.css";
import headerImg from "@/public/images/ironfuel-header.webp";
import Input from "@/components/Input";
import Link from "next/link";

const handleSubmit = (e) => {
  e.preventDefault();
  // Aquí puedes agregar la lógica para manejar el envío del formulario
};

export default function Signup() {
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
            placeholder="tu@email.com"
          />
          <Input
            label="Contraseña"
            type="password"
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
            placeholder="••••••••"
          />
          <Input
            label="Confirmar contraseña"
            type="password"
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
