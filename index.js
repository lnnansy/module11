// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек

const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (arr) => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  //const oldLi = document.querySelector('li');
  //const oldUl = document.querySelector('ul');
  //oldUl.removeChild(oldLi);
  //oldUL.innerHTML = '';
  //var delChild = oldUl.children;
  //document.removeChild(delChild);

  function removeChildElements() {
    let childElements = document.querySelector("ul");
    let delChild = childElements.lastChild;
    while (delChild) {
     childElements.removeChild(delChild);
     delChild = childElements.lastChild;
     }
   }
   removeChildElements();

  for (let i in arr) {
    const newLi = document.createElement("li");
     
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    if (arr[i].color == "желтый") {
      newLi.className="fruit__item fruit_yellow";
    } else if (arr[i].color == "фиолетовый") {
      newLi.className="fruit__item fruit_violet";
    } else if (arr[i].color == "зеленый") {
      newLi.className="fruit__item fruit_green";
    } else if (arr[i].color == "розово-красный") {
      newLi.className="fruit__item fruit_carmazin";
    } else if (arr[i].color == "светло-коричневый") {
      newLi.className="fruit__item fruit_lightbrown";
    };
    newLi.innerHTML = `<div class="fruit__info"><div>index: ${i}</div><div>kind: ${arr[i].kind}</div><div>color: ${arr[i].color}</div><div>weight (кг): ${arr[i].weight}</div></div>`;
    fruitsList.appendChild(newLi);
    
  }
  
};
  
//   console.log(newLi);
//   const div = document.createElement("div");
// div.className = "my_div";
// div.innerHTML = "<h1>Заголовок</h1><p>Содержимое</p>";
// console.log(div);
// const parent = document.getElementById("fr_n");
// console.log(parent);
//parent.insertAdjacentHTML('beforeend', newLi);
// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let oldArr = fruits.slice();
  
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    i = getRandomInt(0, fruits.length-1);
    result.unshift(fruits[i]);
    fruits.splice(i,1);
    
    //result = 
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    

  }
 
  for (let n = 0; n < result.length; n++) {
    if (oldArr[n] == result[n]) {
       alert(`После перемешивания Фрукт ${result[n].kind} остался на том же месте`);
    };
  };
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  minWeight = document.querySelector(".minweight__input").value;
  maxWeight = document.querySelector(".maxweight__input").value;
  const filteredKinds1 = fruits.filter((el) => {
    // TODO: допишите функцию
    
    if ((el.weight >= minWeight) && (el.weight <= maxWeight)) {
      
      return el;
    
  };
  
  
  });
  
  
  return filteredKinds1;
  
};

filterButton.addEventListener('click', () => {
  //filterFruits();
  
  // const filteredKinds1 = fruits.filter((el) => {
  //   // TODO: допишите функцию
  //   let weightElmin = el.weight;
    
  //   if (weightElmin < 20) {
      
  //     return weightEl;
    
  // };
  
  
  // });
  
  display(filterFruits());
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b, res) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
    const priority = ["желтый", "светло-коричневый", "зеленый", "розово-красный", "фиолетовый"]
    const priority1 = priority.indexOf(a.color);
    const priority2 = priority.indexOf(b.color);
    //return priority1 > priority2;
    return res ? priority1 < priority2 : priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparationColor) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           if (comparationColor(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }  
     return arr;
  },
  
  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    function swap(items, firstIndex, secondIndex) {
      const temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    }

    
    function partition(items, left, right) {
      var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
      while (i <= j) {
        while (comparationColor(items[i], pivot, true)) {
          i++;
        }
        while (comparationColor(items[j], pivot)) {
          j--;
        }
        if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
        }
      }
      return i;
    }

    
    function quickSort(items, left, right) {
      let index;
      if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
          quickSort(items, left, index - 1);
        }
        if (index < right) {
          quickSort(items, index, right);
        }
      }

      return items;
    }

    return quickSort(arr);


  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    console.log(sortTime);
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if(sortKind == 'bubbleSort'){
    sortKind = 'quickSort';
  }else {
    sortKind = 'bubbleSort';
  };
  sortKindLabel.textContent = sortKind;
  sortTime = '-';
  sortTimeLabel.textContent = sortTime;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  
  // const sort = sortAPI[sortKind];
  // sortAPI.startSort(sort, fruits, comparationColor);
  // console.log(sortAPI.quickSort(fruits, comparationColor));
  
  // display(sortAPI.bubbleSort(fruits, comparationColor));
  // TODO: вывести в sortTimeLabel значение sortTime




  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  if (sortKind == 'bubbleSort') {
    display(sortAPI.bubbleSort(fruits, comparationColor));
    sortTimeLabel.textContent = sortTime;
  } else if (sortKind == 'quickSort') 
  {
    display(sortAPI.quickSort(fruits, comparationColor));
    sortTimeLabel.textContent = sortTime;

  };
  
  
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput

  const arrFruits = {};

  if (document.querySelector(".kind__input").value ==="") {
    alert('Необходимо ввести название фрукта')
    arrFruits.kind = "";
  } else {
    arrFruits.kind = document.querySelector(".kind__input").value;
  };

  if(document.querySelector(".color__input").value ==="") {
    alert('Необходимо ввести цвет фрукта')
    arrFruits.color = "";
  } else {
    arrFruits.color = document.querySelector(".color__input").value;
  };

  if (isNaN(document.querySelector(".weight__input").value)) {
    alert('Необходимо ввести значение веса');
    arrFruits.weight = "";
  } else {    
    arrFruits.weight = document.querySelector(".weight__input").value;
  };
  
  fruits.push(arrFruits);







  display(fruits);
});
