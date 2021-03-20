const idGen = (function() {
    let x = 0;
    return (function() {
        return ++x;
    })
})();

export {
    idGen,
}