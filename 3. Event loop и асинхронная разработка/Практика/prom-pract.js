// https://gorest.co.in/

// предотвращаем повторную загрузку стилей
const cssPromises = {};

//функция вернет промис
function loadResourse(src) {
    // из модуля
    if (src.endsWith('.js')) {
        // вернет Promise, когда браузер загрузит файл
        // динамичекий импорт
        return import(src);
    }
    console.log('1')
    // CSS файл
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = src
            // вернет Promise, когда браузер загрузит файл
            cssPromises[src] =  new Promise(resolve => {
            // привязываемся к загрузке
            link.addEventListener('load', () => resolve());
            });     
            document.body.append(link)       
        }
        return cssPromises[src];
    }
    // данные сервера 
   
    return fetch(src)
        .then(response => response.json())

}


/*
loadResourse('./test.js')
loadResourse('https://gorest.co.in/public/v2/todos')

Чтобы работать с сзагруженными модулями, нужно основной файл назвать index.html
и в папке с файлами запустить npm server через баш-строку 
Если не установлен, сначала npm i -g serve 

*/

// загружаем пакетно все, что надо

const appContainer = document.getElementById('app')

/*
location хранит в себе все, что в адресной строке после домена
location.search покажет все, что после знака ?
*/
const searchParams = new URLSearchParams(location.search)
const productId = searchParams.get('productId')

if (productId) {
    // загрузка детальной страницы товара начиная с минуты 23
} else {
    Promise.all([
        './product-list.js', 
        'https://gorest.co.in/public/v2/users',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    ].map(src => loadResourse(src))).then(([pageModule, data]) => {
        appContainer.innerHTML = ''
        appContainer.append(pageModule.render(data));
    });
}
// далее надо проделать то же самое для детальной страницы товара
// если в get параметрах есть product-id? елси нет - показываем общий список товаров
