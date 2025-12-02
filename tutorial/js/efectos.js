/**
 * 🎮 CodeQuest - Efectos Universales v2
 * Sistema de feedback visual y sonoro para todos los niveles
 */

(function() {
    'use strict';
    
    // ============================================
    // 🔊 SISTEMA DE AUDIO
    // ============================================
    let audioCtx = null;
    
    function getAudioContext() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            } catch(e) {
                console.log('Audio no soportado');
                return null;
            }
        }
        return audioCtx;
    }
    
    function playTone(freq, type, duration, volume) {
        const ctx = getAudioContext();
        if (!ctx) return;
        
        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = type || 'sine';
            osc.frequency.value = freq;
            gain.gain.value = volume || 0.2;
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch(e) {
            console.log('Error de audio:', e);
        }
    }
    
    // Sonidos del sistema
    window.Sonidos = {
        exito: function() {
            playTone(523, 'sine', 0.15, 0.2);
            setTimeout(function() { playTone(659, 'sine', 0.15, 0.2); }, 100);
            setTimeout(function() { playTone(784, 'sine', 0.2, 0.2); }, 200);
        },
        
        error: function() {
            playTone(200, 'sawtooth', 0.3, 0.15);
        },
        
        click: function() {
            playTone(800, 'sine', 0.05, 0.1);
        },
        
        ejecutar: function() {
            playTone(440, 'sine', 0.1, 0.15);
            setTimeout(function() { playTone(880, 'sine', 0.15, 0.15); }, 100);
        }
    };
    
    // ============================================
    // 🎨 SISTEMA DE NOTIFICACIONES TOAST
    // ============================================
    window.mostrarToast = function(mensaje, tipo, duracion) {
        tipo = tipo || 'info';
        duracion = duracion || 3000;
        
        // Crear contenedor si no existe
        var contenedor = document.getElementById('cq-toast-container');
        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.id = 'cq-toast-container';
            contenedor.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
            document.body.appendChild(contenedor);
        }
        
        // Configuración por tipo
        var config = {
            exito: { icon: '✅', bg: '#10b981' },
            error: { icon: '❌', bg: '#ef4444' },
            info: { icon: 'ℹ️', bg: '#3b82f6' },
            warning: { icon: '⚠️', bg: '#f59e0b' },
            ejecutando: { icon: '🚀', bg: '#8b5cf6' },
            cargando: { icon: '⏳', bg: '#6366f1' }
        };
        
        var cfg = config[tipo] || config.info;
        
        // Crear toast
        var toast = document.createElement('div');
        toast.style.cssText = 'background:' + cfg.bg + ';color:#fff;padding:12px 20px;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.3);display:flex;align-items:center;gap:10px;font-family:Nunito,Segoe UI,sans-serif;font-weight:600;transform:translateX(120%);transition:transform 0.3s ease;pointer-events:auto;';
        toast.innerHTML = '<span style="font-size:1.3rem">' + cfg.icon + '</span><span>' + mensaje + '</span>';
        
        contenedor.appendChild(toast);
        
        // Animar entrada
        setTimeout(function() {
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Sonido
        if (tipo === 'exito') Sonidos.exito();
        else if (tipo === 'error') Sonidos.error();
        else Sonidos.click();
        
        // Animar salida
        setTimeout(function() {
            toast.style.transform = 'translateX(120%)';
            setTimeout(function() {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, duracion);
    };
    
    // ============================================
    // ✨ EFECTOS DE BOTONES
    // ============================================
    function agregarEfectos() {
        // Inyectar estilos
        if (!document.getElementById('cq-styles')) {
            var style = document.createElement('style');
            style.id = 'cq-styles';
            style.textContent = '@keyframes cq-ripple{to{transform:scale(4);opacity:0}}@keyframes cq-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}@keyframes cq-pulse{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.7)}100%{box-shadow:0 0 0 15px rgba(16,185,129,0)}}.cq-shake{animation:cq-shake 0.4s ease}.cq-pulse{animation:cq-pulse 0.5s ease}';
            document.head.appendChild(style);
        }
        
        // Agregar efecto ripple a botones
        var botones = document.querySelectorAll('button, .btn-ejecutar, .api-btn, .nav-btn, .quiz-opcion');
        for (var i = 0; i < botones.length; i++) {
            var btn = botones[i];
            if (btn.dataset.cqInit) continue;
            btn.dataset.cqInit = '1';
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            
            btn.addEventListener('click', function(e) {
                // Sonido click
                Sonidos.click();
                
                // Efecto ripple
                var rect = this.getBoundingClientRect();
                var ripple = document.createElement('span');
                ripple.style.cssText = 'position:absolute;background:rgba(255,255,255,0.4);border-radius:50%;transform:scale(0);animation:cq-ripple 0.6s ease-out;pointer-events:none;width:20px;height:20px;';
                ripple.style.left = (e.clientX - rect.left - 10) + 'px';
                ripple.style.top = (e.clientY - rect.top - 10) + 'px';
                this.appendChild(ripple);
                var r = ripple;
                setTimeout(function() { r.remove(); }, 600);
            });
        }
    }
    
    // ============================================
    // 🚀 INICIALIZACIÓN
    // ============================================
    function init() {
        agregarEfectos();
        
        // Toast de bienvenida (solo si no se ha mostrado antes en esta página)
        if (!window.cqWelcomeShown) {
            window.cqWelcomeShown = true;
            setTimeout(function() {
                mostrarToast('¡Bienvenido a CodeQuest! 🎮', 'info', 2500);
            }, 800);
        }
        
        console.log('✅ CodeQuest Efectos v2 cargado');
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Exponer funciones globales para uso en los niveles
    window.CodeQuest = {
        mostrarToast: window.mostrarToast,
        Sonidos: window.Sonidos,
        
        // Feedback para respuestas de quiz
        respuestaCorrecta: function(elemento) {
            elemento.classList.add('correcta');
            elemento.classList.add('cq-pulse');
            mostrarToast('¡Correcto! 🎉', 'exito', 2000);
        },
        
        respuestaIncorrecta: function(elemento) {
            elemento.classList.add('incorrecta');
            elemento.classList.add('cq-shake');
            mostrarToast('Incorrecto 😅', 'error', 2000);
        },
        
        // Feedback para ejecutar código
        ejecutarCodigo: function() {
            mostrarToast('Ejecutando código...', 'ejecutando', 1500);
            Sonidos.ejecutar();
        },
        
        codigoExitoso: function() {
            mostrarToast('¡Código ejecutado! ✨', 'exito', 2000);
        },
        
        codigoError: function(error) {
            mostrarToast('Error: ' + error, 'error', 3000);
        },
        
        // Feedback para APIs
        cargandoDatos: function() {
            mostrarToast('Cargando datos...', 'cargando', 2000);
        },
        
        datosRecibidos: function() {
            mostrarToast('¡Datos recibidos! 📦', 'exito', 2000);
        }
    };
    
})();
