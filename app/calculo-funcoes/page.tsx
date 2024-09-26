"use client"; // Indica que o componente é client-side

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link'

export default function LavaJatoForm() {
  const [formData, setFormData] = useState({
    custo_lavagem: '',
    custo_limpeza: '',
    contas: '',
    aluguel: '',
    quantidade_funcionarios: '',
    salario: '',
    comissao: '',
    imposto: '',
    carros_lavados: '',
  });

  const [resultados, setResultados] = useState<{
    receita: number | null;
    custo_variavel: number | null;
    custo_fixo: number | null;
    custo_total: number | null;
    lucro: number | null;
  }>({
    receita: null,
    custo_variavel: null,
    custo_fixo: null,
    custo_total: null,
    lucro: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calcularFuncoes = () => {
    const {
      custo_lavagem,
      custo_limpeza,
      contas,
      aluguel,
      quantidade_funcionarios,
      salario,
      comissao,
      imposto,
      carros_lavados,
    } = formData;

    const custoLavagemNum = parseFloat(custo_lavagem) || 0;
    const custoLimpezaNum = parseFloat(custo_limpeza) || 0;
    const contasNum = parseFloat(contas) || 0;
    const aluguelNum = parseFloat(aluguel) || 0;
    const quantidadeFuncionariosNum = parseInt(quantidade_funcionarios) || 0;
    const salarioNum = parseFloat(salario) || 0;
    const comissaoNum = parseFloat(comissao) || 0;
    const impostoNum = parseFloat(imposto) / 100 || 0;
    const carrosLavadosNum = parseInt(carros_lavados) || 0;

    const receita = custoLavagemNum * carrosLavadosNum;
    const custoVariavel = custoLimpezaNum + comissaoNum + impostoNum * custoLimpezaNum;
    const custoFixo = (salarioNum * quantidadeFuncionariosNum * (1 + impostoNum)) + contasNum + aluguelNum;
    const custoTotal = custoVariavel + custoFixo;
    const lucro = receita - custoVariavel - custoFixo;

    setResultados({
      receita,
      custo_variavel: custoVariavel,
      custo_fixo: custoFixo,
      custo_total: custoTotal,
      lucro,
    });
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h2>Calcular Custos do Lava Jato</h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        <Input
          type="number"
          name="custo_lavagem"
          placeholder="Custo por Lavagem"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="custo_limpeza"
          placeholder="Custo com Produtos de Limpeza"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        <Input
          type="number"
          name="contas"
          placeholder="Contas de Água e Luz"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="aluguel"
          placeholder="Aluguel"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 gap-y-4">
        <Input
          type="number"
          name="quantidade_funcionarios"
          placeholder="Quantidade de Funcionários"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="salario"
          placeholder="Salário do Funcionário"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="comissao"
          placeholder="Comissão por Lavagem"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="imposto"
          placeholder="Imposto (%)"
          onChange={handleChange}
        />
      </div>

      {/* Input para quantidade de carros lavados */}
      <div className="mt-4">
        <Input
          type="number"
          name="carros_lavados"
          placeholder="Quantidade de Carros Lavados"
          onChange={handleChange}
        />
      </div>

      {/* Botão para calcular */}
      <Button className="mt-8" onClick={calcularFuncoes}>
        Calcular Funções
      </Button>

      {/* Exibição dos resultados */}
      {resultados.receita !== null && (
        <div className="mt-8">
          <h2>Resultados:</h2>
          <p>Receita: R$ {resultados.receita.toFixed(2)}</p>
          <p>Custo Variável: R$ {(resultados.custo_variavel ?? 0).toFixed(2)}</p>
          <p>Custo Fixo: R$ {(resultados.custo_fixo ?? 0).toFixed(2)}</p>
          <p>Custo Total: R$ {(resultados.custo_total ?? 0).toFixed(2)}</p>
          <p>Lucro: R$ {(resultados.lucro ?? 0).toFixed(2)}</p>
        </div>
      )}

      <div>
      <Link href="/" className="gap-y-14 inline-block bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>

    
  );
}
