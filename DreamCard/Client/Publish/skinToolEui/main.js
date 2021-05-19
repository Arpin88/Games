var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');
var UglifyJS = require("uglify-js");

var parser = require( "./deps/EXMLParser" );


 function toJsCode( path, code ) 
 {
    var code = parser.parseToJs( xmlTxt );
	
	fs.writeFileSync(path, code);
 };

function format (text)
{
    var args = arguments;
    
    return text.replace(/%([1-9])/g, function($1, $2) {
        return args[$2] != undefined ? args[$2] : "";
    });
}

function getExmlFiles( fpath, exmlFiles ){
	var files = fs.readdirSync(fpath);
	var dirs = [];
	files.forEach(function(item)
	{
		var tmpPath = path.join(fpath, item);
		//console.log( tmpPath );
		var stats = fs.statSync(tmpPath);
		if (stats.isDirectory())
		{
			dirs.push( tmpPath );
		}
		else
		{
			if( path.extname(item) == ".exml" ){
				exmlFiles.push( tmpPath );
			}
		}
	});
	
	dirs.forEach(function(item)
	{
		//console.log( item );
		getExmlFiles(item, exmlFiles);
	});
}



//遍历
function tansferSkins( fpath )
{
	var exmlFiles = []
	getExmlFiles( fpath, exmlFiles );
	
	console.log( exmlFiles.length );
	
	exmlDatas = {};
	handSkinToJs(  exmlFiles, exmlDatas, [] );
	
	fs.writeFileSync(destUrl, JSON.stringify(exmlDatas, null, 4));
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


/*function tansferSkins(destUrl)
{
	var themePath = path.join(sourceDirectory, firstName+".thm.json");
	
    content = fs.readFileSync(themePath);
	var allVal = JSON.parse( content );
	
	exmlDatas = {};
	handSkinToJs(  allVal.exmls, exmlDatas, [] );
	
	fs.writeFileSync(destUrl, JSON.stringify(exmlDatas, null, 4));
}*/

function handSkinToJs( exmlFiles, exmlDatas, excludeExmls )
{
	for( var i=0; i<exmlFiles.length; ++i )
	{
		var exmlFile = exmlFiles[i];
		if( excludeExmls && excludeExmls.indexOf(exmlFile)>=0 )
		{
			//console.log( exmlFile );
			continue;
		}
		
		var skinName = path.basename(exmlFile).split(".")[0];
		//console.log( skinName );
		
		if( !(skinName in exmlDatas) )
		{			
			var content = fs.readFileSync(exmlFile, 'utf8');
			content = content.replace(/ >/g, ">");
			content = handleSkinName( content );
			//console.log( content );
			
			var code = parser.parse( content );
			
			var result = UglifyJS.minify(code, {fromString: true,
												mangle: true,
												compress: {
													sequences: true,
													dead_code: true,
													conditionals: true,
													booleans: true,
													unused: true,
													if_return: true,
													join_vars: true,
													drop_console: true
												}});
			
			//压缩后 出现!function 不知道为什么， 这里做个临时处理
			var tmp = result.code;
			tmp = "(" + tmp.substring(1);//去除！
			//加上（）
			var idx = tmp.lastIndexOf( "}" ) + 1;
			tmp = tmp.substring(0,idx) + ")" + tmp.substring(idx);
			
			tmp = tmp.replace(/function\(/g, "#b");
			tmp = tmp.replace(/this\./g, "#!");
			
			exmlDatas[skinName] = tmp;
			//exml转换成未压缩的js文件
			var toPath = path.join(outDirectory, skinName);
			fs.writeFileSync(toPath, code);
		}
	}
	//console.log( ".......................................... inits " );
	//console.log( initExmls );
}

function handleSkinName( content ){
	var str = "";
	var skinName = 'skinName="';
	var exml = '.exml';
	var idx = content.indexOf( skinName );
	var idx1 = 0;
	var skinNameVal;
	while( idx >=0 ){
		idx += skinName.length;
		str += content.substring( 0, idx );
		content = content.substring( idx );
		idx1 = content.indexOf( '"' );
		if( idx1>exml.length ){
			skinNameVal = content.substring( 0, idx1 );
			//console.log( skinNameVal );
			var tmpIdx = skinNameVal.lastIndexOf('/');
			if(tmpIdx>=0){
				var tmpIdx1 = skinNameVal.lastIndexOf('.');
				skinNameVal = skinNameVal.substring(tmpIdx+1, tmpIdx1);
				str += skinNameVal;
				content = content.substring( idx1 );
			}
			
			idx = content.indexOf( skinName );
		}
		else{			
			idx = -1;
		}
	}
	
	return str += content;
}

function getDependSkins( exmlcontent, excludeNames )
{
	var ret = [];
	var idx = 0;
	while(1)
	{
		idx = exmlcontent.indexOf( "skinName", idx ) + 1;
		if( idx <= 0 ) break;
		
		var startIdx = exmlcontent.indexOf( '"', idx+7 ) + 1;
		var endIdx = exmlcontent.indexOf( '"', startIdx );
		
		var dependSkinName = exmlcontent.substring( startIdx, endIdx );
		startIdx = dependSkinName.indexOf( "skins" );
		var dependSkinName = dependSkinName.substring( startIdx+6 );
		
		if( ret.indexOf(dependSkinName) < 0 && excludeNames.indexOf(dependSkinName) < 0 )
		{
			ret.push( dependSkinName );
		}
	}
	return ret;	
}

var baseDirectory = fs.realpathSync(__dirname);

var outDirectory = path.join(baseDirectory, "out");
    
//makeDirectory( sourceDirectory );

var firstName = process.argv[2] || "resource";

console.log( "-------------- " + firstName );

var sourceDirectory = path.join(baseDirectory, firstName);
var destUrl = path.join(sourceDirectory, "theme.json");

tansferSkins( path.join(sourceDirectory, "skins") );

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );