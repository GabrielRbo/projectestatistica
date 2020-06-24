// pega os elementos da pagina
const tipoCalculo = document.getElementsByName('calculoSelecionado')
const mostraDiv = document.querySelector('#ordemVer')
const localDaTabela = document.querySelector(`#calculoNominal`)
const NomeTabela = document.querySelector('#variavelNome')
const nomeVariavel = document.querySelector('#nomeVariavel')
const dadosVariavel = document.querySelector('#dadosVariavel')
const corpoTabela = document.querySelector('#corpo')
const corpoTabela2 = document.querySelector('#corpo2')
const corpoTabela3 = document.querySelector('#corpo3')
const divGrafico = document.querySelector('#graficoC')
const uploadBt = document.querySelector('#botaoUpload')
const amostraT = document.querySelector('#tipoAmostra')
const populacaoT = document.querySelector('#tipoPopulacao')

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
	let vetorComDados = nomeVariavel.value.split(';')

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
            	// categoryPercentage: 1.3,
            	ticks: {
		            max: 50,
		            min: 0,
		            stepSize: 50,
        		}
            	// stacked: true,
            	// width: 100,
            	
            	
            },{
            	display: true,
            	categoryPercentage: 1.3,
            }],

           
        }
    }
});
}

// essa funcao que é chamada quando clica no botao 
function gerarTabela(){
	vetorSeparetriz = []
	vetorResulGraf = []
	tituloGrafico = nomeVariavel.value // passar para o final
	legendaGrafico = []
	corpoTabela2.innerHTML = ``
	corpoTabela3.innerHTML = ''
	desvioP = []
	desvioP2 = []
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
			alert('A ordem nao pode ficar vazia!')
			ordemInput.focus()
			return
		}
	}

	NomeTabela.innerHTML = nomeVariavel.value
	localDaTabela.style.display = 'block'

	let dados = dadosVariavel.value.split(',')
	selectionSort(dados)
	// let dados = dadosVariavel.value.split(';')
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

			vetorSeparetriz.push( [ item, sep[item], fac ] )

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
		Li = 0
		pos = 0
		q = 0
		vLi = cont * qualValor.value / 100

		for( i of vetorSeparetriz ){
			
			if ( vLi <= i[2] && vLi >= q ){
				Li = vetorSeparetriz[ pos ][0]
				pos1 = pos
			}
			q = i[2]
			pos += 1
		}

		corpoTabela3.innerHTML = `<tr> <td></td> <td>asdf</td> <td>${Li}</td> </tr>`



		// FIM TABELA NOMINAL
	
	}else if( tipoCalculo[1].checked ){
		// ADD OS VALORES NA TABELA ORDINAL
		let ordemInput = document.querySelector('#ordem').value.split(';')
		ordemInput = ordemInput.filter( (este, i) => ordemInput.indexOf(este) === i )



		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		ordemInput.forEach( item => {
			item = item.replace(/\s/g, '') // fazer testes
			fac += sep[item]
			facP += sep[item] / totPor * 100
			vetorSeparetriz.push( [item, sep[item], fac] )
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> <td>${(sep[item] / totPor * 100).toFixed(2) }%</td> <td> ${fac} </td> <td>${ facP.toFixed(2) }</td> </tr>`
			cont += sep[item]
			// Manda grafico
			legendaGrafico.push(`${ item }`)
			vetorResulGraf.push(`${sep[item]}`)
			tipoGrafico = 'pie'
			
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		

		//------------------------------------------------
		Li = 0
		pos = 0
		q = 0
		vLi = cont * qualValor.value / 100
	
		for( i of vetorSeparetriz ){
		
			if ( vLi <= i[2] && vLi >= q ){
				Li = vetorSeparetriz[ pos ][0]
				pos1 = pos
	
			}
			q = i[2]
			pos += 1
		}

		corpoTabela3.innerHTML = `<tr> <td></td> <td>asdf</td> <td>${Li}</td> </tr>`





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

			vetorSeparetriz.push([item, sep[item], fac])
			desvioP.push(item)
			desvioP2.push(sep[item])
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
	
		corpoTabela2.innerHTML += ` <tr> <td></td> <td>${(media / cont).toFixed(2)}</td> <td>${moda2}</td> <td>${rMediana}</td> </tr> ` 
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
			
		//--- PORCENTIL ---\\
		Li = 0
		pos = 0
		q = 0
		vLi = cont * qualValor.value / 100
	
		for( i of vetorSeparetriz ){
	
			if ( vLi <= i[2] && vLi >= q ){
				Li = vetorSeparetriz[ pos ][0]
				pos1 = pos
			}
			q = i[2]
			pos += 1
		}


		m = (media / cont).toFixed(2)
		if( amostraT.checked ){

			soma = 0
			for(i of desvioP){
				soma += (((i - m) ** 2) * desvioP2[desvioP.indexOf(i)]) / (cont - 1)
			}
		
			dp = Math.sqrt(soma)
			cv = (dp / m) * 100 

		}else if( populacaoT.checked ){
			
			soma = 0
			for(i of desvioP){
				soma += (((i - m) ** 2) * desvioP2[desvioP.indexOf(i)]) / cont
			}
		
			dp = Math.sqrt(soma)
			cv = (dp / m) * 100 
		}
		corpoTabela3.innerHTML = `<tr> <td></td> <td>${dp}</td> <td>${cv}</td> <td>${Li}</td> </tr>`
		// FIM TABELA DISCRETA

	}else if( tipoCalculo[3].checked ){
		// ADD OS VALORES NA TABELA CONTINUA
		desvioP = []
		desvioP2 = []
		
		// 1°passo
		let min = Number( dados[0] )
		let max = Number( dados[0] )

		dados.forEach( item => {
			if( Number(item) > max ) max = item
			if( min > item ){
				min = item
			} 

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
			let ic1 = at / k
			let ic2 = at / kmais
			let ic3 = at / kmenos
			if( Number.isInteger(ic1) ){
				ic = ic1
				linha = k
				inteiro = false
			}
			 if( Number.isInteger(ic2) ){
				ic = ic2
				linha = kmais
				inteiro = false
			}
			 if ( Number.isInteger(ic3) ){
				ic = ic3
				linha = kmenos
				inteiro = false
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

			vet.push(fac)
			vet2.push( [Math.round(min), Math.round(min + ic), totVet[i], fac] )
			desvioP.push(totVet[i])
			desvioP2.push(fac)
			vetorSeparetriz.push( [ Math.round(min), Math.round(min + ic), totVet[i], fac ] )
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

		fi = cont
		i = vet2[mediana1][0]
		fant = vet2[mediana1 - 1][3]
		fimd = vet2[mediana1][2]
		h = vet2[mediana1][1] - vet2[mediana1][0]
		rMediana = i + (((fi/2)-fant)/fimd)*h
		// alert(rMediana)
		corpoTabela2.innerHTML += ` <tr> <td></td> <td>${ (contMedia / cont).toFixed(2)}</td> <td>${moda}</td> <td>${rMediana.toFixed(2)}</td> </tr>   `
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> <td id='total'>100%</td> <td id='total'></td> <td id='total'></td> </tr>`
		

		//--------------------------------------------------------
		Li = 0
		pos = 0
		q = 0
		vLi = cont * qualValor.value / 100
		for( i of vetorSeparetriz ){
			if ( vLi <= i[3] && vLi >= q ){
				Li = vetorSeparetriz[ pos ]
				pos1 = pos
			}
			q = i[3]
			pos += 1
		}

		l = Li[0]
		// vli

		if(vetorSeparetriz[pos - 1][3] == undefined){
			posFacAnt = 0
		}else {
			posFacAnt = vetorSeparetriz[pos - 1][3]
		}

		fi = Li[3]
		h = Li[1] - Li[0]

		resultS = l + (( vLi - posFacAnt ) / fi) * h

		soma = 0
		m = (contMedia / cont).toFixed(2)
		dp = 0
		cv = 0
		if( amostraT.checked ){

			for(i of desvioP){
				soma += ((i - m) ** 2) * desvioP2[ desvioP.indexOf(i) ] 
			}


			dp = Math.sqrt( (soma / cont - 1) )
			cv = (dp/m) * 100
		}
			
		}else if( populacaoT.checked ){
			
			for(i of desvioP){
				soma += ((i - m) ** 2) * desvioP2[ desvioP.index(i) ] 
			}


			dp = Math.sqrt( (soma / cont) )
			cv = dp/m * 100
		}

    // ErroTabela
		corpoTabela3.innerHTML = `<tr> <td></td> <td>${cv.toFixed(2)}</td> <td>${dp.toFixed(2)}</td> <td>${resultS.toFixed(2)}</td> </tr>`

		// FIM TABELA CONTINUA
	// }
	
	// FINAL DO GRÁFICO
}

	
// pega o clique do botao 
document.querySelector('#BotaoCalcular').onclick = e => {
	// evento do botao
	// legendaGrafico.slice(0, 0, 0)

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

//------------------------------------------------------------
quartil = document.querySelector('#quartil')
quintil = document.querySelector('#quintil')
decil = document.querySelector('#decil')
porcentil = document.querySelector('#porcentil')
qualValor = document.querySelector('#qualValor')
porce = document.querySelector('#porcentagem')

qualValor.onchange = () => {
	if(quartil.checked){
		if (porce.value == '25%'){
			porce.value = `Q1`
		}else if (porce.value == '50%'){
			porce.value = `Q2`
		}else if (porce.value == '75%'){
			porce.value = `Q3`
		}else if (porce.value == '100%'){
			porce.value = `Q4`
		}
	}

	if(quintil.checked){
		if (porce.value == '20%'){
			porce.value = `k1`
		}else if (porce.value == '40%'){
			porce.value = `k2`
		}else if (porce.value == '60%'){
			porce.value = `k3`
		}else if (porce.value == '80%'){
			porce.value = `k4`
		}else if (porce.value == '100%'){
			porce.value = `k5`
		}
	}

	if( decil.checked ){
		porce.value = `D${Number(porce.value.slice(0, -1))/10}`
		
	}

	if(porcentil.checked){
		porce.value = `P${porce.value.slice(0, -1)}`
	}

}

quartil.onchange = () => {
	if (quartil.checked){
		qualValor.step = 25
		porce.value = 0
		qualValor.value = 0
	}
}

quintil.onchange = () => {
	if (quintil.checked){
		qualValor.step = 20
		porce.value = 0
		qualValor.value = 0
	}
}

decil.onchange = () => {
	if (decil.checked){
		qualValor.step = 10
		porce.value = 0
		qualValor.value = 0
	}
}

porcentil.onchange = () => {
	if (porcentil.checked){
		qualValor.step = 1
		porce.value = 0
		qualValor.value = 0
	}
}

function Separatriz(quartil, quintil, decil, porcentil){
	if (quartil.checked){
		qualValor.step = 25
	}
}

//------------------------------------------------------------