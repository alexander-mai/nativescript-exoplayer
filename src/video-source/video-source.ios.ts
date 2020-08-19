import { Utils, path as fsPath, knownFolders } from "@nativescript/core";
import { VideoSource as VideoSourceDefinition } from "./video-source";

export * from "./video-source-common";

export class VideoSource implements VideoSourceDefinition {
    public android: any; /// android.widget.VideoView
    public ios: any; /// AVPlayerItem
    height: any;
    width: any;

    public loadFromResource(name: string): boolean {
        let videoURL = NSBundle.mainBundle.URLForResourceWithExtension(name, null);
        let player = new AVPlayerItem({ URL: videoURL });
        this.ios = player;
        return this.ios != null;
    }

    public loadFromFile(path: string): boolean {
        var fileName = Utils.isString(path) ? path.trim() : "";

        if (fileName.indexOf("~/") === 0) {
            fileName = fsPath.join(knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        let videoURL = NSURL.fileURLWithPath(fileName);
        let player = new AVPlayerItem({ URL: videoURL });
        this.ios = player;
        return this.ios != null;
    }

    public loadFromUrl(url: string): boolean {
        let videoURL = NSURL.URLWithString(url);
        let player = new AVPlayerItem({ URL: videoURL });
        this.ios = player;
        return this.ios != null;
    }

    public setNativeSource(source: any): boolean {
        this.ios = source;
        return source != null;
    }
}

