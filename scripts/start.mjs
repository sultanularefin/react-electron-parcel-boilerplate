// const Bundler = require('parcel-bundler');
// const Parcel = require('@parcel/core');
import {Parcel} from '@parcel/core';
import * as proc from'child_process';
// const Bundler = require('parcel-bundler');




const entry = './public/index.html';
const options = {
    outDir: './build',
    publicUrl: './',
    sourceMaps: false,
    autoInstall: false,
    hmr: false,
    target: 'electron'
};

let electronStarted = false;

(async () => {
    // const bundler = new Bundler(entry, options);


    let bundler = new Parcel({

        entries: entry,//'a.js',

        // defaultConfig: '@parcel/config-default',

        ...options, //options,//'@parcel/config-default'

        isElectron: true,
        // BuildMode: 'development',
    });



    /*
    bundler.on('bundled', bundle => {
        if (!electronStarted) {
            electronStarted = true;

            require('child_process').spawn('npm', ['run', 'electron'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });
        }
    });

    bundler.bundle();

    */





    try {
        let {bundleGraph, buildTime} = await bundler.run();
        let bundles = bundleGraph.getBundles();


        for (let bundle of /*bundleGraph.getBundles()*/bundles) {
            console.log(bundle.filePath);
            // console.log(await outputFS.readFile(bundle.filePath, 'utf8'));
        }



        console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);

        console.log("electronStarted", electronStarted);

        if (!electronStarted) {
            electronStarted = true;

            // require('child_process')


            /*
            proc.spawn('npm', ['run', 'electron'], {
                            stdio: ['ignore', 'inherit', 'inherit'],
                            shell: true
                        });

            // or
                        proc.spawn('yarn', ['','electron'], {
                            stdio: ['ignore', 'inherit', 'inherit'],
                            shell: true
                        });
            // or
                        proc.exec('yarn electron');

                        */

            await proc.execSync('yarn electron');

            console.log("electron started at the end: ", electronStarted);
        }
    } catch (err) {
        // console.log("err:", err.diagnostics);

        console.log("err:", err);
    }
    finally {
        // await workerFarm.end();

        let subscription = await bundler.watch((err, event) => {
            if (err) {
                // fatal error
                throw err;
            }

            if (event.type === 'buildSuccess') {
                let bundles = event.bundleGraph.getBundles();
                console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
            } else if (event.type === 'buildFailure') {
                console.log(event.diagnostics);
            }
        });

// some time later...
        await subscription.unsubscribe();
    }

})();
