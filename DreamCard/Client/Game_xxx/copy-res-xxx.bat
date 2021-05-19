
@echo ------------ ¿½±´ res-xxx ×ÊÔ´

@rd  .\res-xxx /S /Q
xcopy  ..\Client_Skin\res-xxx\*.*  .\res-xxx\  /S /Q /Y
@rd  .\res-xxx\skins /S /Q

@pause



