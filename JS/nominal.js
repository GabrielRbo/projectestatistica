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

function nominal(nomeVariavelTabela, localDaTabelaSite){
	const tipoCalculo = document.getElementsByName('calculoSelecionado')

	const localDaTabela = document.querySelector(`#${localDaTabelaSite}`)
	const NomeTabela = document.querySelector('#variavelNome')
	const nomeVariavel = document.querySelector('#nomeVariavel')
	const dadosVariavel = document.querySelector('#dadosVariavel')

	if ( nomeVariavel.value.length < 3 ){
		alert('Adicione o nome da varial')
		nomeVariavel.focus()
		return
	}

	if ( dadosVariavel.value.length < 3 ){
		alert('O dados da variavel nao poder estar vazio')
		dadosVariavel.focus()
	}

	if ( tipoCalculo[1].checked ){
		let ordemInput = document.querySelector('#ordem')
		if ( ordemInput.value.length < 3 ){
			alert('Por favor definir sua ordem')
			ordemInput.focus()
		}
	}

	NomeTabela.innerHTML = nomeVariavel.value
	localDaTabela.style.display = 'block'


	let dados = dadosVariavel.value.split(',')
	let dadosSeparados = []

	// SEPARA E CONTAS OS ELEMENTOS(DO CAMPO -> DADOS DA VARIAVEL)
	let sep = dados.reduce( (obj, item) => {
		// console.log(obj, item)
		item = item.replace(/\s/g, '')// fazer testes
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
			item = item.replace(/\s/g, '') // fazer testes
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
		
		let at = (max - min) + 1
		
		// 2°passo
		let k = Number( Math.sqrt( dados.length ).toString()[0] ) // raiz quadrada do total dos elementos
		let kmais = k + 1
		let kmenos = k - 1
	//	console.log('quantidade', dados.length,'K',k, 'kmais',kmais,'kmenos', kmenos)
		//3°passo

		let inteiro = true
		while( inteiro ){
			ic = at / k
			if( Number.isInteger(ic) ){
				inteiro = false
				linha = k
			}

			ic = at / kmais
			if( Number.isInteger(ic) ){
				inteiro = false
				linha = kmais
			}


			ic = at / kmenos
			if( Number.isInteger(ic) ){
				inteiro = false
				linha = kmenos
			}
	//	console.log('at ant',at)  // Tive que desconsiderar em caso de encontrar o inteiro, porque ele jogava +1 antes de voltar 
								  // no inicio do while e sair com a condição false.
			if ( !Number.isInteger(ic) ){
				at += 1
				inteiro = true
			}
		
		};
	//	console.log('dps',at)
    //   console.log('depois', ic)

	//	console.log('linha', linha)

		const corpoTabela = document.querySelector('#corpo')
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

		for(let i = 0; i < linha; i++) {
			corpoTabela.innerHTML += `<tr> <td>${Math.round(min)} |---- ${Math.round(min + ic)}</td> <td>${totVet[i]}</td> </tr>`
			cont += totVet[i]
			min += ic
		}
		corpoTabela.innerHTML += `<tr> <td id="total">Total</td> <td id="total">${cont}</td> </tr>`
		
		// FIM TABELA CONTINUA
	}

}




// pega o clique do botao 
document.querySelector('#BotaoCalcular').onclick = e => {
	// evento do botao
	// const nomeVarialvel = document.querySelector("#nomeVariavel")
	const checkAmostra = document.getElementsByName('tipoCalculado')
	// const dadosVariavel = document.querySelector('#dadosVariavel')
	// const tipoCalculo = document.getElementsByName('calculoSelecionado')
	if ( checkAmostra[0].checked ){
		nominal('nomeVariavel', 'calculoNominal')
	}else if ( checkAmostra[1].checked ){
		alert('NAO IMPLEMENTADO')
	}else {
		alert('selecione amostra ou populacao')
		checkAmostra[0].focus()
	}

}