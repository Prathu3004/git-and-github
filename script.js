/**
 * Simple Interest Calculator JavaScript
 * Author: Prathmesh Jadhav
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const calculatorForm = document.getElementById('calculatorForm');
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const resetBtn = document.getElementById('resetBtn');
    const errorMessage = document.getElementById('errorMessage');
    const resultsCard = document.getElementById('resultsCard');
    const interestResult = document.getElementById('interestResult');
    const totalResult = document.getElementById('totalResult');

    /**
     * Formats a raw number as an Indian Rupee currency string (e.g. ₹10,000.00)
     * @param {number} amount 
     * @returns {string}
     */
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    /**
     * Displays an error message in the error alert box
     * @param {string} message 
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        resultsCard.classList.add('hidden');
    }

    /**
     * Hides the error alert box
     */
    function hideError() {
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }

    /**
     * Validates input values and performs Simple Interest calculation
     */
    function calculateInterest(event) {
        if (event) event.preventDefault();

        hideError();

        const principalVal = principalInput.value.trim();
        const rateVal = rateInput.value.trim();
        const timeVal = timeInput.value.trim();

        // 1. Check for empty fields
        if (principalVal === '' || rateVal === '' || timeVal === '') {
            showError('Please fill in all input fields (Principal, Rate, and Time).');
            return;
        }

        const principal = parseFloat(principalVal);
        const rate = parseFloat(rateVal);
        const time = parseFloat(timeVal);

        // 2. Check for invalid numbers (NaN)
        if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
            showError('Please enter valid numeric values in all fields.');
            return;
        }

        // 3. Range & Value Validations
        if (principal <= 0) {
            showError('Principal Amount must be greater than zero.');
            principalInput.focus();
            return;
        }

        if (rate <= 0) {
            showError('Rate of Interest must be greater than zero.');
            rateInput.focus();
            return;
        }

        if (time <= 0) {
            showError('Time must be greater than zero.');
            timeInput.focus();
            return;
        }

        // 4. Simple Interest Formula: (P * R * T) / 100
        const simpleInterest = (principal * rate * time) / 100;

        // 5. Total Amount Formula: Principal + Simple Interest
        const totalAmount = principal + simpleInterest;

        // 6. Display Formatted Results
        interestResult.textContent = formatCurrency(simpleInterest);
        totalResult.textContent = formatCurrency(totalAmount);
        resultsCard.classList.remove('hidden');
    }

    /**
     * Resets all input fields, hides error messages, and clears results
     */
    function resetCalculator() {
        calculatorForm.reset();
        hideError();
        resultsCard.classList.add('hidden');
        interestResult.textContent = '₹0.00';
        totalResult.textContent = '₹0.00';
        principalInput.focus();
    }

    // Attach Event Listeners
    calculatorForm.addEventListener('submit', calculateInterest);
    resetBtn.addEventListener('click', resetCalculator);

    // Hide error messages as soon as the user starts correcting input
    [principalInput, rateInput, timeInput].forEach(input => {
        input.addEventListener('input', () => {
            if (!errorMessage.classList.contains('hidden')) {
                hideError();
            }
        });
    });
});
