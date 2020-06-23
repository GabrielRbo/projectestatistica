const opCalc = document.getElementsByName('CalcProb')

$(opCalc[0]).click(function () {
    $('#calcBinomial.escondido').css("display","block")
    
    document.getElementById('calcNormal').style.display = 'none'
    $('#calcNormal :input').val('');
    document.getElementById('calcUniforme').style.display = 'none'
    $('#calcUniforme :input').val('');
    
})

$(opCalc[1]).click(function () {
    $('#calcNormal.escondido').css("display","block")

    document.getElementById('calcBinomial').style.display = 'none'
    $('#calcBinomial :input').val('');
    document.getElementById('calcUniforme').style.display = 'none'
    $('#calcUniforme :input').val('');
})

$(opCalc[2]).click(function () {
    $('#calcUniforme.escondido').css("display","block")

    document.getElementById('calcNormal').style.display = 'none'
    $('#calcNormal :input').val('');
    document.getElementById('calcBinomial').style.display = 'none'
    $('#calcBinomial :input').val('');
}) 

//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
const btBinomial = document.querySelector('#btCalcBino')

function fatorial(n){
    let soma = 1
    for (i = 1; i <= n; i++){
        soma *= i
    }
    return soma
} 

function prob (n, k){
    return fatorial(n) / ( fatorial(n - k) * fatorial(k) )
}

function media( n, p ){
    return n * p
}

function desvioPadra (n, p, q){
    return Math.sqrt( n * p * q )
}

btBinomial.onclick = () => {
    const tabP = document.querySelector('#tabProb')
    const tabM = document.querySelector('#tabMedia')
    const tabD = document.querySelector('#tabDesvio')
    const tabV = document.querySelector('#tabCoefVari')

    const eleN = document.querySelector('#elementoN')
    const eleP = document.querySelector('#elementoP')
    const eleQ = document.querySelector('#elementoQ')
    const eleK = document.querySelector('#elementoK')

    let n = eleN.value
    let p = eleP.value
    let q = eleQ.value
    let k = eleK.value

    tabP.innerHTML = prob(n, k)
    tabM.innerHTML = media(n, p).toFixed(2)
    tabD.innerHTML = desvioPadra(n, p, q).toFixed(2)
    tabV.innerHTML = (( desvioPadra(n, p, q) / media(n, p) ) * 100).toFixed(2)

}



//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
const btNormal = document.querySelector('#btCalcNormal')
const btUniform = document.querySelector('#btCalcUniform')