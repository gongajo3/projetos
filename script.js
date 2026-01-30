
    // A lógica de cálculo permanece a mesma, garantindo a integridade dos dados
    function calcularAvaliacao() {
        const p1 = parseFloat(document.getElementById('p1').value) || 0;
        const p2 = parseFloat(document.getElementById('p2').value) || 0;
        const p3 = parseFloat(document.getElementById('p3').value) || 0;
        const p4 = parseFloat(document.getElementById('p4').value) || 0;
        
        const mediaProvas = (p1 + p2 + p3 + p4) / 4;
        const tarefasPonto = parseInt(document.getElementById('tarefasPonto').value);
        const qualidadeProjeto = parseInt(document.getElementById('qualidadeProjeto').value);
        const bonusAtividades = (tarefasPonto + qualidadeProjeto) * 0.5;
        
        const likes = parseInt(document.getElementById('likes').value);
        const partilhas = parseInt(document.getElementById('partilhas').value);
        const envolvimentoTotal = likes + partilhas + 5; // Eventos fixo em 5 para exemplo
        const envolvimentoEscala = (envolvimentoTotal / 15) * 20;
        
        const atrasos = parseInt(document.getElementById('atrasos').value);
        const faltas = parseInt(document.getElementById('faltas').value);
        const penalizacoesTotal = atrasos + faltas;
        
        const notaFinal = (mediaProvas * 0.7) + (envolvimentoEscala * 0.3) - penalizacoesTotal;
        const notaFinalAjustada = Math.max(0, Math.min(20, Math.round(notaFinal * 10) / 10));
        
        let classificacao = "";
        let cor = "";
        
        if (notaFinalAjustada >= 17) {
            classificacao = "⭐ EXCELENTE ⭐";
            cor = "bg-gradient-to-r from-emerald-500 to-teal-600";
        } else if (notaFinalAjustada >= 14) {
            classificacao = "👍 BOM DESEMPENHO";
            cor = "bg-gradient-to-r from-blue-500 to-indigo-600";
        } else if (notaFinalAjustada >= 10) {
            classificacao = "✅ SUFICIENTE";
            cor = "bg-gradient-to-r from-amber-500 to-orange-500";
        } else {
            classificacao = "❌ ABAIXO DA MÉDIA";
            cor = "bg-gradient-to-r from-rose-600 to-red-800";
        }
        
        document.getElementById('mediaProvas').textContent = mediaProvas.toFixed(1);
        document.getElementById('envolvimento').textContent = envolvimentoEscala.toFixed(1);
        document.getElementById('penalizacoes').textContent = "-" + penalizacoesTotal.toFixed(1);
        document.getElementById('notaFinal').textContent = notaFinalAjustada.toFixed(1);
        document.getElementById('classificacao').textContent = classificacao;
        document.getElementById('classificacao').className = `${cor} inline-block px-8 py-3 rounded-full text-white font-black text-xl shadow-xl shadow-black/20`;
        
        document.getElementById('detalhes').innerHTML = `
            > COMPETÊNCIAS CORE: ${mediaProvas.toFixed(1)} (70%) <br>
            > ENGAJAMENTO SOCIAL: ${envolvimentoEscala.toFixed(1)} (30%) <br>
            > PENALIZAÇÕES APLICADAS: -${penalizacoesTotal.toFixed(1)} pts <br>
            > RESULTADO FINAL: ${notaFinalAjustada.toFixed(1)} / 20.0
        `;
        
        document.getElementById('resultados').classList.remove('hidden');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    window.onload = calcularAvaliacao;
