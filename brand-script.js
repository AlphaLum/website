// Brand Guidelines Interactive Script

// Font options
const FONT_OPTIONS = [
    'Inter',
    'DM Sans',
    'Roboto',
    'Work Sans',
    'Poppins',
    'Montserrat',
    'Open Sans',
    'Lato',
    'Raleway',
    'Playfair Display',
    'Nunito',
    'Source Sans Pro'
];

let currentFontType = 'header'; // 'header' or 'body'

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLogoGrid();
    initializeColorControls();
    initializeTypographyControls();
    initializeStickyNav();
    initializeFontModal();
    initializeHeroVideo();
    initializeButtonStyleTabs();
    initializeMoreBenefits();
    
    // Load initial fonts
    loadGoogleFont('Inter', 'header');
    loadGoogleFont('DM Sans', 'body');
    
    // Initialize rainbow gradient
    updateRainbowGradient();
    
    // Initialize tertiary button color
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--brand-primary').trim();
    updateTertiaryButtonColor(primaryColor);
});

// Logo Grid Initialization
function initializeLogoGrid() {
    const logoGrid = document.getElementById('logo-grid');
    
    // Top logos to show initially (final options) with custom max-heights
    const topLogos = [
        { filename: 'final-options/final-option-1.png', maxHeight: '55px' },
        { filename: 'final-options/final-option-2.png', maxHeight: '55px' },
        { filename: 'final-options/final-option-3.png', maxHeight: '55px' },
        
    ];
    
    // All other logos (explorations)
    const additionalLogos = [
        'final-options/final-option-4.png',
        'final-options/final-option-5.png',
        'final-options/final-option-6.png',
        'final-options/final-option-7.png',
        'final-options/final-option-8.png',
        'final-options/final-option-9.png',
        'final-options/final-option-11.png',
        'final-options/final-option-12.png',
        'AlphaLum_logo.svg',
        'AlphaLum_logo.png',
        'light-full-logo.png',
        'light-symbol.png',
        'logo-a.png',
        'logo-b.png',
        'logo-c.png',
        'logo-d.png',
        'logo-e.png',
        'logo-f.png',
        'logo-g.png',
        'logo-h.png',
        'logo-i.png',
        'logo-j.png',
        'logo-k.png',
        'logo-l.png',
        'logo-m.png',
        'logo-n.png',
        'logo-o.png',
        'logo-p.png',
        'logo-q.png',
        'logo-z.png'
    ];
    
    // Create logo items
    function createLogoItem(filename, isTopLogo, maxHeight = null) {
        const logoItem = document.createElement('div');
        logoItem.className = isTopLogo ? 'logo-item logo-item-top' : 'logo-item logo-item-additional';
        logoItem.style.cursor = 'pointer';
        
        const img = document.createElement('img');
        img.src = `assets/images/logo/${filename}`;
        img.alt = filename;
        
        // Apply custom max-height if provided
        if (maxHeight) {
            img.style.maxHeight = maxHeight;
        }
        
        const name = document.createElement('div');
        name.className = 'logo-name';
        name.textContent = filename;
        
        // Add click event to change sticky nav logo
        logoItem.addEventListener('click', function() {
            changeStickyLogo(`assets/images/logo/${filename}`);
        });
        
        logoItem.appendChild(img);
        logoItem.appendChild(name);
        
        return logoItem;
    }
    
    // Add top logos
    topLogos.forEach(logoData => {
        const logoItem = createLogoItem(logoData.filename, true, logoData.maxHeight);
        logoGrid.appendChild(logoItem);
    });
    
    // Add additional logos (hidden initially)
    additionalLogos.forEach(filename => {
        const logoItem = createLogoItem(filename, false);
        logoItem.style.display = 'none';
        logoGrid.appendChild(logoItem);
    });
    
    // Create "View More" button
    const viewMoreBtn = document.createElement('button');
    viewMoreBtn.className = 'btn-secondary view-more-logos';
    viewMoreBtn.innerHTML = `
        <span>View All Logo Explorations</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
    `;
    
    let isExpanded = false;
    
    viewMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        const additionalItems = document.querySelectorAll('.logo-item-additional');
        
        if (isExpanded) {
            additionalItems.forEach(item => {
                item.style.display = 'flex';
            });
            viewMoreBtn.innerHTML = `
                <span>View Less</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15l6 -6l6 6" /></svg>
            `;
        } else {
            additionalItems.forEach(item => {
                item.style.display = 'none';
            });
            viewMoreBtn.innerHTML = `
                <span>View All Logo Explorations</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
            `;
        }
    });
    
    // Add button after the logo grid
    logoGrid.parentElement.appendChild(viewMoreBtn);
}

