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

function grafico(dados, dadosG){

    var ctx = document.getElementById('gf').getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                 data: dados, // dados
                 backgroundColor: '#338FFFFF',
            },{
            	type: 'line',
                data: dadosG,
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

btR.onclick = () => {
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

	let dadosGrafico = []

	for(i of Vx){
		somaX += Number(i)
		x2.push( i**2 )
		somaX2 += i**2
	}
	console.log('SomaX ' + somaX)
	console.log('x2 ' + x2)
	
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
		if ( maior < Vy[i] ){
			maior = Vy[i]
		}
		if( menor > Vy[i] ){
			menor = Vy[i]
		}
	}
	console.log('SomaX ' + somaX)
	console.log('SomaY ' + somaY)
	console.log('somaX2 ' + somaX2)
	console.log('somaY2 ' + somaY2)
	console.log('somaXY '+ somaXY)

	//Correlacao
	a = Vx.length * somaXY - somaX * somaY
	b = Math.sqrt(  Vx.length * somaX2 - somaX ** 2  ) * Math.sqrt( Vx.length * somaY2 - somaY **2 )
	//let resultado =  (Vx.length * somaXY ) - (somaX * somaY) / Math.sqrt( (Vx.length * somaX2) - (somaX ** 2) ) * Math.sqrt( (Vx.length * somaY2) - (somaY **2) )
	let resultado = a / b
	
	//Regressao
	// aB1 = (Vx.length * somaXY - somaX * somaY)
	// aB2 = (Vx.length * somaX2 - somaX ** 2)
	B = (Vx.length * somaXY - somaX * somaY) / (Vx.length * somaX2 - somaX ** 2)
	console.log(B)

	A = (somaY - B * somaX) / Vx.length
	console.log('a' + A)

	reta = `${A.toFixed(3)} + ${B.toFixed(4)} * x`
	console.log('reta ' + reta)

	//add tabela correlacao e regrecao
	rCorrelacao.innerHTML = resultado
	rRegressao.innerHTML = reta

	dataG = [{
        x:(menor - A ) / B , y: menor
    },{
        x:(maior - A ) / B , y: maior
    }]


	grafico(dadosGrafico, dataG)
}