const opCalc = document.getElementsByName('CalcProb')

console.log(opCalc);


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