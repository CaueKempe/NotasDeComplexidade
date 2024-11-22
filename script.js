// Função comum para calcular a pontuação
function calcularPontuacao(campos) {
    // Pesos para cada fator
    const PESOS = {
        nivel_desenvolvedor: 0.2,
        tipo_tarefa: 0.2,
        interacoes: 0.1,
        tecnologia: 0.15,
        requisitos: 0.1,
        horas_estimadas: 0.25,
    };

    // Mapas de pontuação
    const nivelDesenvolvedorMap = { 1: 100, 2: 75, 3: 50, 4: 25 };
    const tipoTarefaMap = { 1: 100, 2: 80, 3: 60, 4: 50, 5: 40 };
    const familiaridadeMap = { alto: 33, medio: 66, baixo: 100 };

    // Cálculo das pontuações
    const nivelDesenvolvedorPontos = nivelDesenvolvedorMap[campos.nivel_desenvolvedor] || 0;
    const tipoTarefaPontos = tipoTarefaMap[campos.tipo_tarefa] || 0;
    const interacoesPontos = (campos.interacoes.reduce((a, b) => a + b, 0) / campos.interacoes.length) * 100;
    console.log('Interações:', interacoesPontos);
    const tecnologiaPontos = familiaridadeMap[campos.familiaridade] + (campos.tecnologia === 1 ? 100 : 0);
    const requisitosPontos = Math.min(campos.requisitos / 50, 1) * 100;
    const tempoEstimadoPontos = Math.min(campos.horas_estimadas / 500, 1) * 100;

    // Soma ponderada
    const pontuacaoFinal =
        PESOS.nivel_desenvolvedor * nivelDesenvolvedorPontos +
        PESOS.tipo_tarefa * tipoTarefaPontos +
        PESOS.interacoes * interacoesPontos +
        PESOS.tecnologia * tecnologiaPontos +
        PESOS.requisitos * requisitosPontos +
        PESOS.horas_estimadas * tempoEstimadoPontos;

    return pontuacaoFinal.toFixed(2);
}

// Atualizar o preview da pontuação
document.getElementById("formulario").addEventListener("change", function () {
    // Coleta os valores do formulário
    const campos = {
        nivel_desenvolvedor: parseInt(document.querySelector('input[name="nivel"]:checked')?.value || 0),
        tipo_tarefa: parseInt(document.querySelector('input[name="tarefa"]:checked')?.value || 0),
        interacoes: [
            parseInt(document.querySelector('input[name="api"]:checked')?.value || 0),
            parseInt(document.querySelector('input[name="banco"]:checked')?.value || 0),
            parseInt(document.querySelector('input[name="interface"]:checked')?.value || 0),
        ],
        familiaridade: document.querySelector('input[name="familiaridade"]:checked')?.value || 'baixo',
        tecnologia: parseInt(document.querySelector('input[name="novas-tecnologias"]:checked')?.value || 0),
        requisitos: parseInt(document.getElementById("requisitos").value || 0),
        horas_estimadas: parseFloat(document.getElementById("horas").value || 0),
    };

    // Calcula a pontuação e atualiza o preview
    const pontuacao = calcularPontuacao(campos);

    // Atualiza o conteúdo do preview da pontuação
    document.getElementById("previewPontuacao").textContent = `Pontuação: ${pontuacao}`;
});

// Evento de envio do formulário para gerar o relatório
document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Coleta os valores do formulário novamente
    const campos = {
        nivel_desenvolvedor: parseInt(document.querySelector('input[name="nivel"]:checked')?.value || 0),
        tipo_tarefa: parseInt(document.querySelector('input[name="tarefa"]:checked')?.value || 0),
        interacoes: [
            parseInt(document.querySelector('input[name="api"]:checked')?.value || 0),
            parseInt(document.querySelector('input[name="banco"]:checked')?.value || 0),
            parseInt(document.querySelector('input[name="interface"]:checked')?.value || 0),
        ],
        familiaridade: document.querySelector('input[name="familiaridade"]:checked')?.value || 'baixo',
        tecnologia: parseInt(document.querySelector('input[name="novas-tecnologias"]:checked')?.value || 0),
        requisitos: parseInt(document.getElementById("requisitos").value || 0),
        horas_estimadas: parseFloat(document.getElementById("horas").value || 0),
    };

    // Calcula a pontuação para o relatório
    const pontuacaoFinal = calcularPontuacao(campos);

    // Gera o relatório
    const relatorio = `
---------------------------------------------
Nível do Desenvolvedor: ${campos.nivel_desenvolvedor} 
Tipo de Tarefa: ${campos.tipo_tarefa} 
Interações (Detalhes: ${campos.interacoes}) 
Familiaridade com a Tecnologia: ${campos.familiaridade} 
Novas Tecnologias: ${campos.tecnologia === 1 ? "Sim" : "Não"} 
Número de Requisitos: ${campos.requisitos} 
Tempo Estimado: ${campos.horas_estimadas} horas 
---------------------------------------------
Pontuação Final: ${pontuacaoFinal}
---------------------------------------------
`;

    // Cria o arquivo de texto
    const blob = new Blob([relatorio], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio.txt";
    link.click();
});
