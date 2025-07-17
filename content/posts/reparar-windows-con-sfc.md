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
