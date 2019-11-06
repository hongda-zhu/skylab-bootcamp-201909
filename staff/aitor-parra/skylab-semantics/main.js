
var semTags = [];

let arrayConSem = ["body","article","nav","h1","h2","h3","p","footer","aside","figure","ul","ol","li","address","time","figure","figcaption","summary","section"]
for (let i = 0; i < arrayConSem.length ; i++) {
    
    semTags.push(document.arrayConSem[i]);
    //semTags.push(document.getElementsByTagName(arrayConSem[i]));
    
}

console.log(semTags);



/* ---- SOLUCION DE CLASSE - Inicio - (Martin y Xavi) ----

let semanticElements = ['div', 'p', 'a', 'span', 'script', 'strong', 'b', 'noscript', 'br', '#text', '#comment', 'button', 'i'];
       let text = '';
       let cont = 0;
       dom = document.getElementsByTagName('body');
       dom = dom[0];
       console.log(dom);
       hijos(dom);
       function hijos(padre) {
           while (padre.hasChildNodes()) {
               const tagName = padre.firstChild.nodeName.toLowerCase();
               if (!semanticElements.includes(tagName)) text += ('<' + tagName + '>');
               if (padre.hasChildNodes()) hijos(padre.firstChild);
               if (!semanticElements.includes(tagName)) text += ('</' + tagName + '>');
               padre.removeChild(padre.childNodes[0]);
           }
       }
       console.log(text);

---- SOLUCION DE CLASSE - Fin (Martin y Xavi) ---- */



/*

const semTags = document.getElementsByTagName("body","article","nav","h1","h2","h3","p","footer","aside","figure","ul","ol","li","address","time","figure","figcaption","summary","section");
console.log(semTags)

let arrayTag = Array.from(semTags);
let arrayConSem = ["head","body","article","nav","h1","h2","h3","p","footer","aside","figure","ul","ol","li","address","time","figure","figcaption","summary","section"]
let tagTree = "";

//console.log(arrayTag)

*/

/*

function semanticTagFinder() {
    for (i = 0; i < arrayTag.length; i++) {
        for (j = 0; j < arrayConSem; j++) {

            if (arrayTag[i] == arrayConSem[j]) {
                tagTree.push(arrayTag[i])
            }
        }
    }
    //alert(tagTree)
}
semanticTagFinder();


*/



/*
let arrayTag = Array.from(semTags);

let tagTree = "";

console.log(arrayConSem)

function semanticTagFinder() {
    for (i = 0; i < arrayTag.length; i++) {
        for (j = 0; j < arrayConSem; j++) {

            if (arrayTag[i] == arrayConSem[j]) {
                tagTree.push(arrayTag[i])
            }
        }
    }
    //alert(tagTree)
}

//semanticTagFinder();

*/
 

    