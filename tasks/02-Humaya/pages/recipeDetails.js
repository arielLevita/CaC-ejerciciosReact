const detailsContainer = document.getElementById("recipe-details");

async function getData() {
    try {
        const response = await fetch('https://sazonapi.hymsoft.repl.co/api/v1/recipies');
        const data = await response.json();
        let recipes = data.data;
        const queryString = location.search;
        const params = new URLSearchParams(queryString);
        const detailId = params.get('id');
        const recipe = recipes.find(recipe => recipe.id == detailId);
        
        detailsGenerator(recipe, detailsContainer);
    }
    catch(error) {
        console.log(error);
    }
}
getData();

function detailsGenerator(recipe, detailsContainer) {
    let div = document.createElement("div");
    div.classList.add('text-gold');
    div.innerHTML =`
        <div class="p-0 ratio ratio-16x9 overflow-hidden">
            <img loading="lazy" src=${recipe.imagen} alt="${recipe.nombre}" class="img-fluid">
        </div>
        <div>
            <h3 class="text-center p-3">${recipe.nombre}</h3>
            <p>${recipe.descripcion_tipo}</p>
            <h5>Ingredientes</h5>
            <ul>
                ${recipe.ingredientes.map((ingrediente) => (`<li>${ingrediente.cantidad} - ${ingrediente.nombre}</li>`)).join('')}
            </ul>
            <h5>Instrucciones:</span></h5>
            <p>${recipe.instrucciones}</p>
            <p>Tiempo de cocción: ${recipe.tiempo_coccion}</p>
            <p>Dificultad: ${recipe.nivel_dificultad}</p>
        </div>`;
    detailsContainer.appendChild(div)
}