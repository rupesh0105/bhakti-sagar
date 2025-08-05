document.addEventListener('DOMContentLoaded', function() {
    // --- Daily Quote Logic ---
    fetch('quotes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(quotes => {
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            const quoteIndex = dayOfYear % quotes.length;
            const quoteElement = document.getElementById('daily-quote');
            const meaningElement = document.getElementById('quote-meaning');
            
            if (quoteElement && meaningElement) {
                quoteElement.innerText = `"${quotes[quoteIndex].quote}"`;
                meaningElement.innerText = quotes[quoteIndex].meaning;
            }
        })
        .catch(error => {
            console.error("Could not fetch quotes:", error);
            const quoteElement = document.getElementById('daily-quote');
            if (quoteElement) {
                quoteElement.innerText = "आज का विचार लोड नहीं हो सका।";
            }
        });

    // Set the current year in the footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
