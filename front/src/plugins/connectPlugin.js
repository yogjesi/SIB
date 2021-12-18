const { sendGmail } = require("../../public/js/nodemailer");

const connectPlugin = {};
connectPlugin.install = function(Vue)
{
  // api function 호출 함수
  Vue.prototype.$_nodemail = function(value){
    // 호출할 api function
    sendGmail(value)
  }
}

export default connectPlugin