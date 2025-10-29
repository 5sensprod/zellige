@echo off
setlocal ENABLEDELAYEDEXPANSION
chcp 65001 >nul

REM Aller dans le dossier du script
cd /d "%~dp0"

echo === FRONTEND-WP INSTALL & RUN ===
echo Dossier courant: %CD%
echo.

REM Journal
set LOGFILE=setup.log
echo [%%date%% %%time%%] Debut > "%LOGFILE%"

REM Verifier Node
where node >nul 2>nul
if errorlevel 1 (
  echo ERREUR: Node.js n'est pas dans le PATH.
  echo Installe Node LTS: https://nodejs.org/ et relance.
  echo [%%date%% %%time%%] Node introuvable >> "%LOGFILE%"
  pause
  exit /b 1
)

REM Verifier npm
where npm >nul 2>nul
if errorlevel 1 (
  echo ERREUR: npm n'est pas dans le PATH.
  echo Reinstalle Node (inclut npm) et relance.
  echo [%%date%% %%time%%] npm introuvable >> "%LOGFILE%"
  pause
  exit /b 1
)

if not exist package.json (
  echo ERREUR: package.json introuvable. Lance ce .bat depuis le dossier du projet.
  echo [%%date%% %%time%%] package.json manquant >> "%LOGFILE%"
  pause
  exit /b 1
)

echo === Installation des dependances (npm install) ===
call npm install >> "%LOGFILE%" 2>&1
if errorlevel 1 (
  echo Echec de 'npm install'. Consulte setup.log pour les details.
  pause
  exit /b 1
)

echo.
echo === Lancement du serveur de dev (npm run dev) ===
echo (la console restera ouverte; ^Ctrl+C pour arreter)
echo [%%date%% %%time%%] start dev >> "%LOGFILE%"
call npm run dev
set CODE=%ERRORLEVEL%

echo.
echo Process termine avec code %CODE%.
echo [%%date%% %%time%%] fin code=%CODE% >> "%LOGFILE%"
pause
endlocal
