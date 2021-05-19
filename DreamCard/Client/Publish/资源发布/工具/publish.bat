
@echo 正在发布版本......

@publish.exe


@color 0b
7z a -r ..\patch\webver.zip ..\patch\webver\*.*

::xcopy ..\config_temp\*.* ..\client\*.* /s/y

::@pause
