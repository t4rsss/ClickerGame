document.addEventListener("DOMContentLoaded", () => {
    const menuDiv = document.querySelector(".menu-container");
    const gameDiv = document.querySelector(".game-container");

    const novoJogoBtn = document.getElementById("novo-jogo-btn");
    const continuarJogoBtn = document.getElementById("continuar-jogo-btn");

    const upgradeMenu = document.getElementById("upgrade-menu");
    const openUpgradeBtn = document.getElementById("open-upgrade-menu");
    const closeUpgradeBtn = document.getElementById("close-upgrade-btn");
    const upgradeList = document.getElementById("upgrade-list");

    // Função para mostrar a tela do jogo e esconder o menu
    function mostrarJogo() {
        menuDiv.style.display = "none";
        gameDiv.classList.remove("hidden");
        document.body.style.backgroundImage = "url('Porao.gif')";
    }

    // Função para mostrar o menu e esconder o jogo
    function mostrarMenu() {
        menuDiv.style.display = "block";
        gameDiv.classList.add("hidden");
    }

    // Inicia um novo jogo, apagando dados salvos
    novoJogoBtn.addEventListener("click", () => {
        localStorage.clear();  // Limpa o progresso salvo
        mostrarJogo();  // Vai para a tela do jogo
        inicializarJogo();  // Reinicia o jogo com valores padrão
    });

    // Continua o jogo, carregando os dados salvos
    continuarJogoBtn.addEventListener("click", () => {
        mostrarJogo();
        inicializarJogo();  // Carrega o jogo com o progresso salvo
    });

    // Função para inicializar o jogo

        hackearBtn.addEventListener("click", () => {
            btc += btcPorClique;
            atualizarDisplay();
            salvarProgresso();
        });

        setInterval(() => {
            btc += btcPorSegundo;
            atualizarDisplay();
            salvarProgresso();
        }, 1000);

        atualizarDisplay();
    }

    function inicializarJogo() {
        let { btc, btcPorClique, btcPorSegundo } = carregarProgresso();
        const btcDisplay = document.getElementById("btc");
        const hackearBtn = document.getElementById("hackear");

        let upgrades = [
            { nome: "Melhor CPU", preco: 10, efeito: () => btcPorClique += 1 },
            { nome: "Hack Automático", preco: 50, efeito: () => btcPorSegundo += 1 },
            { nome: "Proxy Rápido", preco: 100, efeito: () => btcPorClique += 2 }
        ];

        function atualizarDisplay() {
            btcDisplay.innerText = `BTC: ${btc.toFixed(2)}`;
        }

        function salvarProgresso() {
            localStorage.setItem('btc', btc);
            localStorage.setItem('btcPorClique', btcPorClique);
            localStorage.setItem('btcPorSegundo', btcPorSegundo);
        }

        function carregarProgresso() {
            return {
                btc: parseFloat(localStorage.getItem('btc')) || 0,
                btcPorClique: parseInt(localStorage.getItem('btcPorClique')) || 1,
                btcPorSegundo: parseInt(localStorage.getItem('btcPorSegundo')) || 0
            };
        }

        function atualizarLoja() {
        upgradeList.innerHTML = "";
        upgrades.forEach((upgrade, index) => {
            const item = document.createElement("li");
            item.innerHTML = `${upgrade.nome} - ${upgrade.preco} BTC 
                <button class="upgrade-btn" data-index="${index}">Comprar</button>`;
            upgradeList.appendChild(item);
        });

        document.querySelectorAll('.upgrade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                if (btc >= upgrades[index].preco) {
                    btc -= upgrades[index].preco;
                    upgrades[index].efeito();
                    upgrades[index].preco = Math.ceil(upgrades[index].preco * 1.05);
                    atualizarLoja();
                    atualizarDisplay();
                    salvarProgresso();
                }
            });
        });
    }

    openUpgradeBtn.addEventListener("click", () => {
        upgradeMenu.classList.remove("hidden");
        atualizarLoja();
    });

    closeUpgradeBtn.addEventListener("click", () => {
        upgradeMenu.classList.add("hidden");
    });

    upgradeMenu.classList.add("hidden");
    mostrarMenu();
});
