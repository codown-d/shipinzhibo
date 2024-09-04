import { Room, RoomEvent } from "livekit-client";
export class JcLive {
  /**
   * 本地客服端
   */
  client;

  /**
   * 本地音频流
   */
  localAudioTrack;

  /**
   * 本地视频流
   */
  localVideoTrack;

  /**
   * 本地投屏流
   */
  screenVideoTrack;

  constructor(options) {
    const roomOptions = {
      // automatically manage subscribed video quality
      adaptiveStream: true,
      // optimize publishing bandwidth and CPU for published tracks
      dynacast: true,
    };
    // 创建房间
    this.client = new Room(roomOptions);
    this.init();
  }

  /**
   * 加入频道
   */
  async join(url, token) {
    this.client.connect(url, token);
    // this.createTracks(video, audio);
  }

  /**
   * 创建本地音视频流
   * @param video 视频
   * @param audio 音频
   */
  async createTracks(video, audio) {
    if (video) {
      this.createVideoTrack();
    }
    if (audio) {
      this.createAudioTrack();
    }
  }

  /**
   * 创建本地音频流
   */
  async createAudioTrack() {
    if (this.localAudioTrack) {
      this.client.localParticipant.setMicrophoneEnabled(false);
      this.localAudioTrack = null;
    }
    this.localAudioTrack =
      await this.client.localParticipant.setMicrophoneEnabled(true);
  }

  /**
   * 创建本地视频流
   */
  async createVideoTrack() {
    this.avState.v = true;
    this.addAvList();
    if (this.localVideoTrack) {
      this.client.localParticipant.setCameraEnabled(false);
      this.localVideoTrack = null;
    }
    this.localVideoTrack = await this.client.localParticipant.setCameraEnabled(
      true
    );
    //播放本地视频
    const element = this.localVideoTrack.track.attach();
    parentElement.appendChild(element);
  }

  /**
   * 创建投屏
   */
  async createScreenVideoTrack(cd) {
    try {
      this.screenVideoTrack =
        await this.client.localParticipant.setScreenShareEnabled(true, {
          audio: false,
        });
      const element = this.screenVideoTrack.track.attach();
      parentElement.appendChild(element);
      this.screenVideoTrack.track.mediaStreamTrack.onended = () => {
        // 点击停止共享触发
      };
    } catch (error) {
      console.log(error, "获取权限失败");
    }
  }

  /**
   * 关闭投屏
   */
  async closeScreenVideoTrack() {
    if (this.screenVideoTrack) {
      this.client.localParticipant.setScreenShareEnabled(false);
    }
  }

  /**
   * 关闭音频或者视频
   */
  closeAorV(type) {
    if (type === "VIDEO") {
      if (this.localVideoTrack) {
        this.client.localParticipant.setCameraEnabled(false);
        this.localVideoTrack = null;
        deleteChild(parentElement);
      }
    } else if (type === "AUDIO") {
      if (this.localAudioTrack) {
        this.client.localParticipant.setMicrophoneEnabled(false);
        this.localAudioTrack = null;
      }
    }
  }

  /**
   * 离开频道
   */
  leave() {
    // if (this.localAudioTrack) {
    //   this.client.localParticipant.setMicrophoneEnabled(false);
    //   this.localAudioTrack = null;
    // }
    // if (this.localVideoTrack) {
    //   this.client.localParticipant.setCameraEnabled(false);
    //   this.localVideoTrack = null;
    //   deleteChild(parentElement);
    // }
    // if (this.screenVideoTrack) {
    //   this.client.localParticipant.setScreenShareEnabled(false);
    // }
    this.client.disconnect();
  }
  // 初始化跟踪订阅
  init() {
    // 处理跟踪订阅  participant.identity 创建连接时userId
    this.client.on(
      RoomEvent.TrackSubscribed,
      (track, publication, participant) => {
        if (track.kind === "audio") {
          // debugger
          track.attach().play();
        }
      }
    );
    // 监听用户离开
    this.client.on(
      RoomEvent.TrackUnsubscribed,
      (track, publication, participant) => {
        if (track.kind === "video") {
          // deleteChild(participant.identity);
        } else if (track.kind === "audio") {
          track.attach().pause();
        }
      }
    );
    // 关闭音频或者视频 只监听 video
    this.client.on(RoomEvent.TrackMuted, (publication, participant) => {
      if (
        participant.identity !== this.options.userId &&
        publication.kind === "video"
      ) {
        // deleteChild(participant.identity);
      }
    });
    // 打开音频或者视频
    this.client.on(RoomEvent.TrackUnmuted, (publication, participant) => {
      // 这里过滤掉自己的音视频变化。也可以不过滤在上面删除挂载dom操作
      if (
        participant.identity !== this.options.userId &&
        publication.kind === "video"
      ) {
        if (publication.track) {
          attachTrack(publication.track.attach(), participant.identity);
        }
      }
    });
  }
}
function attachTrack(element, id) {
  // creates a new audio or video element
  // find the target element for participant
  // const domEL = document.getElementById(id);
  const domEL = document.body;
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.position = "absolute";
  element.style.backgroundColor = "#000";
  if (domEL) {
    domEL.appendChild(element);
  } else {
    let time = setInterval(() => {
      const domELC = document.getElementById(id);
      if (domELC) {
        domELC.appendChild(element);
        clearInterval(time);
        time = null;
      }
    }, 500);
  }
}
