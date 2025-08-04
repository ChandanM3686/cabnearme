let currentStep = "home"
let bookingData = {
  serviceType: "",
  selectedCar: null,
  pickupLocation: "",
  dropLocation: "",
  date: "",
  time: "",
  duration: "",
  passengers: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  specialRequests: "",
}

const cars = [
  {
    id: "1",
    name: "Maruti Swift Dzire",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop",
    capacity: 4,
    rating: 4.5,
    pricePerKm: 12,
    pricePerHour: 150,
    features: ["AC", "Music System", "GPS"],
  },
  {
    id: "2",
    name: "Toyota Innova",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
    capacity: 7,
    rating: 4.7,
    pricePerKm: 18,
    pricePerHour: 220,
    features: ["AC", "Music System", "GPS", "Extra Space"],
  },
  {
    id: "3",
    name: "Maruti Ertiga",
    type: "MUV",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop",
    capacity: 6,
    rating: 4.4,
    pricePerKm: 15,
    pricePerHour: 180,
    features: ["AC", "Music System", "GPS", "Comfortable"],
  },
  {
    id: "4",
    name: "Honda City",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
    capacity: 4,
    rating: 4.6,
    pricePerKm: 14,
    pricePerHour: 170,
    features: ["AC", "Music System", "GPS", "Premium"],
  },
  {
    id: "5",
    name: "Mahindra Scorpio",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop",
    capacity: 7,
    rating: 4.3,
    pricePerKm: 20,
    pricePerHour: 250,
    features: ["AC", "Music System", "GPS", "Powerful", "4WD"],
  },
  {
    id: "6",
    name: "Hyundai Creta",
    type: "Compact SUV",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    capacity: 5,
    rating: 4.8,
    pricePerKm: 16,
    pricePerHour: 200,
    features: ["AC", "Music System", "GPS", "Luxury", "Sunroof"],
  },
]

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })
  document.getElementById(pageId).classList.add("active")
  currentStep = pageId.replace("-page", "")
}

function showHomePage() {
  showPage("home-page")
}

function showServiceSelection() {
  showPage("service-page")
}

function showCarSelection() {
  updateCarSelectionPage()
  showPage("cars-page")
}

function showBookingForm() {
  updateBookingForm()
  showPage("booking-page")
}

function showPaymentPage() {
  updatePaymentPage()
  showPage("payment-page")
}

function showConfirmationPage() {
  updateConfirmationPage()
  showPage("confirmation-page")
}

function selectService(serviceType) {
  bookingData.serviceType = serviceType
  showCarSelection()
  
  // Show notification for service selection
  const serviceName = serviceType === 'darshan' ? 'Mumbai Darshan' : 'Taxi Service'
  showNotification('Service Selected', `${serviceName} has been selected. Now choose your preferred car.`, 'success')
}

function updateCarSelectionPage() {
  const subtitle = document.getElementById("car-selection-subtitle")
  subtitle.textContent = `Select from our premium fleet for your ${bookingData.serviceType === "darshan" ? "Mumbai Darshan" : "taxi service"}`

  const carsGrid = document.getElementById("cars-grid")
  carsGrid.innerHTML = ""

  cars.forEach((car) => {
    const carCard = createCarCard(car)
    carsGrid.appendChild(carCard)
  })
}

