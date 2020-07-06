const vx = document.querySelector('#valx')
const vy = document.querySelector('#valy')
const nVx = document.querySelector('#nValx')
const nVy = document.querySelector('#nValy')
const btR = document.querySelector('#btCalcR')
// const gf = document.querySelector('#btCalcR')

const rCorrelacao = document.querySelector('#rCorrelacao')
const rRegressao = document.querySelector('#rRegressao')
const bt = document.querySelector('#btCalcUniform')
const pontoF = document.querySelector('#pontoF')
let resultadoRegressao = 0
let fA = 0
let fB = 0


function encontrarPosMenor(vetor, posIni){
    let posMenor = posIni
    for (let i = posIni + 1; i < vetor.length; i++){
        if(vetor[i] < vetor[posMenor]) posMenor = i
    }
    return posMenor
}

function troca(vetor, i, j){
    let aux = vetor[i]
    vetor[i] = vetor[j]
    vetor[j] = aux
}

function selectionSort(vetor){
    for(let i = 0;  i < vetor.length - 1; i++){
        let posMenor = encontrarPosMenor(vetor, i + 1)
        if (vetor[posMenor] < vetor[i]) {
            troca(vetor, posMenor, i)
        }
    }
}
//add cor
let cor = []

label1 = ['Correlacao']
function grafico(dados, dadosG){

    var ctx = document.getElementById('gf').getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: label1,
                 data: dados, // dados
                 backgroundColor: cor,
            },{
            	type: 'line',
                data: dadosG,
                label: 'Linha',
                fill: false,
                borderColor:"#00008B",
                backgroundColor: "#00008B",
                showLine: true,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
}

let dadosGrafico = []
btR.onclick = () => {
	dadosGrafico = []
	for( i of vx.value.split(',') ){
		cor.push('#338FFFFF')
		console.log('i ', i)
	}
	document.querySelector('#graficos').innerHTML = `<canvas id="gf"></canvas>`
	let Vx = vx.value.split(',')
	let Vy = vy.value.split(',')
	let somaX = 0 //
	let somaY = 0 //
	let somaX2 = 0 //
	let somaY2 = 0 //
	let somaXY = 0 //
	let x2 = []
	let y2 = []
	let xy = []


	for(i of Vx){
		somaX += Number(i)
		x2.push( i**2 )
		somaX2 += i**2
	}
	
	for( i of Vy){
		somaY += Number(i)
		y2.push( i**2 )
		somaY2 += i**2
	}

	let maior = Vy[0]
	let menor = Vy[0]
	for( i in Vx){
		xy.push( Vx[i] * Vy[i] )
		somaXY += Vx[i] * Vy[i]
		dadosGrafico.push( {x: Vx[i] ,y: Vy[i] } )
	}

	//Correlacao
	a = Vx.length * somaXY - somaX * somaY
	b = Math.sqrt(  Vx.length * somaX2 - somaX ** 2  ) * Math.sqrt( Vx.length * somaY2 - somaY **2 )
	//let resultado =  (Vx.length * somaXY ) - (somaX * somaY) / Math.sqrt( (Vx.length * somaX2) - (somaX ** 2) ) * Math.sqrt( (Vx.length * somaY2) - (somaY **2) )
	let resultado = a / b
	
	//Regressao
	// aB1 = (Vx.length * somaXY - somaX * somaY)
	// aB2 = (Vx.length * somaX2 - somaX ** 2)
	B = (Vx.length * somaXY - somaX * somaY) / (Vx.length * somaX2 - somaX ** 2)

	A = (somaY - B * somaX) / Vx.length
	ar = A.toFixed(3)
	br = B.toFixed(4)
	if( Number(br) < 0){
		br = Number(br) * -1
	}
	reta = `${ar} + ${br} * x`

	//add tabela correlacao e regrecao
	rCorrelacao.innerHTML = resultado.toFixed(2)
	rRegressao.innerHTML = reta
	// resultadoRegressao = `${A.toFixed(3)} + ${B.toFixed(4)} * x`
	fA = A.toFixed(3)
	fB = B.toFixed(4)
	if( Number(fB) < 0){
		fB = Number(fB) * -1
	}
	
	auxData = []
	for ( i of Vy){
		auxData.push( Number(i) )
	}
	
	selectionSort(auxData)

	menor = auxData[0]
	maior = auxData.slice(-1)

	dataG = [{
        x:(menor - A ) / B , y: menor
    },{
        x:(maior - A ) / B , y: maior
    }]

	grafico(dadosGrafico, dataG)
}

//ponto futuro
bt.onclick = () => {
	resultadoRegressao = 0
	pontof = []
	if( nVx.value != "" ){
		resultadoRegressao = Number(fA) + Number(fB) * Number(nVx.value)
		pontof.push( {x:nVx.value, y:resultadoRegressao} )
	}else if( nVy.value != "" ){
		resultadoRegressao = ((nVy.value - fA) / fB).toFixed(0)
		pontof.push( {x:resultadoRegressao, y:nVy.value} )

	}
	dadosGrafico.push({x:pontof[0].x, y:pontof[0].y})
	cor.push('#FF0000FF')
	grafico(dadosGrafico, dataG)
	pontoF.innerHTML = resultadoRegressao
}