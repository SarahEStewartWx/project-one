document.getElementById('saveButton').addEventListener('click', function() {
    // Get the value from the input field
    const input = document.getElementById('userInput').value;

    // Store the input in local storage
    localStorage.setItem('userInput', input);
});