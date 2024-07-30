@echo off
rem -------------------------------------------------------------------------
rem JBoss Shutdown Script for Win32/64
rem -------------------------------------------------------------------------

setlocal

set MAIN_JAR_NAME=shutdown.jar
set MAIN_CLASS=org.jboss.Shutdown

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

set JAVA=C:\work\jdk\jre7_80_x32_oracle\bin\java.exe

if not exist "%JAVA%" set JAVA=java

set JBOSS_CLASSPATH=%MAIN_JAR%;%JBOSS_HOME%\client\jbossall-client.jar

rem Воспользуемся тем же appopts для сбора аргументов
FOR /F "delims=" %%i in (%JBOSS_HOME%\bin\shutdown.appoptions) DO call :APPOPTS "%%i"
set ARGS=%ARGS% %JAVA_OPTS%

rem Setup JBoss sepecific properties
set JAVA_OPTS=-Djboss.boot.loader.name=%PROGNAME%

rem JPDA options. Uncomment and modify as appropriate to enable remote debugging.
rem set JAVA_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,address=8787,server=y,suspend=y %JAVA_OPTS%

rem Ну и vmoptions не забываем, вдруг кто что захочет передать
FOR /F "delims=" %%i in (%JBOSS_HOME%\bin\shutdown.vmoptions) DO call :APPOPTS "%%i"

"%JAVA%" %JAVA_OPTS% -classpath "%JBOSS_CLASSPATH%" %MAIN_CLASS% -S %ARGS%

:END
exit

:NORMALIZEPATH
  set RETVAL=%~f1
  exit /B

:APPOPTS
  set JAVA_OPTS=%JAVA_OPTS% %~1
  exit /B