@echo off
title Auto-Sync GitHub - Williyanto Production
color 0A

:: Pindah ke direktori tempat file .bat ini berada
cd /d "%~dp0"

echo ========================================================
echo    AUTO-SYNC GITHUB (COMMIT ^& PUSH OTOMATIS)
echo    Folder: %CD%
echo ========================================================
echo.

:: Pastikan folder ini terdaftar sebagai safe.directory di Git
git config --global --add safe.directory "%CD:\=/%" >nul 2>&1
git config --global --add safe.directory "*" >nul 2>&1

echo [INFO] Memantau perubahan file secara otomatis setiap 15 detik...
echo [INFO] Biarkan jendela ini terbuka saat Anda sedang mengedit proyek.
echo [INFO] Tekan Ctrl+C untuk menghentikan pemantauan.
echo.

:LOOP
:: Cek apakah ada perubahan lokal (modified, untracked, deleted, renamed)
git status --porcelain > "%TEMP%\git_changes_check.txt" 2>nul

for %%A in ("%TEMP%\git_changes_check.txt") do (
    if %%~zA GTR 0 (
        echo [%DATE% %TIME%] Perubahan terdeteksi! Mengunggah ke GitHub...
        git add -A
        git commit -m "Auto-update: %DATE% %TIME%"
        git push origin main
        echo [%DATE% %TIME%] Selesai sinkronisasi ke GitHub!
        echo --------------------------------------------------------
    )
)

:: Tunggu 15 detik sebelum pengecekan berikutnya
timeout /t 15 /nobreak >nul
goto LOOP