function createCarCard(car) {
  const card = document.createElement("div")
  card.className = "car-card"
  card.onclick = () => selectCar(car)

  const featuresHTML = car.features.map((feature) => `<span class="feature-badge">${feature}</span>`).join("")

  const priceText = bookingData.serviceType === "darshan" ? `₹${car.pricePerHour}/hour` : `₹${car.pricePerKm}/km`

  card.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-image">
        <div class="car-info">
            <div class="car-header">
                <div>
                    <div class="car-name">${car.name}</div>
                    <div class="car-type">${car.type}</div>
                </div>
                <div class="car-rating">
                    <i class="fas fa-star"></i>
                    <span>${car.rating}</span>
                </div>
            </div>
            <div class="car-details">
                <div class="car-capacity">
                    <i class="fas fa-users"></i>
                    <span>${car.capacity} seats</span>
                </div>
                <div class="car-price">
                    <div class="price-amount">${priceText}</div>
                </div>
            </div>
            <div class="car-features">
                ${featuresHTML}
            </div>
        </div>
    `

  return card
}

function selectCar(car) {
  bookingData.selectedCar = car
  showBookingForm()
  
  // Show notification for car selection
  showNotification('Car Selected', `${car.name} has been selected for your booking.`, 'success')
}

function updateBookingForm() {
  const dropLabel = document.getElementById("drop-label")
  const dropInput = document.getElementById("drop")
  const durationGroup = document.getElementById("duration-group")

  if (bookingData.serviceType === "darshan") {
    dropLabel.textContent = "Starting Point"
    dropInput.placeholder = "Tour starting point"
    durationGroup.style.display = "block"
  } else {
    dropLabel.textContent = "Drop Location"
    dropInput.placeholder = "Enter drop location"
    durationGroup.style.display = "none"
  }

  const passengersSelect = document.getElementById("passengers")
  passengersSelect.innerHTML = '<option value="">Select</option>'

  if (bookingData.selectedCar) {
    for (let i = 1; i <= bookingData.selectedCar.capacity; i++) {
      const option = document.createElement("option")
      option.value = i
      option.textContent = `${i} ${i === 1 ? "person" : "people"}`
      passengersSelect.appendChild(option)
    }
  }

  updateBookingSummary()
  addFormEventListeners()
}

function addFormEventListeners() {
  const form = document.getElementById("booking-form")
  const inputs = form.querySelectorAll("input, select, textarea")

  inputs.forEach((input) => {
    input.addEventListener("input", updateBookingSummary)
    input.addEventListener("change", updateBookingSummary)
  })
}

function updateBookingSummary() {
  if (!bookingData.selectedCar) return

  const selectedCarSummary = document.getElementById("selected-car-summary")
  selectedCarSummary.innerHTML = `
        <img src="${bookingData.selectedCar.image}" alt="${bookingData.selectedCar.name}">
        <div class="car-summary-info">
            <h4>${bookingData.selectedCar.name}</h4>
            <p>${bookingData.selectedCar.type}</p>
        </div>
    `

  const formData = getFormData()

  const summaryDetails = document.getElementById("summary-details")
  let summaryHTML = `
        <div class="summary-item">
            <span>Service:</span>
            <span>${bookingData.serviceType === "darshan" ? "Mumbai Darshan" : "Taxi Service"}</span>
        </div>
    `

  if (bookingData.serviceType === "darshan" && formData.duration) {
    summaryHTML += `
            <div class="summary-item">
                <span>Duration:</span>
                <span>${formData.duration} hours</span>
            </div>
        `
  }

  if (formData.date && formData.time) {
    summaryHTML += `
            <div class="summary-item">
                <span>Date & Time:</span>
                <span>${formData.date} ${formData.time}</span>
            </div>
        `
  }

  if (formData.passengers) {
    summaryHTML += `
            <div class="summary-item">
                <span>Passengers:</span>
                <span>${formData.passengers}</span>
            </div>
        `
  }

  summaryDetails.innerHTML = summaryHTML

  const totalAmount = calculatePrice(formData)
  document.getElementById("total-amount").textContent = `₹${totalAmount}`
}

function getFormData() {
  return {
    pickupLocation: document.getElementById("pickup").value,
    dropLocation: document.getElementById("drop").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    duration: document.getElementById("duration").value,
    passengers: document.getElementById("passengers").value,
    customerName: document.getElementById("name").value,
    customerPhone: document.getElementById("phone").value,
    customerEmail: document.getElementById("email").value,
    specialRequests: document.getElementById("requests").value,
  }
}

function calculatePrice(formData = null) {
  if (!bookingData.selectedCar) return 0

  const data = formData || getFormData()

  if (bookingData.serviceType === "darshan") {
    const hours = Number.parseInt(data.duration) || 8
    return bookingData.selectedCar.pricePerHour * hours
  } else {
    return bookingData.selectedCar.pricePerKm * 25
  }
}

function proceedToPayment() {
  const formData = getFormData()

  if (!formData.customerName || !formData.customerPhone || !formData.date || !formData.time) {
    showNotification('Form Incomplete', 'Please fill in all required fields before proceeding.', 'error')
    return
  }

  Object.assign(bookingData, formData)
  updatePaymentPage()
  showPaymentPage()
  
  // Show notification for proceeding to payment
  showNotification('Proceeding to Payment', 'Please complete your payment to confirm your booking.', 'success')
}

function updatePaymentPage() {
  const paymentSummary = document.getElementById("payment-summary")
  paymentSummary.innerHTML = `
        <h4>Booking Summary</h4>
        <p><strong>Service:</strong> ${bookingData.serviceType === "darshan" ? "Mumbai Darshan" : "Taxi Service"}</p>
        <p><strong>Car:</strong> ${bookingData.selectedCar.name}</p>
        <p><strong>Date:</strong> ${bookingData.date} at ${bookingData.time}</p>
        <p><strong>Customer:</strong> ${bookingData.customerName}</p>
        <p><strong>Phone:</strong> ${bookingData.customerPhone}</p>
    `

  const totalAmount = calculatePrice()
  document.getElementById("payment-amount").textContent = `₹${totalAmount}`
}

// Notification System Functions
function showNotification(title, message, type = 'success') {
  const notification = document.getElementById('notification')
  const notificationContainer = document.getElementById('notification-container')
  const titleElement = document.getElementById('notification-title')
  const messageElement = document.getElementById('notification-message')
  const iconElement = notification.querySelector('.notification-icon i')
  
  titleElement.textContent = title
  messageElement.textContent = message
  
  // Update icon based on type
  if (type === 'success') {
    iconElement.className = 'fas fa-check-circle'
    notification.style.borderLeftColor = '#10b981'
    iconElement.style.color = '#10b981'
  } else if (type === 'error') {
    iconElement.className = 'fas fa-exclamation-circle'
    notification.style.borderLeftColor = '#ef4444'
    iconElement.style.color = '#ef4444'
  } else if (type === 'warning') {
    iconElement.className = 'fas fa-exclamation-triangle'
    notification.style.borderLeftColor = '#f59e0b'
    iconElement.style.color = '#f59e0b'
  }
  
  notificationContainer.style.display = 'block'
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    closeNotification()
  }, 5000)
}

function closeNotification() {
  const notificationContainer = document.getElementById('notification-container')
  notificationContainer.style.display = 'none'
}

function showPaymentSuccessModal() {
  const modal = document.getElementById('payment-success-modal')
  const bookingId = Date.now().toString().slice(-6)
  const amount = calculatePrice()
  
  document.getElementById('modal-booking-id').textContent = `#MB${bookingId}`
  document.getElementById('modal-amount').textContent = `₹${amount}`
  
  modal.style.display = 'block'
  
  // Send notifications based on user preferences
  sendNotifications()
}

