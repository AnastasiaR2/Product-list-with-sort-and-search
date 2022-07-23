
  // let products = await fetch('https://fakestoreapi.com/products');
  //     products = await products.json();

  // console.log(products);
  
  // function render(item){
  //   return item.map(item => `
  
  //   <div class="card shadow">
  //     <div class="mt-4 align-self-center">
  //       <img src="${item.image}" class="card-img-top" alt="...">
  //     </div>
  //     <div class="card-body">
  //       <h5 class="card-title">${item.title}</h5>
  //       <p class="card-text">${item.description}</p>
  //     </div>
  //     <p class="text-end fs-5 fw-bold">$${item.price}</p>
  //   </div>
  
  // `).join('');
  // }
  
  // productsContainer.innerHTML = render(products);

  // flexRadioDefault1.addEventListener('click', function() {
  //   let arrIncrease = [...products];
  //   arrIncrease.sort((a,b) => a.price - b.price);
  //   productsContainer.innerHTML = render(arrIncrease);
  // })

  // flexRadioDefault2.addEventListener('click', function() {
  //   let arrDecrease = [...products];
  //   arrDecrease.sort((a,b) => b.price - a.price);
  //   console.log(arrDecrease);
  //   productsContainer.innerHTML = render(arrDecrease);
  // })


    const URL = 'https://fakestoreapi.com/products';

    let products       = document.getElementById('products-container');
    let upBtn       = document.getElementById('sort-up');
    let downBtn     = document.getElementById('sort-down');
    let searchInput = document.getElementById('search');

    const model = {
        data: null,
        searchText: '',
        sort: null, // "up" or "down" 

        doSortUp(){
            this.sort = "up";
            this.render();
        },

        doSortDown(){
            this.sort = "down";
            this.render();
        },

        doSearch(s){
            this.searchText = s;
            this.render();
        },

        async load(){
            this.data = await fetch(URL);
            this.data = await this.data.json();
            this.render();
        },

        render(){

            if(this.sort){
                if(this.sort == "up"){
                    this.data.sort((a,b) => a.price - b.price);
                }else{
                    this.data.sort((a,b) => b.price - a.price);
                }
            }

            let s = this.searchText.trim().toLowerCase();

            let searchResult = this.data.filter(item => {
              
              let range = [item.title, item.description, item.price];

              for (let elem of range){
                elem = elem.toString().toLowerCase().includes(s);
                if(elem){
                  return true;
                }
              }
            });

            products.innerHTML = searchResult.map(item => `

              <div class="card shadow">
                <div class="mt-4 align-self-center">
                  <img src="${item.image}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description}</p>
                </div>
                <p class="text-end fs-5 fw-bold">$${item.price}</p>
              </div>

            `).join('');
        }
    }

    model.load();

    upBtn.addEventListener('click', function(){
        model.doSortUp();
    });

    downBtn.addEventListener('click', function(){
        model.doSortDown();
    });

    searchInput.addEventListener('input', function(){
        model.doSearch(this.value);
    });