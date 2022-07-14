export function render(data) {
    const container = document.createElement('div');
    container.classList.add(
        'container',
        'd-flex',
        'justify-content-between',
        'flex-wrap',
        'py-4'
    )
    for (const product of data) {
        // создаем элементы
        const productCard = document.createElement('div');
        const image = document.createElement('img');
        const cardBody = document.createElement('div');
        const title = document.createElement('h5');
        const price = document.createElement('p');
        const detailsButton = document.createElement('a') ;

        // настраиваем стили
        productCard.style.width = '18%';
        productCard.classList.add('card', 'my-2');
        image.classList.add('card-img-top');
        cardBody.classList.add('card-body');
        title.classList.add('card-text');
        detailsButton.classList.add('btn', 'btn-primary');

        // вкладываем элементы
        productCard.append(image)
        productCard.append(cardBody)
        cardBody.append(title)
        cardBody.append(price)
        cardBody.append(detailsButton)

        // наполняем элементы
        image.alt = product.id;
        title.textContent = product.name
        price.textContent = product.email
        detailsButton.textContent = 'Подробнее' 

        container.append(productCard)
    }

    return container;
}
