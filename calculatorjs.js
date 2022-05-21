var number = document.querySelectorAll(".number"),
result,
display = document.querySelector(".display"),
body = document.querySelector("body"),
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
dot = document.querySelector(".dot");
division = document.querySelector(".division");
multiplication = document.querySelector(".multiplication");
minus = document.querySelector(".minus");
plus = document.querySelector(".plus");
openBracket = document.querySelector(".openBracket");
closeBracket = document.querySelector(".closeBracket");
preResult = document.querySelector(".preResult");
rvtExpression = document.querySelector(".rvtExpression");


var memory = []


//накладывание событий на клавиатуру
body.addEventListener('keydown', function(event){
    if (['0','1','2','3','4','5','6','7','8','9','(',')',
        '.'].includes(event.key)) {
        if(display.value == 0){
            display.value = "";
            display.value += event.key;
        }
        else{
            display.value += event.key;
        }
    }else if(event.key == "Backspace"){
        canselFunc();
    
    }
    else if(event.key == "Enter"){
        equalsFunc();
    }else if(event.key == "Delete"){
        resetFunc();
    }else if(event.key == "+"){
        plus.click();
        display.value = "";
    }else if(event.key == "-"){
        minus.click();
        display.value = "";
    } 
    else if(event.key == "*"){
        multiplication.click();
        display.value = "";
    } 
    else if(event.key == "/"){
        division.click();
        display.value = "";
    }     
    limitFunc(); 
});

//функция для перевода числа над инпутом после какой-либо операции
var changePositon = function(e){
   
    if(display.value.length > 0 && display.value != 0){
        display.value = display.value.replace(/[,.]?0+$/, '');
        var divNumber = document.createElement("div");
        var divOperation = document.createElement("div");
        divNumber.innerText = display.value;
        divOperation.innerHTML = e.target.innerText;
        preResult.appendChild(divNumber, preResult.children[0]);
        preResult.appendChild(divOperation, preResult.children[0]);
        display.value = "";
    }

    
}
plus.addEventListener("click",changePositon);
minus.addEventListener("click",changePositon);
division.addEventListener("click",changePositon);
multiplication.addEventListener("click",changePositon);


//перебор всех элементов и создания события для отображения на дисплее, кнопки 1,2,3,4,5,6,7,8,9,0 \,-,+,*,(,)
number.forEach(function(item){
    
    item.addEventListener("click",function(){
        if(display.value == 0){
            display.value = "";
        }else if(display.value == ""){
            display.value += item.textContent;
        }
        if(item.textContent == "+" ||
        item.textContent == "-" ||
        item.textContent == "*" ||
        item.textContent == "/"){
            display.value = "";
        }else{
            display.value += item.textContent;
        }
       
        limitFunc();
        
        if(item == dot){
            dot.disabled = true;
        }else if(
            item==division
            || item==plus
            || item==minus
            || item==multiplication
            || item==division){
            dot.disabled = false;
        }

    
    
    })

});


//функция для лимита чисел до и после запятой
var limitFunc = function(){
    const regex = /[\./]/g; 
    const found = display.value.match(regex);
    if(found!= null && found.length === 1){
        display.setAttribute("maxlength",21);
        var afterDot = display.value.substring(display.value.indexOf("."));
        if(afterDot.length > 8){
            afterDot = afterDot.substring(0,9);
            display.value = display.value.substring(0,display.value.indexOf(".")) + afterDot;
        }
    }else{
        display.value = display.value.substring(0,12);
    } 
}



//кнопка <-, удаляет по одной цифре справа 
var canselFunc = function(){
    display.value = display.value.slice(0,-1);
}
cansel.addEventListener("mousedown",canselFunc);

//кнопка С, удаляет все с дисплея и ставит 0
var resetFunc = function(){
    display.value = "0";
}
resetLastExpression.addEventListener("click",resetFunc);

