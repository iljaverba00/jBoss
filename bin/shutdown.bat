@echo off
rem -------------------------------------------------------------------------
rem JBoss Shutdown Script for Win32/64
rem -------------------------------------------------------------------------

setlocal

chcp 1251

set JBOSS_HOME=%~dp0%..
set PROGNAME=%~nx0%

call :NORMALIZEPATH %JBOSS_HOME%
set JBOSS_HOME=%RETVAL%

rem Find MAIN_JAR, or we can't continue

set MAIN_JAR=%JBOSS_HOME%\bin\shutdown.jar
if exist "%MAIN_JAR%" goto FOUND_MAIN_JAR
echo Could not locate %MAIN_JAR%. Please check that you are in the
echo bin directory when running this script.
goto END

:FOUND_MAIN_JAR

set JAVA=%JBOSS_HOME%\..\jre\bin\java.exe

if not exist "%JAVA%" set JAVA=java

set JBOSS_CLASSPATH=%MAIN_JAR%;%JBOSS_HOME%\client\jbossall-client.jar

rem Setup JBoss specific properties
set JAVA_OPTS=%JAVA_OPTS% -Djboss.boot.loader.name=%PROGNAME%

rem JPDA options. Uncomment and modify as appropriate to enable remote debugging.
rem set JAVA_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,address=8787,server=y,suspend=y %JAVA_OPTS%

FOR /F "delims=" %%i in (%JBOSS_HOME%\bin\shutdown.vmoptions) DO call :VMOPTS "%%i"

FOR /F "delims=" %%i in (%JBOSS_HOME%\bin\shutdown.appoptions) DO call :APPOPTS "%%i"

echo ===============================================================================
echo.
echo   JBoss Shutdown Environment
echo.
echo   JBOSS_HOME: %JBOSS_HOME%
echo.
echo   JAVA: %JAVA%
echo.
echo   JAVA_OPTS: %JAVA_OPTS%
echo.
echo   ARGS: %ARGS%
echo.
echo   CLASSPATH: %JBOSS_CLASSPATH%
echo.
echo ===============================================================================
echo.


"%JAVA%" %JAVA_OPTS% -classpath "%JBOSS_CLASSPATH%" org.jboss.Shutdown -S %ARGS%

:END
exit /B

:NORMALIZEPATH
  set RETVAL=%~f1
  exit /B

:VMOPTS
  set JAVA_OPTS=%JAVA_OPTS% %~1
  exit /B

:APPOPTS
  set ARGS=%ARGS% %~1
  exit /B