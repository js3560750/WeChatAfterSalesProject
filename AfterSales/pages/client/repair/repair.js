// pages/client/repair/repair.js
//获取应用实例
const app = getApp();
var tempFilePaths={};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    date: '2018-01-01',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  clickScan: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
 
        var result = JSON.parse(res.result)
        console.log(result)
        that.setData({
          productName: result.产品名称,
          productModel: result.产品型号,
          serialNumber: result.产品序列号
        })
      }
    })

  },

  bindDateChange: function (e) {

    this.setData({
      date: e.detail.value
    })
  },

  formSubmit: function (e) {
    e.detail.value.openid = wx.getStorageSync('openid')
    
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair",
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: e.detail.value,
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '报修提交成功',
          success: function (res) {
           
            if (res.confirm) {
              wx.switchTab({
                url: '../myrepair/myrepair',
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '../myrepair/myrepair',
              })
            }
          }
        })
      }
    })
    for (var index in tempFilePaths) {
      this.uploadImg(tempFilePaths[index])
    }
    
    
  },


  clickBack:function(){
    //清除数据
    this.setData({
      productName: null,
      productModel: null,
      serialNumber: null,
      hospitalName: null,
      hospitalContact: null,
      hospitalTel: null,
      hospitalErrorDescribe: null,
      img_arr: null
    })
    //返回顶部
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },


  clickUpload: function () {
    var that = this
    
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          tempFilePaths=res.tempFilePaths
          that.setData({ 
            img_arr: res.tempFilePaths
            })
          
        },
      })
    
    
  },


  uploadImg:function(filePath){
      var that =this;
      //uploadFile默认是POST请求
      wx.uploadFile({
        url: 'https://sh.jinhuan123.com/weixin/repairimg',//上传的地址
        filePath: filePath,
        name: 'uploadImg',
        header: {
          'content-type': 'multipart/form-data'
        }, // 设置请求的 header
        success: function (res) {
          wx.showToast({
            title: "图片上传成功",
            icon: 'success',
            duration: 700
          })
        },
        fail: function (res) {
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
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '通知',
        content: '请到首页登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/client/client',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/client/client',
            })
          }
        }
      })
    }
    
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