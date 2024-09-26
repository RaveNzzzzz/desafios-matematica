"use client"; // Indica que o componente é client-side

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LavaJatoForm() {
  // Estados para os inputs
  const [formData, setFormData] = useState({
    custo_lavagem: '',
    custo_limpeza: '',
    contas: '',
    aluguel: '',
    quantidade_funcionarios: '',
    salario: '',
    comissao: '',
    imposto: '',
    carros_lavados: '', // Quantidade de carros lavados
  });

  const [resultados, setResultados] = useState({
    receita: null,
    custo_variavel: null,
    custo_fixo: null,
    custo_total: null,
    lucro: null,
  });

  // Função para atualizar os valores dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para realizar os cálculos
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

    // Garantir que os valores sejam convertidos para números
    const custoLavagemNum = parseFloat(custo_lavagem) || 0;
    const custoLimpezaNum = parseFloat(custo_limpeza) || 0;
    const contasNum = parseFloat(contas) || 0;
    const aluguelNum = parseFloat(aluguel) || 0;
    const quantidadeFuncionariosNum = parseInt(quantidade_funcionarios) || 0;
    const salarioNum = parseFloat(salario) || 0;
    const comissaoNum = parseFloat(comissao) || 0;
    const impostoNum = parseFloat(imposto) / 100 || 0; // Dividindo por 100 para transformar em porcentagem
    const carrosLavadosNum = parseInt(carros_lavados) || 0;

    // Receita = custo_lavagem * carros_lavados
    const receita = custoLavagemNum * carrosLavadosNum;

    // Custo variável = custo_limpeza + comissão + imposto
    const custoVariavel = custoLimpezaNum + comissaoNum + (impostoNum * custoLimpezaNum); // imposto aplicado à base de custos variáveis

    // Custo fixo = ((salario * quantidade_funcionarios) * imposto) + contas + aluguel
    const custoFixo =
      (salarioNum * quantidadeFuncionariosNum * (1 + impostoNum)) + contasNum + aluguelNum;

    // Custo total = custo_var + custo_fixo
    const custoTotal = custoVariavel + custoFixo;

    // Lucro = (receita - custo_var) - custo_fixo
    const lucro = receita - custoVariavel - custoFixo;

    // Atualizar os resultados
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
          <p>Custo Variável: R$ {resultados.custo_variavel.toFixed(2)}</p>
          <p>Custo Fixo: R$ {resultados.custo_fixo.toFixed(2)}</p>
          <p>Custo Total: R$ {resultados.custo_total.toFixed(2)}</p>
          <p>Lucro: R$ {resultados.lucro.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
