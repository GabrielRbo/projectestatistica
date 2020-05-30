// pega os elementos da pagina
const tipoCalculo = document.getElementsByName('calculoSelecionado')
const mostraDiv = document.querySelector('#ordemVer')
const localDaTabela = document.querySelector(`#calculoNominal`)
const NomeTabela = document.querySelector('#variavelNome')
const nomeVariavel = document.querySelector('#nomeVariavel')
const dadosVariavel = document.querySelector('#dadosVariavel')
const corpoTabela = document.querySelector('#corpo')
const corpoTabela2 = document.querySelector('#corpo2')
const divGrafico = document.querySelector('#graficoC')
const uploadBt = document.querySelector('#botaoUpload')

// variaveis para gerar os dados do grafico
let localGrafico = 'myChart'
let tipoGrafico
let vetorResulGraf = []
let tituloGrafico = nomeVariavel.value // passar para o final
let legendaGrafico = []


//--------------------------------------------------------------
// se clicar no tipo de calculo esconde a tabela e o input de ordem
if (tipoCalculo[1].checked) mostraDiv.style.display = 'block'
tipoCalculo[1].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'block'
		localDaTabela.style.display = 'none'
	}
}

tipoCalculo[0].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'none'
		localDaTabela.style.display = 'none'
	}
}

tipoCalculo[2].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'none'
		localDaTabela.style.display = 'none'
	}
}

tipoCalculo[3].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'none'
		localDaTabela.style.display = 'none'
	}
}

function mediana(come, fim){
	vet = []
	for(i=come; i <= fim; i++){
		vet.push(i)
	}
	if( (vet.length % 2) == 0 ){
		return ( vet[vet.length / 2] + vet[ (vet.length / 2) -1 ] ) / 2
	}else{
		return vet[Math.floor(vet.length / 2)]
	}
}

var corGraphic = new Array();
// gera uma cor aleatória em hexadecimal
function gera_cor(){
    var hexadecimais = '0123456789ABCDEF';
	for (var t = 0; t < vetorResulGraf.length; t++) {
		var cor = '#'
		
		// Pega um número aleatório no array acima
    	for (var i = 0; i < 6; i++ ) {
    		//E concatena à variável cor
			cor += hexadecimais[Math.floor(Math.random() * 16)];
		}
		corGraphic.push(cor);	
	}
	return corGraphic;
}

