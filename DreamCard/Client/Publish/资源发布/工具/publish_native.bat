@echo ����Ŀ¼�İ汾��Ϣ

@echo ����ѹ�������ļ�

@echo ���ڷ����汾......
@rmdir ..\patch_native\webver /s /q
@del ..\patch_native\webver.zip 
copy .\cvpub_native.xml .\cvpub.xml
@publish.exe



move /y ..\patch_native\webver\webver.ver.zip ..\patch_native\webver\webver.ver

del ..\native\webver.ver.zip
del ..\patch_native\webver\webver.ver.zip

@color 0b
7z a -r ..\patch_native\webver.zip ..\patch_native\webver\*.*

::xcopy ..\config_temp\*.* ..\client\*.* /s/y

::@pause
