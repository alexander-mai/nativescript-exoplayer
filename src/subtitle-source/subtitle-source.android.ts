import { SubtitleSource as SubtitleSourceDefinition } from "./subtitle-source";
import { knownFolders, path as fsPath, Utils } from "@nativescript/core";

export * from "./subtitle-source-common";

export class SubtitleSource implements SubtitleSourceDefinition {
    public android: any; /// String - url or resource
    public ios: any; /// NSString

    public loadFromResource(name: string): boolean {
        this.android = null;

        var res = Utils.ad.getApplicationContext().getResources();
        if (res) {
            var UrlPath = "android.resource://org.nativescript.videoPlayer/R.raw." + name;
            this.android = UrlPath;

        }

        return this.android != null;
    }

    public loadFromUrl(url: string): boolean {
        this.android = null;
        this.android = url;
        return this.android != null;
    }

    public loadFromFile(path: string): boolean {
        var fileName = Utils.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fsPath.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        this.android = fileName;
        return this.android != null;
    }

}
