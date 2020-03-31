const MVLoaderBase = require('mvloader/src/mvloaderbase');
const {Builder, By} = require('selenium-webdriver');
const {Options} = require("selenium-webdriver/chrome");

class MVLSeleniumHandler extends MVLoaderBase {
  constructor (...config) {
    const defaults = {
      headless: true,
    };
    super(defaults, ...config);
  }

  async init() {
    super.init();

    const opts = new Options();
    if (this.config.headless) {
      opts.headless();
    }
    opts.addArguments('--verbose');
    opts.addArguments('--disable-dev-shm-usage');

    this.opts = opts;
  }

  async createDriver() {
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(this.opts)
      .build();

    return {driver, By};
  }
}

module.exports = MVLSeleniumHandler;
