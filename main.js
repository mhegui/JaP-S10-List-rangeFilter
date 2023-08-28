const URL = "https://fakestoreapi.com/products";
const info = document.getElementById("info"); 
let arregloList = [];
let minCost = undefined;
let maxCost = undefined;
let botonFiltrado;

function getDataAPI(){
    fetch(URL)
    .then(response => response.json())
    .then(result => {
        debugger;
        arregloList = result;
        showList();
    })
    .catch(error => {
    console.error('Error en la solicitud:', error);
      });
}

function showList(){

    //Si se hizo clic en boton filtrado, se inserta un div vacio para limpiar el contenedor
        if(botonFiltrado === true){
            const productCard = `
            <div class="row list-group-item d-flex justify-content-start"></div>`;
            info.innerHTML = productCard;
        }

        //Se recorre el arreglo que tiene los datos a mostrar
        arregloList.forEach(value => {

          let productCard = "";

          //Si existe mincost o maxcost se filtra dentro de este rango
          if (((minCost == undefined) || (minCost != undefined && parseInt(value.price) >= minCost)) &&
              ((maxCost == undefined) || (maxCost != undefined && parseInt(value.price) <= maxCost))){
                console.log("ingreso");
                productCard = `
                  <div class="row list-group-item d-flex justify-content-start">
                      <h3>${value.title}</h3>
                      <p>USD ${value.price}</p>
                  </div>`;
        } 
        //Se inserta en el contenedor html
        info.innerHTML += productCard;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // Fetch a URL y organizamos la info obtenida del JSON en un listado

    //Llamado a la funcion que consulta la API
    getDataAPI();

    //Si se hace clic en boton limpiar, se vacian los campos mincount y maxcount
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
  
        //Se marca indefinida estas dos variables
        minCost = undefined;
        maxCost = undefined;

        //se llama a la funcion que inserta los datos en el contenedor
        showList();
    });

    

     //Filtado por precio
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio

        botonFiltrado = true; //Se guarda que se hizo clic en el boton
  
        //Se toma los datos de ambos campos filtro precio
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;
  
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }
  
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }
        
        //se llama a la funcion que inserta los datos en el contenedor
        showList();
    });

});