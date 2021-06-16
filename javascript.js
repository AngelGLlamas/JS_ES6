/*
1.-     SPREAD AND REST------------------------------línea 26
2.-     CLASES---------------------------------------línea 76
3.-     PROMESAS-------------------------------------línea 140
4.-     FETCH----------------------------------------línea 209
5.-     ASYNC / AWAIT--------------------------------línea 251
6.-     METODOS Y OPCIONES PARA OBJETOS--------------línea 296
7.-     FOR OF---------------------------------------línea 329
8.-     NUEVOS METODOS PARA MATRICES-----------------línea 391
9.-     PARAMETROS POR DEFECTO-----------------------línea 430
10.-    NUEVOS METODOS PARA NUMEROS------------------línea 446
11.-    SETS-----------------------------------------línea 489
12.-    MAPS-----------------------------------------línea 539
13.-    TEMPLATE STRING LITERALS---------------------línea 600
14.-    ARROW FUNCTIONS------------------------------línea 663
15.-    NUEVAS VARIABLES CONST Y LET-----------------línea 708
*/

//ponemos esta línea para que funcione fetch despues de instalarla (ver línea 192)
const fetch = require("node-fetch");

/*------------------------------------------------------------*/

//Spread and Rest

//Spread
//expande los valores de una matriz
const numeros = [1, 2, 3, 4, 5];
console.log(...numeros);

const oracion = "Hola mundo";
console.log(...oracion);

function sumar(a, b, c, d, e) {
    return a + b + c + d + e;
}

console.log(sumar(...numeros));

const datos = { nombre: 'Juan', ciudad: 'Leon' };
const nombres = { nombre: "Lucas", cerveza: "Judas", color: "rojo" };
const union = { ...numeros, ...nombres };

console.log(union);

//Rest
//representa un nº infinito de argumentos como matriz
function sumar2(...argumentos) {
    return argumentos.reduce((actual, total) => actual + total);
}

//se puede usar spread varias veces
const numeros2 = [21, 22, 66];
console.log(sumar2(...numeros, ...[55], ...numeros2, 4, 88, 99));

const mapState = {
    loggedIn() {
        return TextTrackCue
    },
    member() {
        return false
    }
}

const computed = {
    ...mapState,
    computedProp() {
        return null
    }
}

console.log(computed);

/*------------------------------------------------------------*/

//CLASES
//los metodos se heredan por medio de los prototipos
class Task {
    //constructor
    constructor(tittle) {
        if (!tittle) throw new Error("Necesitamos un titulo");
        this.tittle = tittle;
        this.completed = false;
    }
}

const tarea = new Task("Aprender Javascript");
console.log(tarea);

const TasksList = class {
    constructor() {
        this.task = [
            { tittle: 'Aprender Firebase', completed: false },
            { tittle: 'Aprender CSS', completed: true },
            { tittle: 'Aprender html5', completed: false }
        ]
    }

    //Getters
    get uncompleted() {
        return [...this.task].filter(task => !task.completed);

    }

    get completed() {
        return [...this.task].filter(task => task.completed);

    }

    //Setters
    set addTask(task) {
        this.task.push(task);
    }
}

const tareas = new TasksList();

const tareas2 = new Task("Aprender algo ya");
tareas.addTask = { ...tareas2 };
console.log(tareas.uncompleted);

//Subclassing
class Reminder extends Task {
    constructor(title, date) {
        super(title);
        this.date = date;
    }

    get duration() {
        return `${this.title} ejemplo de herencias ${this.date}`;
    }

}

const ejemplo = new Reminder("asdflkjaslfd sdaf", "adlkasd aldkjf");
console.log(ejemplo.duration);

/*------------------------------------------------------------*/

//PROMESAS
//creación de promesa
const buyFood = new Promise((resolve, reject) => {
    resolve("Aqui tienes tu pedido");
    reject(Error("Error de procesamiento de pedido"));
})

buyFood
    .then(result => console.log(buyFood))
    .catch(error => console.error(error))
    .finally(() => console.info("Proceso finalizado"))

//manejo de varias promesas
const payFood = new Promise((resolve, reject) => {
    //son acciones asincronas
    setTimeout(() => {
        Promise.race([paypal, visa]).then(payProvider => { //promise.race elige la más rápida
            resolve({ done: true, payProvider, customerID: 3123123123123 })
        })
        //resolve({done: true, customerID: 3123123123123})
        //reject("Problema con el pago")
    }, 300);
})

//proveedores de pago
const paypal = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Paypal");
    }, 300);
})

const visa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Visa");
    }, 1000);
})


const getTransport = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ bikerID: 4323234, distance: 3000 })
        reject("Problema con el repartidor")
    }, 1000);
})

