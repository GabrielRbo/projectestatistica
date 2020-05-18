// pega os elementos da pagina
const tipoCalculo = document.getElementsByName('calculoSelecionado')
const mostraDiv = document.querySelector('#ordemVer')
const localDaTabela = document.querySelector(`#calculoNominal`)
const NomeTabela = document.querySelector('#variavelNome')
const nomeVariavel = document.querySelector('#nomeVariavel')
const dadosVariavel = document.querySelector('#dadosVariavel')
const corpoTabela = document.querySelector('#corpo')

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

function geraGrafico(localGrafico, tipoGrafico, vetorValores, titulo, legenda){
	var graphic = document.getElementById(localGrafico).getContext('2d');

	var myChart = new Chart(graphic, {
		type: tipoGrafico,
    data: {
        labels: legenda,
        datasets: [{
            label: `${titulo}`,
            data: vetorValores,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
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
  
		Object.keys(sep).forEach( item => {
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td>${fac}</td> <td>${ facP.toFixed(2) }%</td> </tr>`
			cont += sep[item]
			// MANDA OS VALORES PROS GRAFICOS
			legendaGrafico.push(`${ item }`)
			vetorResulGraf.push(`${sep[item]}`)
			tipoGrafico = 'pie'
			
			
		// WILL AQUI QUE ESTA PEGANDO, o valor porcentagem / precisa pegar e jogar no vetor 
		})
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
		Object.keys(sep).forEach( item => {
			fac += sep[item]
			facP += sep[item] / totPor * 100
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
			// Manda grafico
			legendaGrafico.push(`${ item }`)
			vetorResulGraf.push(`${sep[item]}`)
			tipoGrafico = 'bar'
			
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		
		// FIM TABELA DISCRETA

	}else if( tipoCalculo[3].checked ){
		// ADD OS VALORES NA TABELA CONTINUA
		
		// 1°passo
		let min = Number( dados[0] )
		let max = Number( dados[0] )
		
		dados.forEach( item => {
			if( Number(item) > max ) max = item
			if( Number(item) < min ) min = item
		} )
		
		let at = (max - min)
		
		// 2°passo
		let k = Number( Math.sqrt( dados.length ).toString()[0] ) // raiz quadrada do total dos elementos
		let kmais = k + 1
		let kmenos = k - 1

		//3°passo
		let inteiro = true
		let ic
		let linha
		// ---------------------------------------------------------------------
		// ficou mais pequeno
		while( inteiro ){
			at += 1
			let ic1 = at / k
			let ic2 = at / kmais
			let ic3 = at / kmenos
			if( Number.isInteger(ic1) ){
				ic = ic1
				linha = k
				inteiro = false
			}else if( Number.isInteger(ic2) ){
				ic = ic2
				linha = kmais
				inteiro = false
			}else if ( Number.isInteger(ic3) ){
				ic = ic3
				linha = kmenos
				inteiro = false
			}
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
		for(let i = 0; i < linha; i++) {
			fiP = totVet[i] / totPor * 100
			fac += totVet[i] 
			facP += fiP
			corpoTabela.innerHTML += `<tr> <td>${Math.round(min)} |---- ${Math.round(min + ic)}</td> <td>${totVet[i]}</td> <td>${fiP.toFixed(2)}</td> <td>${fac}</td> <td>${facP.toFixed(2)}</td> </tr>`
			cont += totVet[i]
			min += ic

			// Manda grafico
			legendaGrafico.push(`${ Math.round(min) }`)
			vetorResulGraf.push(`${ Math.round(min + ic) }`)
			tipoGrafico = 'bar'
			
		}
		
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		
		// FIM TABELA CONTINUA
	}
	
	// FINAL DO GRÁFICO
}

	
// pega o clique do botao 
document.querySelector('#BotaoCalcular').onclick = e => {
	// evento do botao
	gerarTabela()
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