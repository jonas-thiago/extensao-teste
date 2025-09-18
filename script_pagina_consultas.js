// Estado da aplicação
let appState = {
    paginaAtual: 'agendamento',
    formData: {
        nome: '',
        telefone: '',
        email: '',
        especialidade: '',
        data: '',
        horario: '',
        observacoes: ''
    },
    consultas: [
        {
            id: 1,
            medico: "Dr. Carlos Silva",
            especialidade: "Cardiologia",
            crm: "CRM 12345-SP",
            data: "2024-12-20",
            hora: "10:00",
            duracao: "30 min",
            local: "Posto de Saúde Central",
            endereco: "Rua da Saúde, 123 - Centro",
            sala: "Consultório 2",
            status: "confirmada",
            tipo: "Consulta de rotina",
            preparacao: ["Trazer exames anteriores", "Jejum de 12 horas"],
            telefone: "(11) 3456-7890",
            observacoes: "Check-up cardiológico anual"
        },
        {
            id: 2,
            medico: "Dra. Ana Santos",
            especialidade: "Clínica Geral",
            crm: "CRM 67890-SP",
            data: "2024-12-22",
            hora: "14:30",
            duracao: "20 min",
            local: "Posto de Saúde Central",
            endereco: "Rua da Saúde, 123 - Centro",
            sala: "Consultório 1",
            status: "agendada",
            tipo: "Primeira consulta",
            preparacao: ["Trazer documentos", "Lista de medicamentos em uso"],
            telefone: "(11) 3456-7890",
            observacoes: "Consulta para avaliação geral"
        },
        {
            id: 3,
            medico: "Dr. Pedro Oliveira",
            especialidade: "Pediatria",
            crm: "CRM 54321-SP",
            data: "2024-12-18",
            hora: "09:00",
            duracao: "25 min",
            local: "Posto de Saúde Central",
            endereco: "Rua da Saúde, 123 - Centro",
            sala: "Consultório 3",
            status: "realizada",
            tipo: "Retorno",
            preparacao: ["Carteira de vacinação"],
            telefone: "(11) 3456-7890",
            observacoes: "Acompanhamento do desenvolvimento"
        },
        {
            id: 4,
            medico: "Dra. Maria Costa",
            especialidade: "Ginecologia",
            crm: "CRM 98765-SP",
            data: "2024-12-25",
            hora: "16:00",
            duracao: "40 min",
            local: "Posto de Saúde Central",
            endereco: "Rua da Saúde, 123 - Centro",
            sala: "Consultório 4",
            status: "agendada",
            tipo: "Consulta preventiva",
            preparacao: ["Exames laboratoriais recentes"],
            telefone: "(11) 3456-7890",
            observacoes: "Consulta preventiva anual"
        }
    ],
    filtros: {
        busca: '',
        status: 'todas'
    },
    consultaSelecionada: null
};

// Utilitários
function formatarData(data) {
    const dataObj = new Date(data + 'T00:00:00');
    return dataObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getStatusColor(status) {
    const colors = {
        'confirmada': 'confirmada',
        'agendada': 'agendada',
        'realizada': 'realizada',
        'cancelada': 'cancelada'
    };
    return colors[status] || 'agendada';
}

function getStatusIcon(status) {
    const icons = {
        'confirmada': 'check-circle',
        'agendada': 'clock',
        'realizada': 'check-circle',
        'cancelada': 'x-circle'
    };
    return icons[status] || 'alert-circle';
}

function getStatusText(status) {
    const texts = {
        'confirmada': 'Confirmada',
        'agendada': 'Agendada',
        'realizada': 'Realizada',
        'cancelada': 'Cancelada'
    };
    return texts[status] || 'Agendada';
}

// Navegação entre páginas
function mostrarPagina(pagina) {
    appState.paginaAtual = pagina;
    
    const paginaAgendamento = document.getElementById('pagina-agendamento');
    const paginaConsultas = document.getElementById('pagina-consultas');
    
    if (pagina === 'agendamento') {
        paginaAgendamento.classList.remove('hidden');
        paginaConsultas.classList.add('hidden');
    } else if (pagina === 'consultas') {
        paginaAgendamento.classList.add('hidden');
        paginaConsultas.classList.remove('hidden');
        renderizarConsultas();
    }
}

// Formulário de agendamento
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());
    
    // Validação básica
    if (!dados.nome || !dados.telefone || !dados.email || !dados.especialidade || !dados.data || !dados.horario) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular envio
    alert('Agendamento solicitado com sucesso! Entraremos em contato para confirmação.');
    console.log('Dados do agendamento:', dados);
    
    // Limpar formulário
    e.target.reset();
}

