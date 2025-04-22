// sim-worker.js

console.log('start worker');

window = self;

importScripts(
  'kcSHIPDATA.js',
  'kcEQDATA.js',
  // 'kcMAPDATA.js',
  'kcEDGES.js',
  'kcENEMYCOMP.js',
  'shared.js',
  'kcships.js',
  'kcsim.js',
  'kcsimcombined.js',
  // 'reader/lz-string.js',
  'simulator-ui/common.js',
	// "simulator-ui/cmp.js",
	"simulator-ui/bonus.js",
	// "simulator-ui/fleet-editor.js",
	// "simulator-ui/selector.js",
	// "simulator-ui/convert.js",
	"simulator-ui/sim-interface.js",
	// "simulator-ui/ui-main.js",
);

// メインスレッドからのメッセージを受信
self.onmessage = function(event) {
  const { dataInput, numStep, EQUIPBONUSDATA, g } = JSON.parse(event.data);
  window.EQUIPBONUSDATA = EQUIPBONUSDATA;
  
  globalThis.C = false;
  SIM._resetResults(dataInput.nodes.length);
  SIM._load(dataInput);
  SIM._inputPrev = dataInput;
  // console.log(dataInput);

  let i = 0, prev = 0;
  L:
  for (;;) {
    for (let j=0; j<CONST.numSimStep; j++) {
      SIM._doSimSortie(dataInput);
      if(++i >= numStep)
        break L;
    }
    self.postMessage(JSON.stringify({numStep: i - prev}));
    prev = i;
  }
  // console.log(SIM._results);

  self.postMessage(JSON.stringify({numStep: i - prev, _results: SIM._results, dataInput: dataInput}));
};
