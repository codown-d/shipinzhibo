/**
 * 视频播放列表管理器类
 */
class VideoPlaylistManager {
  /**
   * 构造函数
   * @param {Array} videoList 视频列表
   */
  constructor(videoList) {
    this.videoList = videoList;
    this.currentIndex = 0;
    this.startTime = this.videoList[0].playTime;
    this.totalDuration = this.calculateTotalDuration();
  }

  /**
   * 计算所有视频的总时长
   * @returns {number} 总时长（秒）
   */
  calculateTotalDuration() {
    return this.videoList.reduce((total, video) => total + video.dur, 0);
  }

  /**
   * 获取当前应该播放的视频及其开始位置
   * @returns {Object} 包含当前视频和开始位置的对象
   * 每一次播放视频 都调用这个方法
   * 播放完成第一个 接着播放下一个
   */
  getCurrentVideo() {
    const currentTime = Date.now();
    const elapsedTime = ((currentTime - this.startTime) % (this.totalDuration * 1000)) / 1000;
    
    let accumulatedTime = 0;
    for (const [index, video] of this.videoList.entries()) {
      accumulatedTime += video.dur;
      if (accumulatedTime >= elapsedTime) {
        this.currentIndex = index;
        const startPosition = (index === 0) ? elapsedTime : elapsedTime - (accumulatedTime - video.dur);
        return { video, startPosition };
      }
    }
    
    return { video: null, startPosition: 0 }; 
  }

  /**
   * 获取下一个视频
   * @returns {Object} 下一个视频对象
   * 
   */
  getNextVideo() {
    this.currentIndex = (this.currentIndex + 1) % this.videoList.length;
    return this.videoList[this.currentIndex];
  }
}

// // 示例视频列表
// const videoList = [
//   {
//     dur: 10,
//     playTime: 1727600185119,
//     title: "变形金刚1",
//     url: "https://oss.tbh-mall.com/video/240717/WjWI8VewTVe7Gq0tiVn5Ag.mp4"
//   },
//   {
//     dur: 10,
//     playTime: 0,
//     title: "变形金刚2",
//     url: "https://oss.tbh-mall.com/video/240717/WjWI8VewTVe7Gq0tiVn5Agmp4",
//   }
// ];

// // 创建播放列表管理器实例
// const playlistManager = new VideoPlaylistManager(videoList);
// // 获取当前视频
// const currentVideo = playlistManager.getCurrentVideo();
// console.log(currentVideo);
