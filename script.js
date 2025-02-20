let btc = 0;
let btcPorClique = 1;
let btcPorSegundo = 0;

document.addEventListener("DOMContentLoaded", () => {
    const menuDiv = document.querySelector(".menu-container");
    const gameDiv = document.querySelector(".game-container");
    const novoJogoBtn = document.getElementById("novo-jogo-btn");
    const continuarJogoBtn = document.getElementById("continuar-jogo-btn");
    const upgradeMenu = document.getElementById("upgrade-menu");
    const openUpgradeBtn = document.getElementById("open-upgrade-menu");
    const closeUpgradeBtn = document.querySelector(".close-btn");
    const upgradeList = document.getElementById("upgrade-list");

    // Função para mostrar a tela do jogo e esconder o menu
    function mostrarJogo() {
        menuDiv.style.display = "none";
        gameDiv.style.display = "block";
        document.body.style.backgroundImage = "url('Porao.gif')";
    }

    // Função para mostrar o menu e esconder o jogo
    function mostrarMenu() {
        menuDiv.style.display = "block";
        gameDiv.style.display = "none";
        
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
    function inicializarJogo() {
        // Função para salvar o progresso
        function salvarProgresso() {
            localStorage.setItem('btc', btc.toString());
            localStorage.setItem('btcPorClique', btcPorClique.toString());
            localStorage.setItem('btcPorSegundo', btcPorSegundo.toString());
        }

        // Função para carregar o progresso
        function carregarProgresso() {
            let btc = localStorage.getItem('btc');
            let btcPorClique = localStorage.getItem('btcPorClique');
            let btcPorSegundo = localStorage.getItem('btcPorSegundo');

            return {
                btc: btc ? parseFloat(btc) : 0,
                btcPorClique: btcPorClique ? parseInt(btcPorClique) : 1,
                btcPorSegundo: btcPorSegundo ? parseInt(btcPorSegundo) : 0
            };
        }

        let { btc, btcPorClique, btcPorSegundo } = carregarProgresso();

        const btcDisplay = document.getElementById("btc");
        const hackearBtn = document.getElementById("hackear");
        const upgradeCliqueBtn = document.getElementById("upgrade-clique");
        const upgradeAutoBtn = document.getElementById("upgrade-auto");

        function atualizarDisplay() {
            btcDisplay.innerText = `BTC: ${btc}`;
        }

        hackearBtn.addEventListener("click", () => {
            btc += btcPorClique;
            atualizarDisplay();
            salvarProgresso(btc, btcPorClique, btcPorSegundo);
        });

        upgradeCliqueBtn.addEventListener("click", () => {
            if (btc >= 10) {
                btc -= 10;
                btcPorClique += 1;
                atualizarDisplay();
                salvarProgresso(btc, btcPorClique, btcPorSegundo);
            }
        });

        upgradeAutoBtn.addEventListener("click", () => {
            if (btc >= 50) {
                btc -= 50;
                btcPorSegundo += 1;
                atualizarDisplay();
                salvarProgresso(btc, btcPorClique, btcPorSegundo);
            }
        });

        setInterval(() => {
            btc += btcPorSegundo;
            atualizarDisplay();
            salvarProgresso(btc, btcPorClique, btcPorSegundo);
        }, 1000);

        atualizarDisplay();
    }

    mostrarMenu();  // Exibe o menu quando a página é carregada
});

let upgrades = [
        { nome: "Melhor CPU", preco: 10, efeito: () => btcPorClique += 1 },
        { nome: "Hack Automático", preco: 50, efeito: () => btcPorSegundo += 1 },
        { nome: "Proxy Rápido", preco: 100, efeito: () => btcPorClique += 2 }
    ];

    function atualizarLoja() {
        upgradeList.innerHTML = "";
        upgrades.forEach((upgrade, index) => {
            let item = document.createElement("li");
            item.innerHTML = `${upgrade.nome} - ${upgrade.preco} BTC 
                <button onclick="comprarUpgrade(${index})">Comprar</button>`;
            upgradeList.appendChild(item);
        });
    }

    window.comprarUpgrade = (index) => {
        if (btc >= upgrades[index].preco) {
            btc -= upgrades[index].preco;
            upgrades[index].efeito();
            upgrades[index].preco = Math.ceil(upgrades[index].preco * 1.05); // Aumento de 5%
            atualizarLoja();
            salvarProgresso(btc, btcPorClique, btcPorSegundo);
        }
    };

    openUpgradeBtn.addEventListener("click", () => {
        upgradeMenu.classList.remove("hidden");
        atualizarLoja();
    });

    closeUpgradeBtn.addEventListener("click", () => {
        upgradeMenu.classList.add("hidden");
    });
});
