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
console.log( mediana(1,7) )