function geraGrafico(localGrafico, tipoGrafico, vetorValores, titulo, legenda){
	var graphic = document.getElementById(localGrafico).getContext('2d');

	var myChart = new Chart(graphic, {
		type: tipoGrafico,
    data: {
        labels: legenda,
        datasets: [{
            label: `${titulo}`,
            data: vetorValores,
            backgroundColor: corGraphic,
            borderColor: corGraphic,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

function geraGrafico2(localGrafico, tipoGrafico, vetorValores, titulo, legenda){
	var graphic = document.getElementById(localGrafico).getContext('2d');

	var myChart = new Chart(graphic, {
		type: tipoGrafico,
    data: {
        labels: legenda,
        datasets: [{
            label: `${titulo}`,
            data: vetorValores,
            backgroundColor: corGraphic,
            borderColor: corGraphic,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
            	
            	display:false,
            	barPercentage: 1.3,
            	
            },{
            	display: true,
            }],

           
        }
    }
});
}

// essa funcao que é chamada quando clica no botao 
function gerarTabela(){
	vetorResulGraf = []
	tituloGrafico = nomeVariavel.value // passar para o final
	legendaGrafico = []
	corpoTabela2.innerHTML = ``
	//Zera a div do grafico
	graficoC.innerHTML = ''
	//Add o canvas na div igual fizemos na tebela
	graficoC.innerHTML = `<canvas id="myChart" width= "640" height= "350" class="chartjs-render-monitor " style="display:block; width: 100px; height: 100px;"></canvas>`
	//--------------------------------------------------------------
	// validacao precisa aprimorar
	if ( nomeVariavel.value.length < 3 ){
		alert('Nome da variavel deve ter no minimo 3 caracteres!')
		nomeVariavel.focus()
		return
	}

	if ( dadosVariavel.value.length < 1 ){
		alert('O dados da variavel nao poder estar vazio')
		dadosVariavel.focus()
		return
	}

	if ( tipoCalculo[1].checked ){
		let ordemInput = document.querySelector('#ordem')
		if ( ordemInput.value.length < 1 ){
			alert('A ordem nao pode ficar fazia!')
			ordemInput.focus()
			return
		}
	}

	NomeTabela.innerHTML = nomeVariavel.value
	localDaTabela.style.display = 'block'


	let dados = dadosVariavel.value.split(',')
	let dadosSeparados = []

	// SEPARA E CONTAS OS ELEMENTOS(DO CAMPO -> DADOS DA VARIAVEL)
	let sep = dados.reduce( (obj, item) => {
		item = item.replace(/\s/g, '')// tira os espacos
		if(!obj[item]){
			obj[item] = 1
		}else {
			obj[item]++
		}
		return obj
	}, {} )


	let totPor = 0
	let fac = 0
	let facP = 0

	// limpar vetor de valores que gera no gráfico
	

	//pega o total separado
	Object.keys(sep).forEach( item => {
		totPor += sep[item]
	})
	if( tipoCalculo[0].checked ){
		// ADD OS VALORES NA TABELA NOMINAL
		corpoTabela.innerHTML = ``
		cont = 0 
		let amostra = 0
		moda = 0
		moda1 = []
  
		Object.keys(sep).forEach( item => {
			amostra ++
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td>${fac}</td> <td>${ facP.toFixed(2) }%</td> </tr>`
			cont += sep[item]
			// MANDA OS VALORES PROS GRAFICOS
			legendaGrafico.push(`${ item }`)
			vetorResulGraf.push(`${sep[item]}`)
			tipoGrafico = 'pie'

			if( sep[item] > moda ){
				moda1 = []
				moda1.push(item)
				moda = sep[item]
			}else if( sep[item] == moda ){
				moda1.push(item)
			}
			
			
		// WILL AQUI QUE ESTA PEGANDO, o valor porcentagem / precisa pegar e jogar no vetor 
		})
		corpoTabela2.innerHTML += `<tr></tr><td></td> <td>${ (cont/amostra).toFixed(2) }</td> <td>${moda1}</td> </tr>`
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id="total"> 100% </td> <td id="total"> </td> <td id="total"> </td> </tr>`
		// FIM TABELA NOMINAL
	
	}else if( tipoCalculo[1].checked ){
		// ADD OS VALORES NA TABELA ORDINAL
		let ordemInput = document.querySelector('#ordem').value.split(',')
		ordemInput = ordemInput.filter( (este, i) => ordemInput.indexOf(este) === i )



		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		ordemInput.forEach( item => {
			item = item.replace(/\s/g, '') // fazer testes
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
			// Manda grafico
			legendaGrafico.push(`${ item }`)
			vetorResulGraf.push(`${sep[item]}`)
			tipoGrafico = 'pie'
			
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		// FIM TABELA ORDINAL

	}else if( tipoCalculo[2].checked ){
		// ADD OS VALORES NA TABELA DISCRETA
		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		let media = 0
		let moda = 0
		let moda1 = 0
		let moda2 = []
		let vet = [1]
		let vet2 = []
		Object.keys(sep).forEach( item => {
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
			media += item * sep[item]

			vet.push(fac)
			vet2.push(item)
	
			if( sep[item] > moda ){
				moda = sep[item]
				moda1 = (item)
				moda2 = []
				moda2.push(`${moda1} `)
			}else if( sep[item] == moda ){
				moda2.push(`${item} `)
			}

			// Manda grafico
			legendaGrafico.push(`${ item }`)
			vetorResulGraf.push(`${sep[item]}`)
			tipoGrafico = 'bar'
			
		})

		let aux = 0
		let aux2 = 1
		let mediana = 0
		let meio = cont / 2
		for(i of vet){
			if(meio > vet[aux] && meio < vet[aux2]){
				mediana = vet.indexOf( vet[aux2] )
			}
			aux += 1
			aux2 += 1
		}


		let rMediana = vet2[mediana -1]	
		console.log('media ' + media + 'cont ' + cont)	
		corpoTabela2.innerHTML += ` <tr> <td></td> <td>${(media / cont).toFixed(2)}</td> <td>${moda2}</td> <td>${rMediana}<td> <tr> ` 
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		
		// FIM TABELA DISCRETA

	}else if( tipoCalculo[3].checked ){
		// ADD OS VALORES NA TABELA CONTINUA
		
		// 1°passo
		let min = Number( dados[0] )
		let max = Number( dados[0] )
	// console.log('----antes----->', min)
		dados.forEach( item => {
			if( Number(item) > max ) max = item
			if( min > item ){
				min = item
				// console.log('sim ' + min + ' item ' + item)
			} 
			// console.log(item)
		} )
		// console.log('min -->', min)
		// console.log('---------->', min)
		let at = (max - min)
		
		// 2°passo
		let k = Number( Math.sqrt( dados.length ).toString()[0] ) // raiz quadrada do total dos elementos
		let kmais = k + 1
		let kmenos = k - 1
		// console.log(k)
		//3°passo
		let inteiro = true
		let ic
		let linha
		// ---------------------------------------------------------------------
		// ficou mais pequeno
		while( inteiro ){
			let ic1 = at / k
			let ic2 = at / kmais
			let ic3 = at / kmenos
			if( Number.isInteger(ic1) ){
				ic = ic1
				linha = k
				inteiro = false
				console.log('at ' + at + ' ic ' + ic)
			}
			 if( Number.isInteger(ic2) ){
				ic = ic2
				linha = kmais
				inteiro = false
				console.log('at ' + at + ' ic ' + ic)
			}
			 if ( Number.isInteger(ic3) ){
				ic = ic3
				linha = kmenos
				inteiro = false
				console.log(' at ' + at + ' ic ' + ic)
			}
			at += 1
		}
		
		corpoTabela.innerHTML = ''
		
		cont = 0
		ic = Number(ic)
		min = Number(min)

		let tot = 0
		let totVet = []

		let minAux = min

		for(i = 0; i < linha; i++){
			tot = 0
			dados.forEach( (item) => {
				if(Number(item) >= minAux && Number(item) < (minAux + ic) ){
					tot += 1
				}
			})
			minAux += ic
			totVet.push(tot)
		}
		
		

		//pega o total separado
		// let totPor = 0
		// console.log('total', totPor)
		// Object.keys(sep).forEach( item => {
		// 	totPor += sep[item]
		// })
		vetorResulGraf.push(`${ Math.round(min) }`)
		legendaGrafico.push(`${ Math.round(min) }`)
		
		let moda = 0
		let compModa = 0
		let contMedia = 0
		let vet = []
		let vet2 = []
		for(let i = 0; i < linha; i++) {
			fiP = totVet[i] / totPor * 100
			fac += totVet[i] 
			facP += fiP
			let valor1 = Math.round(min)
			let valor2 = Math.round(min + ic)
			let valor3 = totVet[i]
			let media = mediana(valor1, valor2)

			contMedia += valor3 * media

			if(valor3 > compModa){
				compModa = valor3
				moda = media
			}

			// console.log(min)
			vet.push(fac)
			vet2.push( [Math.round(min), Math.round(min + ic), totVet[i], fac] )

			corpoTabela.innerHTML += `<tr> <td>${Math.round(min)} |---- ${Math.round(min + ic)}</td> <td>${totVet[i]}</td> <td>${fiP.toFixed(2)}</td> <td>${fac}</td> <td>${facP.toFixed(2)}</td> </tr>`
			cont += totVet[i]
			min += ic

			// Manda grafico
			legendaGrafico.push(`${ Math.round(min) }`)
			vetorResulGraf.push(`${ Math.round(min + ic) }`)
			tipoGrafico = 'bar'
			
		}
		// mediana media moda
		let meio = cont / 2
		let aux = 0
		let aux2 =1
		let mediana1 = 0
		for(i of vet){
			if( meio > vet[aux] && meio < vet[aux2] ){
				mediana1 = vet.indexOf(vet[aux2])
			}
			aux += 1
			aux2 += 1
		}
		// alert(mediana1)
		// console.log(vet2)
		fi = cont
		i = vet2[mediana1][0]
		fant = vet2[mediana1 - 1][3]
		fimd = vet2[mediana1][2]
		h = vet2[mediana1][1] - vet2[mediana1][0]
		rMediana = i + (((fi/2)-fant)/fimd)*h
		// alert(rMediana)
		corpoTabela2.innerHTML += ` <tr> <td></td> <td>${ (contMedia / cont).toFixed(2)}</td> <td>${moda}</td> <td>${rMediana.toFixed(4)}</td> </tr>   `
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		
		// FIM TABELA CONTINUA
	}
	
	// FINAL DO GRÁFICO
}

	
// pega o clique do botao 
document.querySelector('#BotaoCalcular').onclick = e => {
	// evento do botao
	gerarTabela()
	gera_cor()
	if( tipoCalculo[3].checked ){
		geraGrafico2(localGrafico, tipoGrafico, vetorResulGraf, tituloGrafico, legendaGrafico)
	}else{
		geraGrafico(localGrafico, tipoGrafico, vetorResulGraf, tituloGrafico, legendaGrafico)
	}
}

// APENAS PARA LEMBRAR DE COMO CONTAR NAO MEXER
function contaVetor(vetor){
	vetor.reduce( (obj, item) => {
		console.log(obj, item)
		if(!obj[item]){
			obj[item] = 1

		}else {
			obj[item]++

		}

		return obj
	}, {} )
}
// APENAS PARA LEMBRAR DE COMO CONTAR NAO MEXER

// UPLOAD
const f = document.querySelector('#file')
uploadBt.onchange = event => {
	a = new FileReader()
	file = event.target.files[0]
	
	a.onload = e => {
		// f.innerHTML = a.result.split('\n')
		vetorCSV = a.result
		vetorCSV = vetorCSV.substring(0, vetorCSV.length - 1) //remove a ultima ','
		vetorCSV = vetorCSV.split('\n')
		
		nomeVariavel.value = vetorCSV[0]
		dadosVariavel.value = vetorCSV.slice(1,)
	}
	
	a.readAsText(file) 

}