// Change Sticky Navigation Logo
function changeStickyLogo(logoPath) {
    const stickyLogo = document.getElementById('sticky-logo-img');
    if (stickyLogo) {
        stickyLogo.src = logoPath;
    }
}

// Color Controls Initialization
function initializeColorControls() {
    const colorMappings = {
        'primary': '--brand-primary',
        'secondary': '--brand-secondary',
        'bg-1': '--brand-bg-1',
        'bg-2': '--brand-bg-2',
        'bg-3': '--brand-bg-3',
        'accent-1': '--brand-accent-1',
        'accent-2': '--brand-accent-2',
        'button': '--brand-button',
        'font-primary': '--brand-font-primary',
        'font-secondary': '--brand-font-secondary',
        'font-light': '--brand-font-light',
        'error': '--brand-error',
        'success': '--brand-success'
    };
    
    Object.keys(colorMappings).forEach(colorKey => {
        const colorPicker = document.getElementById(`${colorKey}-color`);
        const colorText = document.getElementById(`${colorKey}-color-text`);
        const colorSwatch = document.getElementById(`${colorKey}-swatch`);
        const cssVariable = colorMappings[colorKey];
        
        if (!colorPicker || !colorText || !colorSwatch) return;
        
        // Initialize swatch
        updateSwatch(colorSwatch, colorPicker.value);
        
        // Color picker change event
        colorPicker.addEventListener('input', function() {
            const color = this.value;
            colorText.value = color.toUpperCase();
            updateSwatch(colorSwatch, color);
            updateCSSVariable(cssVariable, color);
            
            // Update rainbow gradient if it's a rainbow color
            if (cssVariable.includes('primary') || cssVariable.includes('secondary') || cssVariable.includes('accent')) {
                updateRainbowGradient();
            }
            
            // Update tertiary button background if primary color changes
            if (cssVariable === '--brand-primary') {
                updateTertiaryButtonColor(color);
            }
        });
        
        // Text input change event
        colorText.addEventListener('input', function() {
            let color = this.value.trim();
            
            // Add # if missing
            if (color && !color.startsWith('#')) {
                color = '#' + color;
            }
            
            // Validate hex color
            if (isValidHexColor(color)) {
                colorPicker.value = color;
                updateSwatch(colorSwatch, color);
                updateCSSVariable(cssVariable, color);
                
                // Update rainbow gradient if it's a rainbow color
                if (cssVariable.includes('primary') || cssVariable.includes('secondary') || cssVariable.includes('accent')) {
                    updateRainbowGradient();
                }
            }
        });
        
        // Blur event to format the text input
        colorText.addEventListener('blur', function() {
            let color = this.value.trim();
            if (color && !color.startsWith('#')) {
                color = '#' + color;
            }
            if (isValidHexColor(color)) {
                this.value = color.toUpperCase();
            } else {
                // Reset to picker value if invalid
                this.value = colorPicker.value.toUpperCase();
            }
        });
    });
}

// Typography Controls Initialization
function initializeTypographyControls() {
    // These are now handled by the modal
    // Font buttons in the main section
    const headerFontBtn = document.getElementById('header-font-btn');
    const bodyFontBtn = document.getElementById('body-font-btn');
    
    if (headerFontBtn) {
        headerFontBtn.addEventListener('click', function() {
            currentFontType = 'header';
            openFontModal('header');
        });
    }
    
    if (bodyFontBtn) {
        bodyFontBtn.addEventListener('click', function() {
            currentFontType = 'body';
            openFontModal('body');
        });
    }
}

// Helper Functions

function updateSwatch(swatchElement, color) {
    swatchElement.style.backgroundColor = color;
}

function updateCSSVariable(variable, value) {
    document.documentElement.style.setProperty(variable, value);
}

function isValidHexColor(color) {
    // Check if it's a valid 3 or 6 digit hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
}

function loadGoogleFont(fontName, type) {
    // Create a link element for the Google Font
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
    
    const linkId = type === 'header' ? 'header-font-link' : 'body-font-link';
    const linkElement = document.getElementById(linkId);
    
    if (linkElement) {
        linkElement.href = fontUrl;
    }
}

