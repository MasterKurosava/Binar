let btnLess  = document.getElementById('btnLess'),
    btnEqual = document.getElementById('btnEqual'),
    btnMore  = document.getElementById('btnOver'),
    answer   = document.getElementById('answerField'),
    btnRetry = document.getElementById('btnRetry'),
    btnInter = document.getElementById('btnInter'),
    firstContent= document.getElementById('firstContent'),
    lastContent = document.getElementById('lastContent')
    inputMin = document.getElementById('inputMin'),
    inputMax = document.getElementById('inputMax');
let min,max,firstHtml,lastHtml;
//проверяем значения и запускаем поиск
btnInter.addEventListener('click',function(){
    min= parseInt(inputMin.value);
    max= parseInt(inputMax.value);
    if((typeof(min)=='number') && typeof(max=='number') && (min<=max)){
        (min<-999) ? inputMin.value=999 : inputMin.value=min;
        (max>999)  ? inputMax.value=999 : inputMax.value=max;
        min= parseInt(inputMin.value)
        max= parseInt(inputMax.value)
        if(inputMin.value!='' && inputMax.value!=''){
            BinarSearch();
            btnInter.removeEventListener('click',function(){});
        }
    }else{
            answer.textContent='Ошибка';
        }
    })
//создаем фразы для ответа
function changeWordEqual(num){
    let phrase=Math.ceil(Math.random()*4)
    switch(phrase){
        case 1:answer.textContent=`Так это ${num}!`;
        break;
        case 2:answer.textContent=`Это ${num}!`;
        break;
        case 3:answer.textContent=`Теперь ясно что это ${num}!`;
        break;
        case 4:answer.textContent=`Я угадал! Это ${num}!`;
        break;
    }
    
}
//создаем фразы для предположений
function changeWord(num){
    let phrase=Math.ceil(Math.random()*4)
    switch(phrase){
        case 1:answer.textContent=`Уверен что это ${num}?`;
        break;
        case 2:answer.textContent=`А может быть ${num}?`;
        break;
        case 3:answer.textContent=`Мне кажется это ${num}`;
        break;
        case 4:answer.textContent=`Ваше число ${num}?`;
        break;
    }
    
}
//цифры в буквы
function humanize(num){
    let ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять',
                'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестьнадцать',
                'семьнадцать', 'восемнадцать', 'девятнадцать'];
    let tens = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят',
                'девяносто'];
    let numString = num.toString();
    //если отрицательное число
    if (num < 0){
        numString = num.toString().substr(1)
        num=Math.abs(num)
        if (num < (20)) {
            changeWord('минус '+ones[num])
        }
        else if(numString.length == 2) {
            changeWord('минус '+tens[numString[0]] + ' ' + ones[numString[1]])
        }
    }else{//если плюс-
        if (num === 0) return 'ноль';
    
        //от 1 до 20
        else if (num < 20) {
            changeWord(ones[num])
        }
        else if(numString.length === 2) {
            changeWord(tens[numString[0]] + ' ' + ones[numString[1]])
        }
    }
}
//находим бинарным поиском число
function BinarSearch() {
    let middle = Math.ceil((min + max) / 2);
    (middle>-100 && middle<100)? humanize(middle) : changeWord(middle);
    
    
    //нашли число
    btnEqual.addEventListener('click', () => changeWordEqual(middle));
     //число меньше
    btnLess.addEventListener('click', function(){
        max=middle;
        middle=Math.ceil((min+max)/2);
        (middle>-100 && middle<100)? humanize(middle) : changeWord(middle);
        
    });
     //нашли больше
    btnMore.addEventListener('click',function(){
        min=middle;
        middle=Math.ceil((min+max)/2);
        (middle>-100 && middle<100)? humanize(middle) : changeWord(middle) ; 
    })
};
//кнопка повторения
btnRetry.addEventListener('click', function () {
    min,max=undefined;
    inputMin.value='', inputMax.value='', answer.textContent='Введите числа';
})