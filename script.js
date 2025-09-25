document.addEventListener('DOMContentLoaded', () => {

    const telaInicio = document.getElementById('tela-inicio');
    const telaPergunta = document.getElementById('tela-pergunta');
    const telaFinal = document.getElementById('tela-final');
    const botaoJogar = document.getElementById('botao-jogar');
    const botaoDica = document.getElementById('botao-dica');
    const botaoEliminar = document.getElementById('botao-eliminar');
    const botaoReiniciar = document.getElementById('botao-reiniciar');
    
    const videoFinal = document.getElementById('video-final'); 

    const modalInstrucoes = document.getElementById('modal-instrucoes');
    const botaoEntendido = document.getElementById('botao-entendido');

    const modalDica = document.getElementById('modal-dica');
    const botaoModalOk = document.getElementById('botao-modal-ok');
    const dicaTexto = document.getElementById('dica-texto');
    const dicaImg = document.getElementById('dica-img');

    const modalFeedback = document.getElementById('modal-feedback');
    const feedbackImg = document.getElementById('feedback-img');
    const feedbackNome = document.getElementById('feedback-nome');
    const feedbackTexto = document.getElementById('feedback-texto');

    const modalSobre = document.getElementById('modal-sobre');
    const sobreNome = document.getElementById('sobre-nome');
    const sobreImg = document.getElementById('sobre-img');
    const sobreTexto = document.getElementById('sobre-texto');
    const botaoFecharSobre = document = document.getElementById('botao-fechar-sobre');

    const perguntaTitulo = document.getElementById('pergunta-titulo');
    const personagemPerguntaNome = document.getElementById('personagem-pergunta-nome');
    const personagemPerguntaImg = document.getElementById('personagem-pergunta-img');
    const opcoesBotoes = document.querySelectorAll('.opcao');
    const botoesPersonagem = document.querySelectorAll('.personagem, .personagem-principal');
    const pontuacaoAtualElem = document.getElementById('pontuacao-atual');
    const pontuacaoFinalElem = document.getElementById('pontuacao-final');

    let perguntaAtualIndex = 0;
    let dicaUsada = false;
    let usos5050Restantes = 3;
    let pontuacao = 0;

    const somAcerto = new Audio('audio/sucesso.mp3');
    const somErro = new Audio('audio/falha.mp3');
    const somClique = new Audio('audio/clique.mp3');
    const somEliminar = new Audio('audio/eliminar.mp3');

    const perguntasOriginal = [
        {
            pergunta: "O que é LGPD?",
            opcoes: [
                "Lei Geral de Proteção de Dados",
                "Livro Geral de Programação Digital",
                "Lista Global de Pessoas e Dados",
                "Lei de Garantia de Propriedade Digital"
            ],
            respostaCorreta: "Lei Geral de Proteção de Dados",
            dica: "É uma lei que protege informações pessoais.",
        },
        {
            pergunta: "Qual dessas é uma técnica de Segurança da Informação?",
            opcoes: [
                "Firewall",
                "Churrasqueira elétrica",
                "Micro-ondas",
                "Ventilador"
            ],
            respostaCorreta: "Firewall",
            dica: "Serve como barreira contra acessos indevidos.",
        },
        {
            pergunta: "O que é um data lake?",
            opcoes: [
                "Um grande repositório de dados brutos",
                "Um lago artificial para dados",
                "Um software para edição de texto",
                "Um tipo de peixe"
            ],
            respostaCorreta: "Um grande repositório de dados brutos",
            dica: "A palavra 'lake' (lago) é uma metáfora para algo grande e inexplorado.",
        },
        {
            pergunta: "Qual a função do SQL (Structured Query Language)?",
            opcoes: [
                "Criar gráficos e slides",
                "Gerenciar e manipular bancos de dados relacionais",
                "Desenhar interfaces de usuário",
                "Proteger redes de computadores"
            ],
            respostaCorreta: "Gerenciar e manipular bancos de dados relacionais",
            dica: "Pense em 'linguagem de consulta' para bancos de dados.",
        },
        {
            pergunta: "O que é 'machine learning'?",
            opcoes: [
                "Treinamento de academia para robôs",
                "Um novo tipo de linguagem de programação",
                "Área da IA que permite máquinas aprenderem com dados sem serem explicitamente programadas",
                "O estudo da mecânica de jogos"
            ],
            respostaCorreta: "Área da IA que permite máquinas aprenderem com dados sem serem explicitamente programadas",
            dica: "O nome já diz, 'aprendizado de máquina'.",
        },
        {
            pergunta: "Qual o principal objetivo da criptografia de dados?",
            opcoes: [
                "Comprimir arquivos para economizar espaço",
                "Aumentar a velocidade da internet",
                "Tornar dados ilegíveis para usuários não autorizados",
                "Ajustar o brilho da tela do computador"
            ],
            respostaCorreta: "Tornar dados ilegíveis para usuários não autorizados",
            dica: "Pense em códigos secretos ou 'chaves' que protegem a informação.",
        },
        {
            pergunta: "Em big data, o que significa a letra 'V' de Volume?",
            opcoes: [
                "A velocidade de processamento dos dados",
                "A variedade de tipos de dados",
                "O grande volume de dados gerados",
                "O valor financeiro dos dados"
            ],
            respostaCorreta: "O grande volume de dados gerados",
            dica: "A sigla é V, V, V, V... e a primeira letra se refere à 'quantidade'.",
        }
    ];

    let perguntas = [];
    
    const apresentadores = [
        { nome: "Amanda", img: "images/Amanda.png" },
        { nome: "Neuri", img: "images/Neuri.png" }
    ];
    const infoFeedbackAcerto = { nome: "Hudson", img: "images/Hudson.png", texto: "Parabéns, você acertou! Prepare-se para a próxima pergunta." };
    const infoFeedbackErro = { nome: "Elaine", img: "images/Elaine.png", texto: "Continue tentando, a próxima é sua!" };
    const personagemDica = { nome: "Ailton", img: "images/Ailton.png" };
    
    const infoPersonagens = {
        Amanda: {
            img: "images/Amanda.png",
            descricao: "Amanda é a host do show de dados. Ela é especialista em governança de dados e adora compartilhar seu conhecimento de forma divertida."
        },
        Hudson: {
            img: "images/Hudson.png",
            descricao: "Hudson trabalha na área de dados. Sua paixão é a análise e visualização de dados, transformando números brutos em insights valiosos."
        },
        Ailton: {
            img: "images/Ailton.png",
            descricao: "Ailton é do time de engenharia de dados. Ele constrói a infraestrutura para que os dados sejam coletados, processados e armazenados de forma eficiente."
        },
        Elaine: {
            img: "images/Elaine.png",
            descricao: "Elaine é a nossa cientista de dados. Ela usa modelos estatísticos e aprendizado de máquina para prever tendências e resolver problemas complexos."
        },
        Neuri: {
            img: "images/Neuri.png",
            descricao: "Neuri é o especialista em segurança da informação. Ele garante que os dados da Docket e de nossos clientes estejam sempre protegidos e seguros."
        }
    };

    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function exibirTela(tela) {
        document.querySelectorAll('.tela, .modal').forEach(el => el.classList.remove('ativo'));
        tela.classList.add('ativo');
    }

    function exibirModal(modal) {
        modal.classList.add('ativo');
    }

    function esconderModal(modal) {
        modal.classList.remove('ativo');
    }

    function atualizarPontuacao() {
        pontuacaoAtualElem.textContent = `Pontos: ${pontuacao}`;
    }

    function carregarPergunta(index) {
        const pergunta = perguntas[index];
        
        // Lógica para escolher o apresentador fixo (Amanda ou Neuri)
        const apresentadorAtual = apresentadores[Math.floor(Math.random() * apresentadores.length)];
        perguntaTitulo.textContent = pergunta.pergunta;
        personagemPerguntaNome.textContent = apresentadorAtual.nome;
        personagemPerguntaImg.src = apresentadorAtual.img;

        opcoesBotoes.forEach((botao, i) => {
            botao.textContent = pergunta.opcoes[i];
            botao.classList.remove('correta', 'incorreta', 'eliminada');
            botao.disabled = false;
        });

        botaoDica.classList.remove('desabilitado');
        if (usos5050Restantes <= 0) {
            botaoEliminar.classList.add('desabilitado');
        } else {
            botaoEliminar.classList.remove('desabilitado');
        }

        dicaUsada = false;
        atualizarPontuacao();
    }

    function checarResposta(resposta) {
        const pergunta = perguntas[perguntaAtualIndex];
        let acertou = false;

        opcoesBotoes.forEach(botao => {
            if (botao.textContent === pergunta.respostaCorreta) {
                botao.classList.add('correta');
            } else {
                botao.classList.add('incorreta');
            }
            botao.disabled = true;
        });

        if (resposta === pergunta.respostaCorreta) {
            pontuacao += 100;
            somAcerto.play();
            exibirFeedback(infoFeedbackAcerto);
            acertou = true;
        } else {
            somErro.play();
            exibirFeedback(infoFeedbackErro);
        }

        setTimeout(() => {
            esconderModal(modalFeedback);
            
            perguntaAtualIndex++;
            if (perguntaAtualIndex < perguntas.length) {
                carregarPergunta(perguntaAtualIndex);
            } else {
                finalizarJogo();
            }
            
        }, 3000);
    }

    function eliminarOpcoesIncorretas() {
        if (usos5050Restantes <= 0) return;
        
        const pergunta = perguntas[perguntaAtualIndex];
        const opcoesIncorretas = Array.from(opcoesBotoes).filter(botao => botao.textContent !== pergunta.respostaCorreta);
        
        const aRemover = [];
        while (aRemover.length < 2) {
            const opcao = opcoesIncorretas[Math.floor(Math.random() * opcoesIncorretas.length)];
            if (!aRemover.includes(opcao)) {
                aRemover.push(opcao);
            }
        }
        
        aRemover.forEach(botao => {
            botao.disabled = true;
            botao.classList.add('eliminada');
        });
        
        usos5050Restantes--;
        
        if (usos5050Restantes <= 0) {
            botaoEliminar.classList.add('desabilitado');
        }
    }

    function exibirFeedback(feedback) {
        feedbackImg.src = feedback.img;
        feedbackNome.textContent = feedback.nome;
        feedbackTexto.textContent = feedback.texto;
        exibirModal(modalFeedback);
    }

    function finalizarJogo() {
        pontuacaoFinalElem.textContent = pontuacao;
        exibirTela(telaFinal);
        videoFinal.currentTime = 0; // Volta o vídeo para o início
        videoFinal.play(); // Inicia a reprodução do vídeo
    }

    function reiniciarJogo() {
        perguntaAtualIndex = 0;
        pontuacao = 0;
        dicaUsada = false;
        usos5050Restantes = 3;
        videoFinal.pause(); // Pausa o vídeo quando a tela final é fechada
        perguntas = embaralharArray([...perguntasOriginal]);
        exibirTela(telaInicio);
    }
    
    // Event Listeners
    botaoEntendido.addEventListener('click', () => {
        somClique.play();
        esconderModal(modalInstrucoes);
        exibirTela(telaInicio);
    });

    botaoJogar.addEventListener('click', () => {
        somClique.play();
        perguntas = embaralharArray([...perguntasOriginal]);
        exibirTela(telaPergunta);
        carregarPergunta(perguntaAtualIndex);
    });
    
    botaoReiniciar.addEventListener('click', () => {
        somClique.play();
        reiniciarJogo();
    });

    opcoesBotoes.forEach(botao => {
        botao.addEventListener('click', (e) => {
            somClique.play();
            checarResposta(e.target.textContent);
        });
    });

    botaoDica.addEventListener('click', () => {
        if (!dicaUsada) {
            somClique.play();
            dicaTexto.textContent = perguntas[perguntaAtualIndex].dica;
            // Define a imagem do personagem de dica (Ailton)
            dicaImg.src = personagemDica.img;
            exibirModal(modalDica);
            botaoDica.classList.add('desabilitado');
            dicaUsada = true;
        }
    });
    
    botaoEliminar.addEventListener('click', () => {
        if (usos5050Restantes > 0) {
            somEliminar.play();
            eliminarOpcoesIncorretas();
        }
    });

    botaoModalOk.addEventListener('click', () => {
        somClique.play();
        esconderModal(modalDica);
    });

    botaoFecharSobre.addEventListener('click', () => {
        somClique.play();
        esconderModal(modalSobre);
    });

    botoesPersonagem.forEach(personagemDiv => {
        personagemDiv.addEventListener('click', () => {
            somClique.play();
            const nomePersonagem = personagemDiv.dataset.personagem;
            const info = infoPersonagens[nomePersonagem];

            if (info) {
                sobreNome.textContent = nomePersonagem;
                sobreImg.src = info.img;
                sobreTexto.textContent = info.descricao;
                exibirModal(modalSobre);
            }
        });
    });
});