function updateFontFamily(variable, fontName) {
    // Update CSS variable with font stack
    const fontStack = `'${fontName}', sans-serif`;
    document.documentElement.style.setProperty(variable, fontStack);
}

function updateRainbowGradient() {
    // Get current rainbow colors from CSS variables (3 colors: Primary → Accent 1 → Secondary)
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const primary = computedStyle.getPropertyValue('--brand-primary').trim();
    const secondary = computedStyle.getPropertyValue('--brand-secondary').trim();
    const accent1 = computedStyle.getPropertyValue('--brand-accent-1').trim();
    
    // Create 3-color gradient: Primary → Accent 1 → Secondary
    const gradient = `linear-gradient(90deg, ${primary} 10%, ${accent1} 50%, ${secondary} 90%)`;
    
    // Update CSS variable
    root.style.setProperty('--rainbow-gradient', gradient);
    
    // Convert hex to rgba with 10% opacity for background gradient
    const primaryRgba = hexToRgba(primary, 0.1);
    const accent1Rgba = hexToRgba(accent1, 0.1);
    const secondaryRgba = hexToRgba(secondary, 0.1);
    
    const gradientBg = `linear-gradient(90deg, ${primaryRgba} 0%, ${accent1Rgba} 50%, ${secondaryRgba} 100%)`;
    root.style.setProperty('--rainbow-gradient-bg', gradientBg);
    
    // Update BG-3 swatch to show the gradient
    const bg3Swatch = document.getElementById('bg-3-swatch');
    if (bg3Swatch) {
        bg3Swatch.style.background = gradientBg;
    }
    
    // Update sticky BG-3 picker to show the gradient
    const stickyBg3 = document.getElementById('sticky-bg-3');
    if (stickyBg3) {
        stickyBg3.style.background = gradientBg;
    }
}

function hexToRgba(hex, alpha) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateTertiaryButtonColor(primaryColor) {
    // Convert hex to RGB and create 10% opacity background
    const hex = primaryColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Update CSS for tertiary buttons with 10% opacity
    const style = document.createElement('style');
    style.id = 'tertiary-button-style';
    
    // Remove old style if it exists
    const oldStyle = document.getElementById('tertiary-button-style');
    if (oldStyle) {
        oldStyle.remove();
    }
    
}

// Export color palette as JSON
function exportColorPalette() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const palette = {
        primary: computedStyle.getPropertyValue('--brand-primary').trim(),
        secondary: computedStyle.getPropertyValue('--brand-secondary').trim(),
        backgrounds: {
            light: computedStyle.getPropertyValue('--brand-bg-1').trim(),
            medium: computedStyle.getPropertyValue('--brand-bg-2').trim(),
            dark: computedStyle.getPropertyValue('--brand-bg-3').trim()
        },
        rainbow: {
            primary1: computedStyle.getPropertyValue('--brand-primary').trim(),
            primary2: computedStyle.getPropertyValue('--brand-secondary').trim(),
            accent1: computedStyle.getPropertyValue('--brand-accent-1').trim()
        },
        button: computedStyle.getPropertyValue('--brand-button').trim(),
        fonts: {
            primary: computedStyle.getPropertyValue('--brand-font-primary').trim(),
            secondary: computedStyle.getPropertyValue('--brand-font-secondary').trim(),
            light: computedStyle.getPropertyValue('--brand-font-light').trim()
        },
        status: {
            error: computedStyle.getPropertyValue('--brand-error').trim(),
            success: computedStyle.getPropertyValue('--brand-success').trim()
        }
    };
    
    console.log('Color Palette:', palette);
    return palette;
}

// Export typography settings as JSON
function exportTypography() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const typography = {
        headerFont: computedStyle.getPropertyValue('--font-header').trim(),
        bodyFont: computedStyle.getPropertyValue('--font-body').trim()
    };
    
    console.log('Typography Settings:', typography);
    return typography;
}

// Font Modal Initialization
function initializeFontModal() {
    const modal = document.getElementById('font-modal-overlay');
    const closeBtn = document.getElementById('font-modal-close');
    const modalBody = document.getElementById('font-modal-body');
    
    // Sticky nav font buttons
    const stickyHeaderBtn = document.getElementById('sticky-header-font-btn');
    const stickyBodyBtn = document.getElementById('sticky-body-font-btn');
    
    if (stickyHeaderBtn) {
        stickyHeaderBtn.addEventListener('click', function() {
            currentFontType = 'header';
            openFontModal('header');
        });
    }
    
    if (stickyBodyBtn) {
        stickyBodyBtn.addEventListener('click', function() {
            currentFontType = 'body';
            openFontModal('body');
        });
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFontModal);
    }
    
    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeFontModal();
            }
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeFontModal();
        }
    });
}

