import Image from "next/image";

export default function Header() {
  return (
    <header>
      {/* <Image src="" alt="" /> */}
      <h1>IronFuel</h1>
      <ul>
        <li>Suplementos</li>
        <li>Vitaminas</li>
        <li>Accesorios</li>
        <li>
          <button>Mi carro</button>
        </li>
      </ul>
    </header>
  );
}
