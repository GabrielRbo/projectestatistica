const opCalc = document.getElementsByName('CalcProb')

$(opCalc[0]).click(function () {
    $('#calcBinomial.escondido').css("display","block")
    
    document.getElementById('calcNormal').style.display = 'none'
    $('#calcNormal :input').val('');
    document.getElementById('calcUniforme').style.display = 'none'
    $('#calcUniforme :input').val('');
    
})

$(opCalc[1]).click(function () {
    $('#calcNormal.escondido').css("display","block")

    document.getElementById('calcBinomial').style.display = 'none'
    $('#calcBinomial :input').val('');
    document.getElementById('calcUniforme').style.display = 'none'
    $('#calcUniforme :input').val('');
})

$(opCalc[2]).click(function () {
    $('#calcUniforme.escondido').css("display","block")

    document.getElementById('calcNormal').style.display = 'none'
    $('#calcNormal :input').val('');
    document.getElementById('calcBinomial').style.display = 'none'
    $('#calcBinomial :input').val('');
}) 

//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
const btBinomial = document.querySelector('#btCalcBino')

function fatorial(n){
    let soma = 1
    for (i = 1; i <= n; i++){
        soma *= i
    }
    return soma
} 

function prob (n, k){
    if ( k == 0 ){
        r = 1
    }else {
        r = fatorial(n) / ( fatorial(n - k) * fatorial(k) )
    }
    return r
}

function prob2(n1,n, k, p, q){
    // sub = n - k
    // return (n/k) *  (p**k) * (q**sub)
    // return fatorial(n) / (fatorial(n - k)) * fatorial(k)
    aux = n-k
    return n1 * Math.pow(p, k) * Math.pow(q, aux)
}

function media( n, p ){
    return n * p
}

function desvioPadra (n, p, q){
    return Math.sqrt( n * p * q )
}

btBinomial.onclick = () => {
    const tabP = document.querySelector('#tabProb')
    const tabM = document.querySelector('#tabMedia')
    const tabD = document.querySelector('#tabDesvio')
    const tabV = document.querySelector('#tabCoefVari')

    const eleN = document.querySelector('#elementoN')
    const eleP = document.querySelector('#elementoP')
    const eleQ = document.querySelector('#elementoQ')
    const eleK = document.querySelector('#elementoK')

    let n = eleN.value
    let p = eleP.value / 100
    let q = eleQ.value / 100
    let k = eleK.value.split(',')

    tabM.innerHTML = media(n, p).toFixed(2)
    tabD.innerHTML = desvioPadra(n, p, q).toFixed(2)
    tabV.innerHTML = (( desvioPadra(n, p, q) / media(n, p) ) * 100).toFixed(2)

    let soma = 0
    for( j of k){
        // j = k
        console.log('vendo k ', k)
        
        j = Number(j)
        let n1 = prob(n, j)
        console.log('n1 ', n1)
        console.log('j ', j)
        //nao entend o pq desse -1 mas sempre somava +1
        // j -= 1
        soma += (prob2(n1 ,n, j, p, q) * 100)
    }
    //(prob2(n, k, p, q) * 100).toFixed(2)
    console.log('soma ', soma)
    tabP.innerHTML = soma.toFixed(2)

}



//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
const btNormal = document.querySelector('#btCalcNormal')

