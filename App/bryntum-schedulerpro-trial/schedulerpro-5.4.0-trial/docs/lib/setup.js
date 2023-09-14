import * as Bundle from '../../build/schedulerpro.module.js';
import '../data/docs_schedulerpro.js';
import '../data/navigation.js';

window.product = 'schedulerpro';
window.productName = 'SchedulerPro';
window.bryntum.silenceBundleException = true;

for (const clsName in Bundle) {
    window[clsName] = Bundle[clsName];
}
