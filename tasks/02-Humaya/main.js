const carouselInner = document.querySelector('.carousel-inner');


async function getRecipes() {
    try {
        const response = await fetch('https://sazonapi.hymsoft.repl.co/api/v1/recipies');
        const data = await response.json();
        recipes = data.data;

        recipesCarouselGenerator(recipes, carouselInner);
        return recipes;
    } catch (error) {
        console.log(error);
    }
}

getRecipes();


function recipesCarouselGenerator(recipes, container) {

    const slidesNeeded = Math.ceil(recipes.length / 3);

    for (let i = 0; i < slidesNeeded; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        const row = document.createElement('div');
        row.classList.add('row', 'p-5', 'mx-0');

        for (let j = i * 3; j < (i + 1) * 3 && j < recipes.length; j++) {
            const col = document.createElement('div');
            col.classList.add('col');

            const card = document.createElement('div');
            card.classList.add('card');

            const recipe = recipes[j];
            card.innerHTML = `
                <div class="p-0 ratio ratio-16x9 overflow-hidden">
                    <img loading="lazy" src=${recipe.imagen} alt="${recipe.nombre}" class="img-fluid w-100">
                </div>
                <div class="d-flex flex-column justify-content-between align-items-center flex-grow-1 text-light bg-gold p-2">
                    <div>
                        <h4 class="text-uppercase text-center text-brown my-2">${recipe.nombre}</h4>
                        <p class="px-3 my-1">${recipe.descripcion_tipo}</p>
                    </div>
                    <a href="./pages/recipeDetails.html?id=${recipe.id}"><button class="btn-brown text-uppercase fw-semibold my-3 px-3 py-1 align-self-center">preparación</button></a>
                </div>
            `;

            col.appendChild(card);
            row.appendChild(col);
        }

        carouselItem.appendChild(row);
        if (i === 0) {
            carouselItem.classList.add('active');
        }

        container.appendChild(carouselItem);
    }

}