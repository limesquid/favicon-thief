import { ANY_SIZE } from './constants';

export type FaviconLinkSource =
  /**
   * @see https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)?redirectedfrom=MSDN
   */
  | 'browserconfig.xml'
  /**
   * Meant to use as fallback if no sources of other types are available.
   */
  | 'guess'
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
   */
  | 'html'
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link
   */
  | 'http-header'
  /**
   * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons
   */
  | 'manifest';

export type FaviconLink = {
  sizes: ImageSize[];
  source: FaviconLinkSource;
  url: string;
};

/**
 * @ see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-sizes
 */
export type ImageSize =
  | typeof ANY_SIZE
  | {
      height: number;
      width: number;
    };

export type StringResponse = {
  data: string;
  /**
   * Represents response URL. It can be different from request URL in case of a redirect.
   */
  url: string;
};

export type FetchString = (url: string) => StringResponse;
