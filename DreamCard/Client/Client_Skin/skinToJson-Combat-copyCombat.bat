

@echo  - 
@echo  -
@echo  -
@echo --------------------------Ƥ����Ŀ����[Client_Skin]
@call .\build.bat

@echo ------------ִ��Ƥ������[skinToolEui]����Ƥ�����ñ�[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\res-Combat\skins /S /Q

xcopy ..\..\Client_Skin\res-Combat\skins\*.*  .\res-Combat\skins\  /S /Q /Y

@node main.js res-Combat

xcopy  .\res-Combat\theme.json ..\..\Client_Skin\res-Combat\  /S /Q /Y

@cd  ..\..\Game_Combat
@call .\copy-res-Combat.bat


