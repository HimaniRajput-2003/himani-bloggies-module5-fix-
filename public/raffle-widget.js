/**
 * Raffle Widget Script
 * This script creates and renders the raffle widget on the page
 */
(function () {
    // Create widget content
    function createWidget() {
        const widgetContainer = document.getElementById('raffle-widget');

        if (!widgetContainer) return;

        // Clear loading message
        widgetContainer.innerHTML = '';

        // Create widget elements
        const widget = document.createElement('div');
        widget.className = 'raffle-widget bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto';

        const header = document.createElement('div');
        header.className = 'text-center mb-6';

        const title = document.createElement('h3');
        title.className = 'text-2xl font-bold text-indigo-700 mb-2';
        title.textContent = 'Weekly Raffle';

        const subtitle = document.createElement('p');
        subtitle.className = 'text-gray-600';
        subtitle.textContent = 'Enter for a chance to win exciting prizes!';

        header.appendChild(title);
        header.appendChild(subtitle);

        const form = document.createElement('form');
        form.className = 'space-y-4';
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = emailInput.value;
            if (!email) {
                alert('Please enter your email to participate');
                return;
            }

            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
            successMsg.textContent = 'Thank you for participating! Good luck!';

            form.style.display = 'none';
            widget.appendChild(successMsg);

            // In a real implementation, this would call an API to register the user
            console.log('Raffle entry submitted for:', email);
        });

        const formGroup = document.createElement('div');
        formGroup.className = 'mb-4';

        const emailLabel = document.createElement('label');
        emailLabel.className = 'block text-gray-700 text-sm font-bold mb-2';
        emailLabel.htmlFor = 'raffle-email';
        emailLabel.textContent = 'Your Email:';

        const emailInput = document.createElement('input');
        emailInput.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
        emailInput.type = 'email';
        emailInput.id = 'raffle-email';
        emailInput.placeholder = 'email@example.com';
        emailInput.required = true;

        formGroup.appendChild(emailLabel);
        formGroup.appendChild(emailInput);

        const submitButton = document.createElement('button');
        submitButton.className = 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full';
        submitButton.type = 'submit';
        submitButton.textContent = 'Enter Raffle';

        form.appendChild(formGroup);
        form.appendChild(submitButton);

        const footer = document.createElement('div');
        footer.className = 'mt-6 text-center text-sm text-gray-500';
        footer.innerHTML = 'By entering, you agree to our <a href="/raffle-rules" class="text-indigo-600 hover:text-indigo-800">Raffle Rules</a>.';

        widget.appendChild(header);
        widget.appendChild(form);
        widget.appendChild(footer);

        widgetContainer.appendChild(widget);
    }

    // Initialize widget once the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
})();
