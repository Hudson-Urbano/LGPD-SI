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
    const botaoFecharSobre = document.getElementById('botao-fechar-sobre');

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

    // CORRIGIDO: Adicionado ../audio/
    const somAcerto = new Audio('../audio/sucesso.mp3');
    const somErro = new Audio('../audio/falha.mp3');
    const somClique = new Audio('../audio/clique.mp3');
    const somEliminar = new Audio('../audio/eliminar.mp3');

    const perguntasOriginal = [
    {
        pergunta: "A LGPD surgiu para:",
        opcoes: [
            "Regular o uso de todos os tipos de dados apenas pelas empresas.",
            "Proteger os dados pessoais e garantir direitos aos cidadãos. ",
            "Restringir o uso de tecnologia em empresas.",
            "Estabelecer regras apenas para órgãos públicos."
        ],
        respostaCorreta: "Proteger os dados pessoais e garantir direitos aos cidadãos. ",
        dica: "Ela garante direitos de privacidade e proteção das pessoas.",
    },
    {
        pergunta: "Qual destes é um exemplo de dado sensível pela LGPD?",
        opcoes: [
            "Origem racial ou étnica.",
            "Endereço residencial.",
            "CPF.",
            "Nome completo."
        ],
        respostaCorreta: "Origem racial ou étnica.",
        dica: "É um dado que pode gerar discriminação se divulgado.",
    },
    {
        pergunta: "Qual órgão fiscaliza e pode aplicar multas em caso de descumprimento da LGPD?",
        opcoes: [
            "Receita Federal.",
            "ANPD – Autoridade Nacional de Proteção de Dados.",
            "Banco Central.",
            "Ministério da Economia."
        ],
        respostaCorreta: "ANPD – Autoridade Nacional de Proteção de Dados.",
        dica: "É uma autoridade criada especificamente para cuidar de dados pessoais.",
    },
    {
        pergunta: "Imagine: um colaborador tira uma selfie com a tela do computador aberta e posta nas redes sociais. Qual o risco?",
        opcoes: [
            "Nenhum, pois a imagem é pessoal.",
            "Vazamento de informações de terceiros ou confidenciais da empresa.",
            "Apenas prejudicar a estética da foto.",
            "Ganhar curtidas e engajamento."
        ],
        respostaCorreta: "Vazamento de informações de terceiros ou confidenciais da empresa.",
        dica: "Pense no que pode aparecer no fundo da foto além da pessoa.",
    },
    {
        pergunta: "Se a Docket vazar dados pessoais de clientes por descuido de um colaborador, qual pode ser a consequência?",
        opcoes: [
            "Apenas uma conversa informal de advertência.",
            "Multas que podem chegar até R$ 50 milhões.",
            "Perda automática de todos os contratos.",
            "Prisão imediata do colaborador envolvido."
        ],
        respostaCorreta: "Multas que podem chegar até R$ 50 milhões.",
        dica: "A LGPD prevê punições financeiras pesadas.",
    },
    {
        pergunta: "Qual destas é uma boa prática para evitar incidentes de proteção de dados?",
        opcoes: [
            "Usar softwares não autorizados para agilizar tarefas.",
            "Conferir o destinatário antes de enviar arquivos por e-mail ou outros meios de comunicação.",
            "Compartilhar telas sem verificar o conteúdo exibido.",
            "Salvar documentos da empresa em aplicativos pessoais."
        ],
        respostaCorreta: "Conferir o destinatário antes de enviar arquivos por e-mail ou outros meios de comunicação.",
        dica: "Uma simples checagem antes de apertar 'enviar' evita muitos problemas.",
    },
    {
        pergunta: "O que é um encarregado (DPO) na LGPD?",
        opcoes: [
            "O titular dos dados.",
            "O profissional responsável por atuar como canal de comunicação entre empresa, titulares e a ANPD.",
            "O auditor interno de TI.",
            "O gestor financeiro."
        ],
        respostaCorreta: "O profissional responsável por atuar como canal de comunicação entre empresa, titulares e a ANPD.",
        dica: "Ele é como um elo entre a empresa e a Autoridade de Dados.",
    },
    
    {
        pergunta: "O que significa Confidencialidade em Segurança da Informação?",
        opcoes: [
            "Qualquer pessoa pode acessar a informação.",
            "Apenas pessoas autorizadas podem acessar a informação.",
            "A informação precisa estar sempre pública.",
            "A informação nunca deve ser compartilhada."
        ],
        respostaCorreta: "Apenas pessoas autorizadas podem acessar a informação.",
        dica: "Nem todos têm acesso, só quem tem permissão.",
    },
    {
        pergunta: "Um documento marcado como Estritamente Confidencial significa que:",
        opcoes: [
            "Pode ser enviado a qualquer colaborador sem restrição.",
            "Se vazar, pode causar grandes prejuízos à empresa.",
            "Não tem importância estratégica.",
            "É destinado ao público externo."
        ],
        respostaCorreta: "Se vazar, pode causar grandes prejuízos à empresa.",
        dica: "Se cair em mãos erradas, gera danos sérios.",
    },
    {
        pergunta: "O que NÃO é uma boa prática de senha?",
        opcoes: [
            "Usar datas de aniversário, nomes de familiares ou sequenciais.",
            "Criar senhas com letras, números e símbolos.",
            "Alterar a senha periodicamente.",
            "Não compartilhar senhas com ninguém."
        ],
        respostaCorreta: "Usar datas de aniversário, nomes de familiares ou sequenciais.",
        dica: "Evite senhas fáceis de adivinhar.",
    },
    {
        pergunta: "Antes de instalar softwares no computador da empresa, é importante:",
        opcoes: [
            "Instalar apenas os que encontrar na internet.",
            "Usar somente softwares homologados pelo TI.",
            "Pedir a senha de administrador para colegas.",
            "Ignorar atualizações de segurança."
        ],
        respostaCorreta: "Usar somente softwares homologados pelo TI.",
        dica: "O time de TI precisa validar o que pode ser instalado.",
    },
    {
        pergunta: "Qual dessas situações representa um risco de segurança digital?",
        opcoes: [
            "Bloquear a tela do computador ao sair da mesa.",
            "Compartilhar foto do escritório com telas abertas ao fundo.",
            "Guardar documentos em gavetas com chave.",
            "Usar biometria para acessar o prédio."
        ],
        respostaCorreta: "Compartilhar foto do escritório com telas abertas ao fundo. ",
        dica: "Cuidado com o que pode aparecer sem querer em fotos.",
    },
    {
        pergunta: "Qual cuidado devemos ter com equipamentos de trabalho?",
        opcoes: [
            "Levar líquidos para perto do computador.",
            "Transportar o notebook com cuidado na mochila da Docket.",
            "Comer sobre o teclado.",
            "Deixar o computador sempre aberto."
        ],
        respostaCorreta: "Transportar o notebook com cuidado na mochila da Docket.",
        dica: "O equipamento deve ser tratado como ferramenta de valor.",
    },
    {
        pergunta: "O que é phishing?",
        opcoes: [
            "Um método de criptografia avançada.",
            "Um tipo de ataque que engana o usuário para obter informações confidenciais.",
            "Um software de backup de dados.",
            "Uma técnica de autenticação segura."
        ],
        respostaCorreta: "Um tipo de ataque que engana o usuário para obter informações confidenciais.",
        dica: "Normalmente chega por e-mail, fingindo ser algo confiável.",
    },
];
    let perguntas = [];
    
    const apresentadores = [
        { nome: "Amanda", img: "../images/Amanda.png" },
        { nome: "Neuri", img: "../images/Neuri.png" }
    ];
    
    const infoFeedbackAcerto = { nome: "Hudson", img: "../images/Hudson.png", texto: "Parabéns, você acertou! Prepare-se para a próxima pergunta." };
    
    const infoFeedbackErro = { nome: "Elaine", img: "../images/Elaine.png", texto: "Continue tentando, a próxima é sua!" };
    
    const personagemDica = { nome: "Ailton", img: "../images/Ailton.png" };
    
    const infoPersonagens = {
        Amanda: {
            img: "../images/Amanda.png",
            descricao: "Amanda é a host do show de dados. Ela é especialista em governança de dados e adora compartilhar seu conhecimento de forma divertida."
        },
        Hudson: {
            img: "../images/Hudson.png",
            descricao: "Hudson trabalha na área de dados. Sua paixão é a análise e visualização de dados, transformando números brutos em insights valiosos."
        },
        Ailton: {
            img: "../images/Ailton.png",
            descricao: "Ailton é do time de engenharia de dados. Ele constrói a infraestrutura para que os dados sejam coletados, processados e armazenados de forma eficiente."
        },
        Elaine: {
            img: "../images/Elaine.png",
            descricao: "Elaine é a nossa cientista de dados. Ela usa modelos estatísticos e aprendizado de máquina para prever tendências e resolver problemas complexos."
        },
        Neuri: {
            img: "../images/Neuri.png",
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
        perguntaAtualIndex = 0;
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