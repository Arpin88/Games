::@rd .\resource /S /Q


::@echo -------------------------- copy
::xcopy ..\..\Client_Main\resource\skins\*.* .\resource\skins\  /S /Q /Y

::@echo -------------------------- parse
@echo -----------------------------skin exml doing......
::@set NODE_PATH=./node.exe
::@set PATH = %PATH%; %NODE_PATH%
@node main.js resource


::xcopy  .\resource\theme.json ..\..\..\client_h5\xygj_eui\resource\  /S /Q /Y
::xcopy  .\resource\initTheme.json ..\..\..\client_h5\xygj_eui\resource\  /S /Q /Y
@pause
