
// ===== Navigation & Section Management =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    initializeMockTest();
    initializeChat();
    initializeMobileMenu();
});

// Navigation between sections
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            
            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'evaluate': 'Performance Evaluation',
                'mock-test': 'Generate Mock Test',
                'ask-tutor': 'Ask AI Tutor'
            };
            pageTitle.textContent = titles[targetSection] || 'Dashboard';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Quick access cards navigation
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetSection = card.getAttribute('data-section');
            const targetNav = document.querySelector(`[data-section="${targetSection}"]`);
            if (targetNav) {
                targetNav.click();
            }
        });
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

// ===== Chart Initialization =====
function initializeCharts() {
    initializeProgressChart();
    initializePerformanceChart();
}

// Dashboard Progress Chart
function initializeProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: [4, 6, 5, 7, 8, 6, 7],
                borderColor: '#6C63FF',
                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#6C63FF',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' hours';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + 'h';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Evaluate Performance Chart
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Mathematics',
                    data: [85, 88, 90, 89, 92],
                    backgroundColor: '#6366F1',
                    borderRadius: 8
                },
                {
                    label: 'Physics',
                    data: [78, 82, 85, 87, 88],
                    backgroundColor: '#8B5CF6',
                    borderRadius: 8
                },
                {
                    label: 'Chemistry',
                    data: [80, 82, 83, 84, 85],
                    backgroundColor: '#EC4899',
                    borderRadius: 8
                },
                {
                    label: 'English',
                    data: [72, 74, 76, 77, 78],
                    backgroundColor: '#F59E0B',
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ===== Mock Test Generator =====
function initializeMockTest() {
    // Subject selection
    const subjectBtns = document.querySelectorAll('.subject-btn');
    let selectedSubject = 'mathematics';
    
    subjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subjectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSubject = btn.getAttribute('data-subject');
            updateTopics(selectedSubject);
        });
    });
    
    // Difficulty selection
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    let selectedDifficulty = 'medium';
    
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDifficulty = btn.getAttribute('data-difficulty');
        });
    });
    
    // Question counter
    const minusBtn = document.querySelector('.counter-btn.minus');
    const plusBtn = document.querySelector('.counter-btn.plus');
    const questionInput = document.getElementById('questionCount');
    
    minusBtn.addEventListener('click', () => {
        let value = parseInt(questionInput.value);
        if (value > 5) {
            questionInput.value = value - 5;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let value = parseInt(questionInput.value);
        if (value < 50) {
            questionInput.value = value + 5;
        }
    });
    
    // Generate test button
    const generateBtn = document.getElementById('generateTestBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const testPreview = document.getElementById('testPreview');
    
    generateBtn.addEventListener('click', () => {
        // Show loading
        loadingOverlay.classList.add('active');
        
        // Get selected options
        const format = document.querySelector('input[name="format"]:checked').id;
        const questionCount = questionInput.value;
        const timeLimit = document.querySelector('.time-select').value;
        
        const selectedTopics = Array.from(document.querySelectorAll('.topic-checkbox input:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent);
        
        // Simulate test generation
        setTimeout(() => {
            loadingOverlay.classList.remove('active');
            displayTestPreview(selectedSubject, selectedTopics, selectedDifficulty, questionCount, format, timeLimit);
        }, 2000);
    });
}

// Update topics based on selected subject
function updateTopics(subject) {
    const topicSelector = document.getElementById('topicSelector');
    
    const topics = {
        mathematics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus'],
        physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
        chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
        english: ['Grammar', 'Vocabulary', 'Comprehension', 'Essay Writing'],
        history: ['Ancient History', 'Medieval History', 'Modern History', 'World Wars'],
        biology: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology']
    };
    
    const subjectTopics = topics[subject] || [];
    
    topicSelector.innerHTML = subjectTopics.map((topic, index) => `
        <div class="topic-checkbox">
            <input type="checkbox" id="topic${index + 1}" ${index < 2 ? 'checked' : ''}>
            <label for="topic${index + 1}">${topic}</label>
        </div>
    `).join('');
}

// Display test preview
function displayTestPreview(subject, topics, difficulty, questionCount, format, timeLimit) {
    const testPreview = document.getElementById('testPreview');
    
    const formatNames = {
        'mcq': 'Multiple Choice (MCQ)',
        'short': 'Short Answer',
        'mixed': 'Mixed Format',
        'truefalse': 'True/False'
    };
    
    testPreview.innerHTML = `
        <div style="animation: fadeIn 0.3s ease;">
            <div style="background: linear-gradient(135deg, #6C63FF 0%, #4F46E5 100%); color: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${subject.charAt(0).toUpperCase() + subject.slice(1)} Mock Test</h3>
                <p style="opacity: 0.95;">Test ID: MT-${Date.now().toString().slice(-6)}</p>
            </div>
            
            <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: #F9FAFB; padding: 1rem; border-radius: 8px;">
                    <strong style="color: #6B7280; font-size: 0.85rem;">Topics Covered</strong>
                    <p style="margin-top: 0.25rem; font-weight: 600;">${topics.join(', ')}</p>
                </div>
                
                <div style="background: #F9FAFB; padding: 1rem; border-radius: 8px;">
                    <strong style="color: #6B7280; font-size: 0.85rem;">Difficulty</strong>
                    <p style="margin-top: 0.25rem; font-weight: 600; text-transform: capitalize;">${difficulty}</p>
                </div>
                
                <div style="background: #F9FAFB; padding: 1rem; border-radius: 8px;">
                    <strong style="color: #6B7280; font-size: 0.85rem;">Questions</strong>
                    <p style="margin-top: 0.25rem; font-weight: 600;">${questionCount} Questions</p>
                </div>
                
                <div style="background: #F9FAFB; padding: 1rem; border-radius: 8px;">
                    <strong style="color: #6B7280; font-size: 0.85rem;">Format</strong>
                    <p style="margin-top: 0.25rem; font-weight: 600;">${formatNames[format]}</p>
                </div>
                
                <div style="background: #F9FAFB; padding: 1rem; border-radius: 8px;">
                    <strong style="color: #6B7280; font-size: 0.85rem;">Time Limit</strong>
                    <p style="margin-top: 0.25rem; font-weight: 600;">${timeLimit} minutes</p>
                </div>
            </div>
            
            <button style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #6C63FF 0%, #4F46E5 100%); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: all 0.25s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-play" style="margin-right: 0.5rem;"></i>
                Start Test Now
            </button>
        </div>
    `;
}

// ===== Chat Functionality =====
function initializeChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Send message on Enter (Shift+Enter for new line)
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Quick question buttons
    quickQuestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.querySelector('span').textContent;
            chatInput.value = question;
            sendMessage();
        });
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add student message
        addMessage(message, 'student');
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate AI response
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const response = generateAIResponse(message);
            addMessage(response, 'tutor');
        }, 1500 + Math.random() * 1000);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'tutor' ? 'robot' : 'user'}"></i>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <strong>${sender === 'tutor' ? 'AI Tutor' : 'You'}</strong>
                    <span class="message-time">${currentTime}</span>
                </div>
                <div class="message-text">
                    ${text.split('\n').map(line => `<p>${line}</p>`).join('')}
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function generateAIResponse(question) {
        const responses = {
            'quadratic': `<p><strong>Great question about quadratic equations!</strong> 📐</p>
                <p>A quadratic equation has the form: <strong>ax² + bx + c = 0</strong></p>
                <p><strong>Three methods to solve:</strong></p>
                <p><strong>1. Factoring Method:</strong><br>
                   Example: x² + 5x + 6 = 0<br>
                   Factor: (x + 2)(x + 3) = 0<br>
                   Solutions: x = -2 or x = -3</p>
                <p><strong>2. Quadratic Formula:</strong><br>
                   x = (-b ± √(b² - 4ac)) / 2a<br>
                   This works for any quadratic equation!</p>
                <p><strong>3. Completing the Square:</strong><br>
                   Useful for deriving the quadratic formula.</p>
                <p>Would you like me to work through a specific example? 🎯</p>`,
            
            'newton': `<p><strong>Newton's Third Law of Motion</strong> 🚀</p>
                <p><strong>Law:</strong> For every action, there is an equal and opposite reaction.</p>
                <p><strong>Key Points:</strong></p>
                <p>• Forces always occur in pairs (action-reaction pairs)<br>
                   • These forces are equal in magnitude<br>
                   • They act in opposite directions<br>
                   • They act on different objects</p>
                <p><strong>Real-life Examples:</strong></p>
                <p>🎾 <strong>Tennis ball:</strong> When you hit a ball with a racket, the racket exerts force on the ball (action), and the ball exerts equal force back on the racket (reaction).</p>
                <p>🚗 <strong>Car movement:</strong> Car tires push backward on the road (action), and the road pushes the car forward (reaction).</p>
                <p>🚀 <strong>Rocket propulsion:</strong> Gases push out backward (action), propelling the rocket forward (reaction).</p>
                <p>Does this help clarify the concept? Let me know if you'd like more examples! ✨</p>`,
            
            'covalent': `<p><strong>Covalent Bonding Explained</strong> ⚛️</p>
                <p><strong>Definition:</strong> A covalent bond is formed when two atoms share electrons to achieve stability.</p>
                <p><strong>Key Characteristics:</strong></p>
                <p>• Occurs between non-metal atoms<br>
                   • Electrons are shared, not transferred<br>
                   • Forms molecules<br>
                   • Generally has lower melting/boiling points than ionic compounds</p>
                <p><strong>Types of Covalent Bonds:</strong></p>
                <p><strong>1. Single Bond:</strong> One pair of electrons shared (e.g., H₂, Cl₂)<br>
                   <strong>2. Double Bond:</strong> Two pairs of electrons shared (e.g., O₂, CO₂)<br>
                   <strong>3. Triple Bond:</strong> Three pairs of electrons shared (e.g., N₂)</p>
                <p><strong>Example - Water (H₂O):</strong><br>
                   Oxygen shares electrons with two hydrogen atoms, forming two single covalent bonds.</p>
                <p>Need more clarification on any specific aspect? 💡</p>`,
            
            'metaphor': `<p><strong>Metaphor vs Simile - The Key Differences</strong> 📚</p>
                <p><strong>Simile:</strong> Compares two things using "like" or "as"</p>
                <p><strong>Examples:</strong><br>
                   • "Her smile was <strong>as bright as</strong> the sun"<br>
                   • "He runs <strong>like</strong> the wind"<br>
                   • "The classroom was <strong>as cold as</strong> an icebox"</p>
                <p><strong>Metaphor:</strong> Directly states one thing IS another (without using "like" or "as")</p>
                <p><strong>Examples:</strong><br>
                   • "Her smile <strong>was</strong> sunshine" (not using "like")<br>
                   • "Time <strong>is</strong> money"<br>
                   • "The world <strong>is</strong> a stage"</p>
                <p><strong>Quick Tip:</strong> If you can remove "like" or "as" and the comparison still makes sense, it's a metaphor. If you need those words, it's a simile! 🎭</p>
                <p>Try creating your own examples! It's great practice. 🌟</p>`,
            
            'photosynthesis': `<p><strong>Photosynthesis Process Explained</strong> 🌱</p>
                <p><strong>Definition:</strong> The process by which plants convert light energy into chemical energy (food).</p>
                <p><strong>Simple Equation:</strong><br>
                   6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂<br>
                   (Carbon dioxide + Water + Light → Glucose + Oxygen)</p>
                <p><strong>Two Main Stages:</strong></p>
                <p><strong>1. Light-Dependent Reactions (Light Reactions):</strong><br>
                   • Occur in the thylakoid membranes<br>
                   • Require sunlight<br>
                   • Water molecules are split<br>
                   • Oxygen is released<br>
                   • ATP and NADPH are produced</p>
                <p><strong>2. Light-Independent Reactions (Calvin Cycle):</strong><br>
                   • Occur in the stroma<br>
                   • Don't require direct light<br>
                   • Use ATP and NADPH from light reactions<br>
                   • CO₂ is converted into glucose</p>
                <p><strong>Why It's Important:</strong><br>
                   🌍 Produces oxygen for all living beings<br>
                   🍎 Creates food (glucose) for the plant<br>
                   ♻️ Part of the carbon cycle</p>
                <p>Would you like me to explain any specific stage in more detail? 🔬</p>`
        };
        
        // Check for keywords in the question
        const lowerQuestion = question.toLowerCase();
        
        if (lowerQuestion.includes('quadratic')) {
            return responses.quadratic;
        } else if (lowerQuestion.includes('newton')) {
            return responses.newton;
        } else if (lowerQuestion.includes('covalent')) {
            return responses.covalent;
        } else if (lowerQuestion.includes('metaphor') || lowerQuestion.includes('simile')) {
            return responses.metaphor;
        } else if (lowerQuestion.includes('photosynthesis')) {
            return responses.photosynthesis;
        }
        
        // Default response
        return `<p>Thank you for your question! 🎓</p>
            <p>I understand you're asking about: "<em>${question}</em>"</p>
            <p>I'm here to provide clear, detailed explanations on any subject. To give you the best answer, could you please:</p>
            <p>• Specify the subject (Math, Science, English, etc.)<br>
               • Mention the specific topic or concept<br>
               • Let me know what part is confusing</p>
            <p><strong>Example questions I can help with:</strong><br>
               📐 "How do I solve quadratic equations?"<br>
               🔬 "Explain Newton's Third Law"<br>
               📚 "What's the difference between metaphor and simile?"<br>
               ⚛️ "How does photosynthesis work?"</p>
            <p>Feel free to ask, and I'll provide a step-by-step explanation! ✨</p>`;
    }
}

// ===== Utility Functions =====

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}

// Format time
function formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(date);
}

// Show notification (for future use)
function showNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can implement a toast notification system here
}

// ===== Animation Utilities =====

// Fade in elements on scroll (for future use)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

// Console welcome message
console.log('%c🎓 AI Tutor Platform ', 'background: linear-gradient(135deg, #6C63FF 0%, #4F46E5 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;');
console.log('%cWelcome to your personalized learning experience!', 'color: #6C63FF; font-size: 14px; font-weight: 600;');
