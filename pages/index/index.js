//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pic: [],
    novels: [],
    background: [
      // {
      //   url: '/images/lunbotu/view-page-1.jpg'
      // },
      // {
      //   url: '/images/lunbotu/view-page-2.jpg'
      // },
      // {
      //   url: '/images/lunbotu/view-page-3.jpg'
      // },
      {url:'/pic/lunbo-1.jpg'},
      { url: '/pic/lunbo-2.jpg' },
      {url:'/pic/lunbo-3.jpg'},
    ],
    indicatorDots: true, //指示点颜色
    vertical: false, //是否垂直
    autoplay: true, //
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    page: 1,
    pageSize:3,
    hasMoreData: true
  },
  //事件处理函数
  openView: function(req) {
    wx.navigateTo({
      url: '../post/post?id='
    })
  },
  onLoad: function() {
    this.getNovels();
  },

  getNovels: function() {
    let {
      page
    } = this.data;
    var url = `http://localhost:3000/getNovels?page=${page}`;
    var self = this;
    wx.request({
      url,
      success: function(res) {
        // console.log(res.data.code)
        var novel = self.data.novels
        if (res.data.code == 200) {
          if (self.data.page == 1) {
            novel = [];
          }

          var novels = res.data.novels;
          if (novels.length < self.data.pageSize) {
            self.setData({
              hasMoreData: false,
              novels: novel.concat(novels),
            })
          } else {
            self.setData({
              novels: novel.concat(novels),
              hasMoreData: true,
              page: self.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: '失败',
          })
        }
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)
      }
    })
  },

  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'http://localhost:3000/getNovels',
      method: "GET",
      success: function(res) {
        that.setData({
          novels: res.data.novels
        })
        console.log(that.data.novels);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.getNovels();
      wx.showLoading({
        title: '加载更多数据'
      })
    } else {
      wx.showToast({
        title: '没有更多数据'
      })
    }
  },
})