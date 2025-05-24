document.addEventListener('DOMContentLoaded', function() {
    // Initialize date pickers for booking form
    if (document.querySelector('.date-picker')) {
        flatpickr('.date-picker', {
            dateFormat: 'Y-m-d',
            minDate: 'today',
            altInput: true,
            altFormat: 'F j, Y',
            theme: 'dark'
        });
    }
    
    // Initialize date range picker for booking form
    if (document.querySelector('.date-range-picker')) {
        const startDatePicker = flatpickr('#start_date', {
            dateFormat: 'Y-m-d',
            minDate: 'today',
            altInput: true,
            altFormat: 'F j, Y',
            theme: 'dark',
            onChange: function(selectedDates, dateStr) {
                // Set the minimum date of the end date picker to be the selected start date
                endDatePicker.set('minDate', dateStr);
                
                // If end date is before start date, update it
                if (endDatePicker.selectedDates[0] < selectedDates[0]) {
                    endDatePicker.setDate(selectedDates[0]);
                }
                
                updateBookingPrice();
            }
        });
        
        const endDatePicker = flatpickr('#end_date', {
            dateFormat: 'Y-m-d',
            minDate: 'today',
            altInput: true,
            altFormat: 'F j, Y',
            theme: 'dark',
            onChange: function() {
                updateBookingPrice();
            }
        });
    }
    
    // Update booking price based on selected dates
    function updateBookingPrice() {
        const startDate = document.getElementById('start_date');
        const endDate = document.getElementById('end_date');
        const dailyRate = document.getElementById('daily_rate');
        const totalPriceElement = document.getElementById('total_price');
        
        if (startDate && endDate && dailyRate && totalPriceElement) {
            const start = new Date(startDate.value);
            const end = new Date(endDate.value);
            
            if (start && end && !isNaN(start) && !isNaN(end)) {
                // Calculate number of days
                const timeDiff = Math.abs(end - start);
                const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
                
                // Get daily rate
                const rate = parseFloat(dailyRate.value);
                
                // Calculate total price with potential discounts
                let totalPrice = rate * days;
                
                // Apply discounts for longer bookings
                if (days >= 7 && days < 30) {
                    // 10% discount for bookings of a week or more
                    totalPrice = totalPrice * 0.9;
                } else if (days >= 30) {
                    // 20% discount for bookings of a month or more
                    totalPrice = totalPrice * 0.8;
                }
                
                // Update total price display
                totalPriceElement.textContent = totalPrice.toFixed(2);
            }
        }
    }
    
    // Credit card form validation
    const cardNumberInput = document.getElementById('card_number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Remove non-digit characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 16 digits
            if (this.value.length > 16) {
                this.value = this.value.slice(0, 16);
            }
        });
    }
    
    const expiryDateInput = document.getElementById('expiry_date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            // Remove non-digit characters
            let input = this.value.replace(/\D/g, '');
            
            // Format as MM/YY
            if (input.length > 2) {
                this.value = input.slice(0, 2) + '/' + input.slice(2, 4);
            } else {
                this.value = input;
            }
            
            // Validate month (01-12)
            if (input.length >= 2) {
                const month = parseInt(input.slice(0, 2));
                if (month < 1 || month > 12) {
                    this.setCustomValidity('Invalid month. Must be between 01 and 12.');
                } else {
                    this.setCustomValidity('');
                }
            }
        });
    }
    
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            // Remove non-digit characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 3-4 digits
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
        });
    }
    
    // Confirmation modal for cancelling bookings
    const cancelButtons = document.querySelectorAll('.cancel-booking-btn');
    if (cancelButtons.length > 0) {
        cancelButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const bookingId = this.dataset.bookingId;
                
                if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
                    document.getElementById('cancel-form-' + bookingId).submit();
                }
            });
        });
    }
    
    // Initialize charts for admin dashboard if Chart.js is available
    if (typeof Chart !== 'undefined' && document.getElementById('bookingStatusChart')) {
        const statusCounts = JSON.parse(document.getElementById('statusData').getAttribute('data-status-counts'));
        
        new Chart(document.getElementById('bookingStatusChart'), {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
                datasets: [{
                    data: [
                        statusCounts.pending,
                        statusCounts.confirmed,
                        statusCounts.completed,
                        statusCounts.cancelled
                    ],
                    backgroundColor: [
                        '#ffc107', // warning
                        '#198754', // success
                        '#0dcaf0', // info
                        '#dc3545'  // danger
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Initialize DataTable for admin views if available
    if (typeof $.fn.DataTable !== 'undefined') {
        $('.data-table').DataTable({
            pageLength: 10,
            responsive: true
        });
    }
});
