# 解决跨域问题
```java
import org.springframework.context.annotation.Configuration;  
import org.springframework.web.servlet.config.annotation.CorsRegistry;  
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;  
  
@Configuration  
public class WebMvcConfiguration implements WebMvcConfigurer {  
/**  
* 允许跨域  
* @param registry  
*/  
@Override  
public void addCorsMappings(CorsRegistry registry) {  
		registry.addMapping("/**")  
		.allowedOrigins("*")  
		.allowedHeaders("*")  
		.allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")  
		.maxAge(3600);  
}  
}
```