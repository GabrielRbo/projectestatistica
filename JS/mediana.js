function mediana(come, fim){
	vet = []
	for(i=come; i <= fim; i++){
		vet.push(i)
	}
	re = 0
	if( (vet.length % 2) == 0 ){
		console.log('par')
		re = ( vet[vet.length / 2] + vet[ (vet.length / 2) -1 ] ) / 2
	}else{
		re = vet[Math.floor(vet.length / 2)]
	}
	console.log('mediana => ', re)
	console.log(vet, vet.length/2)
}
mediana(1,7)