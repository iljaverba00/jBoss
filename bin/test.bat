c:\work\jre64\bin\java.exe -version 2>&1 | findstr 64-Bit
if errorlevel == 1 (echo test32
) else (echo test64
)