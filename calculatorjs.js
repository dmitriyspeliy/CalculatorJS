var number = document.querySelectorAll(".number"),
display = document.querySelector(".display"),
resetLastExpression = document.querySelector("#C"),
allReset = document.querySelector("#allReset"),
cansel = document.querySelector("#cansel"),
equals = document.querySelector("#equals"),
rvtButton = document.querySelector("#rvt"),
deleteAllfromMemory = document.querySelector("#deleteAllfromMemory"),
memoryStoreSave = document.querySelector("#memoryStore"),
memoryRecall = document.querySelector("#memoryRecall"),
plusMemory = document.querySelector("#plusMemory"),
minusMemory = document.querySelector("#minusMemory"),
divMemory = document.querySelector(".memory"),
container_memory = document.querySelector(".container_memory"),
closeContainer = document.querySelector(".buttons");

var memory = [],
expressionSafe = [];


//перебор всех элементов и создания события для отображения на дисплее, кнопки 1,2,3,4,5,6,7,8,9,0 \,-,+,*,(,)
number.forEach(function(item){
    item.addEventListener("click",function(){
        if(display.value == 0){
            display.value = "";
        }
        display.value += item.textContent;
    })
});

//кнопка <-, удаляет по одной цифре справа 
cansel.addEventListener("click",function(){
    display.value = display.value.slice(0,-1);
});

//кнопка С, удаляет все с дисплея и ставит 0
resetLastExpression.addEventListener("click",function(){
    display.value = "0";
})

//кнопка =, после нажатия вычисляет выражение с помощью функции eval, пушит в массив данные для дальнейшей работы
//реулярка для проверки, чтобы было выражение, а не просто число
//кнопка rvt становится доступной
//сохраняем последнее выражение в массив 
equals.addEventListener("click",function(){
    var regex = /^(\d+|\*\*|[+\-*/])$/;
    var check = regex.test(display.value);
    if(display.value !=0 && display.value!=""
    && !check){
        expressionSafe.push(display.value);
        rvtButton.disabled = false;
        display.value = eval(display.value);
        var dot = display.value.indexOf(".");
        if (dot != '-1') {
            display.value=display.value.substring(0, dot + 9);//установка знаков после точки, если цифра 9, то не более 8
        }
    }
})

//кнопка -.+, отрицательное число становится положительным, и наооборот
minusplus.addEventListener("click",function(){
    if(display.value !=0 && display.value!=""){
        var num = parseFloat(display.value);
            display.value = num*-1;
    }
})

//кнопка rvt, достаем из массива последнее выражение и отображаем на дисплей
//очищаем массив и блокируем кнопку
rvtButton.addEventListener("click",function(){
   display.value = expressionSafe[0];
   expressionSafe.splice(0,expressionSafe.length);
   rvtButton.disabled = true;
})


//событие на нажати в поле кнопок, чтобы убрать поле памяти
closeContainer.addEventListener("click",function(e){
    if(e.target == closeContainer){
        divMemory.style.display = "none";
    }
})

//кнопка MS
//проверяем, что в массиве чисел нет дубликата, если нет, заносим в массив
//создаем элемент с текстом и кнопкой, текст - результат вычисление на дисплее
//новый элемент помешен в дерево
memoryStoreSave.addEventListener("click",function(){
    function isCheck(number) {
        return number == eval(display.value);
    }      
    divMemory.style.display = (divMemory.style.display == 'none') ? 'block' : 'none'
    if(!memory.some(isCheck) && eval(display.value)!=undefined){
        memory.push(eval(display.value));
        var div = document.createElement("div");
        var button = document.createElement("button");
        button.innerText = "delete";
        button.className = "deleteNumber";
        div.className = "element";
        div.innerHTML = eval(display.value);
        div.append(button);
        container_memory.insertBefore(div, container_memory.children[0]); 
       }
})

//delete у сохраненых элементов в блоке памяти
//по нажатию удаляем последний элемент
container_memory.addEventListener("click",function(e){
    var deleteNumber = document.querySelector(".deleteNumber");
    var element = document.querySelector(".element");
    if(e.target == deleteNumber){
        container_memory.removeChild(element);
        var myIndex = memory.indexOf(element
        .textContent.substring(0,1));
        memory.splice(myIndex, 1);
    }

})

//кнопка MR
//извлекаем из блока памяти последнее число и отображаем на дисплее
memoryRecall.addEventListener("click",function(){
    if(container_memory.childElementCount>0){
        display.value = memory[memory.length-1];
    }
})

//кнопка MC
//удаляем все элементы из массива + удаляем все node элементы из блока памяти
deleteAllfromMemory.addEventListener("click",function(){
    while (container_memory.firstChild) {
        container_memory.removeChild(container_memory.firstChild);
        memory.splice(0,memory.length);
    }
})

//кнопка M+
//суммируем значение на дисплее с последним сохранением в памяти
plusMemory.addEventListener("click",function(){
    var element = document.querySelector(".element")
    if(container_memory.childElementCount>0 && eval(display.value)!=undefined){
        memory[memory.length-1] += eval(display.value);
        element.childNodes[0].textContent =  memory[memory.length-1];
    }
})

//кнопка M-
//вычитаем из последнего сохранения в памяти значение на дисплее
minusMemory.addEventListener("click",function(){
    var element = document.querySelector(".element")
    if(container_memory.childElementCount>0 && eval(display.value)!=undefined){
        memory[memory.length-1] -= eval(display.value);
        element.childNodes[0].textContent =  memory[memory.length-1];
    }
})


//кнопка AC
//Чистиим все массивы, удаляем все элементы из памяти
allReset.addEventListener("click",function(){
    memory.splice(0,memory.length);
    expressionSafe.splice(0,memory.length);
    rvtButton.disabled = true;
    display.value = "0";
    while (container_memory.firstChild) {
        container_memory.removeChild(container_memory.firstChild);
        memory.splice(0,memory.length);
    }
    divMemory.style.display = "none";
})





