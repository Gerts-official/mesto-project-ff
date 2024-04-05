function jopa(her) {
    console.log(222);
    console.log('Hello ' + her());
}

function jopa2() {
    console.log(111);
    return 'Victor'
}

jopa(jopa2);