import { NewsFeed, NewsStore } from "./types/index";

export default class Store implements NewsStore {
  private feeds: NewsFeed[];
  private _currentPage: number;
  private _limit: number;
  private _offset: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
    this._limit = 1;
    this._offset = 10;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage(): number {
    return this.currentPage < this.limit ? this.currentPage + 1 : this.limit;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }

  get limit(): number {
    return this._limit;
  }

  set limit(max: number) {
    this._limit = max;
  }

  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }

  get numberOfFeed(): number {
    return this.feeds.length;
  }

  get hasFeeds(): boolean {
    return this.feeds.length > 0;
  }

  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }

  getAllFeedsLength(): number {
    return this.feeds.length;
  }

  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  setFeeds(feeds: NewsFeed[]): void {
    this.feeds = feeds.map((feed) => ({
      ...feed,
      read: false,
    }));
  }

  makeRead(id: number): void {
    const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);

    if (feed) {
      feed.read = true;
    }
  }
}
