document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("error-message");

    const newsletter = document.querySelector(".newsletter");
    const mobileImg = document.getElementById("mobile-img");
    const desktopImg = document.getElementById("desktop-img");
    const newsletterText = document.getElementById("newsletter-text");
    const newsletterImage = document.querySelectorAll(".newsletter-image");

    const dismissButton = document.querySelector(".confirmation-button");
    const confirmationPage = document.querySelector(".confirmation");

    let formSubmitted = false;

    const vermillion = "#FF6155";
    const darkNavy = "#242742";

    function toggleSuccess()  {
        if (window.innerWidth >= 1024) {
            desktopImg.style.display = 'none';
            newsletterText.style.display = 'none';
            newsletter.classList.add('_active');
        } else {
            mobileImg.style.display = 'none';
        }

        if (formSubmitted === false) {
            confirmationPage.style.display = 'flex';
            newsletterText.style.display = 'none'
            formSubmitted = true;
        } else {
            confirmationPage.style.display = 'none';
            formSubmitted = false;
        }
    }

    function toggleDismiss() {
        if (window.innerWidth >= 1024) {
            desktopImg.style.display = 'block';
            newsletterText.style.display = 'flex';
            newsletter.classList.remove('_active');
        } else {
            mobileImg.style.display = 'block';
            newsletterText.style.display = 'flex';
        }

        if (formSubmitted === true) {
            confirmationPage.style.display = 'none';
            formSubmitted = false;
        } else {
            confirmationPage.style.display = 'flex';
            formSubmitted = true;
        }
    }

    dismissButton.addEventListener("click", () => {
        toggleDismiss();
    })

    function handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const rules = {
            email: 'required|email'
        };

        const validation = new Validator(data, rules);

        if (validation.fails()) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Valid email required';

            emailInput.style.border = `1px solid ${vermillion}`;
            emailInput.style.backgroundColor = 'rgb(255, 97, 85, 0.15)';
            emailInput.style.color = `${vermillion}`;
        } else {
            errorMessage.style.display = 'none';
            emailInput.style.border = `1px solid ${darkNavy}`;
            emailInput.style.color = darkNavy;
            emailInput.style.backgroundColor = 'unset';
            toggleSuccess();
            emailInput.value = '';
        }
    };

    form.addEventListener("submit", handleSubmit);

    function handleResize() {
        if (window.innerWidth >= 1024) {
            mobileImg.style.display = 'none';
            desktopImg.style.display = 'block';
        } else {
            mobileImg.style.display = 'block';
            desktopImg.style.display = 'none';
        }
    }

    window.addEventListener("resize", handleResize);

    handleResize();
})