function connection(key,val){
  // function 외부에서 root 설정시 app이 mount 되기 전에 script처리 >> window app 불러오지 못할 가능성
  var root = window.PaymentResponse.$root

  if (key == "myResultKey"){
    root.$_nodemail(val)
  }
}