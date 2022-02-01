// const Bundler = require('parcel-bundler');
// const Parcel = require('@parcel/core');
import {
    Parcel,
    // createWorkerFarm
} from '@parcel/core';
import * as proc from'child_process';
// const Bundler = require('parcel-bundler');

// import {MemoryFS} from '@parcel/fs';



// const workerFarm = createWorkerFarm();
// const outputFS = new MemoryFS(workerFarm);

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

// (async () => {
// const bundler = new Bundler(entry, options);


const bundler = new Parcel({

    entries: entry,//'a.js',

    // defaultConfig: '@parcel/config-default',

    ...options, //options,//'@parcel/config-default'

    isElectron: true,
    // BuildMode: 'development',

    // workerFarm,
    // outputFS,
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





// await bundler.watch(async (err, event) => {

// const subscription = await bundler.watch(async (err, event) => {


// console.log("subscription [watch]: ",subscription);

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

    // await proc.execSync('yarn electron');

    console.log("electron started at the end: ", electronStarted);

}


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





/*
} catch (err) {
// console.log("err:", err.diagnostics);

console.log("err:", err);
}
finally {
await workerFarm.end();

*/




// }
// )
// ();
await subscription.unsubscribe();
