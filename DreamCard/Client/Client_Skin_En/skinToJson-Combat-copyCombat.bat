

@echo  - 
@echo  -
@echo  -
@echo --------------------------Ƥ����Ŀ����[Client_Skin_En]
@call .\build.bat

@echo ------------ִ��Ƥ������[skinToolEui]����Ƥ�����ñ�[theme.json]

@cd  ..\Publish\skinToolEui
@rd  .\res-Combat_en\skins /S /Q

xcopy ..\..\Client_Skin_En\res-Combat\skins\*.*  .\res-Combat_en\skins\  /S /Q /Y

@node main.js res-Combat_en

xcopy  .\res-Combat_en\theme.json ..\..\Client_Skin_En\res-Combat\  /S /Q /Y

@cd  ..\..\Game_Combat
@call .\copy-res-Combat-en.bat


