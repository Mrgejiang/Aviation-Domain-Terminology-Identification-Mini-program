/** 详情-数据类型 */
export type termDetailsBase = {
	/**名称 */
	name : string
	/**缩写 */
	abbr : string
	/**定义 */
	define : string
	/**分类 */
	category_id : any
	/**来源 */
	source : string
	/**拓展 */
	expand : string
}

export type termDetails = {
	/** id 词条id*/
	_id : string
	/**封面: 必须是网络地址 */
	poster : string
	/**视频链接 :必须是网络地址，或下载的临时本地文件 */
	video : string
	/** 中国词条详情 */
	cnDetails : {
    /**英文 */ en : string
	} & termDetailsBase
	/** 美国词条详情 */
	usDetails : termDetailsBase
	/** 欧盟词条详情 */
	euDetails : termDetailsBase
	/** 对比分析结果 */
	compareResult : string
}