
@echo ------------ ���� res-xxx ��Դ

@rd  .\res-Combat /S /Q
xcopy  ..\Client_Skin\res-Combat\*.*  .\res-Combat\  /S /Q /Y
@rd  .\res-Combat\skins /S /Q

@pause