function deliverFood() {
    payFood
        .then(paymentInfo => {
            console.log(paymentInfo);
            return getTransport; //retorna otra promesa, podemos encadenar "then"
        })
        .then(riderInfo => {
            let { bikerID, distance } = riderInfo;
            console.log(`El bikerID ${bikerID} se encuentra a ${distance} metros`)
        })
        .catch(error => { console.error(error) }) //recolector de errores reject
        .finally(() => console.log("El proceso de compra ha finalizado"))

    //prodríamos usar Promise.all para mostrar algo cuando todas las promesas indicadas se cumplan
    /*Promise.all([payFood, getTransport])
        .then(order => console.log(order))
        .catch(error => console.error(error))
    */
}

deliverFood()

/*------------------------------------------------------------*/

//FETCH
//NUEVO METODO PARA REALIZAR CONSULTAS API
const url = "https://jsonplaceholder.typicode.com/posts/";

// GET request
//CUIDADO LA API DE RECUPERACION fetch NO ESTA IMPLEMENTADA EN NODEJS (npm i node-fetch --save)
fetch(url)  //fetch siempre devuelve promesas por lo que utilizamos then
    .then(response => {
        console.log(response.headers.get("Content-type")); //recogemos información de cabecera, en este caso el tipo
        for (const [key, value] of response.headers) { //recogemos clave y valor del contenido del json utilizamos desestructuración
            console.log(key, value);
        }
        return response.json();
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));

//POST request
//cuerpo a enviar
const payload = {
    id: 323123123,
    name: "Angel Garcia",
    color: "red",
}

//opciones del request
const options = {
    method: "POST",
    headers: {
        //enviamos JSON en el cuerpo
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(payload)
};

//Request en sí
fetch(url, options)
    .then(response => console.log(response))
    .catch(error => console.error(error));

/*------------------------------------------------------------*/

//ASYNC / AWAIT
//Van a retornar una promesa
//en los métodos normales no se puede usar las promesas
//pero en las async si

function getWeather() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Mostly cloudy: 13C"), 2000);
    });
}

function getTraffic() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Traffic fluid"), 2000);
    });
}

async function travelPlan() {
    /*getWeather()      //se suele hacer así
        .then(data => {
            console.log(data);
            return getTraffic();
        })
        .then(data => console.log(data));
    */
    //const weather = await getWeather(); //con async el código es más legible
    //const traffic = await getTraffic();
    //return [weather, traffic];

    //podemos optimizar aún más el código y capturar errores
    try {
        const weather = getWeather();
        const traffic = getTraffic();
        const plan = await Promise.all([weather, traffic]);
        return plan;
    } catch (error) {
        throw error;
    }

}

travelPlan().then(data => console.log(data));

/*------------------------------------------------------------*/

//METODOS Y OPCIONES PARA OBJETOS
const nombre = "Angel";
const color = "azul";
const ciudad = "Leon";
const lenguaje = "JS";

const persona = {
    nombre, //antes se ponía "nombre: nombre" cuando los dos son iguales se pone una vez
    color,
    ciudad,
    lenguaje,
    [ciudad + "CP"]: 24198, //podemos crear propiedades de forma dinámica
    saludar() { //podemos asignar a una propiedad un método
        console.log(`Hola que tal, me llamo ${nombre}`);
    }
};

console.log(persona);
//Object.values nos da una matriz con los valores de un objeto
//con destructuración lo podemos asignar a otras nuevas propiedades
const [nombre2, color2, ciudad2, lenguaje2] = Object.values(persona);

//Object.entries nos da una matriz con claves y valores
console.log(Object.entries(persona));
//con foreach podemos recoger los datos
Object.entries(persona).forEach(([key, value]) => {
    console.log(`${key} : ${value}`);
});

console.log("pruebas");

/*------------------------------------------------------------*/

//FOR...OF
//recorre objetos iterables
const colores = ["Rojo", "Azul", "Verde", "Amarillo"];
for (let color of colores) {
    console.log(color);
}

//aqui nos daría problemas, pero podemos arreglarlo convirtiendolo en iterable con el for que tenemos más abajo
const persona2 = {
    nombre: "Lucas",
    ciudad: "Leon",
    color: "Rojo"
};

for (let [key, value] of Object.entries(persona2)) {
    console.log(key, value);
}

//para manejar arrays complejos hacemos lo siguiente
const aprender = {
    vue: ["Vue3", "Nuxt", "Grindsome"],
    js: ["EXNEXT", "Patterns", "Testing"],
    css: ["Tailwind", "BEM", "SubGRID"]
};

