## 1. 键盘遮挡部分`input`框
解决方案：为`input`添加`cursor-spacing="200"`属性即可，值根据实际情况进行调整
## 2. 解决页面回弹问题以及手机软键盘升起不让其将页面头部上推
解决方案:
```json
{
	"path": ...,
	"style": {
		...
		"app-plus":{
			//手机软键盘升起不让其将页面头部上推
			"softinputMode": "adjustResize",
			//页面回弹问题
			"bounce":"none"
		}
	}
},
```