function closePaymentModal() {
  const modal = document.getElementById('payment-success-modal')
  modal.style.display = 'none'
  showConfirmationPage()
}

function sendNotifications() {
  const smsNotification = document.getElementById('sms-notification').checked
  const emailNotification = document.getElementById('email-notification').checked
  const whatsappNotification = document.getElementById('whatsapp-notification').checked
  
  const bookingId = Date.now().toString().slice(-6)
  const amount = calculatePrice()
  
  // Simulate sending notifications
  if (smsNotification) {
    console.log(`SMS sent to ${bookingData.customerPhone}: Your booking #MB${bookingId} is confirmed! Amount: ₹${amount}. Driver details will be shared 30 mins before pickup.`)
  }
  
  if (emailNotification) {
    console.log(`Email sent to ${bookingData.customerEmail}: Booking confirmation for #MB${bookingId}`)
  }
  
  if (whatsappNotification) {
    console.log(`WhatsApp message sent to ${bookingData.customerPhone}: Booking confirmed! #MB${bookingId}`)
  }
  
  // Show success notification
  showNotification(
    'Payment Successful!', 
    `Your booking #MB${bookingId} has been confirmed. You will receive confirmation details shortly.`,
    'success'
  )
}

async function handlePayment() {
  const amount = calculatePrice()

  try {
    // First, create the booking in MongoDB
    const bookingDataToSave = {
      ...bookingData,
      totalAmount: amount
    }

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDataToSave)
    })

    if (!response.ok) {
      throw new Error('Failed to create booking')
    }

    const bookingResponse = await response.json()
    const bookingId = bookingResponse.booking._id

    const options = {
      key: "rzp_test_1234567890",
      amount: amount * 100,
      currency: "INR",
      name: "Mumbai Car Booking",
      description: `${bookingData.serviceType === "darshan" ? "Mumbai Darshan" : "Taxi Booking"} - ${bookingData.selectedCar.name}`,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop",
      handler: async (response) => {
        console.log("Payment successful:", response)
        
        // Update payment status in MongoDB
        try {
          const paymentUpdateResponse = await fetch(`/api/bookings/${bookingId}/payment`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentStatus: 'completed',
              paymentId: response.razorpay_payment_id
            })
          })

          if (!paymentUpdateResponse.ok) {
            console.error('Failed to update payment status')
          }
        } catch (error) {
          console.error('Error updating payment status:', error)
        }
        
        // Show payment success modal
        showPaymentSuccessModal()
      },
      prefill: {
        name: bookingData.customerName,
        email: bookingData.customerEmail,
        contact: bookingData.customerPhone,
      },
      theme: {
        color: "#3B82F6",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment cancelled")
          showNotification('Payment Cancelled', 'Your payment was cancelled. You can try again anytime.', 'warning')
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (error) {
    console.error('Error creating booking:', error)
    showNotification('Booking Error', 'Failed to create booking. Please try again.', 'error')
  }
}