function openFontModal(fontType) {
    currentFontType = fontType;
    const modal = document.getElementById('font-modal-overlay');
    const modalTitle = document.getElementById('font-modal-title');
    const modalBody = document.getElementById('font-modal-body');
    
    // Update title
    modalTitle.textContent = fontType === 'header' ? 'Select Header Font' : 'Select Body Font';
    
    // Clear and populate font options
    modalBody.innerHTML = '';
    
    FONT_OPTIONS.forEach(fontName => {
        // Load the font
        loadGoogleFont(fontName, 'preview');
        
        const option = document.createElement('button');
        option.className = 'font-option';
        option.innerHTML = `
            <div class="font-option-text" style="font-family: '${fontName}', sans-serif;">Quick Brown Fox</div>
            <div class="font-option-name">${fontName}</div>
        `;
        
        option.addEventListener('click', function() {
            selectFont(fontName, fontType);
            closeFontModal();
        });
        
        modalBody.appendChild(option);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFontModal() {
    const modal = document.getElementById('font-modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectFont(fontName, fontType) {
    // Load the font
    loadGoogleFont(fontName, fontType);
    
    // Update CSS variable
    const variable = fontType === 'header' ? '--font-header' : '--font-body';
    updateFontFamily(variable, fontName);
    
    // Update button text in main section
    const mainBtn = document.getElementById(`${fontType}-font-name`);
    if (mainBtn) {
        mainBtn.textContent = fontName;
    }
    
    // Update button text in sticky nav
    const stickyBtn = document.getElementById(`sticky-${fontType}-font-name`);
    if (stickyBtn) {
        stickyBtn.textContent = fontName;
    }
}

// More Benefits Button Initialization
function initializeMoreBenefits() {
    const moreBenefitsBtn = document.getElementById('more-benefits-btn');
    const benefitsCards = document.getElementById('trusted-benefits-cards');
    
    if (moreBenefitsBtn && benefitsCards) {
        moreBenefitsBtn.addEventListener('click', function() {
            // Toggle cards visibility
            if (benefitsCards.style.display === 'none') {
                benefitsCards.style.display = 'grid';
                
                // Change button to "Show Less" with up arrow
                this.innerHTML = `
                    <span>Show Less</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19l0 -14" /><path d="M18 11l-6 -6" /><path d="M6 11l6 -6" /></svg>
                `;
            } else {
                benefitsCards.style.display = 'none';
                
                // Change button back to "More benefits"
                this.innerHTML = `
                    <span>More benefits</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M18 13l-6 6" /><path d="M6 13l6 6" /></svg>
                `;
            }
        });
    }
}

// Sticky Navigation Initialization
function initializeStickyNav() {
    // Handle active state for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(section => section !== null);
    
    // Function to update active link
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset for sticky header
        
        let currentSectionId = null;
        
        // Find the current section
        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        }
        
        // If we're at the very top or no section found yet (and scrolled past first one), default to first
        if (!currentSectionId && sections.length > 0 && window.scrollY < sections[0].offsetTop) {
            currentSectionId = sections[0].id; // Optional: highlight first item if near top
        }
        
        // Update classes
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call
    updateActiveLink();
}

// Hero Video Ping-Pong Loop Initialization
function initializeHeroVideo() {
    // Initialize hero videos with ping-pong loop
    initializeSingleVideo('hero-background-video');
    initializeSingleVideo('stats-video-background');
    initializeSingleVideo('contact-video-background');
    
    // Initialize glass button videos
    initializeGlassButtonVideos();
}

function initializeSingleVideo(videoId) {
    const video = document.getElementById(videoId);
    
    if (!video) return;
    
    let playbackDirection = 1; // 1 for forward, -1 for backward
    let animationFrameId = null;
    
    // Wait for video metadata to load
    video.addEventListener('loadedmetadata', function() {
        // Start playing forward
        video.play().catch(error => {
            console.log('Video autoplay was prevented:', error);
        });
    });
    
    // Handle ended event for forward playback
    video.addEventListener('ended', function() {
        playbackDirection = -1;
        playBackward();
    });
    
    // Function to play video backward using requestAnimationFrame
    function playBackward() {
        if (playbackDirection === -1) {
            const currentTime = video.currentTime;
            
            if (currentTime <= 0.03) {
                // Reached the beginning, switch to forward
                playbackDirection = 1;
                video.currentTime = 0;
                video.play().catch(error => {
                    console.log('Video play error:', error);
                });
                return;
            }
            
            // Move backward by approximately 1/30th of a second (roughly 30fps)
            video.currentTime = Math.max(0, currentTime - 0.033);
            
            animationFrameId = requestAnimationFrame(playBackward);
        }
    }
    
    // Stop backward animation if video starts playing forward
    video.addEventListener('play', function() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    });
}

// Initialize glass button videos
function initializeGlassButtonVideos() {
    const glassButtons = document.querySelectorAll('.btn-glass-video');
    
    glassButtons.forEach(button => {
        const video = button.querySelector('.btn-glass-video-background');
        
        if (!video) return;
        
        let playbackDirection = 1;
        let animationFrameId = null;
        
        video.addEventListener('loadedmetadata', function() {
            video.play().catch(error => {
                console.log('Glass button video autoplay prevented:', error);
            });
        });
        
        video.addEventListener('ended', function() {
            playbackDirection = -1;
            playBackward();
        });
        
        function playBackward() {
            if (playbackDirection === -1) {
                const currentTime = video.currentTime;
                
                if (currentTime <= 0.03) {
                    playbackDirection = 1;
                    video.currentTime = 0;
                    video.play().catch(error => {
                        console.log('Video play error:', error);
                    });
                    return;
                }
                
                video.currentTime = Math.max(0, currentTime - 0.033);
                animationFrameId = requestAnimationFrame(playBackward);
            }
        }
        
        video.addEventListener('play', function() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        });
    });
}

// Button Style Tabs Initialization
function initializeButtonStyleTabs() {
    const tabs = document.querySelectorAll('.style-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the selected style
            const style = this.dataset.style;
            
            // Update hero buttons based on selected style
            updateHeroButtons(style);
        });
    });
}

