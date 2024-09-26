"use client"; // Indica que o componente é client-side

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CalculoConjuntos() {
  const [conjuntos, setConjuntos] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    a_b: 0,
    a_c: 0,
    a_d: 0,
    b_c: 0,
    b_d: 0,
    c_d: 0,
    a_b_c: 0,
    a_b_d: 0,
    a_c_d: 0,
    b_c_d: 0,
    a_b_c_d: 0,
  });

  const [resultado, setResultado] = useState<number | null>(null); // Estado para armazenar o resultado da união
  const [formula, setFormula] = useState<string>(""); // Estado para armazenar a fórmula com os valores

  // Função para atualizar os valores dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConjuntos({
      ...conjuntos,
      [e.target.name]: parseInt(e.target.value || "0"),
    });
  };

  // Função para calcular a união dos conjuntos
  const calcularUniao = () => {
    const {
      a, b, c, d,
      a_b, a_c, a_d, b_c, b_d, c_d,
      a_b_c, a_b_d, a_c_d, b_c_d,
      a_b_c_d
    } = conjuntos;

    const total_uniao = a + b + c + d
      - (a_b + a_c + a_d + b_c + b_d + c_d)
      + (a_b_c + a_b_d + a_c_d + b_c_d)
      - a_b_c_d;

    setResultado(total_uniao); // Atualiza o estado com o resultado

    // Constroi a fórmula com os valores dos inputs
    const formulaCalculada = `
      União = ${a} + ${b} + ${c} + ${d}
      - (${a_b} + ${a_c} + ${a_d} + ${b_c} + ${b_d} + ${c_d})
      + (${a_b_c} + ${a_b_d} + ${a_c_d} + ${b_c_d})
      - ${a_b_c_d}
    `;

    setFormula(formulaCalculada); // Atualiza o estado com a fórmula
  };

  //calculo de funções


  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl mb-4">Desafio 1 - Cálculo de Conjuntos</h1>

      {/* Inputs para os conjuntos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input type="number" name="a" placeholder="Conjunto A" onChange={handleChange} />
        <Input type="number" name="b" placeholder="Conjunto B" onChange={handleChange} />
        <Input type="number" name="c" placeholder="Conjunto C" onChange={handleChange} />
        <Input type="number" name="d" placeholder="Conjunto D" onChange={handleChange} />

        {/* Inputs para as interseções de dois conjuntos */}
        <Input type="number" name="a_b" placeholder="A ∩ B" onChange={handleChange} />
        <Input type="number" name="a_c" placeholder="A ∩ C" onChange={handleChange} />
        <Input type="number" name="a_d" placeholder="A ∩ D" onChange={handleChange} />
        <Input type="number" name="b_c" placeholder="B ∩ C" onChange={handleChange} />
        <Input type="number" name="b_d" placeholder="B ∩ D" onChange={handleChange} />
        <Input type="number" name="c_d" placeholder="C ∩ D" onChange={handleChange} />

        {/* Inputs para as interseções de três conjuntos */}
        <Input type="number" name="a_b_c" placeholder="A ∩ B ∩ C" onChange={handleChange} />
        <Input type="number" name="a_b_d" placeholder="A ∩ B ∩ D" onChange={handleChange} />
        <Input type="number" name="a_c_d" placeholder="A ∩ C ∩ D" onChange={handleChange} />
        <Input type="number" name="b_c_d" placeholder="B ∩ C ∩ D" onChange={handleChange} />

        {/* Input para a interseção de quatro conjuntos */}
        <Input type="number" name="a_b_c_d" placeholder="A ∩ B ∩ C ∩ D" onChange={handleChange} />
      </div>

      <Button className="mt-8" onClick={calcularUniao}>
        Calcular União
      </Button>

      <br></br>

      {/* Exibe o resultado abaixo do botão */}
      {resultado !== null && (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            O número total de elementos na união dos conjuntos é: {resultado}
          </p>
          <br></br>
          {/* Exibe a fórmula utilizada com os valores inseridos */}
          <p className="text-lg font-semibold">
            {formula}
          </p>
        </div>
      )}

    </div>
  );
}
