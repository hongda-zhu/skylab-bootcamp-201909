let semanticElements = ['div', 'p', 'a', 'span', 'script', 'strong', 'b', 'noscript', 'br', '#text', '#comment', 'button', 'i', 'link', 'meta', 'style','dl'];
       let text = '';
       dom = document.getElementsByTagName('html');
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
       console.log(text)








