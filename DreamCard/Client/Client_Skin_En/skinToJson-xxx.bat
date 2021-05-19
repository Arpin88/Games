

@echo  - 
@echo  -
@echo  -
@echo --------------------------皮肤项目编译[Client_Skin]
@call .\build.bat

@echo ------------执行皮肤工具[skinToolEui]生成皮肤配置表[theme.json]

@cd  ..\..\Publish\skinToolEui
@rd  .\res-xxx\skins /S /Q

xcopy ..\..\Client_New_Game\Client_Skin\res-xxx\skins\*.*  .\res-xxx\skins\  /S /Q /Y

@node main.js res-xxx

xcopy  .\res-xxx\theme.json ..\..\Client_New_Game\Client_Skin\res-xxx\  /S /Q /Y

@pause



