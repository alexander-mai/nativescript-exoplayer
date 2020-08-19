import { Utils, path as fsPath, knownFolders } from "@nativescript/core";
import { SubtitleSource as SubtitleSourceDefinition } from "./subtitle-source";

export * from "./subtitle-source-common";

export class SubtitleSource implements SubtitleSourceDefinition {
    public android: any; /// String - url or resource
    public ios: any; /// NSString

    public loadFromResource(name: string): boolean {
        let subtitleUrl = NSBundle.mainBundle.URLForResourceWithExtension(name, null);
        let subtitles = NSString.stringWithContentsOfURLEncodingError(subtitleUrl, NSUTF8StringEncoding);
        this.ios = subtitles;
        return this.ios != null;
    }

    public loadFromFile(path: string): boolean {
        var fileName = Utils.isString(path) ? path.trim() : "";

        if (fileName.indexOf("~/") === 0) {
            fileName = fsPath.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        let subtitleUrl = NSURL.fileURLWithPath(fileName);
        let subtitles = NSString.stringWithContentsOfURLEncodingError(subtitleUrl, NSUTF8StringEncoding);
        this.ios = subtitles;
        return this.ios != null;
    }

    public loadFromUrl(url: string): boolean {
        let subtitleUrl = NSURL.URLWithString(url);
        let subtitles = NSString.stringWithContentsOfURLEncodingError(subtitleUrl, NSUTF8StringEncoding);
        this.ios = subtitles;
        return this.ios != null;
    }
}

