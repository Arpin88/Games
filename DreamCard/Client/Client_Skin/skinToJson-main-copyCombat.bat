

@echo  -
@echo --------------------------皮肤项目编译[Client_Skin]
@call .\build.bat

@echo ------------执行皮肤工具[skinToolEui]生成皮肤配置表[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\resource\skins /S /Q

xcopy ..\..\Client_Skin\resource\skins\*.*  .\resource\skins\  /S /Q /Y

@node main.js resource

xcopy  .\resource\theme.json ..\..\Client_Skin\resource\  /S /Q /Y
xcopy  .\resource\theme.js ..\..\Client_Skin\resource\  /S /Q /Y
xcopy  .\resource\theme.json ..\..\Client_Main\resource\  /S /Q /Y
xcopy  .\resource\theme.js ..\..\Client_Main\resource\  /S /Q /Y


@cd  ..\..\Game_Combat
@call .\copy-resource.bat


