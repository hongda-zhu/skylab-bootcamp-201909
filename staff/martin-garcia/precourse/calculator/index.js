/*
Esta parte del código es la que recopila la información
y desencadena la acción del código

Se piden 2 números por teclado y se imprime la salida de los métodos por pantalla
*/

var dato1 = prompt("primer número");
var dato2 = prompt("segundo número");
validador(dato1,dato2);



/*Valida que los datos introducidos sean correctos, o muestra error en su defecto
Solo se pueden introducir números, y existe la opción de introducir solo el primer números
para obtener la raíz cuadrada.
*/
function validador(dato1,dato2){
  if(dato1.length == 0 || isNaN(dato1) || isNaN(dato2)){
    alert("error");
  } else if(dato2.length == 0){
    console.log('raizCuadrada');
    alert(raizCuadrada(parseFloat(dato1)));
  } else {
    console.log('calculadora');
    alert(calculadora(parseFloat(dato1),parseFloat(dato2)));
  }
}


//Calcula la raíz cuadrada,llama a la función que ajusta los decimales y retorna.
function raizCuadrada(param){
  return "Raiz cuadrada de "+param+" = "+ajusteDecimales(Math.sqrt(param),3);
}


//Hace los cálculos pedidos, llama a la función que ajusta los decimales y retorna.
function calculadora(param1, param2){
  var suma = (param1 + param2);
  var resta = param1 - param2;
  var multi = param1 * param2;
  var divi = param1 / param2;
  resultado = [];
  resultado.push("suma: "+param1+"+"+param2+"="+ajusteDecimales(suma,3));
  resultado.push("\nresta: "+param1+"-"+param2+"="+ajusteDecimales(resta,3));
  resultado.push("\nmultiplicación: "+param1+"*"+param2+"="+ajusteDecimales(multi,3));
  resultado.push("\ndivisión: "+param1+"/"+param2+"="+ajusteDecimales(divi,3));
  return resultado;
}


/*
Se encarga de ajustar los decimales, según el número que se indique.
Funcionamiento para 3,123 se quieren n decimales; la función examina el n+1 decimals
en función de su valor, el decimal n se mantiene o se le suma 1.
ajusteDecimales(2.355,2)-->2.36
ajusteDecimales(2.354,2)-->2.35
*/
function ajusteDecimales(value,decimals){
  if(isNaN(value)){
    return NaN;
  }
  valueStr = value.toString();
  if(valueStr.includes('.')){
    valueStr = valueStr.split('.');
    if (decimals >= valueStr[1].length){
      return value;
    }
    if(parseInt(valueStr[1][decimals]) >= 5 ){ /*Arreglar contenido de este if*/
      finalDecimal = (parseInt(valueStr[1][decimals-1])+1).toString();
      valueStr[1] = valueStr[1].substring(0,decimals-1)+(parseInt(valueStr[1][decimals-1])+1).toString();
      return parseFloat(valueStr[0]+"."+valueStr[1]);
    } else{
      return parseFloat(valueStr[0]+"."+valueStr[1].substring(0,decimals));
    }
  } else{
    return parseFloat(value);
  }
}
