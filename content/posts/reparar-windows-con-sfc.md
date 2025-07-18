---
title: "Cómo reparar Windows con sfc /scannow y DISM"
date: 2025-04-07
draft: false
categories:
  - software
---

# Cómo reparar Windows con `sfc /scannow` y `DISM`

¿Tu computadora va lenta, se cuelga o muestra errores extraños?  
Es posible que haya archivos del sistema dañados.  
Aquí te explico cómo reparar Windows usando dos comandos esenciales:  
`sfc /scannow` y `DISM`.

## ¿Qué es `sfc /scannow`?

El comando `sfc /scannow` escanea y repara los archivos del sistema de Windows.

### Paso a paso:

1. **Abre el CMD como administrador**
   - Presiona `Win + S` → Escribe `cmd` → Haz clic derecho → "Ejecutar como administrador"

2. **Ejecuta el comando:**
   ```powershell
   sfc /scannow

      Espera a que termine  
        Puede tardar unos minutos
         

    Reinicia tu computadora  
     

Este comando detectará y reparará archivos del sistema dañados.
Qué es DISM? 

Si sfc /scannow no funciona, puedes usar DISM, que repara la imagen del sistema. 
Paso a paso: 

    Abre CMD como administrador  

    Ejecuta este comando:  
    powershell
     

 
1
DISM /Online /Cleanup-Image /RestoreHealth
 
 

Espera a que termine  

    Puede tardar entre 10 y 30 minutos
    No cierres la ventana hasta que termine
     

Reinicia tu PC
Consejos finales 

    Haz una copia de seguridad antes de usar estos comandos
    Si no te sientes seguro, ¡no lo hagas tú solo!
    Si tienes Windows Home, estos comandos también funcionan
     

¿Tienes este problema en tu empresa o casa?
👉 ¡Te ayudamos! Contáctanos aquí  

