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
    
    // List of logo files in the assets/images/logo/ folder
    const logoFiles = [
        'AlphaLum_logo.svg',
        'AlphaLum_logo.png',
        'light-full-logo.png',
        'light-symbol.png'
    ];
    
    logoFiles.forEach(filename => {
        const logoItem = document.createElement('div');
        logoItem.className = 'logo-item';
        
        const img = document.createElement('img');
        img.src = `assets/images/logo/${filename}`;
        img.alt = filename;
        
        const name = document.createElement('div');
        name.className = 'logo-name';
        name.textContent = filename;
        
        logoItem.appendChild(img);
        logoItem.appendChild(name);
        logoGrid.appendChild(logoItem);
    });
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
    // Get current rainbow colors from CSS variables (4 colors: Primary → Accent 1 → Secondary → Accent 2)
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const primary = computedStyle.getPropertyValue('--brand-primary').trim();
    const secondary = computedStyle.getPropertyValue('--brand-secondary').trim();
    const accent1 = computedStyle.getPropertyValue('--brand-accent-1').trim();
    const accent2 = computedStyle.getPropertyValue('--brand-accent-2').trim();
    
    // Create 4-color gradient: Primary → Accent 1 → Secondary → Accent 2
    const gradient = `linear-gradient(90deg, ${primary} 10%, ${accent1} 50.33%, ${secondary} 90%)`;
    
    // Update CSS variable
    root.style.setProperty('--rainbow-gradient', gradient);
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

// Sticky Navigation Initialization
function initializeStickyNav() {
    // Color pickers in sticky nav
    const stickyColorMappings = {
        'sticky-primary': { main: 'primary-color', text: 'primary-color-text', var: '--brand-primary' },
        'sticky-secondary': { main: 'secondary-color', text: 'secondary-color-text', var: '--brand-secondary' },
        'sticky-accent-1': { main: 'accent-1-color', text: 'accent-1-color-text', var: '--brand-accent-1' },
        'sticky-accent-2': { main: 'accent-2-color', text: 'accent-2-color-text', var: '--brand-accent-2' },
        'sticky-button': { main: 'button-color', text: 'button-color-text', var: '--brand-button' },
        'sticky-bg-1': { main: 'bg-1-color', text: 'bg-1-color-text', var: '--brand-bg-1' },
        'sticky-bg-2': { main: 'bg-2-color', text: 'bg-2-color-text', var: '--brand-bg-2' },
        'sticky-bg-3': { main: 'bg-3-color', text: 'bg-3-color-text', var: '--brand-bg-3' }
    };
    
    Object.keys(stickyColorMappings).forEach(stickyId => {
        const stickyPicker = document.getElementById(stickyId);
        const mapping = stickyColorMappings[stickyId];
        const mainPicker = document.getElementById(mapping.main);
        const textInput = document.getElementById(mapping.text);
        
        if (!stickyPicker || !mainPicker) return;
        
        // When sticky picker changes, update main controls and CSS
        stickyPicker.addEventListener('input', function() {
            const color = this.value;
            mainPicker.value = color;
            if (textInput) {
                textInput.value = color.toUpperCase();
            }
            updateCSSVariable(mapping.var, color);
            
            // Update swatch if it exists
            const swatchId = mapping.main.replace('-color', '-swatch');
            const swatch = document.getElementById(swatchId);
            if (swatch) {
                updateSwatch(swatch, color);
            }
            
            // Update rainbow gradient if it's a rainbow color (primary, secondary, or accent)
            if (mapping.var.includes('primary') || mapping.var.includes('secondary') || mapping.var.includes('accent')) {
                updateRainbowGradient();
            }
            
            // Update tertiary button background if primary color changes
            if (mapping.var === '--brand-primary') {
                updateTertiaryButtonColor(color);
            }
        });
        
        // When main picker changes, update sticky picker
        mainPicker.addEventListener('input', function() {
            stickyPicker.value = this.value;
        });
    });
    
    // Font selectors are now handled by the modal in initializeFontModal
}

// Hero Video Ping-Pong Loop Initialization
function initializeHeroVideo() {
    // Initialize both light and dark hero videos
    initializeSingleVideo('hero-background-video');
    initializeSingleVideo('hero-background-video-dark');
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
    // Get all hero button containers
    const lightHeroButtons = document.querySelector('.mock-hero-light .hero-buttons');
    const darkHeroButtons = document.querySelector('.mock-hero-dark .hero-buttons');
    
    if (!lightHeroButtons || !darkHeroButtons) return;
    
    // Define button HTML based on style
    let lightButtonsHTML = '';
    let darkButtonsHTML = '';
    
    switch(style) {
        case 'standard':
            // Standard buttons (primary + secondary)
            lightButtonsHTML = `
                <button class="btn-primary">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-zig-zag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 20v-10l10 6v-12" /><path d="M13 7l3 -3l3 3" /></svg>
                </button>
                <button class="btn-secondary">
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18v-11.31a.7 .7 0 0 1 1.195 -.495l9.805 9.805" /><path d="M13 16h5v-5" /></svg>
                </button>
            `;
            
            darkButtonsHTML = `
                <button class="btn-primary-white">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-zig-zag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 20v-10l10 6v-12" /><path d="M13 7l3 -3l3 3" /></svg>
                </button>
                <button class="btn-secondary-white">
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18v-11.31a .7 .7 0 0 1 1.195 -.495l9.805 9.805" /><path d="M13 16h5v-5" /></svg>
                </button>
            `;
            break;
            
        case 'gradient':
            // Gradient button (only contact us)
            lightButtonsHTML = `
                <button class="btn-gradient">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18v-11.31a .7 .7 0 0 1 1.195 -.495l9.805 9.805" /><path d="M13 16h5v-5" /></svg>
                </button>
            `;
            
            darkButtonsHTML = `
                <button class="btn-gradient">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18v-11.31a .7 .7 0 0 1 1.195 -.495l9.805 9.805" /><path d="M13 16h5v-5" /></svg>
                </button>
            `;
            break;
            
        case 'rainbow-border':
            // Rainbow border button (only contact us)
            lightButtonsHTML = `
                <button class="btn-experimental-border">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18v-11.31a .7 .7 0 0 1 1.195 -.495l9.805 9.805" /><path d="M13 16h5v-5" /></svg>
                </button>
            `;
            
            darkButtonsHTML = `
                <button class="btn-experimental-border">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18v-11.31a .7 .7 0 0 1 1.195 -.495l9.805 9.805" /><path d="M13 16h5v-5" /></svg>
                </button>
            `;
            break;
    }
    
    // Update the HTML
    lightHeroButtons.innerHTML = lightButtonsHTML;
    darkHeroButtons.innerHTML = darkButtonsHTML;
}

// Make export functions available globally
window.exportBrandGuidelines = function() {
    return {
        colors: exportColorPalette(),
        typography: exportTypography()
    };
};

