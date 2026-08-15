# Prompt de instalación

Copia desde “Quiero” hasta el final y pégalo en Codex o Claude Code.

```text
Quiero que instales y configures Motion Kit por mí desde:
https://github.com/aescobedoo/motion-kit

Haz todo el trabajo técnico. Yo no quiero usar la Terminal ni editar código.

1. Detecta mi sistema operativo y si estoy usando Codex o Claude Code.
2. Descarga Motion Kit en una carpeta estable dentro de mis documentos. Si ya existe, actualízalo
   sin borrar mis animaciones ni mi personalización.
3. Comprueba que tengo Node.js 18 o posterior. Si falta, instala la versión LTS mediante el método
   oficial de mi sistema y pide permiso solo cuando sea necesario.
4. Instala lo necesario dentro de Motion Kit y ejecuta `npm run verify`. No continúes hasta que la
   prueba termine con `MOTION_KIT_OK`; si falla, diagnostica y corrige el problema.
5. Ejecuta `npm run install:skills` para instalar Motion tanto en Codex como en Claude Code.
6. Confirma que existe `out/setup/creatividad-sustraccion.mov`.
7. Hazme máximo cinco preguntas sencillas sobre colores, tipografía, sensación, movimiento y cosas
   que quiero evitar. Personaliza `MOTION-STYLE.md` y `motion.config.json`, y genera otra prueba.
8. Al final, dime solamente qué quedó instalado, dónde está la animación de prueba y si necesito
   volver a abrir Codex o Claude Code.

No me expliques React, Remotion, codecs, comandos ni estructura de archivos salvo que yo lo pida.
No me presentes decisiones técnicas que puedas resolver de forma segura por mí.
```
