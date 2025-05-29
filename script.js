// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  })

  // Navigation menu toggle
  const menuTov0ggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Scroll event for header and scroll-to-top button
  const header = document.querySelector("header")
  const scrollTopBtn = document.querySelector(".scroll-top")

  window.addEventListener("scroll", () => {
    // Header scroll effect
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Scroll to top button visibility
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("active")
    } else {
      scrollTopBtn.classList.remove("active")
    }

    // Active menu item based on scroll position
    const sections = document.querySelectorAll("section")
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Scroll to top functionality
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentSlide = 0

  function showSlide(n) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the current slide and activate the current dot
    testimonialSlides[n].classList.add("active")
    dots[n].classList.add("active")
  }

  function nextSlide() {
    currentSlide++
    if (currentSlide >= testimonialSlides.length) {
      currentSlide = 0
    }
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide--
    if (currentSlide < 0) {
      currentSlide = testimonialSlides.length - 1
    }
    showSlide(currentSlide)
  }

  // Event listeners for testimonial controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevSlide)
    nextBtn.addEventListener("click", nextSlide)

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000)

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })
  }

  // Gallery filter
  const filterBtns = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate form submission (in a real project, you would send data to a server)
      setTimeout(() => {
        contactForm.style.display = "none"
        formSuccess.classList.add("active")

        // Reset form after 5 seconds
        setTimeout(() => {
          contactForm.reset()
          contactForm.style.display = "block"
          formSuccess.classList.remove("active")
        }, 5000)
      }, 1000)
    })
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletterForm")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const input = this.querySelector("input")
      const originalValue = input.value

      input.value = "Inscrit avec succès!"
      input.disabled = true

      setTimeout(() => {
        input.value = ""
        input.disabled = false
        input.focus()
      }, 3000)
    })
  }

  // Animate stats counter
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter() {
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-count"))
      const count = Number.parseInt(stat.innerText)
      const increment = target / 100

      if (count < target) {
        stat.innerText = Math.ceil(count + increment)
        setTimeout(animateCounter, 20)
      } else {
        stat.innerText = target
      }
    })
  }

  // Start counter animation when stats section is in view
  const statsSection = document.querySelector(".stats")

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounter()
      }
    })

    observer.observe(statsSection)
  }
})

