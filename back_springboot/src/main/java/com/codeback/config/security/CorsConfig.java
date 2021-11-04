package com.codeback.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

   @Bean
   public CorsFilter corsFilter() {
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      CorsConfiguration config = new CorsConfiguration();
      config.setAllowCredentials(true);
      config.addAllowedOrigin("http://localhost");
      config.addAllowedOrigin("http://localhost:3000");
      config.addAllowedOrigin("https://localhost");
      config.addAllowedOrigin("https://localhost:3000");
      config.addAllowedOrigin("http://127.0.0.1");
      config.addAllowedOrigin("http://k5b304.p.ssafy.io");
      config.addAllowedOrigin("http://codeback.net");
      config.addAllowedOrigin("https://codeback.net");
      config.addAllowedHeader("*");
      config.addAllowedMethod("*");
      
      source.registerCorsConfiguration("/**", config);
      return new CorsFilter(source);
   }

}