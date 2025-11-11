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
    
    // Load initial fonts
    loadGoogleFont('Inter', 'header');
    loadGoogleFont('DM Sans', 'body');
});

// Logo Grid Initialization
function initializeLogoGrid() {
    const logoGrid = document.getElementById('logo-grid');
    
    // List of logo files in the assets/images/logo/ folder
    const logoFiles = [
        'AlphaLum_logo.svg',
        'AlphaLum_logo.png',
        'apple-touch-icon.png',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-32x32_dark.png'
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
        'accent-3': '--brand-accent-3',
        'font-primary': '--brand-font-primary',
        'font-secondary': '--brand-font-secondary',
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
    // Get current rainbow colors from CSS variables
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const red = computedStyle.getPropertyValue('--brand-accent-red').trim();
    const orange = computedStyle.getPropertyValue('--brand-accent-orange').trim();
    const yellow = computedStyle.getPropertyValue('--brand-accent-yellow').trim();
    const green = computedStyle.getPropertyValue('--brand-accent-green').trim();
    const blue = computedStyle.getPropertyValue('--brand-accent-blue').trim();
    const indigo = computedStyle.getPropertyValue('--brand-accent-indigo').trim();
    const violet = computedStyle.getPropertyValue('--brand-accent-violet').trim();
    
    // Create gradient
    const gradient = `linear-gradient(90deg, ${red} 0%, ${orange} 14.28%, ${yellow} 28.56%, ${green} 42.84%, ${blue} 57.12%, ${indigo} 71.4%, ${violet} 100%)`;
    
    // Update CSS variable
    root.style.setProperty('--rainbow-gradient', gradient);
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
        accents: {
            accent1: computedStyle.getPropertyValue('--brand-accent-1').trim(),
            accent2: computedStyle.getPropertyValue('--brand-accent-2').trim(),
            accent3: computedStyle.getPropertyValue('--brand-accent-3').trim()
        },
        fonts: {
            primary: computedStyle.getPropertyValue('--brand-font-primary').trim(),
            secondary: computedStyle.getPropertyValue('--brand-font-secondary').trim()
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
        'sticky-accent-red': { main: 'accent-red-color', text: 'accent-red-color-text', var: '--brand-accent-red' },
        'sticky-accent-orange': { main: 'accent-orange-color', text: 'accent-orange-color-text', var: '--brand-accent-orange' },
        'sticky-accent-yellow': { main: 'accent-yellow-color', text: 'accent-yellow-color-text', var: '--brand-accent-yellow' },
        'sticky-accent-green': { main: 'accent-green-color', text: 'accent-green-color-text', var: '--brand-accent-green' },
        'sticky-accent-blue': { main: 'accent-blue-color', text: 'accent-blue-color-text', var: '--brand-accent-blue' },
        'sticky-accent-indigo': { main: 'accent-indigo-color', text: 'accent-indigo-color-text', var: '--brand-accent-indigo' },
        'sticky-accent-violet': { main: 'accent-violet-color', text: 'accent-violet-color-text', var: '--brand-accent-violet' },
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
            
            // Update rainbow gradient if it's an accent color
            if (mapping.var.includes('accent')) {
                updateRainbowGradient();
            }
        });
        
        // When main picker changes, update sticky picker
        mainPicker.addEventListener('input', function() {
            stickyPicker.value = this.value;
        });
    });
    
    // Font selectors are now handled by the modal in initializeFontModal
}

// Make export functions available globally
window.exportBrandGuidelines = function() {
    return {
        colors: exportColorPalette(),
        typography: exportTypography()
    };
};

