let auto = (function() {
    console.log('this is being exported')
    console.log('this one also');
})();

export {
    auto,
}