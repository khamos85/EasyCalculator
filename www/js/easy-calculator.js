<script language="javascript" type="text/javascript">
//CALCULADORA SIMPLE
//Version: 1 (5/12/1999)
//Iván Nieto Pérez
//Este script y otros muchos pueden
//descarse on-line de forma gratuita
//en El Código: www.elcodigo.com

var OpA
var OpB
var Operador
var Memoria = 0

var Escribiendo
var HayOperandoA
var HayResultado
var ACero

function BorraDisplay() {
	
	//borra el display
	document.FormCalc.Display.value = "0"
	document.FormCalc.Indicador.value = "  "
	
	//inicializa variables
	OpA = 0
	OpB = 0

	//actualiza flags
	Escribiendo = false
	HayOperandoA = false
	HayResultado = false
	ACero = true
}

function ObtieneOperador(FormCalc, Digito) {

	//si hay operando A y no hay resultado puede calcular ya
	if ( HayOperandoA && (!HayResultado) )
		Calcula(FormCalc)

	//obtiene el operador a utilizar
	Operador = Digito

	//borra el indicador de signo antiguo y pone el nuevo
	FormCalc.Indicador.value = FormCalc.Indicador.value.substring(0,1)
	FormCalc.Indicador.value += " " + Digito

	//guarda operando A
	OpA = FormCalc.Display.value

	//actualiza flags
	Escribiendo = false
	HayOperandoA = true
	HayResultado = false
	ACero = false
}

function Calcula(FormCalc) {
	//realiza la operacion y escribe el resultado

	//borra el indicador
	FormCalc.Indicador.value = FormCalc.Indicador.value.substring(0,1)

	//guarda operando B
	OpB = "(" + FormCalc.Display.value +")"		//los parentesis evitan error A - -B

	//obtiene string de operacion
	var Operacion = new String()
	Operacion = OpA + Operador + OpB

	//evalua string
	Resultado = eval(Operacion)

	//escribe el resultado y se lo asigna al operando A
	FormCalc.Display.value = Resultado
	OpA = FormCalc.Display.value

	//actualiza flags
	Escribiendo = false
	HayOperandoA = true
	HayResultado = true
	ACero = false
}

function EscribeDigito(FormCalc, Digito) {
	//escribe un digito en el formulario
	if (Escribiendo)
		FormCalc.Display.value += Digito
	else {
		FormCalc.Display.value = Digito
		Escribiendo = true
		ACero = false
	}
}

function CambiaSigno(FormCalc) {
	//cambia el signo del display
	if (ACero)
		return
	else {
		if (FormCalc.Display.value.substring(0,1) == '-')
			FormCalc.Display.value = FormCalc.Display.value.substring(1, FormCalc.Display.value.length)
		else
			FormCalc.Display.value = '-' + FormCalc.Display.value
	}
}

function GuardaMemoria(FormCalc) {
	Memoria += eval(FormCalc.Display.value)
	FormCalc.Indicador.value = "M" + FormCalc.Indicador.value.substring(1,3)
}

function RecuerdaMemoria(FormCalc) {
	FormCalc.Display.value = Memoria
}

function BorraMemoria(FormCalc) {
	Memoria = 0
	FormCalc.Indicador.value = " " + 	FormCalc.Indicador.value.substring(1,3)
}

window.onload = BorraDisplay
if (document.captureEvents) {			//N4 requiere invocar la funcion captureEvents
	document.captureEvents(Event.LOAD)
}



</script>