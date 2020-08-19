import { Utils, path as fsPath, knownFolders } from "@nativescript/core";
import { VideoSource as VideoSourceDefinition } from "./video-source";

export * from "./video-source-common";

export class VideoSource implements VideoSourceDefinition {
    public android: any; /// android.widget.VideoView
    public ios: any; /// AVPlayer

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

    public setNativeSource(source: any): boolean {
        this.android = source;
        return source != null;
    }


    get height(): number {
        if (this.android) {
            return this.android.getHeight();
        }

        return NaN;
    }

    get width(): number {
        if (this.android) {
            return this.android.getWidth();
        }

        return NaN;
    }

}
