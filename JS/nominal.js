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

function tabela(nomeVariavelTabela, localDaTabelaSite){
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

	// ADD OS VALORES NA TABELA
	const corpoTabela = document.querySelector('#corpo')
	corpoTabela.innerHTML = ``
	cont = 0 
	Object.keys(sep).forEach( item => {
		corpoTabela.innerHTML += `<tr> <td>${item}</td> <td>${sep[item]}</td> </tr>`
		cont += sep[item]
	})
	corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> </tr>`
}




// pega o clique do botao 
document.querySelector('#BotaoCalcular').onclick = e => {
	// evento do botao
	// const nomeVarialvel = document.querySelector("#nomeVariavel")
	// const checkAmostra = document.getElementsByName('tipoCalculado')
	// const dadosVariavel = document.querySelector('#dadosVariavel')
	const tipoCalculo = document.getElementsByName('calculoSelecionado')

	if( tipoCalculo[0].checked ){
		tabela('nomeVariavel', 'calculoNominal')
		// alert('Qualitativa Nominal')

	}else if( tipoCalculo[1].checked ){
		alert(' Qualitativa Ordinal ')

	}else if( tipoCalculo[2].checked ){
		alert(' Quantitativa Discreta ')

	}else if( tipoCalculo[3].checked ){
		alert('Quantitativa Continua ')

	}
}