aprender[Symbol.iterator] = function () {
    //por cada matriz con herramientas, ir retornando cada una de ellas
    let indiceTecnologia = 0;
    let indiceHerramienta = 0;
    const tecnologias = Object.values(this);
    return {
        next() {
            const tecnologia = tecnologias[indiceTecnologia];

            //comprobamos que hay más herramientas
            if (!(indiceHerramienta < tecnologia.length)) {
                indiceTecnologia++;
                indiceHerramienta = 0;
            }

            //comprobar que hay más tecnologías
            if (!(indiceTecnologia < tecnologias.length)) {
                return {
                    value: undefined,
                    done: true
                };
            }

            return {
                value: tecnologia[indiceHerramienta++],
                done: false,
            }
        }
    }
}

for (let herramienta of aprender) {
    console.log(herramienta);
}

/*------------------------------------------------------------*/

//NUEVOS METODOS PARA MATRICES
//Array from
//crea una matriz a partir de las letras de una frase
const frase = "Hola que tal";
const caracteres = Array.from(frase);

//manejar un listado de un html
//lo comentamos para que no de error

const menu = Array.from(
    document.querySelectorAll("li"),
    elemento => elemento.textContent
);

//Array find
//dentro de una matriz con muchos datos podemos buscar el primero que coincida con nuestra busqueda
users = [];
const correo = "prueba@prueba.com";
//podemos buscar el nombre y, si queremos, profundizar aún más en los datos que tenga la matriz , como el apellido ("last")
const usuarioSeleccionado = users.find(user => user.email === correo).name.last;

//Array find index
//devuelve el indice y no el valor
const uuid = "2ddff23";
const indiceSeleccionado = users.findIndex(user => user.login.uuid === uuid).user.splice(indiceSeleccionado, 1);

//Array filter
const usuariosFemeninos = users.filter(user => (user.gender = "famale"));

//Array includes 
//comprueba si algunos elementos de la matriz coincide con la busqueda
console.log(Array.of(1, 2, 3, 4, 5, 6).includes(7));

if (usuarioSeleccionado.email.includes("@")) {
    console.log("Correo correcto");
}

/*------------------------------------------------------------*/

//PARAMETROS POR DEFECTO
function randomNum() {
    return Math.floor(Math.random() * 2) + 1;
}

function sumar(num1 = 1, num2 = randomNum()) { //damos valores por defecto para evitar problemas al pasar a la función solamente un parámetro
    return num1 + num2;
}

console.log(sumar());

//si quiero dejar el primero por defecto y asignar un valor al segundo
console.log(sumar(undefined, 5));

/*------------------------------------------------------------*/

//NUEVOS METODOS PARA NUMEROS
//Math.trunc

// Convierte a número antes de comparar
const num = 123.345;
console.log(Math.trunc(num));
// console.log(Math.ceil(num));
// const num2 = 1312312312312312312312.1;
// console.log(num2.toString());
// console.log(parseInt(num2));

// Number.isNaN
let valor = undefined + 1;
console.log(Number.isNaN(valor));
// El método global retorna true en valores que se pueden convertir en NaN pero que no tienen por qué ser NaN. Ojo con esto.
// console.log(isNaN(valor));

// valor = "NaN";
// console.log(Number.isNaN(valor));
// console.log(isNaN(valor));

// Number.isInteger
let entero = 10;
console.log(Number.isInteger(entero));

// entero = 10.0;
// console.log(Number.isInteger(entero));

// entero = 10.234;
// console.log(Number.isInteger(entero)); // false

// Number.isFinite
let finito = 20;
console.log(Number.isFinite(finito));
// El método global convierte a número
// console.log(isFinite(finito));

// finito = "20";
// console.log(Number.isFinite(finito));
// console.log(isFinite(finito));

/*------------------------------------------------------------*/

//SETS
//permiten almacenar colecciones de valores únicos
//en muchos casos será mejor utilizar los sets para manejar datos de matrices

const myColors = ['purple', 'cyan'];
const color = new Set(myColors);

//añadir al set
color.add('red');
color.add('blue');
color.add('yellow');
color.add('yellow');    //los repetidos, por defecto, no los añade

//iterar sobre el set
for (let col of color) {
    console.log(col);
}

//eliminar elementos
console.log(color.delete('yellow'));
console.log(color.size);

//Acceder a elementos del set
console.log(color.has("blue")); //devuelve true, porque lo ha encontrado

//limpiar el set
color.clear();

//ejemplo 
const users = ["Angel", "Lucas", "Gonzalo", "Maria", "Virginia", "Marta", "Juan"];
const userRegistrados = new Set();

function registro() {
    const userIndex = Math.floor(Math.random() * users.length);
    const user = users[userIndex];
    userRegistrados.has(user) && console.warn(`Usuario ${user} ya se ha registrado`);
    userRegistrados.add(user);
    console.log(userRegistrados);

    if (userRegistrados.size === users.length) {
        console.info("Todos los usuarios han sido registrados");
        clearInterval(interval);
        userRegistrados.clear();
    }
}

