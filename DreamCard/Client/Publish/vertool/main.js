var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');

function format (text)
{
    var args = arguments;
    
    return text.replace(/%([1-9])/g, function($1, $2) {
        return args[$2] != undefined ? args[$2] : "";
    });
}

function makeDirectory(directoryPath)
{
    if(fs.existsSync(directoryPath)) return ;

    var components = path.normalize(directoryPath).split(path.sep);

    var looper = 1;
	
	

    while (looper <= components.length)
    {
        var newPath = path.normalize(components.slice(0, looper).join(path.sep));

        if (fs.existsSync(newPath))
        {
            if (!fs.statSync(newPath).isDirectory())
            {
                fs.unlinkSync(path);
                fs.mkdirSync(newPath);
            }

        }
        else
        {
            fs.mkdirSync(newPath);
        }

        ++looper;
    }

};

function tansferWebVer(destDir)
{
	var dataPath = path.join(baseDirectory, "data");
    var checkVerSource = path.join(dataPath, "checkver.ver");
	var newVerSource = path.join(dataPath, "webver.ver");
	
	var content = fs.readFileSync( newVerSource, 'utf-8');
	first_idx = content.indexOf( "/" );
	if( first_idx > 0 )
	{
		content = content.substring( first_idx );
	}
	
    var newVers = transferVerToJson( content );
	
	var checkVers = null;
	try{
		content = fs.readFileSync( checkVerSource, 'utf-8');
		var first_idx = content.indexOf( "/" );
		if( first_idx > 0 )
		{
			content = content.substring( first_idx );
		}
		
		checkVers = transferVerToJson( content );
	}
	catch( e ){
		
	}
	
	
	var jsonVerSource = path.join(dataPath, "webver.json");
	if( !checkVers ){
		var temp = JSON.stringify( {} );
		fs.writeFileSync(jsonVerSource, temp);
		return;
	}
	
	var changedVers = {};
	
	var postfix;
	var pathName;
	//有变化的才打版本号 新增的不用打版本号
	for( postfix in newVers )
	{
		var changedVerList = [];
		changedVers[postfix] = changedVerList;
		
		var newVerList = newVers[postfix];
		if( postfix in checkVers )
		{
			var checkVerList = checkVers[postfix];
			for( pathName in newVerList )
			{
				if( pathName.indexOf("tmp/")==0 ) continue;
					
				if( (pathName in checkVerList) && newVerList[pathName] != checkVerList[pathName] )
				{			
					if ( oldPath ) {
						pathName = pathName.replace( oldPath, newPath );
					}
					
					changedVerList.push( pathName );
				}
			}
		}
		/*else
		{
			for( pathName in newVerList )
			{
				changedVerList.push( pathName );
			}
		}*/
	}
	
	//console.log( changedVers );
	
	var jsonVerSource = path.join(dataPath, "webver.json");
	content = fs.readFileSync(jsonVerSource);
	var jsonVers = JSON.parse( content );
	//删除已删除的版本
	var versTable;
	for( postfix in jsonVers )
	{
		versTable = jsonVers[postfix];
		if( postfix in newVers )
		{
			var newVerList = newVers[postfix];
			var rmvPaths = [];
			for( pathName in versTable )
			{
				if( !(pathName in newVerList) )
				{
					rmvPaths.push(pathName);
				}
			}
			
			for( var i=0; i < rmvPaths.length; ++i )
			{
				delete versTable[rmvPaths[i]];
			}
		}
		else
		{
			jsonVers.postfix = {};
		}
	}
	
	var d = new Date(2017, 10, 1);
    var startTm = Math.floor(d.getTime()/1000);
	var nowTm = Math.floor((new Date()).getTime()/1000);
	var ver = nowTm - startTm;
	//console.log( "startTm=" + startTm + " nowTm=" + nowTm )
	
	var time = Date
	for( postfix in changedVers )
	{
		var changedVerList = changedVers[postfix];
		var vercnt = changedVerList.length;
		if( vercnt > 0 )
		{
			var i = 0;
			if( postfix in jsonVers )
			{
				versTable = jsonVers[postfix];
				for( ; i < vercnt; ++i )
				{
					pathName = changedVerList[i];
					versTable[pathName] = ver;
				}
			}
			else
			{
				versTable = {};
				jsonVers[postfix] = versTable;
				for( ; i < vercnt; ++i )
				{
					pathName = changedVerList[i];
					versTable[pathName] = ver;
				}
			}
		}	
	}
	
	var addVerSource = path.join(dataPath, "addver.json");
	content = fs.readFileSync(addVerSource);
	var addVers = JSON.parse( content );
	for( postfix in addVers )
	{
		jsonVers[postfix] = addVers[postfix];
	}
	
	var temp = JSON.stringify(jsonVers);
    fs.writeFileSync(jsonVerSource, temp);
}

