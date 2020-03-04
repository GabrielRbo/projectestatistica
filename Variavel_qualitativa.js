
function q(nome, ele ) {
    // // let array = ele.sort();
    // // console.log(array);
    // let u = ele
    // // sprit(';')
    // let a = u.split(';')
    // console.log(a)
    o = ele.split(';')
    u = o[0].split('=')
    o.forEach(element => {
        console.log(element)
    });
    
};


q('oi',"prt=4;azul=5;jk=oi")