
@echo ------------ ¿½±´ resource×ÊÔ´

set pa=%cd%
@echo %pa%

@cd ..\Client_Skin
@call .\build_Main.bat

@cd %pa%
@rd  .\resource /S /Q
xcopy  ..\Client_Skin\resource\*.*  resource\  /S /Q /Y
@rd  .\resource\skins /S /Q
@del .\resource\theme0.js
::@pause