function updateConfirmationPage() {
  const bookingId = Date.now().toString().slice(-6)
  document.getElementById("booking-id").textContent = bookingId

  const confirmationDetails = document.getElementById("confirmation-details")
  confirmationDetails.innerHTML = `
        <p><strong>Service:</strong> ${bookingData.serviceType === "darshan" ? "Mumbai Darshan" : "Taxi Service"}</p>
        <p><strong>Car:</strong> ${bookingData.selectedCar.name} (${bookingData.selectedCar.type})</p>
        <p><strong>Date & Time:</strong> ${bookingData.date} at ${bookingData.time}</p>
        <p><strong>Pickup:</strong> ${bookingData.pickupLocation}</p>
        ${bookingData.serviceType === "taxi" ? `<p><strong>Drop:</strong> ${bookingData.dropLocation}</p>` : ""}
        <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
        <p><strong>Amount Paid:</strong> ₹${calculatePrice()}</p>
    `
}

function bookAnother() {
  bookingData = {
    serviceType: "",
    selectedCar: null,
    pickupLocation: "",
    dropLocation: "",
    date: "",
    time: "",
    duration: "",
    passengers: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    specialRequests: "",
  }

  const form = document.getElementById("booking-form")
  if (form) {
    form.reset()
  }

  showHomePage()
}

function downloadReceipt() {
  alert("Receipt download functionality would be implemented here")
}

// WhatsApp Booking Function
function bookViaWhatsApp(service, price) {
    const phoneNumber = "919867050052";
    const message = encodeURIComponent(
        `Hello! I'm interested in booking your service.\n\n` +
        `Service: ${service}\n` +
        `Price: ${price}\n\n` +
        `Please provide me with more details about:\n` +
        `- Available dates and times\n` +
        `- Pickup location\n` +
        `- Number of passengers\n` +
        `- Any special requirements\n\n` +
        `Thank you!`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Call Us Function
function callUs() {
    window.location.href = "tel:+919867050052";
}

// Smooth Scrolling Functions
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add smooth scrolling to all internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation to service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Add loading animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Add click outside to close any modals (if any)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Add service card click tracking (optional)
function trackServiceClick(serviceName) {
    console.log(`Service clicked: ${serviceName}`);
    // You can add analytics tracking here
}

// Add WhatsApp button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('[onclick*="bookViaWhatsApp"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Add success notification
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add error notification
function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
