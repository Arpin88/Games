
@echo ------------ ¿½±´ resource×ÊÔ´

@rd  .\resource /S /Q
xcopy  ..\Client_Skin\resource\*.*  .\resource\  /S /Q /Y
@rd  .\resource\skins /S /Q

@pause



