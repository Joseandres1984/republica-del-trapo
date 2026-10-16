# LUMEN Rewards — v1.0.0

Aplicación web progresiva (PWA) responsive. 10 preguntas en 60 segundos, puntos recreativos persistidos localmente, historial de partidas, opción de compartir, ofertas afiliadas y patrocinio.

## Monetización
- Oferta de Klook: \`https://klook.tpo.lu/RKhC3PLj\` (enlace proporcionado previamente por el titular; verificar atribución y habilitación en el panel del afiliado).
- Patrocinios: solicitud por correo. No existe pasarela de pago integrada.
- Los clics o las visitas no son ingresos verificados. Registrar en la hoja \`Ingresos\` solamente cobros respaldados por extracto/proveedor.
- No hay Bitcoin real, minería, retiros, criptomonedas ni equivalencia de puntos a efectivo.

## Google Sheets
Base: \`https://docs.google.com/spreadsheets/d/1TNNICchuK_s7M9CET02LhBuESB7qFNaOVIrRZrzOrB0/edit\`.
Pestañas: Configuracion, Ofertas, Retos, Usuarios, Eventos, Puntos, Ingresos, Patrocinios.

## Bridge de eventos — instalación opcional
1. En el Google Sheet: Extensiones → Apps Script; pegar \`AppsScript-Code.gs\`; guardar.
2. Implementar → Nueva implementación → Aplicación web, ejecutar como propietario, acceso público si se quiere recibir eventos anónimos.
3. Copiar la URL \`.../exec\`, revisar cuotas y habilitar registro únicamente si se acepta exposición pública de la URL.
4. Cambiar la línea \`if(!window.LUMEN_SHEETS_ENDPOINT)return;\` en \`index.html\` añadiendo una asignación \`window.LUMEN_SHEETS_ENDPOINT="URL_PUBLICA_EXEC";\` antes del script principal, o editar el bloque de envío directamente.
5. Verificar \`Eventos\` con un evento real. No registrar saldos o ingresos en función de clics autodeclarados.

## Seguridad y límites
- Sin información personal, sin usuarios registrados y sin mecanismos de retiro.
- Los puntos son recreativos y se almacenan en localStorage; no son fiables para premios o cobros.
- Un web app de Apps Script público puede ser abusado: el ejemplo filtra y limita eventos pero no autentica; no usar para datos financieros ni canjes.
- La PWA se instala por invitación del navegador; en iOS puede usarse Compartir → Añadir a pantalla de inicio.
- No modificar la rama de RETO 60.

## Test manual
- Inicio y navegación en móvil.
- Jugar, responder, agotar el temporizador y jugar otra vez.
- Puntos y récord persistidos tras recargar.
- Abrir enlace afiliado y mail de patrocinio.
- Compartir desde Android/iOS.
- Instalar aplicación donde el navegador lo permita.
