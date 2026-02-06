# 工作中mybatis遇到的一些问题
## Caused by: org.xml.sax.SAXParseException: 元素内容必须由格式正确的字符数据或标记组成。
```xml
 <select id="getDigitalCategoryByField" resultType="com.hypoy.entity.DigitalCount">
        SELECT dc.name_cn AS digital_category_name,
        COUNT(*) AS activity_count
        FROM user_activities ua
        JOIN digital_categories dc ON ua.digital_categories_id = dc.id
        <where>
            <if test="userId != null and userId != '' ">
                user_id = #{userId}
            </if>
            <if test="startTime != null and startTime != '' ">
                AND ua.activity_time &gt;= #{startTime}
            </if>
            <if test="endTime != null and endTime != '' ">
                AND ua.activity_time &lt;= #{endTime}
            </if>
        </where>
        GROUP BY
        ua.digital_categories_id, dc.name_cn
        ORDER BY
        activity_count DESC;
    </select>
```
写了这样一个sql语句，保存信息如题。
原因是 <= 不能直接写在mybaits中，因为<>在xml语言有作用，所以会和<>冲突,其他类似的冲突还有下面这些
| <	| <= | > | >= | & | ' | " | = |  
|----|----|----|----|----|----|----|----|  

### 解决办法
 **Myabtis转义**
 方案
<	<=	>	>=	&	'	"
| <	| <= | > | >= | & | ' | " | 
|----|----|----|----|----|----|----|
|`&lt;`|`&gt;`|`&gt;=`|`&amp;;`|`&`|`apos;`|`&quot;`|