const interval = setInterval(visit, 300);

/*------------------------------------------------------------*/

//MAPS
const map = new Map();

map.set(1, "number");
map.set("1", "boolean");
map.set(true, "Boolean");

console.log(map.get(1));

console.log(typeof (map));
console.log(map instanceof Map);

/*for (let key of map.keys()) {
    console.log(key)
}

for (let val of map.values()){
    console.log(val);
}

of (let data of map.entries()){
    let [key, value] = data;
    console.log(key, value);
}
*/

const person = {
    name: "Juan",
    city: "Valencia",
    color: "red"
}

const personMap = new Map(Object.entries(person));
//console.log(personMap.get("city"))

const personClone = Object.fromEntries(personMap);

let juan = { name: 'Juan' }, nino = { name: 'Nino' }, guizmo = { name: 'Guizmo' };

let otro = { name: 'Otro' }

const admins = new Map()

admins
    .set(juan, 'superadmin')
    .set(nino, 'admin')
    .set(guizmo, 'editor')

function doAdmin(user) {
    if (admins.has(user)) {
        console.info(`User ${user.name} is doing ${admins.get(user)} stuff!`)
    } else {
        console.error("User not found on admin list!")
    }
}

juan = null;
doAdmin(juan);

/*------------------------------------------------------------*/

//TEMPLATE STRING LITERALS

const hi = "Hola que tal";
const from = 'from Spain';
//const final = hi + from;


function day() {
    return "friday";
}

//usando template strings
const final = `${hi} ${from} on ${day()}`;

const multiline = `Hola  
que tal`;   //esto con comillas convencionales no se puede hacer.

//Includes
const email = "hola@qutal.es";
//if (email.includes("@")) console.log("valido");

//StartsWith / EndsWith
//if (email.endsWith("wmedia.es")) console.log("VAlido");

const validEmail = email => email.includes("@") && email.endsWith("wmedia.es");
if (validEmail(email)) console.log("VAlido");

//Tagged templates
//para generar componentes

const cat = {
    name: "Guizmo",
    color: "black",
    image: "ruta imagen",
    city: "leon"
};

function makeTemplate(strings, ...keys) {
    console.log(strings, keys);
    return function(data) {
        console.log(data);
        let slices = strings.slice();
        keys.forEach(function(keys, index) {
            slices[index] += data[key];
        });
    return slices.join("");
    };
}

const catTemplates = makeTemplate`
        <div class="cat">
            <h1>${"name"}</h1>
            <h3>${"color"} from ${"city"}</h3>
            <img src="${"image"}">
        </div>
    `(cat);

const catElement = document.createElement("div");
catElement.innerHTML = catTemplates;
document.body.appendChild(catElement);

/*------------------------------------------------------------*/

//ARROW FUNCTIONS
//el return lo tienen implícito =>
//cuando incoporamos las llaves el return ya lo tenemos que indicar

//función declarada
function hola(name) {
    console.log(`Hola ${name}`);
}

//Expresión funcional
const hola2 = function(name){
    console.log(`hola ${name}`);
}

//Funciones flecha
const hola3 = name => console.log(`Hola ${name}`); //se puede usar (name)
const hola4 = () => console.log("hola que tal");

//return implícito
const double = num => num * 2;

//Return explícito
const quadruple = num => {
    let value = double(num)
    return value * 2;
}

const num = quadruple(2);
console.log(num);

//no tienen this, por eso son muy útiles sobre objetos
const cat = {
    name: "popi",
    tags: ["asdf", "jlñjk", "ljñlks", "dfsdf"],
    showTags() {
        this.tags.forEach(tag => console.log(tag))
        /*
        this.tags.forEach(function(tag) {   //aquí el this se disipa
            console.log(this.tag);
        })*/
    }
}

/*------------------------------------------------------------*/

//NUEVAS VARIABLES CONST Y LET

// var crea variables con ámbito global/funcional
var name = "Andrés"

function greetings() {
	var name = undefined
	
	return function() {
		// Closure
		console.log(name)	
	}
	
	name = "Juan"
	
}

//greetings()()

// let crea variables con ámbito de bloque
//var i = 1;
//for (i; i <= 10; i++) {
//	console.log(i)
//}

for (let i = 1; i <= 10; i++) {
	//console.log(i)
}

// console.log(i) // Ya no tenemos acceso

if (true) {
	let transform = name.toUpperCase();
}

// console.log(transform) // No tenemos acceso

// const crea constantes
const IVA = .21
// IVA = .16  // No se puede cambiar

const Person = {}
Person.name = name
console.log(Person) // No hay problema

const Person2 = Person
Person2.city = "Valencia"
console.log(Person) 