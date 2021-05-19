

@echo  - 
@echo  -
@echo  -
@echo --------------------------皮肤项目编译[Client_Skin_En]
@call .\build.bat

@echo ------------执行皮肤工具[skinToolEui]生成皮肤配置表[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\res-Hall_en\skins /S /Q

xcopy ..\..\Client_Skin_En\res-Hall\skins\*.*  .\res-Hall_en\skins\  /S /Q /Y

@node main.js res-Hall_en

xcopy  .\res-Hall_en\theme.json ..\..\Client_Skin_En\res-Hall\  /S /Q /Y

@cd  ..\..\Game_Hall
@call .\copy-res-Hall-en.bat


