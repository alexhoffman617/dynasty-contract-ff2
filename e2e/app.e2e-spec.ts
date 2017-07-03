import { DynastyContractFf2Page } from './app.po';

describe('dynasty-contract-ff2 App', () => {
  let page: DynastyContractFf2Page;

  beforeEach(() => {
    page = new DynastyContractFf2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
