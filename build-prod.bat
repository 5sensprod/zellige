@echo off
REM Build de production (Windows)
setlocal

if not exist package.json (
  echo Veuillez lancer ce script depuis le dossier du projet (contenant package.json).
  pause
  exit /b 1
)

echo.
echo === Build prod ===
call npm run build
if errorlevel 1 (
  echo Echec du build.
  pause
  exit /b 1
)

echo.
echo Terminé. Les fichiers sont dans le dossier dist/
endlocal
