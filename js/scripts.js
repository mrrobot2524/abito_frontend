const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-box input');
const cardWrapper = document.querySelector('.content-main__list');
const viewProduct = document.querySelector('.content-product___left');
const viewProductPrice = document.querySelector('.content-product___right');

async function getData() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/product/');

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    const data = await res.json();

    console.log('Данные получены:', data);
    return data; // возвращаем данные наружу

  } catch (error) {
    console.error('Произошла ошибка при получении данных:', error.message);
    return null; // важно вернуть что-то, чтобы избежать undefined
  }
}

const products = await getData();




const render = (cardList) => {
    cardWrapper.innerHTML = '';
    cardList.forEach((item, index) => {
        cardWrapper.insertAdjacentHTML('beforeend',
            `
                <a href="./product.html" class="content-main__list-item">
                    <div class="content-main__list-item--img">
                        <img src="${item.img}" alt="card-img">
                    </div>
                    <h5 class="content-main__list-item--title">
                        ${item.title}
                    </h5>
                    <strong class="content-main__list-item--price">${item.price} ₽</strong>
                    <div class="content-main__list-item--desc-box">
                        <span class="content-main__list-item--desc">${item.address}</span>
                        <span class="content-main__list-item--desc">${item.date}</span>
                    </div>
                </a>
            `
        ); 
    });
}

const filteredArray = (array, value)=>{
    console.log(array);
    console.log(value);
    return array.filter((item) => {
        return item.title.toLowerCase().includes(value.toLowerCase()) || item.price.includes(value) || item.address.toLowerCase().includes(value.toLowerCase());
    });
}

render(products);

searchBtn.addEventListener('click', () =>{
    render(filteredArray(products, searchInput.value));
});

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const result = filteredArray(products,value);
    render(result);
})