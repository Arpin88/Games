
@echo ------------ ¿½±´ resource×ÊÔ´

@rd  .\resource_en /S /Q
xcopy  ..\Client_Skin_En\resource\*.*  .\resource_en\  /S /Q /Y
@rd  .\resource_en\skins /S /Q

copy  .\webver.json  .\resource_en\webver.json

@pause



