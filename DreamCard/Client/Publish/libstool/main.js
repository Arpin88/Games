var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');

function mergeJs(argv)
{
	var themePath = path.join(baseDirectory, "libs.json");
	
    var content = fs.readFileSync(themePath);
	var val = JSON.parse( content );
	var jsFiles = val[argv[2]];
	var mergeedJS = '';

	for(var i=0;i < jsFiles.length; i++){
		var tempPath = path.join(baseDirectory, jsFiles[i]);
		console.log( tempPath );
		var jsCode = fs.readFileSync( tempPath );
		mergeedJS += jsCode; 	
	}

	var destPath = path.join(baseDirectory, 'core.js');
	fs.writeFileSync(destPath, mergeedJS);
}

var baseDirectory = fs.realpathSync(__dirname);
   

//makeDirectory( sourceDirectory );

mergeJs(process.argv);

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );