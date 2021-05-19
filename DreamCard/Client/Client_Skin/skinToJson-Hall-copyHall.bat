

@echo  - 
@echo  -
@echo  -
@echo --------------------------皮肤项目编译[Client_Skin]
@call .\build.bat

@echo ------------执行皮肤工具[skinToolEui]生成皮肤配置表[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\res-Hall\skins /S /Q

xcopy ..\..\Client_Skin\res-Hall\skins\*.*  .\res-Hall\skins\  /S /Q /Y

@node main.js res-Hall

xcopy  .\res-Hall\theme.json ..\..\Client_Skin\res-Hall\  /S /Q /Y

@cd  ..\..\Game_Hall
@call .\copy-res-Hall.bat


