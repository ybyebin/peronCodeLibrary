<?php
namespace Addons\Ruipu\Controller;
use Home\Controller\AddonsController;
use Addons\Ruipu\Controller\AuthController;
class IotController extends AuthController{
	// 设备绑定页面
	public function iotBind(){
		if ($_GET['mac']) {
			// 判断用户是否关注,如果没有关注,跳转到二维码页面,记得加publicid
			$t = is_follow($_SESSION['ruipu_home']['openid']);
			if (is_follow($_SESSION['ruipu_home']['openid'])) {
				$device_id = M('ruipu_iot')->where(array('i_mac' => $_GET['mac'] ))->getField('i_deviceid');
				// 查询该用户是否绑定该设备
				$url = 'https://api.weixin.qq.com/device/get_stat?access_token='.getAccessToken().'&device_id='.$device_id;
				$dataArr = json_decode(curlGet($url),true);
                                // 0：未授权 1：已经授权（尚未被用户绑定） 2：已经被用户绑定 3：属性未设置
                                if ($dataArr['errcode'] == 0) {
                                    if ($dataArr['status'] == 0) {
                                        $this->error('设备未授权');exit;
                                    }else if($dataArr['status'] == 1){
                                        // 未绑定
//                                        $this->display('iotFollow');exit;
                                        $this->redirect('iotFollow',array('mac'=>$_GET['mac']));exit;
                                    }else if($dataArr['status'] == 2){
                                        // 已经绑定
                                        $this->redirect('addon/Ruipu/User/myIot');exit;
                                    }else{
                                        // 未知状态
                                        $this->error('设备状态未知');exit;
                                    }
                                    $this->display();
                                }else{
                                    // 删除文件
                                    echo 'Server Error';exit;
                                }
			}else{
				$this->display('is_follow');
			}
		}else{
			$this->error('参数错误');exit;
		}
	}
        
        // 没有关注
        public function is_follow(){
            $this->display();
        }

	// 没有绑定
	public function iotFollow(){
            if ($_GET['mac']) {
                $this->display();
            }else{
                $this->error('参数错误');exit;
            }
	}

	// 解绑设备
	public function iotUnBindAjax(){
		// 
	}

	// 绑定设备
	public function iotBindAjax(){
		if ($_POST['mac']) {
			$res = M('ruipu_iot')->where(array('i_mac' => $_POST['mac']))->find();
			if ($res) {
				if (!$res['i_openid']) {
					// 请求接口,取返回值,成功则更新数据库
					$url = 'https://api.weixin.qq.com/device/compel_bind?access_token='.get_access_token();
					$postData = json_encode(array('device_id' => $res['i_deviceid'], 'openid' => $_SESSION['ruipu_home']['openid'] , 'ticket' => $this->getTicket()));
					$postRes = curlPost($url,$postData);
					$postArr = json_decode($postRes,true);
					if ($postArr['base_resp']['errcode'] == 0) {
						$saveData = array('i_openid' => $_SESSION['ruipu_home']['openid'] , 'i_time' => time() , 'i_state' => 1);
						$result = M('ruipu_iot')->where(array('i_mac' => $_POST['mac']))->save($saveData);
						if ($result!==FALSE) {
							$data['code'] = 1;
						}else{
							$data['code'] = 0;
							$data['msg'] = '数据库错误';
						}
					}else{
						$data['code'] = 0;
						$data['msg'] = '请求接口失败';
					}
				}else{
					$data['code'] = 0;
					$data['msg'] = '该设备已经绑定';
				}
			}else{
				$data['code'] = 0;
				$data['msg'] = '查无设备';
			}
		}else{
			$data['code'] = 0;
			$data['msg'] = '非法请求';
		}
		$this->ajaxReturn($data);exit;
	}

	// 获取Ticket 测试用
	public function getTicket(){
            $m = M('ruipu_iot_ticket');
            $arr = $m->where(array('id' => 1))->find();
            if (time() - $arr['time'] > 7200) {
                    // 重新获取
                    $url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.get_access_token().'&type=jsapi';
                    $res = json_decode(curlGet($url),true);
                    if ($res['errorcode'] == 0) {
                            $array = array('ticket' => $res['ticket'] , 'id' => 1 , 'time' => time());
                            $m->save($array);
                            return $res['ticket'];
                    }else{
                            return false;
                    }
            }
            return $arr['ticket'];
	}

    
}