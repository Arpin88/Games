

@echo  - 
@echo  -
@echo  -
@echo --------------------------Ƥ����Ŀ����[Client_Skin]
@call .\build.bat

@echo ------------ִ��Ƥ������[skinToolEui]����Ƥ�����ñ�[theme.json]

@cd  ..\..\Publish\skinToolEui
@rd  .\res-xxx\skins /S /Q

xcopy ..\..\Client_New_Game\Client_Skin\res-xxx\skins\*.*  .\res-xxx\skins\  /S /Q /Y

@node main.js res-xxx

xcopy  .\res-xxx\theme.json ..\..\Client_New_Game\Client_Skin\res-xxx\  /S /Q /Y

@pause