// Renderização das consultas
function renderizarConsultas() {
    const consultasFiltradas = filtrarConsultas();
    const container = document.getElementById('lista-consultas');
    const semConsultas = document.getElementById('sem-consultas');
    const mensagemVazia = document.getElementById('mensagem-vazia');
    
    if (consultasFiltradas.length === 0) {
        container.classList.add('hidden');
        semConsultas.classList.remove('hidden');
        
        if (appState.filtros.busca || appState.filtros.status !== 'todas') {
            mensagemVazia.textContent = 'Tente ajustar os filtros de busca.';
        } else {
            mensagemVazia.textContent = 'Você ainda não possui consultas agendadas.';
        }
        return;
    }
    
    container.classList.remove('hidden');
    semConsultas.classList.add('hidden');
    
    container.innerHTML = consultasFiltradas.map(consulta => `
        <div class="consulta-card" onclick="abrirDetalhesConsulta(${consulta.id})">
            <div class="consulta-header">
                <div class="consulta-info">
                    <h3>${consulta.medico}</h3>
                    <p>${consulta.especialidade}</p>
                </div>
                <div class="status-badge ${getStatusColor(consulta.status)}">
                    <i data-lucide="${getStatusIcon(consulta.status)}"></i>
                    <span>${getStatusText(consulta.status)}</span>
                </div>
            </div>
            <div class="consulta-content">
                <div class="consulta-details">
                    <div class="detail-item blue">
                        <i data-lucide="calendar"></i>
                        <span>${formatarData(consulta.data)}</span>
                    </div>
                    <div class="detail-item green">
                        <i data-lucide="clock"></i>
                        <span>${consulta.hora} (${consulta.duracao})</span>
                    </div>
                    <div class="detail-item purple">
                        <i data-lucide="map-pin"></i>
                        <span>${consulta.local} - ${consulta.sala}</span>
                    </div>
                    <div class="detail-item orange">
                        <i data-lucide="stethoscope"></i>
                        <span>${consulta.tipo}</span>
                    </div>
                </div>
                ${consulta.status === 'agendada' ? `
                    <div class="consulta-actions">
                        <button class="btn btn-success" onclick="event.stopPropagation(); confirmarPresenca(${consulta.id})">
                            Confirmar
                        </button>
                        <button class="btn btn-outline" onclick="event.stopPropagation(); cancelarConsulta(${consulta.id})">
                            Cancelar
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    // Reinicializar ícones Lucide
    lucide.createIcons();
}

function filtrarConsultas() {
    return appState.consultas.filter(consulta => {
        const matchStatus = appState.filtros.status === 'todas' || consulta.status === appState.filtros.status;
        const matchBusca = consulta.medico.toLowerCase().includes(appState.filtros.busca.toLowerCase()) ||
                          consulta.especialidade.toLowerCase().includes(appState.filtros.busca.toLowerCase());
        return matchStatus && matchBusca;
    });
}

// Ações das consultas
function confirmarPresenca(id) {
    appState.consultas = appState.consultas.map(consulta => 
        consulta.id === id ? { ...consulta, status: 'confirmada' } : consulta
    );
    alert('Presença confirmada!');
    renderizarConsultas();
}

function cancelarConsulta(id) {
    if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
        appState.consultas = appState.consultas.map(consulta => 
            consulta.id === id ? { ...consulta, status: 'cancelada' } : consulta
        );
        alert('Consulta cancelada com sucesso!');
        renderizarConsultas();
        
        // Fechar modal se estiver aberto
        const modal = document.getElementById('modal-detalhes');
        if (!modal.classList.contains('hidden')) {
            fecharModal();
        }
    }
}

// Modal de detalhes
function abrirDetalhesConsulta(id) {
    const consulta = appState.consultas.find(c => c.id === id);
    if (!consulta) return;
    
    appState.consultaSelecionada = consulta;
    
    // Preencher dados do modal
    document.getElementById('modal-medico').textContent = consulta.medico;
    document.getElementById('modal-especialidade-crm').textContent = `${consulta.especialidade} • ${consulta.crm}`;
    
    // Status
    const statusBadge = document.getElementById('modal-status');
    statusBadge.className = `status-badge ${getStatusColor(consulta.status)}`;
    statusBadge.innerHTML = `
        <i data-lucide="${getStatusIcon(consulta.status)}"></i>
        <span>${getStatusText(consulta.status)}</span>
    `;
    
    // Detalhes
    document.getElementById('modal-data-formatada').textContent = formatarData(consulta.data);
    document.getElementById('modal-hora-duracao').textContent = `${consulta.hora} (${consulta.duracao})`;
    document.getElementById('modal-local').textContent = consulta.local;
    document.getElementById('modal-endereco').textContent = consulta.endereco;
    document.getElementById('modal-sala').textContent = consulta.sala;
    document.getElementById('modal-tipo').textContent = consulta.tipo;
    document.getElementById('modal-telefone').textContent = consulta.telefone;
    
    // Preparação
    const preparacaoList = document.getElementById('modal-preparacao');
    preparacaoList.innerHTML = consulta.preparacao.map(item => `
        <li>
            <i data-lucide="check-circle"></i>
            ${item}
        </li>
    `).join('');
    
    // Observações
    const observacoesContainer = document.getElementById('modal-observacoes-container');
    const observacoesText = document.getElementById('modal-observacoes');
    if (consulta.observacoes) {
        observacoesContainer.classList.remove('hidden');
        observacoesText.textContent = consulta.observacoes;
    } else {
        observacoesContainer.classList.add('hidden');
    }
    
    // Ações
    const actionsContainer = document.getElementById('modal-actions');
    if (consulta.status === 'agendada') {
        actionsContainer.classList.remove('hidden');
    } else {
        actionsContainer.classList.add('hidden');
    }
    
    // Mostrar modal
    const modal = document.getElementById('modal-detalhes');
    modal.classList.remove('hidden');
    
    // Reinicializar ícones Lucide
    lucide.createIcons();
}

