import IProxy from './IProxy';
export default interface IOptions {
    headless?: boolean;
    proxy?: IProxy;
    verbose?: boolean;
    limit?: number;
}
