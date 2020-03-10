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

//--------------------------------------------------------------
const tipoCalculo = document.getElementsByName('calculoSelecionado')
const mostraDiv = document.querySelector('#ordemVer')
const tirarTabela = document.querySelector(`#calculoNominal`)

if (tipoCalculo[1].checked) mostraDiv.style.display = 'block'
tipoCalculo[1].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'block'
		tirarTabela.style.display = 'none'
	}
}

tipoCalculo[0].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'none'
		tirarTabela.style.display = 'none'
	}
}

tipoCalculo[2].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'none'
		tirarTabela.style.display = 'none'
	}
}

tipoCalculo[3].onchange = e => {
	if( e.isTrusted ){
		mostraDiv.style.display = 'none'
		tirarTabela.style.display = 'none'
	}
}

//--------------------------------------------------------------
// const localDaTabela = document.querySelector(`#$calculoNominal`)
// tirarTabela.style.display = 'none'

function nominal(nomeVariavelTabela, localDaTabelaSite){
	const tipoCalculo = document.getElementsByName('calculoSelecionado')

	const localDaTabela = document.querySelector(`#${localDaTabelaSite}`)
	const NomeTabela = document.querySelector('#variavelNome')
	const nomeVariavel = document.querySelector('#nomeVariavel')

	NomeTabela.innerHTML = nomeVariavel.value
	localDaTabela.style.display = 'block'


	const dadosVariavel = document.querySelector('#dadosVariavel')
	let dados = dadosVariavel.value.split(',')
	let dadosSeparados = []

	// SEPARA E CONTAS OS ELEMENTOS(DO CAMPO -> DADOS DA VARIAVEL)
	let sep = dados.reduce( (obj, item) => {
		// console.log(obj, item)
		if(!obj[item]){
			obj[item] = 1
		}else {
			obj[item]++
		}
		return obj
	}, {} )

	if( tipoCalculo[0].checked ){
		// ADD OS VALORES NA TABELA NOMINAL
		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		Object.keys(sep).forEach( item => {
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> </tr>`
			cont += sep[item]
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> </tr>`
		// FIM TABELA NOMINAL

	}else if( tipoCalculo[1].checked ){
		// ADD OS VALORES NA TABELA ORDINAL
		let ordemInput = document.querySelector('#ordem').value.split(',')
		ordemInput = ordemInput.filter( (este, i) => ordemInput.indexOf(este) === i )

		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		ordemInput.forEach( item => {
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> </tr>`
			cont += sep[item]
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> </tr>`
		// FIM TABELA ORDINAL

	}else if( tipoCalculo[2].checked ){
		// ADD OS VALORES NA TABELA DISCRETA
		const corpoTabela = document.querySelector('#corpo')
		corpoTabela.innerHTML = ``
		cont = 0 
		Object.keys(sep).forEach( item => {
			corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> </tr>`
			cont += sep[item]
		})
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> </tr>`
		// FIM TABELA NOMINAL
		alert('Verificar com a prof pois essa nao foi entendida')
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
		let at = max - min

		// 2°passo
		let k = Math.sqrt( dados.length ) // raiz quadrada do total dos elementos
		console.log(`kkkk ${k} ${k - 1} ${k + 1}`)

		// FIM TABELA CONTINUA
	}


}




// pega o clique do botao 
document.querySelector('#BotaoCalcular').onclick = e => {
	// evento do botao
	// const nomeVarialvel = document.querySelector("#nomeVariavel")
	// const checkAmostra = document.getElementsByName('tipoCalculado')
	// const dadosVariavel = document.querySelector('#dadosVariavel')
	const tipoCalculo = document.getElementsByName('calculoSelecionado')

	nominal('nomeVariavel', 'calculoNominal')

	// if( tipoCalculo[0].checked ){
	// 	nominal('nomeVariavel', 'calculoNominal')
	// 	// alert('Qualitativa Nominal')

	// }else if( tipoCalculo[1].checked ){
	// 	alert(' Qualitativa Ordinal ')

	// }else if( tipoCalculo[2].checked ){
	// 	alert(' Quantitativa Discreta ')

	// }else if( tipoCalculo[3].checked ){
	// 	alert('Quantitativa Continua ')

	// }
}