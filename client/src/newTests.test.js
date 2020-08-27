const puppeteer = require('puppeteer');
const nock = require('nock');
const useNock = require('nock-puppeteer');
//const full4s = require('@suvelocity/tester');

const mockData = [
  {
    "id": "dd63145f-6340-5fa7-8619-2f44dbf63fd7",
    "title": "help me",
    "content": "pls i have been trying to run code on a dynamic page but it is not working, i need help pls. thanks",
    "userEmail": "rotif@suob.sh",
    "creationTime": 1514809791415,
    "labels": ["Corvid", "Api"],
    "updated": true
  },
  {
    "id": "3680ee4f-b510-5b18-b1fe-bf6b2ff32770",
    "title": "Adding Ads.txt file",
    "content": "Hi, \n\nI have a new blog that's been up for a couple of months and would like to hook up an ads.txt file so that we can make a few cents to offset the work we're putting into this.  I asked for help via the support team but they told me to vote for a feature that did this and sent me here.\n\nWe've had an ads.txt file provided to us which should be able to found here https://<my website>/ads.txt, the same place as https://<my website>/robots.txt (though this in internally generated).\n\nI'm at a loss for how to do this as I've looked for documentation on how and haven't come up with anything.\n\nCan anyone help and/or offer any insight on a direction to move in?\n\nMuch appreciated,\nJenny\n\n\n\n\n",
    "userEmail": "posfen@jak.gr",
    "creationTime": 1520169499590,
    "updated": true
  },
  {
    "id": "043fa86c-09a4-5053-bab8-91cd20bbb08c",
    "title": "Notifications not working",
    "content": "Hi I was working with wix crm backend notificatication and just stoped working.\n\nSee the code bellow\n\nCRM Backend code\n\nimport wixCrm from 'wix-crm-backend';\n\nexport function notifySiteContributors(body, titulo, acao, url) {\n wixCrm.notifications.notify(\n body,\n        [\"Mobile\", \"Browser\", \"Dashboard\"], {\n \"title\": titulo,\n \"actionTitle\": acao,\n \"actionTarget\": { \"url\": url },\n \"recipients\": { \"role\": \"All_Contributors\" }\n    })\n}\n\n\n\nfrontend code\n\nimport { notifySiteContributors } from 'backend/CRM';\n\n\nexport function botaofinalizar_click(event) {\n let itemObj = $w(\"#dataset3\").getCurrentItem();\n let os = itemObj.title.replace('/', '%2F')\n let link = 'www.otimicar.com/respostas-cotacao-pecas-/' + os\n $w('#text217').show()\n notifySiteContributors(\n String('OS ' + $w('#osText').text + ' ' + $w('#text207').text + ' ' + $w('#text208').text + ' ' + $w('#text214').text),\n String('Cotação de peça respondida por ' + $w('#text223').text),\n 'VEJA AGORA A RESPOSTA',\n link)\n}\n\nThe error =>\n\n\nUnhandled rejection Error: server responded with 400 - {\"message\":\"\",\"details\":{}}     at handleServerError (/dynamic-modules/edm_root/2b595510-de9c-11e9-aaa2-279ac5c14f62/node_modules/@wix/wix-crm-backend/src/notifications/api.ts:162:11)     at Object.<anonymous> (/dynamic-modules/edm_root/2b595510-de9c-11e9-aaa2-279ac5c14f62/node_modules/@wix/wix-crm-backend/src/notifications/api.ts:109:9)     at Generator.throw (<anonymous>)     at rejected (/dynamic-modules/edm_root/2b595510-de9c-11e9-aaa2-279ac5c14f62/node_modules/@wix/wix-crm-backend/dist/src/notifications/api.js:5:65)     at bound (domain.js:396:14)     at runBound (domain.js:409:12)     at tryCatcher (/elementory/node_modules/bluebird/js/main/util.js:26:23)     at Promise._settlePromiseFromHandler (/elementory/node_modules/bluebird/js/main/promise.js:510:31)     at Promise._settlePromiseAt (/elementory/node_modules/bluebird/js/main/promise.js:584:18)     at Async._drainQueue (/elementory/node_modules/bluebird/js/main/async.js:128:12)     at Async._drainQueues (/elementory/node_modules/bluebird/js/main/async.js:133:10)     at Immediate.Async.drainQueues [as _onImmediate] (/elementory/node_modules/bluebird/js/main/async.js:15:14)     at runCallback (timers.js:705:18)     at tryOnImmediate (timers.js:676:5)     at processImmediate (timers.js:658:5)     at process.topLevelDomainCallback (domain.js:121:23)\n\n\n\n",
    "userEmail": "humpatok@weamvu.ai",
    "creationTime": 1531424040238,
    "updated": false
  },
]

