

@echo  - 
@echo  -
@echo  -
@echo --------------------------Ƥ����Ŀ����[Client_Skin_En]
@call .\build.bat

@echo ------------ִ��Ƥ������[skinToolEui]����Ƥ�����ñ�[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\res-Hall_en\skins /S /Q

xcopy ..\..\Client_Skin_En\res-Hall\skins\*.*  .\res-Hall_en\skins\  /S /Q /Y

@node main.js res-Hall_en

xcopy  .\res-Hall_en\theme.json ..\..\Client_Skin_En\res-Hall\  /S /Q /Y

@cd  ..\..\Game_Hall
@call .\copy-res-Hall-en.bat


