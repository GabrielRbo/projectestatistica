const opCalc = document.getElementsByName('CalcProb')

console.log(opCalc);


$(opCalc[0]).click(function () {
    $('#calcBinomial.escondido').css("display","block")
    
    document.getElementById('calcNormal').style.display = 'none'
    document.getElementById('calcUniforme').style.display = 'none'
    
})

$(opCalc[1]).click(function () {
    $('#calcNormal.escondido').css("display","block")

    document.getElementById('calcBinomial').style.display = 'none'
    document.getElementById('calcUniforme').style.display = 'none'
})

$(opCalc[2]).click(function () {
    $('#calcUniforme.escondido').css("display","block")

    document.getElementById('calcNormal').style.display = 'none'
    document.getElementById('calcBinomial').style.display = 'none'
})