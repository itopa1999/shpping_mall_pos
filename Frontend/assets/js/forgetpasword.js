document.addEventListener('DOMContentLoaded', function() {
document.querySelector('.ForgotPassword-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const spinner = document.getElementById('spinner1');
    const submitText = document.getElementById('submit-text1');
    spinner.classList.remove('d-none');
    submitText.classList.add('d-none');

    const errorMessage = document.getElementById('error-message');
    const successAlert = document.getElementById('success-alert');
    const successMessage = document.getElementById('success-message');
    const errorAlert = document.getElementById('error-alert');
    // Reset previous messages
    errorAlert.classList.add('d-none');
    errorMessage.innerHTML = '';
    successAlert.classList.add('d-none');
    successMessage.innerHTML = '';

    var username = document.getElementById("Username").value;
    var question = document.getElementById("question");
    var answer = document.getElementById("answer");

    fetch(`http://localhost:5297/admin/api/get/username/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        spinner.classList.add('d-none');
        submitText.classList.remove('d-none');
        
        if (response.status === 200) {
            return response.json().then(data => {
                var user = document.getElementById("Username");
                user.disabled = true;
                question.value = data.message
                question.type ="text";
                question.disabled = true;
                answer.type = "text";
                successMessage.innerText ='Enter correct Answer.';
                successAlert.classList.remove('d-none');
            });
        } else if (response.status === 400) {
            return response.json().then(data => {
                errorMessage.innerText = data.message || 'Invalid credentials.';
                errorAlert.classList.remove('d-none');
            });
        } else {
            // Handle other error statuses
            errorMessage.innerText = 'An error occurred. Please try again later.';
            errorAlert.classList.remove('d-none');
        }
    }).catch(error => {
            errorMessage.innerText = error;
            errorAlert.classList.remove('d-none');
    });
    
});


})