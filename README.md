## RN－Weather

> 功能描述 

* 一级界面
	* 天气
		* 通过高德地图的定位来获取当前的城市
		* titlebar右边有一个搜索按钮，可以进入二级城市列表界面
		* 通过tab进行今天天气页面与7天天气页面之间进行切换
		* 两个tab界面都提供下拉刷新的功能
	* 关注
		* 通过列表显示已关注城市当前的天气
		* 列表之间可以通过上下拖拽调整显示位置，位置的最新信息存在Storage里
		* 城市item中右下角有已关注状态的⭐️图标，点击图标可以取消关注，需要弹出询问框提醒
		* 点击item进入二级城市天气界面查看详细信息
		* 列表提供下拉刷新以及上拉加载更多的功能
		* 关注信息存储在数据库中（realm）
	* 我 
		* 显示一些关于此项目的信息
		* 在titlebar右上角提供分享的功能，分享的内容为项目的github的地址
* 二级界面
	* 城市列表
		* 每次进入先判断本地是否存在数据，否则就从网络获取，并存入本地数据库中
		* 城市列表提供快速查询功能，通过首字母进行分组
		* 提供搜索栏，便于搜索
		* 点击城市item进入三级城市天气界面
	* 城市天气
		* 同一级界面的天气一样，显示今天以及7天的天气，这部分的Component可以共用
		* titlebar右上角提供分享和关注按钮
		* 可以将今天的天气数据分享出去
		* 关注此城市，可以在一级关注页面上显示此城市
		* 关注操作将数据存入数据库
* 三级界面
	* 城市天气 
		* 同二级城市天气界面一样，可以直接复用它

> 技术栈 

* 利用[react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)解决启动白屏
* 利用[react-native-amap-location](https://github.com/xiaobuu/react-native-amap-location)实现高德地图定位功能
* 利用[react-native-sortable-listview](https://github.com/deanmcpherson/react-native-sortable-listview)实现可拖拽listView
* 利用[react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)实现viewPager切换效果
* 利用[react-native-tab-navigator](https://github.com/exponentjs/react-native-tab-navigator)实现底部tab栏
* 利用[react-native-parallax-scroll-view](https://github.com/jaysoo/react-native-parallax-scroll-view)实现粘性滑动效果
* 使用redux