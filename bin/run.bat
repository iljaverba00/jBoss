@echo off
rem -------------------------------------------------------------------------
rem JBoss Bootstrap Script for Win32/64
rem -------------------------------------------------------------------------

setlocal

chcp 1251

set JBOSS_HOME=%~dp0%..
set PROGNAME=%~nx0%

call :NORMALIZEPATH %JBOSS_HOME%
set JBOSS_HOME=%RETVAL%

rem Find run.jar, or we can't continue

set RUNJAR=%JBOSS_HOME%\bin\run.jar
if exist "%RUNJAR%" goto FOUND_RUN_JAR
echo Could not locate %RUNJAR%. Please check that you are in the
echo bin directory when running this script.
goto END

:FOUND_RUN_JAR

set JAVA=%JBOSS_HOME%\..\jre\bin\java.exe

if not exist "%JAVA%" set JAVA=java

"%JAVA%" -version 2>&1 | findstr 64-Bit > nul
if errorlevel == 1 (set JAVA_OPTS=%JAVA_OPTS% "-Djava.library.path=%JBOSS_HOME%\bin\native\win32;%WINDIR%\system32"
) else (set JAVA_OPTS=%JAVA_OPTS% "-Djava.library.path=%JBOSS_HOME%\bin\native\win64;%WINDIR%\system32"
)

set JBOSS_CLASSPATH=%RUNJAR%

rem Setup JBoss specific properties
set JAVA_OPTS=%JAVA_OPTS% -Dprogram.name=%PROGNAME%

rem Add -server to the JVM options, if supported
rem "%JAVA%" -version 2>&1 | findstr /I hotspot > nul
rem if not errorlevel == 1 (set JAVA_OPTS=%JAVA_OPTS% -server)

rem With Sun JVMs reduce the RMI GCs to once per hour
set JAVA_OPTS=%JAVA_OPTS% -Dsun.rmi.dgc.client.gcInterval=3600000 -Dsun.rmi.dgc.server.gcInterval=3600000

rem GSEE specific
set JAVA_OPTS=%JAVA_OPTS% "-Djava.util.logging.config.file=%JBOSS_HOME%\bin\logging.properties" -DentityExpansionLimit=2147483640

rem Security
set JAVA_OPTS=%JAVA_OPTS% -Djava.security.manager "-Djava.security.policy=%JBOSS_HOME%\server\default\conf\server.policy" -Djboss.home.dir="%JBOSS_HOME%" -Djboss.server.home.dir="%JBOSS_HOME%\server\default"

rem JPDA options. Uncomment and modify as appropriate to enable remote debugging.
rem set JAVA_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,address=8787,server=y,suspend=y %JAVA_OPTS%

FOR /F "delims=" %%i in (%JBOSS_HOME%\bin\run.vmoptions) DO call :VMOPTS "%%i"

rem Setup the java endorsed dirs
set JBOSS_ENDORSED_DIRS=%JBOSS_HOME%\lib\endorsed

echo ===============================================================================
echo.
echo   JBoss Bootstrap Environment
echo.
echo   JBOSS_HOME: %JBOSS_HOME%
echo.
echo   JAVA: %JAVA%
echo.
echo   JAVA_OPTS: %JAVA_OPTS%
echo.
echo   CLASSPATH: %JBOSS_CLASSPATH%
echo.
echo ===============================================================================
echo.

:RESTART
"%JAVA%" %JAVA_OPTS% "-Djava.endorsed.dirs=%JBOSS_ENDORSED_DIRS%" -classpath "%JBOSS_CLASSPATH%" org.jboss.Main
if ERRORLEVEL 10 goto RESTART

:END
exit /B

:NORMALIZEPATH
  set RETVAL=%~f1
  exit /B

:VMOPTS
  set JAVA_OPTS=%JAVA_OPTS% %~1
  exit /B