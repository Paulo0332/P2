// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos do DOM e os armazena em constantes
    const clothesForm = document.getElementById('clothesForm'); // Formulário de roupas
    const clothesList = document.getElementById('clothesList'); // Lista de roupas
    const filterName = document.getElementById('filterName'); // Campo de filtro por nome
    const filterSize = document.getElementById('filterSize'); // Campo de filtro por tamanho
    const filterMinPriceRange = document.getElementById('filterMinPriceRange'); // Campo de filtro por preço mínimo
    const filterMaxPriceRange = document.getElementById('filterMaxPriceRange'); // Campo de filtro por preço máximo
    const priceRangeValue = document.getElementById('priceRangeValue'); // Valor do intervalo de preço
    const applyFilter = document.getElementById('applyFilter'); // Botão para aplicar o filtro
    const clearListButton = document.getElementById('clearList'); // Botão para limpar a lista

    // Inicializa um array vazio para armazenar as roupas
    let clothesArray = [];

    // Listener para o input de preço mínimo, garantindo que não seja maior ou igual ao preço máximo
    filterMinPriceRange.addEventListener('input', () => {
        if (parseInt(filterMinPriceRange.value) >= parseInt(filterMaxPriceRange.value)) {
            filterMinPriceRange.value = parseInt(filterMaxPriceRange.value) - 1;
        }
        priceRangeValue.textContent = `${filterMinPriceRange.value} - ${filterMaxPriceRange.value}`;
    });

    // Listener para o input de preço máximo, garantindo que não seja menor ou igual ao preço mínimo
    filterMaxPriceRange.addEventListener('input', () => {
        if (parseInt(filterMaxPriceRange.value) <= parseInt(filterMinPriceRange.value)) {
            filterMaxPriceRange.value = parseInt(filterMinPriceRange.value) + 1;
        }
        priceRangeValue.textContent = `${filterMinPriceRange.value} - ${filterMaxPriceRange.value}`;
    });

    // Listener para o envio do formulário de roupas
    clothesForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o comportamento padrão de submissão do formulário

        // Obtém os valores dos campos do formulário
        const clothesImageInput = document.getElementById('clothesImage'); // Imagem da roupa
        const clothesName = document.getElementById('clothesName').value; // Nome da roupa
        const size = document.getElementById('size').value; // Tamanho da roupa
        const description = document.getElementById('description').value; // Descrição da roupa
        const price = parseFloat(document.getElementById('price').value); // Preço da roupa

        // Verifica se uma imagem foi carregada
        if (!clothesImageInput.files.length) {
            alert('Por favor, carregue uma imagem.'); // Alerta o usuário se nenhuma imagem foi carregada
            return;
        }

        // Usa FileReader para ler o arquivo da imagem
        const reader = new FileReader();
        reader.onload = function(e) {
            // Cria um objeto de roupa com os detalhes do formulário
            const clothesItem = {
                image: e.target.result,
                name: clothesName,
                size: size,
                description: description,
                price: price
            };
            clothesArray.push(clothesItem); // Adiciona a nova roupa ao array
            displayClothes(clothesArray); // Atualiza a lista de roupas exibida
        };

        reader.readAsDataURL(clothesImageInput.files[0]); // Lê a imagem como URL de dados
        clothesForm.reset(); // Reseta o formulário após submissão
    });

    // Listener para aplicar os filtros de busca
    applyFilter.addEventListener('click', () => {
        // Filtra as roupas no array com base nos critérios de filtro
        const filteredClothes = clothesArray.filter(item => {
            return (
                (filterName.value === '' || item.name.toLowerCase().includes(filterName.value.toLowerCase())) &&
                (filterSize.value === '' || item.size === filterSize.value) &&
                (item.price >= parseFloat(filterMinPriceRange.value) && item.price <= parseFloat(filterMaxPriceRange.value))
            );
        });
        displayClothes(filteredClothes); // Atualiza a lista de roupas exibida com os resultados filtrados
    });

    // Listener para limpar a lista de roupas
    clearListButton.addEventListener('click', () => {
        clothesArray = []; // Esvazia o array de roupas
        displayClothes(clothesArray); // Atualiza a lista de roupas exibida
    });

    // Função para exibir as roupas na lista
    function displayClothes(clothes) {
        clothesList.innerHTML = ''; // Limpa a lista atual de roupas
        clothes.forEach(item => {
            const clothesItemDiv = document.createElement('div'); // Cria um novo div para cada roupa
            clothesItemDiv.classList.add('clothes-item'); // Adiciona uma classe ao div
            clothesItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name} image">
                <h3>${item.name}</h3>
                <p>Tamanho: ${item.size}</p>
                <p>Descrição: ${item.description}</p>
                <p>Preço: $${item.price}</p>
            `; // Define o conteúdo HTML do div
            clothesList.appendChild(clothesItemDiv); // Adiciona o div à lista de roupas
        });
    }
});