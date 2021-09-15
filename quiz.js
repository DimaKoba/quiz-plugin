class Quiz {
    constructor(options) {
        this.wrapper = document.querySelector(options.wrapper); //обёртка
        this.data = options.data; //массив вопросов
        this.dataLength = this.data.length; //количество вопросов
        this.countQuestion = 0;
        this.currentQuestion = {};
        this.resultArray = [];
        this.ball = options.ball || 10;
        this.time = (options.time * 60) || '';
        this.formattedTime = this.getTime(this.time);
        this.callback = options.callback;
        this.mark = null;
        this.init();
    }

    init(){
        if(this.time > 1800){
            throw new Error('Maximum test time 30 minutes');
        }
        this.createQuiz(this.data[0]);
        this.events();

        if(this.time){
            let timer = setInterval(() =>{
                this.setTime();
            }, 1000);
            setTimeout(() =>{
               clearInterval(timer);
               this.end(); 
            }, this.time * 1000)
        }
    }

    events(){
        this.wrapper.addEventListener('click', (e)=>{
           if(e.target.tagName === 'BUTTON'){
              const selectItems = Array.from(this.wrapper.querySelectorAll('input:checked')).map(item=> item.value);
              if(selectItems.length){
                  let result = selectItems.map(item => this.currentQuestion.answer.includes(item));
                  let currentBallQuestion = this.ball / this.dataLength;
                  if(result.length === this.currentQuestion.answer.length && !result.includes(false)){
                    this.resultArray.push(currentBallQuestion);
                  }
                this.getNewQuestion();
              }
           }

        });

        this.wrapper.addEventListener('change', (e)=>{
            if(e.target.tagName === 'INPUT'){
                const selectItems = this.wrapper.querySelectorAll('input:checked').length;
                if(selectItems){
                    this.wrapper.querySelector('.btn').classList.remove('disactive');
                    this.wrapper.querySelector('.btn').classList.add('active');
                }else{
                    this.wrapper.querySelector('.btn').classList.remove('active');
                    this.wrapper.querySelector('.btn').classList.add('disactive');
                }
            }
        });
    }

    setTime(){
        const timeBlock = this.wrapper.querySelector('.quiz__time');
        if (this.time > 0 && timeBlock) {
            let current = --this.time;
            this.formattedTime = this.getTime(current);
            timeBlock.textContent = `Осталось: ${this.getTime(current)}`;
        }
    }

    getTime(time){
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return [
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    }

    end(){
        let result = this.resultArray.reduce((acc, item) => acc + item, 0).toFixed(2);
        let count = this.resultArray.length;
        this.mark = result;
        this.wrapper.innerHTML = `
            <div class="quiz">
                <h3 class="quiz__title">Тест завершен</h3>
                <span class="result">Баллов: ${result}</span>
                <div class="quiz__count">Правильных ответов ${count} из ${this.dataLength}</div>
                <div class="quiz__buttons">
                    <button class="btn active close">Закрыть тест</button>
                </div>
            </div>
        `;

        this.wrapper.addEventListener('click', this.callback);
    }

    getNewQuestion(){
       this.countQuestion++;
       if( this.dataLength <= this.countQuestion){
           this.end();
           return;
       }
       this.createQuiz(this.data[this.countQuestion]);
    }

    createQuiz(currentData){

        this.currentQuestion = currentData;

        const quiz = `
        <div class="quiz">
        ${this.time && `<div class="quiz__time">Осталось: ${this.formattedTime}</div>`}
        <h3 class="quiz__title">${currentData.question}</h3>
        <div class="quiz__questions">
            ${currentData.answers.map(item =>
                `<div class="quiz__question">
                    <label>
                        <input 
                            type=${item.type} 
                            name=${currentData.order}
                            value="${item.title}"
                        />
                        <span
                            class=${item.type === 'radio' ? 'radio' : 'checkbox'}
                        >
                            ${item.title}
                        </span>
                    </label>
                </div>`
            ).join('')}       
        </div>
        <div class="quiz__count">Вопрос ${currentData.order} из ${this.dataLength}</div>
        <div class="quiz__buttons">
            <button class="btn disactive">
                ${this.countQuestion + 1 >= this.dataLength ? 'Завершить тест' : 'Следующий'}
            </button>
        </div>
        </div>
        `;

        this.wrapper.innerHTML = quiz;
    }
}




