const data = [
    {
        order: 1,
        question: 'Выберите типы переменных в JavaScript?',
        answers: [{
                title: 'String',
                type: 'checkbox'
            },
            {
                title: 'Array',
                type: 'checkbox'
            },
            {
                title: 'Null',
                type: 'checkbox'
            },
            {
                title: 'BigInt',
                type: 'checkbox'
            },
        ],
        answer: ['String', 'Null', 'BigInt']
    },
    {
        order: 2,
        question: 'Выберите семантический тег?',
        answers: [{
                title: 'div',
                type: 'radio'
            },
            {
                title: 'span',
                type: 'radio'
            },
            {
                title: 'section',
                type: 'radio'
            },
            {
                title: 'p',
                type: 'radio'
            },
        ],
        answer: ['section']
    },
    {
        order: 3,
        question: 'Что делает метод flat в JavaScript?',
        answers: [{
                title: 'Проходит по элементам массива',
                type: 'radio'
            },
            {
                title: 'Поднимает элементы массива на нужный уровень',
                type: 'radio'
            },
            {
                title: 'Удаляет элемент массива',
                type: 'radio'
            },
            {
                title: 'Копирует элемент массива',
                type: 'radio'
            },
        ],
        answer: ['Поднимает элементы массива на нужный уровень']
    },
    {
        order: 4,
        question: 'Методы массивов?',
        answers: [{
                title: 'Map',
                type: 'checkbox'
            },
            {
                title: 'reduce',
                type: 'checkbox'
            },
            {
                title: 'map',
                type: 'checkbox'
            },
            {
                title: 'Date',
                type: 'checkbox'
            },
        ],
        answer: ['reduce', 'map']
    },
];


const getInfo = () =>{
    alert(quiz.mark);
    document.body.textContent = '';
}

const quiz = new Quiz({
    wrapper: '.container',
    data: data,
    ball: 10,
    time: 1,
    callback: getInfo
});