const escoreZ = [
        [0.0, 0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
        [0.1, 0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753],
        [0.2, 0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
        [0.3, 0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
        [0.4, 0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
        [0.5, 0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
        [0.6, 0.2258, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2518, 0.2549],
        [0.7, 0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
        [0.8, 0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
        [0.9, 0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
        [1.0, 0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
        [1.1, 0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
        [1.2, 0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
        [1.3, 0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
        [1.4, 0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
        [1.5, 0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
        [1.6, 0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
        [1.7, 0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
        [1.8, 0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
        [1.9, 0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
        [2.0, 0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817],
        [2.1, 0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
        [2.2, 0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
        [2.3, 0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
        [2.4, 0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
        [2.5, 0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
        [2.6, 0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
        [2.7, 0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
        [2.8, 0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
        [2.9, 0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
        [3.0, 0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
        [3.1, 0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
        [3.2, 0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
        [3.3, 0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
        [3.4, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
        [3.5, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
        [3.6, 0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.7, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.8, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.9, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000]
    ]

function buscaZ(num){
    if( num.indexOf('-') == 0 ){
        num = num.slice(1)
    }
    let a = `${num}`.slice(0,3)
    console.log(a)
    for( i of escoreZ){
        if( a == i[0] ){
            return i[ Number(`${num}`.slice(-1))+1  ]
        }
    }
}

btNormal.onclick = () => {
    const elemento = document.querySelector('#normalEle')
    const media = document.querySelector('#normalMedia')
    const desvio = document.querySelector('#normalDesvio')
    const opInter = document.querySelector('#selCalcNormal')
    const intervalo = document.querySelector('#intervalo')

    // Z = ((intervalo.value - media.value) / desvio.value).toFixed(2)
    // alert(Z)
    // alert(buscaZ(Z))

    const proba = document.querySelector('#np')

    if(opInter.selectedIndex == 0){
        //maior que
        if( intervalo.value < media.value ){
            Z = ((intervalo.value - media.value) / desvio.value).toFixed(2)
            prob = ((0.5 + buscaZ(Z)) * 100).toFixed(2)
            proba.innerHTML = prob
        }else{
            Z = ((intervalo.value - media.value) / desvio.value).toFixed(2)
            prob = ( 0.5 - buscaZ(Z) ) * 100
            proba.innerHTML = prob.toFixed(2)
        }

    }else if(opInter.selectedIndex == 1){
        //menor que
        Z = ((intervalo.value - media.value) / desvio.value).toFixed(2)
        prob = ( 0.5 - buscaZ(Z) ) * 100
        proba.innerHTML = prob
    }else if(opInter.selectedIndex == 2){
        //entre
        v = intervalo.value.split(';')
        soma = 0

        if( v[0] > media.value ){
            l = []
            for( j of v){
                Z = ((j - media.value) / desvio.value).toFixed(2)
                l.push( buscaZ(Z) )
            }
            proba.innerHTML = ( (l[1]-l[0]) * 100).toFixed(2)
        }else{
            for( j of v){
                Z = ((j - media.value) / desvio.value).toFixed(2)
                soma += buscaZ(Z)
            }
            proba.innerHTML = (soma * 100).toFixed(2)
        }
        
    }

}




//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
const btUniform = document.querySelector('#btCalcUniform')

btUniform.onclick = () => {
    const pMin = document.querySelector('#pontomin')
    const pMax = document.querySelector('#pontomax')
    const sel = document.querySelector('#selCalcUniforme')
    const inter = document.querySelector('#intervalo2')

    const probab = document.querySelector('#probU')
    const variancia = document.querySelector('#varU')
    const desvioU = document.querySelector('#desvioU')
    const mediaU = document.querySelector('#mediaU')

    if( sel.selectedIndex == 0 ){
        //maior que
        let iitt
        // if( inter.value == '' ){
        iitt =  Number(pMax.value) - Number(inter.value)
        // }else {
        //     iitt = inter.value
        // }
        prob = 1 / ( Number(pMax.value) - Number(pMin.value) ) * iitt
        prob = prob * 100
        probab.innerHTML = (prob).toFixed(2)
    
    }else if( sel.selectedIndex == 2){
        //entre
        v = inter.value.split(';')
        iitt =  v[1] - v[0]
        prob = 1 / ( Number(pMax.value) - Number(pMin.value) ) * iitt
        probab.innerHTML = (prob * 100).toFixed(2)

    }else if( sel.selectedIndex == 1){
        //menor que
        v = inter.value.split(';')
        iitt = inter.value - Number(pMin.value)
        prob = 1 / ( Number(pMax.value) - Number(pMin.value) ) * iitt
        probab.innerHTML = (prob * 100).toFixed(2)
    }

    desviop = Math.sqrt( Math.pow(( Number(pMax.value) - Number(pMin.value)), 2) / 12 )
    desvioU.innerHTML = desviop.toFixed(2)

    mediaR = Number(pMin.value) + Number(pMax.value)
    mediaU.innerHTML = mediaR / 2

    varia = desviop.toFixed(2) / (mediaR / 2) * 100
    variancia.innerHTML = varia.toFixed(2)

}