let page;
let browser;
let encoder;

jest.setTimeout(30000);
describe('my test_1', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ args: [
      `--window-size=1280,768`,
    ]
    });
    page = await browser.newPage();
    const screenSize = {
      width: 1280,
      height: 768,
    };
    await page.setViewport(screenSize);
    useNock(page, ['http://localhost:3000/api']);

    // await full4s.beforeAll();
  });
  afterAll(async () => {
    // await full4s.afterAll(projectName);
    await browser.close();
  });
  test('sort by done and undone', async () => {
    const getAllTicketsMock = await nock('http://localhost:3000/', { allowUnmocked: true })
      .get('/api/tickets')
      .query(() => true)
      .reply(200, mockData);
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
      const elements = await page.$$('.ticket');
    await page.waitForSelector('#sortByDone', {visible: true});
    const sortButtonDone = await page.$('#sortByDone');
    await sortButtonDone.click();
    const doneButton = await page.$('#doneButton_0');
    let doneButtonInner = await (await doneButton.getProperty('innerText')).jsonValue();
    expect(doneButtonInner).toBe('UNDONE')
    const sortButtonUnDone = await page.$('#sortByUnDone');
    await sortButtonUnDone.click();
    const unDoneButton = await page.$('#doneButton_0');
    let unDoneButtonInner = await (await unDoneButton.getProperty('innerText')).jsonValue();
    expect(unDoneButtonInner).toBe('DONE')
  });
  test('change the status of ticket from done to undone', async () => {
    const getAllTicketsMock = await nock('http://localhost:3000/', { allowUnmocked: true })
      .get('/api/tickets')
      .query(() => true)
      .reply(200, mockData);
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
      const elements = await page.$$('.ticket');
      await page.waitForSelector('#doneButton_0', {visible: true});
      const sortButtonUnDone = await page.$('#sortByUnDone');
        await sortButtonUnDone.click();
        const ButtonDone = await page.$('#doneButton_0');
        await ButtonDone.click();
      const getAllTicketsMock2 = await nock('http://localhost:3000/', { allowUnmocked: true })
      .post('/api/tickets/:043fa86c-09a4-5053-bab8-91cd20bbb08c/done')
      .query(() => true)
      .reply(200, mockData.updated = false);
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
    setTimeout( async () => {
    const doneButton = await page.$('#doneButton_0');
    let doneButtonInner = await (await doneButton.getProperty('innerText')).jsonValue();
    expect(doneButtonInner).toBe('UNDONE')
}, 15000)
});
})

// jest.setTimeout(30000);
describe('my test 2', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ args: [
      `--window-size=1280,768`,
    ]
    });
    page = await browser.newPage();
    const screenSize = {
      width: 1280,
      height: 768,
    };
    await page.setViewport(screenSize);
    useNock(page, ['http://localhost:3000/api']);

    await full4s.beforeAll();
  });
  afterEach(async () => {
    await full4s.afterEach(page);
  })
  afterAll(async () => {
    await full4s.afterAll(projectName);
    await browser.close();
  });
  test('change the status of ticket from undone to done', async () => {
    const getAllTicketsMock = await nock('http://localhost:3000/', { allowUnmocked: true })
      .get('/api/tickets')
      .query(() => true)
      .reply(200, mockData);
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
      const elements = await page.$$('.ticket');
      await page.waitForSelector('#sortByDone', {visible: true});
        const sortButtonDone = await page.$('#sortByDone');
        await sortButtonDone.click();
        const ButtonUnDone = await page.$('#doneButton_0');
        await ButtonUnDone.click();
      const getAllTicketsMock2 = await nock('http://localhost:3000/', { allowUnmocked: true })
      .post('/api/tickets/:dd63145f-6340-5fa7-8619-2f44dbf63fd7')
      .query(() => true)
      .reply(200, mockData.updated = false);
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
    setTimeout( async () => {
    const doneButton = await page.$('#doneButton_0');
    let doneButtonInner = await (await doneButton.getProperty('innerText')).jsonValue();
    expect(doneButtonInner).toBe('DONE')
    }, 15000)
  });
})