function updateHeroButtons(style) {
    // Get hero button container
    const lightHeroButtons = document.querySelector('.mock-hero-light .hero-buttons');
    
    if (!lightHeroButtons) return;
    
    // Define button HTML based on style
    let lightButtonsHTML = '';
    
    switch(style) {
        case 'standard':
            // Standard buttons (primary + secondary)
            lightButtonsHTML = `
                <button class="btn-primary">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 14h4v-4" /><path d="M3 12c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>
                </button>
                <button class="btn-secondary">
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 14h4v-4" /><path d="M3 12c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>
                </button>
            `;
            break;
            
        case 'gradient':
            // Gradient button (only contact us)
            lightButtonsHTML = `
                <button class="btn-gradient">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 14h4v-4" /><path d="M3 12c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>
                </button>
            `;
            break;
            
        case 'rainbow-border':
            // Rainbow border button (only contact us)
            lightButtonsHTML = `
                <button class="btn-experimental-border">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 14h4v-4" /><path d="M3 12c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>
                </button>
            `;
            break;
            
        case 'glass-video':
            // Glass video button (only contact us)
            lightButtonsHTML = `
                <button class="btn-glass-video">
                    <video class="btn-glass-video-background" muted playsinline>
                        <source src="assets/videos/spectrum-gradient.mp4" type="video/mp4">
                    </video>
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 14h4v-4" /><path d="M3 12c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>
                </button>
            `;
            break;
            
        case 'aurora':
            // Aurora buttons (primary + secondary)
            lightButtonsHTML = `
                <button class="btn-exp-aurora-primary">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 14h4v-4" /><path d="M3 12c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>
                </button>
                <button class="btn-exp-aurora-secondary">
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 14h4v-4" /><path d="M3 12c.887 1.284 2.48 2.033 4 2c1.52 .033 3.113 -.716 4 -2s2.48 -2.033 4 -2c1.52 -.033 3 1 4 2l2 2" /></svg>
                </button>
            `;
            break;
    }
    
    // Update the HTML
    lightHeroButtons.innerHTML = lightButtonsHTML;
    
    // Re-initialize glass button videos after updating HTML
    if (style === 'glass-video') {
        setTimeout(() => {
            initializeGlassButtonVideos();
        }, 100);
    }
}

// Make export functions available globally
window.exportBrandGuidelines = function() {
    return {
        colors: exportColorPalette(),
        typography: exportTypography()
    };
};

