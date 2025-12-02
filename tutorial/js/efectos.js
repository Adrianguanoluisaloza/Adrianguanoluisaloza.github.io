/**
 * 🎮 CodeQuest - Efectos Universales
 * Sistema de feedback visual y sonoro para todos los niveles
 */

// ============================================
// 🔊 SISTEMA DE AUDIO
// ============================================
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

// Sonidos del sistema
const Sonidos = {
    exito: () => {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // Do
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // Mi
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // Sol
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
    },
    
    error: () => {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    },
    
    click: () => {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
    },
    
    ejecutar: () => {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
    },
    
    cargando: () => {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
    },
    
    estrella: () => {
        const ctx = initAudio();
        [523, 659, 784, 1047].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.2);
        });
    }
};

// ============================================
// 🎨 SISTEMA DE NOTIFICACIONES TOAST
// ============================================
function mostrarToast(mensaje, tipo = 'info', duracion = 3000) {
    // Crear contenedor si no existe
    let contenedor = document.getElementById('toast-container');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'toast-container';
        contenedor.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(contenedor);
    }
    
    // Iconos y colores por tipo
    const estilos = {
        exito: { icon: '✅', bg: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff' },
        error: { icon: '❌', bg: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff' },
        info: { icon: 'ℹ️', bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff' },
        warning: { icon: '⚠️', bg: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' },
        ejecutando: { icon: '🚀', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff' },
        cargando: { icon: '⏳', bg: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff' }
    };
    
    const estilo = estilos[tipo] || estilos.info;
    
    // Crear toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        background: ${estilo.bg};
        color: ${estilo.color};
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'Nunito', 'Segoe UI', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        pointer-events: auto;
        min-width: 250px;
    `;
    
    toast.innerHTML = `
        <span style="font-size: 1.5rem;">${estilo.icon}</span>
        <span>${mensaje}</span>
    `;
    
    contenedor.appendChild(toast);
    
    // Animar entrada
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });
    
    // Reproducir sonido según tipo
    if (tipo === 'exito') Sonidos.exito();
    else if (tipo === 'error') Sonidos.error();
    else if (tipo === 'ejecutando') Sonidos.ejecutar();
    else if (tipo === 'cargando') Sonidos.cargando();
    else Sonidos.click();
    
    // Animar salida y eliminar
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 400);
    }, duracion);
}

// ============================================
// ✨ EFECTOS DE BOTONES
// ============================================
function agregarEfectoRipple(boton) {
    boton.style.position = 'relative';
    boton.style.overflow = 'hidden';
    
    boton.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            margin-left: -5px;
            margin-top: -5px;
        `;
        
        this.appendChild(ripple);
        Sonidos.click();
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Inyectar estilos de animación
function inyectarEstilos() {
    if (document.getElementById('codequest-efectos-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'codequest-efectos-styles';
    styles.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(40);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        @keyframes pulse-success {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        
        @keyframes pulse-error {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        
        @keyframes bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.1); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .btn-loading {
            position: relative;
            pointer-events: none;
            opacity: 0.8;
        }
        
        .btn-loading::after {
            content: '';
            position: absolute;
            right: 10px;
            top: 50%;
            width: 16px;
            height: 16px;
            margin-top: -8px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        .shake-effect {
            animation: shake 0.5s ease-in-out;
        }
        
        .success-pulse {
            animation: pulse-success 0.5s ease-out;
        }
        
        .error-pulse {
            animation: pulse-error 0.5s ease-out;
        }
        
        .bounce-in {
            animation: bounce-in 0.5s ease-out;
        }
        
        /* Estilos de botones mejorados */
        .btn-ejecutar, .api-btn, .btn-crono, .sonido-btn, .tema-btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .btn-ejecutar:hover, .api-btn:hover, .btn-crono:hover {
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
        }
        
        .btn-ejecutar:active, .api-btn:active, .btn-crono:active {
            transform: translateY(0) scale(0.98) !important;
        }
    `;
    document.head.appendChild(styles);
}

// ============================================
// 🎯 WRAPPER PARA EJECUTAR CÓDIGO
// ============================================
function ejecutarConFeedback(callback, mensajeExito = '¡Código ejecutado correctamente!', mensajeError = 'Error al ejecutar') {
    return async function(...args) {
        const boton = document.activeElement;
        
        // Mostrar estado de carga
        mostrarToast('Ejecutando código...', 'ejecutando', 1500);
        
        if (boton && boton.tagName === 'BUTTON') {
            boton.classList.add('btn-loading');
        }
        
        try {
            await callback.apply(this, args);
            
            setTimeout(() => {
                mostrarToast(mensajeExito, 'exito');
                if (boton) {
                    boton.classList.remove('btn-loading');
                    boton.classList.add('success-pulse');
                    setTimeout(() => boton.classList.remove('success-pulse'), 500);
                }
            }, 500);
            
        } catch (error) {
            mostrarToast(mensajeError + ': ' + error.message, 'error');
            if (boton) {
                boton.classList.remove('btn-loading');
                boton.classList.add('shake-effect');
                setTimeout(() => boton.classList.remove('shake-effect'), 500);
            }
        }
    };
}

// ============================================
// 🌐 WRAPPER PARA FETCH/API
// ============================================
function fetchConFeedback(url, opciones = {}) {
    mostrarToast('Conectando con servidor...', 'cargando', 2000);
    
    return fetch(url, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de red: ' + response.status);
            }
            mostrarToast('¡Datos recibidos!', 'exito', 2000);
            return response;
        })
        .catch(error => {
            mostrarToast('Error de conexión: ' + error.message, 'error');
            throw error;
        });
}

// ============================================
// ⭐ SISTEMA DE QUIZ MEJORADO
// ============================================
function verificarRespuestaConEfectos(elemento, esCorrecta, onCorrect, onIncorrect) {
    if (elemento.classList.contains('correcta') || elemento.classList.contains('incorrecta')) {
        return;
    }
    
    const opciones = elemento.parentElement.querySelectorAll('.quiz-opcion');
    opciones.forEach(op => op.style.pointerEvents = 'none');
    
    if (esCorrecta) {
        elemento.classList.add('correcta');
        elemento.classList.add('bounce-in');
        mostrarToast('¡Correcto! 🎉', 'exito', 2000);
        Sonidos.exito();
        if (onCorrect) onCorrect();
    } else {
        elemento.classList.add('incorrecta');
        elemento.classList.add('shake-effect');
        mostrarToast('Incorrecto, ¡intenta en la siguiente!', 'error', 2000);
        Sonidos.error();
        if (onIncorrect) onIncorrect();
    }
}

// Celebración de estrellas
function celebrarEstrella(starElement) {
    starElement.classList.add('activa');
    starElement.classList.add('bounce-in');
    Sonidos.estrella();
    
    // Crear partículas
    for (let i = 0; i < 5; i++) {
        const particula = document.createElement('span');
        particula.textContent = '✨';
        particula.style.cssText = `
            position: absolute;
            font-size: 1rem;
            pointer-events: none;
            animation: flotar ${1 + Math.random()}s ease-out forwards;
            left: ${starElement.offsetLeft + Math.random() * 30}px;
            top: ${starElement.offsetTop}px;
        `;
        starElement.parentElement.style.position = 'relative';
        starElement.parentElement.appendChild(particula);
        setTimeout(() => particula.remove(), 1500);
    }
}

// ============================================
// 🚀 INICIALIZACIÓN AUTOMÁTICA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    inyectarEstilos();
    
    // Agregar efecto ripple a todos los botones
    document.querySelectorAll('button, .btn-ejecutar, .api-btn, .btn-crono, .sonido-btn, .tema-btn, .nav-btn, .quiz-opcion').forEach(btn => {
        agregarEfectoRipple(btn);
    });
    
    // Mensaje de bienvenida
    setTimeout(() => {
        mostrarToast('¡Bienvenido a CodeQuest! 🚀', 'info', 3000);
    }, 500);
});

// ============================================
// 📦 EXPORTAR PARA USO GLOBAL
// ============================================
window.CodeQuest = {
    mostrarToast,
    Sonidos,
    ejecutarConFeedback,
    fetchConFeedback,
    verificarRespuestaConEfectos,
    celebrarEstrella,
    agregarEfectoRipple
};

// Compatibilidad con funciones directas
window.mostrarToast = mostrarToast;
window.Sonidos = Sonidos;