//кнопка =, после нажатия вычисляет выражение с помощью функции eval, пушит в массив данные для дальнейшей работы
//реулярка для проверки, чтобы было выражение, а не просто число
//кнопка rvt становится доступной
//сохраняем последнее выражение в массив 
var equalsFunc = function(){
   
    if(preResult.childElementCount > 0){
        preResult.childNodes.forEach(item =>{
            item.textContent = item.textContent.replace(/[,.]?0+$/, '')
            result +=item.textContent;
        });
        
        if(display.value.length == ""){
           result = result.substring(0,result.length - 1);
            display.value = eval(result).toFixed(8);
            display.value = display.value.replace(/[,.]?0+$/, '')
            
        }else{
            result+=display.value;
            display.value = eval(result).toFixed(8);
            display.value = display.value.replace(/[,.]?0+$/, '')
        }
    }
    if(display.value.length > 21 && display.value[0]!="-"
            || display.value.length > 22
            || display.value.includes("e")){
                display.value = "999999999999.99999999"
            }
    
        
            rvtButton.disabled = false;
}
equals.addEventListener("click",equalsFunc);

//кнопка -.+, отрицательное число становится положительным, и наооборот
minusplus.addEventListener("click",function(){
    if(display.value !=0 && display.value!="" &&
        !display.value.includes("-")){
        var num = parseFloat(display.value);
            display.value = "-" + display.value;
    }else{
        display.value = display.value.substring(1);
    }

    if(preResult.childElementCount>0 && preResult.childNodes[preResult.childNodes.length-1].textContent=="-"){
        preResult.childNodes[preResult.childNodes.length-1].textContent="+"
        display.value = display.value.substring(1); 
    }else if(preResult.childElementCount>0 && preResult.childNodes[preResult.childNodes.length-1].textContent=="+"){
        preResult.childNodes[preResult.childNodes.length-1].textContent="-" 
        display.value = display.value.substring(1); 
    }
    
})

//кнопка rvt, достаем из массива последнее выражение и отображаем на дисплей
//очищаем массив и блокируем кнопку
rvtButton.addEventListener("click",function(){
    result = result.replace("undefined", '')
    
    if(rvtExpression.childElementCount>0){
        while (rvtExpression.firstChild) {
            rvtExpression.removeChild(rvtExpression.firstChild);
        }
        var div = document.createElement("div");
        div.textContent = result.substring(result.lastIndexOf(" "),result.length);
        rvtExpression.appendChild(div);
    }else{
        var div = document.createElement("div");
        div.textContent = result.substring(result.lastIndexOf(" "),result.length);
        rvtExpression.appendChild(div);
    }
    console.log(result)
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
        display.value = display.value.replace(/[,.]?0+$/, '')
        memory.push(display.value);
        var div = document.createElement("div");
        var button = document.createElement("button");
        button.innerText = "delete";
        button.className = "deleteNumber";
        div.className = "element";
        div.innerHTML = display.value;
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
    if(container_memory.childElementCount>0 && display.value!=undefined){
        var value = display.value;
        var nmbFromMemory = memory[memory.length-1];
        var str = value + "+" + nmbFromMemory;
        var totalResult = eval(str).toFixed(8);
        if(totalResult.length > 21 && totalResult[0]!="-"){
            totalResult = "999999999999.99999999"
        }

        totalResult = totalResult.replace(/[,.]?0+$/, '')

        memory[memory.length-1] = totalResult;
        element.childNodes[0].textContent =  memory[memory.length-1];
    }
})

//кнопка M-
//вычитаем из последнего сохранения в памяти значение на дисплее
minusMemory.addEventListener("click",function(){
    var element = document.querySelector(".element")
    if(container_memory.childElementCount>0 && eval(display.value)!=undefined){
        var value = display.value;
        var nmbFromMemory = memory[memory.length-1];
        var str = nmbFromMemory + "-" + value;
        var totalResult = eval(str).toFixed(8);
        if(totalResult.length > 22){
            totalResult = "-999999999999.99999999"
        }

        totalResult = totalResult.replace(/[,.]?0+$/, '')

        memory[memory.length-1] = totalResult;
        element.childNodes[0].textContent =  memory[memory.length-1];
    }
})


//кнопка AC
//Чистиим все массивы, удаляем все элементы из памяти
allReset.addEventListener("click",function(){
    memory.splice(0,memory.length);
    rvtButton.disabled = true;
    display.value = "0";
    while (container_memory.firstChild) {
        container_memory.removeChild(container_memory.firstChild);
        memory.splice(0,memory.length);
    }
    divMemory.style.display = "none";
    while (preResult.firstChild) {
        preResult.removeChild(preResult.firstChild);
    }
    while (rvtExpression.firstChild) {
        rvtExpression.removeChild(rvtExpression.firstChild);
    }
    result = "";
})





