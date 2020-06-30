const vx = document.querySelector('#valx')
const vy = document.querySelector('#valy')
const nVx = document.querySelector('#nValx')
const nVy = document.querySelector('#nValy')
const btR = document.querySelector('#btCalcR')

const rCorrelacao = document.querySelector('#rCorrelacao')
const rRegressao = document.querySelector('#rRegressao')
const bt = document.querySelector('#btCalcUniform')
const pontoF = document.querySelector('#pontoF')

btR.onclick = () => {
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
	console.log('SomaX ' + somaX)
	console.log('x2 ' + x2)
	
	for( i of Vy){
		somaY += Number(i)
		y2.push( i**2 )
		somaY2 += i**2
	}

	for( i in Vx){
		xy.push( Vx[i] * Vy[i] )
		somaXY += Vx[i] * Vy[i]
	}
	console.log('SomaX ' + somaX)
	console.log('SomaY ' + somaY)
	console.log('somaX2 ' + somaX2)
	console.log('somaY2 ' + somaY2)
	console.log('somaXY '+ somaXY)

	a = Vx.length * somaXY - somaX * somaY
	b = Math.sqrt(  Vx.length * somaX2 - somaX ** 2  ) * Math.sqrt( Vx.length * somaY2 - somaY **2 )
	//let resultado =  (Vx.length * somaXY ) - (somaX * somaY) / Math.sqrt( (Vx.length * somaX2) - (somaX ** 2) ) * Math.sqrt( (Vx.length * somaY2) - (somaY **2) )
	let resultado = a / b
	console.log('-->' + Vx.length )
	console.log('R '+ resultado)

}