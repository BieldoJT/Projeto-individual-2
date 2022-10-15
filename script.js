$(document).ready(function () {
    var opcao = 0


    $("#Cifra-de-Cesar").click(function () {
        $(".texto-descritivo").css("display", "none");
        var fotoCesar = "img/Julio-Cesar.jpg"
        $("body").css("background-image", "url(" + fotoCesar + ")");
        $(".campo-texto").fadeIn(3000);
        $(".campo-texto").css("display", "flex");
        $(".incremento").css("display", "block");
        
        opcao = 1
        
    })
    $("#Base-64").click(function () {
        $(".texto-descritivo").css("display", "none");
        var fotoBase = "img/base64.png"
        $("body").css("background-image", "url(" + fotoBase + ")");
        $(".campo-texto").fadeIn(3000);
        $(".campo-texto").css("display", "flex");
        $(".incremento").css("display", "none");
        
        opcao = 2
    

    
    });
    jQuery(function($){
        $("#formulario").on("submit",function(e){
        e.preventDefault();}); // impedir o evento submit   
    });
    $("input[name='selecionar']").click(function(){
    var selecionado = $("input[name='selecionar']:checked").val();
    if (selecionado == "criptografar"){
        $("input[id='Enviar']").attr({
            "value":"Criptografar texto"
        })
    }
    else if (selecionado == "descriptografar"){
        $("input[id='Enviar']").attr({
            "value":"Descriptografar texto"})}
    });
    
    var rodar = document.getElementById("Enviar")
    rodar.addEventListener('click',function() {
    var valor = document.querySelector("input[name=selecionar]:checked").value
    if (opcao == 1){
        if (valor == "criptografar"){
            cifraCripto()
        }
        else {
            cifraDescripto()
        }
    }
    else if (opcao == 2){
        if (valor == "criptografar"){
            cripitografarB64()
        }
        else {
            descripitografarB64()
        }
    }
})
    
    
});


var resultado = document.getElementById("resultado");
var letraMaiuscula = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var letraMaiusculaInvert = "ZYXWVUTSRQPONMLKJIHGFEDCBA"
var letraMinuscula = "abcdefghijklmnopqrstuvwxyz"
var letraMinusculaInvert = "zyxwvutsrqonmlkjihgfedcba"
var numeros = "0123456789"
var numerosInvert = "9876543210"
var indexTexto = 0
var alterador = 0
function cifraCripto() {
    var texto = document.getElementById("texto").value;
    alterador = document.getElementById("incremento").value;
    alterador = parseInt(alterador)
    var cripto = ""
    for (var i = 0; i < texto.length; i++) {
        if (texto.charCodeAt(i) == 32) {
            cripto += " "
        }
        else if (letraMaiuscula.includes(texto[i])) {
            indexTexto = letraMaiuscula.indexOf(texto[i])
            console.log(indexTexto)
            var x = posicaoLetraCript(indexTexto)
            cripto += letraMaiuscula[x]
            
        }
        else if (letraMinuscula.includes(texto[i])) {
            indexTexto = letraMinuscula.indexOf(texto[i])
            var x = posicaoLetraCript(indexTexto)
            cripto += letraMinuscula[x]
        }
        else if (numeros.includes(texto[i])) {
            indexTexto = numeros.indexOf(texto[i])
            var x = posicaoNumCripto(indexTexto)
            cripto +=  numeros[x]
        }

        
        else {
            cripto += texto[i]
        }
    }
    console.log(cripto)
    console.log(alterador)
    resultado.textContent = cripto
}


//CONSERTAR O PROBLEMA DA DESCRIPTOGRAFIA 
// maior problema resolvido, falta ajeitar o bug de posição das letras
function cifraDescripto() {
    var texto = document.getElementById("texto").value;
    alterador = document.getElementById("incremento").value;
    alterador = parseInt(alterador)
    var cripto = ""
    for (var i = 0; i < texto.length; i++) {
        if (texto.charCodeAt(i) == 32) {
            cripto += " "
        }
        else if (letraMaiuscula.includes(texto[i])) {
            indexTexto = letraMaiuscula.indexOf(texto[i])
            var x = posicaoLetraDesript(indexTexto)
            cripto += letraMaiuscula[x]
        }
        else if (letraMinuscula.includes(texto[i])) {
            indexTexto = letraMinuscula.indexOf(texto[i])
            var x = posicaoLetraDesript(indexTexto)
            cripto +=  letraMinuscula[x]
        }
        else if (numeros.includes(texto[i])) {
            indexTexto = numeros.indexOf(texto[i])
            var x = posicaoNumDescripto(indexTexto)
            cripto += numeros[x]
        }
       
        else {
            cripto += texto[i]
        }
    }
    resultado.textContent = cripto
}






function posicaoLetraCript(index) {
    index += alterador
    if (index > 25) {
        index -= 26
        while(index > 25){
            index -= 26
        }
    }
    return index
}

function posicaoLetraDesript(index) {
    index -= alterador
    if (index < 0) {
        index += 26
        while(index < 0){
            index += 26
        }
    }
    return index

}

function posicaoNumCripto(i) {
    i  += alterador
    if (i > 9) {
        i -=  10;
        while(i > 9){
            i -=  10;
        }

    }
    return i;
}

function posicaoNumDescripto(i) {
    i  -= alterador
    if (i < 0) {
        i += 10;
        while(i < 0){
            i += 10;
        }
    }
    return i;
}

function cripitografarB64() {

    var textoInserido = document.getElementById("texto").value;
    var textoBase64 = btoa(textoInserido);
    resultado.textContent = textoBase64

}

function descripitografarB64() {
    var textoInserido = document.getElementById("texto").value;
    var textoDescript64 = atob(textoInserido);
    resultado.textContent = textoDescript64
}

