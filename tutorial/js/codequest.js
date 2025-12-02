/**
 * CodeQuest - JavaScript Universal v2.0
 * UNICO archivo JS para TODOS los niveles
 * Control central de editor, preview y funcionalidades
 */

(function() {
    'use strict';

    // ============================================
    // SISTEMA DE AUDIO
    // ============================================
    var audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            } catch(e) {
                return null;
            }
        }
        return audioCtx;
    }

    function playTone(freq, type, duration, volume) {
        var ctx = getAudioContext();
        if (!ctx) return;

        try {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = type || 'sine';
            osc.frequency.value = freq;
            gain.gain.value = volume || 0.15;
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch(e) {}
    }

    // Sonidos del sistema
    window.Sonidos = {
        exito: function() {
            playTone(523, 'sine', 0.12, 0.15);
            setTimeout(function() { playTone(659, 'sine', 0.12, 0.15); }, 80);
            setTimeout(function() { playTone(784, 'sine', 0.15, 0.15); }, 160);
        },
        error: function() {
            playTone(200, 'sawtooth', 0.25, 0.12);
        },
        click: function() {
            playTone(800, 'sine', 0.04, 0.08);
        },
        ejecutar: function() {
            playTone(440, 'sine', 0.08, 0.12);
            setTimeout(function() { playTone(880, 'sine', 0.12, 0.12); }, 80);
        }
    };

    // ============================================
    // SISTEMA DE NOTIFICACIONES TOAST
    // ============================================
    window.mostrarToast = function(mensaje, tipo, duracion) {
        tipo = tipo || 'info';
        duracion = duracion || 3000;

        var contenedor = document.getElementById('cq-toast-container');
        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.id = 'cq-toast-container';
            contenedor.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;max-width:350px;';
            document.body.appendChild(contenedor);
        }

        var config = {
            exito: { icon: '&#10004;', bg: '#10b981', label: 'Exito' },
            error: { icon: '&#10008;', bg: '#ef4444', label: 'Error' },
            info: { icon: 'i', bg: '#3b82f6', label: 'Info' },
            warning: { icon: '!', bg: '#f59e0b', label: 'Aviso' },
            ejecutando: { icon: '&#9654;', bg: '#8b5cf6', label: 'Ejecutando' }
        };

        var cfg = config[tipo] || config.info;

        var toast = document.createElement('div');
        toast.style.cssText = 'background:' + cfg.bg + ';color:#fff;padding:14px 20px;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.3);display:flex;align-items:center;gap:12px;font-family:Segoe UI,sans-serif;font-weight:600;transform:translateX(120%);transition:transform 0.3s ease;pointer-events:auto;';
        toast.innerHTML = '<span style="font-size:1.2rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.2);border-radius:50%">' + cfg.icon + '</span><span>' + mensaje + '</span>';

        contenedor.appendChild(toast);

        setTimeout(function() {
            toast.style.transform = 'translateX(0)';
        }, 10);

        if (tipo === 'exito') Sonidos.exito();
        else if (tipo === 'error') Sonidos.error();

        setTimeout(function() {
            toast.style.transform = 'translateX(120%)';
            setTimeout(function() {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, duracion);
    };

    // ============================================
    // FUNCIONES DEL EDITOR
    // ============================================
    
    // Almacenar codigo original para reset
    var codigoOriginal = '';

    window.ejecutarCodigo = function() {
        var editor = document.getElementById('codigoEditor');
        var preview = document.getElementById('vistaPrevia');
        
        if (!editor || !preview) {
            mostrarToast('Error: Editor o preview no encontrado', 'error');
            return;
        }

        Sonidos.ejecutar();
        mostrarToast('Ejecutando codigo...', 'ejecutando', 1500);

        setTimeout(function() {
            try {
                var codigo = editor.value;
                
                // Escribir en el iframe
                var doc = preview.contentDocument || preview.contentWindow.document;
                doc.open();
                doc.write(codigo);
                doc.close();

                mostrarToast('Codigo ejecutado correctamente', 'exito');
            } catch(e) {
                mostrarToast('Error al ejecutar: ' + e.message, 'error');
            }
        }, 300);
    };

    window.copiarCodigo = function() {
        var editor = document.getElementById('codigoEditor');
        if (!editor) return;

        Sonidos.click();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(editor.value).then(function() {
                mostrarToast('Codigo copiado al portapapeles', 'exito');
            }).catch(function() {
                fallbackCopy(editor);
            });
        } else {
            fallbackCopy(editor);
        }
    };

    function fallbackCopy(editor) {
        editor.select();
        document.execCommand('copy');
        mostrarToast('Codigo copiado', 'exito');
    }

    window.resetearCodigo = function() {
        var editor = document.getElementById('codigoEditor');
        if (!editor) return;

        Sonidos.click();

        if (codigoOriginal) {
            editor.value = codigoOriginal;
            mostrarToast('Codigo restaurado', 'info');
            ejecutarCodigo();
        }
    };

    // ============================================
    // INICIALIZACION
    // ============================================
    function init() {
        // Guardar codigo original
        var editor = document.getElementById('codigoEditor');
        if (editor) {
            codigoOriginal = editor.value;
            
            // Auto-ejecutar al cargar
            setTimeout(function() {
                ejecutarCodigo();
            }, 500);

            // Soporte para Tab en el editor
            editor.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                    this.selectionStart = this.selectionEnd = start + 4;
                }
            });
        }

        // Configurar data-nivel en el body si no existe
        var nivelMatch = window.location.pathname.match(/nivel(\d+)/i);
        if (nivelMatch && !document.body.hasAttribute('data-nivel')) {
            document.body.setAttribute('data-nivel', nivelMatch[1]);
        }

        console.log('CodeQuest JS v2.0 inicializado');
    }

    // Esperar a que el DOM este listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
