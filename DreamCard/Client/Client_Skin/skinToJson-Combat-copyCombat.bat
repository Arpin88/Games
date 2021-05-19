

@echo  - 
@echo  -
@echo  -
@echo --------------------------皮肤项目编译[Client_Skin]
@call .\build.bat

@echo ------------执行皮肤工具[skinToolEui]生成皮肤配置表[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\res-Combat\skins /S /Q

xcopy ..\..\Client_Skin\res-Combat\skins\*.*  .\res-Combat\skins\  /S /Q /Y

@node main.js res-Combat

xcopy  .\res-Combat\theme.json ..\..\Client_Skin\res-Combat\  /S /Q /Y

@cd  ..\..\Game_Combat
@call .\copy-res-Combat.bat


