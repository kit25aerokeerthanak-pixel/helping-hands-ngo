document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! Your message has been sent successfully.');
            contactForm.reset();
        });
    }

    // Donation Logic
    const donateCards = document.querySelectorAll('.donate-card');
    const donateBtn = document.getElementById('proceedDonateBtn');
    const customAmountInput = document.getElementById('customAmount');
    let selectedAmount = null;

    if (donateCards.length > 0) {
        donateCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove highlight from all
                donateCards.forEach(c => c.classList.remove('selected'));
                // Add highlight to clicked
                card.classList.add('selected');
                selectedAmount = card.dataset.amount;
                if(customAmountInput) customAmountInput.value = '';
            });
        });
        
        if(customAmountInput) {
            customAmountInput.addEventListener('input', () => {
                donateCards.forEach(c => c.classList.remove('selected'));
                selectedAmount = customAmountInput.value;
            });
        }
    }

    if (donateBtn) {
        donateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const msg = document.getElementById('thankYouMessage');
            const donorName = document.getElementById('donorName') ? document.getElementById('donorName').value : '';
            const donorEmail = document.getElementById('donorEmail') ? document.getElementById('donorEmail').value : '';
            
            if (!donorName || !donorEmail) {
                alert('Please enter your Name and Email.');
                return;
            }

            if (selectedAmount) {
                msg.innerHTML = `
                    <h3 style="color: #16a34a; margin-bottom: 1rem;">Donation Successful!</h3>
                    <p style="color: #374151; margin-bottom: 1rem;">Thank you, <b>${donorName}</b>, for your generous donation of <b>₹${selectedAmount}</b>.</p>
                    <p style="color: #374151; margin-bottom: 1.5rem;">A receipt has been sent to <b>${donorEmail}</b>.</p>
                    <button class="btn btn-secondary" id="downloadReceiptBtn" style="background-color: white; color: var(--primary-color); border: 2px solid var(--primary-color);">Download Receipt</button>
                `;
                msg.style.display = 'block';

                document.getElementById('downloadReceiptBtn').addEventListener('click', () => {
                    const receiptContent = `
========================================
             HELPING HANDS NGO
             DONATION RECEIPT
========================================

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Transaction ID: TXN${Math.floor(Math.random() * 1000000000)}

Donor Name: ${donorName}
Donor Email: ${donorEmail}

Donation Amount: ₹${selectedAmount}

========================================
Thank you for your contribution to 
Making a Difference Today!
========================================
`;
                    const blob = new Blob([receiptContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Receipt_${donorName.replace(/\\s+/g, '_')}_${Date.now()}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                });

            } else {
                alert('Please select or specify a donation amount.');
            }
        });
    }

    // Impact Counter Animation (If on homepage)
    const impactItems = document.querySelectorAll('.impact-item h3');
    if (impactItems.length > 0) {
        impactItems.forEach(item => {
            const target = parseInt(item.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    item.textContent = target + "+";
                    clearInterval(timer);
                } else {
                    item.textContent = Math.ceil(current) + "+";
                }
            }, 20);
        });
    }

});
