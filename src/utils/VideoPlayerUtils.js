import Artplayer from "artplayer";
import artplayerPluginDanmuku from "artplayer-plugin-danmuku";
import Hls from 'hls.js';
import flvjs from 'flv.js';
import VideoPlaylistManager from "./videoManagement";
import { Room, RoomEvent,RemoteVideoTrack } from "livekit-client";
import drawVideoFramesToCanvas from "@/utils/drawVideoFramesToCanvas";

// 自定义视频播放器类，用于处理不同格式的视频播放
export default class CustomVideoPlayer {
    constructor(containerElement, customConfig = {}, layers = []) {
        this.art = null; // Artplayer 实例
        this.videoPlaylistManager = null; // 视频播放列表管理器
        this.containerElement = containerElement; // 播放器容器元素
        this.customConfig = customConfig; // 自定义配置
        this.layers = layers;
        this._initializePlayer(); // 初始化播放器
        this._setupBlurEffect(); // 设置虚化效果
    }

    // 初始化播放器
    _initializePlayer() {
        const defaultConfig = {
            container: this.containerElement,
            fullscreen: true, // 允许全屏
            fullscreenWeb: true, // 允许网页全屏
            autoMini: true, // 自动最小化
            playbackRate: true, // 允许调整播放速度
            setting: false, // 禁用设置菜单
            autoplay: true, // 自动播放
            isLive: true, // 直播模式
            url: "",
            type: "",
            customType: {
                webrtc: this._playWebrtc.bind(this),
                m3u8: this._playM3u8.bind(this),
                flv: this._playFlv.bind(this),
            },
            plugins: [
                artplayerPluginDanmuku(this._getDanmukuConfig()), // 弹幕插件
            ],
        };
        // 合并默认配置和自定义配置
        const mergedConfig = this._mergeConfigs(defaultConfig, this.customConfig);
        this.art = new Artplayer(mergedConfig);

        // 添加自定义图层
        this._addCustomLayers();
    }
    // 新增方法：设置虚化效果
    _setupBlurEffect() {
        if (this.art) {
            this.art.on('ready', () => {
                console.log('Video is ready, setting up blur effect');
                this._applyBlurEffect();
            });

            this.art.on('play', () => {
                console.log('Video started playing, applying blur effect');
                this._applyBlurEffect();
            });
        }
    }

    // 新增方法：应用虚化效果
    _applyBlurEffect() {
        if (this.art && this.art.video) {
            console.log('Applying blur effect');
            drawVideoFramesToCanvas(this.art);
        } else {
            console.warn('Unable to apply blur effect: art or video element is not available');
        }
    }
    // 新增方法：添加自定义图层
    _addCustomLayers() {
        this.layers.forEach(layer => {
            this.addLayer(layer);
        });
    }
    // 新增方法：清除所有图层
    _clearLayers() {
        if (this.art && this.art.layers) {
            this.art.layers.forEach(layer => {
                this.art.layers.remove(layer.name);
            });
        }
        this.layers = [];
    }
    // 新增方法：添加单个图层
    addLayer(layerConfig) {
        if (this.art) {
            this.art.layers.add(layerConfig);
        }
    }


    // 合并自定义配置
    _mergeConfigs(defaultConfig, customConfig) {
        // TODO 深度对比配置，如果配置相同，则不合并
        const mergedConfig = { ...defaultConfig };
        for (const key in customConfig) {
            mergedConfig[key] = customConfig[key];
        }
        return mergedConfig;
    }

    // 获取弹幕配置
    _getDanmukuConfig() {
        return {
            danmuku: [], // 弹幕数据
            speed: 5, // 弹幕速度
            margin: [10, "25%"], // 弹幕边距
            opacity: 1, // 弹幕透明度
            color: "#FFFFFF", // 弹幕颜色
            mode: 0, // 弹幕模式
            modes: [0, 1, 2], // 可用的弹幕模式
            fontSize: 25, // 字体大小
            antiOverlap: true, // 防重叠
            synchronousPlayback: false, // 同步播放
            heatmap: true, // 热力图
            width: 512, // 弹幕宽度
            points: [], // 弹幕点
            filter: (danmu) => danmu.text.length <= 100, // 弹幕过滤器
            beforeVisible: () => true, // 弹幕显示前的回调
            visible: true, // 是否显示弹幕
            emitter: false, // 是否允许发送弹幕
            maxLength: 200, // 最大弹幕长度
            lockTime: 5, // 弹幕锁定时间
            theme: "dark", // 主题
            beforeEmit: (danmu) => {
                return new Promise((resolve) => {
                    console.log("发送弹幕前的过滤器", danmu);
                    setTimeout(() => resolve(true), 1000);
                });
            },
        };
    }

    // 播放 WebRTC 流
    _playWebrtc(video, url, art) {
        url.attach(video);
    }

    // 播放 M3U8 流
    _playM3u8(video, url, art) {
        if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on('destroy', () => hls.destroy());
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else {
            art.notice.show = '不支持的播放格式: m3u8';
        }
    }

    // 播放 FLV 流
    _playFlv(video, url, art) {
        if (flvjs.isSupported()) {
            if (art.flv) art.flv.destroy();
            const flv = flvjs.createPlayer({ type: 'flv', url });
            flv.attachMediaElement(video);
            flv.load();
            art.flv = flv; 
            art.on('destroy', () => flv.destroy());
        } else {
            art.notice.show = '不支持的播放格式: flv';
        }
    }

    // 获取视频类型
    _getVideoType(urlCode) {
        if (urlCode instanceof RemoteVideoTrack) return "webrtc";
        if (urlCode.endsWith(".m3u8")) return "m3u8";
        if (urlCode.endsWith(".flv")) return "flv";
        return ""; // 默认播放类型
    }

    // 播放单个视频
    play(urlCode,newLayers = []) {
        // this._clearLayers(); // 清除现有图层
        this.art.destroy();
        this._initializePlayer();
        this._setupBlurEffect(); // 重新设置虚化效果
        this.art.type = this._getVideoType(urlCode);
        this.art.switchUrl(urlCode);

        // 添加新的图层
        newLayers.forEach(layer => {
            this.addLayer(layer);
        });
    }

    // 播放视频列表(伪直播视频轮播)
    playList(videoList,newLayers = []) {
        // this._clearLayers(); // 清除现有图层
        this.art.destroy();
        this._initializePlayer();
        this._setupBlurEffect(); // 重新设置虚化效果
        
        this.videoPlaylistManager = new VideoPlaylistManager(videoList);
        let playInfo = this.videoPlaylistManager.getCurrentVideo();

        // 视频准备就绪时，跳转到指定位置
        this.art.on('ready', () => {
            this.art.seek = playInfo.startPosition;
        });

        // 监听视频播放进度，自动切换下一个视频
        this.art.on('video:timeupdate', () => {
            if (this.art.currentTime >= this.art.duration - 1) {
                playInfo = this.videoPlaylistManager.getCurrentVideo();
                this.art.switchUrl(playInfo.video.url);
                this.art.seek = playInfo.startPosition;
            }
        });

        this.art.type = this._getVideoType(playInfo.video.url);
        this.art.switchUrl(playInfo.video.url);

        // 添加新的图层
        newLayers.forEach(layer => {
            this.addLayer(layer);
        });
    }

    //销毁
    destroy(){
      this.art.destroy()
    }
}