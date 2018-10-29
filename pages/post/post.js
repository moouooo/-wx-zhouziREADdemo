// pages/post/post.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'', 
    novel:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(this.data.id)
    this.setData({
      id: options.id
    })
    console.log(this.data.id);
    this.getNovelItem();
  },

  getNovelItem: function () {
    var self = this;
    var id = self.data.id;
    var url = 'http://localhost:3000/getNovelItem/' + id;
    console.log(url);
    wx.request({
      url,
      success: function (res) {
        console.log(res);
        self.setData({
          novel: res.data.NovelItem[0]
        })
        console.log(self.data.novel);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})