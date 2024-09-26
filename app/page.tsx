import Link from 'next/link'

export default function Home() {

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/calculo-conjuntos" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Cálculo de Conjuntos
      </Link>
      <br className="my-4" />
      <Link href="/calculo-funcoes" className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
        Cálculo de Funções
      </Link>

      <h2><strong>Aluno: </strong>Mauricio Zeli Flint - 1 Semestre ADS</h2>
    </div>

  );
}
