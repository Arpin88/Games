
@echo ------------ ���� resource��Դ

@rd  .\resource /S /Q
xcopy  ..\Client_Skin\resource\*.*  .\resource\  /S /Q /Y
@rd  .\resource\skins /S /Q

copy  .\webver.json  .\resource\webver.json

@pause



