using System;
using System.Diagnostics;
using System.IO;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;

class Progream
{
    public static void Call(string file, string args)
    {
        Process process = new Process();
        process.StartInfo.FileName = file;
        process.StartInfo.Arguments = "\"" + args + "\"";
        process.StartInfo.UseShellExecute = false;
        process.StartInfo.RedirectStandardOutput = false;
        process.Start();
        process.WaitForExit();
    }

    public static string DigestsToString(byte[] digests)
    {
        return string.Format("{0:x2}{1:x2}{2:x2}{3:x2}{4:x2}{5:x2}{6:x2}{7:x2}{8:x2}{9:x2}{10:x2}{11:x2}{12:x2}{13:x2}{14:x2}{15:x2}",
                                digests[0], digests[1], digests[2], digests[3],
                                digests[4], digests[5], digests[6], digests[7],
                                digests[8], digests[9], digests[10], digests[11],
                                digests[12], digests[13], digests[14], digests[15]);
    }

    public static void Run(Object parameters)
    {
        string v = JsonConvert.SerializeObject(parameters);

        v = v.Replace("\"", "\\\"");

        Call("cvpub.exe", v );
    }

    public static void GenerateAsmainVer()
    {
    		string srcDir = @"..\client";
        	
        	MD5 md5 = MD5.Create();
        	
    		using (FileStream asmainver = new FileStream(Path.Combine(srcDir, "asmainversion.ver"), FileMode.Append))
            {
                using (StreamWriter swriter = new StreamWriter(asmainver))
                {
                    using (StreamReader showver = new StreamReader(Path.Combine(srcDir, "showver.txt")))
                    {
                        swriter.WriteLine("/showver.txt,{0},0", showver.ReadLine() );
                        swriter.Close();
                    }
                }
            }

            using (Stream showver = new FileStream(Path.Combine(srcDir, "asmainversion.ver"), FileMode.Open, FileAccess.Read))
            {
                using (TextWriter dest = new StreamWriter(Path.Combine(srcDir, "asmainversion.ver.ver")))
                {
                    dest.Write(DigestsToString(md5.ComputeHash(showver)));
                    dest.Close();
                }      
            }
    }

    public static void Main(string[] args)
    {
        object parameters = new
        {
            config = "cvpub.xml",
            version = "version"
        };

        /*
        object settingsASMain = new
        {
            name = "asmainversion",
            src = @"..\client",
            dest = @"..\patch\" + version,
            logDirectory = true,
            logFile = false,
            folders = new[] {
                new { src = @"config\shield" },
                new { src = "flash" },
                new { src = @"config\autoname" }
            },
            files = new[] {
                new { src= "asmain.swf" },
                new { src= "gameApp.swf" },
                new { src= @"config\character.xml" },
            },
            excludeFiles = new string[] {
		        "version.ver",
		        "version.ver.ver",
		        "version.ver.zip"
            },
            excludeFilePatterns = new string[] {
            },
            excludeFolders = new string[] {
		        ".svn"
            },
            excludeFolderPatterns = new string[] {
            }
        };

        object settingsGameApp = new
        {
            name = "version",
            src = @"..\client",
            dest = @"..\patch\" + version,
            logDirectory = true,
            logFile = false,
            folders = new object[] {
                new { src = "config" },
                new { src = "imgs" },
                new { src = "sound" },
                new { src = "res" },
                new { src = "ui_res" },
            },
            files = new[] {
                new { src= "gameApp.swf" },
            },
            excludeFiles = new string[] {
		        "asmain_version.ver",
		        "asmain_version.ver.ver",
		        "asmain_version.ver.zip"
            },
            excludeFilePatterns = new string[] {
            },
            excludeFolders = new string[] {
		        ".svn"
            },
            excludeFolderPatterns = new string[] {
            }
        };
         **/

        try
        {
            Run( parameters );
            //GenerateAsmainVer();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }

    }
}

/*
object settingsGameApp = new
        {
	        name = "version",
            src = @"..\client",
            dest = @"..\patch\" + version,
            folders = new object[] {
                new { src = "config" },
                new { src = "imgs" },
                new { src = "sound" },
                new { src = "res" },
                new { src = "ui_res" },
            },
            files = new[] {
                new { src= "gameApp.swf" },
            },
            excludeFiles = new string[] {
		        "asmain_version.ver",
		        "asmain_version.ver.ver",
		        "asmain_version.ver.zip"
            },
            excludeFilePatterns = new string[] {
            },
            excludeFolders = new string[] {
		        ".svn"
            },
            excludeFolderPatterns = new string[] {
            }
        };
*/