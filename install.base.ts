import 'https://kwx.kodhe.com/x/v/0.7.8/std/dist/stdlib'
import * as async from '/virtual/@kawix/std/util/async'
import Child from 'child_process'
import Os from 'os'
import Path from 'path'
import fs from '/virtual/@kawix/std/fs/mod'


export class Program{
	static async main(){

		try{
			let path = "kwcore"
			if(Os.platform() == "win32"){
				path = Path.join(Os.homedir(),"Kawix","bin","kwcore")
			}

			console.info(" > Installing AppDemon")
			let d = new async.Deferred<void>()
			let p = Child.spawn(path, ["gh+/voxsoftware/packages/appdemon/0.0.7.kwa","--install"],{
				stdio:'ignore'
			})
			p.on("error", d.reject)
			p.on("exit", d.resolve)
			await d.promise


			let appsdir = Path.join(Os.homedir(), "Kawix", "Applications")
			if(!fs.existsSync(appsdir)){
				await fs.mkdirAsync(appsdir)
			}
			let librarydir = Path.join(appsdir, "Library")
			if (!fs.existsSync(librarydir)) {
				await fs.mkdirAsync(librarydir)
			}

			let kowix = Path.join(librarydir, "kowix.kwa")
			let noticket = Path.join(appsdir, "org.kodhe.noticket.kwa")
			let kwfile = "gh+/voxsoftware/packages/kwget/0.0.3.kwa"


			console.info(" > Installing kowix 3.3.2")
			d = new async.Deferred<void>()
			p = Child.spawn(path, [kwfile, "gh+/voxsoftware/packages/kowix/3.3.2.kwa", kowix])
			p.on("error", d.reject)
			p.on("exit", d.resolve)
			await d.promise

			let latest = await kawix.KModule.import("https://raw.githubusercontent.com/voxsoftware/noticket-static/master/latest.json",{
				force: true
			})

			console.info(" > Installing noticket " + latest.version)
			d = new async.Deferred<void>()
			p = Child.spawn(path, [kwfile,"--password", "6f47a55b91ecab1672ce9879a16b3396", "gh+/voxsoftware/noticket-static/app/" + latest.file, noticket])
			p.on("error", d.reject)
			p.on("exit", d.resolve)
			await d.promise

			

		}catch(e){
			console.error(" > Failed installing noticket: ", e)
		}

	}
}

Program.main()