function fecharModal() {
    const modal = document.getElementById('modal-detalhes');
    modal.classList.add('hidden');
    appState.consultaSelecionada = null;
}

// Event listeners
function inicializarEventListeners() {
    // Navegação
    document.getElementById('btn-minhas-consultas').addEventListener('click', () => {
        mostrarPagina('consultas');
    });
    
    // Adicionado um listener para o botão de voltar que leva para a página de agendamento
    const btnVoltar = document.getElementById('btn-voltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            mostrarPagina('agendamento');
        });
    }
    
    // Formulário
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', handleFormSubmit);
    }
    
    // Filtros
    const buscaConsultas = document.getElementById('busca-consultas');
    if (buscaConsultas) {
        buscaConsultas.addEventListener('input', (e) => {
            appState.filtros.busca = e.target.value;
            renderizarConsultas();
        });
    }
    
    const filtroStatus = document.getElementById('filtro-status');
    if (filtroStatus) {
        filtroStatus.addEventListener('change', (e) => {
            appState.filtros.status = e.target.value;
            renderizarConsultas();
        });
    }
    
    // Modal
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', fecharModal);
    }
    
    const modalDetalhes = document.getElementById('modal-detalhes');
    if (modalDetalhes) {
        modalDetalhes.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                fecharModal();
            }
        });
    }
    
    // Ações do modal
    const btnConfirmarPresenca = document.getElementById('btn-confirmar-presenca');
    if (btnConfirmarPresenca) {
        btnConfirmarPresenca.addEventListener('click', () => {
            if (appState.consultaSelecionada) {
                confirmarPresenca(appState.consultaSelecionada.id);
            }
        });
    }
    
    const btnCancelarConsulta = document.getElementById('btn-cancelar-consulta');
    if (btnCancelarConsulta) {
        btnCancelarConsulta.addEventListener('click', () => {
            if (appState.consultaSelecionada) {
                cancelarConsulta(appState.consultaSelecionada.id);
            }
        });
    }
    
    const btnReagendar = document.getElementById('btn-reagendar');
    if (btnReagendar) {
        btnReagendar.addEventListener('click', () => {
            alert('Funcionalidade de reagendamento em desenvolvimento.');
        });
    }
    
    // Configurar data mínima no formulário
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.min = hoje;
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal-detalhes');
            if (modal && !modal.classList.contains('hidden')) {
                fecharModal();
            }
        }
    });
}

// Máscara para telefone
function aplicarMascaraTelefone() {
    const telefoneInput = document.getElementById('telefone');
    if (!telefoneInput) return;
    
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
}

// Validação de email em tempo real
function aplicarValidacaoEmail() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return;
    
    emailInput.addEventListener('blur', (e) => {
        const email = e.target.value;
        const emailRegex = /^[\S+@\S+\.\S+]+$/;
        
        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = 'var(--red-500)';
            e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        } else {
            e.target.style.borderColor = '';
            e.target.style.boxShadow = '';
        }
    });
}

// Animações suaves
function aplicarAnimacoes() {
    // Observador de interseção para animações de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Aplicar animação aos cards de especialidade
    document.querySelectorAll('.specialty-card, .contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Feedback visual para ações
function aplicarFeedbackVisual() {
    // Efeito ripple nos botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adicionar CSS para ripple
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Acessibilidade
function aplicarAcessibilidade() {
    // Navegação por teclado nos cards
    document.querySelectorAll('.consulta-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Labels para screen readers
    document.querySelectorAll('input, select, textarea').forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) {
            input.setAttribute('aria-labelledby', label.id || `label-${input.id}`);
            if (!label.id) {
                label.id = `label-${input.id}`;
            }
        }
    });
}

// Inicialização
function inicializar() {
    console.log('Inicializando aplicação...');
    
    // Inicializar event listeners
    inicializarEventListeners();
    
    // Aplicar máscara de telefone
    aplicarMascaraTelefone();
    
    // Aplicar validação de email
    aplicarValidacaoEmail();
    
    // Aplicar animações
    aplicarAnimacoes();
    
    // Aplicar feedback visual
    aplicarFeedbackVisual();
    
    // Aplicar acessibilidade
    aplicarAcessibilidade();
    
    // Renderizar consultas iniciais se estiver na página de consultas
    if (appState.paginaAtual === 'consultas') {
        renderizarConsultas();
    }
    
    // Inicializar ícones Lucide
    lucide.createIcons();
    
    console.log('Aplicação inicializada com sucesso!');
}

// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', inicializar);

// Exportar funções para uso global
window.abrirDetalhesConsulta = abrirDetalhesConsulta;
window.fecharModal = fecharModal;
window.confirmarPresenca = confirmarPresenca;
window.cancelarConsulta = cancelarConsulta;
