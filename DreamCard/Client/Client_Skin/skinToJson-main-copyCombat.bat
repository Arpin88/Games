

@echo  -
@echo --------------------------Ƥ����Ŀ����[Client_Skin]
@call .\build.bat

@echo ------------ִ��Ƥ������[skinToolEui]����Ƥ�����ñ�[theme.json]

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


