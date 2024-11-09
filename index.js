const btnAdd = document.querySelector(".btn__add");
const userText = document.getElementById("user__text");
const itemTextRu = document.querySelectorAll(".item___text-ru");
const btnReset = document.querySelector(".btn__reset");
const listRu = document.querySelector(".list_ru");
const listLt = document.querySelector(".list_lt");

const allTasks = []; //для хранения данных
let count = 1;
function generateId() {
  //это счетчик, будет использован для номерации задач
  count += 1;
  return count;
}
btnAdd.addEventListener("click", (event) => {
  //работает по клику
  //кнопка получает значение с инпута и вызывает создание задачи
  event.preventDefault(); // изменение дефолтного поведения формы
  if (userText.value.trim() === "") {
    alert("введите текст");
  } else {
    create(userText.value); //вызов создания задачи и вывода на экран
    userText.value = ""; //обнуляем инпут для нового ввода
    createTranslit(allTasks); //вызываем функцию перевода
  }
});
btnAdd.addEventListener("keydown", (event) => {
  //работает по нажатию клавиши
  //кнопка получает значение с инпута и вызывает создание задачи
  event.preventDefault(); // изменение дефолтного поведения формы
  if (userText.value.trim() === "") {
    alert("введите текст");
  } else {
    create(userText.value); //вызов создания задачи и вывода на экран
    userText.value = ""; //обнуляем инпут для нового ввода
    createTranslit(allTasks); //вызываем функцию перевода
  }
});
let index;

function create(task) {
  let textTask;
  // тут мы создаем объект где храним задачи их номер и статус
  const obj = {};
  obj.text = task;
  obj.id = generateId();
  obj.isDone = false;
  console.log();
  index = document.createElement("span");
  index.getElementsByClassName(obj.id);
  let liRu = document.createElement("li");
  liRu.className = "li__remove";
  let textCont = document.createElement("span");
  if (obj.text.length > 8) {
    let toolTips = document.createElement("span");
    toolTips.className = "toolTips";
    textCont.className = "hover";
    liRu.append(toolTips);
    toolTips.append(obj.text);
    textCont.className = "hover";
    obj.text = task.slice(0, 8) + "...";
  }
  textTask = obj.text; //получаем текст задачи

  listRu.append(liRu);
  liRu.append(index);
  index.append(obj.id);
  liRu.append(textCont);
  textCont.append(textTask);

  allTasks.push(userText.value); // записываем в отдельный массив, чтобы в нужный момент найти все объекты
}
let chars = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "`",
  э: "e",
  ю: "yu",
  я: "ya",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "YO",
  Ж: "ZH",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: " F",
  Х: "H",
  Ц: "C",
  Ч: "CH",
  Ш: "SH",
  Щ: "SHCH",
  Ъ: "",
  Ы: "Y",
  Ь: "",
  Э: "E",
  Ю: "YU",
  Я: "YA",
}; // объект с алфавитом
const result = []; // массив для хранения результатов

function createTranslit(arr) {
  //функция транслит
  result.length = 0; // очищаем массив перед использованием
  arr.forEach((task) => {
    //перебираем массив
    const transliterated = task
      .split("") // разбираем элемент массива
      .map((letter) => chars[letter] || letter) //получаем массив с переводом
      .join(""); //собираем новый массив в строку
    if (result.length === 0) {
      //если массив пуст присваиваем новое значение
      result.push(transliterated); //присваеваем новое значение
    } else {
      //проверяем если массив не пустой, то обнуляем и записываем новое значение
      result.length = 0;
      result.push(transliterated);
    }
    // добавляем транслит в массив
  });

  objTr(result); // создаем объект для отображения
}
let countTr = 1;
function generateIdTr() {
  //это счетчик, будет использован для номерации задач Translite
  countTr += 1;
  return countTr;
}
let indexTr;
function objTr(result) {
  let textTask;
  const obj = {}; //создаем объект
  obj.text = result.join("");
  obj.id = generateIdTr();
  obj.isDone = false;
  textTask = obj.text;
  indexTr = document.createElement("span");
  let liLt = document.createElement("li");
  liLt.className = "li__remove";
  let textCont = document.createElement("span");
  textCont.className = "li__text";
  let listReset = document.createElement("button");
  listReset.className = "list__reset";
  indexTr.className = "marker__none";
  if (obj.text.length > 8) {
    let toolTips = document.createElement("span");
    toolTips.className = "toolTips";
    obj.text = result.join("").slice(0, 8) + "...";
    textCont.className = "hover";
    liLt.append(toolTips);
    toolTips.append(textTask);
  }
  listReset.addEventListener("click", (event) => {
    let y = event.target.parentNode;
    let id = +y.firstChild.textContent - 1;
    console.log(id);
    let child = listRu.children;
    let arrChild = Array.from(child);
    // console.log(arrChild);
    console.log(arrChild);
    // console.log(y);
    // console.log(y.firstChild.textContent);
    // let x = Array.from(y.children);

    arrChild[id].remove();
    liLt.remove();
    console.log("work");
    delete arrChild[id];
    console.log(arrChild);
    for (let i = 0; i < arrChild.length; i++) {
      console.log(arrChild[i].firstChild);
      arrChild[i + 1].firstChild.innerHTML = i + 1;
    }
    console.log(liLt);

    console.log("2work");

    // console.log(arrChild);
    // console.log(x[0].textContent.remove());
  });
  //получаем текст задачи
  listLt.append(liLt);
  liLt.append(indexTr);
  indexTr.append(obj.id);
  liLt.append(textCont);
  liLt.append(listReset);
  textCont.append(obj.text);
}
console.log(allTasks);

btnReset.addEventListener("click", () => {
  document.querySelectorAll(".li__remove").forEach((item) => {
    count = 1;
    countTr = 1;
    item.remove();
  });
});
