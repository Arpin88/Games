

@echo  - 
@echo  -
@echo  -
@echo --------------------------Ƥ����Ŀ����[Client_Skin]
@call .\build.bat

@echo ------------ִ��Ƥ������[skinToolEui]����Ƥ�����ñ�[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\res-Hall\skins /S /Q

xcopy ..\..\Client_Skin\res-Hall\skins\*.*  .\res-Hall\skins\  /S /Q /Y

@node main.js res-Hall

xcopy  .\res-Hall\theme.json ..\..\Client_Skin\res-Hall\  /S /Q /Y

@cd  ..\..\Game_Hall
@call .\copy-res-Hall.bat


