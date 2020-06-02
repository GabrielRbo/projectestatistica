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

// a = [10,1,5, 4]

// console.time('selectionSort')
// selectionSort(a)
// console.timeEnd('selectionSort')
// console.log(a)

teste = [0.9,1.0,1.8,2.9,3.1,5.3,5.5,12.2,12.9,14,20]

// function decil(vetor, qualDecil){
// 	selectionSort(vetor)

// 	vet = vetor.length
	
// 	// i = qualDecil.value.slice(1)
// 	i = 6
// 	d = i * (vet + 1) / 10
// 	if( Number.isInteger(d) ){
// 		return vetor[d -1]
// 	}else{
// 		d = Math.floor(d) - 1
// 		return ( vetor[d] + vetor[d + 1] ) / 2
// 	}
// }
// // Dn = i * (n+1) / 10
// // ordenar em ordem crescente
// console.log( decil(teste, 'd6' ) )

function separa(){
	Q1 = i + ((p - Fan) / fq) .h
}