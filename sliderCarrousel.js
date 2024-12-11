const cardContainer = document.querySelector('.card-container');
const mobileSlider = document.querySelector('.mobile-slider');

let moving = false;
let mouseLastPosition = 0;
let transform = 0;
let lastPageX = 0;
let transformValue = 0;

// Calcula largura do slider, para ajudar no limite do slider
console.log(mobileSlider.offsetWidth);

// Evento de clique inicial para movimentar
cardContainer.addEventListener('mousedown', (e) => {
    moving = true;
    mouseLastPosition = e.pageX;
    transform = window.getComputedStyle(cardContainer)
        .getPropertyValue('transform') !== 'none'
        ? window.getComputedStyle(cardContainer)
            .getPropertyValue('transform').split(',')[4].trim() : 0;
});

// Movimento do mouse
cardContainer.addEventListener('mousemove', function (e) {
    if (moving) {
        const diffX = e.pageX - mouseLastPosition;
        if (e.pageX - lastPageX > 0) {
            if (transformValue > 0) {
                return;
            }
        } else {
            if (Math.abs(transformValue) > cardContainer.offsetWidth - mobileSlider.offsetWidth) {
                return;
            }
        }
        transformValue = parseInt(transform) + diffX;
        cardContainer.style.transform = `translateX(${transformValue}px)`;
    }
    lastPageX = e.pageX;
});

// Solta o clique do mouse
cardContainer.addEventListener('mouseup', function () {
    moving = false;
});

// Adiciona suporte para dispositivos móveis
cardContainer.addEventListener('touchstart', (e) => {
    moving = true;
    mouseLastPosition = e.touches[0].pageX;
    transform = window.getComputedStyle(cardContainer)
        .getPropertyValue('transform') !== 'none'
        ? window.getComputedStyle(cardContainer)
            .getPropertyValue('transform').split(',')[4].trim() : 0;
});

cardContainer.addEventListener('touchmove', function (e) {
    if (moving) {
        const diffX = e.touches[0].pageX - mouseLastPosition;
        if (e.touches[0].pageX - lastPageX > 0) {
            if (transformValue > 0) {
                return;
            }
        } else {
            if (Math.abs(transformValue) > cardContainer.offsetWidth - mobileSlider.offsetWidth) {
                return;
            }
        }
        transformValue = parseInt(transform) + diffX;
        cardContainer.style.transform = `translateX(${transformValue}px)`;
    }
    lastPageX = e.touches[0].pageX;
});

cardContainer.addEventListener('touchend', function () {
    moving = false;
});

// Evento para rolar horizontalmente com a rolagem do mouse
cardContainer.addEventListener('wheel', function (e) {
    e.preventDefault(); // Previne o scroll padrão da página

    const deltaX = e.deltaY || e.detail || e.wheelDelta; // Captura o movimento vertical

    // Atualiza o valor do transform de acordo com o movimento do scroll
    if (deltaX > 0) {
        // Rolagem para baixo/direita
        if (Math.abs(transformValue) < cardContainer.offsetWidth - mobileSlider.offsetWidth) {
            transformValue -= 20; // Ajuste o valor para a sensibilidade
        }
    } else {
        // Rolagem para cima/esquerda
        if (transformValue < 0) {
            transformValue += 20; // Ajuste o valor para a sensibilidade
        }
    }

    // Aplica o movimento ao contêiner
    cardContainer.style.transform = `translateX(${transformValue}px)`;
});
