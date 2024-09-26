import Link from 'next/link'

export default function Home() {

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/calculo-conjuntos">Cálculo de Conjuntos</Link>
      <br></br>
      <Link href="/calculo-funcoes">Cálculo de Funções</Link>
    </div>
  );
}
