

@echo  -
@echo --------------------------Ƥ����Ŀ����[Client_Skin_En]
@call .\build.bat

@echo ------------ִ��Ƥ������[skinToolEui]����Ƥ�����ñ�[theme.json]

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


