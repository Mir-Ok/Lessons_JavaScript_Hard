// получим доступ к форме
const form = document.getElementById("user-create-form");
const formError = document.getElementById("user-create-form-error")

// вынесем в отдельную ункцию обращение к пользователю
async function createUser(data) {
    
    // массив для ошибок
    const errors = [];

    // проверка мейла
    if (!data.email) 
        errors.push({
            name: 'email',
            message: 'Мейл обязателен для заполнения'
    });
    else if (!data.email.includes('@') || !data.email.includes('.'))
        errors.push({
            name: 'email',
            message: 'Мейл имеет неверный формат'        
    })
    // проверка имени
    if (!data.name.trim()) 
        errors.push({
            name: 'name',
            message: 'Имя обязательно для заполнения'        
    })
    // проверка статуса
    if (!data.status) 
        errors.push({
            name: 'status',
            message: 'Статус обязательно для заполнения'        
    })
    // проверка гендера
    if (!data.gender) 
        errors.push({
            name: 'gender',
            message: 'Пол обязательно для заполнения'        
    })
    
    if (errors.length) {
        const err = new TypeError();
        err.errorMessages = errors;
        throw err;
    }


    // повесим отправку формы по клику на кнопку
    const responce = await fetch('https://gorest.co.in/public-api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'origin, content-type, accept',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer 586e7da33d6716bee7addc1f0c5eb13219487dc30a5ddbde67fd4be65dd2ce8b'
        },
    }).then(res => res.json());

    if (responce.code === 200 || responce.code === 201) {
        return responce.data;
    }

    if (responce.data) {
        const err = new TypeError();
        err.errorMessages = responce.data.map(err => ({
            name : err.field,
            message: err.message
        }));
        throw err;
    }

    throw new Error('Не удалось создать пользователя')
}

// повесим обработчик событий
form.addEventListener('submit', async (e) => {
    // запретим перезагрузку страницы при отправке формы
    e.preventDefault();
    const data = {};
    const inputs = {};
    const spinner = form.querySelector('button .spinner-border');

    for (let i = 0; i < form.elements.length; ++i) {
        const input = form.elements[i];
        if (!input.name) continue;
        data[input.name] = input.value;
        inputs[input.name] = input;
        input.classList.remove('is-invalid');
    }

    formError.textContent = ''

    try {
        spinner.style.display = '';
        await createUser(data);
    } catch (err) {
        if (err.name !== 'TypeError') throw err;
        if (err.errorMessages) {
            for (const errorMessage of err.errorMessages) {
                inputs[errorMessage.name].classList.add('is-invalid')
            }
            formError.textContent = err
            .errorMessages.map(errorMessages => errorMessages.message)
            .join('.');
        } 
    } finally {
        spinner.style.display = 'none';
    }
        
})