function transferVerToJson( content )
{
	var lines = content.split("\r\n");
	
    var table = {};

    /*for (var i=0; i<lines.length; i++)
    {
        var temps = lines[i].split(",");
		if( temps.length >= 3 )
		{
			var pathStr = temps[0];
			
			var idx = pathStr.lastIndexOf( "." );
			var postfix = pathStr.substring( idx+1 );
			pathStr = pathStr.substring( 0, idx );
			if( pathStr[0] == "/" )
				pathStr = pathStr.substring(1);
			
			var pathNames = pathStr.split( "/" );
			
			var tmpTable = table[postfix];
			if( !tmpTable )
			{
				tmpTable = {};
				table[postfix] = tmpTable;
			}
			
			var path_cnt = pathNames.length;
	
			for( var j=0; j<path_cnt-1; j++)
			{
				var tmpStr = pathNames[j];
				if( tmpStr== "" ) continue;
					
				var tmpTable1 = tmpTable[pathNames[j]];
				if( !tmpTable1 )
				{
					tmpTable1 = {};
					tmpTable[pathNames[j]] = tmpTable1;
				}
				
				tmpTable = tmpTable1;
			}
			tmpTable1[pathNames[path_cnt-1]] = temps[1];
		}	
    }*/
	
	for (var i=0; i<lines.length; i++)
    {
        var temps = lines[i].split(",");
		if( temps.length >= 3 )
		{
			var pathStr = temps[0];
			
			var idx = pathStr.lastIndexOf( "." );
			var postfix = pathStr.substring( idx+1 );
			pathStr = pathStr.substring( 0, idx );
			if( pathStr[0] == "/" )
				pathStr = pathStr.substring(1);
			
			//var pathNames = pathStr.split( "/" );
			
			var tmpTable = table[postfix];
			if( !tmpTable )
			{
				tmpTable = {};
				table[postfix] = tmpTable;
			}
			
			/*var path_cnt = pathNames.length;
	
			for( var j=0; j<path_cnt-1; j++)
			{
				var tmpStr = pathNames[j];
				if( tmpStr== "" ) continue;
					
				var tmpTable1 = tmpTable[pathNames[j]];
				if( !tmpTable1 )
				{
					tmpTable1 = {};
					tmpTable[pathNames[j]] = tmpTable1;
				}
				
				tmpTable = tmpTable1;
			}
			tmpTable1[pathNames[path_cnt-1]] = temps[1];*/
			tmpTable[pathStr] = temps[1];
		}	
    }
	
	return table;
}

function tansferIndex( gamever, libver, assertver, destDir )
{
    var source = path.join(baseDirectory, "index.html");
	
    var content = fs.readFileSync( source, 'utf-8');

	var replaceStr = '"></script>';
	var toStr = '?v=' + libver + replaceStr;
	content.replace( replaceStr, toStr );
	
	var replaceStr1 = 'main.min.js' + toStr;
	toStr = 'main.min.js?v=' + gamever + replaceStr;
	content.replace( replaceStr, toStr );
	
	var idx = content.indexOf( 'webver' );
	var endIdx = content.indexOf( '"', idx+8 );
	var subStr = content.substr( idx, endIdx-idx+1 );
	content.replace( subStr, 'webver="' + assertver + '"'  );

	var destination = path.join(destDir, "index.html");
    fs.writeFileSync(destination, content);
}

var oldPath = process.argv[2];
var newPath = process.argv[3];

var baseDirectory = fs.realpathSync(__dirname);
    
var destDir = path.join(baseDirectory, "to");

makeDirectory( destDir );

tansferWebVer( destDir  );

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );