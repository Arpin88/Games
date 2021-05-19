

@echo  -
@echo --------------------------皮肤项目编译[Client_Skin_En]
@call .\build.bat

@echo ------------执行皮肤工具[skinToolEui]生成皮肤配置表[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\resource_en\skins /S /Q

xcopy ..\..\Client_Skin_En\resource\skins\*.*  .\resource_en\skins\  /S /Q /Y

@node main.js resource_en

xcopy  .\resource_en\theme.json ..\..\Client_Skin_En\resource\  /S /Q /Y
xcopy  .\resource_en\theme.js ..\..\Client_Skin_En\resource\  /S /Q /Y
xcopy  .\resource_en\theme.json ..\..\Client_Main\resource_en\  /S /Q /Y
xcopy  .\resource_en\theme.js ..\..\Client_Main\resource_en\  /S /Q /Y


@cd  ..\..\Game_Hall
@call .\copy-resource-en.bat


