module.exports = function() {
    const styles = require('./main.css');
    let element = document.createElement('h1');

    element.innerHTML = 'Hello world';

    element.className = styles.redButton;

    return element;
};
